/*
 * site-painter.js
 *
 * __author__ = "Antonio Gonzalez Pena"
 * __copyright__ = "Copyright 2010, Site Painter"
 * __credits__ = ["Antonio Gonzalez Pena"]
 * __license__ = "GPL"
 * __version__ = "0.8-dev"
 * __maintainer__ = "Antonio Gonzalez Pena"
 * __email__ = "antgonza@gmail.com"
 * __status__ = "Development"
 *
 */

$(document).ready(function() {
   // ****
   // Global Vars & Initialization
   var thisClass = this;
   var metadata_fulltext = "";
   var metadata = new Array();
   var metadata_headers = new Array();
   var metadata_order = new MyArray();
   var elements_order = new MyArray();
   var gradient_bins = 1000;
   var idInterval;
   // Boolean to check if last event was reset color
   var resetColorLastEvent = false;
   
   var elements = ''
       //  accept rect
       elements += '#svgcontent rect,';
       //  accept circle
       elements += '#svgcontent circle,';
       //  accept ellipse
       elements += '#svgcontent ellipse,';
       //  accept lines
       //elements += '#svgcontent line,
       //  accept polylines 
       elements += '#svgcontent polyline,';
       //  accept polygon and path
       elements += '#svgcontent polygon,#svgcontent path[d$="z"],#svgcontent path[d$="Z"]';
       
   $("#tabs").tabs();
   
   $.tablesorter.addParser({
        id: 'natlang_metadata',
        // return false so this parser is not auto detected
        is: function(s) { return false; },
        // format your data for normalization 
        format: function(s) {
            return metadataNatLangPos(s);
        }, 
        // set type, either numeric or text 
        type: 'numeric' 
    }); 
   $.tablesorter.addParser({
        id: 'natlang_elements',
        // return false so this parser is not auto detected
        is: function(s) { return false; },
        // format your data for normalization 
        format: function(s) {
            return elementsNatLangPos(s);
        }, 
        // set type, either numeric or text 
        type: 'numeric' 
    }); 
   
   // ====
   // ====> Main funcionalities
   // ====
   
   // Modified from http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
   $("#meta_file").change(function (){
       var fileInput = document.getElementById('meta_file');
       var file = fileInput.files[0];
       var textType = /text.*/;
       
       if (file.type.match(textType)) {
           var reader = new FileReader();
           reader.onload = function(e) {
					metadata_fulltext = reader.result;
					process_metadata_file();
					$("#metadata_selection").html("Metadata: <b>" + $("#meta_file").val() + "</b>");
		   }
		   reader.readAsText(file);
	   } else {
		   alert("File not supported. Select another one.");
		   return('');
	   }
   });
   
    
   // ****
   // Click on the metafile process button
   function process_metadata_file() {
       var textfile = String(metadata_fulltext).split(/[\r\n]+/g);
       var columns = 0;
       
       // init global variables
       metadata = new Array();
       metadata_headers = new Array();
       metadata_order = new MyArray();
       for (i in textfile) {
            var row = textfile[i].split("\t");
            row[0] = row[0].replace(/\./gi, '_');
            // Ignoring empty rows or comment lines
            if (row=="" || row[0][0]=='#' || row[0][0]=='%' || row[0]=='eigvals') continue;
            // Reading header
            if (metadata_headers.length==0) {
               metadata_headers = new Array();
               columns = row.length;
               for (var j = 0; j < columns-1; j++) {
                   metadata[j] = new Array(); 
                   metadata_headers[j] = row[j+1].replace(/\./gi, '_');;
               }
            // Reading all other rows
            } else {
               if (columns!=row.length) {
                  metadata = new Array();
                  metadata_headers = new Array();
                  metadata_order = new MyArray();
                  alert("There are not similar number of columns in all you metadata.\n" +
                        "Check element: " + row[0]);
                  break;
               }
               columns = row.length;
               for (var j = 0; j < columns-1; j++) {
                  metadata[j].push(new Array(row[0],parseFloat(row[j+1])));
                  if (metadata_order.indexOf(row[0]) == -1) metadata_order.push(row[0]);
               }
            }
         }
         metadata_order.alphanumSort();
         show_metadata_column(0);
         
         // Creating animation menu
         var table_html = '<table id="animation_table" class="tablesorter" cellspacing="1">' +
                          '<thead>' + '<tr>' + '<th>&nbsp;</th>' +
                          '<th class="header">Name:</th>' +
                          '</tr>' + '</thead>' + '<tbody>';
         
         $('#tab_animate_table').empty();
         
         for (m in metadata_headers) 
            table_html += '<tr><td id="animation_position_' + m + 
                          '"><input type="checkbox" id="animation_option" class="animation_option" value="' + m + 
                          '" name="' + metadata_headers[m] + '"></td>' +
                          '<td id="animation_' + m + '">' + metadata_headers[m] +
                          '</td></tr>';
         
         table_html += '</tbody>' + '</table>'

         $("#tab_animate_table").html(table_html);
         
         // Note: Adding events to the created sections can only 
         // occur after they have been added to the working html
                  
         // Adding events to rows
         for (m in metadata_headers)
             AddEventForAnimation(m)
      
         $("#animation_table").tablesorter({ 
            headers: { 0: { sorter: false } },
            sortList: [[1,0]]
         });
      
   }
   
   // ****
   // Coloring of the animation
   function ColorAnimation(id) {
       show_metadata_column(id,1);
       ColorElements(metadata[$('#tab_metadata_selector').val()]);
   }
   
   // ****
   // On selection actions_sum in the actions tab to sum/display taxa
   $('#actions_sum').click(function() {
        Sum_Display();
    });
   
   // ****
   // On click on the start animate button
   $('#tab_animate_run').click(function() {
       total = $("input:checkbox:checked").length - 1;
       $("input:checkbox:checked").each(function (index, value) {
            $("#tab_animate_selector option:selected").each(function () {
                time = $(this).val() * 5000 / total;
                setTimeout(function(e) { ColorAnimation(value.value) },parseInt(time*index));
            });
       });
   });
   
   // ****
   // On change of the metadata selector
   $('#tab_metadata_selector').change(function () {
          $("#tab_metadata_selector option:selected").each(function () {
                show_metadata_column($(this).val()); 
          });
   });
   
   // ***
   // Show all elements of the image
   $('#tab_elements_text').click(function () {  ShowImageElements(); } );
   
   // ***
   // Change line status
   $('#show_lines').change(function () {
       var all_elements = $("#svg_editor_iframe").contents().find(elements);
       all_elements.each(function (index, value) {
         $("#svg_editor_iframe").contents().find('#svgcontent #' + value.id).each(
            function (ind, val) {
               svgLineColoring(val);
            });
       });
   });
   
   // ***
   // Change no color paths
   $('#color_paths').change(function () {
       if (resetColorLastEvent) {
          ColorAll();
       } else {
          ColorElements(metadata[$('#tab_metadata_selector').val()]);
       }
   });
    
   // ***
   // On double click on each element of the table allow name change
   $('#tab_elements_table').dblclick(function(event) {
       var target = event ? event.target : window.event.srcElement;
       if(target.nodeName.toLowerCase() === 'td') {
          $('#' + target.id).editable(function(value, settings) {
              var text = target.id.substring(target.id.indexOf('-')+1);
              $("#svg_editor_iframe").contents().find('#svgcontent #' + text).each(
                 function (ind, val) {
                    // Deals with elements with same name
                    if (ind==0) {
                       val.id = value;
                       ShowImageElements();
                    }
              });
              return(value);
            }, { 
              type    : 'textarea',
              submit  : 'OK',
              cancel  : 'Cancel',
          });
       }
   });
   
   // ***
   // Color Selectors for Coloring
   $('#Color_Selector_1').jPicker({ 
     window: { 
        expandable: true,
        position:  { x: -250, y: 0, }, //'screenCenter'
        liveUpdate: true,
     },
     color: {
        active: new $.jPicker.Color({ hex: '0000FF' })
     }
   });
   $('#Color_Selector_2').jPicker({ 
     window: { 
        expandable: true,
        position:  { x: -225, y: 0, }, //'screenCenter'
        liveUpdate: true,
     },
     color: {
        active: new $.jPicker.Color({ hex: 'FF0000' })
     }
   });
   $('#Color_Selector_3').jPicker({ 
     window: { 
        expandable: true,
        position:  { x: -200, y: 0, }, //'screenCenter'
        liveUpdate: true,
     },
     color: {
        active: new $.jPicker.Color({ hex: 'FFFFFF' })
     }
   });
   
   // ***
   // Coloring of image based on selected data
   $('#tab_metadata_process').click(function() {
      if (metadata.length == 0 || metadata_headers.length == 0) {
         alert('You must load a metadata file first.');
      } else {
         $("#tab_metadata_selector option:selected").each(function () { ColorElements(metadata[$('#tab_metadata_selector').val()]); });
      }
   });
      
   // ****
   // Click on the color all process button
   $('#color_all_process').click(function() {
       ColorAll();
   });
         
   // ****
   // Modify selections from the animation tab
   $('#modify_selection').change(function() {
       selection = this.value
       if (selection == "invert") {
           $(".animation_option").each(function () {
               $(this).attr('checked', !$(this).attr('checked'));
           });
       } else if (selection == "none") {
           $(".animation_option").attr('checked', false);
       } else if (selection == "all") {
           $(".animation_option").attr('checked', true);
       } else {
          alert("There was an error, reload the webpage");
       }
   
       $("#modify_selection option[value='select']").attr('selected', 'selected');
   });
   
   // ====
   // ====> General functionalities
   // ====
   
   // ****
   // Color All Elements of the image based on color selected by the user
   function ColorAll() {
      resetColorLastEvent = true;
      
      var all_elements = $("#svg_editor_iframe").contents().find(elements);
      all_elements.each(function (ind, value) {
         if (value.id.indexOf("tmp_name_")!=0) {
             var index = svgSearchElement(value,'fill');
             if (index!=-1)
                value.attributes[index].value = '#' + $.jPicker.List[2].color.active.val('hex');
             svgLineColoring(value);
         }
      });
    }
   
   
   // ****
   // Color All Elements of the image based on mapping file
   function ColorElements(data) {
       resetColorLastEvent = false;
       
       var values = new Object();
       var max = -Infinity;
       var min = Infinity;
       var unique_values_arr = new Array();
       var unique_colors_arr = new Array();
       var color_base_1 = [ $.jPicker.List[0].color.active.val('r'),
                        $.jPicker.List[0].color.active.val('g'),
                        $.jPicker.List[0].color.active.val('b')];
       var color_base_2 = [ $.jPicker.List[1].color.active.val('r'),
                        $.jPicker.List[1].color.active.val('g'),
                        $.jPicker.List[1].color.active.val('b')];
       var image_elements_not_found = new Array();
       
       // Looping throught data
       for (d in data) {
          if (isNaN(data[d][1])) {
             image_elements_not_found.push(data[d][0]);
          } else {
             values[data[d][0]] = data[d][1];
             if (max<data[d][1]) max = data[d][1];
             if (min>data[d][1]) min = data[d][1];
             if (unique_values_arr.indexOf(data[d][0]) == -1) unique_values_arr.push(data[d][1]);
          }
       }
        
       // Create bins and gradients
       var bins = unique_values_arr.length; 
       var color_gradient = make_multiple_color_gradient([color_base_1,color_base_2],bins);
       var bin_indices = bin_data(unique_values_arr,bins);
       for (i in unique_values_arr) {
          var color_index = bin_indices[i];
          unique_colors_arr[i] = rgb_to_html_color(color_gradient[color_index]);
       }
       
       // Check for missing values from the image
       $("#svg_editor_iframe").contents().find(elements).each(function (index, value) {
           if (values[value.id]==null || values[value.id]==undefined)
                image_elements_not_found.push(value.id);
       });
       
       // Start coloring
       for (value in values) {
          // Color element in svg-edit
          $("#svg_editor_iframe").contents().find('#svgcontent #' + value).attr('opacity', '1');
          $("#svg_editor_iframe").contents().find('#svgcontent #' + value).each(
          function (ind, val) {
             var index = svgSearchElement(val,'fill');
             val.attributes[index].value = 
                 unique_colors_arr[unique_values_arr.indexOf(values[value])];
             svgLineColoring(val);
          });
          // Color blank td in metadata table
          $('#color_'+value).css('background-color', unique_colors_arr[unique_values_arr.indexOf(values[value])]);
       }
       
       // Color/Hide paths not found
       if ($('#color_paths').val()=='true') {
           for (j in image_elements_not_found)
               $("#svg_editor_iframe").contents().find('#svgcontent #' + image_elements_not_found[j]).attr('opacity', '1');
       } else {
           for (j in image_elements_not_found)
               $("#svg_editor_iframe").contents().find('#svgcontent #' + image_elements_not_found[j]).attr('opacity', '0');
       }
   }
   
   
   // ****
   // Show all elements of the image
   function ShowImageElements() {
      var all_elements = $("#svg_editor_iframe").contents().find(elements);
      
      var tab_ele_txt = '<table id="element_table" class="tablesorter" cellspacing="1">' +
                         '<thead>' + '<tr>' + 
                         '<th class="header">Total elements:' + all_elements.length + '</th>' +
                         '</tr>' + '</thead>' + '<tbody>';
      
      $("#tab_elements_table").empty();
      
      // Creating table
      element_count=1
      all_elements.each(function (index, value) {
         if (value.id=="" || value.id==null) {
             value.id="tmp_name_" + element_count
             element_count+=1
         }
         
         // Check if fill exists if not default to white
         var fill_index = svgSearchElement(value,'fill');
         if (value.attributes[fill_index].value=='none' || value.attributes[fill_index].value=='') {
            value.attributes[fill_index].value='#ffffff';
         }
         
         tab_ele_txt += '<tr><td id="' + index + '-' + value.id + '">' + value.id + '</td></tr>';
      });
      
      tab_ele_txt += '</tbody>' + '</table>';
      $("#tab_elements_table").html(tab_ele_txt);
      
      // Addatting events to element added
      elements_order = new MyArray()
      all_elements.each(function (index, value) {
         ChangeColorEvent($('#' + index + '-' + value.id),1);
         elements_order.push(value.id);
      });
      elements_order.alphanumSort();
         
      $("#element_table").tablesorter({ 
         headers: { 0: { sorter: 'natlang_elements'} },
         sortList: [[0,0]]
      });
   }
      
   // ****
   // Find the given element inside the attributes of a given svg element
   // Returns the index or -1 if not found
   function svgSearchElement(svg_element,name) {
      index = -1;
      for (i in svg_element.attributes) {
         if (svg_element.attributes[i].nodeName==name) {
            index = i;
            break;
         }
      }
      return index;
   }
   
   // ****
   // Check and change line status of the svg element
   function svgLineColoring (svg_element) {
      var stroke_index = svgSearchElement(svg_element,'stroke');
      var fill_index = svgSearchElement(svg_element,'fill');
      
      if (stroke_index!=-1 && fill_index!=-1) {
         if ($('#show_lines').val()=='true') {
            svg_element.attributes[stroke_index].value = '#000000';
         } else {
            svg_element.attributes[stroke_index].value = svg_element.attributes[fill_index].value;
         }
      }
   }
   
   
   // ****
   // Change color event method
   function ChangeColorEvent(element,from_elements_tab) {
      element['original_color'] = '';
      element['changed'] = 'T';
      
      element.mouseover(function(event) {
            var text = from_elements_tab!=1 ? element['selector'] : 
                        '#' + element['selector'].substring(element['selector'].indexOf('-')+1);
            $("#svg_editor_iframe").contents().find('#svgcontent ' + text).each(
               function (ind, value) {
                 var index = svgSearchElement(value,'fill');
                 var new_color = getComplementColor(value.attributes[index].value);
                                  
                 if (element['original_color'] != value.attributes[index].value) {
                    element['original_color'] = value.attributes[index].value;
                 }
                 if (value.attributes[index].value == new_color) {
                    value.attributes[index].value = "#FF0000";
                    element['changed'] = 'F';
                 } else {
                    value.attributes[index].value = new_color;
                 }
                 svgLineColoring(value);
            });
      });
      element.mouseleave(function(event) {
            var text = from_elements_tab!=1 ? element['selector'] : 
                        '#' + element['selector'].substring(element['selector'].indexOf('-')+1);
            $("#svg_editor_iframe").contents().find('#svgcontent ' + text).each(
               function (ind, value) {
                 var index = svgSearchElement(value,'fill');
                              
                 if (element['changed'] == 'F') {
                    value.attributes[index].value = element['original_color'];
                 } else {
                    var new_color = getComplementColor(value.attributes[index].value);
                    value.attributes[index].value = new_color;
                 }
                 svgLineColoring(value);
            });
      });
   }
   
   // ****
   // Change color event method
   function AddEventForAnimation(elem) {
      element = $('#animation_' + elem)
      
      element.mouseover(function(event) {
         ColorAnimation(elem);
         $('#animation_position_' + elem).css('background-color', '#0000FF');
      });
      element.mouseleave(function(event) {
         $('#animation_position_' + elem).css('background-color', '#FFFFFF');
      });
   }
   
   // ****
   // Change the metadata of the metadata tab based on column of the metadata array
   function show_metadata_column(column,change_view) {
      var selector_html = "";
      var table_html = '<table id="meta_table" class="tablesorter" cellspacing="1">' +
                       '<thead>' + '<tr>' + '<th>&nbsp;</th>' +
                       '<th>Name&nbsp;&nbsp;&nbsp;&nbsp;</th>' +
                       '<th>Value</th>' +
                       '</tr>' + '</thead>' + '<tbody>';
      $('#tab_metadata_selector').empty();
      $('#tab_metadata_table').empty();
      
      for (m in metadata_headers) 
         selector_html += '<option value="' + m + '">' + metadata_headers[m] + '</option>';
         
      for (m in metadata[column])
         table_html += '<tr><td id="color_' + metadata[column][m][0] + '">&nbsp;</td>' +
                       '<td id="' + metadata[column][m][0] + '">' + 
                       metadata[column][m][0] + '</td><td>' +
                       metadata[column][m][1] + "</td></tr>";
      table_html += '</tbody>' + '</table>'

      $('#tab_metadata_selector').html(selector_html);
      $("#tab_metadata_table").html(table_html);
     
      for (m in metadata[column]) 
         ChangeColorEvent($('#' + metadata[column][m][0]));
      
      $("#meta_table").tablesorter({ 
         headers: { 0: { sorter: false }, 1: { sorter: 'natlang_metadata'} },
         sortList: [[1,0]]
      });
      
      $("#tab_metadata_selector option[value='" + column + "']").attr('selected', 'selected');
      if (!change_view) $("#tabs").tabs('select', 1);
   }
   
   // ****
   // Order by natural language, return the position in the metadata file
   function metadataNatLangPos(value) {
      return metadata_order.indexOf(value);
   }
   
   // ****
   // Order by natural language, return the position in the elements
   function elementsNatLangPos(value) {
      return elements_order.indexOf(value);
   }
   
   // ****
   // Get complement color
   function getComplementColor(rgb) {
      // Creating an object image with the rgb color
      var color = new $.jPicker.Color({ hex: rgb.substring(1) })
      // Getting the hue of the previos color and getting its complement
      var new_hue = color.val('h')+180;
      if (new_hue>360) new_hue-=360;
      // Getting the complement of the previous color
      var new_color = new $.jPicker.Color({ h: new_hue, s: color.val('s'), v: color.val('v') })
      return '#' + new_color.val('hex');
   }
   
   // ****
   // Getting selected values from the actions panel and coloring based on action
   function Sum_Display() {
       var data = new Object();
       $(".animation_option:checked").each(function () {
           meta_len = metadata[this.value].length;
           if (Object.keys(data).length  === 0) {
                for (i=0; i<meta_len; i++) {
                    data[metadata[this.value][i][0]] = metadata[this.value][i][1]
                }
           } else {
                for (i=0; i<meta_len; i++) {
                    data[metadata[this.value][i][0]] += metadata[this.value][i][1]
                }
           }
       });
       
       data_coloring = new Array();
       for (k in data) {
           data_coloring.push(new Array(k,data[k]))
       }
       ColorElements(data_coloring);
   }
});


/************************************************************
 * The following methods where implemented by Brian Huisman *
 * http://my.opera.com/GreyWyvern/blog/show.dml/1671288     *
 ************************************************************/

var MyArray = function() {
};
MyArray.prototype = new Array;
MyArray.prototype.alphanumSort = function(caseInsensitive) {
  for (var z = 0, t; t = this[z]; z++) {
    this[z] = [];
    var x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      var m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        this[z][++y] = "";
        n = m;
      }
      this[z][y] += j;
    }
  }

  this.sort(function(a, b) {
    for (var x = 0, aa, bb; (aa = a[x]) && (bb = b[x]); x++) {
      if (caseInsensitive) {
        aa = aa.toLowerCase();
        bb = bb.toLowerCase();
      }
      if (aa !== bb) {
        var c = Number(aa), d = Number(bb);
        if (c == aa && d == bb) {
          return c - d;
        } else return (aa > bb) ? 1 : -1;
      }
    }
    return a.length - b.length;
  });

  for (var z = 0; z < this.length; z++)
    this[z] = this[z].join("");
}