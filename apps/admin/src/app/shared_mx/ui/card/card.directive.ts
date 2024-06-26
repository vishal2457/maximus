import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  inject,
  OnInit,
} from "@angular/core";
import { mergetw } from "../../utils/tw-merge";

@Directive()
class BaseCardClass {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  @Input() class = "";

  protected initClass(baseClass: string) {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      "class",
      mergetw(baseClass, this.class)
    );
  }
}

@Directive({
  selector: "[mx-card]",
})
export class MxCardDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass("rounded-lg border bg-card text-card-foreground shadow-sm");
  }
}

@Directive({
  selector: "[mx-card-title]",
})
export class MxCardTitleDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass("text-sm font-semibold leading-none tracking-tight");
  }
}

@Directive({
  selector: "[mx-card-header]",
})
export class MxCardHeaderDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass("flex flex-col space-y-1.5 p-6");
  }
}

@Directive({
  selector: "[mx-card-footer]",
})
export class MxCardFooterDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass("flex items-center p-6 pt-0");
  }
}

@Directive({
  selector: "[mx-card-content]",
})
export class MxCardContentDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass("p-6 pt-0");
  }
}
