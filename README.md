# angular-gauge

Current Version: `0.1.0`

A reusable gauge directive for Angular 1.x apps and dashboards. It provides many configuration options to customize according to your project needs.

![alt text](https://raw.githubusercontent.com/ashish-chopra/angular-gauge/master/examples/examples.png)

# Usage

Currently we support manual way of adding this library into your project. Clone the repo, download the project dependencies & build the project using following commands:

```
git clone https://github.com/ashish-chopra/angular-gauge.git
npm install
npm install -g gulp
gulp build
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
  <script src="vendor/angular-gauge/dist/angular-gauge.min.js"></script>
```

Add as dependency in your module

```js
angular.module('yourApp', ['angularGauge']);
```
Use it in your HTML markup like this

```html
<ng-gauge size="200" type="full" thick="5" value="68.2" cap="round" label="Speed"  foreground-color="#ffcc66" background-color="rgba(255,255,255, 0.4)" append="mph"></ng-gauge>
```

If you face any problem, then raise an issue [here](https://github.com/ashish-chopra/angular-gauge/issues).

## Config Options

There are plenty of configurable options available to tune the `Gauge` as per your needs.

| Name      | Description  | Required  | Default value  | Possible values |
| ---       | ---          | ---       | ---               | ---            |
| `size`    | Specifies the size of the canvas in which Gauge will be drawn. It is used as `width` and `height` both. | Yes       | `200` | Positive Integer           |
| `value`          | Specifies the current value of the Gauge       | Yes       | `0`  | Integer           |
| `cap`       | The style of line ending at the gauge's end.    | No        | `"round"`    | `round`, `butt `           |
| `thick`        | Specified the thickness of the gauge's bar.            | No        | `5`        | Any Positive Integer |
| `type`      | Specifies the gauge's type.                     | No        | `"full"`     |  `"full"`, `"semi"`, `"arch"`  |
| `label`       | Specifies the text to display below the Gauge's reading.  | No  | `undefined`                | Any String           |
| `foreground-color`         | Specifies the foreground color of the Gauge's bar. It will be overriden if `theme` attribute is specified.                    | No       | `"#FFCC66"`             |   Any color value string       |
| `background-color`    | Specifies the background color of the Gauge's bar.| No        |    `"#CCC"`           |    Any color value string        |
| `append`   | Specifies a `string` appended to the Gauge's reading. For example `"%"` most commonly used. | No        | `undefined`        | Any string           |
| `prepend`      | Specifies a `string` prepended to the Gauge's reading. For example `"$"` in case of financial data displayed in Gauge.                                        | No        | `undefined`            | Any String           |
| `used`  |       Not supported yet                                 | -        | -   | -  |
| `total` |              Not supported yet                             | -        | -   | -  |
| `text`  |              Not supported yet                              | -        | -   | -  |
| `theme` |        Not supported yet                             | -        | -   | -  | 



# Contribute

This project is currently in development phase. So you can fork it and contribute in its active development. 
Setting up the development environment is easy:

```
git clone https://github.com/ashish-chopra/angular-gauge.git
npm install
npm install -g gulp
gulp

```
`gulp` command will run a development server at port `3000` on your machine, then you can browse the bundled `examples` at `http://localhost:3000`.


First thing first, explore the [issue tracker](https://github.com/ashish-chopra/angular-gauge/issues) to find something to contribute. There are tons of other project setup related issues and activities in which you can help. Your feedback could also be a great contribution.

If you face any problem, then raise an issue [here](https://github.com/ashish-chopra/angular-gauge/issues).

License
---------
[MIT](https://github.com/ashish-chopra/angular-gauge/blob/master/LICENSE)

