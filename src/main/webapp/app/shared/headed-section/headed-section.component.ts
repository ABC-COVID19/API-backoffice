import { Component, Input } from '@angular/core';

@Component({
  selector: 'headed-section',
  templateUrl: 'headed-section.component.html',
  styleUrls: ['./headed-section.scss']
})
export class HeadedSectionComponent {
  @Input() headerPaddingBottom = '70px';
  @Input() sidePadding = '225px';
  @Input() topOffset = '-48px';
  constructor() {}
}
