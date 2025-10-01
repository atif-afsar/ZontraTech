import emailjs from 'emailjs-com';


/**
 * Custom error thrown when EmailJS env is not configured.
 */
export class EmailConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmailConfigError';
  }
}

/**
 * getEmailConfig - Reads EmailJS config from Vite env and returns them.
 * Throws EmailConfigError when any value is missing to give a clearer runtime
 * message for developers.
 *
 * @returns {{ serviceId: string, templateId: string, publicKey: string }}
 */
export function getEmailConfig() {
  // Read raw values from Vite env
  let serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  let templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  let publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  // Recipient (the developer's email where messages should be delivered)
  let receiverEmail = import.meta.env.VITE_EMAILJS_RECEIVER;
  let receiverName = import.meta.env.VITE_EMAILJS_RECEIVER_NAME;

  // Helper: sanitize values by trimming and removing surrounding quotes/newlines
  const sanitize = (v) => {
    if (typeof v !== 'string') return v;
    return v.trim().replace(/^"|"$|^'|'$/g, '').replace(/\r?\n/g, '');
  };

  serviceId = sanitize(serviceId);
  templateId = sanitize(templateId);
  publicKey = sanitize(publicKey);
  receiverEmail = sanitize(receiverEmail);
  receiverName = sanitize(receiverName);

  // receiverEmail is required if your EmailJS template expects an explicit
  // recipient (common when templates are configured to accept a `to_email` param).
  if (!serviceId || !templateId || !publicKey) {
    throw new EmailConfigError(
      'Email service is not configured. Make sure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY are set.'
    );
  }

  if (!receiverEmail) {
    throw new EmailConfigError(
      'Recipient address is not configured. Set VITE_EMAILJS_RECEIVER in your .env to the email address where contact form messages should be delivered.'
    );
  }

  // In development, log a masked publicKey to help troubleshooting without leaking full secret
  if (import.meta.env.MODE === 'development') {
  const mask = (s) => (s && s.length > 6 ? `${s.slice(0, 4)}…${s.slice(-2)}` : s);
  console.debug('[EmailJS] serviceId=%s templateId=%s publicKey=%s receiver=%s', serviceId, templateId, mask(publicKey), mask(receiverEmail));
  }

  return { serviceId, templateId, publicKey, receiverEmail, receiverName };
}

/**
 * sendEmail - Sends an email using EmailJS with keys read from Vite env.
 *
 * @param {{ name: string, email: string, message: string }} templateParams
 * @returns {Promise} Resolves on success, rejects with error on failure
 */
export function sendEmail(templateParams) {
  const { serviceId, templateId, publicKey, receiverEmail, receiverName } = getEmailConfig();

  // Ensure EmailJS is initialized with the public key. Calling init multiple
  // times is safe; it simply resets the user/public key used by the library.
  if (typeof emailjs.init === 'function') {
    try {
      emailjs.init(publicKey);
    } catch (initErr) {
      // If init fails, surface a clearer error to the caller
      throw new Error('Failed to initialize EmailJS: ' + (initErr?.message || initErr));
    }
  }

  // Inject the configured receiver into the template params if the template
  // expects an explicit recipient. Do not override if caller already provided.
  const finalParams = { ...templateParams };
  if (receiverEmail) {
    if (!finalParams.to_email) finalParams.to_email = receiverEmail;
    if (!finalParams.to) finalParams.to = receiverEmail;
    if (!finalParams.recipient_email) finalParams.recipient_email = receiverEmail;
    if (!finalParams.recipient) finalParams.recipient = receiverEmail;
    if (!finalParams.user_email) finalParams.user_email = receiverEmail;
    if (!finalParams.email_to) finalParams.email_to = receiverEmail;
  }
  if (!finalParams.to_name && receiverName) finalParams.to_name = receiverName;
  // Many EmailJS templates use `reply_to` for reply address — set it from
  // the sender email if available and not already provided.
  if (!finalParams.reply_to && finalParams.from_email) finalParams.reply_to = finalParams.from_email;

  // In development, log the final params we send so you can verify the
  // recipient fields and template variable names match your EmailJS template.
  if (import.meta.env.MODE === 'development') {
    try {
      // Avoid printing secrets like publicKey
      const debugParams = { ...finalParams };
      if (debugParams.reply_to) debugParams.reply_to = '***masked***';
      console.debug('[EmailJS] sending template params:', debugParams);
    } catch (e) {
      console.debug('[EmailJS] failed to stringify template params for debugging', e);
    }
  }

  // Defensive check: ensure we have at least one recipient-like field
  const recipientKeys = ['to_email', 'to', 'recipient_email', 'recipient', 'user_email', 'email_to'];
  const hasRecipient = recipientKeys.some((k) => !!finalParams[k]);
  if (!hasRecipient) {
    // Warn in console to help debugging; EmailJS will likely reject the request with 422
    console.warn('[EmailJS] No recipient detected in template params. finalParams keys:', Object.keys(finalParams));
  }

  // emailjs.send returns a Promise
  return emailjs.send(serviceId, templateId, finalParams, publicKey).catch((err) => {
    // Surface a friendlier error in the console with the params we sent (masked)
    try {
      const dump = { ...finalParams };
      if (dump.reply_to) dump.reply_to = '***masked***';
      console.error('[EmailJS] send failed. params:', dump, 'error:', err);
    } catch (e) {
      console.error('[EmailJS] send failed and failed to log params', e, err);
    }
    throw err; // rethrow so callers can handle it
  });
}

export default sendEmail;
