import { useStaticQuery, graphql } from 'gatsby'

const useThemeUiConfig = () => {
  const data = useStaticQuery(graphql`
    query {
      themeUiConfig(id: { eq: "gatsby-plugin-theme-ui-config" }) {
        prismPreset
        preset
      }
    }
  `)

  return data.themeUiConfig
}

export default useThemeUiConfig
