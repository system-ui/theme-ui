# @theme-ui/custom-properties

Extend [ThemeUI](https://theme-ui.com)'s core functionality with CSS Custom Properties.


## Installation

```
yarn add @theme-ui/custom-properties
```

## API

### toCustomProperties

Transform your Theme UI compliant theme to an object of CSS Custom Properties. 

**Type**: `Function`

**Parameters**:
1. theme - The theme ui specification object
2. prefix - An optional string prefix for the css custom property (_optional_)

**Returns**: `Object`
```js
// Example response
{
  '--color-primary': '#2980b9',
  '--color-secondary': '#f7df1e',
  '--fontSize-0': 12,
  ' -fontSize-1': 14,
  '--fontSize-2': 16,
  '--fontSize-3': 24,
  '--fontSize-4': 32,
  '--fontSize-5': 48,
  '--fontSize-6': 64
}
```

**Example**:
```js
import toCustomProperties from '@theme-ui/custom-properties';
import theme from '../theme';

const customProperties = toCustomProperties(theme, '🍭');
console.log(customProperties);
```

### withCustomProperties
Extend the base `ThemeProvider` to allow native styling by using CSS Custom Properties.

**Type**: `Function`

**Parameters**:
1. prefix - An optional string prefix for the css custom property (_optional_)
2. className - An optional class name to add onto the wrapper. All CSS Custom Properties will be defined on this element.

**Returns** a React Component which extends the default `ThemeProvider` by adding CSS Custom Properties to the wrapper element.

For example: 

```jsx
const ExtendedThemeProvider = withCustomProperties('app-name', 'extended-theme-provider');

ReactDOM.render(
    <ExtendedThemeProvider theme={theme}>
      <p> Hello world! </p>
    </ExtendedThemeProvider>,
    root
  );
```

will render:

```jsx
  <div class="extended-theme-provider">
    <p> Hello world! </p>
  </div>
```

Then in CSS we can do something like:

```css
p {
  color: var(--app-name-color-primary);
  background: var(--app-name-color-secondary);
}
```

These CSS Custom Properties are in total sync with the theme. Also, sub-theming works as expected.

```jsx
const theme = {
  colors: {
    primary: 'red',
    secondary: 'blue'
  }
};

const subTheme = {
  colors: {
    primary: 'orange'
  }
};

const ExtendedThemeProvider = withCustomProperties('app-name');

ReactDOM.render(
  <ExtendedThemeProvider theme={theme}>
    <p> Hello world! </p> // red on a blue background 

    <ExtendedThemeProvider theme={subTheme}>
      <p> Hello Aliens! </p> // orange on a blue background
    </ExtendedThemeProvider>
  
  </ExtendedThemeProvider>,
  root
);
```

```css
p {
  color: var(--app-name-color-primary);
  background: var(--app-name-color-secondary);
}
```