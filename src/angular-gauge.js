(function (angular) {
    angular
        .module('angularGauge', [])
        .directive('ngGauge', gaugeMeterDirective);

    gaugeMeterDirective.$inject = [];

    function gaugeMeterDirective() {
        var Gauge = function (element, options) {
            this.element = element;
            this.context = element.getContext('2d');
            this.options = options;
            console.log(this.options);
            this.create();
        };

        Gauge.prototype.getRadius = function () {
            var center = this.getCenter(),
                radius = center.x - this.options.thick;
            return radius;
        };
        Gauge.prototype.drawBackground = function (start, end) {
            var context = this.context,
                center = this.getCenter(),
                radius = this.getRadius();
            context.beginPath();
            context.arc(center.x, center.y, radius, start, end, false);
            context.lineCap = "round";
            context.lineWidth = this.options.thick;
            context.strokeStyle = "rgba(255,255,255,0.2)";
            context.stroke();

        };
        Gauge.prototype.addLabelByCanvas = function () {
            var center = this.getCenter(),
                context = this.context;
            context.font = "32px 'Open Sans'";
            context.textAlign = "center";
            context.fillText("40 mph", center.x, center.y);
            var c = context.measureText("40").width * 3 / 4 + 10;
            context.font = "16px 'Open Sans'";
            context.fillText("mph", center.x + c, center.y);
            context.font = "12px 'Open Sans'";
            context.fillText("Hello World", center.x, center.y + 20);

        }
        
        Gauge.prototype.addLabel = function() {
            
        }
        Gauge.prototype.create = function () {
            var center = this.getCenter(),
                movePerFrame = 0.0174532925;
            if (this.options.type == 'semi') {
                var head = Math.PI,
                    tail = 2 * Math.PI;
            } else if (this.options.type == 'full') {
                var head = 1.5 * Math.PI,
                    tail = 3.5 * Math.PI;
            } else if(this.options.type === 'arch') {
                var head = 0.8 * Math.PI,
                    tail = 2.2 * Math.PI;
            }
            var context = this.context,
                value = this.options.value;
            radius = this.getRadius();
            this.drawBackground(head, tail);


            var distance = tail - head;
            tail = head + (distance * value) / 100;
            console.log(tail);

            var stripe = this.options.stripe || 2;
            var thick = this.options.thick;

            function animate() {
                requestID = window.requestAnimationFrame(animate);

                if (head <= tail) {
                    context.beginPath();
                    var newPos = head + 2 * stripe * movePerFrame;
                    context.arc(center.x, center.y, radius, head, newPos, false);

                    context.lineCap = 'butt';
                    context.lineWidth = thick;
                    context.strokeStyle = "#ffcc66";
                    context.stroke();
                    head = newPos + stripe * movePerFrame;

                } else {
                    cancelAnimationFrame(requestID);
                }
            }
            console.log("stripe" + stripe);
            this.addLabel();
            animate();
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

        Gauge.prototype.update = function (val) {
            this.clear();
            this.options.value = val;
            this.create();
        }

        return {
            restrict: 'E',
            replace: true,
            template: "<div class='parent'><span class='text text-span'>{{value}}<u>%</u></span><b class='text text-b'>Speed</b><canvas height='200' width='200'></canvas></div>",
            scope: {
                value: "=",
                used: "=",
                total: "=",
                type: "@",
                size: "@",
                thick: "@",
                stripe: "@",
                label: "@",
                text: "@"
            },
            controller: function ($scope) {
                var defaultOptions = {
                    size: 180,
                    thick: 2,
                    type: 'full'
                };
                var vm = this;
                vm.options = angular.extend({}, $scope);
                console.log(vm.options);
            },
            link: function (scope, element, attrs, ctrl) {
                if (scope.value && scope.value != '') {
                    setTimeout(function () {
                        initOrUpdateGauge();
                    })
                }

                var gauge;

                function initOrUpdateGauge() {
                    if (!gauge) {
                        var options = {
                            type: ctrl.options.type,
                            size: ctrl.options.size,
                            value: ctrl.options.value,
                            thick: ctrl.options.thick,
                            stripe: ctrl.options.stripe
                        };
                        console.log(options.thick);
                        gauge = new Gauge(element.find("canvas")[0], options);
                        console.log(gauge);
                    } else {
                        // update gauge
                    }
                }

                // monitor changes in directive scope
                scope.$watch('value', function (newVal) {
                    if (gauge)
                        gauge.update(newVal);
                });

            }
        }
    }
}(angular));