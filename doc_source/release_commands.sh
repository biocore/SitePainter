version=1.0

echo "Creating ~/sitepainter_$version.zip"
svn export ../ ~/sitepainter_$version

echo "Creating ~/SitePainter_example_files.zip"
svn export files ~/SitePainter_example_files

cd ~/
zip -r sitepainter_$version.zip sitepainter_$version
zip -r SitePainter_example_files.zip SitePainter_example_files

echo ""
echo ""
echo "*****************************"
echo "Do not forget to change: doc_source/install/index.rst to point to the new release file"
echo "Upload ~/sitepainter_$version.zip & ~/SitePainter_example_files.zip to files/"
