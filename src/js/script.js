(function externalLinks() {
  // add target blank to external links
  const siteUrl = window.location.hostname;
  const aTags = document.querySelectorAll('a[href*="//"]:not([href*="' + siteUrl + '"])');

  aTags.forEach((ele) => {
    ele.setAttribute('target', '_blank');
    ele.setAttribute('rel', 'noopener noreferrer');
  });
})();

////////////////////
// nice-select2 lib
(function createSelects() {
  document.querySelectorAll('[data-nice-select]').forEach((select) => {
    select.style.display = 'none';
    NiceSelect.bind(select);
  });
})();
