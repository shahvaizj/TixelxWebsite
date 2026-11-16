import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('.', import.meta.url));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml'};
createServer(async (req,res) => {
  try { const requestPath=decodeURIComponent(req.url.split('?')[0]).replace(/^[/\\]+/,''); let path=normalize(join(root,requestPath)); if ((await stat(path)).isDirectory()) path=join(path,'index.html'); const data=await readFile(path); res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'}); res.end(data); }
  catch { res.writeHead(404,{'Content-Type':'text/plain'}); res.end('Not found'); }
}).listen(4174,'127.0.0.1',()=>console.log('Tixelx Studio: http://127.0.0.1:4174'));
