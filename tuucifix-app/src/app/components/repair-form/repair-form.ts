import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { WhatsappService } from '../../services/whatsapp';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-repair-form',
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './repair-form.html',
  styleUrl: './repair-form.css',
})
export class RepairForm implements OnInit {
  repairForm: FormGroup;
  showSummaryModal = false;

  tuuciModels = [
    { value: 'ocean_master', label: 'FORM.MODEL_OCEAN_MASTER', display: 'Ocean Master MAX' },
    { value: 'bay_master', label: 'FORM.MODEL_BAY_MASTER', display: 'Bay Master' },
    { value: 'plantation', label: 'FORM.MODEL_PLANTATION', display: 'Plantation / Aluma-Teak' },
    { value: 'cantilever', label: 'FORM.MODEL_CANTILEVER', display: 'Cantilever' },
    { value: 'other', label: 'FORM.MODEL_OTHER', display: 'Other' }
  ];

  damagedParts = [
    { value: 'canopy', label: 'FORM.PART_CANOPY', desc: 'FORM.PART_CANOPY_DESC', icon: '🏖️', display: 'Canopy' },
    { value: 'frame', label: 'FORM.PART_FRAME', desc: 'FORM.PART_FRAME_DESC', icon: '🔩', display: 'Frame' },
    { value: 'hardware', label: 'FORM.PART_HARDWARE', desc: 'FORM.PART_HARDWARE_DESC', icon: '⚙️', display: 'Hardware' },
    { value: 'base', label: 'FORM.PART_BASE', desc: 'FORM.PART_BASE_DESC', icon: '🪨', display: 'Base' }
  ];

  frequencies = [
    { value: 'once', label: 'FORM.FREQ_ONCE', icon: '1️⃣', display: 'One-time' },
    { value: 'biannual', label: 'FORM.FREQ_BIANNUAL', icon: '📅', display: 'Bi-annual' },
    { value: 'quarterly', label: 'FORM.FREQ_QUARTERLY', icon: '🔄', display: 'Quarterly' }
  ];

  constructor(
    private fb: FormBuilder,
    private whatsappService: WhatsappService,
    private seoService: SeoService,
    private translate: TranslateService
  ) {
    this.repairForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      serviceType: ['preventive', Validators.required],
      umbrellaModel: ['', Validators.required],
      maintenanceFrequency: ['once'],
      damagedPart: [''],
      damageDescription: ['']
    });
  }

  ngOnInit() {
    this.seoService.updateTitle('Request Repair Service - TUUCI FIX');

    this.repairForm.get('serviceType')?.valueChanges.subscribe(value => {
      const partControl = this.repairForm.get('damagedPart');
      const freqControl = this.repairForm.get('maintenanceFrequency');

      if (value === 'repair') {
        partControl?.setValidators([Validators.required]);
        freqControl?.clearValidators();
        freqControl?.setValue('');
      } else {
        partControl?.clearValidators();
        partControl?.setValue('');
        freqControl?.setValidators([Validators.required]);
        if (!freqControl?.value) {
          freqControl?.setValue('once');
        }
      }
      partControl?.updateValueAndValidity();
      freqControl?.updateValueAndValidity();
    });
  }

  get completedFields(): number {
    let count = 0;
    const v = this.repairForm.value;
    if (v.name) count++;
    if (v.phone) count++;
    if (v.umbrellaModel) count++;
    if (v.serviceType === 'preventive' && v.maintenanceFrequency) count++;
    if (v.serviceType === 'repair' && v.damagedPart) count++;
    return count;
  }

  get totalFields(): number {
    return this.repairForm.value.serviceType === 'repair' ? 5 : 4;
  }

  get progressPercent(): number {
    return Math.round((this.completedFields / this.totalFields) * 100);
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.repairForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.repairForm.get(fieldName);
    return !!(control && control.valid && control.value && (control.dirty || control.touched));
  }

  openSummary() {
    Object.keys(this.repairForm.controls).forEach(key => {
      this.repairForm.get(key)?.markAsTouched();
    });

    if (this.repairForm.valid) {
      this.showSummaryModal = true;
    }
  }

  closeSummary() {
    this.showSummaryModal = false;
  }

  getModelLabel(value: string): string {
    const model = this.tuuciModels.find(m => m.value === value);
    return model ? model.label : value;
  }

  getModelDisplay(value: string): string {
    const model = this.tuuciModels.find(m => m.value === value);
    return model ? model.display : value;
  }

  getPartLabel(value: string): string {
    const part = this.damagedParts.find(p => p.value === value);
    return part ? part.label : value;
  }

  getPartDisplay(value: string): string {
    const part = this.damagedParts.find(p => p.value === value);
    return part ? part.display : value;
  }

  getFrequencyLabel(value: string): string {
    const freq = this.frequencies.find(f => f.value === value);
    return freq ? freq.label : value;
  }

  getFrequencyDisplay(value: string): string {
    const freq = this.frequencies.find(f => f.value === value);
    return freq ? freq.display : value;
  }

  onSubmit() {
    const v = this.repairForm.value;
    const isRepair = v.serviceType === 'repair';
    const lang = this.translate.getCurrentLang() || 'en';
    const isEs = lang === 'es';

    let message: string;

    if (isEs) {
      message = `Hola TUUCIFIX, necesito un servicio de ${isRepair ? 'Reparación' : 'Mantenimiento Preventivo'}.\n`;
      message += `Nombre: ${v.name}\n`;
      message += `Teléfono: ${v.phone}\n`;
      if (v.umbrellaModel) {
        message += `Modelo: ${this.getModelDisplay(v.umbrellaModel)}\n`;
      }
      if (isRepair) {
        if (v.damagedPart) {
          message += `Parte dañada: ${this.getPartDisplay(v.damagedPart)}\n`;
        }
        if (v.damageDescription) {
          message += `Detalles: ${v.damageDescription}\n`;
        }
      } else {
        if (v.maintenanceFrequency) {
          message += `Frecuencia: ${this.getFrequencyDisplay(v.maintenanceFrequency)}\n`;
        }
      }
    } else {
      message = `Hello TUUCIFIX, I need a ${isRepair ? 'Repair' : 'Preventive Maintenance'} service.\n`;
      message += `Name: ${v.name}\n`;
      message += `Phone: ${v.phone}\n`;
      if (v.umbrellaModel) {
        message += `Model: ${this.getModelDisplay(v.umbrellaModel)}\n`;
      }
      if (isRepair) {
        if (v.damagedPart) {
          message += `Damaged Part: ${this.getPartDisplay(v.damagedPart)}\n`;
        }
        if (v.damageDescription) {
          message += `Details: ${v.damageDescription}\n`;
        }
      } else {
        if (v.maintenanceFrequency) {
          message += `Frequency: ${this.getFrequencyDisplay(v.maintenanceFrequency)}\n`;
        }
      }
    }

    const whatsappUrl = this.whatsappService.getWhatsappUrl(message);
    window.open(whatsappUrl, '_blank');
    this.showSummaryModal = false;
  }
}
