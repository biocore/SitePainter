#!/bin/bash -e
#
# __author__ = "Antonio Gonzalez Pena"
# __copyright__ = "Copyright 2013, SitePainter"
# __credits__ = ["Antonio Gonzalez Pena", "Yoshiki Vazquez Baeza"]
# __license__ = "GPL"
# __version__ = "1.1.0-dev"
# __maintainer__ = "Antonio Gonzalez Pena"
# __email__ = "antgonza@gmail.com"
# __status__ = "Development"
#

version=1.1

if [[ "$(git status --porcelain | wc -l | awk '{print $1}')" != "0" ]]; then
	# make sure we only move forward if everything is staged
	echo "The repository is not clean, not continuing!"
	exit
fi

echo "Creating sitepainter_$version.zip"
git archive --format zip --output ${PWD}/sitepainter_${version}.zip master

# move the archived files to your home
mv ${PWD}/sitepainter_${version}.zip ${HOME}/
zip sitepainter_example_files.zip files && mv sitepainter_example_files.zip ~/

# add the tag to the current version
git tag -a ${version} -m "${version}"

echo ""
echo ""
echo "*****************************"
echo "Do not forget to change: doc_source/install/index.rst to point to the new release file"
echo "Upload ~/sitepainter_$version.zip & ~/SitePainter_example_files.zip to files/"
echo "And push the new tag using git push --tag upstream"
