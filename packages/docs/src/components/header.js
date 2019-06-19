/** @jsx jsx */
import { jsx, Header, Container, Flex } from "theme-ui"
import MenuButton from "./menu-button"
import NavLink from "./nav-link"
import Button from "./button"

export default ({ cycleMode, mode, menuOpen, setMenuOpen, nav }) => (
  <Header>
    <Container>
      <Flex justifyContent="space-between">
        <Flex>
          <MenuButton
            onClick={e => {
              setMenuOpen(!menuOpen)
              if (!nav.current) return
              const navLink = nav.current.querySelector("a")
              if (navLink) navLink.focus()
            }}
          />
          <NavLink to="/">Theme UI</NavLink>
        </Flex>
        <Flex>
          <NavLink href="https://github.com/system-ui/theme-ui">GitHub</NavLink>
          <Button
            css={{
              ml: 2
            }}
            onClick={cycleMode}
          >
            {mode}
          </Button>
        </Flex>
      </Flex>
    </Container>
  </Header>
)
