import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  constructor(private translate: TranslateService) {}

  getWhatsappUrl(message: string): string {
    const currentLang = this.translate.getCurrentLang() || 'en';
    const phoneNumber = currentLang === 'es' ? '17866977035' : '13052983125';
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }
}
