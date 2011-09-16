version=0.9

echo "Creating ~/sitepainter_$version.zip"
svn export . ~/sitepainter_$version
zip -r ~/sitepainter_$version.zip ~/sitepainter_$version

echo "Creating ~/SitePainter_example_files.zip"
svn export files ~/SitePainter_example_files
zip -r ~/SitePainter_example_files.zip ~/SitePainter_example_files


echo "Upload ~/sitepainter_$version.zip &~/SitePainter_example_files.zip to files/"