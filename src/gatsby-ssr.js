import { flushSources } from './source-store';
import path from 'path';
import rpc from 'sync-rpc';

const client = rpc(path.resolve(process.env.GATSBY_SSR_DIRNAME, 'worker.js'));

export const onRenderBody = ({ pathname }) => {
    const cwd = process.cwd();
    for (const entry of Object.entries(flushSources())) {
        client(entry);
    }
}