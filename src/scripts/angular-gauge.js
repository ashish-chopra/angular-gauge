(function (angular) {
    angular
        .module('ng-gauge', [])
        .directive('gaugeMeter', gaugeMeterDirective)
        .directive("progressBar", function () {
            return {
                restrict: 'E',
                scope: {
                    progress: '=',
                    progressId: '@'
                },
                template: "<canvas id='pgcanvas' width='400' height='30'  background-color: #F00'/>",
                link: function (scope, element, attrs) {
                    console.log(element);
                    scope.canvas = element.find('canvas')[0];
                    scope.context = scope.canvas.getContext('2d');

                    scope.$watch('progress', function (newValue) {
                        barWidth = Math.ceil(newValue / 100 * scope.canvas.width);
                        scope.context.fillStyle = "#DDD";
                        scope.context.fillRect(0, 0, scope.canvas.width, scope.canvas.height);
                        scope.context.fillStyle = "#F00";
                        scope.context.fillRect(0, 0, barWidth, scope.canvas.height);
                    });
                }
            };
        });

    gaugeMeterDirective.$inject = [];

    function gaugeMeterDirective() {
        var Gauge = function (element, options) {
            this.element = element;
            this.context = element.getContext('2d');
            this.options = options;
            console.log(this);

            this.create();
        };

        Gauge.prototype.create = function () {
            var center = this.getCenter(),
                movePerFrame = 0.0174532925;
            if (this.options.type == 'arch') {
                var head = Math.PI,
                    tail = 2 * Math.PI;
            } else if (this.options.type == 'full') {
                var head = 1.5 * Math.PI,
                    tail = 3.5 * Math.PI;
            }
            var context = this.context,
                radius = center.x - this.options.width;
            context.beginPath();
            context.arc(center.x, center.y, radius, head, tail, false);
            context.lineWidth = this.options.width;
            context.strokeStyle = "#ccc";
            context.stroke();

            animate();

            function animate() {
                requestID = window.requestAnimationFrame(animate);

                if (head <= tail - 40 * movePerFrame) {
                    context.beginPath();
                    var newPos = head + 3 * movePerFrame;
                   
                    context.arc(center.x, center.y, radius, head, newPos, false);
                    
                    context.lineCap = 'butt';
                    context.strokeStyle = "orange";
                    context.stroke();
                    head = newPos;

                } else {
                    cancelAnimationFrame(requestID);
                }
            }
        };

        Gauge.prototype.clear = function () {
            var center = this.getCenter();
            this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
        };

        Gauge.prototype.getCenter = function () {
            var x = this.context.canvas.width / 2,
                y = this.context.canvas.height / 2;
            return {
                x: x,
                y: y
            };
        }

        Gauge.prototype.getWidth = function () {
            return this.context.canvas.width;
        }
        Gauge.prototype.getHeight = function () {
            return this.context.canvas.height;
        }


        return {
            restrict: 'E',
            replace: true,
            template: "<canvas height='180' width='180'></canvas>",
            scope: {
                gaugeValue: "=",
                used: "=",
                total: "=",
                type: "@",
                gaugeSize: "@",
                width: "@",
                stripe: "@",
                label: "@",
                text: "@"
            },
            controller: function ($scope) {
                var defaultOptions = {
                    size: 200,
                    width: 1,
                    label: "",
                    text: "",
                    stripe: 0
                }

            },
            link: function (scope, element, attrs, ctrl) {
                if (scope.gaugeValue && scope.gaugeValue != '') {
                    setTimeout(function () {
                        initOrUpdateGauge();
                    })
                }

                var gauge;

                function initOrUpdateGauge() {
                    if (!gauge) {
                        var options = {
                            type: 'full',
                            size: 400,
                            width: 2,
                            value: 53
                        };
                        gauge = new Gauge(element[0], options);
                    } else {
                        // update gauge
                    }
                }

                // monitor changes in directive scope
                scope.$watch('gaugeValue', function (newVal) {
                    // do something when gauge's value updated 
                    // gauge.update(newVal);
                });

            }
        }
    }
}(angular));



/*


g = new Gauge(elem, options);

options:
    - type
    - size
    - width
    - value

gauge.update()
gauge.destroy()
gauge.create()
gauge.setOptions()
gauge.setLabel()
gauge.setText()









*/