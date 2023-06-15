import { ThemeUIProvider, Theme, ThemeStyles, Global } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'
import { useLocation } from '@reach/router'
import {
  useState,
  EventHandler,
  MouseEvent,
  forwardRef,
  ReactNode,
} from 'react'
import * as React from 'react'
import merge from 'deepmerge'

import type { Sidebar, SidebarLink } from '../sidebar'
import type { Components as MDXComponents } from '@mdx-js/react/lib'

const flattenLinks = (links: SidebarLink[]): [text: string, href: string][] => {
  let res: [text: string, href: string][] = []
  for (const [name, href, children] of links) {
    res.push([name, href])
    if (children) {
      res = res.concat(flattenLinks(children))
    }
  }
  return res
}

interface OverlayProps {
  onClick?: EventHandler<MouseEvent<HTMLDivElement>>
}
const Overlay = ({ onClick }: OverlayProps) => (
  <>
    <div
      onClick={onClick}
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    />
    <Global
      styles={{
        body: {
          overflow: ['hidden', 'auto'],
        },
      }}
    />
  </>
)

export const Sidenav = forwardRef<
  HTMLDivElement,
  {
    open?: boolean
    components?: MDXComponents
    styles?: ThemeStyles
    children?: ReactNode
  }
>(({ open, styles = {}, components = {}, ...props }, ref) => {
  return (
    <ThemeUIProvider
      theme={{
        styles: merge<Theme['styles']>(
          {
            ul: {
              listStyle: 'none',
              p: 0,
              m: 0,
              ul: {
                a: {
                  pl: 4,
                },
              },
            },
            a: {
              display: 'block',
              px: 2,
              py: 2,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: 1,
              fontWeight: 'bold',
            },
          },
          styles
        ),
      }}
    >
      {open && <Overlay />}
      <MDXProvider components={components}>
        <div
          {...props}
          ref={ref}
          sx={{
            position: ['fixed', 'sticky'],
            top: 0,
            left: 0,
            bottom: [0, 'auto'],
            zIndex: 1,
            minWidth: 0,
            width: 256,
            maxHeight: ['100vh', 'none'],
            overflowX: 'visible',
            overflowY: 'auto',
            transition: 'transform .2s ease-out',
            transform: [open ? 'translateX(0)' : 'translate(-100%)', 'none'],
            bg: ['background', 'transparent'],
            WebkitOverflowScrolling: 'touch',
          }}
        />
      </MDXProvider>
    </ThemeUIProvider>
  )
})

export const AccordionButton = (props: {
  open: boolean
  pathname?: string
  href: string
  className?: string
  onClick: EventHandler<MouseEvent<HTMLButtonElement>>
}) => {
  const transform = props.open ? 'rotate(-180 8 8)' : 'rotate(0 8 8)'
  const disabled = props.pathname ? props.pathname.includes(props.href) : false

  return (
    <button
      title="Expand Section"
      disabled={disabled}
      {...props}
      onMouseDown={(e) => e.preventDefault()}
      sx={{
        appearance: 'none',
        display: 'flex',
        alignItems: 'center',
        p: 2,
        m: 0,
        border: 0,
        borderRadius: 0,
        color: 'inherit',
        bg: 'transparent',
        ':hover,:focus': {
          color: 'primary',
        },
        '&:disabled': {
          opacity: 0.25,
        },
      }}
    >
      <svg viewBox="0 0 16 16" width="12" height="12">
        <g
          sx={{
            transformOrigin: '8 8',
            transition: 'transform .1s ease-out',
          }}
          transform={transform}
        >
          <path
            stroke="currentcolor"
            strokeWidth="2"
            fill="none"
            d="M14 6 L8 12 L2 6"
          />
        </g>
      </svg>
    </button>
  )
}

type NavLinksProps = {
  open: boolean
  links: Sidebar
  Link: (props: {
    href?: string
    className?: string
    children?: ReactNode
  }) => JSX.Element
}
const NavLinks = ({ open, links, Link }: NavLinksProps) => {
  if (!links || !open) return null
  return (
    <ul
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
      }}
    >
      {links.map(([label, href], j) => (
        <li key={j}>
          <Link href={href} sx={{ pl: 4 }}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export interface AccordionNavProps extends OverlayProps {
  open?: boolean
  className?: string
  links: SidebarLink[]
  navLink: (props: {
    href?: string
    className?: string
    children?: ReactNode
  }) => JSX.Element
}
export const AccordionNav = forwardRef<HTMLDivElement, AccordionNavProps>(
  ({ open, links, className, navLink: Link, ...props }, ref) => {
    const { pathname } = useLocation()
    const [expanded, setExpanded] = useState<{ [k: number]: boolean }>({})

    const toggle = (i: number) => (e: MouseEvent) => {
      e.stopPropagation()
      setExpanded({
        ...expanded,
        [i]: !expanded[i],
      })
    }

    return (
      <>
        {open && <Overlay {...props} />}
        <div
          ref={ref}
          className={className}
          role="navigation"
          sx={{
            position: ['fixed', 'sticky'],
            top: 0,
            left: 0,
            bottom: [0, 'auto'],
            zIndex: 1,
            minWidth: 0,
            width: 256,
            maxHeight: ['100vh', 'none'],
            overflowX: 'visible',
            overflowY: 'auto',
            transition: 'transform .2s ease-out',
            transform: [open ? 'translateX(0)' : 'translate(-100%)', 'none'],
            bg: ['background', 'transparent'],
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <ul
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {links.map(([label, href, children], i: number) => (
              <li key={i}>
                <div
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Link href={href}>{label}</Link>
                  {children && (
                    <AccordionButton
                      href={href}
                      pathname={pathname}
                      open={expanded[i]}
                      sx={{
                        ml: 'auto',
                      }}
                      onClick={toggle(i)}
                    />
                  )}
                </div>
                <NavLinks
                  open={pathname.includes(href) || expanded[i]}
                  Link={Link}
                  links={children!}
                />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
)

const removeSlash = (str: string) =>
  str.length > 1 ? str.replace(/\/$/, '') : str

interface PaginationLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  label: string
  children: ReactNode
}

const PaginationLink = ({ label, children, ...props }: PaginationLinkProps) => (
  <a
    {...props}
    sx={{
      fontSize: 1,
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
    }}
  >
    <div>{label}</div>
    <div
      sx={{
        fontSize: 3,
      }}
    >
      {children}
    </div>
  </a>
)

export interface PaginationProps {
  pathname: string
  links: Sidebar
}

export const Pagination = ({
  pathname = '',
  links: propsLinks,
  ...props
}: PaginationProps) => {
  const links = flattenLinks(propsLinks)
  const index = links.findIndex((link) => link[1] === removeSlash(pathname))

  const hasPagination = index > -1
  const previous = links[index - 1]
  const next = links[index + 1]

  return (
    <div
      {...props}
      sx={{
        display: 'flex',
      }}
    >
      {hasPagination && previous && (
        <PaginationLink href={previous[1]} label="Previous:">
          {previous[0]}
        </PaginationLink>
      )}
      <div sx={{ mx: 'auto' }} />
      {hasPagination && next && (
        <PaginationLink href={next[1]} label="Next:">
          {next[0]}
        </PaginationLink>
      )}
    </div>
  )
}
