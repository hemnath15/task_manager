import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
@Output() toggleNew = new EventEmitter<void>();

onToggle() {
  this.toggleNew.emit();
}
}
