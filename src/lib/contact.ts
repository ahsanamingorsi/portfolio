import { personal } from '../data/personal';
import { inquiries } from '../data/services';
import type { InquiryId } from '../data/types';

export interface ContactMessage { name: string; email: string; inquiry: InquiryId; message: string }

const subjectFor = (m: ContactMessage) =>
  `${inquiries.find((i) => i.id === m.inquiry)?.label ?? 'Inquiry'} from ${m.name}`;

const bodyFor = (m: ContactMessage) => `${m.message}\n\n${m.name}\n${m.email}`;

/** A mailto: link carrying the whole message. The visitor's own mail app sends it. */
export const mailtoUrl = (m: ContactMessage) =>
  `mailto:${personal.email}?subject=${encodeURIComponent(subjectFor(m))}&body=${encodeURIComponent(bodyFor(m))}`;

export const whatsappUrl = (m: ContactMessage) =>
  `${personal.whatsappUrl}?text=${encodeURIComponent(`${subjectFor(m)}\n\n${bodyFor(m)}`)}`;

export type Errors = Partial<Record<keyof ContactMessage, string>>;

export function validate(m: ContactMessage): Errors {
  const e: Errors = {};
  if (m.name.trim().length < 2) e.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m.email.trim())) e.email = 'Enter an email address like name@example.com.';
  if (m.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.';
  return e;
}

/* ---- Inquiry preselection: Services buttons set the category on the contact form. ---- */
type Listener = () => void;
let current: InquiryId = 'software';
const listeners = new Set<Listener>();
export const inquiryStore = {
  get: () => current,
  set: (id: InquiryId) => { current = id; listeners.forEach((l) => l()); },
  subscribe: (l: Listener) => { listeners.add(l); return () => { listeners.delete(l); }; },
};

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
