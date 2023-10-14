window.bootstrapCdnUrl = function () {
  const theme = localStorage.getItem('theme') || 'default';

  const themeUrl = theme == 'default'
    ? 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css'
    : `https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.2/${theme}/bootstrap.min.css`;

  return themeUrl;
}

window.setBootstrapCdnLink = function () {
  const link = document.getElementById('bs-cdn-link');
  link.href = bootstrapCdnUrl();
}

document.write(`<link id="bs-cdn-link" rel="stylesheet" href="${window.bootstrapCdnUrl()}">`);