/*
 * base.js
 *
 * Base app.net library file. Sets up the single global appnet object.
 *
 */

/*global jQuery: true, require: true, module: true, exports: true */
if (typeof exports !== 'undefined')
{
  jQuery = {};

  jQuery.param = function (object)
  {
    'use strict';
    // Query String able to use escaping
    var query = require('querystring');

    var result = '',
        key = '',
        postfix = '&';

    var i;
    for (i in object)
    {
      // If not prefix like a[one]...
//      if (! prefix)
//      {
      key = query.escape(i);
//      }
//      else
//      {
//        key = prefix + '[' + query.escape(i) + ']';
//      }

      // String pass as is...
      if (typeof(object[i]) === 'string')
      {
        result += key + '=' + query.escape(object[i]) + postfix;
        continue;
      }

      // objectects and arrays pass depper
/*
      if (typeof(object[i]) === 'object' || typeof(object[i]) === 'array')
      {
        result += toURL(object[i], key) + postfix;
        continue;
      }
*/
      // Other passed stringified
      if (object[i].toString)
      {
        result += key + '=' + query.escape(object[i].toString()) + postfix;
        continue;
      }
    }
    // Delete trailing delimiter (&) Yep it's pretty durty way but
    // there was an error gettin length of the objectect;
    result = result.substr(0, result.length - 1);
    return result;
  };

  jQuery.ajax = function (options)
  {
    'use strict';
    var Q = require('q');
    var needle = require('needle');

    var deferred = Q.defer();

    var options = jQuery.extend({ compressed: true }, options);

    if (options.dataType === 'json')
    {
      options.json = true;
    }

    if (options.dataType === 'multipart')
    {
      options.multipart = true;
    }

    needle.request(options.type, options.url, options.data, options, function (error, response, body)
    {
      if (error || response.statusCode !== 200)
      {
        deferred.reject(body);
      }
      else
      {
        deferred.resolve(body);
      }
    });

    return deferred.promise;
  };

  jQuery.extend = require('xtend');

  jQuery.wait = require('q').delay;
}

(function ($) {
  'use strict';
  var appnet = {
    userToken: null,
    appToken: null,
    endpoints: null,
    core: {},
    note: {},
    recipes: {}
  };

  appnet.authorize = function (user, app)
  {
    this.userToken = user;
    this.appToken = app;
  };
  
  appnet.deauthorize = function ()
  {
    this.userToken = null;
    this.appToken = null;
  };

  appnet.isLogged = function ()
  {
    return (this.isApp() || this.isUser());
  };

  appnet.isApp = function ()
  {
    var result = false;
    if (this.appToken)
    {
      result = true;
    }
    return result;
  };

  appnet.isUser = function ()
  {
    var result = false;
    if (this.userToken)
    {
      result = true;
    }
    return result;
  };

  $.appnet = appnet;

}(jQuery));

if (typeof module !== 'undefined')
{
  module.exports = jQuery.appnet;
}
