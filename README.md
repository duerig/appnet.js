# appnet.js

A library for interacting with app.net written in JavaScript. Exported
as a jQuery module.

Every method is invoked from the object found at $.appnet. At the
top level are methods for setting the access token to be used for
authentication. Aside from these utility functions, the remainder of
the operations map one-to-one onto the HTTP endpoints of the app.net
API.

## Download

The current release is at:

<ul>
  <li><a href="https://raw.github.com/duerig/appnet.js/master/dist/release/appnet.1.js">Full Source</a></li>
  <li><a href="https://raw.github.com/duerig/appnet.js/master/dist/release/appnet.1.min.js">Minified Source</a></li>
</ul>


The latest development version can be obtained at:

<ul>
  <li><a href="https://raw.github.com/duerig/appnet.js/master/dist/appnet.js">Full Source</a></li>
  <li><a href="https://raw.github.com/duerig/appnet.js/master/dist/appnet.min.js">Minified Source</a></li>
</ul>

## Example

<pre>
$.appnet.authorize("MY_USER_TOKEN");
var promise = $.appnet.post.getGlobal({ include_annotations: 1 });
promise.then(function (response) {
  console.dir(response);
  return $.appnet.post.getThread('1000', { count: 10 });
}).then(function (response) {
  console.dir(response);
}, function (response) {
  console.log('Error!');
});
</pre>

## Reference

### Utility Functions

<table>
  <thead>
    <tr>
      <th width="200">Method</th>
      <th width="240">Parameters</th>
      <th width="350">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>authorize</td>
      <td>( userToken, appToken )</td>
      <td>Sets the user and/or app tokens. Required for various calls as noted below.</td>
    </tr>
    <tr>
      <td>deauthorize</td>
      <td>( )</td>
      <td>Clears all tokens.</td>
    </tr>
    <tr>
      <td>isLogged</td>
      <td>( )</td>
      <td>Returns true if either a user or an app token has been previously provided.</td>
    </tr>
    <tr>
      <td>isApp</td>
      <td>( )</td>
      <td>Return true if an app token was previously provided.</td>
    </tr>
    <tr>
      <td>isUser</td>
      <td>( )</td>
      <td>Returns true if a user token was previously provided.</td>
    </tr>
  </tbody>
</table>

### app.net endpoints

These endpoints all return the result of invoking $.ajax() which is a
jQuery promise. You are then free to attach your own callbacks to it
etc. Typically the response you receive will be either a response
envelope with a 'data' field containing the results of your operation
on success and a 'meta' field with the response code and any other
information associated with your query.

File upload needs tested and may need a special case.

<table>
  <thead>
    <tr>
      <th width="200">Method</th>
      <th width="240">Parameters</th>
      <th width="350">Description</th>
      <th width="60">Token</th>
    </tr>
  </thead>
  <tbody>
    
    <tr>
      <td>user.get</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/lookup/#retrieve-a-user">Retrieve a User</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>user.update</td>
      <td>(
        
        
          user,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#update-a-user">Update a User</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.partialUpdate</td>
      <td>(
        
        
          user,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#partially-update-a-user">Partially Update a User</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.getAvatar</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#retrieve-a-users-avatar-image">Retrieve a User&#x27;s avatar image</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>user.updateAvatar</td>
      <td>(
        
        
          avatar,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#update-a-users-avatar-image">Update a User&#x27;s avatar image</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.getCover</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#retrieve-a-users-cover-image">Retrieve a User&#x27;s cover image</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>user.updateCover</td>
      <td>(
        
        
          cover,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#update-a-users-cover-image">Update a User&#x27;s cover image</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.follow</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#follow-a-user">Follow a User</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.unfollow</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#unfollow-a-user">Unfollow a User</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.mute</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/muting/#mute-a-user">Mute a User</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.unmute</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/muting/#unmute-a-user">Unmute a User</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.block</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/blocking/#block-a-user">Block a User</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.unblock</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/blocking/#unblock-a-user">Unblock a User</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>user.getList</td>
      <td>(
        
        
        
          user_ids,
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/lookup/#retrieve-multiple-users">Retrieve multiple Users</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>user.search</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/lookup/#search-for-users">Search for Users</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>user.getFollowing</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#list-users-a-user-is-following">Retrieve Users a User is following</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>user.getFollowers</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#list-users-following-a-user">Retrieve Users following a User</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>user.getFollowingIds</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#list-user-ids-a-user-is-following">Retrieve IDs of Users a User is following</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>user.getFollowerIds</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#list-user-ids-following-a-user">Retrieve IDs of Users following a User</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>user.getMuted</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/muting/#list-muted-users">Retrieve muted Users</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>user.getMutedList</td>
      <td>(
        
        
        
          user_ids,
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/muting/#retrieve-muted-user-ids-for-multiple-users">Retrieve muted User IDs for multiple Users</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>user.getBlocked</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/blocking/#list-blocked-users">Retrieve blocked Users</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>user.getBlockedList</td>
      <td>(
        
        
        
          user_ids,
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/blocking/#retrieve-blocked-user-ids-for-multiple-users">Retrieve blocked User IDs for multiple Users</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>user.getReposters</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/post-interactions/#list-users-who-have-reposted-a-post">Retrieve Users who reposted a Post</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>user.getStars</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/user/post-interactions/#list-users-who-have-starred-a-post">Retrieve Users who starred a Post</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>post.create</td>
      <td>(
        
        
          post,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/lifecycle/#create-a-post">Create a Post</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>post.get</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/lookup/#retrieve-a-post">Retrieve a Post</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>post.destroy</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/lifecycle/#delete-a-post">Delete a Post</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>post.repost</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/reposts/#repost-a-post">Repost a Post</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>post.unrepost</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/reposts/#unrepost-a-post">Unrepost a Post</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>post.star</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/stars/#star-a-post">Star a Post</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>post.unstar</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/stars/#unstar-a-post">Unstar a Post</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>post.getList</td>
      <td>(
        
        
        
          post_ids,
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/lookup/#retrieve-multiple-posts">Retrieve multiple Posts</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>post.getUserPosts</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-posts-created-by-a-user">Retrieve a User&#x27;s posts</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>post.getUserStarred</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/stars/#retrieve-posts-starred-by-a-user">Retrieve a User&#x27;s starred posts</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>post.getUserMentions</td>
      <td>(
        
          user_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-posts-mentioning-a-user">Retrieve Posts mentioning a User</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>post.getHashtag</td>
      <td>(
        
          hashtag,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-tagged-posts">Retrieve Posts containing a hashtag</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>post.getThread</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/replies">Retrieve replies to a Post</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>post.getUserStream</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-a-users-personalized-stream">Retrieve a User&#x27;s personalized stream</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>stream.getUnifiedStream</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-a-users-unified-stream">Retrieve a User&#x27;s unified stream</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>post.getGlobal</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-the-global-stream">Retrieve the Global stream</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>post.report</td>
      <td>(
        
          post_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/post/report/#report-a-post">Report a Post</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.getUserSubscribed</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#get-current-users-subscribed-channels">Get current user&#x27;s subscribed channels</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.create</td>
      <td>(
        
        
          channel,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lifecycle/#create-a-channel">Create a Channel</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.get</td>
      <td>(
        
          channel_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lookup/#retrieve-a-channel">Retrieve a Channel</a></td>
      <td>Varies</td>
    </tr>
    
    <tr>
      <td>channel.getList</td>
      <td>(
        
        
        
          channel_ids,
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lookup/#retrieve-multiple-channels">Retrieve multiple Channels</a></td>
      <td>Varies</td>
    </tr>
    
    <tr>
      <td>channel.getCreated</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lookup/#retrieve-my-channels">Retrieve my Channels</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.getUnreadCount</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lookup/#retrieve-number-of-unread-pm-channels">Retrieve number of unread PM Channels</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.update</td>
      <td>(
        
          channel_id,
        
        
          channel,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lifecycle/#update-a-channel">Update a Channel</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.subscribe</td>
      <td>(
        
          channel_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#subscribe-to-a-channel">Subscribe to a Channel</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.unsubscribe</td>
      <td>(
        
          channel_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#unsubscribe-from-a-channel">Unsubscribe from a Channel</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.getSubscribers</td>
      <td>(
        
          channel_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#retrieve-users-subscribed-to-a-channel">Retrieve users subscribed to a Channel</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>channel.getSubscriberIds</td>
      <td>(
        
          channel_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#retrieve-user-ids-subscribed-to-a-channel">Retrieve user ids subscribed to a Channel</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>channel.getSubscriberIdList</td>
      <td>(
        
        
        
          channel_ids,
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#retrieve-user-ids-subscribed-to-a-channel">Retrieve user ids subscribed to multiple Channels</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>channel.mute</td>
      <td>(
        
          channel_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/muting/#mute-a-channel">Mute a Channel</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.unmute</td>
      <td>(
        
          channel_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/muting/#unmute-a-channel">Unmute a Channel</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>channel.getMuted</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/channel/muting/#get-current-users-muted-channels">Get current user&#x27;s muted Channels</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>message.getChannelMessages</td>
      <td>(
        
          channel_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/message/lifecycle/#retrieve-the-messages-in-a-channel">Retrieve the Messages in a Channel</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>message.create</td>
      <td>(
        
          channel_id,
        
        
          message,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/message/lifecycle/#create-a-message">Create a Message</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>message.get</td>
      <td>(
        
          channel_id,
        
          message_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/message/lookup/#retrieve-a-message">Retrieve a Message</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>message.getList</td>
      <td>(
        
        
        
          message_ids,
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/message/lookup/#retrieve-multiple-messages">Retrieve multiple Messages</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>message.getUserMessages</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/message/lookup/#retrieve-my-messages">Retrieve my Messages</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>message.destroy</td>
      <td>(
        
          channel_id,
        
          message_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/message/lifecycle/#delete-a-message">Delete a Message</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>file.create</td>
      <td>(
        
        
          file,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/file/lifecycle/#create-a-file">Create a File</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>file.createPlaceholder</td>
      <td>(
        
        
          file,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/file/lifecycle/#create-a-file">Create a File Placeholder</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>file.get</td>
      <td>(
        
          file_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/file/lookup/#retrieve-a-file">Retrieve a File</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>file.getList</td>
      <td>(
        
        
        
          file_ids,
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/file/lookup/#retrieve-multiple-files">Retrieve multiple Files</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>file.destroy</td>
      <td>(
        
          file_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/file/lifecycle/#delete-a-file">Delete a File</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>file.getUserFiles</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/file/lookup/#retrieve-my-files">Retrieve my Files</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>file.update</td>
      <td>(
        
          file_id,
        
        
          file,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/file/lifecycle/#update-a-file">Update a File</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>file.getContent</td>
      <td>(
        
          file_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/file/content/#get-file-content">Get File content</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>file.setContent</td>
      <td>(
        
          file_id,
        
        
          content,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/file/content/#set-file-content">Set File content</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>stream.create</td>
      <td>(
        
        
          stream,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#create-a-stream">Create a Stream</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>stream.get</td>
      <td>(
        
          stream_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#retrieve-a-stream">Retrieve a Stream</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>stream.update</td>
      <td>(
        
          stream_id,
        
        
          stream,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#update-a-stream">Update a Stream</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>stream.destroy</td>
      <td>(
        
          stream_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#delete-a-stream">Delete a Stream</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>stream.getAll</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#get-current-tokens-streams">Retrieve all Streams for the current Token</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>stream.destroyAll</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#delete-all-of-the-current-users-streams">Delete all Streams for the current Token</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>filter.create</td>
      <td>(
        
        
          filter,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#create-a-filter">Create a Filter</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>filter.get</td>
      <td>(
        
          filter_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#retrieve-a-filter">Retrieve a Filter</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>filter.update</td>
      <td>(
        
          filter_id,
        
        
          filter,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#update-a-filter">Update a Filter</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>filter.destroy</td>
      <td>(
        
          filter_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#delete-a-filter">Delete a Filter</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>filter.getUserFilters</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#get-current-users-filters">Get the current User&#x27;s Filters</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>filter.destroyUserFilters</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#delete-all-of-the-current-users-filters">Delete the current User&#x27;s Filters</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>interaction.get</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/interaction/">Retrieve Interactions with the current User</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>marker.update</td>
      <td>(
        
        
          marker,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/stream-marker/#update-a-stream-marker">Update a Stream Marker</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>text.process</td>
      <td>(
        
        
          post_or_message,
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/text-processor/">Process text</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>token.get</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/token/#retrieve-current-token">Retrieve the current token</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>token.getAuthorizedIds</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/token/#retrieve-authorized-user-ids-for-an-app">Retrieve authorized User IDs for an app</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>token.getAuthorizedTokens</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/token/#retrieve-authorized-user-tokens-for-an-app">Retrieve authorized User tokens for an app</a></td>
      <td>App</td>
    </tr>
    
    <tr>
      <td>place.get</td>
      <td>(
        
          place_id,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/place/#retrieve-a-place">Retrieve a Place</a></td>
      <td>Any</td>
    </tr>
    
    <tr>
      <td>place.search</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/place/#search-for-a-place">Search for Places</a></td>
      <td>User</td>
    </tr>
    
    <tr>
      <td>explore.show</td>
      <td>(
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/explore/#retrieve-all-explore-streams">Retrieve all Explore Streams</a></td>
      <td>None</td>
    </tr>
    
    <tr>
      <td>explore.get</td>
      <td>(
        
          slug,
        
        
         args )</td>
      <td><a href="http://developers.app.net/docs/resources/explore/#retrieve-an-explore-stream">Retrieve an Explore Stream</a></td>
      <td>None</td>
    </tr>
    
  </tbody>
</table>
