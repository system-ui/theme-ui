/** @jsx jsx */
import { ComponentProps } from 'react'
import { jsx } from 'theme-ui'

export interface CardProps extends ComponentProps<'div'> {}
export const Card: React.FC<CardProps> = props => (
  <div
    {...props}
    sx={{
      variant: 'styles.Card',
    }}
  />
)

export default Card
