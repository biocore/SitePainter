SitePainter
===========

A tool for exploring biogeographical patterns. Go to the [website](http://github.com/biocore/SitePainter).

-------------

Working with a QIIME-compliant metadata mapping file

The metadata file can contain any kind of numeric data in the following format:

- Tab delimited text file.
- First row are headers (the options that will appear in the drop-down menu).
- First column are sites/paths names (paths/elments in the SVG file).
- The rest should be valid numeric values.

Notes:

- It accepts empty spaces that will be considered as NaNs and not used to color.
- Every line that starts either with "#", "%", "eigenval" (without ") will be consider comments.
