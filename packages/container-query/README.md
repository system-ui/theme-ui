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
  const colors = ['red', 'blue', 'aqua']
  const widths = ['98%', '50%', '25%']
  const heights = ['20px', '40px', '60px']

  return (
    <Text
      {...props}
      ref={ref}
      __css={{
        backgroundColor: colors[index],
        height: heights[index],
        width: '100%', //widths[index]
      }}>
      {props.children}
    </Text>
  )
}
```

## Usage

```js
<ResponsiveText breakpoints={['32em', '48em']}>Hello</ResponsiveText>
```
