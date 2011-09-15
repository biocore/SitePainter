.. _doc_install:
.. BoulderALE documentation master file, created by Jesse Stombaugh
   sphinx-quickstart on Mon Jan 25 12:57:02 2010.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. index:: Installing BoulderALE

================================
Installing BoulderALE natively
================================

BoulderALE is a web application based on Python Server Pages (PSP), and it is recommended that users use the `BoulderALE <http://microbio.me/boulderale>`_ website. The procedure for installing BoulderALE natively can be tedious, however; we do make the source code publicly available so users can install it natively.

Dependencies required for all features of BoulderALE
-----------------------------------------------------

* Apache/ModPython 3.3 (`link <http://www.modpython.org/>`_)
* jre1.6.0_05 (`link <http://java.sun.com/javase/downloads/index.jsp>`_)
* Python 2.6 (`src <http://www.python.org/ftp/python/2.6.4/Python-2.6.4.tgz>`_)
* Development version of PyCogent (> 1.4.1) (`src <http://pycogent.sourceforge.net/install.html>`_)
* Numpy 1.3.0 (`src <http://sourceforge.net/projects/numpy/files/NumPy/1.3.0/numpy-1.3.0.tar.gz/download>`_)
* Kinemage Scripts (`src <http://www.microbio.me/boulderale/kinemage_scripts.zip>`_)

If you plan to build the BoulderALE documentation locally:

* Sphinx 1.0.4 (`src <http://pypi.python.org/pypi/Sphinx>`_) See :ref:`Building the BoulderALE documentation <build-BoulderALE-docs>`


Stable Pre-Release
^^^^^^^^^^^^^^^^^^
Currently the most stable version of BoulderALE is our 1.0.0 release, which you can download from `here <http://sourceforge.net/projects/boulderale/files/releases/BoulderALE-1.0.0.tar.gz/download>`_.

Latest Development Version
^^^^^^^^^^^^^^^^^^^^^^^^^^
To get the latest development version of BoulderALE, you should check it out of our Sourceforge repository. While this code is subject to changes in interface and hasn't been as extensively tested as the release version, it will provide access to the latest and greatest BoulderALE features. The official web documentation is likely to be out-of-date with respect to the development software. You should instead refer to the svn documentation in ``boulderale/www/docs``. Check out the latest version of BoulderALE using svn with the commands::

	svn co https://boulderale.svn.sourceforge.net/svnroot/boulderale/trunk boulderale

svn users should periodically update BoulderALE by using the following command::

	svn update boulderale


Building The BoulderALE Documentation
----------------------------------------

.. _build-BoulderALE-docs:

If you are using the svn version of BoulderALE, you may want to build the documentation locally for access to the latest version. You can change to the ``boulderale/doc_source`` directory and run::

	make html
	
We try to update the documentation as we update the code, but svn users may notice some discrepancies. After building the documentation, you can view it in a web browser by opening the file ``boulderale/doc_source/_build/html/index.html``. You may want to bookmark that page for easy access. 
