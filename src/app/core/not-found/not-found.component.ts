import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-not-found',
    imports: [MatIcon],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  // Safely takes the user back to the exact previous catalog screen
  handleGoBack(): void {
  }
}