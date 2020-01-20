# @theme-ui/responsive-hooks

React hooks for referencing theme-ui breakpoints.

## Overview

This package provides a `useBreakpointIndex` React hook for referencing responsive values based on component's breakpoints.

## Installation

```sh
npm i @theme-ui/responsive-hooks
```

## Creation

```js
import { useBreakpointIndex } from '@theme-ui/responsive-hooks'

const ResponsiveText = props => {
  const ref = useRef(null)
  const index = useResponsiveIndex(props.breakpoints, ref.current)
  const width = props.width[index]

  return (
    <Text {...props} ref={ref} width={width}>
      {props.children}
    </Text>
  )
}
```

## Usage

```js
<ResponsiveText breakpoints={['40em', '52em']} width={['100%', '50%', '25%']}>
  Hello
</ResponsiveText>
```
