import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ICategoryTree } from '../model/ICAMApi/category-tree.model';
import { ReviewState } from '../model/enumerations/review-state.model';

@Component({
  selector: 'revision-card',
  templateUrl: 'revision-card.component.html',
  styleUrls: ['./revision-card.scss']
})
export class RevisionCardComponent {
  @Input() title = '';
  @Input() summary = '';
  @Input() articleDate = Date.now();
  @Input() author = '';
  @Input() state = '';
  @Input() categories: ICategoryTree[] = [];
  @Output() cardClick = new EventEmitter<void>();
  @Output() changeState = new EventEmitter<ReviewState>();

  states = [ReviewState.Hold, ReviewState.OnGoing, ReviewState.Pending, ReviewState.Reviewed, ReviewState.Accepted];
  constructor() {}
  @HostListener('click', ['$event'])
  onClick(): void {
    this.cardClick.emit();
  }
}
