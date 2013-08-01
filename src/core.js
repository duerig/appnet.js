/*
 * core.js
 *
 * Core functions for calling the app.net API via ajax.
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';
  function wait(time)
  {
    console.log('Waiting ' + time + ' ms to retry');
    if ($.wait === undefined)
    {
      return $.Deferred(function (newDeferred) {
        setTimeout($.bind(newDeferred.resolve, newDeferred), time);
      }).promise();
    }
    else
    {
      return $.wait(time);
    }
  }

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

  $.appnet.core.makeUrl = function (pieces)
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

  $.appnet.core.call = function (url, type, args, data)
  {
    var options = {
      contentType: 'application/json',
      dataType: 'json',
      type: type,
      url: url + makeArgs(args)
    };
    var token = $.appnet.userToken;
    if (! token)
    {
      token = $.appnet.appToken;
    }
    if (token)
    {
      options.headers = { Authorization: 'Bearer ' + token };
    }
    if (data)
    {
      options.data = makeData(data);
    }
    var promise = $.ajax(options);
    // If we get a 429 busy response, we should retry once after
    // waiting the requisite time.
    promise.fail(function (response) {
      if (response.statusCode() === 429)
      {
        var delaySec = parseInt(response.getRequestHeader('Retry-After'), 10);
        var result = wait(delaySec * 1000);
        result.then(function () {
          return $.ajax(options);
        });
        return result;
      }
      else
      {
        throw response;
      }
    });
    return promise;
  };

}(jQuery));
