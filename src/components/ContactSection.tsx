import React, { useState, useEffect } from 'react';
import {
  Send,
  User,
  Mail,
  MessageSquare,
  ImagePlus,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  message: string;
  avatar?: string;
  createdAt: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    name: 'dika_fan',
    message: 'Portofolionya keren banget bang! 3D Lanyard sama animasinya halus pol 🔥',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    createdAt: '1 hari lalu'
  },
  {
    id: 'c2',
    name: 'web_dev_enthusiast',
    message: 'Kombinasi React + Three.js nya rapi banget, inspiratif!',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    createdAt: '2 hari lalu'
  }
];

export const ContactSection: React.FC = () => {
  // Message Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Guestbook Comments State
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_comments_data');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_COMMENTS;
  });

  const [commentForm, setCommentForm] = useState({
    name: '',
    message: '',
    avatar: '',
    photoName: ''
  });
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_comments_data', JSON.stringify(comments));
    } catch {}
  }, [comments]);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (!name || !email || !message) return;

    setIsSending(true);
    setSendSuccess(false);
    setSendError(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/boxdik089@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Pesan Baru dari Portofolio — ${name}`,
          _replyto: email,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json().catch(() => null);
      const isOk = response.ok && (data?.success === true || data?.success === 'true');

      if (!isOk) {
        const rawMsg = typeof data?.message === 'string' ? data.message : '';
        if (/activat|confirm|verify/i.test(rawMsg)) {
          setSendError(
            'Aktivasi form diperlukan: cek inbox boxdik089@gmail.com lalu klik link konfirmasi dari FormSubmit.'
          );
        } else {
          setSendError(
            rawMsg || 'Gagal mengirim pesan. Coba lagi sebentar atau hubungi lewat sosial media.'
          );
        }
        return;
      }

      setSendSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSendSuccess(false), 6000);
    } catch {
      setSendError('Koneksi gagal saat mengirim pesan. Periksa internet lalu coba lagi.');
    } finally {
      setIsSending(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5 MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCommentForm((prev) => ({
        ...prev,
        avatar: reader.result as string,
        photoName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.message.trim()) return;

    setCommentSubmitting(true);
    setTimeout(() => {
      const newComment: Comment = {
        id: `c_${Date.now()}`,
        name: commentForm.name.trim(),
        message: commentForm.message.trim(),
        avatar:
          commentForm.avatar ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        createdAt: 'Baru saja'
      };

      setComments((prev) => [newComment, ...prev]);
      setCommentForm({ name: '', message: '', avatar: '', photoName: '' });
      setCommentSubmitting(false);
    }, 600);
  };

  return (
    <section
      className="contact-root-section"
      id="Contact"
      aria-labelledby="contact-section-heading"
      style={{ scrollMarginTop: '130px' }}
    >
      <div className="contact-container-inner">
        <h2 className="section-display-title" id="contact-section-heading">
          Hubungi saya
        </h2>

        <div className="contact-main-grid contact-layout">
          {/* LEFT PANEL: Message form & Find me */}
          <div className="contact-panel contact-message-panel">
            <h2 className="contact-section-title">Hubungi</h2>
            <p className="contact-panel-intro">
              Ada yang mau didiskusikan? Langsung kirim pesan aja ya...
            </p>

            <form onSubmit={handleMessageSubmit} className="contact-actual-form">
              <div className="contact-form-field">
                <label htmlFor="user-name">Nama</label>
                <div className="contact-input-wrap">
                  <User size={17} aria-hidden="true" />
                  <input
                    id="user-name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-field">
                <label htmlFor="user-email">Email</label>
                <div className="contact-input-wrap">
                  <Mail size={17} aria-hidden="true" />
                  <input
                    id="user-email"
                    name="email"
                    type="email"
                    required
                    maxLength={320}
                    placeholder="Email Anda"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-field">
                <label htmlFor="user-msg">Pesan</label>
                <div className="contact-input-wrap contact-textarea-wrap">
                  <MessageSquare size={17} aria-hidden="true" />
                  <textarea
                    id="user-msg"
                    name="message"
                    rows={4}
                    required
                    maxLength={5000}
                    placeholder="Pesan Anda"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" disabled={isSending} className="contact-submit-btn">
                <Send size={16} aria-hidden="true" />
                <span>{isSending ? 'Mengirim...' : 'Kirim Pesan'}</span>
              </button>

              {sendSuccess && (
                <div className="contact-success-toast" role="status">
                  <CheckCircle2 size={18} />
                  <span>Pesan berhasil terkirim ke email Dika! Terima kasih.</span>
                </div>
              )}

              {sendError && (
                <div className="contact-error-toast" role="alert">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{sendError}</span>
                </div>
              )}
            </form>

            {/* FIND ME Cards */}
            <div className="contact-find-me">
              <h3>FIND ME</h3>
              <div className="contact-social-grid">
                <a
                  href="https://instagram.com/dprxz_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-card contact-social-card--instagram"
                >
                  <span className="contact-social-icon-box">
                    <img
                      className="contact-social-logo"
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                      alt=""
                    />
                  </span>
                  <span className="contact-social-text">
                    <span className="contact-social-label">Instagram</span>
                    <span className="contact-social-sub">@dprxz_</span>
                  </span>
                  <ArrowUpRight size={16} className="contact-social-arrow" />
                </a>

                <a
                  href="https://tiktok.com/@boxdik089"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-card contact-social-card--tiktok"
                >
                  <span className="contact-social-icon-box">
                    <img className="contact-social-logo" src="/assets/tiktok-anoPp0Hh.svg" alt="" />
                  </span>
                  <span className="contact-social-text">
                    <span className="contact-social-label">TikTok</span>
                    <span className="contact-social-sub">@boxdik089</span>
                  </span>
                  <ArrowUpRight size={16} className="contact-social-arrow" />
                </a>

                <a
                  href="https://github.com/boxdik089-ctrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-card contact-social-card--github"
                >
                  <span className="contact-social-icon-box">
                    <img
                      className="contact-social-logo"
                      src="https://github.githubassets.com/favicons/favicon.svg"
                      alt=""
                    />
                  </span>
                  <span className="contact-social-text">
                    <span className="contact-social-label">GitHub</span>
                    <span className="contact-social-sub">@boxdik089-ctrl</span>
                  </span>
                  <ArrowUpRight size={16} className="contact-social-arrow" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Guestbook Comments */}
          <div className="contact-panel contact-comment-panel">
            <h2 className="contact-section-title">Komentar</h2>
            <p className="contact-panel-intro">
              Tinggalkan komentar atau masukan untuk website ini...
            </p>

            <form onSubmit={handleCommentSubmit} className="contact-comment-form">
              <div className="contact-form-field">
                <label htmlFor="comment-name">Nama</label>
                <div className="contact-input-wrap">
                  <User size={17} aria-hidden="true" />
                  <input
                    id="comment-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-field">
                <label htmlFor="comment-msg">Pesan</label>
                <div className="contact-input-wrap contact-textarea-wrap">
                  <MessageSquare size={17} aria-hidden="true" />
                  <textarea
                    id="comment-msg"
                    name="message"
                    rows={3}
                    required
                    placeholder="Tulis komentar..."
                    value={commentForm.message}
                    onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-field">
                <label>Foto Profil (opsional)</label>
                <label className="contact-file-picker-btn">
                  <ImagePlus size={16} />
                  <span>{commentForm.photoName || 'Pilih Foto Profil'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <span className="text-[11px] text-slate-500 mt-1">Ukuran file maksimal 5 MB</span>
              </div>

              <button type="submit" disabled={commentSubmitting} className="contact-submit-btn">
                <Send size={16} aria-hidden="true" />
                <span>{commentSubmitting ? 'Mengirim...' : 'Kirim Komentar'}</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="contact-comment-list mt-6 space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="contact-comment-item">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="contact-comment-avatar"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80';
                    }}
                  />
                  <div className="contact-comment-content">
                    <div className="contact-comment-meta">
                      <span className="contact-comment-author">{c.name}</span>
                      <span className="contact-comment-date">{c.createdAt}</span>
                    </div>
                    <p className="contact-comment-text">{c.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
