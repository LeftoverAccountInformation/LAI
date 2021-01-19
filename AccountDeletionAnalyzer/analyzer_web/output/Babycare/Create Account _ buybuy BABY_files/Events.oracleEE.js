(function() {
  var trackHistoricalRuleRan = false;
  var ruleIdToObj = function(id) {
    return id && ATGSvcs.rules.rulehash[id];
  }
  var pageNameForChat = document.title;
  
  var eeHandlers = {
    eeRuleRan: function(data) {
	    if (data.rule) {
			
			var ruleName = data.rule.name;
			
			console.log('Analytics Tracking - Rule Run: ' + ruleName + ' RULERUN - pagename=' + pageNameForChat);
		}
    },
    eeOffered: function(data) {
	    if (data.rule) {
			var ruleName = data.rule.name;
		
			console.log('Analytics Tracking - Invite Offered: ' + ruleName + ' OFFER - pagename=' + pageNameForChat);
		}
    },
    eeAccepted: function(data) {
      if (data.rule) {
		if(data.rule.name.indexOf("Proactive") > -1)
			var chatType = "ProActiveChat";
		else
			var chatType = "ReActiveChat";
			
		var ruleName = data.rule.name;

		console.log('Analytics Tracking - Invite Accepted: ' + ruleName + ' ACCEPT - pagename=' + pageNameForChat);
		var now = new Date();
		var expires = new Date(now.setTime(now.getTime() + 60 * 60 * 1000)); //Expire in one hour
		document.cookie = 'rn_ChatDeclined=1;path=/;expires='+expires.toGMTString()+';';
		
		omniture.triggerChatEvent(chatType);
      }
    },
    eeDeclined: function(data) {
      if (data.rule) {
		var ruleName = data.rule.name;

        console.log('Analytics Tracking - Invite Declined: ' + ruleName + ' DECLINE - pagename=' + pageNameForChat);
        
        //Set cookie to not show chat offer for an hour
        var now = new Date();
		var expires = new Date(now.setTime(now.getTime() + 60 * 60 * 1000)); //Expire in one hour
		document.cookie = 'rn_ChatDeclined=1;path=/;expires='+expires.toGMTString()+';';
      }
    },
    eeClosed: function(data) {
      if (data.rule) {
		var ruleName = data.rule.name;

        console.log('Analytics Tracking - Invite Closed: ' + ruleName + ' DECLINE - pagename=' + pageNameForChat);
        
        //Set cookie to not show chat offer for an hour
        var now = new Date();
		var expires = new Date(now.setTime(now.getTime() + 60 * 60 * 1000)); //Expire in one hour
		document.cookie = 'rn_ChatDeclined=1;path=/;expires='+expires.toGMTString()+';';
      }
    },
    eeHidden: function(data) {
      if (data.rule) {
		var ruleName = data.rule.name;

        console.log('Analytics Tracking - Invite Hidden: ' + ruleName + ' RuleTriggered - pagename=' + pageNameForChat);
      }
    },
    eeSuppressed: function(data) {
      if (data.rule) {
		var ruleName = data.rule.name;

        console.log('Analytics Tracking - Invite Suppressed: ' + ruleName + ' RuleTriggered - pagename=' + pageNameForChat);
      }
    }
}
  ATGSvcs.eventSubscribe ({
    'eeRuleRan': function(e, data) {eeHandlers.eeRuleRan(data); },
    'eeOffered': function(e, data) { eeHandlers.eeOffered(data); },
    'eeAccepted': function(e, data) { eeHandlers.eeAccepted(data); },
    'eeDeclined': function(e, data) { eeHandlers.eeDeclined(data); },
    'eeClosed': function(e, data) { eeHandlers.eeClosed(data); },
    'eeHidden': function(e, data) { eeHandlers.eeHidden(data); },
    'eeSuppressed': function(e, data) { eeHandlers.eeSuppressed(data); }
  });
  //console.log('End: Rules / Events from Logs');
})();