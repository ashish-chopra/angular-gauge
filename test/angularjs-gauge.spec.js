describe('Angular Gauge Unit Test Suites', function () {

    var $compile, $rootScope;

    beforeEach(module('angularjs-gauge'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('checks the compilation', function () {
        var code = '<ng-gauge value="30"></ng-gauge>';
        var scope = $rootScope.$new();
        var element = $compile(code)(scope);
        expect(element.find('canvas')).toBeDefined();
        expect(element.find('span').length).toBe(1);
        expect(element.find('b').length).toBe(1);
        expect(element.find('u').length).toBe(2);
    });


    it('checks intelligent defaults', function () {
        var code = "<ng-gauge></ng-gauge>",
            elem = $compile(code)($rootScope.$new()),
            scope = elem.isolateScope(),
            canvas = elem.find("canvas").eq(0),
            context = canvas[0].getContext('2d');

        expect(canvas.attr('width')).toBe('200');
        expect(canvas.attr('height')).toBe('200');
        expect(scope.value).toBeUndefined();
        expect(scope.foregroundColor).toBe('rgba(0, 150, 136, 1)');
        expect(scope.backgroundColor).toBe('rgba(0, 0, 0, 0.1)');
        expect(scope.cap).toBe('butt');
        expect(context.lineCap).toBe('butt');
        expect(context.lineWidth).toBe(6);
        expect(scope.thick).toBe(6);
        expect(scope.type).toBe('full');
        expect(scope.min).toBe(0);
        expect(scope.max).toBe(100);
        expect(scope.labelOnly).toBe(false);
    });

    it('custom size', function () {
        var code = "<ng-gauge size='{{size}}'></ng-gauge>",
            parentScope = $rootScope.$new();
        parentScope.size = 300;

        var elem = $compile(angular.element(code))(parentScope),
            canvas = elem.find("canvas").eq(0);

        expect(canvas.attr('width')).toBe('300');
        expect(canvas.attr('height')).toBe('300');

        //    parentScope.size = 250;
        //    parentScope.$digest();
        //    console.log(canvas);
        //    expect(canvas.attr('width')).toBe('250');
        //    expect(canvas.attr('height')).toBe('250');

    });

    it('custom value', function () {
        var code = "<ng-gauge value='value'></ng-gauge>",
            parentScope = $rootScope.$new();


        var elem = $compile(angular.element(code))(parentScope),
            label = elem.find("span").eq(0),
            directiveScope = elem.scope();

        parentScope.$digest();
        expect(directiveScope.value).toBeUndefined();

        parentScope.value = 20;
        parentScope.$digest();
        expect(label.text()).toContain('20');
        expect(directiveScope.value).toBe(20);

        parentScope.value = 50;
        parentScope.$digest();

        expect(label.text()).toContain('50');
        //  expect(label.text()).toBeEmptyString();
        expect(directiveScope.value).toBe(50);

        parentScope.value = '20';
        parentScope.$digest();
        expect(label.text()).toContain('20');
        expect(directiveScope.value).toBe('20');

        parentScope.value = undefined;
        parentScope.$digest();
        expect(directiveScope.value).toBeUndefined();


    });

    it("custom min-max-value", function () {
        var code = "<ng-gauge value='value' min='min' max='max'></ng-gauge>",
            parentScope = $rootScope.$new();


        var elem = $compile(angular.element(code))(parentScope),
            label = elem.find("span").eq(0),
            directiveScope = elem.scope();


        parentScope.min = -10;
        parentScope.max = 10;
        parentScope.value = -2;
        parentScope.$digest();
        expect(label.text()).toContain("-2");
        expect(directiveScope.value).toBe(-2);

        parentScope.value = 8;
        parentScope.$digest();
        expect(label.text()).toContain("8");
        expect(directiveScope.value).toBe(8);

        parentScope.min = -100;
        parentScope.value = -80;
        parentScope.$digest();
        expect(label.text()).toContain("-80");
        expect(directiveScope.value).toBe(-80);
    });

    it("clamping value to min-max range", function () {
        var code = "<ng-gauge value='value' min='min' max='max'></ng-gauge>",
            parentScope = $rootScope.$new();


        var elem = $compile(angular.element(code))(parentScope),
            label = elem.find("span").eq(0),
            directiveScope = elem.scope();


        parentScope.min = -100;
        parentScope.max = 102;
        parentScope.value = 150;
        parentScope.$digest();
        expect(label.text()).toContain("150");
        expect(directiveScope.value).toBe(150);

        parentScope.value = 45;
        parentScope.$digest();
        expect(label.text()).toContain("45");
        expect(directiveScope.value).toBe(45);


        parentScope.value = -230;
        parentScope.$digest();
        expect(label.text()).toContain("-230");
        expect(directiveScope.value).toBe(-230);
    });

    it("custom line cap", function () {
        var code = "<ng-gauge cap='{{cap}}'></ng-gauge>",
            parentScope = $rootScope.$new();


        var elem = $compile(angular.element(code))(parentScope),
            directiveScope = elem.scope();

        expect(directiveScope.cap).toBeUndefined();

        parentScope.cap = "round";
        parentScope.$digest();
        expect(directiveScope.cap).toBe("round");

        parentScope.cap = "gibberish";
        parentScope.$digest();
        expect(directiveScope.cap).toBe('gibberish');

    });

    it("custom thickness", function () {
        var code = "<ng-gauge thick='{{thick}}'></ng-gauge>",
            parentScope = $rootScope.$new();

        var elem = $compile(angular.element(code))(parentScope),
            directiveScope = elem.scope();

        expect(directiveScope.thick).toBeUndefined();

        parentScope.thick = 5;
        parentScope.$digest();
        expect(directiveScope.thick).toBe(5);

        parentScope.thick = 10;
        parentScope.$digest();
        expect(directiveScope.thick).toBe(10);
    });

    it("custom type", function () {
        var code = "<ng-gauge type='{{type}}'></ng-gauge>",
            parentScope = $rootScope.$new();

        var elem = $compile(angular.element(code))(parentScope),
            directiveScope = elem.scope();

        expect(directiveScope.type).toBeUndefined();

        parentScope.type = "semi";
        parentScope.$digest();
        expect(directiveScope.type).toBe("semi");

        parentScope.type = "full";
        parentScope.$digest();
        expect(directiveScope.type).toBe("full");
    });

    it("custom foreground color", function () {
        var code = "<ng-gauge foregroundColor='{{foregroundColor}}'></ng-gauge>",
            parentScope = $rootScope.$new();

        var elem = $compile(angular.element(code))(parentScope),
            directiveScope = elem.scope();

        expect(directiveScope.foregroundColor).toBeUndefined();

        parentScope.foregroundColor = "red";
        parentScope.$digest();
        expect(directiveScope.foregroundColor).toBe("red");

        parentScope.foregroundColor = "#CCC";
        parentScope.$digest();
        expect(directiveScope.foregroundColor).toBe("#CCC");
    });

    it("custom background color", function () {
        var code = "<ng-gauge backgroundColor='{{backgroundColor}}'></ng-gauge>",
            parentScope = $rootScope.$new();

        var elem = $compile(angular.element(code))(parentScope),
            directiveScope = elem.scope();

        expect(directiveScope.backgroundColor).toBeUndefined();

        parentScope.backgroundColor = "red";
        parentScope.$digest();
        expect(directiveScope.backgroundColor).toBe("red");

        parentScope.backgroundColor = "#CCC";
        parentScope.$digest();
        expect(directiveScope.backgroundColor).toBe("#CCC");
    });

    it("custom label", function () {
        var code = "<ng-gauge label='{{label}}'></ng-gauge>",
            parentScope = $rootScope.$new();

        var elem = $compile(angular.element(code))(parentScope),
            legend = elem.find("b");
        directiveScope = elem.scope();

        parentScope.label = "Speed";
        parentScope.$digest();
        expect(directiveScope.label).toBe('Speed');
        expect(legend.text()).toBe('Speed');

        parentScope.label = "Current";
        parentScope.$digest();
        expect(directiveScope.label).toBe('Current');
        expect(legend.text()).toBe('Current');

        parentScope.label = undefined;
        parentScope.$digest();
        expect(directiveScope.label).toBeUndefined();
        expect(legend.text()).toBe('');

    });

    it("custom append", function () {
        var code = "<ng-gauge append='{{append}}'></ng-gauge>",
            parentScope = $rootScope.$new();

        var elem = $compile(angular.element(code))(parentScope),
            append = elem.find("u").eq(1);
        directiveScope = elem.scope();

        parentScope.append = "mph";
        parentScope.$digest();
        expect(directiveScope.append).toBe('mph');
        expect(append.text()).toBe('mph');

        parentScope.append = "kW";
        parentScope.$digest();
        expect(directiveScope.append).toBe('kW');
        expect(append.text()).toBe('kW');

        parentScope.append = undefined;
        parentScope.$digest();
        expect(directiveScope.append).toBeUndefined();
        expect(append.text()).toBe('');
    });

    it("custom prepend", function () {
        var code = "<ng-gauge prepend='{{prepend}}'></ng-gauge>",
            parentScope = $rootScope.$new();

        var elem = $compile(angular.element(code))(parentScope),
            prepend = elem.find("u").eq(0);
        directiveScope = elem.scope();

        parentScope.prepend = "$";
        parentScope.$digest();
        expect(directiveScope.prepend).toBe('$');
        expect(prepend.text()).toBe('$');

        parentScope.prepend = "Rs";
        parentScope.$digest();
        expect(directiveScope.prepend).toBe('Rs');
        expect(prepend.text()).toBe('Rs');

        parentScope.prepend = undefined;
        parentScope.$digest();
        expect(directiveScope.prepend).toBeUndefined();
        expect(prepend.text()).toBe('');
    });

    it("i18n number format supported", function () {
        var code = "<ng-gauge value='value' min='min' max='max'></ng-gauge>",
            parentScope = $rootScope.$new();

        parentScope.min = 0;
        parentScope.max = 10000;
        parentScope.value = 100;
        var elem = $compile(angular.element(code))(parentScope),
            directiveScope = elem.scope(),
            label = elem.find("span").eq(0);

        parentScope.$digest();
        expect(label.text()).toContain("100");
        expect(directiveScope.value).toBe(100);

        parentScope.value = 2300;
        parentScope.$digest();
        expect(label.text()).toContain("2,300");
        expect(directiveScope.value).toBe(2300);


        parentScope.value = 23000;
        parentScope.$digest();
        expect(label.text()).toContain("23,000");
        expect(directiveScope.value).toBe(23000);

    });

    it("i18n decimal supported", function () {
        var code = "<ng-gauge value='value' min='min' max='max'></ng-gauge>",
            parentScope = $rootScope.$new();

        parentScope.min = -100;
        parentScope.max = 100;
        var elem = $compile(angular.element(code))(parentScope),
            directiveScope = elem.scope(),
            label = elem.find("span").eq(0);

        parentScope.value = 24.8;
        parentScope.$digest();
        expect(label.text()).toContain("24.8");
        expect(directiveScope.value).toBe(24.8);

        parentScope.value = -24.89;
        parentScope.$digest();
        expect(label.text()).toContain("-24.89");
        expect(directiveScope.value).toBe(-24.89);

        parentScope.value = 24.897;
        parentScope.$digest();
        expect(label.text()).toContain("24.897");
        expect(directiveScope.value).toBe(24.897);

        parentScope.value = 24.8976;
        parentScope.$digest();
        expect(label.text()).toContain("24.898");
        expect(directiveScope.value).toBe(24.8976);

    });

    it("label only supported", function () {
        var code = "<ng-gauge value='value' min='min' max='max' label='The answer' label-only='true'></ng-gauge>",
            parentScope = $rootScope.$new();

        parentScope.min = 0;
        parentScope.max = 100;
        var elem = $compile(angular.element(code))(parentScope),
            label = elem.find("span").eq(0),
            legend = elem.find("b");

        parentScope.value = 42;
        parentScope.$digest();
        expect(label.text()).toContain("42");
        expect(legend.text()).toBe('The answer');
        expect(label.hasClass('ng-hide')).toBeTruthy();

    });

    it("test case for thresholds range colors", function () {
       // coming soon
    });

});