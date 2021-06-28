const visit = ({
  preferredColorScheme,
}: {
  preferredColorScheme: 'dark' | 'light' | null
}) =>
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

const colorModeSwitch = () => cy.findByLabelText(/Change color mode to \w+/)

const colorModeSwitchByText = (...args: Parameters<typeof cy.findByText>) =>
  colorModeSwitch()
    .parent({ log: false })
    .findByText(...args)

const removeDynamicElements = () => {
  cy.get('svg', { log: false })
    .then((graph) => graph.remove())
    .log('removed graph')

  // tests failing because somebody became online on Discord aren't funny...
  cy.findByAltText('Join our Discord community')
    .then((img) => img.remove())
    .log('removed Discord badge')
}

const screenshot = (message?: string) => {
  removeDynamicElements()
  cy.percySnapshot(message)
}

describe('docs color modes', () => {
  it('color mode is changed, loaded from local storage on reload and changed again', () => {
    visit({ preferredColorScheme: 'light' })

    colorModeSwitch().invoke('text').should('eq', 'Light')

    // no idea why calling click() just once here doesn't work
    colorModeSwitch().click().click()

    colorModeSwitch()
      .parent({ log: false })
      .findByText('Dark', { timeout: 6000 })
    colorModeSwitch().click()

    screenshot()

    colorModeSwitchByText('Deep')
    colorModeSwitch().click()

    colorModeSwitchByText('Swiss')
    colorModeSwitch().click()

    colorModeSwitchByText('Light')
    colorModeSwitch().click()
    colorModeSwitch().click()

    colorModeSwitchByText('Deep')

    cy.reload()

    colorModeSwitchByText('Deep')

    visit({ preferredColorScheme: 'light' })

    colorModeSwitchByText('Deep')

    screenshot('"deep" loaded from localStorage')

    colorModeSwitch().click()
    colorModeSwitchByText('Swiss')
  })

  it('visited with preferred color scheme "light" matches snapshot', () => {
    visit({ preferredColorScheme: 'light' })
    colorModeSwitchByText('Light')
    screenshot("preferred 'light")
  })

  it('visited with preferred color scheme "dark" matches snapshot', () => {
    visit({ preferredColorScheme: 'dark' })
    colorModeSwitchByText('Dark')
    screenshot("preferred 'dark'")
  })
})

export {}
