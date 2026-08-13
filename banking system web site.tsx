import { useState } from 'react';
import {
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Headphones,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import { supabase } from '@/lib/supabase';

export function ContactPage() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: dbError } = await supabase.from('contact_messages').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        status: 'new',
      });

      if (dbError) throw dbError;
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError(
        'Unable to send message. Please try again. ' +
          (err instanceof Error ? err.message : '')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="gradient-bank py-16">
        <div className="container-page">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{t.contact.title}</h1>
            <p className="mt-4 text-lg text-bank-100">{t.contact.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-bank-50 text-bank-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                  {t.contact.hq}
                </h3>
                <p className="mt-1 text-sm text-ink-700">{t.contact.hqAddress}</p>
                <p className="mt-2 text-sm text-ink-700">{t.contact.hqPhone}</p>
                <p className="text-sm text-ink-700">{t.contact.hqEmail}</p>
              </div>

              <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                  <Headphones className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                  {t.contact.support}
                </h3>
                <p className="mt-1 text-sm text-ink-700">{t.contact.supportPhone}</p>
                <div className="mt-3 space-y-1 text-sm text-ink-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-ink-400" />
                    {t.contact.hours}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-ink-400" />
                    {t.contact.hoursWeekend}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                  {t.contact.followUs}
                </h3>
                <div className="mt-3 flex gap-2">
                  {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-100 text-ink-500 transition-all hover:bg-bank-600 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-bold text-ink-900">{t.contact.form}</h3>

                {success && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-bank-200 bg-bank-50 p-4 text-sm text-bank-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    {t.contact.success}
                  </div>
                )}

                {error && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label-field">{t.contact.name} *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label-field">{t.contact.email}</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label-field">{t.contact.phone}</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label-field">{t.contact.subject} *</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => update('subject', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-field">{t.contact.message} *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input-field"
                      rows={5}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full sm:w-auto disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {t.common.loading}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t.contact.send}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
