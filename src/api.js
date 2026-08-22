import axios from "axios";
import jwtDecode from "jwt-decode";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// --- Token storage -------------------------------------------------------
// localStorage is the single source of truth. React state mirrors it, so the
// interceptor below can refresh tokens without going through a component.

export function readTokens() {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
}

export function saveTokens({ accessToken, refreshToken }) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

function decodeUser(accessToken) {
  try {
    return accessToken ? jwtDecode(accessToken) : null;
  } catch {
    return null;
  }
}

export const signedOut = {
  loggedIn: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

export function authStateFromStorage() {
  const { accessToken, refreshToken } = readTokens();
  const user = decodeUser(accessToken);

  if (!accessToken || !refreshToken || !user) {
    return signedOut;
  }

  return { loggedIn: true, user, accessToken, refreshToken };
}

/** Stores a fresh token pair and returns the matching auth state. */
export function authStateFromTokens(tokens) {
  saveTokens(tokens);
  return {
    loggedIn: true,
    user: decodeUser(tokens.accessToken),
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
}

// --- The client ----------------------------------------------------------

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const { accessToken } = readTokens();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let refreshPromise = null;
let onSessionLost = () => {};

/** Lets App keep its React state in sync when the interceptor signs us out. */
export function setSessionLostHandler(handler) {
  onSessionLost = handler;
}

/**
 * Exchanges the refresh token for a new pair.
 *
 * The API rotates refresh tokens: every call invalidates the token that was
 * used, and presenting an already-rotated one is treated as theft and revokes
 * the whole session. Two requests failing at once must therefore share a
 * single refresh instead of each firing their own.
 */
export function refreshSession() {
  refreshPromise ??= axios
    .post(`${baseURL}/Account/RefreshLogin`, {
      refreshToken: readTokens().refreshToken,
    })
    .then((response) => {
      saveTokens(response.data);
      return response.data;
    })
    .catch((error) => {
      clearTokens();
      onSessionLost();
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

api.interceptors.response.use(null, async (error) => {
  const request = error.config;

  if (error.response?.status !== 401 || !request || request._retried) {
    throw error;
  }

  // Nothing to refresh with: an anonymous caller, or a notebook that wants a
  // password. Let the caller deal with it.
  if (!readTokens().refreshToken) {
    throw error;
  }

  request._retried = true;
  const tokens = await refreshSession();
  request.headers.Authorization = `Bearer ${tokens.accessToken}`;

  return api(request);
});

// --- Errors --------------------------------------------------------------

/** Pulls a human-readable message out of an API error (RFC 7807 shape). */
export function apiErrorMessage(error, fallback = "Something went wrong.") {
  if (error?.response?.status === 429) {
    const retryAfter = error.response.headers?.["retry-after"];
    return retryAfter
      ? `Too many requests. Please try again in ${retryAfter} seconds.`
      : "Too many requests. Please slow down and try again.";
  }

  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  // Model validation failures arrive as { errors: { Field: [msg, ...] } }.
  if (data?.errors) {
    const messages = Object.values(data.errors).flat();
    if (messages.length) {
      return messages.join(" ");
    }
  }

  return data?.detail || data?.title || error?.message || fallback;
}

export default api;
