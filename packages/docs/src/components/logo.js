import React from 'react'

const css = {
  __html: `
<![CDATA[
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/inter/v1/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYAZ9hiA.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
]]>
`,
}

export default ({ size = 256, color = 'inherit', ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={size}
    height={size}
    style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: 12,
      letterSpacing: '0.1em',
      fill: 'currentcolor',
      color,
      pointerEvents: 'none',
    }}>
    <defs>
      <style dangerouslySetInnerHTML={css} type="text/css" />
      <mask id="ui">
        <rect width={32} height={32} fill="white" />
        <text x={16} y={21} fill="black" textAnchor="middle">
          UI
        </text>
      </mask>
    </defs>
    <circle cx={16} cy={16} r={16} mask="url(#ui)" />
  </svg>
)
