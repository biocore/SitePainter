
.. BoulderALE documentation master file, created by
   sphinx-quickstart on Mon Jan 25 12:57:02 2010.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

######################################################
Boulder Alignment Editor (ALE)
######################################################
BoulderALE is an RNA alignment editor, which allows for the annotation of Watson-Crick and non-Watson-Crick basepairs, annotation of features (i.e. stems, loops, etc.), collapsing of features (horizontal) and sequences (vertical), along with 2D display of sequences (using `VARNA <http://varna.lri.fr/>`_ ) and base composition given a secondary structure (using `KiNG <http://kinemage.biochem.duke.edu/software/king.php>`_). This is a lightweight editor for editing and assessing the quality of small RNA alignments (less than ~1000 nts and ~1000 sequences). BoulderALE was developed to evaluate structure backed RNA alignments, along with the ability to collapse the alignment horizontally, to hide gapped regions of the alignment.  We have used this tool to align ~150 3D structure backed alignments (manuscript in preparation).  Also, many of the features included in this tool attempts to address the alignment editor suggested by Brown et. al., 2009 [1]_. An isostericity-based scoring method has been implemented to assess how well a sequence aligns to a given reference sequence, using the IsoDiscrepancy Index proposed by Stombaugh et al., 2009 [2]_. For more information please refer to the documentation/tutorial.

Key features of this tool include:

1) Annotation and scoring of alignments based on Watson-Crick and non-Watson-Crick basepairing.
2) Annotation of 3D structure features with the ability to collapse the alignment horiztonally to show/hide specific features
3) Visualize the secondary structure of selected sequences given a consensus secondary structure and/or basepair list.
4) Visualize base composition of the alignment given a consensus secondary structure and/or basepair list.
5) Ability to insert/delete/slide nucleotides within a sequence or insert/delete columns in the alignment.


.. [1] Brown, J. W., Birmingham, A., Griffiths, P. E., Jossinet, F., Kachouri-Lafond, R., Knight, R., et al. (2009). The RNA structure alignment ontology. RNA, 15(9), 1623-1631.
.. [2] Stombaugh, J., Zirbel, C. L., Westhof, E., & Leontis, N. B. (2009). Frequency and isostericity of RNA base pairs. Nucleic Acids Res, 37(7), 2294-2312.

Link
====================
Go to: `http://microbio.me/boulderale <http://microbio.me/boulderale>`_
 
Contact Us
===========
For any questions/suggestions please contact `BoulderALE Support <jesse.stombaugh@colorado.edu>`_. We aim to respond to e-mail questions within three to five working days. 

