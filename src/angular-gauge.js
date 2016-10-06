(function (angular) {
    angular
        .module('angularGauge', [])
        .directive('ngGauge', gaugeMeterDirective);

    gaugeMeterDirective.$inject = [];

    function gaugeMeterDirective() {

        var tpl = "<div style='display:inline; margin: 0 10px;text-align: center;position: relative;width: 200px;'><span><u>{{prepend}}</u>{{value}}<u>{{append}}</u></span><b>{{label}}</b><canvas></canvas></div>";

        var defaults = {
                size: 200,
                value: 0,
                cap: "butt",
                thick: 2,
                type: 'full',
                foregroundColor: "#FFCC66",
                backgroundColor: "#CCC"
            },

            css = {
                display: 'inline-block',
                width: '100%',
                position: 'absolute',
                fontFamily: 'Open Sans',
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '15.3846px',
                lineHeight: '276.923px',
                fontWeight: 200
            },

            /*
                var g = new Gauge();
                g.getValue()
                g.getLineCap();
                g.getSize()
                g.getThickness()
                g.getType()
                g.getForegroundColor()
                g.getBackgroundColor()
                
                g.getCenter()
                g.getRadius()
                g.setLabel()
                g.update()
                g.create()
                g.destroy()
            
            */

            Gauge = function (element, options) {
                this.element = element.find("canvas")[0];
                this.text = element.find("span");
                this.legend = element.find("b");
                this.unit = element.find("u");
                this.context = this.element.getContext('2d');
                this.context.canvas.width = options.size;
                this.context.canvas.height = options.size;
                this.context.lineCap = options.cap;

                this.context.lineWidth = options.thick;
                this.options = options;

                var lfs = this.options.size * 0.22,
                    llh = this.options.size;
                // styling
                this.text.css({
                    display: 'inline-block',
                    fontWeight: 100,
                    width: '100%',
                    position: 'absolute',
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: lfs + "px",
                    lineHeight: llh + "px"
                });
                
                this.unit.css({
                    textDecoration: 'none',
                    fontSize: '0.6em',
                    fontWeight: 200
                });
                
                var fs = this.options.size / 13;
                var lh = (5 * fs) + parseInt(this.options.size);

                this.legend.css({
                    display: 'inline-block',
                    width: '100%',
                    position: 'absolute',
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 200,
                    fontSize: fs + "px",
                    lineHeight: lh + "px"
                });
                
                this.create();
            };

        Gauge.prototype = {

            create: function () {

                var type = this.getType(),
                    bounds = this.getBounds(type),
                    movePerFrame = 0.0174532925,
                    center = this.getCenter(),
                    context = this.context,
                    value = this.getValue(),
                    radius = this.getRadius(),
                    thick = this.getThickness(),
                    foregroundColor = this.getForegroundColor(),
                    requestID,
                    head = bounds.head,
                    tail = bounds.tail,
                    distance = tail - head;

                this.drawShell(head, tail);
                tail = head + (distance * value) / 100;

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
            },

            getBounds: function (type) {
                if (type == 'semi') {
                    var head = Math.PI,
                        tail = 2 * Math.PI;
                } else if (type == 'full') {
                    var head = 1.5 * Math.PI,
                        tail = 3.5 * Math.PI;
                } else if (type === 'arch') {
                    var head = 0.8 * Math.PI,
                        tail = 2.2 * Math.PI;
                }

                return {
                    head: head,
                    tail: tail
                };

            },

            drawShell: function (start, end) {
                var context = this.context,
                    center = this.getCenter(),
                    radius = this.getRadius();
                context.beginPath();
                context.arc(center.x, center.y, radius, start, end, false);
                context.strokeStyle = this.getBackgroundColor();
                context.stroke();
            },

            clear: function () {
                this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
            },

            update: function (val) {
                this.clear();
                this.options.value = val;
                this.create();
            },

            destroy: function () {
                this.clear();
            },

            getRadius: function () {
                var center = this.getCenter();
                return center.x - this.getThickness();
            },

            getCenter: function () {
                var x = this.getWidth() / 2,
                    y = this.getHeight() / 2;
                return {
                    x: x,
                    y: y
                };
            },
            
            getValue: function() {
                return this.options.value;
            },
            getWidth: function () {
                return this.context.canvas.width;
            },

            getHeight: function () {
                return this.context.canvas.height;
            },

            getThickness: function () {
                return this.options.thick;
            },

            getBackgroundColor: function () {
                return this.options.backgroundColor;
            },

            getForegroundColor: function () {
                return this.options.foregroundColor;
            },

            getLineCap: function () {
                return this.options.cap;
            },

            getType: function () {
                return this.options.type;
            }

        };


        return {
            restrict: 'E',
            replace: true,
            template: tpl,
            scope: {
                append: "@?",
                backgroundColor: "@?",
                cap: "@?",
                foregroundColor: "@?",
                label: "@?",
                prepend: "@?",
                size: "@?",
                thick: "@?",
                type: "@?",
                value: "=?"
            },
            link: function (scope, element, attrs, ctrl) {
                scope.value = angular.isDefined(scope.value) ? scope.value : defaults.value;
                scope.size = angular.isDefined(scope.size) ? scope.size : defaults.size;
                scope.cap = angular.isDefined(scope.cap) ? scope.cap : defaults.cap;
                scope.thick = angular.isDefined(scope.thick) ? scope.thick : defaults.thick;
                scope.type = angular.isDefined(scope.type) ? scope.type : defaults.type;
                scope.foregroundColor = angular.isDefined(scope.foregroundColor) ? scope.foregroundColor : defaults.foregroundColor;
                scope.backgroundColor = angular.isDefined(scope.backgroundColor) ? scope.backgroundColor : defaults.backgroundColor;

                var gauge = new Gauge(element, scope);

                scope.$watch('value', watchData, false);
                scope.$watch('cap', watchOther, false);
                scope.$watch('thick', watchOther, false);
                scope.$watch('type', watchOther, false);
                scope.$watch('foregroundColor', watchOther, false);
                scope.$watch('backgroundColor', watchOther, false);


                scope.$on('$destroy', function () {});

                scope.$on('$resize', function () {});

                function watchData(nv, ov) {
                    if (!gauge) return;
                    if (!nv) {
                        gauge.update(0);
                    }
                    gauge.update(nv);
                }

                function watchOther(nv, ov) {
                    if (!gauge) return;
                    if (!nv) return;
                    gauge.destroy();
                    gauge.create();
                }
            }
        }
    }
}(angular));