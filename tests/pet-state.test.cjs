const test = require('node:test');
const assert = require('node:assert/strict');
require('../pet/state.js');
const { normalize, advance, act } = globalThis.PuffsCare;
const now = 1_000_000;

test('migrates the existing pet without losing its name, birthday or needs', () => {
  const pet = normalize({name:'Puffs', born:500, fullness:42, happiness:61, lastUpdate:now}, now);
  assert.equal(pet.name, 'Puffs'); assert.equal(pet.born, 500);
  assert.equal(pet.fullness, 42); assert.equal(pet.happiness,61); assert.equal(pet.energy,80);
});
test('a long absence has bounded decay and no negative needs', () => {
  const pet = advance({name:'Puffs',born:0,lastUpdate:0,fullness:80,happiness:70,energy:80}, 86400000 * 30);
  assert.equal(pet.fullness,65.6); assert.equal(pet.happiness,62.8); assert.equal(pet.energy,60.8);
  assert.equal(advance({lastUpdate:0,fullness:16},86400000).fullness,15);
});
test('nap survives serialization and restores energy exactly once over elapsed time', () => {
  const nap = act({lastUpdate:now,energy:20},'sleep',now);
  const halfway = advance(JSON.parse(JSON.stringify(nap)),now+30000);
  assert.equal(halfway.energy,35); assert.equal(halfway.sleepUntil,now+60000);
  const finished = advance(halfway,now+60000);
  assert.equal(finished.energy,50); assert.equal(finished.sleepUntil,0);
  assert.equal(advance(finished,now+60000).energy,50);
});
test('sleep blocks care, early wake retains earned energy, and actions stay bounded', () => {
  const nap = act({lastUpdate:now,energy:20,fullness:50},'sleep',now);
  assert.equal(act(nap,'feed',now).fullness,50);
  const awake = act(nap,'wake',now+10000);
  assert.equal(awake.energy,25); assert.equal(awake.sleepUntil,0);
  assert.equal(act({lastUpdate:now,fullness:98},'feed',now).fullness,100);
  assert.equal(act({lastUpdate:now,energy:5,happiness:20},'play',now).happiness,20);
});
test('malformed stored values cannot produce invalid stats or break names', () => {
  const pet=normalize({name:'<b>Puffs</b>',fullness:'NaN',happiness:-8,energy:Infinity,born:Infinity},now);
  assert.equal(pet.name,'<b>Puffs</b>'); assert.equal(pet.fullness,80); assert.equal(pet.happiness,0); assert.equal(pet.energy,80); assert.equal(pet.born,now);
});
