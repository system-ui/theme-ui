/*
  This theme object is based on the prism-react-renderer
  shape. It doesn't pull theme values from the config file
  so it needs to use hardcoded values or the object directly.

  SOURCE: https://github.com/FormidableLabs/prism-react-renderer/blob/master/themes/duotoneDark.js
*/
export default {
  plain: {
    color: 'black',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#777',
        fontStyle: 'italic',
      },
    },
  ],
}
