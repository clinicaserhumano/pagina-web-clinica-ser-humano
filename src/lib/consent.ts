/** Consentimiento de cookies (banner) + Google Consent Mode v2.
 *
 *  - Google (GTM / GA4 / Google Ads): se carga siempre, pero con todo "denied"
 *    por defecto → sin cookies ni identificadores hasta que la persona acepta.
 *  - Meta (pixel + API de conversiones): solo se carga y envía datos si acepta.
 */

export const CONSENT_KEY = "sh_cookie_consent";
export const CONSENT_EVENT = "sh-consent";
export type Consent = "accepted" | "rejected";

/** Script que se ejecuta ANTES de GTM: fija el consentimiento por defecto
 *  y restaura la elección guardada en visitas anteriores. */
export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(localStorage.getItem('${CONSENT_KEY}')==='accepted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
`;

type Gtag = (...args: unknown[]) => void;

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function hasConsent(): boolean {
  return getConsent() === "accepted";
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // modo privado / almacenamiento bloqueado: la elección vale solo para esta visita
  }
  const estado = value === "accepted" ? "granted" : "denied";
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("consent", "update", {
    ad_storage: estado,
    ad_user_data: estado,
    ad_personalization: estado,
    analytics_storage: estado,
  });
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
