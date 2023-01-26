import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  collapsed = true;
  // emits event of type selected from header
  @Output() featureSelected = new EventEmitter<'recipe' | 'shopping'>();

  onSelect = (type: 'recipe' | 'shopping') => {
    this.featureSelected.emit(type);
  }
}
