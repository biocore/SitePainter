SitePainter: A tool for exploring biogeographical patterns

/*
 * __author__ = "Antonio Gonzalez Pena"
 * __copyright__ = "Copyright 2010, Site Painter"
 * __credits__ = ["Antonio Gonzalez Pena"]
 * __license__ = "GPL"
 * __version__ = "0.9"
 * __maintainer__ = "Antonio Gonzalez Pena"
 * __email__ = "antoniog@colorado.edu"
 * __status__ = "Release"
 *
 */

The main components/files of SitePainter are:
- README: 
  This file

- index.html: 
  Main page for the tool. Regular users should only access this page.

- site_painter/: 
  Main libraries folder for SitePainter: 
   - jQuery: http://jquery.com/
   - jPicker: http://www.digitalmagicpro.com/jPicker/
   - jeditable: http://www.appelsiini.net/projects/jeditable
   - tablesorter: http://tablesorter.com/
   - filereader: https://github.com/bgrins/filereader.js

- svg-edit/: 
  http://code.google.com/p/svg-edit/

- images/:
  Folder that has the images for this project


Working with a metadata file

The metadata file can contain any kind of numeric data in the following format:
- Tab delimited text file
- First row are headers (the options that will appear in the drop-down menu)
- First column are sites/paths names (paths/elments in the svg image)
- The rest should be valid numeric values

Notes:
- It accepts empty spaces that will be considered as NaNs and not used to color
- Every line that starts either with "#", "%", "eigenval" (without ") will be consider comments