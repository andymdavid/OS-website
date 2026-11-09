class Navigation extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized) return;
    this.dataset.initialized = 'true';
    const nav = this.querySelector('nav')!;
    const container = this.querySelector('.nav-container')!;
    const mega = this.querySelector<HTMLElement>('.mega-menu')!;
    const overlay = this.querySelector<HTMLElement>('.mobile-menu-overlay')!;
    const toggle = this.querySelector<HTMLButtonElement>('[data-mobile-toggle]')!;
    let dropdown: string | null = null;
    let mobile = false;
    let timer: ReturnType<typeof setTimeout>;
    let previousOverflow = '';
    const setDropdown = (key: string | null) => {
      clearTimeout(timer);
      const changed = dropdown !== key;
      dropdown = key;
      nav.classList.toggle('mega-open', Boolean(key));
      container.classList.toggle('mega-open', Boolean(key));
      mega.classList.toggle('visible', Boolean(key));
      mega.classList.toggle('media-menu', key === 'media');
      mega.inert = !key;
      if (key && changed) {
        const template = this.querySelector<HTMLTemplateElement>(`[data-mega-template="${key}"]`)!;
        mega.replaceChildren(template.content.cloneNode(true));
      }
      this.querySelectorAll<HTMLElement>('[data-desktop-dropdown], [data-mobile-dropdown]').forEach(button => {
        const active = (button.dataset.desktopDropdown || button.dataset.mobileDropdown) === key;
        button.classList.toggle('active', active);
        button.setAttribute('aria-expanded', String(active));
      });
      this.querySelectorAll<HTMLElement>('[data-mobile-submenu]').forEach(menu => menu.classList.toggle('visible', menu.dataset.mobileSubmenu === key));
    };
    const setMobile = (open: boolean, restoreFocus = true) => {
      if (open && !mobile) previousOverflow = document.body.style.overflow;
      mobile = open;
      overlay.inert = !open;
      overlay.classList.toggle('active', open);
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : previousOverflow;
      if (open) overlay.querySelector<HTMLButtonElement>('button')?.focus();
      else if (restoreFocus) toggle.focus();
    };
    const close = (restoreFocus = false) => { setDropdown(null); if (mobile) setMobile(false, restoreFocus); };
    toggle.addEventListener('click', () => setMobile(!mobile));
    this.querySelector('[data-mobile-close]')?.addEventListener('click', () => close(true));
    this.querySelectorAll<HTMLElement>('[data-desktop-dropdown], [data-mobile-dropdown]').forEach(button => {
      const key = button.dataset.desktopDropdown || button.dataset.mobileDropdown!;
      button.addEventListener('click', () => setDropdown(dropdown === key ? null : key));
      button.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown' && button.dataset.desktopDropdown) {
          event.preventDefault(); setDropdown(key); requestAnimationFrame(() => requestAnimationFrame(() => mega.querySelector<HTMLAnchorElement>('a')?.focus()));
        }
      });
    });
    this.querySelectorAll<HTMLElement>('[data-hover-dropdown]').forEach(wrapper => {
      wrapper.addEventListener('mouseenter', () => setDropdown(wrapper.dataset.hoverDropdown!));
      wrapper.addEventListener('mouseleave', () => { timer = setTimeout(() => setDropdown(null), 150); });
    });
    mega.addEventListener('mouseenter', () => clearTimeout(timer));
    mega.addEventListener('mouseleave', () => { timer = setTimeout(() => setDropdown(null), 150); });
    this.addEventListener('click', event => {
      const target = event.target as Element;
      if (target.closest('a')) close();
      if (target.closest('[data-newsletter-open]')) {
        close();
        import('../lib/newsletter-dialog').then(module => module.openNewsletter({ heading: 'Get Intelligence Snacks in your inbox.' }));
      }
    });
    this.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        const active = this.querySelector<HTMLElement>(`[data-desktop-dropdown="${dropdown}"]`);
        close(true); if (!mobile && active) active.focus();
      }
      if (event.key === 'Tab' && mobile) {
        const focusable = [...overlay.querySelectorAll<HTMLElement>('a,button')].filter(e => e.getClientRects().length && !e.closest('[inert]'));
        const first = focusable[0], last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    });
    document.addEventListener('click', event => { if (!this.contains(event.target as Node)) close(); });
    window.addEventListener('pagehide', () => close());
    if (this.dataset.titleSwap) {
      const config = JSON.parse(this.dataset.titleSwap);
      const target = document.getElementById(config.targetId) || document.querySelector('.speedrun-page section');
      if (target) new IntersectionObserver(([entry]) => {
        const past = entry.boundingClientRect.bottom <= 0;
        this.querySelector('[data-title-before]')?.classList.toggle('is-active', !past);
        this.querySelector('[data-title-after]')?.classList.toggle('is-active', past);
        this.querySelector('.nav-logo-swap')?.setAttribute('aria-label', past ? config.after : config.before);
      }).observe(target);
    }
  }
}
if (!customElements.get('os-navigation')) customElements.define('os-navigation', Navigation);
