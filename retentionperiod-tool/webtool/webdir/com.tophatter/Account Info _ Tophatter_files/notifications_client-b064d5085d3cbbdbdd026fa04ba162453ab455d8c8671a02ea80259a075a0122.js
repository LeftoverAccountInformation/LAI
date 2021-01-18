(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.PubnubClient = (function() {
    function PubnubClient(options) {
      this.channelPrefix = options.channelPrefix;
      this.debug = options.debug;
      this.onConnect = options.onConnect;
      this.onDisconnect = options.onDisconnect;
      this.onReconnect = options.onReconnect;
      this.onError = options.onError;
      this.onEvent = options.onEvent;
      this.isConnected = false;
      if (typeof PubNub === "undefined" || PubNub === null) {
        if (typeof console !== "undefined" && console !== null) {
          console.log('[PubnubClient] Failed to load PubNub library');
        }
        if (this.onError != null) {
          this.onError();
        }
        return;
      }
      this.pubnub = new PubNub({
        origin: Config.sharedInstance().pubnub.origin,
        subscribeKey: options.subscribeKey,
        ssl: true,
        uuid: options.uuid,
        useRequestId: true,
        useInstanceId: true,
        suppressLeaveEvents: true
      });
      this.pubnub._config.setHeartbeatInterval(0);
      this.pubnub.addListener({
        status: (function(_this) {
          return function(statusEvent) {
            var ref;
            if (statusEvent.category === 'PNConnectedCategory') {
              if (_this.isConnected) {
                if (_this.onReconnect != null) {
                  _this.onReconnect();
                }
              } else {
                if (_this.debug) {
                  if (typeof console !== "undefined" && console !== null) {
                    console.log("[PubnubClient] Connected to " + ((ref = statusEvent.affectedChannels) != null ? ref[0] : void 0) + ".");
                  }
                }
                if (_this.onConnect != null) {
                  _this.onConnect();
                }
              }
              return _this.isConnected = true;
            } else if (statusEvent.category === 'PNNetworkDownCategory') {
              if (_this.debug) {
                if (typeof console !== "undefined" && console !== null) {
                  console.log(statusEvent);
                }
              }
              if (_this.debug) {
                if (typeof console !== "undefined" && console !== null) {
                  console.log('[PubnubClient] Network is down.');
                }
              }
              if (_this.onDisconnect != null) {
                return _this.onDisconnect();
              }
            } else if (statusEvent.category === 'PNNetworkUpCategory') {
              if (_this.debug) {
                if (typeof console !== "undefined" && console !== null) {
                  console.log(statusEvent);
                }
              }
              if (_this.debug) {
                if (typeof console !== "undefined" && console !== null) {
                  console.log('[PubnubClient] Network is up.');
                }
              }
              if (options.channel != null) {
                return _this.pubnub.subscribe({
                  channels: [options.channel]
                });
              }
            } else if (statusEvent.category === 'PNReconnectedCategory') {
              if (_this.debug) {
                if (typeof console !== "undefined" && console !== null) {
                  console.log(statusEvent);
                }
              }
              if (_this.debug) {
                return typeof console !== "undefined" && console !== null ? console.log('[PubnubClient] Reconnected.') : void 0;
              }
            } else if (statusEvent.category === 'PNNetworkIssuesCategory') {
              if (_this.debug) {
                return typeof console !== "undefined" && console !== null ? console.log('[PubnubClient] Disconnected.') : void 0;
              }
            } else if (statusEvent.operation === 'PNUnsubscribeOperation') {
              if (_this.debug) {
                return typeof console !== "undefined" && console !== null ? console.log('[PubnubClient] Unsubscribed.') : void 0;
              }
            } else {
              if (_this.debug) {
                if (typeof console !== "undefined" && console !== null) {
                  console.log(statusEvent);
                }
              }
              if (_this.debug) {
                return typeof console !== "undefined" && console !== null ? console.log("[PubnubClient] Unrecognized statusEvent: " + statusEvent.category) : void 0;
              }
            }
          };
        })(this),
        message: (function(_this) {
          return function(envelope) {
            if (!_this.isConnected) {
              if (_this.onConnect != null) {
                _this.onConnect();
              }
              _this.isConnected = true;
            }
            return window.requestAnimationFrame(function() {
              return _this.onEvent(envelope.message);
            });
          };
        })(this)
      });
      if (options.channel != null) {
        this.pubnub.subscribe({
          channels: [options.channel]
        });
      }
    }

    PubnubClient.prototype.addChannel = function(channel) {
      return this.pubnub.subscribe({
        channels: ["" + this.channelPrefix + channel]
      });
    };

    PubnubClient.prototype.removeChannel = function(channel) {
      var channelWithPrefix, currentChannels;
      currentChannels = this.pubnub.getSubscribedChannels();
      channelWithPrefix = "" + this.channelPrefix + channel;
      if (indexOf.call(currentChannels, channelWithPrefix) >= 0) {
        return this.pubnub.unsubscribe({
          channels: [channelWithPrefix]
        });
      }
    };

    PubnubClient.prototype.getLastMessage = function(channel, callback) {
      return this.pubnub.history({
        channel: "" + this.channelPrefix + channel,
        count: 1
      }).then(function(response) {
        return window.requestAnimationFrame(function() {
          if (response.messages.length >= 1) {
            return callback(response.messages[0].entry);
          }
        });
      });
    };

    PubnubClient.prototype.getLastMessagesInInterval = function(channel, start, end, callback) {
      return this.pubnub.history({
        channel: "" + this.channelPrefix + channel,
        start: start * 10000,
        end: end * 10000,
        count: 10
      }).then(function(response) {
        return window.requestAnimationFrame(function() {
          if (response.messages.length >= 1) {
            return callback(response.messages);
          }
        });
      });
    };

    PubnubClient.prototype.disconnect = function() {
      this.pubnub.unsubscribeAll();
      if (this.onDisconnect != null) {
        this.onDisconnect();
      }
      if (this.debug) {
        return typeof console !== "undefined" && console !== null ? console.log("[PubnubClient] Manual disconnect") : void 0;
      }
    };

    return PubnubClient;

  })();

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.NotificationsClient = (function() {
    function NotificationsClient(options) {
      this.run = bind(this.run, this);
      this.debug = Config.sharedInstance().environment !== 'production';
      this.userId = options.userId;
      this.channelId = options.notificationsChannelId;
      this._channelPrefix = options.channelPrefix;
      this._subscribeKey = options.subscribeKey;
      this._localStore = options.localStore;
      this._historyMaxTime = 600;
      this._listen();
    }

    NotificationsClient.prototype.run = function(callback) {
      var lastNotificationRead, readHistoryFrom, tenMinutesAgo;
      this.pubnubClient = new PubnubClient({
        channelPrefix: this._channelPrefix,
        subscribeKey: this._subscribeKey,
        uuid: this.userId,
        debug: this.debug,
        onEvent: (function(_this) {
          return function(eventData) {
            return _this.processPayload(eventData);
          };
        })(this)
      });
      this.pubnubClient.addChannel(this.channelId);
      lastNotificationRead = parseInt(this._localStore.get('last_notification_read'));
      tenMinutesAgo = Date.now() - this._historyMaxTime * 1000;
      readHistoryFrom = Math.max(lastNotificationRead, tenMinutesAgo);
      this.pubnubClient.getLastMessagesInInterval(this.channelId, readHistoryFrom, Date.now(), (function(_this) {
        return function(messageData) {
          var i, len, message, results;
          if (_this.debug) {
            if (typeof console !== "undefined" && console !== null) {
              console.log("Processing historical notification for user " + _this.userId + " and channel " + _this.channelId);
            }
          }
          results = [];
          for (i = 0, len = messageData.length; i < len; i++) {
            message = messageData[i];
            results.push(_this.processPayload(message.entry));
          }
          return results;
        };
      })(this));
      this._updateLastRead();
      return $(document).idle({
        onIdle: (function(_this) {
          return function() {
            var ref;
            if (typeof console !== "undefined" && console !== null) {
              console.log("Client was idle for too long, disconnecting.");
            }
            return (ref = _this.pubnubClient) != null ? ref.disconnect() : void 0;
          };
        })(this),
        idle: this.idleTimeout
      });
    };

    NotificationsClient.prototype.processPayload = function(eventData) {
      switch (eventData.type) {
        case 'toast':
          return this._showToast(eventData);
      }
    };

    NotificationsClient.prototype._showToast = function(eventData) {
      var $badgeImg, $closeCtl, $copy, $messageCopy, $title, $toast, $toastWrap;
      $toastWrap = $('#notify-toasts');
      $toast = $('<div class="toast new">');
      $messageCopy = $('<div class="message-copy">');
      $title = eventData.message.title != null ? $("<h3>" + eventData.message.title + "</h3>") : void 0;
      $copy = $("<p>" + eventData.message.subtitle_html.text + "</p>");
      $badgeImg = eventData.message.image_url != null ? $("<div class=\"badge-col\"><img src=\"" + eventData.message.image_url + "\"></div>") : void 0;
      $closeCtl = $('<i class="close fa fa-times-circle"></i>');
      $toast.on('animationend', function(e) {
        var target;
        target = e.target;
        return $(target).removeClass('new show-toast');
      });
      if ($badgeImg != null) {
        $toast.addClass('flex-display');
        $toast.append($badgeImg);
      }
      if ($title != null) {
        $messageCopy.append($title);
      }
      if (eventData.subtype === 'user_badge_completion') {
        this._updateCurrentBadge(eventData.metadata.active_badge);
      }
      $messageCopy.append($copy);
      $toast.append($messageCopy, $closeCtl);
      $toastWrap.prepend($toast);
      $toast.addClass('show-toast');
      return setTimeout((function(_this) {
        return function() {
          return _this._closeToast($toast);
        };
      })(this), eventData.close_timeout * 1000);
    };

    NotificationsClient.prototype._closeToast = function(el) {
      el.addClass('remove');
      el.on('animationend', function(e) {
        return el.remove();
      });
      return this._updateLastRead();
    };

    NotificationsClient.prototype._updateLastRead = function() {
      return this._localStore.set('last_notification_read', Date.now());
    };

    NotificationsClient.prototype._updateCurrentBadge = function(data) {
      var $img;
      $img = $('.navbar-user-badge');
      return $img.attr('src', data.image_url);
    };

    NotificationsClient.prototype._listen = function() {
      var $toastWrap;
      $toastWrap = $('#notify-toasts');
      return $toastWrap.on('click', '.toast, .close', (function(_this) {
        return function(e) {
          var target;
          target = $(e.currentTarget).hasClass('close') ? $(e.currentTarget).parent() : $(e.currentTarget);
          return _this._closeToast(target);
        };
      })(this));
    };

    NotificationsClient.sharedInstance = function(channelPrefix, subscribeKey, userId, notificationsChannelId, localStore) {
      return this._sharedInstance != null ? this._sharedInstance : this._sharedInstance = new NotificationsClient({
        channelPrefix: channelPrefix,
        subscribeKey: subscribeKey,
        userId: userId,
        notificationsChannelId: notificationsChannelId,
        localStore: localStore
      });
    };

    return NotificationsClient;

  })();

}).call(this);
