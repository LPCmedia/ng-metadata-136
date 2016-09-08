import * as angular from 'angular';
import { expect } from 'chai';
import { AcqTitle } from './title';
import { renderFactory, IRender } from 'ng-metadata/testing';
import { bundle, getInjectableName, Component } from 'ng-metadata/core';
import * as lodash from 'lodash';

describe(`Components - ACQ Title`, () => {

  // create a test component to mock our component
  @Component( {
    selector: 'test-component',
    directives: [ AcqTitle ],
    template: `<acq-title></acq-title>`
  } )
  class TestComponent {
  }

  const TestModule: string = bundle(TestComponent).name;

  let $compile: ng.ICompileService;
  let $rootScope: ng.IRootScopeService;
  let $scope: ng.IScope;
  let render: IRender<TestComponent>;

  beforeEach(() => {
    // load our created Angular Module
    angular.mock.module(TestModule);
  });

  beforeEach(angular.mock.inject(($injector: ng.auto.IInjectorService) => {

    $compile = $injector.get<ng.ICompileService>('$compile');
    $rootScope = $injector.get<ng.IRootScopeService>('$rootScope');
    $scope = $rootScope.$new();

    render = renderFactory( $compile, $scope );

  }));

  it(`should have the expected structure`, () => {

    // it returns instance and compiled DOM of testComponent
    const {compiledElement} = render(TestComponent);

    // now we need to get our tested component
    const {debugElement, componentInstance} = queryByDirective(compiledElement, AcqTitle);
    expect(componentInstance instanceof AcqTitle).to.equal(true);
    expect(debugElement[0].outerHTML).to.equal('<acq-title class="ng-isolate-scope"></acq-title>'); // ng-metadata auto add this
  });

});

// helper - this will be implemented to ng-metadata in next release
// todo place this helper in test folder
function queryByDirective<T extends Type>( host: ng.IAugmentedJQuery, Type: T ) {
  const ctrlName = getInjectableName( Type );
  const selector = lodash.kebabCase( ctrlName );
  const debugElement = host.find( selector );
  const componentInstance = debugElement.controller( ctrlName ) as T;

  return { debugElement, componentInstance };
}