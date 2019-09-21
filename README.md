# Gatsby-Plugin-Inline-LuaLaTeX

Let Gatsby automatically generate PDFs by using React components that encode LuaLaTeX docs.

## Installation

1. Add gatsby-plugin-inline-lualatex to your Gatsby project by executing `npm install --save gatsby-plugin-inline-lualatex`.
2. Modify your `gatsby-config.js` and add this plugin:
```js
// Inside gatsby-config.js
plugins: [
    `gatsby-plugin-inline-lualatex`
]
```

## Usage

Inside any of your pages you can create an inline LuaLaTeX document which then gets compiled into a PDF. Below is an example demonstrating all the components:

```js
// This file could be under src/pages/ for example.
import { Document, DocumentClass, Preamble, UsePackage, Chunk, Environment } from "gatsby-plugin-inline-lualatex"

export default () => {
    <div>
        <p> This is a regular Gatsby page. </p>
        <Document output="main.pdf"> {/* This creates public/main.pdf */}
            <DocumentClass options="11pt">article</DocumentClass> {/* This puts a \documentclass[...]{...} in the preamble. */}
            <UsePackage>amsmath</UsePackage> {/* This puts a \usepackage[...]{...} in the preamble. */}
            <Environment tag="document"> {/* Environment is shorthand for \begin{...} blahblahblah \end{...}. */}
                <Chunk>Hello world!</Chunk> {/* Chunk directly outputs  into the TeX document. */}
                <Chunk>$x^2=y$</Chunk>
                <Preamble>{ `\\usepackage{tikz}` }</Preamble> {/* Preambles get pulled out and placed in the beginning of document. */}
                <Preamble>{ `\\usepackage{tikz}`}</Preamble> {/* Repeated preamble statements automatically get discarded. */}
            </Environment>
        </Document>
    </div>
}
```

## License

The MIT license.