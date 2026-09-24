import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareCountry, editUrl } from '../bucketlist/publish.mjs';
const available = new Set(['US', 'CL', 'SG', 'CA']);
const file = codes => ({ ok:true, json:async()=>({content:btoa(JSON.stringify(codes))}) });
test('prepares latest countries without write requests or credentials',async()=>{
  let calls=0;
  const result=await prepareCountry('CA',available,async(url,options)=>{
    calls++; assert.equal(options.method,undefined); assert.equal(options.headers.Authorization,undefined);
    return file(['US','CL','SG']);
  });
  assert.equal(calls,1); assert.deepEqual(JSON.parse(result.content),['CA','CL','SG','US']);
  assert.equal(result.alreadyVisited,false); assert.ok(editUrl.endsWith('/edit/main/bucketlist/visited-countries.json'));
});
test('detects a country already added on another device',async()=>{
 const result=await prepareCountry('US',available,async()=>file(['US']));
 assert.equal(result.alreadyVisited,true); assert.deepEqual(JSON.parse(result.content),['US']);
});
test('invalid selection, malformed data and failed reads do not produce drafts',async()=>{
 await assert.rejects(prepareCountry('XX',available,async()=>assert.fail()));
 await assert.rejects(prepareCountry('CA',available,async()=>file(['XX'])));
 await assert.rejects(prepareCountry('CA',available,async()=>({ok:false})));
});
