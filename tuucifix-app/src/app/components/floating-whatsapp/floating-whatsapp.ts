import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappService } from '../../services/whatsapp';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-floating-whatsapp',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './floating-whatsapp.html',
  styleUrl: './floating-whatsapp.css',
})
export class FloatingWhatsapp implements OnInit {
  showPulse = false;

  constructor(private whatsappService: WhatsappService) {}

  ngOnInit() {
    setTimeout(() => {
      this.showPulse = true;
    }, 5000);
  }

  openWhatsapp() {
    const defaultMessage = 'Hello TUUCIFIX, I need assistance with my luxury umbrella.';
    const url = this.whatsappService.getWhatsappUrl(defaultMessage);
    window.open(url, '_blank');
  }
}
