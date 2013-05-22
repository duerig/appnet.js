/*
 * base.js
 *
 * Base app.net library file. Sets up the single global appnet object.
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';
  var appnet = {
    userToken: null,
    appToken: null,
    endpoints: null,
    core: {}
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
