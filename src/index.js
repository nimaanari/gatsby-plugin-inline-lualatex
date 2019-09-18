import React, { useContext } from 'react';
import { InlineStream, Chunk, Collect } from 'react-inline-stream';
import { setSource } from './source-store';
import path from 'path';

export { Chunk };

const PreambleContext = React.createContext({
    ensure: () => {}
});

export const Preamble = ({ key, children }) => {
    const preamble = useContext(PreambleContext);
    const record = (chunks) => {
        const text = chunks.flat(Infinity).join('');
        const theKey = key || text;
        preamble.ensure(theKey, text);
    };
    return (
        <InlineStream>
            { children }
            <Collect>{ record }</Collect>
        </InlineStream>
    );
};

export const Document = ({ children, output }) => {
    const preamble = [];
    const preambleKeys = {};
    const compile = (chunks) => {
        const outputPath = path.resolve('public', output);
        setSource(outputPath, [preamble, chunks]);
    };
    const ensure = (key, text) => {
        if (!(key in preambleKeys)){
            preambleKeys[key] = true;
            preamble.push(text);
        }
    };
    return (
        <InlineStream><PreambleContext.Provider value={{ ensure }}>
            { children }
            <Collect>{ compile }</Collect>
        </PreambleContext.Provider></InlineStream>
    );
};

export const Macro = ({ tag, options, children }) => (
    <>
        <Chunk>{ `\\` }</Chunk>
        <Chunk>{ tag }</Chunk>
        { options && <><Chunk>{ `[` }</Chunk><Chunk>{ options }</Chunk><Chunk>{ `]` }</Chunk></> }
        { React.Children.map(children, (child) => {
            return <><Chunk>{ `{` }</Chunk><Chunk>{ child }</Chunk><Chunk>{ `}` }</Chunk></>;
        }) }
    </>
);

export const Environment = ({ tag, options, children }) => (
    <>
        <Chunk>{ `\\begin{` }</Chunk>
        <Chunk>{ tag }</Chunk>
        <Chunk>{ `}` }</Chunk>
        { options && <><Chunk>{ `[` }</Chunk><Chunk>{ options }</Chunk><Chunk>{ `]` }</Chunk></> }
        { children }
        <Chunk>{ `\\end{` }</Chunk>
        <Chunk>{ tag }</Chunk>
        <Chunk>{ `}` }</Chunk>
    </>
);

export const PreambleMacro = (props) => <Preamble key={props.tag}><Macro {...props} /></Preamble>

export const DocumentClass = (props) => <PreambleMacro tag="documentclass" {...props} />

export const UsePackage = (props) => <Preamble key={ `usepackage-${ React.Children.toArray(props.children)[0] }` }><Macro tag="usepackage" { ...props } /></Preamble>;