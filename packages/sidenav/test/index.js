/** @jsx jsx */
import { jsx } from 'theme-ui'
import renderer from 'react-test-renderer'
import { Sidenav, Pagination } from '../src'

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
})
