import { createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { NewsletterModal } from '../components/NewsletterModal';
let root: Root | undefined;
export function openNewsletter(options: { heading?: string } = {}) {
  if (root) return;
  const previousFocus = document.activeElement as HTMLElement | null;
  const host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  const close = () => { root?.unmount(); root = undefined; host.remove(); previousFocus?.focus(); };
  root.render(createElement(NewsletterModal, { isOpen: true, onClose: close, ...options }));
}
