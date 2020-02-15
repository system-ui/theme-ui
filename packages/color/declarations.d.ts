// remove this file when theme-ui/css gets types

declare module '@theme-ui/css' {
  export const get: (
    obj: object,
    key: string,
    def: any,
    p?: any,
    undef?: any
  ) => any
}
