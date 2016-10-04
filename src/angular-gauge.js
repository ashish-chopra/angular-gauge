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
                this.label = element.find("b");
                this.u = element.find("u");
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


                this.label.css({
                    display: 'inline-block',
                    width: '100%',
                    position: 'absolute',
                    fontFamily: 'Open Sans',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 200,

                });
                var fs = this.options.size / 13;
                var lh = (5 * fs) + parseInt(this.options.size);
        
                this.label.css({
                    fontSize: fs + "px",
                    lineHeight: lh + "px"
                })

                this.u.css({
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
        Gauge.prototype.drawShell = function (start, end) {
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

            this.drawShell(head, tail);
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

                scope.$watch('value', function (nv, ov) {
                    if (gauge && angular.isDefined(nv) && !angular.equals(nv, ov)) {
                        gauge.update(nv);
                    }
                });

                scope.$on('$destroy', function () {
                    console.log("destroy called");
                });
                
                scope.$on('$resize', function() {
                    console.log("resize called");
                })
            }
        }
    }
}(angular));