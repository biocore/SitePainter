.. _doc_install:
.. SitePainter documentation master file, created by Antonio Gonzalez Pena
   sphinx-quickstart on Mon Jan 25 12:57:02 2010.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. index:: Installing SitePainter

======================
Installing SitePainter
======================

SitePainter is a desktop application that runs in `Firefox <http://www.mozilla.org/firefox/>`_ >= 4.0.0 but we recommend using the latest stable version. Download the `SitePainter <http://sourceforge.net/projects/sitepainter/files/releases/sitepainter_1.0.zip/download>`_ release package, unzip the downloaded file and open the index.html file inside the new created folder (make sure that you are using Firefox!).

Dependencies required for all features of SitePainter
-----------------------------------------------------

* Firefox (`link <http://www.mozilla.org/firefox/>`_)
* jre1.5.0 (`link <http://java.sun.com/javase/downloads/index.jsp>`_)

Stable Pre-Release
^^^^^^^^^^^^^^^^^^
Currently the most stable version of SitePainter is our 1.0 release, which you can download from `here <http://sourceforge.net/projects/sitepainter/files/releases/sitepainter_1.0.zip/download>`_.

Latest Development Version
^^^^^^^^^^^^^^^^^^^^^^^^^^
To get the latest development version of SitePainter, you should check it out of our Sourceforge repository. While this code is subject to changes in interface and hasn't been as extensively tested as the release version, it will provide access to the latest and greatest SitePainter features. The official web documentation is likely to be out-of-date with respect to the development software. Check out the latest version of SitePainter using svn with the commands::

	svn co https://sitepainter.svn.sourceforge.net/svnroot/sitepainter/ sitepainter

svn users should periodically update SitePainter by using the following command::

	svn update sitepainter


Building The SitePainter Documentation
----------------------------------------

.. _build-SitePainter-docs:

If you are using the svn version of SitePainter, you may want to build the documentation locally for access to the latest version. You can change to the ``sitepainter/doc_source`` directory and run::

	make html
	
We try to update the documentation as we update the code, but svn users may notice some discrepancies. After building the documentation, you can view it in a web browser by opening the file ``sitepainter/doc_source/_build/html/index.html``. You may want to bookmark that page for easy access. 
