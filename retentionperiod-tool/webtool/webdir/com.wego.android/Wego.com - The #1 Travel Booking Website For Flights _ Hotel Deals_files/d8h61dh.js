try { 
	function getRrefreshStatus() {
    return localStorage.getItem('_we-sw-token-refresh-status');
}

function setRrefreshStatus() {
    localStorage.setItem('_we-sw-token-refresh-status', 'done');
}

webengage.onReady(function() {
    var refreshStatus = getRrefreshStatus();
    if (refreshStatus !== 'done') {
        if (Notification.permission === 'granted') {
            registration.pushManager.getSubscription().then(function(sub) {
                if (sub) {
                    sub.unsubscribe().then(function(success) {
                        setRrefreshStatus();
                        webengage.state.setSession({});
                        webengage.reload();
                    })['catch'](function(err) {});
                } else {}
            });
        }
    }
});
 } catch(e) { 
 	if (e instanceof Error) { 
		var data = e.stack || e.description;
		data = (data.length > 900 ? data.substring(0, 900) : data);
	 	webengage.eLog(null, 'error', data, 'cwc-error','cwc', 'd8h61dh');
	 }
 }
