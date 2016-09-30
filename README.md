# angular-gauge

Current Version: `0.1.0`

A reusable gauge directive for Angular 1.x apps and dashboards. It provides many configuration options to customize according to your project needs.

**NOTE**: This directive project is currently in development stage. I do not recommend to use it for production use.

![alt text](https://raw.githubusercontent.com/ashish-chopra/angular-gauge/master/examples/examples.png)

# Usage

Currently we support manual way of adding this library into your project.

Clone the repo and download the project dependencies & build the project using following commands

```
git clone https://github.com/ashish-chopra/angular-gauge.git
npm install
npm install -g gulp
gulp build
```

Copy the files from `dist/` manually into your project folder.

Then add the sources to your code (after adding the dependency of Angular) and resolving the paths as given below:

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

```
angular.module('yourApp', ['ngGauge']);
```
Use it in your markup like this

```html
<ng-gauge size="200" type="full" thick="5" value="68.2" cap="round" label="Speed" append="mph" foreground-color="#ffcc66" background-color="rgba(255,255,255, 0.4)" append="kW"></ng-gauge>
```
 
If you face any problem, then raise an issue [here](https://github.com/ashish-chopra/angular-gauge/issues).


# Contribute

This project is currently in development phase. So you can fork it and contribute in its active development. 
Setting up the development environment is easy:

```
git clone https://github.com/ashish-chopra/angular-gauge.git
npm install
gulp

```
`gulp` command will run a development server at port `3000` on your machine, then you can browse the bundled `examples` at `http://localhost:3000`.


First thing first, explore the [issue tracker](https://github.com/ashish-chopra/angular-gauge/issues) to find something to contribute. There are tons of other project setup related issues and activities in which you can help. Your feedback could also be a great contribution.

If you face any problem, then raise an issue [here](https://github.com/ashish-chopra/angular-gauge/issues).

License
---------
MIT License

