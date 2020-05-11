import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'round-card',
  templateUrl: 'round-card.component.html',
  styleUrls: ['./round-card.scss']
})
export class RoundCardComponent {
  @HostBinding('style.padding-top') @Input() paddingTop = '10px';
  @HostBinding('style.padding-right') @Input() paddingRight = '10px';
  @HostBinding('style.padding-bottom') @Input() paddingBottom = '10px';
  @HostBinding('style.padding-left') @Input() paddingLeft = '10px';
  @HostBinding('style.border-radius') @Input() borderRadius = '20px';
  constructor() {}
}
