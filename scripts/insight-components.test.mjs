import test from 'node:test';
import assert from 'node:assert/strict';
import { renderInsightModule, renderInsightVisual } from '../src/lib/insight-components.mjs';

const fixtures = [
  { type: 'headline-stat', title: 'Headline', unit: '%', items: [{ value: 87, label: 'Supported' }], source: 'Survey' },
  { type: 'ranked-bars', title: 'Ranking', items: [{ label: 'One', value: 70 }, { label: 'Two', value: 30 }], source: 'Survey' },
  { type: 'grouped-bars', title: 'Change', series: [{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }], items: [{ label: 'One', values: { a: 20, b: 40 } }, { label: 'Two', values: { a: 30, b: 50 } }], source: 'Survey' },
  { type: 'stacked-bars', title: 'Composition', series: [{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }], items: [{ label: 'One', values: { a: 20, b: 80 } }, { label: 'Two', values: { a: 40, b: 60 } }], source: 'Survey' },
  { type: 'matrix', title: 'Matrix', xAxis: 'Exposure', yAxis: 'Impact', items: [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }, { title: 'Four' }] }
];

test('renders every approved visual type', () => {
  for (const fixture of fixtures) {
    const html = renderInsightVisual(JSON.stringify(fixture));
    assert.match(html, new RegExp(`insight-visual--${fixture.type}`));
    assert.match(html, new RegExp(`>${fixture.title}<`));
  }
});

test('calculates safe numeric proportions', () => {
  const ranked = renderInsightVisual(JSON.stringify(fixtures[1]));
  assert.match(ranked, /--bar-size:100\.0000%/);
  assert.match(ranked, /--bar-size:42\.8571%/);

  const stacked = renderInsightVisual(JSON.stringify(fixtures[3]));
  assert.match(stacked, /--segment-size:20\.0000%/);
  assert.match(stacked, /--segment-size:80\.0000%/);
});

test('renders editorial modules separately from figures', () => {
  const practice = renderInsightModule(JSON.stringify({ type: 'practice', title: 'In practice', items: ['One'] }));
  const takeaways = renderInsightModule(JSON.stringify({ type: 'takeaways', title: 'Takeaways', items: [{ title: 'One' }, { title: 'Two' }] }));
  assert.match(practice, /<aside class="insight-module insight-module--practice"/);
  assert.match(takeaways, /insight-module--takeaways/);
  assert.doesNotMatch(practice, /insight-visual/);
});

test('escapes authored text', () => {
  const html = renderInsightVisual(JSON.stringify({
    type: 'headline-stat',
    title: '<script>alert(1)</script>',
    items: [{ value: 1, label: '<strong>One</strong>' }],
    source: 'Survey'
  }));
  assert.doesNotMatch(html, /<script>|<strong>One/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&lt;strong&gt;/);
});

test('rejects generic, malformed and unsourced graphics', () => {
  assert.throws(() => renderInsightVisual('{'), /Invalid insight-visual JSON/);
  for (const type of ['metrics', 'process', 'comparison', 'decision-flow', 'layers']) {
    assert.throws(() => renderInsightVisual(JSON.stringify({ type, title: 'Legacy' })), /Unsupported insight visual type/);
  }
  assert.throws(() => renderInsightVisual(JSON.stringify({ type: 'ranked-bars', title: 'No source', items: [{ label: 'One', value: 1 }, { label: 'Two', value: 2 }] })), /requires a source/);
  assert.throws(() => renderInsightVisual(JSON.stringify({ type: 'ranked-bars', title: 'Bad value', source: 'Survey', items: [{ label: 'One', value: '1' }, { label: 'Two', value: 2 }] })), /must be a non-negative number/);
  for (const field of ['label', 'eyebrow', 'summary']) {
    assert.throws(() => renderInsightVisual(JSON.stringify({ ...fixtures[0], [field]: 'Extra heading' })), /one direct title/);
  }
  assert.throws(() => renderInsightVisual(JSON.stringify({ ...fixtures[0], caption: 'Internal explanation' })), /do not use internal captions/);
});
