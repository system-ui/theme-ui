/** @jsx jsx */
import { jsx } from 'theme-ui'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Sidenav, Pagination, AccordionNav } from '../src'

afterEach(cleanup)

const links = (
  <ul>
    <li>
      <a mdxType="a" href="/">
        Beep
      </a>
    </li>
    <li>
      <a mdxType="a" href="/boop">
        Boop
      </a>
    </li>
    <li>
      <a mdxType="a" href="/bop">
        Bop
      </a>
    </li>
  </ul>
)
const nestedLinks = (
  <ul>
    <li>
      <a mdxType="a" href="/">
        Beep
      </a>
    </li>
    <li>
      <a mdxType="a" href="/boop">
        Boop
      </a>
    </li>
    <li>
      <a mdxType="a" href="/bop">
        Bop
      </a>
      <ul mdxType="ul">
        <li>
          <a mdxType="a" href="/bop/hi">
            Hi
          </a>
        </li>
      </ul>
    </li>
  </ul>
)

test('Sidenav renders', () => {
  const json = renderer.create(<Sidenav>{links}</Sidenav>).toJSON()
  expect(json).toMatchSnapshot()
})

test('Sidenav renders open', () => {
  const json = renderer.create(<Sidenav open={true}>{links}</Sidenav>).toJSON()
  expect(json).toMatchSnapshot()
})

test('Pagination renders', () => {
  const json = renderer
    .create(<Pagination pathname="/" children={links} />)
    .toJSON()
  expect(json).toMatchSnapshot()
})

test('AccordionNav renders', () => {
  const json = renderer.create(<AccordionNav children={links} />).toJSON()
  expect(json).toMatchSnapshot()
})

test('AccordionNav renders with nested links', () => {
  const json = renderer.create(<AccordionNav children={nestedLinks} />).toJSON()
  expect(json).toMatchSnapshot()
})

test('AccordionNav renders open', () => {
  const json = renderer
    .create(<AccordionNav open={true} children={nestedLinks} />)
    .toJSON()
  expect(json).toMatchSnapshot()
})

test('AccordionNav button toggles open state', () => {
  const root = render(<AccordionNav children={nestedLinks} />)
  const button = root.getByTitle('Expand Section')
  button.click()
  const nested = root.getByText('Hi')
  expect(nested).toBeTruthy()
})
