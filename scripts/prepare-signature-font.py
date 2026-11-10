"""Subset the original OFL-licensed Caveat font for the fixed founder signature.
Requires fonttools[woff]. Run from the repository root; source and licence stay
in public/fonts/google. Only this fixed signature uses the new family.
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

font = TTFont('public/fonts/google/caveat-latin.woff2')
instantiateVariableFont(font, {'wght': 500}, inplace=True)
options = subset.Options()
options.flavor = 'woff2'
worker = subset.Subsetter(options=options)
worker.populate(text='Pete & Andy')
worker.subset(font)
font.recalcTimestamp = False
font.flavor = 'woff2'
output = Path('src/assets/caveat-signature.woff2')
font.save(output)
print(f'{output}: {output.stat().st_size} bytes')
