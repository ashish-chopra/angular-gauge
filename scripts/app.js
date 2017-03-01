(function (angular) {
    'use strict';

    angular
        .module('websiteApp', ['ngMaterial', 'angularjs-gauge', 'hljs'])
        .config(configApp)
        .controller('MainController', mainController);

    configApp.$inject = ['$mdThemingProvider'];
    function configApp($mdThemingProvider) {
       // $mdThemingProvider.disableTheming();
    }

    mainController.$inject = [];
    function mainController() {
        var vm  = this;
        vm.displayText = "Yay, the website is coming up soon...";
        vm.currentPrice  = 101;
    }

}(angular));