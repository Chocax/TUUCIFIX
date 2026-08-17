import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class SmsService {
  constructor(private translate: TranslateService) {}

  /**
   * Same phone numbers as WhatsappService, same language rule.
   * If SMS should ever use different numbers than WhatsApp, just change
   * the two values below — nothing else needs to change.
   */
  private getPhoneNumber(): string {
    const currentLang = this.translate.getCurrentLang() || 'en';
    return currentLang === 'es' ? '+17866977035' : '+13052983125';
  }

  getSmsUrl(message: string): string {
    const phoneNumber = this.getPhoneNumber();
    const encodedMessage = encodeURIComponent(message);

    // iOS and Android use a different separator before the `body` param
    // on the `sms:` URI scheme. Guarded for SSR (no `navigator` on server).
    const isIOS =
      typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const separator = isIOS ? '&' : '?';

    return `sms:${phoneNumber}${separator}body=${encodedMessage}`;
  }
}