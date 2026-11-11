class ArticleShare extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized) return;
    this.dataset.initialized = 'true';
    const url = this.dataset.url!;
    const title = this.dataset.title!;
    const status = this.querySelector<HTMLElement>('[data-share-status]')!;
    const fallback = this.querySelector<HTMLElement>('[data-share-fallback]')!;
    const copy = async (primal = false) => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(url);
        status.textContent = primal ? 'Link copied. Paste it into a new Primal post.' : 'Link copied.';
        fallback.hidden = true;
      } catch {
        fallback.hidden = false;
        status.textContent = primal ? 'Copy the link below and paste it into a new Primal post.' : 'Select and copy the link below.';
        const input = fallback.querySelector('input')!;
        input.focus();
        input.select();
      }
    };
    const copyButton = this.querySelector<HTMLButtonElement>('[data-copy-share]')!;
    copyButton.hidden = false;
    copyButton.addEventListener('click', () => { void copy(); });
    const primalLink = this.querySelector('[data-primal-share]')!;
    primalLink.setAttribute('aria-label', 'Copy article link and open Primal');
    primalLink.setAttribute('title', 'Copy link and open Primal');
    primalLink.addEventListener('click', () => { void copy(true); });
    const nativeButton = this.querySelector<HTMLButtonElement>('[data-native-share]')!;
    if (typeof navigator.share === 'function') {
      nativeButton.hidden = false;
      nativeButton.addEventListener('click', async () => {
        try { await navigator.share({title, url}); }
        catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') return;
          void copy();
        }
      });
    }
  }
}
if (!customElements.get('article-share')) customElements.define('article-share', ArticleShare);
