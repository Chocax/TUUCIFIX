import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateTitle('TUUCI FIX - Luxury Umbrella Maintenance in Miami');
    this.seoService.updateMetaTags(
      'Premium preventive maintenance and repair services for TUUCI luxury umbrellas in Miami.',
      'TUUCI, umbrella repair, luxury umbrellas, Miami, patio furniture maintenance'
    );
  }
}
