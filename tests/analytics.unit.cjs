const { test } = require('node:test');
const assert = require('node:assert/strict');
const { event, activeClock } = require('../analytics.js');
test('strict contract drops private text, URLs and invented events', () => {
  const e = event('style_view', { style_id: 'bauhaus', note: 'private', query: 'private', action: 'https://private', value: NaN, surface: 'ios' });
  assert.equal(e.name, 'atlas_v1_style_view');
  assert.deepEqual(e.parameters, { style_id: 'bauhaus', content_id: 'bauhaus', content_type: 'art_style', surface: 'h5', schema_version: 1, site_id: 'site-style-atlas' });
  assert.equal(event('revenue', { value: 100 }), null);
  assert.equal(event('screen', {}, 'ios').parameters.surface, 'ios');
});
test('incremental clock excludes background, idle and long throttled ticks', () => {
  const c = activeClock();
  assert.equal(c.sample(0, true), 0);
  assert.equal(c.sample(30000, true), 30);
  assert.equal(c.sample(60000, true), 30);
  assert.equal(c.sample(90000, false), 0);
  assert.equal(c.sample(120000, true), 0);
  assert.equal(c.sample(220000, true), 0);
  c.reset(); assert.equal(c.sample(230000, true), 0);
});
