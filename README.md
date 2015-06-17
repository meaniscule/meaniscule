[![npm version](https://badge.fury.io/js/meaniscule.svg)](http://badge.fury.io/js/meaniscule)
![Badge of Honor](https://img.shields.io/badge/Built%20at-Fullstack-green.svg?style=flat-square)
[![Stories in Ready](https://badge.waffle.io/ashryanbeats/meaniscule.svg?label=ready&title=Ready)](http://waffle.io/ashryanbeats/meaniscule)
# Meaniscule
_Meaniscule = miniscule + MEAN stack generator_

Meaniscule is a basic MEAN stack wireframe for quickstarting your ideas.

Meansicule focuses on only providing the bare minimum framework to get you up and running quickly in a MEAN stack environment.

Use it for:
- mini apps
- brainstorming/proof-of-concept
- sandboxing early new features

Meaniscule owes a heavy debt to [`fsg`](https://github.com/FullstackAcademy/fsg), which offers a more robust environment with features like auth built right in.

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


## Initial building tasks
After generating the app, run:
```
npm install
npm start
````

In a separate terminal tab, run:
```
gulp seedDB
gulp
```

The default gulp process builds all client-side JS and Sass files, and then watches them for changes, rebuilding on the fly.

## File Structure
```
.
├── gulpfile.js
├── node_modules
├── package.json
├── public
│   └── app
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
├── seed.js
├── server
│   ├── app
│   │   ├── index.js
│   │   └── views
│   │       └── index.html
│   ├── db
│   │   ├── index.js
│   │   └── models
│   │       └── nodemodule.js
│   ├── routes
│   │   ├── home
│   │   │   └── index.js
│   │   ├── index.js
│   │   └── modules
│   │       └── index.js
│   ├── server.js
│   └── start.js
└── tests
    └── server
            └── models
                        └── nodemodules.test.js
```

## Contributing
Pull requests to [the GitHub repo](https://github.com/ashryanbeats/meaniscule) are welcome, as are new [issues](https://github.com/ashryanbeats/meaniscule/issues).
