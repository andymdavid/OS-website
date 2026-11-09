"""Prepare WOFF2 delivery subsets without changing the declared Unicode coverage.
Requires fonttools[woff] (FontTools and Brotli). Original licensed sources remain.
"""
from pathlib import Path
import re
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

css = Path('src/fonts.css').read_text()
out = Path('public/fonts/delivery')
out.mkdir(parents=True, exist_ok=True)
latin_points = set()
for face in re.findall(r'@font-face\s*\{[^}]+\}', css):
    source = re.search(r'url\(([^)]+)\)', face).group(1)
    font = TTFont('public' + source)
    weights = re.search(r'font-weight:\s*(\d+)(?:\s+(\d+))?', face)
    if 'fvar' in font and weights:
        low, high = int(weights[1]), int(weights[2] or weights[1])
        instantiateVariableFont(font, {'wght': low if low == high else (low, high)}, inplace=True)
    if 'gvar' in font:
        for glyph in font.getGlyphOrder():
            try:
                font['gvar'].variations[glyph]
            except KeyError:
                font['gvar'].variations[glyph] = []
    points = set()
    ranges = re.search(r'unicode-range:\s*([^;]+)', face)
    if ranges:
        for start, end in re.findall(r'U\+([0-9A-F]+)(?:-([0-9A-F]+))?', ranges[1]):
            points.update(range(int(start, 16), int(end or start, 16) + 1))
        options = subset.Options()
        latin_points.update(points)
        options.flavor = 'woff2'
        worker = subset.Subsetter(options=options)
        worker.populate(unicodes=points)
        worker.subset(font)
    font.recalcTimestamp = False
    font.flavor = 'woff2'
    destination = out / Path(source).name
    font.save(destination)
    print(Path(source).name, Path('public' + source).stat().st_size, '->', destination.stat().st_size)

# Keep original brand fonts for characters outside the common Latin subset.
# The delivery generator emits disjoint unicode ranges for subset and fallback.
def unicode_ranges(points):
    result = []
    for point in sorted(points):
        if result and point == result[-1][1] + 1:
            result[-1][1] = point
        else:
            result.append([point, point])
    return ', '.join(f'U+{a:04X}' + (f'-{b:04X}' if a != b else '') for a, b in result)

import json
coverage = {}
brand_points = latin_points | set(range(0x2190, 0x2200))
for name in ['Alfabet-Regular', 'Alfabet-Black']:
    font = TTFont(f'public/fonts/{name}.woff2')
    original_points = set(font.getBestCmap())
    options = subset.Options()
    options.flavor = 'woff2'
    worker = subset.Subsetter(options=options)
    worker.populate(unicodes=brand_points)
    worker.subset(font)
    font.recalcTimestamp = False
    font.flavor = 'woff2'
    destination = out / f'{name}.woff2'
    font.save(destination)
    coverage[name] = {'latin': unicode_ranges(original_points & brand_points), 'fallback': unicode_ranges(original_points - brand_points)}
    print(name, Path(f'public/fonts/{name}.woff2').stat().st_size, '->', destination.stat().st_size)
(out / 'brand-coverage.json').write_text(json.dumps(coverage, indent=2) + '\n')
