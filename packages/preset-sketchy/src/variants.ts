import type { ThemeUICSSObject, Theme } from '@theme-ui/css'

const defaultBorderStyles: ThemeUICSSObject = {
  border: 'thick',
  color: 'text',
  borderRadius: 'sketchy0',
}

const buttonStyles: ThemeUICSSObject = {
  ...defaultBorderStyles,
  transition: 'all 250ms ease',
  bg: 'muted',
  boxShadow: 'default',
  fontFamily: 'inherit',
  '&:hover': {
    boxShadow: 'hover',
  },
}

const formStyles: ThemeUICSSObject = {
  borderRadius: 'sketchy3',
  borderColor: 'text',
  fontFamily: 'inherit',
  '&:focus': {
    boxShadow: 'outline',
    outline: 'none',
  },
}

export interface ThemeUIPresetSketchyVariants
  extends Pick<
    Theme,
    'messages' | 'alerts' | 'badges' | 'links' | 'buttons' | 'forms' | 'cards'
  > {}

export const variants: ThemeUIPresetSketchyVariants = {
  buttons: {
    primary: buttonStyles,
    danger: {
      ...buttonStyles,
      borderColor: 'primary',
      backgroundColor: 'primaryLight',
    },
    info: {
      ...buttonStyles,
      borderColor: 'blueDark',
      backgroundColor: 'blue',
    },
    warning: {
      ...buttonStyles,
      borderColor: 'yellowDark',
      backgroundColor: 'yellow',
    },
    success: {
      ...buttonStyles,
      borderColor: 'greenDark',
      backgroundColor: 'green',
    },
  },
  forms: {
    input: formStyles,
    select: formStyles,
    textarea: formStyles,
    slider: {
      bg: 'muted',
    },
    radio: {
      bg: 'transparent',
      border: 'thin',
      borderRadius: 'circle',
      ...{
        'input:focus ~ &': {
          bg: 'transparent',
          border: 'thick',
        },
        '> path': {
          fill: 'none',
          d: '',
        },
        'input:checked ~ &': {
          '> path': {
            fill: 'text',
            d: 'path("M 10.652237623048844 7.578611366838201 C 11.6115227800823 7.22981180626388, 13.889540717124019 6.621252514969635, 15.006068983724713 7.026960398489625 C 16.122597250325406 7.432668282009615, 17.24515580522389 8.872089685429708, 17.35140722265301 10.01285866795814 C 17.457658640082126 11.153627650486571, 16.03912316416566 12.76488553177375, 15.643577488299421 13.871574293660212 C 15.248031812433185 14.978263055546673, 15.70404673710284 15.989337062262969, 14.978133167455589 16.65299123927691 C 14.252219597808338 17.316645416290854, 12.610153195677707 17.94949960782212, 11.288096070415921 17.85349935574386 C 9.966038945154136 17.7574991036656, 7.781697843868845 17.274206036451343, 7.045790415884869 16.07698972680735 C 6.309882987900893 14.879773417163358, 6.667167006900895 11.870389393142492, 6.8726515025120625 10.670201497879903 C 7.07813599812323 9.470013602617314, 7.509354351285175 9.623932126594248, 8.278697389551876 8.87586235523182 C 9.048040427818577 8.127792583869393, 10.800397347992876 6.511149736417917, 11.488709732112266 6.181782869705334 C 12.177022116231656 5.85241600299275, 12.362948941900267 6.800560104746367, 12.408571694268218 6.899661154956319 M 13.086326549703468 6.334372159562634 C 14.045726949181018 6.585576587705861, 14.02815772607352 8.130937315240134, 14.793913170925268 8.926035996194482 C 15.559668615777017 9.72113467714883, 17.46622859426858 9.94150723842843, 17.680859218813964 11.104964245288727 C 17.89548984335935 12.268421252149023, 16.762624629428604 14.78314657395292, 16.081696918197572 15.906778037356261 C 15.400769206966542 17.030409500759603, 14.496037988376179 17.905210314899808, 13.59529295142778 17.846753025708782 C 12.694547914479381 17.788295736517757, 11.830922537359877 15.961407961261365, 10.677226696507184 15.556034302210117 C 9.52353085565449 15.150660643158869, 7.46854225335996 16.452930254273024, 6.673117906311619 15.414511071401293 C 5.877693559263278 14.376091888529562, 5.510665357146541 10.851337607072976, 5.904680614217136 9.325519204979734 C 6.29869587128773 7.799700802886492, 8.005394513273384 6.6233206129496365, 9.037209448735185 6.2596006588418405 C 10.069024384196986 5.8958807047340445, 11.66025806903873 7.303422381948635, 12.095570226987942 7.143199480332959 C 12.530882384937154 6.982976578717284, 11.801551634336983 5.127314121350047, 11.649082396430458 5.298263249147787")',
          },
        },
      },
    },
    checkbox: {
      color: 'text',
      borderRadius: 'sketchy1',
      border: 'thin',
      ...{
        '> path': {
          d: "path('')",
        },
        'input:checked ~ &': {
          '> path': {
            fill: 'text',
            strokeWidth: 1,
            d: 'path("M 4.919908 9.946009 C 6.78687 12.35396, 11.267954 19.167892, 11.244466681494456 17.627486 M 4.769042 9.779518 C 8.798076303434634 11.73868628417444, 10.99146627954846 17.425105, 10.675698 20.863192 M 9.268309 20.523752 C 20.141903 2.909804, 34.051755 -1.122666, 30.36023 -3.770398 M 9.805838 17.521756 C 20.949272 9.844316, 22.870222 0.34781, 29.66209 -4.694285")',
          },
        },
        'input:focus ~ &': {
          background: 'transparent',
          border: 'thick',
          '> path': {
            strokeWidth: 2,
          },
        },
      },
    },
  },
  messages: {
    danger: {
      ...defaultBorderStyles,
      borderColor: 'primary',
      backgroundColor: 'primaryLight',
    },
    info: {
      ...defaultBorderStyles,
      borderColor: 'blueDark',
      backgroundColor: 'blue',
    },
    warning: {
      ...defaultBorderStyles,
      borderColor: 'yellowDark',
      backgroundColor: 'yellow',
    },
    success: {
      ...defaultBorderStyles,
      borderColor: 'greenDark',
      backgroundColor: 'green',
    },
  },
  alerts: {
    danger: {
      ...defaultBorderStyles,
      borderColor: 'primary',
      backgroundColor: 'primaryLight',
    },
    info: {
      ...defaultBorderStyles,
      borderColor: 'blueDark',
      backgroundColor: 'blue',
    },
    warning: {
      ...defaultBorderStyles,
      borderColor: 'yellowDark',
      backgroundColor: 'yellow',
    },
    success: {
      ...defaultBorderStyles,
      borderColor: 'greenDark',
      backgroundColor: 'green',
    },
  },
  links: {
    nav: {
      borderRadius: 'sketchy1',
      textDecoration: 'none',
      px: 2,
      py: 1,
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      '&:hover': {
        bg: 'primaryLight',
      },
    },
  },
  badges: {
    primary: {
      borderRadius: 'sketchy1',
      color: 'background',
      bg: 'primary',
    },
    outline: {
      borderRadius: 'sketchy1',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px',
    },
  },
  cards: {
    primary: {
      color: 'text',
      borderRadius: 'sketchy1',
      boxShadow: 'default',
      border: 'thick',
      fontFamily: 'inherit',
    },
  },
}
