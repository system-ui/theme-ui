import { SxProps } from './theme'

declare module 'react' {
  // tslint:disable-next-line: no-empty-interface
  interface DOMAttributes<T> extends SxProps {}
}

declare global {
  namespace JSX {
    // tslint:disable-next-line: no-empty-interface
    interface IntrinsicAttributes extends SxProps {}
  }
}
