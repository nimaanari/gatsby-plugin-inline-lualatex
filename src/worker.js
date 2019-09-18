import compile from 'netlify-lualatex';
import path from 'path';
import fs from 'fs-extra';

const init = () => {
    return async ([outputPath, chunks]) => {
        const source = chunks.flat(Infinity).join('');
        if (path.extname(outputPath)=='.pdf'){
            await compile(source, outputPath);
        }
        else{
            await fs.writeFile(outputPath, source);
        }
    }
}

export default init