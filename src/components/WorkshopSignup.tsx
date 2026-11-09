import { useEffect, useState } from 'react';
import { GetStartedModal } from '../levelup/components/ui/get-started-modal';

export function WorkshopSignup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('os-workshop-signup', show);
    return () => window.removeEventListener('os-workshop-signup', show);
  }, []);
  return <GetStartedModal open={open} onClose={() => setOpen(false)} />;
}
