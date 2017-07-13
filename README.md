# compare-typefaces

https://source-foundry.github.io/compare-typefaces/index.html

This tool, _intended for developers of typefaces for source code_, lets you quickly compare commonly confused sets of glyphs between a wide selection of typefaces. Consider the following scenario:

A distraught user reports an issue where the apparent confusion between a capital `O` and the number zero `0` almost cost a patient in a hospital his life. Obviously, you take this complaint very seriously, and immediately fire up this tool to see what's what.

- You use the character presets to choose the characters commonly confused with the number zero. In source code, there are a few other commonly used glyphs that look similar.
- You set the variants to include all, because your user wasn't specific about which variant was used.
- You select four sizes. Again, your user wasn't specific, though this should cover your testcase appropriately.
- You start out with a high contrast theme.
- You notice that while the `O` and `0` look distinct due to the added element to the zero, the general obloid shape of the glyph is exactly the same.
- You notice that this approach is fairly regular in other typefaces as well, but a few have opted for an approach where the general dimensions of numbers do not use the same virtual box as the capitals do in your font.
- From the character presets you select both the capitals and numbers, and notice that your font looks aesthetically more pleasing, but the numbers do tend to somewhat blend in in strings of capitals.
- You contact the user with your findings, and start working towards a better design.
- The world becomes a slightly better place.

## Features

TODO
