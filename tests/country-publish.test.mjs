import test from 'node:test';
import assert from 'node:assert/strict';
import { publishCountry } from '../bucketlist/publish.mjs';
const available = new Set(['US', 'CL', 'SG', 'CA']);
const response = (data, status = 200) => ({ ok: status === 200, status, json: async () => data });
const file = codes => ({ content: btoa(JSON.stringify(codes)), sha: 'latest-sha' });
test('merges the latest repository countries and uses its SHA', async () => {
  const calls = [];
  const result = await publishCountry('CA', 'test-only', available, async (url, options) => {
    calls.push({url, options});
    return response(calls.length === 1 ? file(['US', 'CL', 'SG']) : {});
  });
  const body = JSON.parse(calls[1].options.body);
  assert.deepEqual(JSON.parse(atob(body.content)), ['CA','CL','SG','US']);
  assert.equal(body.sha, 'latest-sha');
  assert.equal(body.branch, 'main');
  assert.equal(result.added, true);
  assert.ok(calls.every(call => call.url.startsWith('https://api.github.com/')));
});
test('retry of an already-saved country creates no duplicate commit', async () => {
  let count = 0;
  const result = await publishCountry('US', 'test-only', available, async () => { count++; return response(file(['US'])); });
  assert.equal(count, 1); assert.equal(result.added, false);
});
test('conflicts and invalid credentials are reported without retrying writes', async () => {
  for (const status of [401,403,409]) {
    let count = 0;
    await assert.rejects(publishCountry('CA','test-only',available,async () => {
      count++; return count === 1 ? response(file(['US'])) : response({},status);
    }));
    assert.equal(count,2);
  }
});
test('invalid selection and malformed repository data cannot be published', async () => {
  await assert.rejects(publishCountry('XX','test-only',available,async () => assert.fail('No request expected')));
  let count = 0;
  await assert.rejects(publishCountry('CA','test-only',available,async () => {count++;return response(file(['XX']));}));
  assert.equal(count,1);
});
