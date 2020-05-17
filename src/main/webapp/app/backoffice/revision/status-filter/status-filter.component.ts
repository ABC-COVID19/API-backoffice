import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';
import { reviewStates } from '../status';

@Component({
  selector: 'revision-status-filter',
  templateUrl: 'status-filter.component.html',
  styleUrls: ['./status-filter.component.scss']
})
export class StatusFilterComponent implements OnInit {
  @Output() change: EventEmitter<ReviewState[]> = new EventEmitter();
  hidden = true;
  states = reviewStates;
  selected = new Set(this.states.map(s => s.value));

  @HostListener('mouseleave')
  hide(): void {
    this.hidden = true;
  }

  ngOnInit(): void {
    this.notify();
  }

  toggle(e: Event, status: ReviewState): void {
    e.stopPropagation();
    const fn = this.selected.has(status) ? 'delete' : 'add';
    this.selected[fn](status);
    this.notify();
  }

  notify(): void {
    this.change.emit([...this.selected]);
  }
}
