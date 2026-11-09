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
        options.flavor = 'woff2'
        worker = subset.Subsetter(options=options)
        worker.populate(unicodes=points)
        worker.subset(font)
    font.recalcTimestamp = False
    font.flavor = 'woff2'
    destination = out / Path(source).name
    font.save(destination)
    print(Path(source).name, Path('public' + source).stat().st_size, '->', destination.stat().st_size)
