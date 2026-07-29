import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FloatingWhatsapp } from './components/floating-whatsapp/floating-whatsapp';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, FloatingWhatsapp, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  currentLang = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.use('en');
  }

  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }
}
