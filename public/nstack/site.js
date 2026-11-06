const choices = {
  home: ['Your home', 'Infrastructure you operate', 'Run NStack on a machine you control. Your data stays with you.'],
  community: ['Your community', 'Infrastructure operated together', 'Share an NStack run by your community for its members, with access set by role.'],
  provider: ['Your provider', 'Infrastructure operated for you', 'Let a provider you trust run NStack for you, while your apps and identity stay yours.']
};
for (const button of document.querySelectorAll('[data-host]')) {
  button.addEventListener('click', () => {
    const [title, subtitle, detail] = choices[button.dataset.host];
    for (const item of document.querySelectorAll('[data-host]')) item.setAttribute('aria-pressed', String(item === button));
    document.querySelector('#host-title').textContent = title;
    document.querySelector('#host-sub').textContent = subtitle;
    document.querySelector('#host-detail').textContent = detail;
  });
}
// Scroll first, then focus without scrolling: the browser's own fragment focus can
// otherwise race the smooth scroll and leave tall sections aligned to their bottom.
for (const link of document.querySelectorAll('a[href^="#"]')) {
  const target = link.hash.length > 1 && document.getElementById(link.hash.slice(1));
  if (!target || target.getAttribute('tabindex') !== '-1') continue;
  link.addEventListener('click', event => {
    event.preventDefault();
    history.pushState(null, '', link.hash);
    target.scrollIntoView();
    target.focus({preventScroll: true});
  });
}
