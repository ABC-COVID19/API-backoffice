import { Component, Input } from '@angular/core';

@Component({
  selector: 'round-card',
  templateUrl: 'round-card.component.html',
  styleUrls: ['./round-card.scss']
})
export class RoundCardComponent {
  @Input() paddingTop = '10px';
  @Input() paddingRight = '10px';
  @Input() paddingBottom = '10px';
  @Input() paddingLeft = '10px';
  @Input() borderRadius = '20px';
  constructor() {}
}
