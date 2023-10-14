window.setBodyThemeAttribute = function () {
  document.body.setAttribute("data-bw-theme", localStorage.getItem('theme') || 'default');
};

window.getBootstrapCdnUrl = function () {
  const theme = localStorage.getItem('theme') || 'default';

  const themeUrl = theme == 'default'
    ? 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css'
    : `https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.2/${theme}/bootstrap.min.css`;

  return themeUrl;
}

window.setBootstrapCdnLink = function () {
  const link = document.getElementById('bs-cdn-link');
  link.href = getBootstrapCdnUrl();
}

window.setBootstrapCdnLinkWithPreload = function () {
  const existingLink = document.getElementById('bs-cdn-link');
  const link = document.createElement('link');
  link.id = 'bs-cdn-link';
  link.rel = 'stylesheet';
  link.href = getBootstrapCdnUrl();
  link.onload = () => {
    window.setBodyThemeAttribute();
    existingLink.remove();
  };
  existingLink.parentNode.insertBefore(link, existingLink);
};

document.write(`<link id="bs-cdn-link" rel="stylesheet" href="${window.getBootstrapCdnUrl()}">`);
// dom ready
window.addEventListener('DOMContentLoaded', () => {
  window.setBodyThemeAttribute();
});