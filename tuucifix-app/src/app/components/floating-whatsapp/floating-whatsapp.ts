import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappService } from '../../services/whatsapp';
import { SmsService } from '../../services/sms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-floating-whatsapp',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './floating-whatsapp.html',
  styleUrl: './floating-whatsapp.css',
})
export class FloatingWhatsapp {
  menuOpen = false;

  emailPrimary = 'info@tuucifix.com';
  emailSupport = 'contactus@tuucifix.com';

  constructor(
    private whatsappService: WhatsappService,
    private smsService: SmsService
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  // Cierra el menú si el usuario hace click fuera de él.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.menuOpen) return;
    const target = event.target as HTMLElement;
    if (!target.closest('.tuucifix-contact-widget')) {
      this.closeMenu();
    }
  }

  openWhatsapp() {
    const defaultMessage = 'Hello TUUCIFIX, I need assistance with my luxury umbrella.';
    const url = this.whatsappService.getWhatsappUrl(defaultMessage);
    window.open(url, '_blank');
    this.closeMenu();
  }

  openSms() {
    const defaultMessage = 'Hello TUUCIFIX, I need assistance with my luxury umbrella.';
    const url = this.smsService.getSmsUrl(defaultMessage);
    window.open(url, '_self');
    this.closeMenu();
  }

  openEmail(address: string) {
    window.open(`mailto:${address}`, '_self');
    this.closeMenu();
  }
}