import { createRequire } from 'module';
import http from 'http'; import fs from 'fs'; import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require('/Users/thomasfuhriman/code/crate-digger/node_modules/playwright');
const ROOT='/Users/thomasfuhriman/code/portfolio', PORT=48123;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0].split('#')[0]);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end();}r.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);}).listen(PORT);
const base=`http://127.0.0.1:${PORT}`;
const fails=[];const chk=(c,m)=>{if(!c)fails.push(m);console.log('  ',c?'ok':'NO',m);};
const b=await chromium.launch();
for(const w of [1280,390]){
  console.log('width',w);
  const ctx=await b.newContext({viewport:{width:w,height:800},reducedMotion:'no-preference'});
  const pg=await ctx.newPage();const errs=[];
  pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});pg.on('pageerror',e=>errs.push(String(e)));
  await pg.goto(base+'/index.html');
  const hscroll=()=>pg.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);
  // sim
  await pg.locator('#sim-out').scrollIntoViewIfNeeded();
  await pg.waitForFunction(()=>document.getElementById('sim-out').textContent.includes('only show the crate you are on'),null,{timeout:8000});
  chk(true,`${w} sim plays real run first`);
  await pg.waitForFunction(()=>document.getElementById('sim-out').textContent.includes('[pilot]'),null,{timeout:25000});
  chk(await pg.textContent('#sim-dir')==='~/frisson',`${w} sim dir ~/frisson`);
  await pg.click('#sim-replay');
  await pg.waitForFunction(()=>document.getElementById('sim-out').textContent.includes('add dark mode toggle'),null,{timeout:8000}).then(()=>chk(true,`${w} run again moves to next run`),()=>chk(false,`${w} run again moves to next`));
  chk(!(await hscroll()),`${w} index no horizontal scroll`);
  // disclosure
  const sum=pg.locator('details.harbor > summary');
  await sum.scrollIntoViewIfNeeded();
  chk(!(await pg.evaluate(()=>document.querySelector('details.harbor').open)),`${w} closed initially`);
  await sum.click();
  chk(await pg.evaluate(()=>document.querySelector('details.harbor').open),`${w} summary click opens`);
  chk(await pg.locator('details.harbor .harbor__body').isVisible(),`${w} body visible`);
  chk(!(await hscroll()),`${w} index no hscroll with disclosure open`);
  await Promise.all([pg.waitForURL(/shipyard\.html#harbor$/),pg.click('details.harbor a')]);
  await pg.waitForTimeout(800);
  const r=await pg.evaluate(()=>{const e=document.getElementById('harbor').getBoundingClientRect();return {t:e.top,b:e.bottom,h:innerHeight}});
  chk(r.t<r.h&&r.b>0&&r.t>=-2,`${w} #harbor in view top=${Math.round(r.t)}`);
  await pg.waitForSelector('#app *',{timeout:5000});
  await pg.waitForTimeout(500);
  const txt=await pg.evaluate(()=>document.body.innerText);
  chk(/AC12/.test(txt),`${w} report lists AC12`);
  chk(/shipped/i.test(txt),`${w} report renders verdict`);
  chk(!(await hscroll()),`${w} shipyard.html no hscroll (sw=${await pg.evaluate(()=>document.documentElement.scrollWidth)})`);
  chk(errs.length===0,`${w} no console errors ${JSON.stringify(errs)}`);
  await ctx.close();
}
await b.close();srv.close();
console.log(fails.length?'FAIL AC8':'PASS AC8');
