.. _essential_files:

===========
Input Files
===========

What Files Do I Need?
---------------------

1. FASTA (.fna or .fasta) or STOCKHOLM (.sto) file
2. Basepair list (.txt) - Optional
3. Feature List (.txt) - Optional


File Format Details
-------------------

These are general guidelines that apply to multiple files:

1. Files should have proper file type suffix: E.g. '.fna' or '.fasta' for FASTA files, '.sto' for STOCKHOLM files, '.txt' for basepair and feature lists
2. Do not use spaces in the filename. Use underscores or MixedCase instead. For example: :file:`some RNA.fna` is not allowed, should be :file:`some_RNA.fna` or :file:`SomeRNA.fna`

FASTA File (.fna or .fasta) or STOCKHOLM (.sto)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following shows 6 lines from a FASTA file.
::

    >SS_cons
    ..(((((((..((((...........)))).(((((.......))))).....(((((.......))))))))))))....
    >1N77_C
    --GGCCCCAUCGUCUAGC--GGUU-AGGACGCGGCCCUCUCAAGGCCGAAA-CGGGGGUUCGAUUCCCCCUGGGGUCACCA
    >Aquifex_aeolicus|GE0001391.GluUUC
    GCCCCCGUCGUCUAG--CCUGGCCUAGGACGCCGGCCUUUCACGCCGGAAA-CGCGGGUUCAAAUCCCGCCGGGGGUGCCA
    
The following shows an example BoulderALE stockholm file. The #=GS lines define the basepair list, the #=GF lines define the feature list and the #=GC line defines the consensus secondary structure.
::

    # STOCKHOLM 1.0
    #=GF FT stem Acceptor_stem 2-8:70-76 C2D9F0
    #=GF FT stem D_stem 11-14:26-29 C2D9F0
    #=GF FT loop D_loop 15-25 F0E9AA
    #=GS 1N77_C BP 0 70 cWW CC
    #=GS 1N77_C BP 1 69 cWW CC
    #=GS 1N77_C BP 2 68 cWW CC
    1N77_C --GGCCCCAUCGUCUAGC--GGUU-AGGACGCGGCCCUCUCAAGGCCGAAA-CGGGGGUUCGAUUCCCCCUGGGGUCACCA
    Aquifex_aeolicus|GE0001391.GluUUC GCCCCCGUCGUCUAG--CCUGGCCUAGGACGCCGGCCUUUCACGCCGGAAA-CGCGGGUUCAAAUCCCGCCGGGGGUGCCA
    Pan_troglodytes_(chimpanzee)|GE0007962.GluCUC --CCCCUGGUAGUCUAGU--GGUU-AGGCUUUGCCACUCUCAGUGCCGCUG-CCUGGGUUGGAUUCCCAGUCACGUGACCA
    #=GC SS_cons ..(((((((..((((...........)))).(((((.......))))).....(((((.......))))))))))))....
    //
    
.. note::

    The consensus secondary structure must contain only the dot-bracket annotation, since this version of BoulderALE does not support Wuss format (i.e. '<', or '>') or any other non-dot-bracket annotations.
    

Basepair List (.txt) - Optional
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The basepair list is a tab-delimited list of nucleotide positions (column 1 defines the corresponding sequence) followed by the nucleotides pairing (NT1 and NT2, columns 2 and 3, respectively) and basepair family (column 4), which is based on the Leontis-Westhof basepair classification. The last column pertains to the PDB chains interacting, however; if the basepair list was not derived from a PDB structure, users can use NA for this column.  Users can download a list of basepairs for their favorite PDB structure from the FR3D website `FR3D website <http://rna.bgsu.edu/FR3D/>`_ or under the Basepairing Tab, they can download the basepair list.

::

    1N77_C	0	70	cWW	CC
    1N77_C	1	69	cWW	CC
    1N77_C	2	68	cWW	CC
    1N77_C	3	67	cWW	CC
    1N77_C	4	66	cWW	CC
    1N77_C	5	65	cWW	CC
    1N77_C	6	64	cWW	CC
    1N77_C	7	13	tWH	CC
    1N77_C	7	20	tsS	CC

Feature List (.txt) - Optional
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The feature list is a list of features that the user wants to map onto the alignment.  This will allow the user to color and collapse (vertically) regions of the alignment based on the feature. The feature list is a tab-delimited list where the columns are as follows: 

1) Feature Type (allows for fill-down of colors)
2) Feature Name (this is what is displayed on the alignment) 
3) Alignment Range. If involves two stretches of nts, use a colon ":" delimiter.
4) Hex Color (this is the color of the feature on the alignment)

::

    stem Acceptor_stem 2-8:70-76 C2D9F0
    stem D_stem 11-14:26-29 C2D9F0
    loop D_loop 15-25 F0E9AA
    stem Anti-Codon_stem 31-35:43-47 C2D9F0
    loop Anti-Codon_loop 36-42 F0E9AA
    loop Variable_loop 48-52 F0E9AA
    stem T_stem 53-57:65-69 C2D9F0
    loop T_loop 58-64 F0E9AA
    loop CCA_tail 77-80 F0E9AA
    loop loop0 0-1 F0E9AA
    loop loop1 9-10 F0E9AA
    loop loop2 30 F0E9AA