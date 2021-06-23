/// <reference types="cypress" />
import * as toolbelt from 'ts-toolbelt'

// Workaround for @testing-library/dom problem.
// We should be able remove it in the future.
if (typeof global === 'undefined') {
  Object.assign(window, { global: window })
}

require('@testing-library/cypress/add-commands')
require('@percy/cypress')
const { default: userEvent } =
  require('@testing-library/user-event') as typeof import('@testing-library/user-event')

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> extends Chainables<typeof commands> {}
  }
}

export {}

const commands = {}

type Chainables<T extends object> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? (
        ...args: toolbelt.List.Tail<Parameters<T[K]>>
      ) => Cypress.Chainable<ReturnType<T[K]>>
    : never
}
