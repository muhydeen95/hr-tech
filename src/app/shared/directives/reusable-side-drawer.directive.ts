import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[custom-drawer-trigger]',
})
export class ReusableSideDrawerDirective implements OnInit {
  private element: HTMLElement;
  @Input('custom-drawer-trigger') elementId!: string;
  constructor(el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.animate();
  }

  scroll() {
    try {
      const targ = document.getElementById('_scroll_');
      targ!.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }

  hasScrollBar() {
    if ($('body').height()! > $(window).height()!) {
      return true;
    }
    return false;
  }

  animate() {
    const thiss = this;
    this.element.addEventListener('click', (e) => {
      // this.scroll();
      setTimeout(() => {
        $(`#${thiss.elementId} div:first-child`).removeClass('d-none');
      }, 300);
      setTimeout(() => {
        $(`#${thiss.elementId} div:first-child`).fadeIn();
      }, 93);
      if (window.matchMedia('(min-width: 992px)').matches) {
        document.querySelector('body')!.classList.add('side-drawer-on');
      }
      $(`#${this.elementId}`).addClass('active');
      $('.sideoverlay').addClass('active');
    });
    $('.sideoverlay, .close-drawer, .sidebar-wrapper').on('click', (e) => {
      $(`#${thiss.elementId} div:first-child`).fadeOut();
      setTimeout(() => {
        $(`#${thiss.elementId}`).removeClass('active');
        $('.sideoverlay').removeClass('active');
        $(`#${thiss.elementId}`).on('transitionend', () => {
          if (
            document
              .querySelector(`#${thiss.elementId}`)!
              .classList.contains('active')
          ) {
            return;
          }
          document.querySelector('body')!.classList.remove('side-drawer-on');
        });
      }, 130);
    });
  }
}
