import { useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import { inquiries } from '../../data/services';
import type { InquiryId } from '../../data/types';
import { copyText, inquiryStore, mailtoUrl, validate, whatsappUrl, type ContactMessage, type Errors } from '../../lib/contact';
import { Icon } from '../ui/Icon';

type Status = 'editing' | 'invalid' | 'handed-off';

/*
 * The site is static, so nothing is sent from the page itself. Submitting
 * opens the visitor's own email app with the message filled in, and the
 * status text says exactly that. It never claims the message was delivered.
 */
export function ContactForm() {
  const inquiry = useSyncExternalStore(inquiryStore.subscribe, inquiryStore.get);
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('editing');
  const [copied, setCopied] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const message: ContactMessage = { ...fields, inquiry };
  const update = (key: keyof typeof fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(message);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Errors)[])[0];
    if (first) {
      setStatus('invalid');
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus('handed-off');
    window.location.href = mailtoUrl(message);
  };

  const field = (key: 'name' | 'email', label: string, type: string, autoComplete: string) => (
    <div className="ffield">
      <label htmlFor={`cf-${key}`}>{label}</label>
      <input
        id={`cf-${key}`} name={key} type={type} autoComplete={autoComplete} value={fields[key]} required
        onChange={(e) => update(key, e.target.value)}
        aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `cf-${key}-err` : undefined}
      />
      {errors[key] && <p className="ffield__error" id={`cf-${key}-err`}><Icon name="alert" size={14} /> {errors[key]}</p>}
    </div>
  );

  return (
    <form className="cform" ref={form} onSubmit={onSubmit} noValidate aria-label="Contact form">
      <div className="cform__row">
        {field('name', 'Name', 'text', 'name')}
        {field('email', 'Email', 'email', 'email')}
      </div>

      <div className="ffield">
        <label htmlFor="cf-inquiry">What is it about?</label>
        <select id="cf-inquiry" name="inquiry" value={inquiry} onChange={(e) => inquiryStore.set(e.target.value as InquiryId)}>
          {inquiries.map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
        </select>
      </div>

      <div className="ffield">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message" name="message" rows={6} value={fields.message} required
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined}
        />
        {errors.message && <p className="ffield__error" id="cf-message-err"><Icon name="alert" size={14} /> {errors.message}</p>}
      </div>

      <div className="cform__actions">
        <button type="submit" className="btn btn--primary"><Icon name="send" size={16} /> Open in email app</button>
        <p className="cform__hint">Opens your email app with the message ready to send.</p>
      </div>

      <div role="status" aria-live="polite">
        {status === 'invalid' && (
          <p className="cform__status cform__status--error"><Icon name="alert" size={16} /> Fix the highlighted fields, then try again.</p>
        )}
        {status === 'handed-off' && (
          <div className="cform__status">
            <p><Icon name="mail" size={16} /> <strong>Your email app should now be open with this message.</strong> Press send there to deliver it. It has not been sent from this page.</p>
            <p>Nothing opened?</p>
            <div className="cform__alts">
              <a className="btn btn--small" href={whatsappUrl(message)} target="_blank" rel="noopener"><Icon name="whatsapp" size={14} /> Send on WhatsApp</a>
              <button
                type="button" className="btn btn--small"
                onClick={async () => { setCopied(await copyText(`${message.message}\n\n${message.name}\n${message.email}`)); }}
              >
                <Icon name={copied ? 'check' : 'copy'} size={14} /> {copied ? 'Message copied' : 'Copy message'}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
