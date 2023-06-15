import { ComponentProps } from 'react'

export interface CardProps extends ComponentProps<'div'> {}
export const Card = (props: CardProps) => (
  <div
    {...props}
    sx={{
      variant: 'styles.Card',
    }}
  />
)

export default Card
