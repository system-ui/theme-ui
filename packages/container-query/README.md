# @theme-ui/container-query

React hooks for referencing component and theme-ui breakpoints.

## Overview

This package provides a `useContainerQuery` React hook for referencing responsive values based on component's breakpoints.

## Installation

```sh
npm i @theme-ui/container-query
```

## Creation

```js
import { useContainerQuery } from '@theme-ui/container-query'

const ResponsiveText = props => {
  const [ref, index] = useContainerQuery(props.breakpoints)

  return (
    <Text
      {...props}
      ref={ref}
      __css={{
        backgroundColor: props.bg[index],
        width: '100%',
      }}>
      {props.children}
    </Text>
  )
}
```

## Usage

```js
<ResponsiveText breakpoints={['32em', '48em']} bg={['red', 'blue', 'green']}>
  Hello
</ResponsiveText>
```
