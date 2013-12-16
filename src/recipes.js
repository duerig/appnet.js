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
    var Q = require('q');
    var self = this;

    var parseLinks = this.parseLinks || this.parseMarkdownLinks;

    var message = {
      annotations: [],
      entities: {
        parse_links: !!parseLinks,
        parse_markdown_links: !!this.parseMarkdownLinks
      }
    };

    var uploadDeferreds = [];

    // XXX: photo/attachments are only currently supported under node.js
    if (typeof exports !== 'undefined') {
      if (this.photo) {
        var fileObj = _uploadFile('com.github.duerig.appnetjs.photo', this.photo);
        uploadDeferreds.push(fileObj.then(function (response) {
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
        uploadDeferreds.push(fileObj.then(function (response) {
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
    }

    return Q.all(uploadDeferreds).then(function () {
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
