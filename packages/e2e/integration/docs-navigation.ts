describe('docs navigation', () => {
  it('works without 404', () => {
    cy.visit('/')
    cy.findByText('Documentation').click()
    cy.location().should('have.property', 'pathname', '/getting-started')
    cy.findByText('Theming').click({ force: true })
    cy.get('h1').should('have.text', 'Theming')
    cy.findAllByRole('link').then(($links) => {
      const links = $links.get()
      const texts = links.map((link) => link.textContent)

      const expectedLinkTexts = [
        'Hooks',
        'API',
        'Theme Specification',
        'Demo',
        'Resources',
        'Components',
        'Packages',
        'Guides',
        'Recipes',
        'Migrating',
        'Edit the page on GitHub',
        'Previous:Getting Started with Gatsby',
        'Next:The sx Prop',
      ]

      for (const s of expectedLinkTexts) {
        expect(texts).to.include(s)
      }

      const nextChapterLink = links.find(
        (link) => link.textContent === 'Next:The sx Prop'
      )!

      nextChapterLink.click()

      const packagesLink = links.find(
        (link) => link.textContent === 'Packages'
      )!

      packagesLink.click()
    })

    for (const packageName of [
      'css',
      'core',
      'components',
      'presets',
      'color',
    ]) {
      cy.findAllByText('@theme-ui/' + packageName, { selector: 'li > a' })
        .first()
        .click()
      cy.location().should(
        'have.property',
        'pathname',
        `/packages/${packageName}`
      )
    }

    cy.window().then((win) => win.scrollTo(0, 200))

    cy.percySnapshot('@theme-ui/color docs')
  })

  it('displays 404 page', () => {
    cy.visit(`/not-found-${Math.random()}`, { failOnStatusCode: false })
    cy.findByRole('heading').should('have.text', '404')
    cy.findByText('Page not found')
  })
})

export {}
