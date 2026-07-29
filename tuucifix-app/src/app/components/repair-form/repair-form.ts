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
    { value: 'ocean_master', label: 'FORM.MODEL_OCEAN_MASTER' },
    { value: 'bay_master', label: 'FORM.MODEL_BAY_MASTER' },
    { value: 'plantation', label: 'FORM.MODEL_PLANTATION' },
    { value: 'cantilever', label: 'FORM.MODEL_CANTILEVER' },
    { value: 'other', label: 'FORM.MODEL_OTHER' }
  ];

  damagedParts = [
    { value: 'canopy', label: 'FORM.PART_CANOPY', desc: 'FORM.PART_CANOPY_DESC', icon: '🏖️' },
    { value: 'frame', label: 'FORM.PART_FRAME', desc: 'FORM.PART_FRAME_DESC', icon: '🔩' },
    { value: 'hardware', label: 'FORM.PART_HARDWARE', desc: 'FORM.PART_HARDWARE_DESC', icon: '⚙️' },
    { value: 'base', label: 'FORM.PART_BASE', desc: 'FORM.PART_BASE_DESC', icon: '🪨' }
  ];

  frequencies = [
    { value: 'once', label: 'FORM.FREQ_ONCE', icon: '1️⃣' },
    { value: 'biannual', label: 'FORM.FREQ_BIANNUAL', icon: '📅' },
    { value: 'quarterly', label: 'FORM.FREQ_QUARTERLY', icon: '🔄' }
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
      const damageControl = this.repairForm.get('damageDescription');
      const partControl = this.repairForm.get('damagedPart');
      const freqControl = this.repairForm.get('maintenanceFrequency');

      if (value === 'repair') {
        damageControl?.setValidators([Validators.required]);
        partControl?.setValidators([Validators.required]);
        freqControl?.clearValidators();
        freqControl?.setValue('');
      } else {
        damageControl?.clearValidators();
        damageControl?.setValue('');
        partControl?.clearValidators();
        partControl?.setValue('');
        freqControl?.setValidators([Validators.required]);
        if (!freqControl?.value) {
          freqControl?.setValue('once');
        }
      }
      damageControl?.updateValueAndValidity();
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
    if (v.serviceType === 'repair' && v.damageDescription) count++;
    return count;
  }

  get totalFields(): number {
    return this.repairForm.value.serviceType === 'repair' ? 6 : 4;
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
    // Mark all fields as touched to trigger validation display
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

  getPartLabel(value: string): string {
    const part = this.damagedParts.find(p => p.value === value);
    return part ? part.label : value;
  }

  getFrequencyLabel(value: string): string {
    const freq = this.frequencies.find(f => f.value === value);
    return freq ? freq.label : value;
  }

  onSubmit() {
    const v = this.repairForm.value;
    const isRepair = v.serviceType === 'repair';

    let message = `Hello TUUCIFIX, I need a ${isRepair ? 'Repair' : 'Preventive Maintenance'} service.\n`;
    message += `Name: ${v.name}\n`;
    message += `Phone: ${v.phone}\n`;

    if (v.umbrellaModel) {
      const modelObj = this.tuuciModels.find(m => m.value === v.umbrellaModel);
      message += `Model: ${modelObj ? modelObj.value : v.umbrellaModel}\n`;
    }

    if (isRepair) {
      if (v.damagedPart) {
        message += `Damaged Part: ${v.damagedPart}\n`;
      }
      if (v.damageDescription) {
        message += `Details: ${v.damageDescription}\n`;
      }
    } else {
      if (v.maintenanceFrequency) {
        message += `Frequency: ${v.maintenanceFrequency}\n`;
      }
    }

    const whatsappUrl = this.whatsappService.getWhatsappUrl(message);
    window.open(whatsappUrl, '_blank');
    this.showSummaryModal = false;
  }
}
