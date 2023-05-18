import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  @Output() menuToggle = new EventEmitter<void>();
  closeMenu():void {
    this.menuToggle.emit();
  }
}
