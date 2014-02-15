/*
 * color-gradients.js
 *
 * __author__ = "Antonio Gonzalez Pena"
 * __copyright__ = "Copyright 2010, Site Painter"
 * __credits__ = ["Antonio Gonzalez Pena"]
 * __license__ = "BSD"
 * __version__ = "1.1-dev"
 * __maintainer__ = "Antonio Gonzalez Pena"
 * __email__ = "antgonza@gmail.com"
 * __status__ = "Development"
 *
 * This script is based on the gradient_coloring.py script
 * wrote by Jeremy Joseph Widmann <Jeremy.Widmann@colorado.edu>
 *
 */

function make_multiple_color_gradient(color_list,nbins) {
   /* Returns a color gradient given a list of colors.
    * 
    * - color_list: list of colors to make a gradient from.  Will make a
    *   gradient from colors in order in list.
    *      - ex: color_list=[[255,0,0],[0,255,0],[0,0,255]] = [red,green,blue]
    *      - This function will make a gradient from red to green and then
    *        green to blue.
    * - nbins: is the number of divisions (or individual colors) in the
    *   color gradient.
    */
    
    var bins_per_gradient = nbins/(color_list.length-1);
    var full_gradient = []
    for (var x in color_list) {
       if (x==0) continue;
       full_gradient = full_gradient.concat(make_gradient(color_list[x-1],color_list[x],bins_per_gradient));
    }
    return full_gradient;
}

function make_gradient(color1,color2,nbins) {
    /* Makes color gradient from color1 to color2.
     *
     * - color1: initial color in (r,g,b) format.
     * - color2: target color in (r,g,b) format.
     * - nbins: number of bins in color gradient.
     */
     
    // To only create bins[1] and use color2 as bin[n]
    nbins = nbins-1;
    var r_step = (color2[0]-color1[0])/nbins;
    var g_step = (color2[1]-color1[1])/nbins;
    var b_step = (color2[2]-color1[2])/nbins;
    var r = color1[0];
    var g = color1[1];
    var b = color1[2];
    var color_list = new Array();
     
    color_list[0] = [r,g,b];
    for (var i=1;i<parseInt(nbins);i++) {
       color_list[i] = [r+r_step,g+g_step,b+b_step];
       r+=r_step;
       g+=g_step;
       b+=b_step;
    }
    // Adding bin[n]
    color_list[color_list.length] = [r+r_step,g+g_step,b+b_step]
     
    return color_list;
}

function bin_data(data, nbins) {
    /* Returns array of bin indices same shape as data.
     *
     * - data: numpy array of coevolution data.
     * - nbins: number of bins to make.
     */
     
     // Original:  d_flat = ravel(data)
     // In this version we expect data to already flatten
     var d_flat = data.slice();
     d_flat.sort(sortNumber);
     
     var max_val = Math.max.apply( Math, d_flat );
     var min_val = Math.min.apply( Math, d_flat );
     var step = (max_val-min_val)/nbins;
     
     var bin_boundaries = new Array();
     for (i=min_val;i<max_val;i+=step) {
        bin_boundaries.push(i);
     }
     
     bin_indices = searchsorted(bin_boundaries,data);
    
     return bin_indices;
}


function rgb_to_html_color(rgb_tuple) {
    /* convert an (R, G, B) tuple to #RRGGBB 
     *
     * - From Python Cookbook.
     * 
     * *** Due to a bug in the floor func in JS that transforms -1e13 to -1 had to change it
     */
     
     rgb_tuple[0] = Math.floor(rgb_tuple[0])
     rgb_tuple[1] = Math.floor(rgb_tuple[1])
     rgb_tuple[2] = Math.floor(rgb_tuple[2])
     
     if (rgb_tuple[0]<0.0) rgb_tuple[0]=0
     if (rgb_tuple[1]<0.0) rgb_tuple[1]=0
     if (rgb_tuple[2]<0.0) rgb_tuple[2]=0
     
     var r = rgb_tuple[0].toString(16);
     var g = rgb_tuple[1].toString(16);
     var b = rgb_tuple[2].toString(16);
     
     if (r.length==1) r = '0' + r;
     if (g.length==1) g = '0' + g;
     if (b.length==1) b = '0' + b;
     
     var hexcolor = '#' + r + g + b;
     return hexcolor
}

/***********************************
 * Reimplementation of Numpy Funcs *
 ***********************************/

function searchsorted(bin_boundaries,data) {
   var positions = new Array();
   
   for (i=0;i<data.length;i++) {
      for (j=0;j<bin_boundaries.length-1;j++) {
         if (bin_boundaries[j]>data[i]) break;
      }
      positions.push(j-1);
   }
   
   return positions;
}

function sortNumber(a,b) {
  return a - b;
}

/********************************************************
 *                                                      *
 * This functions existed in the original py script but *
 * We do not need them for the current JS application.  *
 *                                                      *
 ********************************************************/

/*
#!/usr/bin/env python
# file gradient_coloring.py
from __future__ import division
from numpy import array, ravel, arange, searchsorted
from math import log10, ceil
from sys import argv

COLOR_LIST = [(0, 0, 128), (0, 0, 255), (0, 255, 255), (0, 255, 0),\
              (255, 255, 0), (255, 0, 0), (128, 0, 0)]

def _format_int_to_padded_string(i,max_number):
    """Returns string of int with padded zeros, using max_number pad places.
    """
    conversion = "0%sd"%(int(ceil(log10(max_number))))
    return ("%"+conversion)%i


def make_gradient_array(color1,color2,nbins):
    """Makes color gradient from color1 to color2.
        
        - color1: initial color in (r,g,b) format.
        - color2: target color in (r,g,b) format.
        - nbins: number of bins in color gradient.
    """
    r_step = (color2[0]-color1[0])/nbins
    g_step = (color2[1]-color1[1])/nbins
    b_step = (color2[2]-color1[2])/nbins
    
    r_list = arange(color1[0],color2[0]+r_step,r_step)
    g_list = arange(color1[1],color2[1]+g_step,g_step)
    b_list = arange(color1[2],color2[2]+b_step,b_step)

    color_list = [(r,g,b) for r,g,b in zip(r_list,g_list,b_list)]

    return color_list

def rgb_gradient_to_html(color_list):
    """Returns color_list in hex color format.
    """
    hex_color_list = [rgb_to_html_color(c) for c in color_list]
    return hex_color_list

*/