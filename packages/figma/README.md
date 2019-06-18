
# @theme-ui/figma

Generate Theme UI JSON from the Figma API
(originally `figma-theme`)

- Parse [Styles][] from a Figma file ID
- Generates a theme JSON file compatible with [Theme UI][], [Styled System][], and more
- Built with [figma-js][]

```sh
npm i -D @theme-ui/figma
```

## Getting Started

Add a run script to your projects `package.json` with an ID for the source Figma project.

```json
"scripts": {
  "figma-theme": "theme-ui-figma <FIGMA-PROJECT-ID>"
}
```

Obtain a [personal access token][token] for the Figma API and add it to a `.env` file.

```bash
FIGMA_TOKEN="<PERSONAL_ACCESS_TOKEN>"
```

Run the script with `npm run figma-theme` to generate a `theme.json` file, which can be imported and used as a base for a full Theme UI `theme` object.

## Options

Options can be passed as CLI flags

- `--out-dir`: output directory (default current working directory)
- `--metadata`: include additional metadata from the Figma API

[Styles]: https://help.figma.com/properties-panel/styles
[Theme UI]: https://theme-ui.com
[Styled System]: https://styled-system.com
[token]: https://www.figma.com/developers/docs#auth-dev-token
[figma-js]: https://github.com/jongold/figma-js

<!-- test figma project ids
- TRi6YSk76405ImoatoMF1u28
- 2aMG4hw2qp3jSTGmtAMyhZ
- JGLoPfwRFqCwn4xZ8wUmSwp7
- Yw9L6FATzLpdcsnA5vdSgCRT
-->
