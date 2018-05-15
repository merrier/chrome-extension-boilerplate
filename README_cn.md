# Chrome Extension Boilerplate

一个用来开发Chrome扩展程序的模板

## 特点
这个工程的灵感来自于[chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)，不过在其基础上进行了优化和丰富：

* 所有用到的前端框架都是最新版本:
    > webpack v4, react v15
* 支持less和sass
* 一个更加被大众所认可的目录结构

## 使用

1. 检查你本地的Node.js的版本是不是 >= 8.
2. 克隆本工程.
3. 安装 [npm](https://www.npmjs.com/get-npm).
4. 执行 `npm i`.
5. 更改 `package.json` 中的工程名和描述.
6. 更改 `src/manifest.json` 中的相关配置，将你自己用到的icon添加至 `src/images`.
7. 执行 `npm run dev`
8. 加载扩展程序:
    1. 访问 `chrome://extensions/`
    2. 开启 `Developer mode` （开发者模式）
    3. 点击 `Load unpacked extension`
    4. 选择生成的 `dist` 目录.
8. 剩下的就不用我教你了吧!.

## 结构
你在开发环境中书写的代码必须放在 `src` 目录中，包括manifest文件.

本模板已经包含一个popup页面、一个options页面和一个background页面了，你可以很方便的对它们进行修改和定制化

## 打包

当你需要将代码应用于生产环境时，执行：

```
$ npm run build
```

现在，`dist` 目录中的内容已经可以提交到Chrome应用商店了，可以看一下[官方教程](https://developer.chrome.com/webstore/publish)来了解关于发布的更多相关信息。


## Secrets

如果你正在开发涉及到某些API的扩展程序，你可能需要在测试环境和生产环境中使用不同的密钥。在这种情况下，不提交你的私钥，将权限只给那些有权访问的人是很有必要的。

为了达到这个目的，本模板会通过名为 `secrets` 的模块对名字符合 `./secrets.<THE-NODE_ENV>.js` 格式的文件进行引入，所以你可以这样做：

_./secrets.development.js_

```js
export default { key: "123" };
```

_./src/popup.js_

```js
import secrets from "secrets";
ApiCall({ key: secrets.key });
```

:point_right: 命名符合 `secrets.*.js` 格式的js文件已经被ignore掉了

## 感谢

* [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)

## Todo

- [ ] redux
- [ ] webpack dev server
- [ ] 利用 `copy-webpack-plugin` 和 `package.json` 来生成Chrome扩展程序所需要的manifest文件


## 协议

MIT