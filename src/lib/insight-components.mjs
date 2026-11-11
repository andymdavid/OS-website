function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function requireText(value, field) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Insight component requires a non-empty ${field}.`);
  }
  return value.trim();
}

function requireItems(value, type, minimum = 2, maximum = Infinity) {
  if (!Array.isArray(value) || value.length < minimum || value.length > maximum) {
    const range = maximum === Infinity ? `at least ${minimum}` : `${minimum} to ${maximum}`;
    throw new Error(`${type} requires ${range} items.`);
  }
  return value;
}

function requireNumber(value, field) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new Error(`${field} must be a non-negative number.`);
  }
  return value;
}

function parseSpec(source, kind) {
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(`Invalid ${kind} JSON: ${error.message}`);
  }
}

function renderVisualHeader(spec) {
  return `<header class="insight-visual__header"><h3 class="insight-visual__title">${escapeHtml(spec.title)}</h3></header>`;
}

function renderHeadlineStat(spec) {
  const items = requireItems(spec.items, 'headline-stat', 1, 3).map((item, index) => {
    const value = requireNumber(item.value, `headline-stat item ${index + 1} value`);
    const display = item.display ?? `${value}${spec.unit ?? ''}`;
    const label = requireText(item.label, `headline-stat item ${index + 1} label`);
    const detail = item.detail ? `<span class="insight-visual__stat-detail">${escapeHtml(item.detail)}</span>` : '';
    return `<li class="insight-visual__stat"><strong>${escapeHtml(display)}</strong><span>${escapeHtml(label)}</span>${detail}</li>`;
  }).join('');
  return `<ul class="insight-visual__stats">${items}</ul>`;
}

function renderRankedBars(spec) {
  const items = requireItems(spec.items, 'ranked-bars');
  const values = items.map((item, index) => requireNumber(item.value, `ranked-bars item ${index + 1} value`));
  const ceiling = spec.max === undefined ? Math.max(...values, 1) : requireNumber(spec.max, 'ranked-bars max');
  if (ceiling === 0 || values.some(value => value > ceiling)) throw new Error('ranked-bars max must be greater than or equal to every value.');

  const rows = items.map((item, index) => {
    const label = requireText(item.label, `ranked-bars item ${index + 1} label`);
    const display = item.display ?? `${values[index]}${spec.unit ?? ''}`;
    const size = (values[index] / ceiling) * 100;
    return `<li class="insight-visual__bar-row"><div class="insight-visual__bar-meta"><span>${escapeHtml(label)}</span><strong>${escapeHtml(display)}</strong></div><div class="insight-visual__bar-track"><span class="insight-visual__bar" style="--bar-size:${size.toFixed(4)}%"></span></div></li>`;
  }).join('');
  return `<ol class="insight-visual__bars">${rows}</ol>`;
}

function renderGroupedBars(spec) {
  const series = requireItems(spec.series, 'grouped-bars series', 2, 3).map((item, index) => ({
    key: requireText(item.key, `series ${index + 1} key`),
    label: requireText(item.label, `series ${index + 1} label`)
  }));
  const items = requireItems(spec.items, 'grouped-bars');
  const values = items.flatMap((item, itemIndex) => series.map(({ key }) => requireNumber(item.values?.[key], `grouped-bars item ${itemIndex + 1} ${key}`)));
  const ceiling = spec.max === undefined ? Math.max(...values, 1) : requireNumber(spec.max, 'grouped-bars max');
  if (ceiling === 0 || values.some(value => value > ceiling)) throw new Error('grouped-bars max must be greater than or equal to every value.');

  const legend = series.map((item, index) => `<li><span class="insight-visual__swatch" data-series="${index + 1}"></span>${escapeHtml(item.label)}</li>`).join('');
  const groups = items.map((item, itemIndex) => {
    const label = requireText(item.label, `grouped-bars item ${itemIndex + 1} label`);
    const bars = series.map((seriesItem, seriesIndex) => {
      const value = item.values[seriesItem.key];
      const display = item.display?.[seriesItem.key] ?? `${value}${spec.unit ?? ''}`;
      const size = (value / ceiling) * 100;
      return `<div class="insight-visual__group-bar"><span class="insight-visual__bar" data-series="${seriesIndex + 1}" style="--bar-size:${size.toFixed(4)}%"></span><strong>${escapeHtml(display)}</strong><span class="sr-only">${escapeHtml(seriesItem.label)}</span></div>`;
    }).join('');
    return `<li class="insight-visual__bar-group"><span class="insight-visual__group-label">${escapeHtml(label)}</span><div class="insight-visual__group-bars">${bars}</div></li>`;
  }).join('');
  return `<ul class="insight-visual__legend">${legend}</ul><ol class="insight-visual__grouped-bars">${groups}</ol>`;
}

function renderStackedBars(spec) {
  const series = requireItems(spec.series, 'stacked-bars series', 2, 5).map((item, index) => ({
    key: requireText(item.key, `series ${index + 1} key`),
    label: requireText(item.label, `series ${index + 1} label`)
  }));
  const items = requireItems(spec.items, 'stacked-bars');
  const legend = series.map((item, index) => `<li><span class="insight-visual__swatch" data-series="${index + 1}"></span>${escapeHtml(item.label)}</li>`).join('');
  const rows = items.map((item, itemIndex) => {
    const label = requireText(item.label, `stacked-bars item ${itemIndex + 1} label`);
    const values = series.map(({ key }) => requireNumber(item.values?.[key], `stacked-bars item ${itemIndex + 1} ${key}`));
    const total = values.reduce((sum, value) => sum + value, 0);
    if (total <= 0) throw new Error(`stacked-bars item ${itemIndex + 1} total must be greater than zero.`);
    const segments = series.map((seriesItem, seriesIndex) => {
      const value = values[seriesIndex];
      const size = (value / total) * 100;
      const display = item.display?.[seriesItem.key] ?? `${value}${spec.unit ?? ''}`;
      return `<span class="insight-visual__segment" data-series="${seriesIndex + 1}" style="--segment-size:${size.toFixed(4)}%"><span>${escapeHtml(display)}</span><span class="sr-only"> ${escapeHtml(seriesItem.label)}</span></span>`;
    }).join('');
    return `<li class="insight-visual__stack-row"><span class="insight-visual__group-label">${escapeHtml(label)}</span><div class="insight-visual__stack">${segments}</div></li>`;
  }).join('');
  return `<ul class="insight-visual__legend">${legend}</ul><ol class="insight-visual__stacks">${rows}</ol>`;
}

function renderMatrix(spec) {
  const items = requireItems(spec.items, 'matrix', 4, 4).map((item, index) => {
    const title = requireText(item.title, `matrix item ${index + 1} title`);
    const description = item.description ? `<p>${escapeHtml(item.description)}</p>` : '';
    return `<section class="insight-visual__quadrant" data-quadrant="${index + 1}"><h4>${escapeHtml(title)}</h4>${description}</section>`;
  }).join('');
  const xAxis = requireText(spec.xAxis, 'matrix xAxis');
  const yAxis = requireText(spec.yAxis, 'matrix yAxis');
  return `<div class="insight-visual__matrix-wrap"><p class="insight-visual__axis insight-visual__axis--y">${escapeHtml(yAxis)}</p><div class="insight-visual__matrix">${items}</div><p class="insight-visual__axis insight-visual__axis--x">${escapeHtml(xAxis)}</p></div>`;
}

const visualRenderers = {
  'headline-stat': renderHeadlineStat,
  'ranked-bars': renderRankedBars,
  'grouped-bars': renderGroupedBars,
  'stacked-bars': renderStackedBars,
  matrix: renderMatrix
};

export function renderInsightVisual(source) {
  const spec = parseSpec(source, 'insight-visual');
  const type = requireText(spec.type, 'type');
  const title = requireText(spec.title, 'title');
  if (title.length > 90) throw new Error('Insight visual title must be 90 characters or fewer.');
  if (spec.label || spec.eyebrow || spec.summary) {
    throw new Error('Insight visuals use one direct title. Move labels, eyebrows, and summaries into the surrounding article.');
  }
  const renderBody = visualRenderers[type];
  if (!renderBody) throw new Error(`Unsupported insight visual type "${type}". Use headline-stat, ranked-bars, grouped-bars, stacked-bars, or matrix.`);

  const isDataVisual = ['headline-stat', 'ranked-bars', 'grouped-bars', 'stacked-bars'].includes(type);
  if (isDataVisual && !spec.source) throw new Error(`${type} requires a source.`);
  const sourceLine = spec.source ? `<p class="insight-visual__source">Source: ${escapeHtml(spec.source)}</p>` : '';
  if (spec.caption) throw new Error('Insight visuals do not use internal captions. Move the explanation into the surrounding article.');
  return `<figure class="insight-visual insight-visual--${type}" aria-label="${escapeHtml(title)}">${renderVisualHeader({ ...spec, title })}<div class="insight-visual__body">${renderBody(spec)}</div>${sourceLine}</figure>\n`;
}

function renderPracticeModule(spec) {
  const intro = spec.intro ? `<p class="insight-module__intro">${escapeHtml(spec.intro)}</p>` : '';
  const items = requireItems(spec.items, 'practice module', 1, 6).map(item => `<li>${escapeHtml(item)}</li>`).join('');
  return `${intro}<ul class="insight-module__list">${items}</ul>`;
}

function renderTakeawaysModule(spec) {
  const items = requireItems(spec.items, 'takeaways module', 2, 5).map((item, index) => {
    const title = requireText(item.title, `takeaway ${index + 1} title`);
    const body = item.body ? `<p>${escapeHtml(item.body)}</p>` : '';
    return `<li><span>${String(index + 1).padStart(2, '0')}</span><div><h4>${escapeHtml(title)}</h4>${body}</div></li>`;
  }).join('');
  return `<ol class="insight-module__takeaways">${items}</ol>`;
}

const moduleRenderers = { practice: renderPracticeModule, takeaways: renderTakeawaysModule };

export function renderInsightModule(source) {
  const spec = parseSpec(source, 'insight-module');
  const type = requireText(spec.type, 'module type');
  const title = requireText(spec.title, 'module title');
  const renderBody = moduleRenderers[type];
  if (!renderBody) throw new Error(`Unsupported insight module type "${type}". Use practice or takeaways.`);
  const label = spec.label ? `<p class="insight-module__label">${escapeHtml(spec.label)}</p>` : '';
  return `<aside class="insight-module insight-module--${type}" aria-label="${escapeHtml(title)}"><header>${label}<h3>${escapeHtml(title)}</h3></header><div class="insight-module__body">${renderBody(spec)}</div></aside>\n`;
}
