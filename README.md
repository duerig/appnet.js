# appnet.js

A library for interacting with app.net written in JavaScript. Exported
as a jQuery module.

# Example

<pre>
var promise = $.appnet().post.global({ include_annotations: 1 });
</pre>

# Reference

<table>
  <thead>
    <tr>
      <th width="320">Method</th>
      <th width="410">Description</th>
      <th width="60">Token</th>
      <th width="60">scope</th>
    </tr>
  </thead>
  <tbody>
    
    <tr>
      <td>user.get(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/lookup/#retrieve-a-user">Retrieve a User</a></td>
      <td>None</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.update(
        
        
          user,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#update-a-user">Update a User</a></td>
      <td>User</td>
      <td>update_profile</td>
    </tr>
    
    <tr>
      <td>user.getAvatar(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#retrieve-a-users-avatar-image">Retrieve a User&#x27;s avatar image</a></td>
      <td>None</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.updateAvatar(
        
        
          avatar,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#update-a-users-avatar-image">Update a User&#x27;s avatar image</a></td>
      <td>User</td>
      <td>update_profile</td>
    </tr>
    
    <tr>
      <td>user.getCover(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#retrieve-a-users-cover-image">Retrieve a User&#x27;s cover image</a></td>
      <td>None</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.updateCover(
        
        
          cover,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/profile/#update-a-users-cover-image">Update a User&#x27;s cover image</a></td>
      <td>User</td>
      <td>update_profile</td>
    </tr>
    
    <tr>
      <td>user.follow(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#follow-a-user">Follow a User</a></td>
      <td>User</td>
      <td>follow</td>
    </tr>
    
    <tr>
      <td>user.unfollow(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#unfollow-a-user">Unfollow a User</a></td>
      <td>User</td>
      <td>follow</td>
    </tr>
    
    <tr>
      <td>user.mute(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/muting/#mute-a-user">Mute a User</a></td>
      <td>User</td>
      <td>follow</td>
    </tr>
    
    <tr>
      <td>user.unmute(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/muting/#unmute-a-user">Unmute a User</a></td>
      <td>User</td>
      <td>follow</td>
    </tr>
    
    <tr>
      <td>user.block(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/blocking/#block-a-user">Block a User</a></td>
      <td>User</td>
      <td>follow</td>
    </tr>
    
    <tr>
      <td>user.unblock(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/blocking/#unblock-a-user">Unblock a User</a></td>
      <td>User</td>
      <td>follow</td>
    </tr>
    
    <tr>
      <td>user.getList(
        
        
        
          user_ids,
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/lookup/#retrieve-multiple-users">Retrieve multiple Users</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.search(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/lookup/#search-for-users">Search for Users</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getFollowing(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#list-users-a-user-is-following">Retrieve Users a User is following</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getFollowers(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#list-users-following-a-user">Retrieve Users following a User</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getFollowingIds(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#list-user-ids-a-user-is-following">Retrieve IDs of Users a User is following</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getFollowerIds(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/following/#list-user-ids-following-a-user">Retrieve IDs of Users following a User</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getMuted(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/muting/#list-muted-users">Retrieve muted Users</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getMutedList(
        
        
        
          user_ids,
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/muting/#retrieve-muted-user-ids-for-multiple-users">Retrieve muted User IDs for multiple Users</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getBlocked(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/blocking/#list-blocked-users">Retrieve blocked Users</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getBlockedList(
        
        
        
          user_ids,
         url_args)</td>
      <td><a href="Retrieve blocked User IDs for multiple Users">http://developers.app.net/docs/resources/user/blocking/#retrieve-blocked-user-ids-for-multiple-users</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getReposters(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/post-interactions/#list-users-who-have-reposted-a-post">Retrieve Users who reposted a Post</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>user.getStars(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/user/post-interactions/#list-users-who-have-starred-a-post">Retrieve Users who starred a Post</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>post.create(
        
        
          post,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/lifecycle/#create-a-post">Create a Post</a></td>
      <td>User</td>
      <td>write_post</td>
    </tr>
    
    <tr>
      <td>post.get(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/lookup/#retrieve-a-post">Retrieve a Post</a></td>
      <td>None</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>post.destroy(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/lifecycle/#delete-a-post">Delete a Post</a></td>
      <td>User</td>
      <td>write_post</td>
    </tr>
    
    <tr>
      <td>post.repost(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/reposts/#repost-a-post">Repost a Post</a></td>
      <td>User</td>
      <td>write_post</td>
    </tr>
    
    <tr>
      <td>post.unrepost(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/reposts/#unrepost-a-post">Unrepost a Post</a></td>
      <td>User</td>
      <td>write_post</td>
    </tr>
    
    <tr>
      <td>post.star(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/stars/#star-a-post">Star a Post</a></td>
      <td>User</td>
      <td>write_post</td>
    </tr>
    
    <tr>
      <td>post.unstar(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/stars/#unstar-a-post">Unstar a Post</a></td>
      <td>User</td>
      <td>write_post</td>
    </tr>
    
    <tr>
      <td>post.getList(
        
        
        
          post_ids,
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/lookup/#retrieve-multiple-posts">Retrieve multiple Posts</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>post.getUserPosts(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-posts-created-by-a-user">Retrieve a User&#x27;s posts</a></td>
      <td>None</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>post.getUserStarred(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/stars/#retrieve-posts-starred-by-a-user">Retrieve a User&#x27;s starred posts</a></td>
      <td>None</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>post.getUserMentions(
        
          user_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-posts-mentioning-a-user">Retrieve Posts mentioning a User</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>post.getHashtag(
        
          hashtag,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-tagged-posts">Retrieve Posts containing a hashtag</a></td>
      <td>None</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>post.getThread(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/replies">Retrieve replies to a Post</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>post.getUserStream(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-a-users-personalized-stream">Retrieve a User&#x27;s personalized stream</a></td>
      <td>User</td>
      <td>stream</td>
    </tr>
    
    <tr>
      <td>stream.getUnifiedStream(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-a-users-unified-stream">Retrieve a User&#x27;s unified stream</a></td>
      <td>User</td>
      <td>stream</td>
    </tr>
    
    <tr>
      <td>post.getGlobal(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/streams/#retrieve-the-global-stream">Retrieve the Global stream</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>post.report(
        
          post_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/post/report/#report-a-post">Report a Post</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>channel.getUserSubscribed(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#get-current-users-subscribed-channels">Get current user&#x27;s subscribed channels</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.create(
        
        
          channel,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lifecycle/#create-a-channel">Create a Channel</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.get(
        
          channel_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lookup/#retrieve-a-channel">Retrieve a Channel</a></td>
      <td>Varies</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.getList(
        
        
        
          channel_ids,
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lookup/#retrieve-multiple-channels">Retrieve multiple Channels</a></td>
      <td>Varies</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.getCreated(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lookup/#retrieve-my-channels">Retrieve my Channels</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.getUnreadCount(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lookup/#retrieve-number-of-unread-pm-channels">Retrieve number of unread PM Channels</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.update(
        
          channel_id,
        
        
          channel,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/lifecycle/#update-a-channel">Update a Channel</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.subscribe(
        
          channel_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#subscribe-to-a-channel">Subscribe to a Channel</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.unsubscribe(
        
          channel_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#unsubscribe-from-a-channel">Unsubscribe from a Channel</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.getSubscribers(
        
          channel_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#retrieve-users-subscribed-to-a-channel">Retrieve users subscribed to a Channel</a></td>
      <td>None</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.getSubscriberIds(
        
          channel_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#retrieve-user-ids-subscribed-to-a-channel">Retrieve user ids subscribed to a Channel</a></td>
      <td>None</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.getSubscriberIdList(
        
        
        
          channel_ids,
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/subscriptions/#retrieve-user-ids-subscribed-to-a-channel">Retrieve user ids subscribed to multiple Channels</a></td>
      <td>Any</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.mute(
        
          channel_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/muting/#mute-a-channel">Mute a Channel</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.unmute(
        
          channel_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/muting/#unmute-a-channel">Unmute a Channel</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>channel.getMuted(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/channel/muting/#get-current-users-muted-channels">Get current user&#x27;s muted Channels</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>message.getChannelMessages(
        
          channel_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/message/lifecycle/#retrieve-the-messages-in-a-channel">Retrieve the Messages in a Channel</a></td>
      <td>None</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>message.create(
        
          channel_id,
        
        
          message,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/message/lifecycle/#create-a-message">Create a Message</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>message.get(
        
          channel_id,
        
          message_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/message/lookup/#retrieve-a-message">Retrieve a Message</a></td>
      <td>None</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>message.getList(
        
        
        
          message_ids,
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/message/lookup/#retrieve-multiple-messages">Retrieve multiple Messages</a></td>
      <td>None</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>message.getUserMessages(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/message/lookup/#retrieve-my-messages">Retrieve my Messages</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>message.destroy(
        
          channel_id,
        
          message_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/message/lifecycle/#delete-a-message">Delete a Message</a></td>
      <td>User</td>
      <td>messages</td>
    </tr>
    
    <tr>
      <td>file.create(
        
        
          file,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/file/lifecycle/#create-a-file">Create a File</a></td>
      <td>User</td>
      <td>files</td>
    </tr>
    
    <tr>
      <td>file.createPlaceholder(
        
        
          file,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/file/lifecycle/#create-a-file">Create a File Placeholder</a></td>
      <td>User</td>
      <td>files</td>
    </tr>
    
    <tr>
      <td>file.get(
        
          file_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/file/lookup/#retrieve-a-file">Retrieve a File</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>file.getList(
        
        
        
          file_ids,
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/file/lookup/#retrieve-multiple-files">Retrieve multiple Files</a></td>
      <td>User</td>
      <td>files</td>
    </tr>
    
    <tr>
      <td>file.destroy(
        
          file_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/file/lifecycle/#delete-a-file">Delete a File</a></td>
      <td>User</td>
      <td>files</td>
    </tr>
    
    <tr>
      <td>file.getUserFiles(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/file/lookup/#retrieve-my-files">Retrieve my Files</a></td>
      <td>User</td>
      <td>files</td>
    </tr>
    
    <tr>
      <td>file.update(
        
          file_id,
        
        
          file,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/file/lifecycle/#update-a-file">Update a File</a></td>
      <td>User</td>
      <td>files</td>
    </tr>
    
    <tr>
      <td>file.getContent(
        
          file_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/file/content/#get-file-content">Get File content</a></td>
      <td>User</td>
      <td>files</td>
    </tr>
    
    <tr>
      <td>file.setContent(
        
          file_id,
        
        
          content,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/file/content/#set-file-content">Set File content</a></td>
      <td>User</td>
      <td>files</td>
    </tr>
    
    <tr>
      <td>stream.create(
        
        
          stream,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#create-a-stream">Create a Stream</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>stream.get(
        
          stream_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#retrieve-a-stream">Retrieve a Stream</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>stream.update(
        
          stream_id,
        
        
          stream,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#update-a-stream">Update a Stream</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>stream.destroy(
        
          stream_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#delete-a-stream">Delete a Stream</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>stream.getAll(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#get-current-tokens-streams">Retrieve all Streams for the current Token</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>stream.destroyAll(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/stream/lifecycle/#delete-all-of-the-current-users-streams">Delete all Streams for the current Token</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>filter.create(
        
        
          filter,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#create-a-filter">Create a Filter</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>filter.get(
        
          filter_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#retrieve-a-filter">Retrieve a Filter</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>filter.update(
        
          filter_id,
        
        
          filter,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#update-a-filter">Update a Filter</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>filter.destroy(
        
          filter_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#delete-a-filter">Delete a Filter</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>filter.getUserFilters(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#get-current-users-filters">Get the current User&#x27;s Filters</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>filter.destroyUserFilters(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/filter/lifecycle/#delete-all-of-the-current-users-filters">Delete the current User&#x27;s Filters</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>interaction.get(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/interaction/">Retrieve Interactions with the current User</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>marker.update(
        
        
          marker,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/stream-marker/#update-a-stream-marker">Update a Stream Marker</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>text.process(
        
        
          post_or_message,
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/text-processor/">Process text</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>token.get(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/token/#retrieve-current-token">Retrieve the current token</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>token.getAuthorizedIds(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/token/#retrieve-authorized-user-ids-for-an-app">Retrieve authorized User IDs for an app</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>token.getAuthorizedTokens(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/token/#retrieve-authorized-user-tokens-for-an-app">Retrieve authorized User tokens for an app</a></td>
      <td>App</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>place.get(
        
          place_id,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/place/#retrieve-a-place">Retrieve a Place</a></td>
      <td>Any</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>place.search(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/place/#search-for-a-place">Search for Places</a></td>
      <td>User</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>explore.show(
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/explore/#retrieve-all-explore-streams">Retrieve all Explore Streams</a></td>
      <td>None</td>
      <td>basic</td>
    </tr>
    
    <tr>
      <td>explore.get(
        
          slug,
        
        
         url_args)</td>
      <td><a href="http://developers.app.net/docs/resources/explore/#retrieve-an-explore-stream">Retrieve an Explore Stream</a></td>
      <td>None</td>
      <td>basic</td>
    </tr>
    
  </tbody>
</table>
