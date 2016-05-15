'use strict';
(function(){

class MainComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('myApp')
  .component('main', {
    templateUrl: 'main/main.html',
    controller: MainComponent
  });

})();
