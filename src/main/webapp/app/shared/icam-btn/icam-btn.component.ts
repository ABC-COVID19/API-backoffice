import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'icam-btn',
  templateUrl: 'icam-btn.component.html',
  styleUrls: ['./icam-btn.scss']
})
export class IcamBtnComponent implements OnInit {
  @Input() text = '';
  @Input() rightArrow: boolean | undefined;
  @Input() leftArrow: boolean | undefined;
  @Output() btnClick: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.rightArrow = this.rightArrow !== undefined;
    this.leftArrow = this.leftArrow !== undefined;
  }
}
