import { Component, Input } from '@angular/core';

@Component({
  selector: 'icam-badge',
  templateUrl: 'icam-badge.component.html',
  styleUrls: ['./icam-badge.scss']
})
export class IcamBadgeComponent {
  @Input() iconClass = '';
  @Input() text = '';

  constructor() {}
}
