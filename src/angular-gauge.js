(function (angular) {
    angular
        .module('angularGauge', [])
        .directive('ngGauge', gaugeMeterDirective);

    gaugeMeterDirective.$inject = [];

    function gaugeMeterDirective() {

        var defaults = {
            size: 200,
            type: 'full',
            thick: 2,
            cap: "butt",
            label: null,
            text: null
        };

        var Gauge = function (element, options) {
            this.element = element.find("canvas")[0];
            this.context = this.element.getContext('2d');
            this.context.canvas.width = options.size;
            this.context.canvas.height = options.size;
            this.context.lineCap = options.cap;
            this.context.lineWidth = options.thick;
            this.options = options;
            this.label = element.find("span");
            // styling
            element.find("span").css({
                display: 'inline-block',
                fontWeight: 100,
                width: '100%',
                position: 'absolute',
                fontFamily: 'Open Sans',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '44px',
                lineHeight: '200px'
            });
            element.find("b").css({
                display: 'inline-block',
                fontWeight: 100,
                width: '100%',
                position: 'absolute',
                fontFamily: 'Open Sans',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '15.3846px',
                lineHeight: '276.923px',
                fontWeight: 200
            });


            element.find("u").css({
                textDecoration: 'none',
                fontSize: '0.6em',
                fontWeight: 200
            })
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
            context.strokeStyle = this.options.backgroundColor;
            context.stroke();

        };

        Gauge.prototype.create = function () {
            var center = this.getCenter(),
                movePerFrame = 0.0174532925;
            if (this.options.type == 'semi') {
                var head = Math.PI,
                    tail = 2 * Math.PI;
            } else if (this.options.type == 'full') {
                var head = 1.5 * Math.PI,
                    tail = 3.5 * Math.PI;
            } else if (this.options.type === 'arch') {
                var head = 0.8 * Math.PI,
                    tail = 2.2 * Math.PI;
            }

            this.drawBackground(head, tail);
            var context = this.context,
                value = this.options.value,
                radius = this.getRadius(),
                thick = this.options.thick,
                foregroundColor = this.options.foregroundColor,
                requestID;

            var distance = tail - head,
                label = this.label;
            tail = head + ((tail - head) * value) / 100;

            function animate() {
                requestID = window.requestAnimationFrame(animate);

                if (head <= tail) {
                    context.beginPath();
                    var newPos = head + 2 * movePerFrame;
                    context.arc(center.x, center.y, radius, head, newPos, false);
                    context.strokeStyle = foregroundColor;
                    context.stroke();
                    head = newPos;
                } else {
                    cancelAnimationFrame(requestID);
                }
            }
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
        Gauge.prototype.destroy = function () {

        }


        var getOptions = function (scope) {
            var opts = angular.extend({}, defaults, scope || {});
            return opts;
        }

        return {
            restrict: 'E',
            replace: true,
            template: "<div style='display:inline; margin: 0 10px;text-align: center;position: relative;          width: 200px;'><span><u>{{prepend}}</u>{{value}}<u>{{append}}</u></span><b>{{label}}</b><canvas height='200' width='200'></canvas></div>",
            scope: {
                append: "@",
                backgroundColor: "@",
                cap: "@",
                foregroundColor: "@",
                label: "@",
                size: "@",
                thick: "@",
                type: "@",
                value: "=",
                prepend: "@",
                append: "@"
            },
            link: function (scope, element, attrs, ctrl) {
                if (angular.isDefined(scope.value) && scope.value !== "") {
                    setTimeout(function () {
                        initOrUpdateGauge();
                    })
                }
//                initOrUpdateGauge();
                var gauge;

                scope.$watch('value', function (newVal, oldVal) {
                    console.log('inside value changed fn' + newVal, +" " + oldVal);
                    if (gauge)
                        gauge.update(newVal);
                });

                scope.$on('$destroy', function () {
                    gauge.destroy();
                })

                function initOrUpdateGauge() {
                    if (!gauge) {
                        var options = getOptions(scope);
                        gauge = new Gauge(element, options);
                        console.log("inside initorupdate fn");
                    } else {
                        // update gauge
                    }
                }
            }
        }
    }
}(angular));