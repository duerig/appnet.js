/*
 * add.js
 *
 * Evaluate the endpoints json and add all the appropriate endpoint methods.
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';

  function run(endpoints)
  {
    addTypes(endpoints.stream_types);
    addEndpoints(endpoints.base, endpoints.endpoints);
  }

  function addTypes(types)
  {
    var i = 0;
    for (i = 0; i < types.length; i += 1)
    {
      $.appnet[types[i]] = {};
    }
  }

  function addEndpoints(base, endpoints)
  {
    var i = 0;
    for (i = 0; i < endpoints.length; i += 1)
    {
      var group = $.appnet[endpoints[i].group];
      if (! group)
      {
        console.log('Invalid group: ' + endpoints[i].group);
        console.dir(endpoints[i]);
      }
      else
      {
        addEndpoint(base, group, endpoints[i]);
      }
    }
  }

  function call(vars, argsIn)
  {
    var prefix = null;
    var suffix = null;
    if (vars.end.url.length > 0)
    {
      prefix = vars.end.url[0];
    }
    if (vars.end.url.length > 1)
    {
      suffix = vars.end.url[1];
    }
    var url = $.appnet.core.makeUrl([vars.base, prefix, vars.first,
                                     suffix, vars.second]);
    var args = {};
    if (vars.list)
    {
      args.ids = vars.list.join(',');
    }
    $.extend(args, argsIn);
    return $.appnet.core.call(url, vars.end.type, args, vars.data);
  }

  function addEndpoint(base, group, end)
  {
    if (end.url_params.length === 0 &&
        end.data_params.length === 0 &&
        end.array_params.length === 0)
    {
      group[end.name] = function (args) {
        return call({ base: base, end: end }, args);
      };
    }
    else if (end.url_params.length === 1 &&
             end.data_params.length === 0 &&
             end.array_params.length === 0)
    {
      group[end.name] = function (first, args) {
        return call({ base: base, end: end, first: first }, args);
      };
    }
    else if (end.url_params.length === 2 &&
             end.data_params.length === 0 &&
             end.array_params.length === 0)
    {
      group[end.name] = function (first, second, args) {
        return call({ base: base, end: end, first: first, second: second }, args);
      };
    }
    else if (end.url_params.length === 0 &&
             end.data_params.length === 1 &&
             end.array_params.length === 0)
    {
      group[end.name] = function (data, args) {
        return call({ base: base, end: end, data: data }, args);
      };
    }
    else if (end.url_params.length === 1 &&
             end.data_params.length === 1 &&
             end.array_params.length === 0)
    {
      group[end.name] = function (first, data, args) {
        return call({ base: base, end: end, first: first, data: data }, args);
      };
    }
    else if (end.url_params.length === 2 &&
             end.data_params.length === 1 &&
             end.array_params.length === 0)
    {
      group[end.name] = function (first, second, data, args) {
        return call({ base: base, end: end, first: first, second: second, data: data },
             args);
      };
    }
    else if (end.url_params.length === 0 &&
             end.data_params.length === 0 &&
             end.array_params.length === 1)
    {
      group[end.name] = function (list, args) {
        return call({ base: base, end: end, list: list }, args);
      };
    }
    else if (end.url_params.length === 1 &&
             end.data_params.length === 0 &&
             end.array_params.length === 1)
    {
      group[end.name] = function (first, list, args) {
        return call({ base: base, end: end, first: first, list: list }, args);
      };
    }
    else if (end.url_params.length === 2 &&
             end.data_params.length === 0 &&
             end.array_params.length === 1)
    {
      group[end.name] = function (first, second, list, args) {
        return call({ base: base, end: end, first: first, second: second, list: list },
             args);
      };
    }
    else if (end.url_params.length === 0 &&
             end.data_params.length === 1 &&
             end.array_params.length === 1)
    {
      group[end.name] = function (data, list, args) {
        return call({ base: base, end: end, data: data, list: list }, args);
      };
    }
    else if (end.url_params.length === 1 &&
             end.data_params.length === 1 &&
             end.array_params.length === 1)
    {
      group[end.name] = function (first, data, list, args) {
        return call({ base: base, end: end, first: first, data: data, list: list },
             args);
      };
    }
    else if (end.url_params.length === 2 &&
             end.data_params.length === 1 &&
             end.array_params.length === 1)
    {
      group[end.name] = function (first, second, data, list, args) {
        return call({ base: base, end: end, first: first, second: second,
               data: data, list: list }, args);
      };
    }
    else
    {
      console.log('Skipping ' + end.group + '.' + end.name);
    }
  }

  run($.appnet.endpoints);

}(jQuery));
