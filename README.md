# Chrome Extension Boilerplate

A basic foundation boilerplate for rich Chrome Extensions.

## Features
This repro is built under the inspiration of [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate),but has some extra & useful features:

* All the libraries used are the latest version:
    > webpack v4, react v15
* Support less
* A more standard directory structure

## Use

1. Check if your Node.js version is >= 8.
2. Clone the repository.
3. Install [npm](https://www.npmjs.com/get-npm).
4. Run `npm i`.
5. Change the package's name and description on `package.json`.
6. Change the name of your extension on `src/manifest.json` &&replace icons on `src/images`.
7. Run `npm run dev`
8. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `dist` folder.
8. Have fun!.

## Structure
All your extension's development code must be placed in `src` folder, including the extension manifest.

The boilerplate is already prepared to have a popup, a options page and a background page. You can easily customize this.

## Packing
After the development of your extension run the command

```
$ npm run build
```

Now, the content of `dist` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

## Secrets
If you are developing an extension that talks with some API you probably are using different keys for testing and production. Is a good practice you not commit your secret keys and expose to anyone that have access to the repository.

To this task this boilerplate import the file `./secrets.<THE-NODE_ENV>.js` on your modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: "123" };
```

_./src/popup.js_

```js
import secrets from "secrets";
ApiCall({ key: secrets.key });
```
:point_right: The files with name `secrets.*.js` already are ignored on the repository.

## Thanks

* [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)

## Todo

- [ ] redux
- [ ] webpack dev server

## License

MIT