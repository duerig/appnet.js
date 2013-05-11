/*
 * core.js
 *
 * Core functions for calling the app.net API via ajax.
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';

  var callSuccess = function (response)
  {
    if (response !== null &&
	response.meta !== undefined &&
	response.data !== undefined)
    {
      if (this.success)
      {
        this.success(response);
      }
    }
    else
    {
      if (this.failure)
      {
//        console.log('AppNet null response');
//        console.dir(response);
        this.failure(response.meta);
      }
    }
  };

  var callFailure = function (request, status, thrown)
  {
//    console.log('AppNet call failed: ' + status + ', thrown: ' + thrown);
//    console.dir(request.responseText);
    var meta = null;
    if (request.responseText) {
      var response = JSON.parse(request.responseText);
      if (response !== null) {
        meta = response.meta;
      }
    }
    if (this.failure) {
      this.failure(meta);
    }
  };

  function makeArgs(args)
  {
    var result = '';
    if (args)
    {
      result = $.param(args);
    }
    if (result !== '')
    {
      result = '?' + result;
    }
    return result;
  }

  function makeData(data)
  {
    var result = null;
    if (data)
    {
      result = JSON.stringify(data);
    }
    return result;
  }

  $.appnet().core.makeUrl = function (pieces)
  {
    var result = '';
    var i = 0;
    for (i = 0; i < pieces.length; i += 1)
    {
      if (pieces[i])
      {
        result += pieces[i];
      }
    }
    return result;
  };

  $.appnet().core.call = function (url, type, args, success, failure, data)
  {
    var complete = {
      success: success,
      failure: failure
    };
    var options = {
      contentType: 'application/json',
      dataType: 'json',
      type: type,
      url: url + makeArgs(args)
    };
    if (this.accessToken) {
      options.headers = { Authorization: 'Bearer ' + this.accessToken };
    }
    if (data) {
      options.data = makeData(data);
    }
    var header = $.ajax(options);
    header.done($.proxy(callSuccess, complete));
    header.fail($.proxy(callFailure, complete));
  };

}(jQuery));
