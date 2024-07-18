# vanilla-pudding 香草布丁🌿🍮脚本管理

![logo](/project/ext/public/icon/128.png)

## 简体中文 | [English](./README_EN.md)


## 名称由来

- JavaScript 又被大家称为 vanilla-js
- 而脚本管理器类似于 JavaScript 的 “补丁”
- 因此本项目被我称为 《香草布丁》 vanilla pudding。

## 插件安装与环境要求

- 从 ChromeWebStore [安装](https://chrome.google.com/webstore/detail/fencadnndhdeggodopebjgdfdlhcimfk)
- 适用于现代浏览器的简约 JavaScript 用户脚本加载器和管理器。
- 为了使用此扩展程序，您需要 Chrome 120 或更高版本，并启用[开发者模式](https://www.tampermonkey.net/faq.php#Q209)。

## 你什么时候需要这个？

-
一个现代的脚本管理器，默认支持[ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
的脚本加载器
- 一个类似 [Tampermonkey](https://www.tampermonkey.net/) ，但不支持 GM_* API的脚本管理器
- 内置 MonacoEditor
- 一个强大的管理器，支持来自插件的高级API能力 [服务源码](project/ext/lib/service/backgroundToolService.ts)
  - [x] Cookie `chrome.cookies`
  - [x] Tabs `chrome.tabs`
  - [x] Storage (`chrome.storage.sync`、`chrome.storage.local`、`chrome.storage.session`) 提供插件级存储能力。
  - [x] NamespaceStorage 基于 indexDB, 由 Dexie 驱动，提供带有命名空间的插件级存储能力。
  - [x] RuleDNRTool `chrome.declarativeNetRequest`
  - [x] 插件请求, 基于 `alova`
    - 请求跨域
    - 修改请求头
    - 其他 alova 特性, 如：请求缓存等
    - 使用示例模版，通过 vite 构建用户脚本（此部分下面有详细介绍）。

## MataData

您需要将元数据以注释的形式写在脚本的开头，格式请参考示例。

```ts
type StrOrStrArr = string | string[];

// 1、支持驼峰和短横线风格
// 2、虽然这里的ts类型主要是为vite 插件提供类型提示, 但是命名仍然和注释语法保持一致，这与谷歌插件实际值略有出入
interface ScriptMeta {
  // 用户脚本的名称
  "name": string;
  // 用户脚本的更新URL,这是可选的，点击更新按钮，插件将会访问该 URL 以使用户脚本保持最新。
  // 您可以通过多个指定多个更新URL,插件将按顺序逐一检查它们，直到找到可用的用户脚本
  "update-url"?: StrOrStrArr;
  "updateUrl"?: StrOrStrArr;
  // 下面的属性来自 chrome.userScripts.RegisteredUserScrip, 仅在支持的值为 StrOrStrArr 的属性名上略有出入
  "world"?: chrome.userScripts.ExecutionWorld;
  "runAt"?: chrome.userScripts.RunAt;
  "run-at"?: chrome.userScripts.RunAt;
  "allFrames"?: boolean;
  "all-frames"?: boolean;
  "match"?: StrOrStrArr;
  "exclude-match"?: StrOrStrArr;
  "excludeMatch"?: StrOrStrArr;
  "exclude-glob"?: StrOrStrArr;
  "excludeGlob"?: StrOrStrArr;
  "include-glob"?: StrOrStrArr;
  "includeGlob"?: StrOrStrArr;
  // 用户脚本注入的方式, 默认: esm
  "run-with"?: "esm" | "raw";
  "runWith"?: "esm" | "raw";
}
```

## 案例一

```js
// @name allow-temu-translate
// @match https://www.temu.com/*
// @runAt document_start
(function () {
  document.documentElement.setAttribute("translate", "")
})();
```

## 案例二 ESM 支持， 来自 [eternity](https://github.com/BlackGlory/eternity?tab=readme-ov-file#example)

```js
// @name Hello World
// @match <all_urls>
import {addStyleSheet} from 'https://esm.sh/userstyle@0.2.1'

addStyleSheet(`
  *:before {
    content: 'Hello'
  }

  *:after {
    content: 'World'
  }
`)
```

## 更多高级使用，推荐使用示例模板  [create-vpu](https://www.npmjs.com/package/create-vpu)

- create-vpu [源码](packages/create-vpu/package.json)
- 创建你的第一个 vanilla-pudding 用户脚本项目。 `npm create vpu@latest`
- 示例模板使用 vite 构建你的用户脚本,
- build 后可以直接复制到用户脚本管理器中。也可以打包发布到 npm [就像这个工具](https://www.npmjs.com/package/dpms-tools)。
- [香草布丁-通信包](packages/message/package.json) 提供了轻松使用插件的高级API。
- [香草布丁-vite-plugin](packages/vite-plugin/package.json)
  - 自动按照配置生成注释，轻松设置MataData。
  - 支持 esm，减少打包体积。

## 技术分享

- [wxt](https://wxt.dev/) 用于快速构建浏览器扩展。
- [vite](https://vitejs.dev/) 我常用的前端构建工具
- [@webext-core/proxy-service](https://webext-core.aklinker1.io/guide/proxy-service/) 用于 popup、content 和 background
  之间的服务调用。
- [message](packages/message) 为了用户脚本或浏览器页面与插件进行通信，我创建了这个库，它提供了调用插件的高级API。
  - 通过 `@webext-core/proxy-service` 使 `content.js` 具有 `background.js` 服务调用能力, `message` 将会与 `content.js`
    建立连接, 进行服务调用。
  - 借鉴 `@webext-core/proxy-service` 的 Proxy, 为用户提供友好的
    简单、类型安全的调用方案。[测试用例](project/vpu-test/src/main.js)、 [ts类型](packages/message/src/type.ts)

## 致谢

- 受到 [eternity](https://github.com/BlackGlory/eternity) 的启发，创建了香草布丁。

## 许可证

- 取自开源, 回馈开源, 本项目使用 [MIT License](LICENSE)
- 本项目包含了 [eternity](https://github.com/BlackGlory/eternity)
  的部分代码 [MIT License](https://github.com/BlackGlory/eternity/blob/master/LICENSE)
- [第三方许可证](THIRD-PARTY-LICENSE)
