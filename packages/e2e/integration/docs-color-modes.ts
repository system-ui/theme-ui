const visit = ({
  preferredColorScheme,
}: {
  preferredColorScheme: 'dark' | 'light' | null
}) => {
  cy.visit('/', {
    onBeforeLoad(win) {
      const _matchMedia = win.matchMedia
      win.matchMedia = (query: string) => {
        if (query.includes('prefers-color-scheme:')) {
          const queried = query.match(/\(prefers-color-scheme:\s*(.+)\s*\)/)
          const scheme = queried?.[1]
          return {
            matches: preferredColorScheme === scheme,
            media: query,
          } as MediaQueryList
        }

        return _matchMedia(query)
      }
    },
  })
  cy.wait(1000) // <- temporary
}

const colorModeSwitch = () => cy.findAllByLabelText(/Change color mode to \w+/)

const colorModeSwitchByText = (...args: Parameters<typeof cy.findByText>) =>
  colorModeSwitch()
    .parent({ log: false })
    .findByText(...args)

const removeDynamicElements = () => {
  cy.get('svg', { log: false })
    .then((graph) => graph.remove())
    .log('removed graph')

  // tests failing because somebody became online on Discord aren't funny...
  cy.findByTestId('readme-badges')
    .then((badges) => badges.remove())
    .log('removed readme badges')
}

const screenshot = (message?: string) => {
  removeDynamicElements()
  cy.percySnapshot(message)
}

describe('docs color modes', () => {
  it('color mode is changed, loaded from local storage on reload and changed again', () => {
    visit({ preferredColorScheme: 'light' })

    colorModeSwitchByText('Light')
    // no idea why calling click() just once here doesn't work
    colorModeSwitch().click().click()

    colorModeSwitchByText('Dark')
    colorModeSwitch().click()

    screenshot('"Deep mode" switched to from "Light"')

    colorModeSwitchByText('Deep', { timeout: 10_000 })
    colorModeSwitch().click()

    colorModeSwitchByText('Swiss')
    colorModeSwitch().click()

    colorModeSwitchByText('Light')
    colorModeSwitch().click()
    colorModeSwitch().click()

    colorModeSwitchByText('Deep')

    cy.reload()
    cy.wait(1000)

    colorModeSwitchByText('Deep', { timeout: 10_000 })

    visit({ preferredColorScheme: 'light' })

    colorModeSwitchByText('Deep', { timeout: 10_000 })

    screenshot('"deep" loaded from localStorage')

    colorModeSwitch().click()
    colorModeSwitchByText('Swiss', { timeout: 10_000 })
  })

  it('visited with preferred color scheme "light" matches snapshot', () => {
    visit({ preferredColorScheme: 'light' })
    colorModeSwitchByText('Light', { timeout: 10_000 })
    screenshot("preferred 'light")
  })

  it('visited with preferred color scheme "dark" matches snapshot', () => {
    visit({ preferredColorScheme: 'dark' })
    colorModeSwitchByText('Dark', { timeout: 10_000 })
    screenshot("preferred 'dark'")
  })
})

export {}
