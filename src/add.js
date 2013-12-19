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
    addChained();
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
    args = $.extend({}, args, argsIn);
    return $.appnet.core.call(url, vars.end.method, args, vars.data);
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

  function addChained()
  {
    $.appnet.all = {};
    addAll('getSubscriptions', $.appnet.channel.getUserSubscribed);
    addAllOne('getMessages', $.appnet.message.getChannel);
    addAllOne('getUserPosts', $.appnet.post.getUser);
    addAllOne('getFollowing', $.appnet.user.getFollowing);
    addAllOne('getFollowers', $.appnet.user.getFollowers);
    addAllList('getChannelList', $.appnet.channel.getList);
    addAllList('getUserList', $.appnet.user.getList);
  }

  function addAll(name, single)
  {
    $.appnet.all[name] = allFromSingle(single);
  }

  function addAllOne(name, single)
  {
    $.appnet.all[name] = function (target, args)
    {
      var callWithTarget = function (a) {
        return single(target, a);
      };
      return allFromSingle(callWithTarget)(args);
    };
  }

  function allFromSingle(single)
  {
    return function (args)
    {
      if (! args)
      {
        args = {};
      }
      args.count = 200;
      var result = [];

      function fetchMore(response)
      {
        if ($.wait !== undefined)
        {
          response = JSON.parse(response.toString());
        }
        result = result.concat(response.data);
        if (response.meta.more)
        {
          args.before_id = response.meta.min_id;
          var promise = single(args);
          return promise.then(fetchMore);
        }
        else
        {
          var meta = {};
          if (response.meta.max_id)
          {
            meta.max_id = response.meta.max_id;
          }
          return {
            data: result,
            meta: meta
          };
        }
      }

      var first = single(args);
      return first.then(fetchMore);
    };
  }

  function addAllList(name, single)
  {
    $.appnet.all[name] = function (list, args)
    {
      var start = 0;
      var end = start + (list.length < 200 ? list.length : 200);
      var result = [];

      function fetchMore(response)
      {
        if ($.wait !== undefined)
        {
          response = JSON.parse(response.toString());
        }
        result = result.concat(response.data);
        start += 200;
        end = start + (list.length < start + 200 ? list.length : 200);
        if (start < list.length)
        {
          var promise = single(list.slice(start, end), args);
          return promise.then(fetchMore);
        }
        else
        {
          return { data: result };
        }
      }

      var first = single(list.slice(start, end), args);
      return first.then(fetchMore);
    };
  }

  run($.appnet.endpoints);

}(jQuery));
