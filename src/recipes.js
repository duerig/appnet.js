/*
 * recipes.js
 *
 * Shortcuts for manipulating App.net objects.
 *
 */

/*global jQuery: true */
(function ($) {
  'use strict';

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

    // photo
    //
    // attachment
    //

    if (this.text) {
      message.text = this.text;
    } else {
      message.machine_only = true;
    }

    if (this.headline) {
      message.annotations.push({
        type: 'net.app.core.broadcast.message.metadata',
        value: {
          subject: this.headline
        }
      });
    }

    if (this.readMoreLink) {
      message.annotations.push({
        type: 'net.app.core.crosspost',
        value: {
          canonical_url: this.readMoreLink
        }
      });
    }

    return $.appnet.message.create(this.channelID, message);
  };

  $.appnet.recipes.BroadcastMessageBuilder = BroadcastMessageBuilder;

}(jQuery));
