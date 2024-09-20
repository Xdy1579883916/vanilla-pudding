# Vanilla Pudding 🌿🍮 User Script Manager

![logo](/project/ext/public/icon/128.png)

## English | [简体中文](./README.md)

## Origin of the Name

- JavaScript is commonly referred to as "vanilla-js".
- And a script manager is akin to a "patch" for JavaScript.
- Thus, this project is named **Vanilla Pudding**.

## Plugin Installation and Environment Requirements

- from Chrome Web Store [Install](https://chrome.google.com/webstore/detail/fencadnndhdeggodopebjgdfdlhcimfk).

- A minimalist JavaScript user script loader and manager for modern browsers.

- To use this extension, you will need Chrome 120 or higher and
  have [Developer Mode enabled](https://www.tampermonkey.net/faq.php#Q209).

## When Do You Need This?

- A modern script manager with default support for ESM script loaders.

- A script manager similar to [Tampermonkey](https://www.tampermonkey.net/), but without support for GM_* APIs.

- Built-in MonacoEditor.

- A powerful manager that supports advanced API capabilities from the plugin.
  - [x] Cookie `chrome.cookies`
  - [x] Tabs `chrome.tabs`
  - [x] Storage (`chrome.storage.sync`、`chrome.storage.local`、`chrome.storage.session`) Provides plugin-level storage
    capabilities.
  - [x] NamespaceStorage Based on indexDB, driven by Dexie, provides plugin-level storage capabilities with
    namespaces.
  - [x] RuleDNRTool `chrome.declarativeNetRequest`
  - [x] Plugin requests, based on [quick-fy](https://github.com/Xdy1579883916/quick-fy)
    - Cross-domain requests
    - Modify request headers
    - Use example templates to build user scripts with vite (detailed introduction below).

## Metadata

You need to write metadata in the form of comments at the beginning of the script, refer to the example for the format.

```ts
type StrOrStrArr = string | string[]
// 1. Supports camelCase and hyphen style
// 2. Although the ts type here is mainly for type hints provided by the vite plugin, the naming still conforms to the comment syntax, which is slightly different from the actual values of Google plugins
interface ScriptMeta {
  // The name of the user script
  'name': string
  // The update URL of the user script, this is optional, when you click the update button, the plugin will access this URL to keep the user script up to date.
  // You can specify multiple update URLs, the plugin will check them in order until a usable user script is found.
  'update-url'?: StrOrStrArr
  'updateUrl'?: StrOrStrArr
  // The following properties come from chrome.userScripts.RegisteredUserScrip, with only slight differences in the property names that support values as StrOrStrArr
  'world'?: chrome.userScripts.ExecutionWorld
  'runAt'?: chrome.userScripts.RunAt
  'run-at'?: chrome.userScripts.RunAt
  'allFrames'?: boolean
  'all-frames'?: boolean
  'match'?: StrOrStrArr
  'exclude-match'?: StrOrStrArr
  'excludeMatch'?: StrOrStrArr
  'exclude-glob'?: StrOrStrArr
  'excludeGlob'?: StrOrStrArr
  'include-glob'?: StrOrStrArr
  'includeGlob'?: StrOrStrArr
  // The method of user script injection, default: esm
  'run-with'?: 'esm' | 'raw'
  'runWith'?: 'esm' | 'raw'
}
```

## Example One

```js
// @name allow-temu-translate
// @match https://www.temu.com/*
// @runAt document_start
(function () {
  document.documentElement.setAttribute('translate', '')
})()
```

## Example Two ESM Support, from [eternity](https://github.com/BlackGlory/eternity?tab=readme-ov-file#example)

```js
// @name Hello World
// @match <all_urls>
import { addStyleSheet } from 'https://esm.sh/userstyle@0.2.1'

addStyleSheet(`
  *:before {
    content: 'Hello'
  }

  *:after {
    content: 'World'
  }
`)
```

## For more advanced usage, it is recommended to use the example template [create-vpu](https://www.npmjs.com/package/create-vpu)

- create-vpu [Source Code](packages/create-vpu/package.json)
- Create your first vanilla-pudding user script project.  `npm create vpu@latest`
- The example template uses vite to build your user script,
- After build, you can directly copy it into the user script manager. It can also be packaged and published to npm like
  [this tool](https://www.npmjs.com/package/dpms-tools).
- [vanilla-pudding-message](packages/message/package.json) Package provides easy-to-use plugins with advanced APIs.
- [vanilla-pudding-vite-plugin](packages/vite-plugin/package.json)
  - Automatically generates annotations according to configuration, easily sets Metadata.
  - Supports esm, reducing packaging volume.

## Technical Sharing

- [wxt](https://wxt.dev/) is used for quickly building browser extensions.
- [vite](https://vitejs.dev/) is my commonly used front-end build tool.
- [@webext-core/proxy-service](https://webext-core.aklinker1.io/guide/proxy-service/) is used for service calls between
  popup, content, and background.
  - [message](packages/message) To facilitate communication between user scripts or browser pages and the plugin, I
    created this library, which provides advanced API calls to the plugin.
    - Through `@webext-core/proxy-service`, `content.js` is endowed with the capability to call services
      from `background.js`, `message` will establish a connection with `content.js` to make service calls.
    - Drawing on the Proxy from `@webext-core/proxy-service`, it provides a user-friendly, simple, and type-safe calling
      solution. [Test cases](project/vpu-test/src/main.js), [ts types](packages/message/src/type.ts).

## Credits

- Inspired by [eternity](https://github.com/BlackGlory/eternity), Vanilla Pudding was created.

## Licenses

- From open source, giving back to open source, this project uses the [MIT License](LICENSE)
- This project contains some code from [eternity](https://github.com/BlackGlory/eternity) under
  the [MIT License](https://github.com/BlackGlory/eternity/blob/master/LICENSE)
- [THIRD-PARTY-LICENSE](THIRD-PARTY-LICENSE)
