import React from 'react'
import { expecter } from '@theme-ui/test-utils'

import {
  Alert,
  AlertProps,
  AspectImage,
  AspectImageProps,
  AspectRatio,
  AspectRatioProps,
  Avatar,
  AvatarProps,
  Badge,
  BadgeProps,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Card,
  CardProps,
  Checkbox,
  CheckboxProps,
  Close,
  CloseProps,
  Container,
  ContainerProps,
  Divider,
  DividerProps,
  Donut,
  DonutProps,
  Embed,
  EmbedProps,
  Field,
  FieldProps,
  Flex,
  FlexProps,
  Grid,
  GridProps,
  Heading,
  HeadingProps,
  IconButton,
  IconButtonProps,
  Image,
  ImageProps,
  Input,
  InputProps,
  Label,
  LabelProps,
  Link,
  LinkProps,
  MenuButton,
  MenuButtonProps,
  Message,
  MessageProps,
  NavLink,
  NavLinkProps,
  Progress,
  ProgressProps,
  Radio,
  RadioProps,
  Select,
  SelectProps,
  Slider,
  SliderProps,
  Spinner,
  SpinnerProps,
  Text,
  TextProps,
  Textarea,
  TextareaProps,
} from '../'

describe('components type check', () => {
  it('should pass type check for props', () => {
    // Alert
    ;((props: AlertProps) => <Alert {...props} />)({})

    // AspectImage
    ;((props: AspectImageProps) => <AspectImage {...props} />)({})

    // AspectRatio
    ;((props: AspectRatioProps) => <AspectRatio {...props} />)({})

    // Avatar
    ;((props: AvatarProps) => <Avatar {...props} />)({})

    // Badge
    ;((props: BadgeProps) => <Badge {...props} />)({})

    // Box
    ;((props: BoxProps) => <Box {...props} />)({})

    // Button
    ;((props: ButtonProps) => <Button {...props} />)({})

    // Card
    ;((props: CardProps) => <Card {...props} />)({})

    // Checkbox
    ;((props: CheckboxProps) => <Checkbox {...props} />)({})

    // Close
    ;((props: CloseProps) => <Close {...props} />)({})

    // Container
    ;((props: ContainerProps) => <Container {...props} />)({})

    // Divider
    ;((props: DividerProps) => <Divider {...props} />)({})

    // Donut
    ;((props: DonutProps) => <Donut {...props} />)({ value: 50 })

    // Embed
    ;((props: EmbedProps) => <Embed {...props} />)({})

    // Field
    ;((props: FieldProps<'input'>) => <Field {...props} />)({
      label: 'Email',
      name: 'email',
    })

    // Flex
    ;((props: FlexProps) => <Flex {...props} />)({})

    // Grid
    ;((props: GridProps) => <Grid {...props} />)({})

    // Heading
    ;((props: HeadingProps) => <Heading {...props} />)({})

    // IconButton
    ;((props: IconButtonProps) => <IconButton {...props} />)({})

    // Image
    ;((props: ImageProps) => <Image {...props} />)({})

    // Input
    ;((props: InputProps) => <Input {...props} />)({})

    // Label
    ;((props: LabelProps) => <Label {...props} />)({})

    // Link
    ;((props: LinkProps) => <Link {...props} />)({})

    // MenuButton
    ;((props: MenuButtonProps) => <MenuButton {...props} />)({})

    // Message
    ;((props: MessageProps) => <Message {...props} />)({})

    // NavLink
    ;((props: NavLinkProps) => <NavLink {...props} />)({})

    // Progress
    ;((props: ProgressProps) => <Progress {...props} />)({})

    // Radio
    ;((props: RadioProps) => <Radio {...props} />)({})

    // Select
    ;((props: SelectProps) => <Select {...props} />)({})

    // Slider
    ;((props: SliderProps) => <Slider {...props} />)({})

    // Spinner
    ;((props: SpinnerProps) => <Spinner {...props} />)({})

    // Text
    ;((props: TextProps) => <Text {...props} />)({})

    // Textarea
    ;((props: TextareaProps) => <Textarea {...props} />)({})
  })

  describe('ref types inference', () => {
    const expectSnippet = expecter(`
      import { Box, Flex } from './packages/components'
    `)

    it('Box#ref infers HTMLDivElement | null', () => {
      expectSnippet(`    
        <Box
          ref={ref => {
            const _ref = ref;
          }}
        />
      `).toInfer('_ref', 'HTMLDivElement | null')
    })

    it("Flex.withComponent('form')#ref infers HTMLFormElement | null", () => {
      expectSnippet(`    
        const FormFlex = Flex.withComponent('form');
  
        <FormFlex
          ref={ref => {
            const _ref = ref;
          }}
        />
      `).toInfer('_ref', 'HTMLFormElement | null')
    })

    it("Box.withComponent('button')#ref infers HTMLButtonElement | null", () => {
      expectSnippet(`    
        const ButtonBox = Box.withComponent('button');
  
        <ButtonBox
          ref={ref => {
            const _ref = ref;
          }}
        />
      `).toInfer('_ref', 'HTMLButtonElement | null')
    })
  })
})
