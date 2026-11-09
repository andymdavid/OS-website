
import { useEffect, useState } from "react";

interface GetStartedModalProps {
  open: boolean;
  onClose: () => void;
}

export function GetStartedModal({ open, onClose }: GetStartedModalProps) {
  const [emailDraft, setEmailDraft] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setEmailDraft(null);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[90vw] sm:w-[80vw] md:w-[50vw] md:max-w-[560px] pr-4 sm:pr-6 md:pr-[6vw]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative rounded-3xl bg-[#1f1f1f] text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] border border-white/10 p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <span className="text-base leading-none">×</span>
            Close
          </button>

          <div className="space-y-3 pr-12 pt-2">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Let’s talk about your workshop
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Share a few details, then send your enquiry using your email app.
            </p>
          </div>

          {emailDraft ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80">
              Your email draft is ready. Send it from your email app to get in touch.
              <a className="mt-3 block underline" href={emailDraft}>Open email draft again</a>
              <a className="mt-2 block underline" href="mailto:info@otherstuff.studio">Or email info@otherstuff.studio directly</a>
            </div>
          ) : (
            <form
              className="mt-8 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const workshop = window.location.pathname.includes('speedrun') ? 'Speedrun' : 'Level Up';
                const body = [
                  `Name: ${data.get('name')}`,
                  `Organisation: ${data.get('organisation')}`,
                  `Role: ${data.get('role') || 'Not specified'}`,
                  `Email: ${data.get('email')}`,
                  `Enquiry: ${data.get('inquiry')}`,
                ].join('\r\n');
                const draft = `mailto:info@otherstuff.studio?subject=${encodeURIComponent(`${workshop} workshop enquiry`)}&body=${encodeURIComponent(body)}`;
                setEmailDraft(draft);
                window.location.href = draft;
              }}
            >
              <div className="space-y-2">
                <label htmlFor="workshop-name" className="text-xs font-semibold uppercase text-white/60">
                  Name <span className="text-[#a1ff62]">*</span>
                </label>
                <input
                  required
                  id="workshop-name"
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="workshop-organisation" className="text-xs font-semibold uppercase text-white/60">
                  School or organisation <span className="text-[#a1ff62]">*</span>
                </label>
                <input
                  required
                  id="workshop-organisation"
                  name="organisation"
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
                  placeholder="School or organisation"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="workshop-role" className="text-xs font-semibold uppercase text-white/60">Role (optional, but useful)</label>
                <input
                  id="workshop-role"
                  name="role"
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
                  placeholder="Your role"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="workshop-email" className="text-xs font-semibold uppercase text-white/60">
                  Email address <span className="text-[#a1ff62]">*</span>
                </label>
                <input
                  required
                  id="workshop-email"
                  name="email"
                  type="email"
                  className="w-full rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
                  placeholder="name@school.edu"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="workshop-inquiry" className="text-xs font-semibold uppercase text-white/60">
                  I’m inquiring about <span className="text-[#a1ff62]">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    id="workshop-inquiry"
                  name="inquiry"
                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#2a2a2a] px-4 py-3 pr-10 text-sm text-white focus:border-white/30 focus:outline-none"
                    defaultValue="Arranging a workshop"
                  >
                    <option>Arranging a workshop</option>
                    <option>Learning more about suitability</option>
                    <option>Something else</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#a1ff62] px-4 py-3 text-sm font-semibold text-black hover:bg-[#b5ff7e] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                Open email draft
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
