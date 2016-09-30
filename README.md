# angular-gauge

Current Version: `0.1.0`

A reusable gauge directive for Angular 1.x apps and dashboards. It provides many configuration options to customize according to your project needs.

**NOTE**: This directive project is currently in development stage. I do not recommend to use it for production use.

![alt text](https://raw.githubusercontent.com/ashish-chopra/angular-gauge/master/examples/examples.png)

# Experimental Usage


Currently we support manual way of adding this library into your project. Follow the steps given below:

1. Setup the project on your machine manually using following commands

    ```
    git clone https://github.com/ashish-chopra/angular-gauge.git
    npm install
    ```

## Checkout Examples

2. The `examples` bundled in the project can be explored by running a dev server:
    ```
    gulp
    ```
    and browse at `http://localhost:3000`.

## Add to your Project

3. Copy the files from `dist/` manually into your project folder.

4.  Then add the sources to your code (after adding the dependency of Angular) and  as given below:

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

5. Add as dependency in your module

    ```
    angular.module('yourApp', ['ngGauge']);
    ```
6. Use it in your markup as

    ```html
    <ng-gauge size="200" type="full" thick="5" value="68.2" cap="round" label="Speed" append="mph" foreground-color="#ffcc66" background-color="rgba(255,255,255, 0.4)" append="kW"></ng-gauge>
    ```

In order to checkout the bundled `examples` run:
    
    ```
    gulp
    ```
 and browse the examples at `http://localhost:3000`.
 
If you face any problem, then raise an issue [here](https://github.com/ashish-chopra/angular-gauge/issues).


# Contribute

This project is currently in development phase. So you can fork it and contribute in its active development. 

    ```
    git clone https://github.com/ashish-chopra/angular-gauge.git
    npm install
    
    ```


Checkout the [issue tracker](https://github.com/ashish-chopra/angular-gauge/issues) to start with.

There are tons of project setup related issues and activities in which you can help.
Your feedback could also be a great contribution.


License
---------
MIT Licensed. See the license file.

