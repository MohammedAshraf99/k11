import { Component, inject } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {
readonly toastService = inject(ToasterService);
}
