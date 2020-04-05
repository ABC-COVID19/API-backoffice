import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'article-card',
  templateUrl: 'article-card.component.html',
  styleUrls: ['./article-card.scss']
})
export class ArticleCardComponent {
  @Input() title = '';
  @Input() summary = '';
  @Input() articleDate = Date.now();
  @Input() author = '';
  @Input() category = '';
  @Output() cardClick = new EventEmitter<void>();

  constructor() {}

  @HostListener('click', ['$event'])
  onClick(): void {
    this.cardClick.emit();
  }
}
