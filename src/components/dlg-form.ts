//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {UIDialog} from "../resources/utils/ui-dialog";

@autoinject()
export class DlgForm extends UIDialog {
  constructor() { super(); }

  // aurelia hooks
  canActivate(model) {
    this.modal = model.modal;
    this.printConsole = model.printConsole;
    this.printConsole(this.id, 'canActivate');
    return true;
  }
  activate(model) {
    this.printConsole(this.id, 'activate');
    return true;
  }
  bind(bindingContext) { this.printConsole(this.id, 'bind'); super.bind(); }
  attached() { this.printConsole(this.id, 'attached'); }
  detached() { this.printConsole(this.id, 'detached'); }
  unbind() { this.printConsole(this.id, 'unbind'); }
  deactivate() { this.printConsole(this.id, 'deactivate'); }
  // end aurelia hooks

  id = "dlgForm";
  title = "Form Dialog";
  glyph = "icon-fill-document-table";

  printConsole;

  closing = false;
  close() {
    this.closing = true;
    setTimeout(() => super.close(), 2000);
  }
}
