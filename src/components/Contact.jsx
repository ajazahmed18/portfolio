import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [formNote, setFormNote] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSentOpen, setIsSentOpen] = useState(false);
  const sentDialogRef = useRef(null);

  useEffect(() => {
    const dialog = sentDialogRef.current;
    if (isSentOpen && dialog && !dialog.open) {
      dialog.showModal();
      dialog.querySelector(".sent-dialog__done")?.focus();
    }
  }, [isSentOpen]);

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFormStatus("error");
      setFormNote("Email delivery is not configured yet. Add the EmailJS values to .env.local.");
      return;
    }

    setIsSending(true);
    setFormStatus("");
    setFormNote("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      let response;
      try {
        response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              name,
              email,
              reply_to: email,
              subject: `Portfolio message from ${name}`,
              message
            }
          })
        });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          throw new Error("Email service timed out. Please try again.");
        }
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const serviceMessage = (await response.text()).trim();
        throw new Error(serviceMessage || `EmailJS rejected the message (HTTP ${response.status}).`);
      }

      setFormStatus("");
      setFormNote("");
      form.reset();
      setIsSentOpen(true);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setFormStatus("error");
      const detail = error instanceof Error ? error.message : "Unknown error";
      setFormNote(detail === "Failed to fetch"
        ? "Could not reach EmailJS. Check your internet connection and try again."
        : `Message was not sent: ${detail}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__grid">
        <div className="contact__copy reveal">
          <p className="eyebrow">Contact</p>
          <h2>Let us build something useful.</h2>
          <p>
            I am open to internships, collaborations and opportunities to learn.
            You can contact me directly using my email or phone number.
          </p>

          <ul className="contact__links">
            <li><a href="mailto:ajazmd8055@gmail.com">ajazmd8055@gmail.com</a></li>
            <li><a href="tel:+918125235267">+91 81252 35267</a></li>
            <li><a href="https://github.com/ajazahmed18" target="_blank" rel="noopener">GitHub — ajazahmed18 ↗</a></li>
            <li><a href="https://leetcode.com/u/ajazahmed18/" target="_blank" rel="noopener">LeetCode — ajazahmed18 ↗</a></li>
          </ul>
        </div>

        <form className="contact__form reveal" id="contactForm" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Your Name</label>
            <input id="name" name="name" type="text" placeholder="Enter your name" required />
          </div>

          <div className="field">
            <label htmlFor="email">Your Email</label>
            <input id="email" name="email" type="email" placeholder="name@example.com" required />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required />
          </div>

          {isSending && (
            <div className="contact__sending" role="status" aria-live="polite">
              <span className="contact__progress" aria-hidden="true"><span /></span>
              <span>Sending message...</span>
            </div>
          )}

          <button type="submit" className="btn btn--solid btn--wide" disabled={isSending}>
            <span className="btn__label">{isSending ? "Sending..." : "Send by email"}</span>
          </button>
          <p className={`form-note${formStatus ? ` form-note--${formStatus}` : ""}`} id="formNote" role="status" aria-live="polite">
            {formNote}
          </p>
        </form>
      </div>

      <dialog
        className="sent-dialog"
        ref={sentDialogRef}
        aria-labelledby="sentDialogTitle"
        onClose={() => setIsSentOpen(false)}
        onClick={event => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="sent-dialog__card">
          <div className="sent-dialog__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="m6.5 12.5 3.7 3.7 7.5-8" />
            </svg>
          </div>
          <h2 id="sentDialogTitle">Message sent</h2>
          <button
            className="btn btn--solid btn--wide sent-dialog__done"
            type="button"
            onClick={() => sentDialogRef.current?.close()}
          >
            Done
          </button>
        </div>
      </dialog>
    </section>
  );
}
