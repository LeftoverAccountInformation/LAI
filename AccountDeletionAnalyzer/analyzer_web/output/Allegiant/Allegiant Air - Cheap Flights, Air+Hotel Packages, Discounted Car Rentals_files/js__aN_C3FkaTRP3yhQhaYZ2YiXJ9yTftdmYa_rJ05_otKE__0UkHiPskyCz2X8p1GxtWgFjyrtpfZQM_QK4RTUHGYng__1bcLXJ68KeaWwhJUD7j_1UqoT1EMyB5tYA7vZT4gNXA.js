(function ($) {
  G4Analytics = function () {
    this.trackingApi = (Allegiant.hasOwnProperty('tracking') ? Allegiant.tracking : null);
    this.defaultMethod = 'trackEvent';
    this.eventsMethodsMap = {
      // Custom methods should be listed here.
      'BillboardImpression': 'trackPromoImpressionWithCustomDataLayerVars',
      'BillboardClick': 'trackPromoClickWithCustomDataLayerVars',
      'TopDealsAdsImpression': 'trackPromoImpressionWithCustomDataLayerVars',
      'TopDealsAdsClick': 'trackPromoClickWithCustomDataLayerVars',
      'OverlayTestVariantImpression': 'trackPromoImpressionWithCustomDataLayerVars',
      'OverlayTestVariantClick': 'trackPromoClickWithCustomDataLayerVars',
    };
    this.eventsCustomVars = {
      'BillboardImpression': ['DealOrigin'],
      'BillboardClick': ['DealOrigin'],
      'TopDealsAdsImpression': ['DealOrigin'],
      'TopDealsAdsClick': ['DealOrigin'],
      'OverlayTestVariantImpression': ['OverlayCampaignName'],
      'OverlayTestVariantClick': ['OverlayCampaignName'],
    };
  };

  G4Analytics.prototype.getCustomDimensions = function (dimensions, eventInfo) {
    var custom_dimensions = {};
    for (var i in dimensions) {
      if (typeof this['getDimension' + dimensions[i]] == 'function') {
        this['getDimension' + dimensions[i]](custom_dimensions, eventInfo);
      }
    }
    if (eventInfo.label) {
      custom_dimensions.eventLabel = eventInfo.label;
    }
    return custom_dimensions;
  };

  G4Analytics.prototype.getDimensionDealOrigin = function(custom_dimensions) {
    custom_dimensions.origin = $('#change-airport-deals-value').val();
  };

  G4Analytics.prototype.getDimensionOverlayCampaignName = function(custom_dimensions, eventInfo) {
    custom_dimensions.campaignName = eventInfo.title + '_' + eventInfo.variantlabel;
  };

  G4Analytics.prototype.logEvent = function (type, eventInfo) {
    if (this.trackingApi) {
      // Custom handler in API.
      if (this.eventsMethodsMap.hasOwnProperty(type)) {
        if (this.trackingApi.hasOwnProperty(this.eventsMethodsMap[type])) {
          if (this.eventsCustomVars.hasOwnProperty(type)) {
            var custom_dimensions = this.getCustomDimensions(this.eventsCustomVars[type], eventInfo);
            this.trackingApi[this.eventsMethodsMap[type]]([eventInfo], custom_dimensions);
          }
          else {
            this.trackingApi[this.eventsMethodsMap[type]]([eventInfo]);
          }
        }
      }
      // Default handler.
      else {
        if (this.trackingApi[this.defaultMethod]) {
          this.trackingApi[this.defaultMethod](type, eventInfo.name, eventInfo.label);
        }
      }
    }
  };

  G4Analytics.prototype.myAllegiantEvent = function(name, label_arg) {
    var label = label_arg || '';
    var dimensions;
    if (name == 'Login' || name == 'Account Create' || name == 'Forgotten Password' || name == 'Loyalty Member Login') {
      label = 'Navigation';
      var currentPath = window.location.pathname;
      if (currentPath.indexOf('/aares') === 0 || currentPath.indexOf('/lookup') === 0) {
        label = 'In Path';
        dimensions = ['origin', 'destination'];
      }
    }

    this.logEvent('My Allegiant', {'name': name, 'label': label}, dimensions);
  };

  G4Analytics.prototype.getIataCodeDimensions = function() {
    if (
      Drupal.settings.jsui &&
      Drupal.settings.jsui.search_params &&
      Drupal.settings.jsui.search_params.origin &&
      Drupal.settings.jsui.search_params.destination &&
      Drupal.settings.jsui.search_params.origin.code &&
      Drupal.settings.jsui.search_params.destination.code) {
      return {
        "origin": Drupal.settings.jsui.search_params.origin.code,
        "destination": Drupal.settings.jsui.search_params.destination.code,
      }
    }
    return null;
  };

  Drupal.g4Analytics = new G4Analytics();
  g4Analytics_setDefaultDataLayerVars();
})(jQuery);

function g4Analytics_push(type, eventInfo) {
  if (Drupal.g4Analytics) {
    Drupal.g4Analytics.logEvent(type, eventInfo);
  }
}

function g4Analytics_read_and_push(type, item) {
  var gaAttributes = {};
  $.each(item.attributes, function () {
    if (this.name.indexOf("data-ga-") == 0) {
      var key = this.name.replace("data-ga-", "");
      gaAttributes[key] = this.value;
    }
  });
  g4Analytics_push(type, gaAttributes)
}

function g4Analytics_setDefaultDataLayerVars() {
  if (Drupal.g4Analytics && Drupal.g4Analytics.trackingApi) {
    var g4_app_mapped = {
      'ma' : 'WWW',
      'cc' : 'CC',
      'ta' : 'TA'
    };
    var authenticated = $.g4cookie('authenticated');
    var dataLayerVars = {
      "silo": Drupal.settings.silo_id ? Drupal.settings.silo_id : null,
      "user_type": (Drupal.settings.jsui.user && !(Drupal.settings.jsui.user instanceof Array) || typeof authenticated != 'undefined') ? "Customer" : "Guest",
      "drupal_version": Drupal.settings.code_versions ? Drupal.settings.code_versions.drupal : null,
      "jsui_version": Drupal.settings.code_versions ? Drupal.settings.code_versions.jsui : null
    };
    // Loyalty member flag.
    $card_holder_flag = $.g4cookie('CCH');
    if (typeof $card_holder_flag != 'undefined') {
      dataLayerVars['CCH'] = $card_holder_flag;
    }
    // Booking channel.
    if (Drupal.settings.g4_app && Drupal.settings.jsui_app) {
      var jsui_app = Drupal.settings.jsui_app;
      dataLayerVars['booking_channel'] = g4_app_mapped[Drupal.settings.g4_app] + ' - ' + jsui_app.charAt(0).toUpperCase() + jsui_app.slice(1);
    }

    Drupal.g4Analytics.trackingApi.setDataLayerVars(dataLayerVars);
  }
}

function g4Analytics_setDataLayerVars(dimensions) {
  if (Drupal.g4Analytics && Drupal.g4Analytics.trackingApi) {
    Drupal.g4Analytics.trackingApi.setDataLayerVars(dimensions);
  }
}


;/*})'"*/
;/*})'"*/
$(document).ready(function() {
  // Menus & logo clicks.
  $('#logo').click(function() {
    g4Analytics_push('Site Click Tracking', {'name': 'Logo', 'label': document.title});
  });
  $('#mini-panel-top_nav_menu a:not(.menu-hamburger, .expandable)').click(function() {
    g4Analytics_push('Site Click Tracking', {'name': 'Top Nav', 'label': ($(this).attr('title') || $(this).text())});
  });
  $('#mini-panel-allegiant3_bottom_menu a').click(function() {
    g4Analytics_push('Site Click Tracking', {'name': 'Footer', 'label': ($(this).attr('title') || $(this).text())});
  });
  $('.pane-menu-menu-my-profile-left-menu a').click(function() {
    g4Analytics_push('Site Click Tracking', {'name': 'myAllegiant', 'label': ($(this).attr('title') || $(this).text())});
  });
  $('body').on('click', '.track-click', function (evt) {
    Allegiant.tracking.click(evt);
  });
});
;/*})'"*/
;/*})'"*/
(function($) {

  Drupal.homepageTopDeals = {
    topDeals: {},
    disabledDeals: Drupal.settings.homepage_deals.disabled_deals,

    fetch: function(iata_code, callback) {
      var fetchDeals = function(user_state) {
        var self = this;
        var user_state_query = '?user_state=' + user_state;
        var url = Drupal.settings.basePath + 'services/locations/top_deals_slots/' + iata_code + '.json' + user_state_query;
        $.ajax({
          type: "GET",
          url: url,
          dataType: 'json',
          success: function(top_deal_slots) {
            if (top_deal_slots.hasOwnProperty('slot1')) {
              self.topDeals[iata_code] = top_deal_slots;
              callback(iata_code);
            }
          },
          error: function() {
            //
          }
        })
      }.bind(this);

      var updated_user_state_callback = function(event, user_state) {
        fetchDeals(user_state);
      }.bind(this);

      var user_state = Drupal.utils.getUserState();
      if (user_state) {
        fetchDeals(user_state);
      }
      else {
        $(document).on('updated_user_state', updated_user_state_callback);
      }
    },

    update: function(iata_code) {
      this.origin = iata_code;
      if (!Drupal.homepageTopDeals.topDeals.hasOwnProperty(iata_code)) {
        this.fetch(iata_code, this.update);
      }
      else {
        for (var i = 1; i <= 4; i++) {
          if (!Drupal.homepageTopDeals.disabledDeals) {
            Drupal.homepageTopDeals.renderTopDealSlot(Drupal.homepageTopDeals.topDeals[iata_code]['slot' + i], Drupal.homepageTopDeals.getTopDealsSlotContainer(i));
          }
        }
      }
    },

    getTopDealsSlotContainer: function($index) {
      return $('#homepage-top-deal-slot-' + $index);
    },

    renderTopDealSlot: function(topDealInfo, container) {
      // We can't re-display same ad multiple times, google will not update info
      // from it multiple times, so we simply hide previous ads and re-display
      // them when needed.
      var existing_top_deal = container.find('.deal-unit[data-nid="' + topDealInfo.nid + '"]');
      container.find('.deal-unit').hide();
      if (existing_top_deal.size()) {
        existing_top_deal.show();
      }
      else {
        var top_deal = $('<div>', {'class': 'deal-unit', "data-nid": topDealInfo.nid});
        var img = $('<img>', {
          src: topDealInfo.image_url,
          alt: topDealInfo.image_alt,
          'onload': "g4Analytics_read_and_push('TopDealsAdsImpression', this);",
          "data-ga-name": topDealInfo.title,
          "data-ga-creative": topDealInfo.filename,
          "data-ga-position": 'slot' + container.attr('data-slot')
        });
        if (topDealInfo.link && topDealInfo.link.url) {
          top_deal.append($('<a>', {
            href: topDealInfo.link.url,
            'onclick': "g4Analytics_read_and_push('TopDealsAdsClick', this);",
            target: topDealInfo.link.attributes.target ? topDealInfo.link.attributes.target : "_self",
            "data-ga-name": topDealInfo.title,
            "data-ga-creative": topDealInfo.filename,
            "data-ga-position": 'slot' + container.attr('data-slot')
          }).append(img));
        }
        else {
          top_deal.append(img);
        }
        container.append(top_deal);
      }
    }
  };

  $(document).ready(function () {
    if (Drupal.settings.g4_app != 'ma') {
      return;
    }
    var origin;
    // set origin from query parameter or cookie if we've got one
    origin = Drupal.utils.get_search_deals_origin();

    Drupal.homepageTopDeals.update(origin);
  });
})(jQuery);
;/*})'"*/
;/*})'"*/
(function($) {
    var insertJsuiCode = function(maxyData) {
        $('#allegiant_searchform').append(Drupal.settings.searchform_output);
        if (Drupal.settings.jsui.searchform.horizontalLayout) {
            // Update classes for searchform container.
            // Remove billboard container that is not used.
            // Show billboard container that is used.
            var homepageTopWrapper = $('.pane-homepage-billboards-with-search');
            var searchformContainer = $('#multi-search');
            var parentContainer = $('#mini-panel-homepage_billboards_with_search');
            var billboardContainer = parentContainer.find('#landscape-html-wrapper');
            var horizontalBillboardContent = $('<div>', {id: 'horizontal-billboard-wrapper'})
              .append($('<div>', {id: 'horizontal-billboard-background-wrapper'}))
              .append($('<div>', {id: 'horizontal-billboard-container'})
                .append($('<div>', {class: "row"})
                  .append($('<div>', {class: 'columns large-12'})
                    .append(billboardContainer))));

            parentContainer.find('.columns.large-5').removeClass('large-5 medium-6').addClass('large-12');
            switch (Drupal.settings.homepage_deals.horizontal_variant) {
                case 'above_horizontal_widget':
                    parentContainer.parent().find('#mini-panel-homepage_billboards_with_search')
                      .before(horizontalBillboardContent);
                    homepageTopWrapper.addClass('promo-above-horizontal-widget');
                    searchformContainer.addClass('thin-search-form');
                    break;
                case 'below_horizontal_widget':
                    parentContainer.parent().find('#mini-panel-homepage_billboards_with_search')
                      .after(horizontalBillboardContent);
                    homepageTopWrapper.addClass('promo-below-horizontal-widget');
                    searchformContainer.addClass('thin-search-form');
                    break;
                default:
                    homepageTopWrapper.addClass('promo-below-horizontal-background');
                    parentContainer.parent().append(horizontalBillboardContent);
                    searchformContainer.addClass('thin-search-form');
            }
        }
        // Init billboards when document ready.
        if (!$.isReady) {
            $(document).ready(function () {
                Drupal.g4Billboards.init();
            });
        }
        else {
            Drupal.g4Billboards.init();
        }
    };

    // We need horizontal layout for main site only.
    Drupal.settings.jsui.searchform.horizontalLayout = Drupal.settings.g4_app == 'ma';
    insertJsuiCode();
})(jQuery);

;/*})'"*/
;/*})'"*/
(function($) {

  Drupal.g4Billboards = {
    billboards: {},
    disabledDeals: Drupal.settings.homepage_deals.disabled_deals,

    init: function() {
      if (Drupal.settings.g4_app != 'ma') {
        return;
      }

      var updateBackground = function(e, currentChildren) {
        var childrenNumber;
        this.detectedRowHeight = this.detectedRowHeight || $('#child-dob-container').find('.form-item').height();
        var searchformRowHeight = this.detectedRowHeight;
        if (!currentChildren) {
          childrenNumber = $('select[name="search_form[children]"]').val();
        }
        else {
          childrenNumber = currentChildren;
        }
        if (childrenNumber > 0 && Drupal.settings.jsui.searchform.horizontalLayout) {
          childrenNumber = 1;
        }

        // We use some hardcoded values for case when children row can't be found
        // and height can't be detected. It's less likely to happen with current code.
        if (!searchformRowHeight || searchformRowHeight > 74) {
          searchformRowHeight = (Drupal.settings.jsui.searchform.horizontalLayout ? 74 : 70);
        }
        var originalheight = Drupal.g4Billboards.backgroundHeight ? Drupal.g4Billboards.backgroundHeight : 453;
        $('#billboard-image-wrapper').animate({'height': originalheight + childrenNumber * searchformRowHeight}, 400);
      }.bind(this);

      var origin;
      // set origin from query parameter or cookie if we've got one
      origin = Drupal.utils.get_search_deals_origin();

      Drupal.g4Billboards.update(origin);
      $(window).on('breakpoint-change', function() {Drupal.g4Billboards.update(Drupal.g4Billboards.origin)});
      $(window).on('searchformInitComplete', updateBackground);

      Drupal.g4Billboards.backgroundHeight = $('#billboard-image-wrapper').height();
      var currentChildren = Drupal.utils.get_selected_searchform_children();
      updateBackground(null, currentChildren);
      $(document).on('change', 'select[name="search_form[children]"]', updateBackground);
    },

    fetch: function(iata_code, callback) {
      var fetchBillboard = function (user_state) {
        var self = this;
        var user_state_query = '?user_state=' + user_state;
        var url = Drupal.settings.basePath + 'services/locations/billboards/' + iata_code + '.json' + user_state_query;
        if (Drupal.maxymiser.HPBillboard) {
          url += "&maxymiser=1";
        }

        $.ajax({
          type: "GET",
          url: url,
          dataType: 'json',
          success: function(billboard) {
            if (billboard.length > 0) {
              self.billboards[iata_code] = billboard[0];
              callback(iata_code, self);
            }
          },
          error: function() {
            console.log('error');
          }
        })
      }.bind(this);

      var updated_user_state_callback = function(event, user_state) {
        fetchBillboard(user_state);
      }.bind(this);

      var user_state = Drupal.utils.getUserState();
      if (user_state) {
        fetchBillboard(user_state);
      }
      else {
        $(document).on('updated_user_state', updated_user_state_callback);
      }
    },

    update: function(iata_code, self) {
      if (!self) {
        self = this;
      };
      self.origin = iata_code;
      if (!Drupal.g4Billboards.billboards.hasOwnProperty(iata_code)) {
        self.fetch(iata_code, self.update);
      }
      else {
        Drupal.g4Billboards.renderBillboard(Drupal.g4Billboards.billboards[iata_code], Drupal.g4Billboards.getBillboardsContainer());
      }
    },

    getBillboardsContainer: function() {
      return $('.pane-homepage-billboards-with-search');
    },

    getDisclaimerContainer: function() {
      return $('#billboard-disclaimer-box');
    },

    renderDisclaimer: function(billboardInfo, container) {
      if (billboardInfo.disclaimer) {
        container.html('<span class="small-12 columns">' + billboardInfo.disclaimer + '</span>');
      }
      else {
        container.empty();
      }
    },

    renderHorizontalLandscapeBillboard: function (billboardInfo, container) {
      // In this case we have 3 images, one is backgroud for searchform container,
      // horizontal landscape billboard and background for horizontal landscape billboard.
      if (!Drupal.g4Billboards.disabledDeals) {
        var $horizontal_billboard_container = $('#horizontal-billboard-wrapper');
        if (billboardInfo.horizontal_landscape_image.length) {
          if (container.find('#landscape-html-wrapper img').attr('src') != billboardInfo.horizontal_landscape_image) {
            var billboard_landscape_img = $('<img>', {
              src: billboardInfo.horizontal_landscape_image,
              alt: billboardInfo.horizontal_landscape_alt,
              'onload': "g4Analytics_read_and_push('BillboardImpression', this);",
              "data-ga-name": billboardInfo.title,
              "data-ga-creative": billboardInfo.horizontal_landscape_filename,
              "data-ga-position": "Billboard"
            });

            container.find('#landscape-html-wrapper').empty();

            if (billboardInfo.link.url) {
              container.find('#landscape-html-wrapper').append($('<a>', {
                href: billboardInfo.link.url,
                'onclick': "g4Analytics_read_and_push('BillboardClick', this);",
                target: billboardInfo.link.attributes.target ? billboardInfo.link.attributes.target : "_self",
                "data-ga-name": billboardInfo.title,
                "data-ga-creative": billboardInfo.horizontal_landscape_filename,
                "data-ga-position": "Billboard"
              })
                .append(billboard_landscape_img));
            }
            else {
              container.find('#landscape-html-wrapper').append(billboard_landscape_img);
            }
            if (billboardInfo.horizontal_image_back.length) {
              $horizontal_billboard_container.find('#horizontal-billboard-background-wrapper').empty()
                .append($('<img>', {
                  src: billboardInfo.horizontal_image_back,
                  alt: ""
                }));
            }
            $horizontal_billboard_container.addClass('has-promo');
          }
        }
        else {
          container.find('#landscape-html-wrapper').empty();
          $horizontal_billboard_container.removeClass('has-promo');
        }
        Drupal.g4Billboards.renderDisclaimer(billboardInfo, Drupal.g4Billboards.getDisclaimerContainer());
      }
      var billboard_image_wrapper = container.find('#billboard-image-wrapper').empty();
      if (billboardInfo.horizontal_image) {
        billboard_image_wrapper
          .append($('<img>', {
            src: billboardInfo.horizontal_image,
            alt: ""
          }));
      }
    },

    renderMobileBillboard: function (billboardInfo, container) {
      if (!Drupal.g4Billboards.disabledDeals) {
        if (container.find('#mobile-html-wrapper img').attr('src') != billboardInfo.mobile_image) {
          var billboard_mobile_img = $('<img>', {
            src: billboardInfo.mobile_image,
            alt: billboardInfo.mobile_alt,
            'onload': "g4Analytics_read_and_push('BillboardImpression', this);",
            "data-ga-name": billboardInfo.title,
            "data-ga-creative": billboardInfo.mobile_filename,
            "data-ga-position": "Billboard"
          });

          container.find('#mobile-html-wrapper').empty();

          if (billboardInfo.link.url) {
            container.find('#mobile-html-wrapper').append($('<a>', {
              href: billboardInfo.link.url,
              'onclick': "g4Analytics_read_and_push('BillboardClick', this);",
              target: billboardInfo.link.attributes.target ? billboardInfo.link.attributes.target : "_self",
              "data-ga-name": billboardInfo.title,
              "data-ga-creative": billboardInfo.mobile_filename,
              "data-ga-position": "Billboard"
            })
              .append(billboard_mobile_img));
          }
          else {
            container.find('#mobile-html-wrapper').append(billboard_mobile_img);
          }
        }
        container.find('#billboard-image-wrapper').empty();
        Drupal.g4Billboards.renderDisclaimer(billboardInfo, Drupal.g4Billboards.getDisclaimerContainer());
      }
    },

    renderBillboard: function(billboardInfo, container) {
      if (MediaQuery.mediaqueryListener.currentBreakpoint != 'small') {
        Drupal.g4Billboards.renderHorizontalLandscapeBillboard(billboardInfo, container);
      }
      else {
        Drupal.g4Billboards.renderMobileBillboard(billboardInfo, container);
      }
    }
  };
})(jQuery);
;/*})'"*/
;/*})'"*/
/**
 * jQuery-csv (jQuery Plugin)
 * version: 0.71 (2012-11-19)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Acknowledgements:
 * The original design and influence to implement this library as a jquery
 * plugin is influenced by jquery-json (http://code.google.com/p/jquery-json/).
 * If you're looking to use native JSON.Stringify but want additional backwards
 * compatibility for browsers that don't support it, I highly recommend you
 * check it out.
 *
 * A special thanks goes out to rwk@acm.org for providing a lot of valuable
 * feedback to the project including the core for the new FSM
 * (Finite State Machine) parsers. If you're looking for a stable TSV parser
 * be sure to take a look at jquery-tsv (http://code.google.com/p/jquery-tsv/).

 * For legal purposes I'll include the "NO WARRANTY EXPRESSED OR IMPLIED.
 * USE AT YOUR OWN RISK.". Which, in 'layman's terms' means, by using this
 * library you are accepting responsibility if it breaks your code.
 *
 * Legal jargon aside, I will do my best to provide a useful and stable core
 * that can effectively be built on.
 *
 * Copyrighted 2012 by Evan Plaice.
 */

RegExp.escape= function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

(function( $ ) {
  'use strict'
  /**
   * jQuery.csv.defaults
   * Encapsulates the method paramater defaults for the CSV plugin module.
   */

  $.csv = {
    defaults: {
      separator:',',
      delimiter:'"',
      headers:true
    },

    hooks: {
      castToScalar: function(value, state) {
        var hasDot = /\./;
        if (isNaN(value)) {
          return value;
        } else {
          if (hasDot.test(value)) {
            return parseFloat(value);
          } else {
            var integer = parseInt(value);
            if(isNaN(integer)) {
              return null;
            } else {
              return integer;
            }
          }
        }
      }
    },

    parsers: {
      parse: function(csv, options) {
        // cache settings
        var separator = options.separator;
        var delimiter = options.delimiter;

        // set initial state if it's missing
        if(!options.state.rowNum) {
          options.state.rowNum = 1;
        }
        if(!options.state.colNum) {
          options.state.colNum = 1;
        }

        // clear initial state
        var data = [];
        var entry = [];
        var state = 0;
        var value = ''
        var exit = false;

        function endOfEntry() {
          // reset the state
          state = 0;
          value = '';

          // if 'start' hasn't been met, don't output
          if(options.start && options.state.rowNum < options.start) {
            // update global state
            entry = [];
            options.state.rowNum++;
            options.state.colNum = 1;
            return;
          }

          if(options.onParseEntry === undefined) {
            // onParseEntry hook not set
            data.push(entry);
          } else {
            var hookVal = options.onParseEntry(entry, options.state); // onParseEntry Hook
            // false skips the row, configurable through a hook
            if(hookVal !== false) {
              data.push(hookVal);
            }
          }
          //console.log('entry:' + entry);

          // cleanup
          entry = [];

          // if 'end' is met, stop parsing
          if(options.end && options.state.rowNum >= options.end) {
            exit = true;
          }

          // update global state
          options.state.rowNum++;
          options.state.colNum = 1;
        }

        function endOfValue() {
          if(options.onParseValue === undefined) {
            // onParseValue hook not set
            entry.push(value);
          } else {
            var hook = options.onParseValue(value, options.state); // onParseValue Hook
            // false skips the row, configurable through a hook
            if(hook !== false) {
              entry.push(hook);
            }
          }
          //console.log('value:' + value);
          // reset the state
          value = '';
          state = 0;
          // update global state
          options.state.colNum++;
        }

        // escape regex-specific control chars
        var escSeparator = RegExp.escape(separator);
        var escDelimiter = RegExp.escape(delimiter);

        // compile the regEx str using the custom delimiter/separator
        var match = /(D|S|\n|\r|[^DS\r\n]+)/;
        var matchSrc = match.source;
        matchSrc = matchSrc.replace(/S/g, escSeparator);
        matchSrc = matchSrc.replace(/D/g, escDelimiter);
        match = RegExp(matchSrc, 'gm');

        // put on your fancy pants...
        // process control chars individually, use look-ahead on non-control chars
        csv.replace(match, function (m0) {
          if(exit) {
            return;
          }
          switch (state) {
            // the start of a value
            case 0:
              // null last value
              if (m0 === separator) {
                value += '';
                endOfValue();
                break;
              }
              // opening delimiter
              if (m0 === delimiter) {
                state = 1;
                break;
              }
              // null last value
              if (m0 === '\n') {
                endOfValue();
                endOfEntry();
                break;
              }
              // phantom carriage return
              if (/^\r$/.test(m0)) {
                break;
              }
              // un-delimited value
              value += m0;
              state = 3;
              break;

            // delimited input
            case 1:
              // second delimiter? check further
              if (m0 === delimiter) {
                state = 2;
                break;
              }
              // delimited data
              value += m0;
              state = 1;
              break;

            // delimiter found in delimited input
            case 2:
              // escaped delimiter?
              if (m0 === delimiter) {
                value += m0;
                state = 1;
                break;
              }
              // null value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // end of entry
              if (m0 === '\n') {
                endOfValue();
                endOfEntry();
                break;
              }
              // phantom carriage return
              if (/^\r$/.test(m0)) {
                break;
              }
              // broken paser?
              throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');

            // un-delimited input
            case 3:
              // null last value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // end of entry
              if (m0 === '\n') {
                endOfValue();
                endOfEntry();
                break;
              }
              // phantom carriage return
              if (/^\r$/.test(m0)) {
                break;
              }
              if (m0 === delimiter) {
                // non-compliant data
                throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              }
              // broken parser?
              throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
            default:
              // shenanigans
              throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
          }
          //console.log('val:' + m0 + ' state:' + state);
        });

        // submit the last entry
        // ignore null last line
        if(entry.length !== 0) {
          endOfValue();
          endOfEntry();
        }

        return data;
      },

      // a csv-specific line splitter
      splitLines: function(csv, options) {
        // cache settings
        var separator = options.separator;
        var delimiter = options.delimiter;

        // set initial state if it's missing
        if(!options.state.rowNum) {
          options.state.rowNum = 1;
        }

        // clear initial state
        var entries = [];
        var state = 0;
        var entry = '';
        var exit = false;

        function endOfLine() {
          // reset the state
          state = 0;

          // if 'start' hasn't been met, don't output
          if(options.start && options.state.rowNum < options.start) {
            // update global state
            entry = '';
            options.state.rowNum++;
            return;
          }

          if(options.onParseEntry === undefined) {
            // onParseEntry hook not set
            entries.push(entry);
          } else {
            var hookVal = options.onParseEntry(entry, options.state); // onParseEntry Hook
            // false skips the row, configurable through a hook
            if(hookVal !== false) {
              entries.push(hookVal);
            }
          }

          // cleanup
          entry = '';

          // if 'end' is met, stop parsing
          if(options.end && options.state.rowNum >= options.end) {
            exit = true;
          }

          // update global state
          options.state.rowNum++;
        }

        // escape regex-specific control chars
        var escSeparator = RegExp.escape(separator);
        var escDelimiter = RegExp.escape(delimiter);

        // compile the regEx str using the custom delimiter/separator
        var match = /(D|S|\n|\r|[^DS\r\n]+)/;
        var matchSrc = match.source;
        matchSrc = matchSrc.replace(/S/g, escSeparator);
        matchSrc = matchSrc.replace(/D/g, escDelimiter);
        match = RegExp(matchSrc, 'gm');

        // put on your fancy pants...
        // process control chars individually, use look-ahead on non-control chars
        csv.replace(match, function (m0) {
          if(exit) {
            return;
          }
          switch (state) {
            // the start of a value/entry
            case 0:
              // null value
              if (m0 === separator) {
                entry += m0;
                state = 0;
                break;
              }
              // opening delimiter
              if (m0 === delimiter) {
                entry += m0;
                state = 1;
                break;
              }
              // end of line
              if (m0 === '\n') {
                endOfLine();
                break;
              }
              // phantom carriage return
              if (/^\r$/.test(m0)) {
                break;
              }
              // un-delimit value
              entry += m0;
              state = 3;
              break;

            // delimited input
            case 1:
              // second delimiter? check further
              if (m0 === delimiter) {
                entry += m0;
                state = 2;
                break;
              }
              // delimited data
              entry += m0;
              state = 1;
              break;

            // delimiter found in delimited input
            case 2:
              // escaped delimiter?
              var prevChar = entry.substr(entry.length - 1);
              if (m0 === delimiter && prevChar === delimiter) {
                entry += m0;
                state = 1;
                break;
              }
              // end of value
              if (m0 === separator) {
                entry += m0;
                state = 0;
                break;
              }
              // end of line
              if (m0 === '\n') {
                endOfLine();
                break;
              }
              // phantom carriage return
              if (m0 === '\r') {
                break;
              }
              // broken paser?
              throw new Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');

            // un-delimited input
            case 3:
              // null value
              if (m0 === separator) {
                entry += m0;
                state = 0;
                break;
              }
              // end of line
              if (m0 === '\n') {
                endOfLine();
                break;
              }
              // phantom carriage return
              if (m0 === '\r') {
                break;
              }
              // non-compliant data
              if (m0 === delimiter) {
                throw new Error('CSVDataError: Illegal quote [Row:' + options.state.rowNum + ']');
              }
              // broken parser?
              throw new Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');
            default:
              // shenanigans
              throw new Error('CSVDataError: Unknown state [Row:' + options.state.rowNum + ']');
          }
          //console.log('val:' + m0 + ' state:' + state);
        });

        // submit the last entry
        // ignore null last line
        if(entry !== '') {
          endOfLine();
        }

        return entries;
      },

      // a csv entry parser
      parseEntry: function(csv, options) {
        // cache settings
        var separator = options.separator;
        var delimiter = options.delimiter;

        // set initial state if it's missing
        if(!options.state.rowNum) {
          options.state.rowNum = 1;
        }
        if(!options.state.colNum) {
          options.state.colNum = 1;
        }

        // clear initial state
        var entry = [];
        var state = 0;
        var value = '';

        function endOfValue() {
          if(options.onParseValue === undefined) {
            // onParseValue hook not set
            entry.push(value);
          } else {
            var hook = options.onParseValue(value, options.state); // onParseValue Hook
            // false skips the value, configurable through a hook
            if(hook !== false) {
              entry.push(hook);
            }
          }
          // reset the state
          value = '';
          state = 0;
          // update global state
          options.state.colNum++;
        }

        // checked for a cached regEx first
        if(!options.match) {
          // escape regex-specific control chars
          var escSeparator = RegExp.escape(separator);
          var escDelimiter = RegExp.escape(delimiter);

          // compile the regEx str using the custom delimiter/separator
          var match = /(D|S|\n|\r|[^DS\r\n]+)/;
          var matchSrc = match.source;
          matchSrc = matchSrc.replace(/S/g, escSeparator);
          matchSrc = matchSrc.replace(/D/g, escDelimiter);
          options.match = RegExp(matchSrc, 'gm');
        }

        // put on your fancy pants...
        // process control chars individually, use look-ahead on non-control chars
        csv.replace(options.match, function (m0) {
          switch (state) {
            // the start of a value
            case 0:
              // null last value
              if (m0 === separator) {
                value += '';
                endOfValue();
                break;
              }
              // opening delimiter
              if (m0 === delimiter) {
                state = 1;
                break;
              }
              // skip un-delimited new-lines
              if (m0 === '\n' || m0 === '\r') {
                break;
              }
              // un-delimited value
              value += m0;
              state = 3;
              break;

            // delimited input
            case 1:
              // second delimiter? check further
              if (m0 === delimiter) {
                state = 2;
                break;
              }
              // delimited data
              value += m0;
              state = 1;
              break;

            // delimiter found in delimited input
            case 2:
              // escaped delimiter?
              if (m0 === delimiter) {
                value += m0;
                state = 1;
                break;
              }
              // null value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // skip un-delimited new-lines
              if (m0 === '\n' || m0 === '\r') {
                break;
              }
              // broken paser?
              throw new Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');

            // un-delimited input
            case 3:
              // null last value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // skip un-delimited new-lines
              if (m0 === '\n' || m0 === '\r') {
                break;
              }
              // non-compliant data
              if (m0 === delimiter) {
                throw new Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              }
              // broken parser?
              throw new Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
            default:
              // shenanigans
              throw new Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
          }
          //console.log('val:' + m0 + ' state:' + state);
        });

        // submit the last value
        endOfValue();

        return entry;
      }
    },

    /**
     * $.csv.toArray(csv)
     * Converts a CSV entry string to a javascript array.
     *
     * @param {Array} csv The string containing the CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     *
     * This method deals with simple CSV strings only. It's useful if you only
     * need to parse a single entry. If you need to parse more than one line,
     * use $.csv2Array instead.
     */
    toArray: function(csv, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      var state = (options.state !== undefined ? options.state : {});

      // setup
      var options = {
        delimiter: config.delimiter,
        separator: config.separator,
        onParseEntry: options.onParseEntry,
        onParseValue: options.onParseValue,
        state: state
      }

      var entry = $.csv.parsers.parseEntry(csv, options);

      // push the value to a callback if one is defined
      if(!config.callback) {
        return entry;
      } else {
        config.callback('', entry);
      }
    },

    /**
     * $.csv.toArrays(csv)
     * Converts a CSV string to a javascript array.
     *
     * @param {String} csv The string containing the raw CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     *
     * This method deals with multi-line CSV. The breakdown is simple. The first
     * dimension of the array represents the line (or entry/row) while the second
     * dimension contains the values (or values/columns).
     */
    toArrays: function(csv, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;

      // setup
      var data = [];
      var options = {
        delimiter: config.delimiter,
        separator: config.separator,
        onParseEntry: options.onParseEntry,
        onParseValue: options.onParseValue,
        start: options.start,
        end: options.end,
        state: {
          rowNum: 1,
          colNum: 1
        }
      };

      // break the data down to lines
      data = $.csv.parsers.parse(csv, options);

      // push the value to a callback if one is defined
      if(!config.callback) {
        return data;
      } else {
        config.callback('', data);
      }
    },

    /**
     * $.csv.toObjects(csv)
     * Converts a CSV string to a javascript object.
     * @param {String} csv The string containing the raw CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Boolean} [headers] Indicates whether the data contains a header line. Defaults to true.
     *
     * This method deals with multi-line CSV strings. Where the headers line is
     * used as the key for each value per entry.
     */
    toObjects: function(csv, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers;
      options.start = 'start' in options ? options.start : 1;

      // account for headers
      if(config.headers) {
        options.start++;
      }
      if(options.end && config.headers) {
        options.end++;
      }

      // setup
      var lines = [];
      var data = [];

      var options = {
        delimiter: config.delimiter,
        separator: config.separator,
        onParseEntry: options.onParseEntry,
        onParseValue: options.onParseValue,
        start: options.start,
        end: options.end,
        state: {
          rowNum: 1,
          colNum: 1
        },
        match: false
      };

      // fetch the headers
      var headerOptions = {
        delimiter: config.delimiter,
        separator: config.separator,
        start: 1,
        end: 1,
        state: {
          rowNum:1,
          colNum:1
        }
      }
      var headerLine = $.csv.parsers.splitLines(csv, headerOptions);
      var headers = $.csv.toArray(headerLine[0], options);

      // fetch the data
      var lines = $.csv.parsers.splitLines(csv, options);

      // reset the state for re-use
      options.state.colNum = 1;
      if(headers){
        options.state.rowNum = 2;
      } else {
        options.state.rowNum = 1;
      }

      // convert data to objects
      for(var i=0, len=lines.length; i<len; i++) {
        var entry = $.csv.toArray(lines[i], options);
        var object = {};
        for(var j in headers) {
          object[headers[j]] = entry[j];
        }
        data.push(object);

        // update row state
        options.state.rowNum++;
      }

      // push the value to a callback if one is defined
      if(!config.callback) {
        return data;
      } else {
        config.callback('', data);
      }
    },

    /**
     * $.csv.fromArrays(arrays)
     * Converts a javascript array to a CSV String.
     *
     * @param {Array} array An array containing an array of CSV entries.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     *
     * This method generates a CSV file from an array of arrays (representing entries).
     */
    fromArrays: function(arrays, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.escaper = 'escaper' in options ? options.escaper : $.csv.defaults.escaper;
      config.experimental = 'experimental' in options ? options.experimental : false;

      if(!config.experimental) {
        throw new Error('not implemented');
      }

      var output = [];
      for(i in arrays) {
        output.push(arrays[i]);
      }

      // push the value to a callback if one is defined
      if(!config.callback) {
        return output;
      } else {
        config.callback('', output);
      }
    },

    /**
     * $.csv.fromObjects(objects)
     * Converts a javascript dictionary to a CSV string.
     * @param {Object} objects An array of objects containing the data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     *
     * This method generates a CSV file from an array of objects (name:value pairs).
     * It starts by detecting the headers and adding them as the first line of
     * the CSV file, followed by a structured dump of the data.
     */
    fromObjects2CSV: function(objects, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.experimental = 'experimental' in options ? options.experimental : false;

      if(!config.experimental) {
        throw new Error('not implemented');
      }

      var output = [];
      for(i in objects) {
        output.push(arrays[i]);
      }

      // push the value to a callback if one is defined
      if(!config.callback) {
        return output;
      } else {
        config.callback('', output);
      }
    }
  };

  // Maintenance code to maintain backward-compatibility
  // Will be removed in release 1.0
  $.csvEntry2Array = $.csv.toArray;
  $.csv2Array = $.csv.toArrays;
  $.csv2Dictionary = $.csv.toObjects;

})( jQuery );

;/*})'"*/
;/*})'"*/
(function ($) {
  if (window.location.pathname == Drupal.settings.basePath && Drupal.utils.getParameterByName('ic_error').length) {
    g4Analytics_setDataLayerVars({
      cart_repopulated: "no"
    });
  }
})(jQuery);
;/*})'"*/
;/*})'"*/
(function($) {
  function G4Overlay() {
    this.overlay= false;
    this.enabledOverlay = Drupal.settings.overlay.overlay_enabled;
  }

  G4Overlay.prototype.init = function () {
    // Conditions to use overlay is: functionality enabled in CMS,
    // CCO cookie should not be set and g4_app should be default(ma).
    // Otherwise we do not use overlay.
    if (!Drupal.g4Overlay.enabledOverlay || $.g4cookie('CCO') || Drupal.settings.g4_app != 'ma') {
      return;
    }
    $(window).on('breakpoint-change', function () {
      this.update();
    }.bind(this));
    this.update();
  };

  G4Overlay.prototype.fetch = function (callback) {
    var self = this;
    var query_string = '';
    var startOverlayProcess = function (title, variant) {
      if (title && variant && title.length && variant.length) {
        query_string = '?title=' + title + "&variant=" + variant;
        self.maxymiser = true;
      }
      var fetchOverlay = function (user_state) {
        var url = Drupal.settings.basePath + 'services/overlay/overlay/' + user_state + '.json' + query_string;
        $.ajax({
          type: "GET",
          url: url,
          dataType: 'json',
          success: function (overlays) {
            if (overlays.length > 0) {
              self.overlay = overlays[0];
              callback();
            }
          },
          error: function () {
            console.log('error');
          }
        });
      }.bind(this);

      var updated_user_state_callback = function (event, user_state) {
        var loyalty_state = user_state;
        if(Drupal.hasOwnProperty('user')) {
          loyalty_state = Drupal.utils.getUserState(true);
        }
        fetchOverlay(loyalty_state);
        $(document).off('updated_user_state', updated_user_state_callback);
      }.bind(this);

      var user_state = Drupal.utils.getUserState(true);
      if (user_state) {
        fetchOverlay(user_state);
      }
      else {
        $(document).on('updated_user_state', updated_user_state_callback);
      }
    };

    if (Drupal.maxymiser.HPOverlay) {
      var HPOverlay = Drupal.maxymiser.HPOverlay;
      if (HPOverlay.title && HPOverlay.variant) {
        startOverlayProcess(HPOverlay.title, HPOverlay.variant);
      }
    }
    else {
      startOverlayProcess();
    }
  };

  G4Overlay.prototype.update = function () {
    // Check cookie again for cases when screen size switched from mobile to desktop or vice versa.
    if (!$.g4cookie('CCO')) {
      if (!this.overlay) {
        this.fetch(this.update.bind(this));
      }
      else {
        this.renderOverlay()
      }
    }
    else {
      // If we already have cookie and screen size was changed we need to rework overlay a bit.
      if (this.overlay && this.dialog) {
        this.renderOverlay();
      }
    }
  };

  G4Overlay.prototype.renderOverlay = function () {
    if (MediaQuery.mediaqueryListener.currentBreakpoint != 'small') {
      this.renderDesktopOverlay();
    }
    else {
      this.renderMobileOverlay();
    }
  };

  G4Overlay.prototype.renderDesktopOverlay = function () {
    if (this.maxymiser) {
     this.openModalMaxymiser('desktop');
    }
    else {
      this.openModal('desktop');
    }
  };

  G4Overlay.prototype.renderMobileOverlay = function () {
    if (this.maxymiser) {
      this.openModalMaxymiser('mobile');
    }
    else {
      this.openModal('mobile');
    }
  };

  G4Overlay.prototype.openModal = function(type) {
      var self = this;
      if (this.dialog) {
        this.dialog.dialog("close");
      }
      var maxWidth = type == 'mobile' ? 300 : 750;
      var maxHeight = type == 'mobile' ? 300 : 500;
      if (this.overlay.additional_text && this.overlay.additional_text.length) {
          var content =
              $('<div>', {"class": "credit-card-overlay-content"})
                  .append($('<div>', {
                    "html": this.overlay.additional_text
                  })
              );

          var dialog = $('<div></div>')
              .html(content)
              .dialog({
                autoOpen: true,
                modal: true,
                title: '',
                width: 'auto',
                maxWidth: maxWidth,
                dialogClass: 'credit-card-overlay-wrapper dialog-drupal',
                autoResize: true,
                close: function () {
                  $(this).remove();
                  self.dialog = false;
                },
                open: function () {
                  $.g4cookie('CCO', '1', {expires: 1});
                  repositionModal();
                  $(this).parent().css('max-width', maxWidth + 'px');
                  $(this)
                    .css('max-width', maxWidth + 'px');
                  $(this).find('img').on('load', repositionModal);

                  $(this).attr('id', 'credit-card-overlay');
                  $(this).delegate('.overlay-target-url', 'click', function () {
                    dialog.dialog("close");
                    self.dialog = false;
                  });
                  repositionModal();
                }
              });
          this.dialog = dialog;
      }
  };

  G4Overlay.prototype.openModalMaxymiser = function(type) {
    var self = this;
    if (this.dialog) {
      this.dialog.dialog("close");
    }
    var cookieExpiration = this.overlay.time_end;
    var maxWidth = type == 'mobile' ? 300 : 750;
    var maxHeight = type == 'mobile' ? 300 : 500;
    // Add additional text if we have it.
    if (this.overlay.additional_text && this.overlay.additional_text.length) {
    var content =
      $('<div>', {"class": "credit-card-overlay-content"})
        .append($('<div>', {
            "html": this.overlay.additional_text
          })
      );
    }

    var dialog = $('<div></div>')
      .html(content)
      .dialog({
        autoOpen: true,
        modal: true,
        title: '',
        width: 'auto',
        maxWidth: maxWidth,
        dialogClass: 'credit-card-overlay-wrapper dialog-drupal',
        autoResize: true,
        close: function () {
          $(this).remove();
          self.dialog = false;
        },
        open: function () {
          $.g4cookie('CCO', '1', {expires: cookieExpiration});
          repositionModal();
          $(this).parent()
            .css('max-width', maxWidth + 'px');
          $(this)
            .css('max-width', maxWidth + 'px');
          $(this).find('img').on('load', repositionModal);

          $(this).attr('id', 'credit-card-overlay');
          $(this).delegate('.overlay-target-url', 'click', function () {
            dialog.dialog("close");
            self.dialog = false;
          });
          repositionModal();
        }
      });
    this.dialog = dialog;
  };

  Drupal.g4Overlay = new G4Overlay();
  $(document).on('maxymiser_loaded', function() {
    Drupal.g4Overlay.init();
  });
})(jQuery);

;/*})'"*/
;/*})'"*/
document.cookie = 'has_js=1; path=/; secure';
;/*})'"*/
;/*})'"*/
var updatePosition = function( event ) {
  if (MediaQuery.mediaqueryListener.currentBreakpoint != 'small') {
    $('#fixed-header').css('position', 'relative');
  }
};

if (!$('body').hasClass('page-in-path') &&
  ( navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPod/i))
) {
  updatePosition();
  window.addEventListener('orientationchange', updatePosition);
}

if (( navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPod/i))
) {
  $('body').addClass('ios-device');
}

;/*})'"*/
;/*})'"*/
(function( $ ) {
  'use strict';
  var name        = 'dealstrip';
  var arrProto    = Array.prototype;
  var slice       = arrProto.slice;

  function delay( fn, timeout, con ) {
    var args = slice.call( arguments, 3 );
    return function() {
      setTimeout(function () {
        fn.apply(con, args);
      }, timeout);
    };
  }

  /**
   * DealsRenderer
   */
  function DealsRenderer (options, element) {
    this.fetcher = new DealsFetcher({source: options.sources.flights, sort_by: options.sort_by, airports: options.airports});
    this.options = options || {};
    this.element = element;
    this.containerSelector = '#deals > ul';
    this.firstCity = null;
    return this;
  }

  DealsRenderer.prototype.render = function (callback) {
    var self = this;

    // Render deals.
    var filteredDeals = {};
    if (this.fetcher.getDeals()) {
      filteredDeals = this.renderList(this.fetcher.getDeals());
    }
    else {
      this.showLoadingScreen();
      this.fetcher.start()
          .done(function (data) {
            if (callback) {
              callback();
            }
            self.removeLoadingScreen();
            filteredDeals = self.renderList(data);
          })
          .fail(function (data) {
            if (callback) {
              callback();
            }
            self.removeLoadingScreen();
            filteredDeals = self.renderTimeoutError(data);
          });
    }
  };

  DealsRenderer.prototype.showLoadingScreen = function() {
    $(this.containerSelector).parent().find('.container-loader').remove();
    var html = '<div class="container-loader"></div>';
    $(this.containerSelector).parent().append(html);
  };
  DealsRenderer.prototype.removeLoadingScreen = function() {
    $(this.containerSelector).parent().find('.container-loader').remove();
  };

  DealsRenderer.prototype.renderTimeoutError = function(data) {
    this.element.find(this.containerSelector).empty().append(this.timeoutMessage());
  };

  DealsRenderer.prototype.timeoutMessage = function() {
    if (!this.timeoutMessageHtml) {
      this.timeoutMessageHtml = this.errorMessage(
          Drupal.settings.homepage_deals.noDealsHeader ? Drupal.settings.homepage_deals.noDealsHeader : 'No Deals for This Destination at This Time',
          Drupal.settings.homepage_deals.serviceErrorMessage ? Drupal.settings.homepage_deals.serviceErrorMessage : "This seems to be our fault and we're fixing it, please check this section later."
      );
    }
    return this.timeoutMessageHtml;
  };

  DealsRenderer.prototype.noDealsMessage = function() {
    if (!this.noDealsMessageHtml) {
      this.noDealsMessageHtml = this.errorMessage(
          Drupal.settings.homepage_deals.noDealsHeader ? Drupal.settings.homepage_deals.noDealsHeader : 'No deals to display from the selected airport at this time.',
          Drupal.settings.homepage_deals.noDealsMessage ? Drupal.settings.homepage_deals.noDealsMessage : "Please check back with us later or select a different airport."
      );
    }
    return this.noDealsMessageHtml;
  };

  /**
   * Generates an error message for deals.
   *
   * @param {String} header
   *   Header text
   * @param {String} message
   *   Message text.
   *
   * @returns {*}
   *   Html for error message.
   */
  DealsRenderer.prototype.errorMessage = function (header, message) {
    return $('<li>', {'class': 'deals-error-item'})
              .append($('<div>', {'class': 'deals-error-container row'})
                  .append($('<div>', {'class': 'deals-error-wrapper columns large-12 medium-12 small-12'})
                      .append($('<div>', {'class': 'deals-error-header', 'html': "<h3>" + header + "</h3>"}))
                      .append($('<div>', {'class': 'deals-error-message', 'html': "<p>" + message + "</p>"}))
              )
          );
  };

  DealsRenderer.prototype.sortBeforeRender = function(filteredDeals) {
    var sortTarget,
        self = this;

    // Sort deals based on iata sorting settings.
    var page = (this.options.theme == 'HomepageDealsRenderer' ? 'home_page' : 'deals_page');
    var sort_settings = this.options.sorting_settings_by_iata_code;
    var orderType = (sort_settings[this.options.origin] && sort_settings[this.options.origin][page] ? sort_settings[this.options.origin][page] : 'default');

    if (orderType == 'alphabetically') {
      sortTarget = 'Dest';
      filteredDeals.sort(function (one, two) {
        if (one[sortTarget] == two[sortTarget]) return 0;
        return (self.options.airports[one[sortTarget]] || one[sortTarget]).localeCompare(self.options.airports[two[sortTarget]] || two[sortTarget]);
      });
    }
    if (orderType == 'price') {
      sortTarget = 'Price';
      filteredDeals.sort(function (one, two) {
        if (one[sortTarget] == two[sortTarget]) return 0;
        return (one[sortTarget]).localeCompare(two[sortTarget]);
      });
    }
    return filteredDeals;
  };

  DealsRenderer.prototype.renderList = function (deals) {
    var
      i,
      render_vars = {timeout : 0},
      filteredDeals,
      filter = this.flightFilter();

    // We'll render all types of deals/ads/promotions.
    filteredDeals = this.filter(deals['flight'], filter);
    filteredDeals = this.sortBeforeRender(filteredDeals);

    var $flight_deals_container = $(this.containerSelector);
    $flight_deals_container.empty();
    if (filteredDeals.length) {
      // Render items and show disclaimer.
      for (i = 0; i < filteredDeals.length; i++) {
        this.renderItem(this['flightRow'](filteredDeals[i]), $flight_deals_container, render_vars);
      }
      this.disclaimerContainer().removeClass('element-invisible').show();
    }
    else {
      // Render no deals message and hide disclaimer.
      $flight_deals_container.append(this.noDealsMessage());
      this.disclaimerContainer().addClass('element-invisible').hide();
    }
    return filteredDeals;
  };

  // Render one item of various type.
  DealsRenderer.prototype.renderItem = function( $item, $container, render_vars ) {
    var self = this;
    if ($item) {
      $container.append($item);
      $item.find('a').on('click', function (evt) {
        evt.preventDefault();
        self.element.trigger('dealselected', [$item.data(name + '_deal')]);
        window.location = $(this).get(0).href;
      });
      delay($.fn.fadeIn, render_vars.timeout, $item)();
      render_vars.timeout += (300 / ( $container.children().length || 1 ));
    }
  };


  DealsRenderer.prototype.flightFilter = function() {
    var filter = {};
    if( this.options.destination ) {
      filter['Dest'] = this.options.destination;
    }
    if( this.options.origin ) {
      filter['Origin'] = this.options.origin;
    }
    filter['End Travel Date'] = new Date();
    return $.isEmptyObject( filter ) ? null : filter;
  };

  DealsRenderer.prototype.filter = function( deals, filter ) {
    return $.grep(deals, function(deal, index) {
      for (var field in filter) {
        if (deal.hasOwnProperty(field)) {
          // Compare strings or array of strings
          if (!(filter[field] instanceof Date)) {
            // Filter is a string and input is an array
            if ($.isArray(deal[field])) {
              if (deal[field].indexOf(filter[field]) == -1) {
                return false;
              }
            }
            else {
              // Case where filter is an array and input is a string.
              if ($.isArray(filter[field])) {
                if (filter[field].indexOf(deal[field]) == -1) {
                  return false;
                }
              }
              // input and filter are both strings.
              else if (deal[field] != filter[field]) {
                return false;
              }
            }
          }
          // Compare dates.
          else {
            var $deal_date = new Date(deal['End Travel Date']);
            if ($deal_date < filter['End Travel Date']) {
              return false;
            }
          }
        }
      }
      return true;
    });
  };

  DealsRenderer.prototype.flightRow = function( data ) {
    return $('<li style="display: none;">')
      .append($('<div>', {'class': "flight-deal-wrapper row"})
        .append($('<div>', {'class': "dd-wrapper large-12 medium-12-small-12 columns"}).append($('<h3>', {'class': "deal-destination", 'text': this.airportLookup( data.Dest )})))
        .append($('<div>', {'class': "flight-deal-details-wrapper large-12 medium-12-small-12 columns"})
          .append($('<div>', {'class': "flight-deal-details row"})
            .append($('<div>', {'class': "destination-interval large-6 medium-5 small-6 columns", 'html': "<p>Rates sampled from " + this.flightDates( data ) + "</p>"}))
            .append($('<div>', {'class': "price large-4 medium-4 small-6 columns", 'html': '<p>One way as low as <strong class="deal-price">' + this.price( data['Price'] ) + '</strong></p>'}))
            .append($('<div>', {'class': "button-wrapper large-3 medium-4 small-12 columns", 'html': '<a class="button medium-up continue" href="' + this.getFlightLink( data ) + '">Book now</a><a class="button tile continue" href="' + this.getFlightLink( data ) + '">Book now</a>'}))
        )
      )
    );
  };

  DealsRenderer.prototype.disclaimerContainer = function() {
    return $('#disclaimer-box').empty().append('<span class="small-12 columns">' + Drupal.settings.homepage_deals.disclaimer_text + '</span>');
  };

  DealsRenderer.prototype.flightsContainer = function() {
    if (!this.$flights) {
      var $header_content = $('<div>', {"class": "flight-deals-header-wrapper row"})
        .append($('<div>', {'class': "text-center large-12 medium-12 small-12"})
          .append($('<h2>', {'class': 'element-invisible', text: 'Browse Allegiant Travel Deals'}))
          .append(this.flightsHeaderDestinations())
      );
      var $header = $('<div>', {'class': "flight-deals-header-section"});
      $header.append($header_content);
      this.$flights = $('<div>', {'class': "flight-deals-grid"})
        .append($header)
        .append($('<div>', {id: "deals", 'class': "deals-items"}).append($('<ul>')));
    }
    else {
      this.originDropdown.find('input[type="hidden"]').val(this.options.origin);
      this.originDropdown.find('input[type="text"]').val(this.options.airports[this.options.origin]);
    }
    return this.$flights;
  };

  DealsRenderer.prototype.flightsHeaderDestinations = function() {
    var header_content =  $('<div>', {'class': 'deals-destinations'})
      .append($('<label>', {text: 'Top Nonstop Flight Deals' + (this.options.origin ? ' from ' : ' '), "for": "change-airport-deals"}));
    if( this.options.origin ) {
      header_content.append(this.OriginDropdown());
    }

    if( this.options.destination ) {
      header_content.append(' to ' + this.options.airports[this.options.destination]);
    }
    return header_content;
  };

  DealsRenderer.prototype.OriginDropdown = function() {
    if (!this.originDropdown) {
      this.originDropdown = $('<input>', {type: "text", "class": "ctWhitelist", id: "change-airport-deals", "aria-controls": "deals", "role": "combobox"}).g4_autocomplete({id: "airport-deals-widget", source: this.options.dropdown_airports, defaultValue: 'LAS'});
      this.originDropdown.find('input[type="hidden"]').val(this.options.origin);
      this.originDropdown.find('input[type="text"]').val(this.options.airports[this.options.origin]);
      this.originDropdown.on('change', function() {
        var new_origin = $(this).find('input[type="hidden"]').val();
        $('#deals-box').dealstrip("option", 'origin', new_origin);
        Drupal.homepage_deals_widget.render();
        Drupal.homepageTopDeals.update(new_origin);
        Drupal.g4Billboards.update(new_origin);
      });
    }
    return this.originDropdown;
  };

  DealsRenderer.prototype.getFlightLink = function( data ) {
    var params = {
      'FL_dair': data.Origin,
      'FL_aair': data.Dest,
      'FL_1_ddte': data.DeepLinkStartTravelDate,
      'FL_2_ddte': data.DeepLinkEndTravelDate,
      'dlSource': this.options.dlSource,
      'search_type': 'F',
      'flnc': '2',
      'FL_1_arlc': 'G4',
      'FL_2_arlc': 'G4',
      'adu': '2'
    };
    if (this.options.show_calendar) {
      params.show_calendar = "1";
    }
    return '/lookup/md5/' + this.options.md5 + '?' + $.param(params);
  };

  DealsRenderer.prototype.airportLookup = function( code ) {
    return this.options.airports[code] || code;
  };
  DealsRenderer.prototype.airportDealsCountLookup = function( code ) {
    return this.options.airports_hotel_deals_count[code];
  };

  DealsRenderer.prototype.airportNameLookup = function( code ) {
    return this.options.airport_names[code] || code;
  };

  DealsRenderer.prototype.flightDates = function( row ) {
    return this.sanitize( row['Start Travel Date'] + ' through ' + row['End Travel Date'] );
  };

  DealsRenderer.prototype.getFlightDuration = function ( row ) {
    if (row.hasOwnProperty('Duration')) {
      var timeParts = row['Duration'].split(':');
      var hours = parseInt(timeParts[0]);
      var minutes = parseInt(timeParts[1]);
      return hours + "h " + minutes + " m";
    }
    return '';
  };

  DealsRenderer.prototype.sanitize = function (string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  DealsRenderer.prototype.price = function( price ) {
    var priceArray = price.split('.');
    return '$' + priceArray[0] + '<sup>' + (priceArray[1] ? priceArray[1] : '') + '</sup>';
  };

  DealsPageFlightDealsRenderer.prototype = Object.create(DealsRenderer.prototype);
  DealsPageFlightDealsRenderer.prototype.constructor = DealsPageFlightDealsRenderer;

  function DealsPageFlightDealsRenderer(options, element) {
    DealsRenderer.call(this, options, element);
    return this;
  }

  DealsPageFlightDealsRenderer.prototype.flightRow = function( data ) {
    return $('<li style="display: none;">')
      .append($('<div>', {'class': "flight-deal-wrapper no-separator row"})
        .append($('<div>', {'class': "flight-deal-details-wrapper large-12 columns"})
          .append($('<a>', {'href': this.getFlightLink( data ), 'class': "flight-deal-card-container deals-page-flight-deal-details row"})
            .append(this.ribbonHtml())
            .append($('<div>', {'class': 'flight-deal-card'})
              .append(this.routeDetailsHtml(this.airportNameLookup( data.Origin ), this.airportNameLookup( data.Dest ), data.Origin, data.Dest, this.flightDates( data ), this.getFlightDuration(data)))
              .append(this.routePriceCardHtml(data['Price']))
              .append(this.smallOnlyTerms(this.flightDates( data )))
            )
          )
        )
      );
  };

  DealsPageFlightDealsRenderer.prototype.ribbonHtml = function() {
    var html =
      '<div class="gv-stub">' +
      '<div class="gv-ribbon g4orangeBg">' +
      '<span class="gv-ribbon-curl"></span>' +
      '</div>' +
      '</div>';
    return html;
  };

  DealsPageFlightDealsRenderer.prototype.routeDetailsHtml = function (fromCity, toCity, iataFrom, iataTo, dates, duration) {
    var html = '<div class="route-details">\n' +
      '<div class="route-info g4blue">\n' +
      '<div class="origin">{{fromCity}} to</div>\n' +
      '<div class="destination">{{toCity}}</div>\n' +
      '<div class="flight-time-container"><span class="airport-code">{{iataFrom}}</span><span class="flight-time"><span>NONSTOP<br>{{duration}}<sup>‡</sup></span></span><span class="airport-code">{{iataTo}}</span></div>\n' +
      '</div>\n' +
      '<div class="route-terms medium-up">\n' +
      '<div class="line1 g4red">Book Now! Limited seats at this price.</div>\n' +
      '<div class="line2 g4green">Risk free! You can cancel within 24 hours of booking.<sup>†</sup></div>\n' +
      '<div class="line3">Rates sampled from {{dates}} include all taxes and fees</div>\n' +
      '</div>\n' +
      '</div>';

    return html
      .replace(/{{fromCity}}/g, fromCity)
      .replace(/{{toCity}}/g, toCity)
      .replace(/{{iataFrom}}/g, iataFrom)
      .replace(/{{iataTo}}/g, iataTo)
      .replace(/{{duration}}/g, duration)
      .replace(/{{dates}}/g, dates);
  };

  DealsPageFlightDealsRenderer.prototype.routePriceCardHtml = function (price) {
   var html = '<div class="route-price-card">' +
     '<div class="pc-header-warning g4redBg">Limited seats at this price</div>' +
     '<div class="pc-price">{{price}}</div>' +
     '<div class="pcp-subtext"></div>' +
     '<div class="cta-container"><span class="button continue g4greenBg">Book Now</span></div>' +
     '<div class="pc-usp g4green">Free 24-hour cancellation<sup>†</sup></div>' +
     '</div>';
   return html
     .replace(/{{price}}/g, price);
  };

  DealsPageFlightDealsRenderer.prototype.smallOnlyTerms = function (dates) {
    var html = '<div class="route-terms small-down">' +
      '<div class="line3">Rates sampled from {{dates}} include all taxes and fees</div>' +
      '</div>';
    return html.replace(/{{dates}}/g, dates)
  }
  


  HotelDealsRenderer.prototype = Object.create(DealsRenderer.prototype);
  HotelDealsRenderer.prototype.constructor = HotelDealsRenderer;

  function HotelDealsRenderer(options, element) {
    this.fetcher = new HotelDealsFetcher({source: options.sources.hotels, sort_by: options.sort_by, airports: options.airports});
    this.options = options || {};
    this.element = element;
    this.containerSelector = '#hotel-deals > ul';
    this.widget = this.element.data('g4Dealstrip');
    this.flightDealsDates = this.widget.renderers['flights'].fetcher.travelDates;
    return this;
  }

  HotelDealsRenderer.prototype.getFlightLink = function( data, destinationIata) {
    var startDate = this.getStartTravelDate(data),
        endDate = this.getEndTravelDate(data, startDate);

    var params = {
      'FL_dair': this.options.origin,
      'FL_aair': destinationIata,
      'FL_1_ddte': this.formatDate('mmddyy', startDate),
      'FL_2_ddte': this.formatDate('mmddyy', endDate),
      'dlSource': this.options.dlSource,
      'search_type': 'F',
      'flnc': '2',
      'FL_1_arlc': 'G4',
      'FL_2_arlc': 'G4',
      'adu': '2',
      'hotelId': data.hotelId
    };
    if (this.options.show_calendar) {
      params.show_calendar = "1";
    }
    if (data.promo) {
      params.promo = data.promo;
    }
    return '/lookup/md5/' + this.options.md5 + '?' + $.param(params);
  };

  HotelDealsRenderer.prototype.getStartTravelDate = function( data ) {
    var occ_start_date = new Date(data.occupancy_from);
    var occ_end_date = new Date(data.occupancy_to);
    var date = new Date();
    var startTravel;

    // Use dates from flight deals if they are included in promotion interval.
    var flightDates;
    if (this.flightDealsDates[this.options.origin + data.iata] != 'undefined') {
      flightDates = this.flightDealsDates[this.options.origin + data.iata];
    }

    if (flightDates
      && flightDates.start.getTime() >= occ_start_date.getTime()
      && flightDates.start.getTime() <= occ_end_date.getTime()) {
      startTravel = flightDates.start;
    }
    // Use a date as close to 45 days in advance of today that falls in the
    // promotion window.
    else {
      startTravel = new Date();
      startTravel.setDate(startTravel.getDate() + 45);
      // In case that occupancy start time is before current time, move
      // occupancy start time to current date.
      if (occ_start_date.getTime() < date.getTime()) {
        occ_start_date = date;
      }
      if (startTravel.getTime() <= occ_start_date.getTime() || startTravel.getTime() > occ_end_date.getTime()) {
        startTravel = occ_start_date;
      }
    }
    return startTravel;
  };

  HotelDealsRenderer.prototype.getEndTravelDate = function( data , startDate) {
    var occ_start_date = new Date(data.occupancy_from);
    var occ_end_date = new Date(data.occupancy_to);

    var flightDates;
    if (this.flightDealsDates[this.options.origin + data.iata] != 'undefined') {
      flightDates = this.flightDealsDates[this.options.origin + data.iata];
    }
    var endTravel;
    if (flightDates
      && startDate.getTime() >= occ_start_date.getTime()
      && startDate.getTime() <= occ_end_date.getTime()
      && flightDates.end.getTime() >= occ_start_date.getTime()
      && flightDates.end.getTime() <= occ_end_date.getTime()) {
      endTravel = flightDates.end;
    }
    else {
      var limitTravel = new Date();
      limitTravel = new Date(startDate.getTime());
      limitTravel.setDate(limitTravel.getDate() + 14);
      endTravel = new Date(data.occupancy_to.replace(/-/g, '/'));
      if (endTravel.getTime() > limitTravel.getTime()) {
        endTravel = limitTravel;
      }
    }
    return endTravel;
  };

  HotelDealsRenderer.prototype.formatDate = function(format, date) {
    return $.datepicker.formatDate(format, date);
  };

  HotelDealsRenderer.prototype.dateDescription = function(dateString) {
    var date = new Date(dateString.replace(/-/g, '/'));
    return '<p>Must book by ' + $.datepicker.formatDate('DD, MM d, yy', date) + '. Restrictions may apply.</p>';
  };

  HotelDealsRenderer.prototype.hotelsDealsWrapper = function() {
    return $('<div>', {id: 'hotel-deals-destinations-wrapper'});
  };

  HotelDealsRenderer.prototype.hotelFilter = function() {
    var filter = {};
    if( this.options.connections) {
      if (this.options.destination) {
        filter['iata'] = this.options.connections[this.options.destination];
      }
      else {
        if (this.options.origin) {
          filter['iata'] = this.options.connections[this.options.origin];
        }
      }
    }
    filter['End Travel Date'] = new Date();
    return $.isEmptyObject( filter ) ? null : filter;
  };

  HotelDealsRenderer.prototype.destinationHotelDeals = function(destinationIata, destinationDeals, hotel_deals_count) {
    if (destinationDeals && destinationDeals.length > 0) {
      var deals_html = '';
      // If hotel_deals_count is false we want unlimited deals.
      var maximum_deals = hotel_deals_count !== false ? hotel_deals_count : 3;
      deals_html = $('<ul>');

      for (var i = 0; i < destinationDeals.length && i < maximum_deals; i++) {
        var promos_output = $('<div>', {class: "columns small-12 medium-7 large-7"});
        promos_output.append($('<h4>', {class: "deal-description", html: destinationDeals[i].title}));
        destinationDeals[i].promos_list.forEach(function(promoInfo) {
          promos_output.append($('<h5>', {class: "deal-title", html: promoInfo.description}));
          promos_output.append($('<p>', {html: this.dateDescription(promoInfo.reservation_to)}));
        }.bind(this));
        var deal = $('<li>')
          .append($('<div>', {class: "row hotel-deal-wrapper"})
            .append($('<div>', {class: "columns large-2 medium-2 small-12"})
              .append($('<div>', {class: "hotel-deal-image"})
                .append($('<img>', {
                  src: destinationDeals[i].image,
                  "alt": destinationDeals[i].title
                }))))
            .append(promos_output)
            .append($('<div>', {
              class: "button-wrapper columns small-12 medium-3 large-3",
              'html': '<a class="button continue" href="' + this.getFlightLink( destinationDeals[i], destinationIata ) + '">Book now</a><a class="button tile continue" href="' + this.getFlightLink( destinationDeals[i], destinationIata ) + '">Book now</a>'})));
        deals_html.append(deal);
      }

      return $('<li style="display: none;">')
        .append($('<div>', {class: "hotel-deals-destination-wrapper row"})
          .append($('<div>', {class: "columns large-12"})
            .append($('<h3>', {
              class: "deal-destination",
              text: this.airportLookup(destinationIata)
            }))
          )
          .append($('<div>', {class: "columns large-12"}).append(deals_html))
      );
    }
    return '';
  };

  HotelDealsRenderer.prototype.renderList = function (deals) {
    var
      i,
      render_vars = {timeout: 0},
      filteredDeals,
      filter = this.hotelFilter();


    // We'll render all types of deals/ads/promotions.
    filteredDeals = this.filter(deals['hotel'], filter);
    var groupedHotelDeals = this.fetcher.groupHotelDeals(filteredDeals);
    var $hotels_deals_container = $(this.containerSelector);
    $hotels_deals_container.empty();

    var cities = Object.keys(groupedHotelDeals);
    var hotelDealsAvailableForOrigin = false;
    if (cities.length) {
      for (var destination in groupedHotelDeals) {
        if (this.airportDealsCountLookup(destination) !== 0 && (!this.options.origin || this.options.origin && $.inArray(destination, this.options.connections[this.options.origin]) != -1)) {
          hotelDealsAvailableForOrigin = true;
          this.renderItem(this.destinationHotelDeals(destination, groupedHotelDeals[destination], this.airportDealsCountLookup(destination)), $hotels_deals_container, render_vars);
        }
      }
      // If no hotel deals were found for this origin hide hotels tab and force
      // user to switch to flight deals tab.
      if (!hotelDealsAvailableForOrigin) {
        $('#search-tabs').find('.bundle-deals-tab').hide();
        $('#search-tabs').find('.flight-deals-tab a').trigger('click');
      }
      else {
        $('#search-tabs').find('.bundle-deals-tab').show();
      }
    }
    else {
      // Maybe hide disclaimer, if any.
      $hotels_deals_container.append(this.noDealsMessage());
      this.disclaimerContainer().addClass('element-invisible').hide();
    }
    // Save filteredDeals on Fetch object.
    return filteredDeals;
  };

  /**
   * Fetcher
   */
  function Fetcher(options) {
    return this;
  }

  Fetcher.prototype.start = function () {
    var self = this;
    if (!this.request) {
      this.request = $.ajax({
        url: this.url,
        dataType: 'json',
        timeout: (Drupal.settings.homepage_deals && Drupal.settings.homepage_deals.serviceTimeout ? Drupal.settings.homepage_deals.serviceTimeout : 500) // default timeout is 3 seconds,
      }).then(function (data) {
        return self.sort(data);
      })
        .then(function (data) {
          return self.save(data);
        });
    }
    return this.request;
  };

  Fetcher.prototype.sort = function (data) {
    return data;
  };

  Fetcher.prototype.save = function (data) {
    return data;
  };

  /**
   * DealsFetcher
   */
  DealsFetcher.prototype = new Fetcher();
  DealsFetcher.prototype.constructor = DealsFetcher;
  function DealsFetcher(options) {
    this.url = options.source;
    this.sort_by = options.sort_by;
    this.airports = options.airports;
    this.deals = null;
    this.travelDates = {};
    return this;
  }

  DealsFetcher.prototype.save = function(deals_list) {

    function getDateFromDeepLinkDate(time) {
      var dateString = time.substring(0, 2) + '/' + time.substring(2, 4) + '/' + time.substring(4, 8);
      return new Date(dateString);
    }
    this.deals = deals_list;
    var self = this;
    if (typeof deals_list.flight != 'undefined') {
      $.each(deals_list.flight, function (index, deal) {
        self.travelDates[deal.Origin + deal.Dest] = {
          start: getDateFromDeepLinkDate(deal.DeepLinkStartTravelDate),
          end: getDateFromDeepLinkDate(deal.DeepLinkEndTravelDate)
        }
      });
    }
    return this.deals;
  };


  DealsFetcher.prototype.getDeals = function() {
    return this.deals;
  };

  DealsFetcher.prototype.sort = function(deals_list) {
    var self = this;
    // Flight deals are already ordered by price.
    if (this.sort_by == 'price') {
      return deals_list;
    }
    if (this.sort_by == 'alphabetically') {
      for (var type in deals_list) {
        var sortTarget = 'Dest';
        // For now we apply the sort only for flight deals.
        // Hotel Promotions are coming sorted by multiple rules set in views.
        if (type == 'flight') {
          sortTarget = 'Dest';
          deals_list[type] = deals_list[type].sort(function (one, two) {
            if (one[sortTarget] == two[sortTarget]) return 0;
            return (self.airports[one[sortTarget]] || one[sortTarget]).localeCompare(self.airports[two[sortTarget]] || two[sortTarget]);
          });
        }
      }
    }
    return deals_list;
  };

  HotelDealsFetcher.prototype = Object.create(DealsFetcher.prototype);
  HotelDealsFetcher.prototype.constructor = HotelDealsFetcher;
  function HotelDealsFetcher(options) {
    this.url = options.source;
    this.sort_by = options.sort_by;
    this.airports = options.airports;
    this.deals = null;
    this.groupedHotelDeals = null;
    this.DestinationsByIata = {};
    return this;
  }

  HotelDealsFetcher.prototype.save = function(deals_list) {
    this.deals = {hotel: deals_list.nodes};
    this.groupedHotelDeals = this.groupHotelDeals(this.deals.hotel);
    return this.deals;
  };

  HotelDealsFetcher.prototype.getGroupedHotelDeals = function() {
    return this.groupedHotelDeals;
  };

  /**
   * Group deals by iata code.
   *
   * @param {object} deals
   *   Available deals
   * @returns {{}}
   *   List of iata codes with deals attached as arrays of ids.
   */
  HotelDealsFetcher.prototype.groupHotelDeals = function(deals) {
    var groupedHotelDeals = {};
    if (deals) {
      var hotelDealsCount = deals.length;
      for (var i = 0; i < hotelDealsCount; i++) {
        var current_deal = deals[i];
        current_deal['iatas'].forEach(function(iata) {
          if (!groupedHotelDeals.hasOwnProperty(iata)) {
            groupedHotelDeals[iata] = [];
          }
          groupedHotelDeals[iata].push(current_deal);
        });
      }
    }
    return groupedHotelDeals;
  };

  function DealsLayoutRenderer(options, element) {
    this.parentElement = element;
    return this;
  }
  DealsLayoutRenderer.prototype.render = function() {
    this.parentElement.append(this.headerHtml());
    this.parentElement.append(this.contentHtml());
  };
  DealsLayoutRenderer.prototype.headerHtml = function() {
    return '';
  };
  DealsLayoutRenderer.prototype.contentHtml = function() {
    return '';
  };

  HomepageDealsLayoutRenderer.prototype = Object.create(DealsLayoutRenderer.prototype);
  function HomepageDealsLayoutRenderer (options, element) {
    this.options = options;
    this.parentElement = element;
    return this;
  }
  HomepageDealsLayoutRenderer.prototype.flightsHeaderDestinations = function() {
    var header_content = $('<div>', {'class': 'deals-destinations'})
      .append($('<label>', {
        text: 'Top Nonstop Flight Deals' + (this.options.origin ? ' from ' : ' '),
        "for": "change-airport-deals"
      }));
    if (this.options.origin) {
      header_content.append(this.OriginDropdown());
    }
    return header_content;
  };
  HomepageDealsLayoutRenderer.prototype.OriginDropdown = function() {
    if (!this.originDropdown) {
      this.originDropdown = $('<input>', {type: "text", "class": "ctWhitelist", id: "change-airport-deals", "aria-controls": "deals", "aria-expanded": false, "role": "combobox"}).g4_autocomplete({id: "airport-deals-widget", source: this.options.dropdown_airports, defaultValue: 'LAS'});
      this.originDropdown.find('input[type="hidden"]').val(this.options.origin);
      this.originDropdown.find('input[type="text"]').val(this.options.airports[this.options.origin]);
      this.originDropdown.on('change', function() {
        var new_origin = $(this).find('input[type="hidden"]').val();
        $('#deals-box').dealstrip("option", 'origin', new_origin);
        Drupal.homepage_deals_widget.updateDeals();
        Drupal.homepageTopDeals.update(new_origin);
        Drupal.g4Billboards.update(new_origin);
      });
    }
    return this.originDropdown;
  };
  HomepageDealsLayoutRenderer.prototype.headerHtml = function () {
    var $header_content = $('<div>', {"class": "flight-deals-header-wrapper row"})
      .append($('<div>', {'class': "text-center large-12 medium-12 small-12"})
        .append($('<h2>', {'class': 'element-invisible', text: 'Browse Allegiant Travel Deals'}))
        .append(this.flightsHeaderDestinations())
    );
    var $header = $('<div>', {'class': "flight-deals-header-section"});
    $header.append($header_content);
    return $header;
  };
  HomepageDealsLayoutRenderer.prototype.contentHtml = function () {
    var html = '';
    html += '<div id="flight-deals-wrapper">';
    html += '  <div class="flight-deals-grid">';
    html += '    <div class="deals-items" id="deals">';
    html += '      <ul></ul>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
    return html;
  };

  SearchDealsPageDealsRenderer.prototype = Object.create(DealsLayoutRenderer.prototype);
  function SearchDealsPageDealsRenderer (options, element) {
    this.parentElement = element;
    this.options = options;
    return this;
  }
  SearchDealsPageDealsRenderer.prototype.headerHtml = function () {
    var html = '';

    html += '  <div class="small-12 large-6 columns tab-nav-wrapper-inner" style="">';
    html += '    <ul id="search-tabs" data-content-id="deals-container-tabs" role="tablist" class="">';
    html += '      <li role="tab" class="flight-deals-tab">';
    html += '        <a href="#flight-deals-wrapper" aria-pressed="true" class="ui-tabs-anchor">Flight Deals</a>';
    html += '      </li>';
    html += '      <li role="tab" class="bundle-deals-tab">';
    html += '        <a href="#hotel-deals-wrapper" aria-pressed="false" class="ui-tabs-anchor">';
    html += '          <span class="medium-up">Bundle Air + Hotel and Save!</span>';
    html += '          <span class="small-down">Vacation Packages</span>';
    html += '        </a>';
    html += '      </li>';
    html += '    </ul>';
    html += '  </div>';

    var header = $('<div>', {'class': "tab-nav-wrapper row"})
      .append($('<div>', {'class': "small-12 large-6 columns"}).append(
        $('<div>', {'class': 'deals-destinations'})
          .append($('<label>', {
            text: 'Top Deals from ',
            "for": "change-airport-deals"
          }))
          .append(this.OriginDropdown()))
    )
      .append(html);
    header.find('#search-tabs').g4tabs();
    return header;
  };
  SearchDealsPageDealsRenderer.prototype.contentHtml = function () {
    var html = '';
    html += '<div id="deals-container-tabs">';
    html += '  <div id="flight-deals-wrapper" class="tab">';
    html += '    <div class="flight-deals-grid">';
    html += '      <div class="deals-items" id="deals">';
    html += '        <ul></ul>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';
    html += '  <div id="hotel-deals-wrapper" class="tab hidden">';
    html += '    <div id="hotel-deals" class="deals-items">';
    html += '      <ul></ul>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
    return html;
  };

  SearchDealsPageDealsRenderer.prototype.OriginDropdown = function() {
    if (!this.originDropdown) {
      this.originDropdown = $('<input>', {type: "text", "class": "ctWhitelist", id: "change-airport-deals", "aria-controls": "deals", "aria-expanded": false, "role": "combobox"}).g4_autocomplete({id: "airport-deals-widget", source: this.options.dropdown_airports, defaultValue: 'LAS'});
      this.originDropdown.find('input[type="hidden"]').val(this.options.origin);
      this.originDropdown.find('input[type="text"]').val(this.options.airports[this.options.origin]);
      this.originDropdown.on('change', function() {
        var new_origin = $(this).find('input[type="hidden"]').val();
        $('#deals-box').dealstrip("option", 'origin', new_origin);
        Drupal.homepage_deals_widget.updateDeals();
      });
    }
    return this.originDropdown;
  };


  $.widget( 'g4.dealstrip', {
    options: {},
    _create : function() {
      var $this = this;
      this.renderers = {};
      if (typeof this.options.theme != 'undefined') {
        var themeClass = this.options.theme;
        if (themeClass === 'SearchDealsPageRenderer')
          this.layoutRenderer = new SearchDealsPageDealsRenderer (this.options, this.element);
        else {
          this.layoutRenderer = new HomepageDealsLayoutRenderer (this.options, this.element);
        }
      }
      for (var key in this.options.sources) {
        if (this.options.sources.hasOwnProperty(key)) {
          if (key === 'flights') {
            // Deals page should use new design directly for flight deals, while homepage should use new design only if
            // maxymiser campaign is active.
            this.renderers[key] = themeClass === 'SearchDealsPageRenderer' ?
              new DealsPageFlightDealsRenderer(this.options, this.element) :
              (Drupal.maxymiser.hasOwnProperty('HPFlightDealsDesign') ?
                new DealsPageFlightDealsRenderer(this.options, this.element) :
                new DealsRenderer(this.options, this.element));
          }
          if (key === 'hotels') {
            this.renderers[key] = new HotelDealsRenderer(this.options, this.element);
          }
        }
      }
      this.element.addClass('dealstrip_plugin');
      this.render();
      return $this;
    },
    render : function() {
      var self = this;
      this.layoutRenderer.render();
      if (typeof this.renderers['hotels'] != 'undefined') {
        this.renderers['flights'].render(renderHotels);
        this.renderers['hotels'].showLoadingScreen();
      }
      else {
        this.renderers['flights'].render();
      }

      function renderHotels() {
        self.renderers.hotels.flightDealsDates = self.renderers['flights'].fetcher.travelDates;
        self.renderers['hotels'].render();
      }
    },
    updateDeals : function() {
      for (var key in this.renderers) {
        this.renderers[key].render();
      }
      this.layoutRenderer.OriginDropdown().find('input[type="hidden"]').val(this.options.origin);
      this.layoutRenderer.OriginDropdown().find('input[type="text"]').val(this.options.airports[this.options.origin]);
    }
  });

})(jQuery);

;/*})'"*/
;/*})'"*/
(function() {

  var
    autologoutTime,
    sessionCheckTime,
    logout,
    lastUpdate = new Date().getTime(),
    preventAutoExtend = false,
    currentTimestamp,
    timeout,
    desiredSessionTimeout,
    modalTimeout,
    modal,
    dialogElement = $('<p>', {id: "session-notification", text: Drupal.settings.extend_session.expiry_message});


  // Show modal to extend session.
  function openModal() {
    preventAutoExtend = true;

    dialogElement.dialog({
      resizable: false,
      minHeight: 250,
      minWidth: 520,
      title: Drupal.settings.extend_session.title,
      modal: true,
      dialogClass: 'session-extender-modal',
      buttons: {
        "Yes": function () {
          Drupal.utils.fetchUserInfo();
        },
        No: function () {
          $(this).dialog("close");
        }
      },
      close: function () {
        $('#session-notification').dialog('destroy').remove()
      },
      open: function () {
        clearTimeout(modalTimeout);
        modalTimeout = setTimeout(function () {
          logout = checkSession();
          if ($.cookie('authenticated') && !logout) {
            $('#session-notification').dialog('close');
          }
          else {
            $('#session-notification').text(Drupal.settings.extend_session.expired_message);
            $('.session-extender-modal').find('.ui-dialog-buttonset').remove();
          }
        }, Drupal.settings.extend_session.popup_timeout + 5000);
      }
    });
  }

  /**
   * Verify session expiry.
   *
   * Opens a modal to extend session if current session is about to expire or sets timeout to execute this callback
   * otherwise.
   */
  function checkSession() {
    if ($.cookie('authenticated')) {
      var currentTime = new Date().getTime();
      var sessionExpiry = parseInt(localStorage.getItem('sessionExpiry'));

      if (!isNaN(sessionExpiry)) {

        // If current time is after session expiry time, we can safely execute a get to /user/logout.
        // This is needed for scenario when autologout is enabled and is overriding default session timeout.
        if (currentTime >= sessionExpiry) {
          $.get('/user/logout');
          return true;
        }

        // If warning modal is enabled, check if modal should be displayed or we should schedule another session check.
        if (Drupal.settings.extend_session.enable_warning_popup) {
          // Open modal interval case
          if (
            currentTime < sessionExpiry &&
            currentTime > sessionExpiry - Drupal.settings.extend_session.popup_timeout
          ) {
            openModal();
          }
          else {
            // Another tab extended session (current time is before open modal interval
            if (currentTime < sessionExpiry - Drupal.settings.extend_session.popup_timeout) {
              clearTimeout(timeout);
              timeout = setTimeout(checkSession, sessionExpiry - Drupal.settings.extend_session.popup_timeout - currentTime);
            }
          }
        }
        // Schedule another session check at the time when session should be expired.
        else {
          clearTimeout(timeout);
          timeout = setTimeout(checkSession, sessionExpiry - currentTime);
        }
      }
    }
    return false;
  }

  /**
   * Auto extends user's session.
   */
  function autoExtendSession() {
    lastUpdate = new Date().getTime();
    Drupal.utils.fetchUserInfo();
  }

  /**
   * Callback for update_user event.
   *
   * @param {Object} event
   *   Event object.
   * @param {Object} user_state
   *   User state object.
   */
  function userUpdated(event, user_state) {
    lastUpdate = new Date().getTime();
    var extendSessionSettings = Drupal.settings.extend_session;
    if (user_state.hasOwnProperty('authenticated') && user_state.authenticated &&
        user_state.hasOwnProperty('session_expiry_time') &&
        (user_state.session_expiry_time > 0 || extendSessionSettings.enable_autologout)
    ) {
      desiredSessionTimeout = false;

      // If we have a session timeout use this one.
      if (user_state.session_expiry_time > 0) {
        desiredSessionTimeout = user_state.session_expiry_time * 1000;
      }

      // If logout timeout is lower than session timeout and persistent login is not used, use this interval.
      if (extendSessionSettings.enable_autologout && user_state.hasOwnProperty('remember_me') && !user_state.remember_me) {
        autologoutTime = new Date().getTime() + parseInt(extendSessionSettings.autologout_interval);
        if (desiredSessionTimeout === false || autologoutTime < desiredSessionTimeout) {
          desiredSessionTimeout = autologoutTime;
        }
      }

      // If session timeout is a timestamp, it is in the future.
      if (desiredSessionTimeout) {
        localStorage.setItem('sessionExpiry', desiredSessionTimeout);

        // If we allow users to see a warning about session expiry, use setTimeout with an interval smaller than
        // interval until session timeout.
        if (extendSessionSettings.enable_warning_popup) {
          // Make sure that session is checked a few seconds before it expires, to allow the user to extend it.
          // popup_timeout property should represent the interval in milliseconds that should be subtracted from session
          // timeout time.
          sessionCheckTime = desiredSessionTimeout - extendSessionSettings.popup_timeout - new Date().getTime();
        }

        // Close session notification popup in case it is opened.
        $('#session-notification').dialog('close');

        clearTimeout(timeout);
        timeout = setTimeout(checkSession, sessionCheckTime);
      }
    }
  }

  /**
   * Track last action timestamp and extend session if needed.
   */
  function lastActionUpdate() {
    currentTimestamp = new Date().getTime();
    if (currentTimestamp > lastUpdate + Drupal.settings.extend_session.autoextend_interval && !preventAutoExtend) {
      autoExtendSession()
    }
  }

  if (Drupal.settings.hasOwnProperty('extend_session')) {
    if ($.prototype.on !== undefined) {
      $(document).on('updated_user', userUpdated);
      $(document).on('click keyup', lastActionUpdate);
    }
    else {
      $(document).bind('updated_user', userUpdated);
      $(document).bind('click keyup', lastActionUpdate);
    }
  }
})(jQuery);
;/*})'"*/
;/*})'"*/
(function ($) {
  // Update deals on homepage.
  function updateDeals() {
    if (Drupal.settings.homepage_deals && Drupal.settings.homepage_deals.show_flight_deals) {
      var origin,
        destination,
        airport_names = {},
        airports = {},
        dropdown_airports = [],
        connections = {};

      // set origin from query parameter or cookie if we've got one
      origin = Drupal.utils.get_search_deals_origin();

      // Produce a lookup table of airport codes to city names
      $.each(window.Drupal.settings.travel_deals.airports, function (k, v) {
        airports[v.code] = k;
        airport_names[v.code] = v.name;
        dropdown_airports.push({value: v.code, label: k});
        connections[v.code] = [];
        for (var airport_full_name in v.connections) {
          connections[v.code].push(Drupal.utils.extract_code_cookie(airport_full_name));
        }
      });

      var deals_service_path = Drupal.settings.homepage_deals.service_endpoint ? Drupal.settings.homepage_deals.service_endpoint : '/g4search/api/flight/deals';

      Drupal.homepage_deals = deals.dealstrip({
        md5: new Date().getTime() + Drupal.utils.generateRandomString(15),
        dlSource: Drupal.settings.homepage_deals.dlSource,
        show_calendar: Drupal.settings.homepage_deals.show_calendar,
        sort_by: Drupal.settings.homepage_deals.sort_by,
        sorting_settings_by_iata_code: Drupal.settings.homepage_deals.sorting_settings_by_iata_code,
        origin: origin,
        destination: destination,
        airport_names: airport_names,
        airports: Drupal.utils.sortObjectByValues(airports),
        dropdown_airports: dropdown_airports,
        connections: connections,
        theme: "HomepageDealsRenderer",
        sources: {
          'flights': deals_service_path
        }
      });
      Drupal.homepage_deals_widget = $('#deals-box').data('g4Dealstrip');
    }
    // Listen for changes from the searchform and pass in to the plugin
    $('body').on('change', '#search_from', function (evt) {
      var new_origin = Drupal.utils.get_airport_code(evt.target.value);
      if (Drupal.settings.homepage_deals && Drupal.settings.homepage_deals.show_flight_deals) {
        deals.dealstrip("option", 'origin', new_origin);
        deals.dealstrip("option", 'destination', null);
        Drupal.homepage_deals_widget.updateDeals();
      }
      Drupal.homepageTopDeals.update(new_origin);
      Drupal.g4Billboards.update(new_origin);
    });
  }

  var deals = $('#deals-box');
  $(document).on('maxymiser_loaded', function () {
    if (deals.length) {
      updateDeals();
    }
  });


})(jQuery);
;/*})'"*/
;/*})'"*/
(function ($) {
  var deferred = $.Deferred();
  deferred
    .done(function (maxyData) {
      jQuery.extend(Drupal.maxymiser, maxyData);
      $(document).trigger('maxymiser_loaded');
    })
    .fail(function () {
      $(document).trigger('maxymiser_loaded');
    });
  var maxymiserApi = window.Allegiant ? window.Allegiant.maxymiser : null;
  try {
    if (maxymiserApi &&
      typeof maxymiserApi.setupHomepage === 'function') {
      maxymiserApi.setupHomepage(function (maxyData) {
        (maxyData && Object.keys(maxyData).length) ? deferred.resolve(maxyData) : deferred.reject();
      });
    }
    else {
      deferred.reject();
    }
    setTimeout(function () {
      deferred.reject();
    }, 1500);
  } catch (e) {
    deferred.reject();
  }
})(jQuery);

;/*})'"*/
;/*})'"*/
