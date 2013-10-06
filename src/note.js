/*
 * note.js
 *
 * Functions for manipulating app.net annotations
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';

  $.appnet.note.find = function (type, list)
  {
    var result = null;
    var i = 0;
    if (list)
    {
      for (i = 0; i < list.length; i += 1)
      {
        if (list[i].type === type)
        {
          result = list[i].value;
          break;
        }
      }
    }
    return result;
  };

}(jQuery));
