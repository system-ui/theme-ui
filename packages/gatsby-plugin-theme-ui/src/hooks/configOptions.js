import { useStaticQuery, graphql } from 'gatsby'

const useThemeUiConfig = () => {
  const data = useStaticQuery(graphql`
    query {
      themeUiConfig(id: { eq: "gatsby-plugin-theme-ui-config" }) {
        themePreset
      }
    }
  `)

  return data.themeUiConfig
}

export default useThemeUiConfig
