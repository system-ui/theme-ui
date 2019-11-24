# babel-preset-theme-ui

Babel preset to enable the `theme-ui` custom pragma by default.

```sh
npm i babel-preset-theme-ui
```

Add the preset to your babel config, i.e. for a `babel.config.js`:

```diff
module.exports = {
  presets: [
    "@babel/preset-react",
+    "babel-preset-theme-ui",
  ]
}
```
