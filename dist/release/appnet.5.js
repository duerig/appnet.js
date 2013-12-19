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

/*global jQuery: true */
(function ($) {
'use strict';
  $.appnet.endpoints = {
    "format_version": 3,
    "data_version": 5,
    "scopes": {
        "basic": "See basic information about this user",
        "stream": "Read this user's stream",
        "email": "Access this user's email address",
        "write_post": "Create a new post as this user",
        "follow": "Add or remove follows (or mutes) for this user",
        "public_messages": "Send and receive public messages as this user",
        "messages": "Send and receive public and private messages as this user",
        "update_profile": "Update a user's name, images, and other profile information",
        "files": "Manage a user's files. This is not needed for uploading files.",
        "export": "Bulk export all of this user's App.net data. This is intended only for backup services, not day-to-day App.net client use. Users will be shown an extra warning when this scope is requested due to the sensitivity of this data."
    },
    "stream_types": [
        "user",
        "post",
        "channel",
        "message",
        "file",
        "AppStream",
        "UserStream",
        "filter",
        "interaction",
        "marker",
        "text",
        "token",
        "place",
        "explore",
        "config"
    ],
    "migrations": [ ],
    "parameter_category": {
        "pagination":      [ "since_id", "before_id", "count" ],
        "general_user":    [ "include_annotations", "include_user_annotations", "include_html",
                             "connection_id" ],
        "general_post":    [ "include_muted", "include_deleted", "include_directed_posts", "include_machine",
                             "include_starred_by", "include_reposters", "include_annotations", 
                             "include_post_annotations", "include_user_annotations", "include_html",
                             "connection_id" ],
        "general_channel": [ "channel_types", "include_marker", "include_read", "include_recent_message", 
                             "include_annotations", "include_user_annotations", "include_message_annotations",
                             "connection_id" ],
        "general_message": [ "include_muted", "include_deleted", "include_machine",
                             "include_annotations", "include_user_annotations", "include_message_annotations", 
                             "include_html", "connection_id" ],
        "general_file":    [ "file_types", "include_incomplete", "include_private",
                             "include_annotations", "include_file_annotations", "include_user_annotations",
   			     "connection_id" ],

        "user":            [ "name", "locale", "timezone", "description" ],
        "avatar":          "image",
        "cover":           "image",
        "post":            [ "text", "reply_to", "machine_only", "annotations", "entities" ],
        "channel":         [ "readers", "writers", "editors", "annotations", "type" ],
        "message":         [ "text", "reply_to", "annotations", "entities", "machine_only", "destinations" ],
        "file":            [ "kind", "type", "name", "public", "annotations" ],
        "content":         "content",
        "AppStream":       [ "object_types", "type", "filter_id", "key" ],
	"UserStream":      [ ],
        "filter":          [ "name", "match_policy", "clauses"],
        "marker":          [ "id", "name", "percentage" ],
        "post_or_message": [ "text" ],
	"stream_facet":    [ "has_oembed_photo" ],
        "post_search":     [ "index", "order", "query", "text", "hashtags", "links",
	                     "link_domains", "mentions", "leading_mentions",
        		     "annotation_types", "attachment_types", "crosspost_url",
			     "crosspost_domain", "place_id", "is_reply", "is_directed",
                    	     "has_location", "has_checkin", "is_crosspost",
                    	     "has_attachment", "has_oembed_photo", "has_oembed_video",
                    	     "has_oembed_html5video", "has_oembed_rich", "language",
                    	     "client_id", "creator_id", "reply_to", "thread_id" ],
	"user_search":     [ "q", "count" ],
	"channel_search":  [ "order", "q", "type", "creator_id", "tags" ],
        "place_search":    [ "latitude", "longitude", "q", "radius", "count", "remove_closed",
                             "altitude", "horizontal_accuracy", "vertical_accuracy" ],
        "user_ids":    [ "ids" ],
        "post_ids":    [ "ids" ],
        "channel_ids": [ "ids" ],
        "message_ids": [ "ids" ],
        "file_ids":    [ "ids" ]
    },
    "base": "https://alpha-api.app.net/stream/0/",
    "endpoints": [
        {
            "group": "user",
            "name": "get",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "GET",
            "url": [
                "users/"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve a User",
            "link": "http://developers.app.net/docs/resources/user/lookup/#retrieve-a-user"
        },
        {
            "group": "user",
            "name": "update",
            "url_params": [],
            "data_params": [
                "user"
            ],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "PUT",
            "url": [
                "users/me"
            ],
            "token": "User",
            "scope": "update_profile",
            "description": "Update a User",
            "link": "http://developers.app.net/docs/resources/user/profile/#update-a-user"
        },
        {
            "group": "user",
            "name": "partialUpdate",
            "url_params": [],
            "data_params": [
                "user"
            ],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "PATCH",
            "url": [
                "users/me"
            ],
            "token": "User",
            "scope": "update_profile",
            "description": "Partially Update a User",
            "link": "http://developers.app.net/docs/resources/user/profile/#partially-update-a-user"
        },
        {
            "group": "user",
            "name": "getAvatar",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "users/",
                "/avatar"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve a User's avatar image",
            "link": "http://developers.app.net/docs/resources/user/profile/#retrieve-a-users-avatar-image"
        },
        {
            "group": "user",
            "name": "updateAvatar",
            "url_params": [],
            "data_params": [
                "avatar"
            ],
            "array_params": [],
	    "get_params": [ ],
            "method": "POST-RAW",
            "url": [
                "users/me/avatar"
            ],
            "token": "User",
            "scope": "update_profile",
            "description": "Update a User's avatar image",
            "link": "http://developers.app.net/docs/resources/user/profile/#update-a-users-avatar-image"
        },
        {
            "group": "user",
            "name": "getCover",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "users/",
                "/cover"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve a User's cover image",
            "link": "http://developers.app.net/docs/resources/user/profile/#retrieve-a-users-cover-image"
        },
        {
            "group": "user",
            "name": "updateCover",
            "url_params": [],
            "data_params": [
                "cover"
            ],
            "array_params": [],
	    "get_params": [ ],
            "method": "POST-RAW",
            "url": [
                "users/me/cover"
            ],
            "token": "User",
            "scope": "update_profile",
            "description": "Update a User's cover image",
            "link": "http://developers.app.net/docs/resources/user/profile/#update-a-users-cover-image"
        },
        {
            "group": "user",
            "name": "follow",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "POST",
            "url": [
                "users/",
                "/follow"
            ],
            "token": "User",
            "scope": "follow",
            "description": "Follow a User",
            "link": "http://developers.app.net/docs/resources/user/following/#follow-a-user"
        },
        {
            "group": "user",
            "name": "unfollow",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "DELETE",
            "url": [
                "users/",
                "/follow"
            ],
            "token": "User",
            "scope": "follow",
            "description": "Unfollow a User",
            "link": "http://developers.app.net/docs/resources/user/following/#unfollow-a-user"
        },
        {
            "group": "user",
            "name": "mute",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "POST",
            "url": [
                "users/",
                "/mute"
            ],
            "token": "User",
            "scope": "follow",
            "description": "Mute a User",
            "link": "http://developers.app.net/docs/resources/user/muting/#mute-a-user"
        },
        {
            "group": "user",
            "name": "unmute",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "DELETE",
            "url": [
                "users/",
                "/mute"
            ],
            "token": "User",
            "scope": "follow",
            "description": "Unmute a User",
            "link": "http://developers.app.net/docs/resources/user/muting/#unmute-a-user"
        },
        {
            "group": "user",
            "name": "block",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "POST",
            "url": [
                "users/",
                "/block"
            ],
            "token": "User",
            "scope": "follow",
            "description": "Block a User",
            "link": "http://developers.app.net/docs/resources/user/blocking/#block-a-user"
        },
        {
            "group": "user",
            "name": "unblock",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "DELETE",
            "url": [
                "users/",
                "/block"
            ],
            "token": "User",
            "scope": "follow",
            "description": "Unblock a User",
            "link": "http://developers.app.net/docs/resources/user/blocking/#unblock-a-user"
        },
        {
            "group": "user",
            "name": "getList",
            "url_params": [],
            "data_params": [],
            "array_params": [
                "user_ids"
            ],
	    "get_params": [ "general_user" ],
            "method": "GET",
            "url": [
                "users"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve multiple Users",
            "link": "http://developers.app.net/docs/resources/user/lookup/#retrieve-multiple-users"
        },
        {
            "group": "user",
            "name": "search",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "user_search", "general_user" ],
            "method": "GET",
            "url": [
                "users/search"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Search for Users",
            "link": "http://developers.app.net/docs/resources/user/lookup/#search-for-users"
        },
        {
            "group": "user",
            "name": "getFollowing",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user", "pagination" ],
            "method": "GET",
            "url": [
                "users/",
                "/following"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve Users a User is following",
            "link": "http://developers.app.net/docs/resources/user/following/#list-users-a-user-is-following"
        },
        {
            "group": "user",
            "name": "getFollowers",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user", "pagination" ],
            "method": "GET",
            "url": [
                "users/",
                "/followers"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve Users following a User",
            "link": "http://developers.app.net/docs/resources/user/following/#list-users-following-a-user"
        },
        {
            "group": "user",
            "name": "getFollowingIds",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "users/",
                "/following/ids"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve IDs of Users a User is following",
            "link": "http://developers.app.net/docs/resources/user/following/#list-user-ids-a-user-is-following"
        },
        {
            "group": "user",
            "name": "getFollowerIds",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "users/",
                "/followers/ids"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve IDs of Users following a User",
            "link": "http://developers.app.net/docs/resources/user/following/#list-user-ids-following-a-user"
        },
        {
            "group": "user",
            "name": "getMuted",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "GET",
            "url": [
                "users/",
                "/muted"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve muted Users",
            "link": "http://developers.app.net/docs/resources/user/muting/#list-muted-users"
        },
        {
            "group": "user",
            "name": "getMutedList",
            "url_params": [],
            "data_params": [],
            "array_params": [
                "user_ids"
            ],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "users/muted/ids"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Retrieve muted User IDs for multiple Users",
            "link": "http://developers.app.net/docs/resources/user/muting/#retrieve-muted-user-ids-for-multiple-users"
        },
        {
            "group": "user",
            "name": "getBlocked",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "GET",
            "url": [
                "users/",
                "/blocked"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve blocked Users",
            "link": "http://developers.app.net/docs/resources/user/blocking/#list-blocked-users"
        },
        {
            "group": "user",
            "name": "getBlockedList",
            "url_params": [],
            "data_params": [],
            "array_params": [
                "user_ids"
            ],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "users/blocked/ids"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Retrieve blocked User IDs for multiple Users",
            "link": "http://developers.app.net/docs/resources/user/blocking/#retrieve-blocked-user-ids-for-multiple-users"
        },
        {
            "group": "user",
            "name": "getReposters",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "GET",
            "url": [
                "posts/",
                "/reposters"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve Users who reposted a Post",
            "link": "http://developers.app.net/docs/resources/user/post-interactions/#list-users-who-have-reposted-a-post"
        },
        {
            "group": "user",
            "name": "getStars",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_user" ],
            "method": "GET",
            "url": [
                "posts/",
                "/stars"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve Users who starred a Post",
            "link": "http://developers.app.net/docs/resources/user/post-interactions/#list-users-who-have-starred-a-post"
        },
        {
            "group": "post",
            "name": "create",
            "url_params": [],
            "data_params": [
                "post"
            ],
            "array_params": [],
	    "get_params": [ "general_post" ],
            "method": "POST",
            "url": [
                "posts"
            ],
            "token": "User",
            "scope": "write_post",
            "description": "Create a Post",
            "link": "http://developers.app.net/docs/resources/post/lifecycle/#create-a-post"
        },
        {
            "group": "post",
            "name": "get",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post" ],
            "method": "GET",
            "url": [
                "posts/"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve a Post",
            "link": "http://developers.app.net/docs/resources/post/lookup/#retrieve-a-post"
        },
        {
            "group": "post",
            "name": "destroy",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post" ],
            "method": "DELETE",
            "url": [
                "posts/"
            ],
            "token": "User",
            "scope": "write_post",
            "description": "Delete a Post",
            "link": "http://developers.app.net/docs/resources/post/lifecycle/#delete-a-post"
        },
        {
            "group": "post",
            "name": "repost",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post" ],
            "method": "POST",
            "url": [
                "posts/",
                "/repost"
            ],
            "token": "User",
            "scope": "write_post",
            "description": "Repost a Post",
            "link": "http://developers.app.net/docs/resources/post/reposts/#repost-a-post"
        },
        {
            "group": "post",
            "name": "unrepost",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post" ],
            "method": "DELETE",
            "url": [
                "posts/",
                "/repost"
            ],
            "token": "User",
            "scope": "write_post",
            "description": "Unrepost a Post",
            "link": "http://developers.app.net/docs/resources/post/reposts/#unrepost-a-post"
        },
        {
            "group": "post",
            "name": "star",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post" ],
            "method": "POST",
            "url": [
                "posts/",
                "/star"
            ],
            "token": "User",
            "scope": "write_post",
            "description": "Star a Post",
            "link": "http://developers.app.net/docs/resources/post/stars/#star-a-post"
        },
        {
            "group": "post",
            "name": "unstar",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post" ],
            "method": "DELETE",
            "url": [
                "posts/",
                "/star"
            ],
            "token": "User",
            "scope": "write_post",
            "description": "Unstar a Post",
            "link": "http://developers.app.net/docs/resources/post/stars/#unstar-a-post"
        },
        {
            "group": "post",
            "name": "getList",
            "url_params": [],
            "data_params": [],
            "array_params": [
                "post_ids"
            ],
	    "get_params": [ "general_post" ],
            "method": "GET",
            "url": [
                "posts"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve multiple Posts",
            "link": "http://developers.app.net/docs/resources/post/lookup/#retrieve-multiple-posts"
        },
        {
            "group": "post",
            "name": "getUser",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post", "pagination" ],
            "method": "GET",
            "url": [
                "users/",
                "/posts"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve a User's posts",
            "link": "http://developers.app.net/docs/resources/post/streams/#retrieve-posts-created-by-a-user"
        },
        {
            "group": "post",
            "name": "getUserStarred",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post", "pagination" ],
            "method": "GET",
            "url": [
                "users/",
                "/stars"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve a User's starred posts",
            "link": "http://developers.app.net/docs/resources/post/stars/#retrieve-posts-starred-by-a-user"
        },
        {
            "group": "post",
            "name": "getUserMentions",
            "url_params": [
                "user_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post", "pagination" ],
            "method": "GET",
            "url": [
                "users/",
                "/mentions"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve Posts mentioning a User",
            "link": "http://developers.app.net/docs/resources/post/streams/#retrieve-posts-mentioning-a-user"
        },
        {
            "group": "post",
            "name": "getHashtag",
            "url_params": [
                "hashtag"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post", "pagination" ],
            "method": "GET",
            "url": [
                "posts/tag/"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve Posts containing a hashtag",
            "link": "http://developers.app.net/docs/resources/post/streams/#retrieve-tagged-posts"
        },
        {
            "group": "post",
            "name": "getThread",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post", "pagination" ],
            "method": "GET",
            "url": [
                "posts/",
                "/replies"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve replies to a Post",
            "link": "http://developers.app.net/docs/resources/post/replies"
        },
        {
            "group": "post",
            "name": "getUserStream",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post", "pagination", "stream_facet" ],
            "method": "GET",
            "url": [
                "posts/stream"
            ],
            "token": "User",
            "scope": "stream",
            "description": "Retrieve a User's personalized stream",
            "link": "http://developers.app.net/docs/resources/post/streams/#retrieve-a-users-personalized-stream"
        },
        {
            "group": "post",
            "name": "getUnifiedStream",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post", "pagination", "stream_facet" ],
            "method": "GET",
            "url": [
                "posts/stream/unified"
            ],
            "token": "User",
            "scope": "stream",
            "description": "Retrieve a User's unified stream",
            "link": "http://developers.app.net/docs/resources/post/streams/#retrieve-a-users-unified-stream"
        },
        {
            "group": "post",
            "name": "getGlobal",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post", "pagination" ],
            "method": "GET",
            "url": [
                "posts/stream/global"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Retrieve the Global stream",
            "link": "http://developers.app.net/docs/resources/post/streams/#retrieve-the-global-stream"
        },
        {
            "group": "post",
            "name": "report",
            "url_params": [
                "post_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_post" ],
            "method": "POST",
            "url": [
                "posts/",
                "/report"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Report a Post",
            "link": "http://developers.app.net/docs/resources/post/report/#report-a-post"
        },
        {
            "group": "post",
            "name": "search",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "post_search", "general_post" ],
            "method": "GET",
            "url": [
                "posts/search"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Search for Posts",
            "link": "http://developers.app.net/docs/resources/post/search/#search-for-posts"
        },
        {
            "group": "channel",
            "name": "getUserSubscribed",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_channel", "pagination" ],
            "method": "GET",
            "url": [
                "channels"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Get current user's subscribed channels",
            "link": "http://developers.app.net/docs/resources/channel/subscriptions/#get-current-users-subscribed-channels"
        },
        {
            "group": "channel",
            "name": "create",
            "url_params": [],
            "data_params": [
                "channel"
            ],
            "array_params": [],
	    "get_params": [ "general_channel" ],
            "method": "POST",
            "url": [
                "channels"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Create a Channel",
            "link": "http://developers.app.net/docs/resources/channel/lifecycle/#create-a-channel"
        },
        {
            "group": "channel",
            "name": "get",
            "url_params": [
                "channel_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_channel" ],
            "method": "GET",
            "url": [
                "channels/"
            ],
            "token": "Varies",
            "scope": "messages",
            "description": "Retrieve a Channel",
            "link": "http://developers.app.net/docs/resources/channel/lookup/#retrieve-a-channel"
        },
        {
            "group": "channel",
            "name": "getList",
            "url_params": [],
            "data_params": [],
            "array_params": [
                "channel_ids"
            ],
	    "get_params": [ "general_channel" ],
            "method": "GET",
            "url": [
                "channels"
            ],
            "token": "Varies",
            "scope": "messages",
            "description": "Retrieve multiple Channels",
            "link": "http://developers.app.net/docs/resources/channel/lookup/#retrieve-multiple-channels"
        },
        {
            "group": "channel",
            "name": "getCreated",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_channel", "pagination" ],
            "method": "GET",
            "url": [
                "users/me/channels"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Retrieve my Channels",
            "link": "http://developers.app.net/docs/resources/channel/lookup/#retrieve-my-channels"
        },
        {
            "group": "channel",
            "name": "getUnreadCount",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "users/me/channels/pm/num_unread"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Retrieve number of unread PM Channels",
            "link": "http://developers.app.net/docs/resources/channel/lookup/#retrieve-number-of-unread-pm-channels"
        },
        {
            "group": "channel",
            "name": "getUnreadBroadcastCount",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "users/me/channels/broadcast/num_unread"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Retrieve number of unread Broadcast Channels",
            "link": "http://developers.app.net/docs/resources/channel/lookup/#retrieve-number-of-unread-broadcast-channels"
        },
        {
            "group": "channel",
            "name": "markBroadcastChannelsRead",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "DELETE",
            "url": [
                "users/me/channels/broadcast/num_unread"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Mark all Broadcast Channels as read",
            "link": "http://developers.app.net/docs/resources/channel/lookup/#mark-all-broadcast-channels-as-read"
        },
        {
            "group": "channel",
            "name": "update",
            "url_params": [
                "channel_id"
            ],
            "data_params": [
                "channel"
            ],
            "array_params": [],
	    "get_params": [ "general_channel" ],
            "method": "PUT",
            "url": [
                "channels/"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Update a Channel",
            "link": "http://developers.app.net/docs/resources/channel/lifecycle/#update-a-channel"
        },
        {
            "group": "channel",
	    "name": "deactivate",
            "url_params": [
                "channel_id"
            ],
            "data_params": [
                "channel"
            ],
            "array_params": [],
	    "get_params": [ "general_channel" ],
            "method": "DELETE",
            "url": [
                "channels/"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Deactivate a Channel",
            "link": "http://developers.app.net/docs/resources/channel/lifecycle/#deactivate-a-channel"
        },
        {
            "group": "channel",
            "name": "subscribe",
            "url_params": [
                "channel_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_channel" ],
            "method": "POST",
            "url": [
                "channels/",
                "/subscribe"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Subscribe to a Channel",
            "link": "http://developers.app.net/docs/resources/channel/subscriptions/#subscribe-to-a-channel"
        },
        {
            "group": "channel",
            "name": "unsubscribe",
            "url_params": [
                "channel_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_channel" ],
            "method": "DELETE",
            "url": [
                "channels/",
                "/subscribe"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Unsubscribe from a Channel",
            "link": "http://developers.app.net/docs/resources/channel/subscriptions/#unsubscribe-from-a-channel"
        },
        {
            "group": "channel",
            "name": "getSubscribers",
            "url_params": [
                "channel_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_channel", "pagination" ],
            "method": "GET",
            "url": [
                "channels/",
                "/subscribers"
            ],
            "token": "None",
            "scope": "messages",
            "description": "Retrieve users subscribed to a Channel",
            "link": "http://developers.app.net/docs/resources/channel/subscriptions/#retrieve-users-subscribed-to-a-channel"
        },
        {
            "group": "channel",
            "name": "getSubscriberIds",
            "url_params": [
                "channel_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "channels/",
                "/subscribers/ids"
            ],
            "token": "None",
            "scope": "messages",
            "description": "Retrieve user ids subscribed to a Channel",
            "link": "http://developers.app.net/docs/resources/channel/subscriptions/#retrieve-user-ids-subscribed-to-a-channel"
        },
        {
            "group": "channel",
            "name": "getSubscriberIdList",
            "url_params": [],
            "data_params": [],
            "array_params": [
                "channel_ids"
            ],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "channels/subscribers/ids"
            ],
            "token": "Any",
            "scope": "messages",
            "description": "Retrieve user ids subscribed to multiple Channels",
            "link": "http://developers.app.net/docs/resources/channel/subscriptions/#retrieve-user-ids-subscribed-to-a-channel"
        },
        {
            "group": "channel",
            "name": "mute",
            "url_params": [
                "channel_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_channel" ],
            "method": "POST",
            "url": [
                "channels/",
                "/mute"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Mute a Channel",
            "link": "http://developers.app.net/docs/resources/channel/muting/#mute-a-channel"
        },
        {
            "group": "channel",
            "name": "unmute",
            "url_params": [
                "channel_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_channel" ],
            "method": "DELETE",
            "url": [
                "channels/",
                "/mute"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Unmute a Channel",
            "link": "http://developers.app.net/docs/resources/channel/muting/#unmute-a-channel"
        },
        {
            "group": "channel",
            "name": "getMuted",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_channel" ],
            "method": "GET",
            "url": [
                "users/me/channels/muted"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Get current user's muted Channels",
            "link": "http://developers.app.net/docs/resources/channel/muting/#get-current-users-muted-channels"
        },
        {
            "group": "channel",
            "name": "search",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "channel_search", "general_channel" ],
            "method": "GET",
            "url": [
                "channels/search"
            ],
            "token": "User",
            "scope": "public_messages",
            "description": "Search for Channels",
            "link": "http://developers.app.net/docs/resources/channel/search/#search-for-channels"
        },
        {
            "group": "message",
            "name": "getChannel",
            "url_params": [
                "channel_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_message", "pagination" ],
            "method": "GET",
            "url": [
                "channels/",
                "/messages"
            ],
            "token": "None",
            "scope": "messages",
            "description": "Retrieve the Messages in a Channel",
            "link": "http://developers.app.net/docs/resources/message/lifecycle/#retrieve-the-messages-in-a-channel"
        },
        {
            "group": "message",
            "name": "create",
            "url_params": [
                "channel_id"
            ],
            "data_params": [
                "message"
            ],
            "array_params": [],
	    "get_params": [ "general_message" ],
            "method": "POST",
            "url": [
                "channels/",
                "/messages"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Create a Message",
            "link": "http://developers.app.net/docs/resources/message/lifecycle/#create-a-message"
        },
        {
            "group": "message",
            "name": "get",
            "url_params": [
                "channel_id",
                "message_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_message" ],
            "method": "GET",
            "url": [
                "channels/",
                "/messages/"
            ],
            "token": "None",
            "scope": "messages",
            "description": "Retrieve a Message",
            "link": "http://developers.app.net/docs/resources/message/lookup/#retrieve-a-message"
        },
        {
            "group": "message",
            "name": "getList",
            "url_params": [],
            "data_params": [],
            "array_params": [
                "message_ids"
            ],
	    "get_params": [ "general_message" ],
            "method": "GET",
            "url": [
                "channels/messages"
            ],
            "token": "None",
            "scope": "messages",
            "description": "Retrieve multiple Messages",
            "link": "http://developers.app.net/docs/resources/message/lookup/#retrieve-multiple-messages"
        },
        {
            "group": "message",
            "name": "getUser",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_message" ],
            "method": "GET",
            "url": [
                "users/me/messages"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Retrieve my Messages",
            "link": "http://developers.app.net/docs/resources/message/lookup/#retrieve-my-messages"
        },
        {
            "group": "message",
            "name": "destroy",
            "url_params": [
                "channel_id",
                "message_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_message" ],
            "method": "DELETE",
            "url": [
                "channels/",
                "/messages/"
            ],
            "token": "User",
            "scope": "messages",
            "description": "Delete a Message",
            "link": "http://developers.app.net/docs/resources/message/lifecycle/#delete-a-message"
        },
        {
            "group": "file",
            "name": "create",
            "url_params": [],
            "data_params": [
                "file"
            ],
            "array_params": [],
	    "get_params": [ "general_file" ],
            "method": "POST-RAW",
            "url": [
                "files"
            ],
            "token": "User",
            "scope": "files",
            "description": "Create a File",
            "link": "http://developers.app.net/docs/resources/file/lifecycle/#create-a-file"
        },
        {
            "group": "file",
            "name": "createPlaceholder",
            "url_params": [],
            "data_params": [
                "file"
            ],
            "array_params": [],
	    "get_params": [ "general_file" ],
            "method": "POST",
            "url": [
                "files"
            ],
            "token": "User",
            "scope": "files",
            "description": "Create a File Placeholder",
            "link": "http://developers.app.net/docs/resources/file/lifecycle/#create-a-file"
        },
        {
            "group": "file",
            "name": "get",
            "url_params": [
                "file_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_file" ],
            "method": "GET",
            "url": [
                "files/"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Retrieve a File",
            "link": "http://developers.app.net/docs/resources/file/lookup/#retrieve-a-file"
        },
        {
            "group": "file",
            "name": "getList",
            "url_params": [],
            "data_params": [],
            "array_params": [
                "file_ids"
            ],
	    "get_params": [ "general_file" ],
            "method": "GET",
            "url": [
                "files"
            ],
            "token": "User",
            "scope": "files",
            "description": "Retrieve multiple Files",
            "link": "http://developers.app.net/docs/resources/file/lookup/#retrieve-multiple-files"
        },
        {
            "group": "file",
            "name": "destroy",
            "url_params": [
                "file_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_file" ],
            "method": "DELETE",
            "url": [
                "files/"
            ],
            "token": "User",
            "scope": "files",
            "description": "Delete a File",
            "link": "http://developers.app.net/docs/resources/file/lifecycle/#delete-a-file"
        },
        {
            "group": "file",
            "name": "getUser",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "general_file", "pagination" ],
            "method": "GET",
            "url": [
                "users/me/files"
            ],
            "token": "User",
            "scope": "files",
            "description": "Retrieve my Files",
            "link": "http://developers.app.net/docs/resources/file/lookup/#retrieve-my-files"
        },
        {
            "group": "file",
            "name": "update",
            "url_params": [
                "file_id"
            ],
            "data_params": [
                "file"
            ],
            "array_params": [],
	    "get_params": [ "general_file" ],
            "method": "PUT",
            "url": [
                "files/"
            ],
            "token": "User",
            "scope": "files",
            "description": "Update a File",
            "link": "http://developers.app.net/docs/resources/file/lifecycle/#update-a-file"
        },
        {
            "group": "file",
            "name": "getContent",
            "url_params": [
                "file_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [  ],
            "method": "GET",
            "url": [
                "files/",
                "/content"
            ],
            "token": "User",
            "scope": "files",
            "description": "Get File content",
            "link": "http://developers.app.net/docs/resources/file/content/#get-file-content"
        },
        {
            "group": "file",
            "name": "setContent",
            "url_params": [
                "file_id"
            ],
            "data_params": [
                "content"
            ],
            "array_params": [],
	    "get_params": [ ],
            "method": "PUT",
            "url": [
                "files/",
                "/content"
            ],
            "token": "User",
            "scope": "files",
            "description": "Set File content",
            "link": "http://developers.app.net/docs/resources/file/content/#set-file-content"
        },
        {
            "group": "AppStream",
            "name": "create",
            "url_params": [],
            "data_params": [
                "stream"
            ],
            "array_params": [],
	    "get_params": [],
            "method": "POST",
            "url": [
                "streams"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Create a Stream",
            "link": "http://developers.app.net/docs/resources/stream/lifecycle/#create-a-stream"
        },
        {
            "group": "AppStream",
            "name": "get",
            "url_params": [
                "stream_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "GET",
            "url": [
                "streams/"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Retrieve a Stream",
            "link": "http://developers.app.net/docs/resources/stream/lifecycle/#retrieve-a-stream"
        },
        {
            "group": "AppStream",
            "name": "update",
            "url_params": [
                "stream_id"
            ],
            "data_params": [
                "stream"
            ],
            "array_params": [],
	    "get_params": [],
            "method": "PUT",
            "url": [
                "streams/"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Update a Stream",
            "link": "http://developers.app.net/docs/resources/stream/lifecycle/#update-a-stream"
        },
        {
            "group": "AppStream",
            "name": "destroy",
            "url_params": [
                "stream_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "DELETE",
            "url": [
                "streams/"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Delete a Stream",
            "link": "http://developers.app.net/docs/resources/stream/lifecycle/#delete-a-stream"
        },
        {
            "group": "AppStream",
            "name": "getAll",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "GET",
            "url": [
                "streams"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Retrieve all Streams for the current Token",
            "link": "http://developers.app.net/docs/resources/stream/lifecycle/#get-current-tokens-streams"
        },
        {
            "group": "AppStream",
            "name": "destroyAll",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "DELETE",
            "url": [
                "streams"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Delete all Streams for the current Token",
            "link": "http://developers.app.net/docs/resources/stream/lifecycle/#delete-all-of-the-current-users-streams"
        },
        {
            "group": "UserStream",
            "name": "destroy",
            "url_params": [
                "connection_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "DELETE",
            "url": [
                "streams/me/streams/"
            ],
            "token": "user",
            "scope": "basic",
            "description": "Delete a User Stream",
            "link": "http://developers.app.net/docs/resources/user-stream/lifecycle/#delete-a-user-stream"
        },
        {
            "group": "UserStream",
            "name": "destroySubscription",
            "url_params": [
                "connection_id",
		"subscription_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "DELETE",
            "url": [
                "streams/me/streams/"
            ],
            "token": "user",
            "scope": "basic",
            "description": "Delete a User Stream Subscription",
            "link": "http://developers.app.net/docs/resources/user-stream/lifecycle/#delete-a-user-stream-subscription"
        },
        {
            "group": "filter",
            "name": "create",
            "url_params": [],
            "data_params": [
                "filter"
            ],
            "array_params": [],
	    "get_params": [],
            "method": "POST",
            "url": [
                "filters"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Create a Filter",
            "link": "http://developers.app.net/docs/resources/filter/lifecycle/#create-a-filter"
        },
        {
            "group": "filter",
            "name": "get",
            "url_params": [
                "filter_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "GET",
            "url": [
                "filters/"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Retrieve a Filter",
            "link": "http://developers.app.net/docs/resources/filter/lifecycle/#retrieve-a-filter"
        },
        {
            "group": "filter",
            "name": "update",
            "url_params": [
                "filter_id"
            ],
            "data_params": [
                "filter"
            ],
            "array_params": [],
	    "get_params": [],
            "method": "PUT",
            "url": [
                "filters/"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Update a Filter",
            "link": "http://developers.app.net/docs/resources/filter/lifecycle/#update-a-filter"
        },
        {
            "group": "filter",
            "name": "destroy",
            "url_params": [
                "filter_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "DELETE",
            "url": [
                "filters/"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Delete a Filter",
            "link": "http://developers.app.net/docs/resources/filter/lifecycle/#delete-a-filter"
        },
        {
            "group": "filter",
            "name": "getUser",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "GET",
            "url": [
                "filters"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Get the current User's Filters",
            "link": "http://developers.app.net/docs/resources/filter/lifecycle/#get-current-users-filters"
        },
        {
            "group": "filter",
            "name": "destroyUser",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "DELETE",
            "url": [
                "filters"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Delete the current User's Filters",
            "link": "http://developers.app.net/docs/resources/filter/lifecycle/#delete-all-of-the-current-users-filters"
        },
        {
            "group": "interaction",
            "name": "get",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "pagination" ],
            "method": "GET",
            "url": [
                "users/me/interactions"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Retrieve Interactions with the current User",
            "link": "http://developers.app.net/docs/resources/interaction/"
        },
        {
            "group": "marker",
            "name": "update",
            "url_params": [],
            "data_params": [
                "marker"
            ],
            "array_params": [],
	    "get_params": [ ],
            "method": "POST",
            "url": [
                "posts/marker"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Update a Stream Marker",
            "link": "http://developers.app.net/docs/resources/stream-marker/#update-a-stream-marker"
        },
        {
            "group": "text",
            "name": "process",
            "url_params": [],
            "data_params": [
                "post_or_message"
            ],
            "array_params": [],
	    "get_params": [ ],
            "method": "POST",
            "url": [
                "text/process"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Process text",
            "link": "http://developers.app.net/docs/resources/text-processor/"
        },
        {
            "group": "token",
            "name": "get",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "token"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve the current token",
            "link": "http://developers.app.net/docs/resources/token/#retrieve-current-token"
        },
        {
            "group": "token",
            "name": "getAuthorizedIds",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "tokens/user_ids"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Retrieve authorized User IDs for an app",
            "link": "http://developers.app.net/docs/resources/token/#retrieve-authorized-user-ids-for-an-app"
        },
        {
            "group": "token",
            "name": "getAuthorized",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "apps/me/token"
            ],
            "token": "App",
            "scope": "basic",
            "description": "Retrieve authorized User tokens for an app",
            "link": "http://developers.app.net/docs/resources/token/#retrieve-authorized-user-tokens-for-an-app"
        },
        {
            "group": "place",
            "name": "get",
            "url_params": [
                "factual_id"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "places/"
            ],
            "token": "Any",
            "scope": "basic",
            "description": "Retrieve a Place",
            "link": "http://developers.app.net/docs/resources/place/#retrieve-a-place"
        },
        {
            "group": "place",
            "name": "search",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "place_search" ],
            "method": "GET",
            "url": [
                "places/search"
            ],
            "token": "User",
            "scope": "basic",
            "description": "Search for Places",
            "link": "http://developers.app.net/docs/resources/place/#search-for-a-place"
        },
        {
            "group": "explore",
            "name": "show",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [ ],
            "method": "GET",
            "url": [
                "posts/stream/explore"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve all Explore Streams",
            "link": "http://developers.app.net/docs/resources/explore/#retrieve-all-explore-streams"
        },
        {
            "group": "explore",
            "name": "get",
            "url_params": [
                "slug"
            ],
            "data_params": [],
            "array_params": [],
	    "get_params": [ "pagination" ],
            "method": "GET",
            "url": [
                "posts/stream/explore/"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve an Explore Stream",
            "link": "http://developers.app.net/docs/resources/explore/#retrieve-an-explore-stream"
        },
        {
            "group": "config",
            "name": "get",
            "url_params": [],
            "data_params": [],
            "array_params": [],
	    "get_params": [],
            "method": "GET",
            "url": [
                "config/"
            ],
            "token": "None",
            "scope": "basic",
            "description": "Retrieve the Configuration Object",
            "link": "http://developers.app.net/docs/resources/config/#retrieve-the-configuration-object"
        }
    ]
}
;
}(jQuery));

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
    return promise.fail(function (response) {
      var status;
      if (typeof exports !== 'undefined')
      {
        status = response.status;
      }
      else
      {
        status = response.statusCode();
      }
      if (status === 429)
      {
        var delaySec;
        if (typeof exports !== 'undefined')
        {
          delaySec = parseInt(response.headers['retry-after'], 10);
        }
        else
        {
          delaySec = parseInt(response.getRequestHeader('Retry-After'), 10);
        }
        var result = wait(delaySec * 1000);
        return result.then(function () {
          return $.ajax(options);
        });
      }
      else
      {
        if (typeof exports !== 'undefined')
        {
          throw response;
        }
        return response;
      }
    });
  };

}(jQuery));

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

/*
 * recipes.js
 *
 * Shortcuts for manipulating App.net objects.
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';

  function _uploadFile(type, filename) {
    var mime = require('mime');

    var obj = {
      type: type,
      content: {
        file: filename,
        content_type: mime.lookup(filename)
      }
    };

    return $.ajax({
      url: $.appnet.endpoints.base + 'files',
      type: 'POST',
      dataType: 'multipart',
      data: obj,
      headers: {
        Authorization: 'Bearer ' + $.appnet.userToken
      }
    });
  }

  var BroadcastMessageBuilder = function() {
  };

  BroadcastMessageBuilder.prototype.send = function () {
    var self = this;

    var parseLinks = this.parseLinks || this.parseMarkdownLinks;

    var message = {
      annotations: [],
      entities: {
        parse_links: !!parseLinks,
        parse_markdown_links: !!this.parseMarkdownLinks
      }
    };

    var uploadPromise;

    // XXX: photo/attachments are only currently supported under node.js
    if (typeof exports !== 'undefined') {
      var Q = require('q');
      var uploadPromises = [];

      if (this.photo) {
        var fileObj = _uploadFile('com.github.duerig.appnetjs.photo', this.photo);
        uploadPromises.push(fileObj.then(function (response) {
          var photo = response.data;
          if (photo) {
            message['annotations'].push({
              type: 'net.app.core.oembed',
              value: {
                '+net.app.core.file': {
                  file_id: photo.id,
                  file_token: photo.file_token,
                  format: 'oembed'
                }
              }
            });
          }

          return response;
        }));
      }

      if (this.attachment) {
        var fileObj = _uploadFile('com.github.duerig.appnetjs.attachment', this.attachment);
        uploadPromises.push(fileObj.then(function (response) {
          var attachment = response.data;
          if (attachment) {
            message['annotations'].push({
              type: 'net.app.core.attachments',
              value: {
                '+net.app.core.file_list': [
                  {
                    file_id: attachment.id,
                    file_token: attachment.file_token,
                    format: 'metadata'
                  }
                ]
              }
            });
          }

          return response;
        }));
      }

      uploadPromise = Q.all(uploadPromises);
    } else {
      // Create a promise which is immediately fufilled so that
      // our reliance on Q doesn't bleed out of node.js-land; just
      // use a jQuery promise instead
      var deferred = $.Deferred();
      deferred.resolve();
      uploadPromise = deferred.promise();
    }

    return uploadPromise.then(function () {
      if (self.text) {
        message.text = self.text;
      } else {
        message.machine_only = true;
      }

      if (self.headline) {
        message.annotations.push({
          type: 'net.app.core.broadcast.message.metadata',
          value: {
            subject: self.headline
          }
        });
      }

      if (self.readMoreLink) {
        message.annotations.push({
          type: 'net.app.core.crosspost',
          value: {
            canonical_url: self.readMoreLink
          }
        });
      }

      return $.appnet.message.create(self.channelID, message);
    });
  };

  $.appnet.recipes.BroadcastMessageBuilder = BroadcastMessageBuilder;

}(jQuery));
