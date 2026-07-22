import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [MatIcon,RouterLink],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css',
})
export class EmptyComponent {
  // ما زلنا نستقبل اسم الأيقونة كمعامل مرن
  @Input({ required: true }) icon!: string;
}
