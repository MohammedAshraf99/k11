import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-checkout',
    imports: [MatIcon],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})
export class CheckoutComponent{
  private readonly toastService = inject(ToasterService);
  private readonly router = inject(Router);

  // Store information (Display details for bank wire)
  readonly storeBankName = 'Oud Shop International Bank';
  readonly storeIBAN = 'US76 OUDO 9876 5432 1000 99';
  readonly storeSwift = 'OUDSUS33XXX';

  // User input states managed via lightweight signals
  readonly senderAccountName = signal<string>('');
  readonly senderAccountNumber = signal<string>('');
  readonly isProcessing = signal<boolean>(false);

  // Form validation calculated reactively
  readonly isFormValid = computed(() => {
    const name = this.senderAccountName().trim();
    const accNum = this.senderAccountNumber().trim();
    // Validates name length and basic account number length requirements
    return name.length >= 3 && accNum.length >= 8;
  });

  handlePlaceOrder(): void {
    if (!this.isFormValid() || this.isProcessing()) return;

    this.isProcessing.set(true);

    // Simulate backend payment submission delay
    setTimeout(() => {
      this.isProcessing.set(false);
      
      // Fire success notification using our Angular 20 Toast Engine
      this.toastService.show(
        'Order submitted! We will verify your bank transfer immediately.', 
        'success', 
        5000
      );

      // Route customer to an order confirmation screen or home index
      this.router.navigate(['/']);
    }, 2500);
  }
}
