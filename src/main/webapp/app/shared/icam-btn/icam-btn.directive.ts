import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({ selector: '[icam-btn]' })
export class IcamBtnDirective implements OnInit {
  @Input() btnText = '';
  @Input() rightArrow: boolean | undefined;
  @Input() leftArrow: boolean | undefined;
  @Input() btnPadding = '15px 25px';
  @Input() btnWidth = '';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'padding', this.btnPadding);
    this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', '#f3dca7');
    this.renderer.setStyle(this.elRef.nativeElement, 'borderRadius', '20px');
    this.renderer.setStyle(this.elRef.nativeElement, 'borderColor', 'transparent');
    this.renderer.setStyle(this.elRef.nativeElement, 'outline', 'none');
    this.renderer.setStyle(this.elRef.nativeElement, 'fontSize', '16px');

    if (this.btnWidth) {
      this.renderer.setStyle(this.elRef.nativeElement, 'width', this.btnWidth);
    }

    if (this.leftArrow !== undefined) {
      this.addArrowIcon('left');
      this.addTextNode();
    } else if (this.rightArrow !== undefined) {
      this.addTextNode();
      this.addArrowIcon('right');
    }
  }

  addArrowIcon(direction: 'left' | 'right'): void {
    const span = this.renderer.createElement('span');
    const icon = this.renderer.createElement('i');
    this.renderer.setStyle(span, 'color', '#151344');
    this.renderer.setStyle(icon, `margin-${direction === 'left' ? 'right' : 'left'}`, '12px');
    this.renderer.addClass(icon, 'fal');
    this.renderer.addClass(icon, `fa-arrow-${direction}`);
    this.renderer.appendChild(span, icon);
    this.renderer.appendChild(this.elRef.nativeElement, span);
  }

  addTextNode(): void {
    const txtSpan = this.renderer.createElement('span');
    this.renderer.setStyle(txtSpan, 'color', '#151344');
    this.renderer.setProperty(txtSpan, 'textContent', this.btnText);
    this.renderer.appendChild(this.elRef.nativeElement, txtSpan);
  }
}
