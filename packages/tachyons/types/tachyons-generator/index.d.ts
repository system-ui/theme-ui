declare module 'tachyons-generator' {
  export default function(config: {
    [TachyonsKey: string]: unknown
  }): {
    generate(): Promise<{ css: string }>
  }
}
