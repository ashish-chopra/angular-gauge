(function (angular) {
    'use strict';

    angular
        .module('websiteApp', [])
        .controller('MainController', mainController);

    
    mainController.$inject = [];
    function mainController() {
        var vm  = this;
        vm.displayText = "Yay, the website is coming up soon..."
    }

}(angular));