import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface ITemplateVariableDirectiveContext {
  $implicit: any; // enables 'let' keyword
  adaLet: any; // enables 'as' keyword
}

@Directive({
  selector: '[laLet]',
})
export class TemplateVariableDirective {
  private _context: ITemplateVariableDirectiveContext = {
    $implicit: null,
    adaLet: null,
  };

  constructor(
    private _template: TemplateRef<any>,
    private _viewContainer: ViewContainerRef
  ) {}

  @Input('adaLet')
  set context(_context: any) {
    this._context.$implicit = this._context.adaLet = _context;
    this.attachTemplate();
  }

  private attachTemplate(): void {
    this._viewContainer.clear();
    this._viewContainer.createEmbeddedView(this._template, this._context);
  }
}
