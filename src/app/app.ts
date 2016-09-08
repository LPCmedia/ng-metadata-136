import { Component } from 'ng-metadata/core';
import { AcqTitle } from './../components';
@Component({
  selector: 'app',
  directives: [AcqTitle],
  template: `<acq-title>Hello</acq-title>`
})
export class AppComponent {
}