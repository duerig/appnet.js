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
      $.appnet()[types[i]] = {};
    }
  }

  function addEndpoints(base, endpoints)
  {
    var i = 0;
    for (i = 0; i < endpoints.length; i += 1)
    {
      var group = $.appnet()[endpoints[i].group];
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

  function call(vars, argsIn, success, failure)
  {
    var url = $.appnet().core.makeUrl([vars.base, vars.end.prefix, vars.first,
                                       vars.end.suffix, vars.second]);
    var args = {};
    if (vars.list)
    {
      args.ids = vars.list.join(',');
    }
    $.extend(args, argsIn);
    $.appnet().core.call(url, vars.end.type, args, vars.success, vars.failure);
  }

  function addEndpoint(base, group, end)
  {
    if (end.params === '0')
    {
      console.log($.appnet().core.makeUrl([base, end.prefix]));
    }
    else if (end.params === '1')
    {
      console.log($.appnet().core.makeUrl([base, end.prefix, '1111', end.suffix]));
    }
    else if (end.params === '2')
    {
      console.log($.appnet().core.makeUrl([base, end.prefix, '1111', end.suffix, '2222']));
    }
    if (end.params === '0' &&
        end.usesdata === '0' &&
        end.arrayparam === '0')
    {
      group[end.name] = function (args, success, failure) {
        call({ base: base, end: end },
             args, success, failure);
      };
    }
    else if (end.params === '1' &&
             end.usesdata === '0' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (first, args, success, failure) {
        call({ base: base, end: end, first: first },
             args, success, failure);
      };
    }
    else if (end.params === '2' &&
             end.usesdata === '0' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (first, second, args, success, failure) {
        call({ base: base, end: end, first: first, second: second },
             args, success, failure);
      };
    }
    else if (end.params === '0' &&
             end.usesdata === '1' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (data, args, success, failure) {
        call({ base: base, end: end, data: data },
             args, success, failure);
      };
    }
    else if (end.params === '1' &&
             end.usesdata === '1' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (first, data, args, success, failure) {
        call({ base: base, end: end, first: first, data: data },
             args, success, failure);
      };
    }
    else if (end.params === '2' &&
             end.usesdata === '1' &&
             end.arrayparam === '0')
    {
      group[end.name] = function (first, second, data, args, success, failure) {
        call({ base: base, end: end, first: first, second: second, data: data },
             args, success, failure);
      };
    }
    else if (end.params === '0' &&
             end.usesdata === '0' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (list, args, success, failure) {
        call({ base: base, end: end, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '1' &&
             end.usesdata === '0' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (first, list, args, success, failure) {
        call({ base: base, end: end, first: first, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '2' &&
             end.usesdata === '0' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (first, second, list, args, success, failure) {
        call({ base: base, end: end, first: first, second: second, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '0' &&
             end.usesdata === '1' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (data, list, args, success, failure) {
        call({ base: base, end: end, data: data, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '1' &&
             end.usesdata === '1' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (first, data, list, args, success, failure) {
        call({ base: base, end: end, first: first, data: data, list: list },
             args, success, failure);
      };
    }
    else if (end.params === '2' &&
             end.usesdata === '1' &&
             end.arrayparam === '1')
    {
      group[end.name] = function (first, second, data, list, args, success, failure) {
        call({ base: base, end: end, first: first, second: second,
               data: data, list: list },
             args, success, failure);
      };
    }
  }

  run($.appnet().endpoints);

}(jQuery));
