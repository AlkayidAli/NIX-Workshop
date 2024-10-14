# Introduction

This repository holds npm packages which are included to be used in curse.

## How to get started

Upon cloning the repo, you will first need to install the require npm package dependencies. This can be done ver simple with following CLI command:

```sh
npm install
```

If all is successful, you should now be ready to fire up project with:

```sh
npm start
```

This runs a develop server on your local machine, and should open the default URL allowing you to browse the you APP.

## How to build

To build you app into `dist` folder you need to run CLI command:

```sh
npm run build
```

Also you serve you `dist` files with help of `http-server`. To run server you can run CLI command:

```sh
npm run start-production
```

## How to test

To test you work you can run e2e tests and check that your work pass all functional requirements.
To run test you need run command:

```sh
npm test
```

Then dialog window chose start E2E testing and browser. After it click on the required test
