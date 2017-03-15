# angular-gauge

Current Version: `1.3.0`

A reusable gauge directive for Angular 1.x apps and dashboards. It provides many configuration options to customize according to your project needs.

![alt text](https://raw.githubusercontent.com/ashish-chopra/angular-gauge/master/examples/examples.png)

# Usage

### Install using npm

```
npm install angularjs-gauge
```
### Install using Bower

```
bower install angularjs-gauge
```

### Install manually

```
git clone https://github.com/ashish-chopra/angular-gauge.git
```

Copy the files from `dist/` manually into your project folder.Then, add the script to your code (after adding the dependency of Angular 1.5) and resolving the paths as given below:

```html
<head>
  ...
<head>
<body>
  ...
</body>
  <script src="vendor/angular/angular.min.js"></script>
  <script src="vendor/angular-gauge/dist/angularjs-gauge.min.js"></script>
```

Add as dependency in your module

```js
angular.module('yourApp', ['angularjs-gauge']);
```
Use it in your HTML markup like this

```html
<ng-gauge size="200" type="full" thick="5" value="68.2" cap="round" label="Speed"  foreground-color="#ffcc66" background-color="rgba(255,255,255, 0.4)" append="mph"></ng-gauge>
```

If you face any problem, then raise an issue [here](https://github.com/ashish-chopra/angular-gauge/issues).

# Config Options

There are plenty of configurable options available to tune the `Gauge` as per your needs.

| Name      | Description  | Required  | Default value  | Possible values |
| ---       | ---          | ---       | ---               | ---            |
| `size`    | Specifies the size of the canvas in which Gauge will be drawn. It is used as `width` and `height` both. | No       | `200` | Positive Integer           |
| `value`          | Specifies the current value of the Gauge as a percentage. It is required attribute.       | Yes       | `undefined`  | A numeric value between `0` - `100`.           |
| `used`  | Specifies the absolute value which has been consumed out of `total`. The percentage usage (used/total) will be displayed by the Gauge. When this attribute is specified with `total`, `value` attribute is not used.  | No     | `undefined`  | Any numeric value  |
| `total` | specifies the total value that represents the whole rim of the Gauge. It is used along with `used` attribute.  `used` and `total` attributes are specified together. When these attributes are specified, do not use `value` attribute. | No       | `undefined`  | Any numeric value  |
| `cap`       | The style of line ending at the gauge's end.    | No        | `"butt"`    | `"round"`, `"butt"`           |
| `thick`        | Specified the thickness of the gauge's bar.            | No        | `5`        | Any Positive Integer |
| `type`      | Specifies the gauge's type.                     | No        | `"full"`     |  `"full"`, `"semi"`, `"arch"`  |
| `label`       | Specifies the text to display below the Gauge's reading.  | No  | `undefined`                | Any String           |
| `foreground-color`         | Specifies the foreground color of the Gauge's bar. It will be overriden if `theme` attribute is specified.                    | No       | `"#FFCC66"`             |   Any color value string       |
| `background-color`    | Specifies the background color of the Gauge's bar.| No        |    `"#CCC"`           |    Any color value string        |
| `append`   | Specifies a `string` appended to the Gauge's reading. For example `"%"` most commonly used. | No        | `undefined`        | Any string           |
| `prepend`      | Specifies a `string` prepended to the Gauge's reading. For example `"$"` in case of financial data displayed in Gauge.                                        | No        | `undefined`            | Any String           |
| `duration`    | Specifies the duration (in milliseconds) of the Gauge's animation | No       | `1500` | Positive Integer           |
| `text`  |              Not supported yet                              | -        | -   | -  |
| `theme` |        Not supported yet                             | -        | -   | -  |

# Global Defaults

angular-gauge ships with a provider to globally set config options for all gauge instances used in the application during angular config phase. You can specify `ngGaugeProvider` dependency during `config` phase. It supports a single API to set config options:

```js
ngGaugeProvider.setOptions(customOptions);
```

Here, `customOptions` is an object `{}` where keys are the configOptions name (in camelCase notation), mentioned in above section. For example, let see how to set `size`, `cap`, `thick`, `foreground-color` and `background-color` options  globally using provider as shown below:

```js

angular
  .module('myApp', ['angularjs-gauge'])
  .config(configApp);

  configApp.$inject = ['ngGaugeProvider'];
  function configApp(ngGaugeProvider) {

    // setting the default parameters for
    // gauge instances globally.
    ngGaugeProvider.setOptions({
        size: 250,
        cap: 'round',
        thick: 15,
        foregroundColor: "#ff8645",   // note the camelCase notation for parameter name
        backgroundColor: "#e4e4e4"
    });

  }

```

# Contribute

The project is continously evolving with every new release. Give it a star, if you like it. For contribution, setup the development environment as follows:

1. clone and setup the project dependencies

```shell
$> git clone https://github.com/ashish-chopra/angular-gauge.git
$> npm install
```

2. Use following commands based on what you'd like to do:

```shell
$> npm start             # starts the server at port 3000 and hosts the `/examples` directory.
$> npm test              # runs test suite once and exit.
$> npm run test:watch    # starts the test framework and watch for changes in code.
$> npm run build         # triggers a manual build for library, outputs at `/dist` directory.
```

3. To add a new feature or fix a bug, make sure to create a new branch from `master`.


First thing first, explore the [issue tracker](https://github.com/ashish-chopra/angular-gauge/issues) to find something to contribute. There are tons of other project setup related issues and activities in which you can help. Your feedback could also be a great contribution.

If you face any problem, then raise an issue [here](https://github.com/ashish-chopra/angular-gauge/issues).

# License

[MIT License](https://github.com/ashish-chopra/angular-gauge/blob/master/LICENSE)

