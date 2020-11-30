import { Directive, ElementRef, Input , OnInit, OnChanges} from '@angular/core';

@Directive({
  selector: '[appDynamicBackground]'
})
export class DynamicBackgroundDirective implements OnInit, OnChanges {
  @Input('appDynamicBackground') bgURL: string;

  constructor(private el: ElementRef) {
  }

  private setBackground(): void {
    if (this.bgURL === null) {
      this.el.nativeElement.style.backgroundImage = `url("http://designmadeinjapan.com/site/wp-content/uploads/2015/07/tumblr_nr2569nqX01qze3hdo1_r2_500.gif")`;
    } else {
      this.el.nativeElement.style.backgroundImage = `url("${this.bgURL}")`;
    }
  }

  ngOnInit(): void {
    this.setBackground();
  }

  ngOnChanges(): void {
    this.setBackground();
  }
}
