.. _essential_files:

=======================
What Files Do I Need?
=======================

1. An SVG image of the site broken down into paths or regions.
2. Tab-delimited text file, such as the tab-delimited files produced by QIIME [1]_ (e.g., summarized taxa, alpha- and beta-diversity files, etc.).


SVG Image (.svg)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following shows an SVG image of the hand, where the image is comprised of paths.

.. image:: ../images/hand.svg
  :align: center
  :height: 400px

Tab-delimited text file (.txt)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The metadata files are tab-delimited files, which are illustrated by the following examples of a summarized taxonomy and principal coordinates files produced from QIIME.

Example 1: Summarized Taxonomy File
+++++++++++++++++++++++++++++++++++++

The following is a summarized taxonomy file produced from QIIME. The first column contains the SampleID's which allow for correspondence to the paths of the SVG image, while the remaining columns consist of relative abundance of specific taxa in each region of the hand.

::

    SampleID Root;k__Bacteria;p__Acidobacteria Root;k__Bacteria;p__Actinobacteria Root;k__Bacteria;p__Bacteroidetes Root;k__Bacteria;p__Chloroflexi
    Hand23   0.000245761                       0.762349472                        0.010076186                       0.00098304
    Hand24   0                                 0.707366297                        0.012865792                       0.000756811
    Hand25   0.000254453                       0.844020356                        0.005343511                       0.001017812
    Hand26   0                                 0.842782152                        0.003674541                       0
    Hand27   0.000412201                       0.819455894                        0.002061006                       0.000412201
    Hand28   0.000236574                       0.814289094                        0.007097232                       0.000709723
    Hand29   0.000546001                       0.870870871                        0.011739012                       0
    Hand30   0.027284827                       0.725598935                        0.008651287                       0.007542147
    Hand31   0                                 0.788298347                        0.006252791                       0
    Hand32   0.001885607                       0.79698303                         0.009679447                       0.001005657


Example 2: Principal Coordinates File
+++++++++++++++++++++++++++++++++++++

The following is a weighted Unifrac principal coordinates file produced from QIIME. The first column contains the SampleID's which allow for correspondence to the paths of the SVG image, while the remaining columns consist of the values for each principal coordinate vector (PC 1-5) at each region of the hand.

:: 

    pc vector number 1            2            3            4            5
    Hand23            0.017674734  0.086331264  0.04473723   0.004003589  0.011900936
    Hand24            0.03721532   0.114295555  0.026545593  0.031769352 -0.003194077
    Hand25            0.02641303  -0.048601292  0.010150082 -0.027385228 -0.000666115
    Hand26            0.052684939 -0.02055477  -0.016175269 -0.005657196  0.004005854
    Hand27            0.084910157 -0.059976555 -0.009576943  0.019973765 -0.00334975
    Hand28           -0.050264269 -0.020207926  0.050633036 -0.019990939  0.005436556
    Hand29           -0.007034615  0.007534214 -0.01853336  -0.016552325 -0.038254278
    Hand30            0.16615244   0.069815221  0.007417206  0.106767431 -0.044294094
    Hand31            0.083281617  0.058672536 -0.01844925  -0.017083253  0.036211152
    Hand32            0.071622503  0.027033638  0.043880704  0.028824731  0.010783767
    
    
References
----------------------------- 

.. [1] Caporaso, J.G., Kuczynski, J., Stombaugh, J., Bittinger, K., Bushman, F.D., Costello, E.K., Fierer, N., Pena, A.G., Goodrich, J.K., Gordon, J.I., Huttley, G.A., Kelley, S.T., Knights, D., Koenig, J.E., Ley, R.E., Lozupone, C.A., McDonald, D., Muegge, B.D., Pirrung, M., Reeder, J., Sevinsky, J.R., Turnbaugh, P.J., Walters, W.A., Widmann, J., Yatsunenko, T., Zaneveld, J. and Knight, R. (2010) QIIME allows analysis of high-throughput community sequencing data, Nat Methods, 7, 335-336.