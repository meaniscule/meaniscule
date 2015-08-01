[![npm version](https://badge.fury.io/js/meaniscule.svg)](http://badge.fury.io/js/meaniscule)
![Badge of Honor](https://img.shields.io/badge/Built%20at-Fullstack-green.svg?style=flat-square)
[![Stories in Ready](https://badge.waffle.io/ashryanbeats/meaniscule.svg?label=ready&title=Ready)](http://waffle.io/ashryanbeats/meaniscule)
# Meaniscule
_Meaniscule = miniscule + MEAN stack generator_

Meaniscule is a basic MEAN stack wireframe for quickstarting your ideas.

Meansicule focuses on only providing the bare minimum framework to get you up and running quickly in a MEAN stack environment.

Use it for:
- mini apps/hackathons
- brainstorming/proof-of-concept
- sandboxing early new features

You can see what the generated app looks like at [meaniscule.ashryanbeats.com](http://meaniscule.ashryanbeats.com/).

Meaniscule owes a heavy debt to [`fsg`](https://github.com/FullstackAcademy/fsg), which offers a more robust environment with features like auth built right in.

*Note:* Meaniscule currently doesn't support non-POSIX systems (e.g. Windows). See [this issue](https://github.com/ashryanbeats/meaniscule/issues/57) for details. If you would like to fix this issue, you are very welcome to submit a pull request! (All you need is Node `fs`.)

## Contents
- [Installing Meaniscule](https://github.com/ashryanbeats/meaniscule/blob/master/README.md#installing-meaniscule)
- [Generating your Meaniscule app](https://github.com/ashryanbeats/meaniscule/blob/master/README.md#generating-your-meaniscule-app)
- [Initial building tasks](https://github.com/ashryanbeats/meaniscule/blob/master/README.md#initial-building-tasks)
- [File structure](https://github.com/ashryanbeats/meaniscule/blob/master/README.md#file-structure)
- [Making Meaniscule yours](https://github.com/ashryanbeats/meaniscule/blob/master/README.md#making-meaniscule-yours)
- [Examples](https://github.com/ashryanbeats/meaniscule/blob/master/README.md#examples)
- [Contributing](https://github.com/ashryanbeats/meaniscule/blob/master/README.md#contributing)

## Installing Meaniscule
Install Meaniscule globally:
```
npm install -g meaniscule
```

## Generating your Meaniscule app
The global installation gives you access to the terminal command `meaniscule`:
```
mkdir my-app && cd my-app
meaniscule
```
The `meaniscule` command will populate the directory `my-app` with the newly generated app.

Add the `nodb` flag if you want to generate an app without a database:
```
mkdir my-app && cd my-app
meaniscule nodb
```
This will save your installation the trouble of connecting to a database if you know you won't need one. It also makes the generated Meaniscule app even smaller by removing files related to the database.

## Initial building tasks
After generating the app, run:
```
npm install
npm start
````

In a separate terminal tab, run:
```
gulp seedDB // No need for this if you used the `nodb` flag to generate the app
gulp
```

The default `gulp` process builds all client-side JS and Sass files, and then watches them for changes, rebuilding on the fly.

## File Structure
At the highest level, Meaniscule files are divided into `client` and `server` directories. 

The contents of both of these directories are fractal: 
- On the client side, Meaniscule groups front-end components by directories in `/client/pre-build`.  
 - In these directories, include all related HTML, Sass, and Angular JavaScript (controllers, states, factories, and directives) 
- On the server side, Meaniscule groups APIs by directories in `/server/api`.  
 - In these directories, include all routes, controller functions, models, and test specs.

### Tree (with database, i.e. `meaniscule`)
```
.
├── client
│   ├── build *
│   │   ├── build.css
│   │   └── build.js
│   └── pre-build
│       ├── app.js
│       ├── app.scss
│       ├── home
│       │   ├── home.controller.js
│       │   ├── home.html
│       │   ├── home.scss
│       │   └── home.state.js
│       ├── modules
│       │   ├── modules.controller.js
│       │   ├── modules.factory.js
│       │   ├── modules.html
│       │   ├── modules.scss
│       │   └── modules.state.js
│       └── navbar
│           ├── navbar.directive.js
│           ├── navbar.html
│           └── navbar.scss
├── .gitignore
├── gulpfile.js
├── package.json
├── seed.js
└── server
    ├── api
    │   └── modules
    │       ├── index.js
    │       ├── nodemodule.controller.js
    │       ├── nodemodule.model.js
    │       └── nodemodule.model.spec.js
    ├── app.js
    ├── db.js
    ├── index.html
    └── start.js
```
\* The `build` directory and its contents will be created upon running `gulp`  

### Tree (without database, i.e. `meaniscule nodb`)
```
.
├── client
│   ├── build *
│   │   ├── build.css
│   │   └── build.js
│   └── pre-build
│       ├── app.js
│       ├── app.scss
│       ├── home
│       │   ├── home.controller.js
│       │   ├── home.html
│       │   ├── home.scss
│       │   └── home.state.js
│       └── navbar
│           ├── navbar.directive.js
│           ├── navbar.html
│           └── navbar.scss
├── .gitignore
├── gulpfile.js
├── package.json
└── server
    ├── app.js
    ├── index.html
    └── start.js
```
\* The `build` directory and its contents will be created upon running `gulp`  

## Making Meaniscule yours
### Removing example files
Many of the files in the generated Meaniscule app are there as an example of how to construct your new app. 

You can remove the following directories if you don't need them:
- `client/pre-build/home`
- `client/pre-build/modules`
- `client/pre-build/navbar`
- `server/api/modules`

*Note:* Before you remove these directories, be sure to note their organization and naming conventions, as Meaniscule will expect the same structure. You may need to refactor other files that reference these directories, but the work should be fairly minimal.

### Changing the server port
The server port is set in a varible called `port` in `start.js`.

### References to the name Meaniscule
The name "Meaniscule" is referenced in the following files:
- `package.json` (app name and description)
- `server/db.js` (`dbName`)
- `server/index.html` (in the `<title>` and `<body>`)
- `server/api/modules/nodemodule.model.spec.js` (`dbURI`)
- `client/pre-build/app.js` (Angular module name)
- `client/pre-build/home/home.html` (in the `<h1>`)
- `client/pre-build/navbar/navbar.html` (`.navbar-brand`)

## Examples
I'm happy to post links to live sites that use Meaniscule. Get in touch if you have something.

- [The default Meansicule generated app](http://meaniscule.ashryanbeats.com/)
- [My Adobe Creative SDK tutorials](http://creativesdk.ashryanbeats.com/)

## Contributing
Pull requests to [the GitHub repo](https://github.com/ashryanbeats/meaniscule) are welcome, as are new [issues](https://github.com/ashryanbeats/meaniscule/issues). 

Please do keep in mind that Meaniscule aims to keep a fairly small (_miniscule!_) footprint. If you have an idea that will require adding a lot of new code or features, it might not be right for Meaniscule. Feel free to get in touch before you get started on new features.

[Thanks to all developers who have contributed so far](https://github.com/ashryanbeats/meaniscule/graphs/contributors).
