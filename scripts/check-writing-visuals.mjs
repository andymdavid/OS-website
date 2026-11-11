import assert from 'node:assert/strict';
import {readWritingPosts,renderMarkdown} from '../src/lib/writing-source.mjs';
const spec={type:'ranked-bars',title:'Payback sensitivity',unit:' months',max:7,source:'Hypothetical example',items:[{label:'Base',value:4},{label:'Sensitivity',value:6000/900,display:'6.7 months'}]};
const html=renderMarkdown('Before\n```insight-visual\n'+JSON.stringify(spec)+'\n```\nAfter');assert(html.includes('<p>Before</p>'));assert(html.includes('insight-visual--ranked-bars'));assert(html.includes('--bar-size:57.1429%'));assert(html.includes('--bar-size:95.2381%'));assert(html.includes('<p>After</p>'));
assert.throws(()=>renderMarkdown('```insight-visual\n{}'),/Unclosed/);
assert.throws(()=>renderMarkdown('```insight-visual\nnot JSON\n```'),/Invalid/);
assert.throws(()=>renderMarkdown('```insight-visual\n'+JSON.stringify({...spec,source:''})+'\n```'),/requires a source/);
const posts=readWritingPosts();const count=posts.reduce((n,p)=>n+(p.html.match(/class="insight-visual insight-visual--/g)||[]).length+(p.html.match(/class="insight-module insight-module--/g)||[]).length,0);assert.equal(count,6);assert(posts.every(p=>!p.html.includes('```insight-')));
console.log('Six article components, exact payback proportions, fenced-block integration and invalid/unsourced spec rejection pass.');
