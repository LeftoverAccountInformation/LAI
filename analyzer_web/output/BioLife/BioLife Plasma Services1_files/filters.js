
    var bdpAppFilters = angular.module('bdpApp.filters', [
    ]);

    bdpAppFilters.filter('hours', function () {
        return function (input) {
            var retval = 'FORMAT-REJECTED: ' + input; // initialize to this
            if (!isNaN(Number(input))) { // expecting to start as a number string
                // hours string should be >= 3 such as '600' or '1930' and should not exceed 4 characters
                input = input.toString();
                if (input.length >= 3 && input.length <= 4) {
                    var hours = input.slice(0, input.length-2);
                    var minutes = input.substr(input.length-2, 2);
                    // am / pm string
                    var hoursNum = Number(hours);
                    if (hoursNum >= 13) {
                        hours = hours - 12;
                    }
                    var amPmMarker = 'AM'; // init to AM
                    if (hoursNum >= 12) {
                        amPmMarker = 'PM';
                    }

                    // build string
                    retval = hours + ':' + minutes + ' ' + amPmMarker;
                }
            }
            return retval;
        };
    });

    bdpAppFilters.filter('phone', function () {
        return function (input, hyphens) {
        	var retval = ''; // init to empty string
        	if (input !== undefined) {
	            var retval = input; // initialize to this
	            // split into respective parts of area code, town code and number
	            var area = input.substr(0, 3);
	            var town = input.substr(3, 3);
	            var number = input.substr(6, 4);
	            // build the return value
	            if (hyphens && hyphens === true) {
	                retval = area + '-';
	            } else {
	                retval = '(' + area + ') ';
	            }
	            retval += town + '-' + number;
        	}
        	return retval;
        };
    });
    
    bdpAppFilters.filter('dateTime', function () {
        return function (input) { 
        	var date;
    		var time;
        	if (input !== undefined) {     		
	            date = new Date(input).toLocaleDateString();
	            time = new Date(input).toLocaleTimeString().replace(/[^ -~]/g,''); // initialize to this, ex: "12:00:00 AM"
	            if (time.substring(0,2) === "10" || time.substring(0,2) === "11" || time.substring(0,2) === "12"){
	            	time = time.substring(0, 5) + ' ' + time.substring(9, time.length);
	            }else {
	            	time = time.substring(0, 4) + ' ' + time.substring(8, time.length);
	            }
        	}
        	return date + ' ' + time;
        };
    });
    
    bdpAppFilters.filter('time', function () {
        return function (input) { 
        	if (input !== undefined) {
	            var retval = new Date(input).toLocaleTimeString().replace(/[^ -~]/g,''); // initialize to this, ex: "12:00:00 AM"
	            if (retval.substring(0,2) === "10" || retval.substring(0,2) === "11" || retval.substring(0,2) === "12"){
	            	retval = retval.substring(0, 5) + ' ' + retval.substring(9, retval.length);
	            }else {
	            	retval = retval.substring(0, 4) + ' ' + retval.substring(8, retval.length);
	            }
        	}
        	return retval;
        };
    });   
    
    /*bdpAppFilters.filter('utcTime', function () {
        return function (input) { 
        	if (input !== undefined) {
        		var nowDate = new Date(input).toDateString();
            	var nowTime = new Date(input).toLocaleTimeString();
        		
        		var utc = new Date(input).toUTCString();
        		var utcZ = new Date(input).toUTCString() + 'Z';
        		var tzo = new Date().getTimezoneOffset();
        		var utc = new Date(input);
        		//var utcHours = utc.getUTCHours();
	            //var retval = new Date(input).toLocaleTimeString().replace(/[^ -~]/g,'');
            	
            	var date = new Date(input);
        	    date.setTime(date.valueOf());
        	    date = date + ' ';
        	    date = date.substring(16,21);
        	    var hours = Number(date.substring(0,2));
        	    var numDate = Number(date);
	            if (hours > 12){
	            	hours -= 12;
	            	date = hours + date.substring(2,5) + ' PM';
	            }else {
	            	date += ' AM';
	            }
	            
	            return nowDate + nowTime;
        	}
        };
    });
    
    bdpAppFilters.filter('date', function () {
        return function (input) { 
        	var date;
        	var month;
        	var day;
        	var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        	                  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        	if (input !== undefined) {     		
	            date = new Date(input);
	            month = monthNames[date.getMonth()];
	            day = date.getDate();
        	}
        	return month + ' ' + day;
        };
    });*/
    
    bdpAppFilters.filter('dateYear', function () {
        return function (input) { 
        	var date;
        	var month;
        	var day;
        	var year;
        	var monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        	                  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        	if (input !== undefined) {     		
	            date = new Date(input);
	            month = monthNames[date.getMonth()];
	            day = date.getDate();
	            year = date.getFullYear();
        	}
        	return month + ' ' + day + ', ' + year;
        };
    });
    
    bdpAppFilters.filter('eventEndDate', function () {
        return function (input) { 
        	var date;
        	var day;
        	if (input !== undefined) {     		
	            date = new Date(input);
	            day = date.getDate();
        	}
        	return '- ' + day;
        };
    });
    
    bdpAppFilters.filter('eventEndDateYear', function () {
        return function (input) { 
        	var date;
        	var day;
        	var year;
        	if (input !== undefined) {     		
	            date = new Date(input);
	            day = date.getDate();
	            year = date.getFullYear();
        	}
        	return '- ' + day + ', ' + year;
        };
    });
    
    bdpAppFilters.filter('momentJSTime', function () {
    	//moment longDateFormat 'L' as input  L: "MM/DD/YYYY LT" LT: "h:mmA"
        return function (input) { 
        	var time;
        	if (input !== undefined) {
        		//If not 10, 11, or 12 AM/PM
        		if(input.substring(input.length - 6, input.length - 5) === " ") {
        			time = input.substring(input.length - 6, input.length);
        		} else {
        			time = input.substring(input.length - 5, input.length);
        		}
        		return time;
        	}
        };
    });
    
    bdpAppFilters.filter('momentJSDate', function () {
    	//moment longDateFormat 'L' as input  L: "MM/DD/YYYY LT" LT: "h:mmA"
        return function (input) {
        	moment.locale('en', {
			    longDateFormat : {
			        LT: "h:mmA",
			        LTS: "h:mm:ss A",
			        L: "MM/DD/YYYY",
			        LL: "MMMM Do YYYY",
			        LLL: "MMM Do LT",
			        LLLL: "dddd, MMMM Do YYYY LT"
			    }
			});
        	var date;
        	if (input !== undefined) {
        		date = moment(input).format('LL');
        		return date;
        	}
        };
    });
    
    bdpAppFilters.filter('upcomingApptDate', function () {
    	//moment longDateFormat 'L' as input  L: "MM/DD/YYYY LT" LT: "h:mmA"
        return function (input) {
        	moment.locale('en', {
			    longDateFormat : {
			        LT: "h:mmA",
			        LTS: "h:mm:ss A",
			        L: "MM/DD/YYYY",
			        LL: "MMMM Do YYYY",
			        LLL: "MMM Do LT",
			        LLLL: "dddd, MMMM Do YYYY LT"
			    }
			});
        	var date;
        	if (input !== undefined) {
        		date = moment(input).format('L');
        		return date;
        	}
        };
    });
    
    bdpAppFilters.filter('upcomingApptTime', function () {
    	//moment longDateFormat 'L' as input  L: "MM/DD/YYYY LT" LT: "h:mmA"
        return function (input) {
        	moment.locale('en', {
			    longDateFormat : {
			        LT: "h:mmA",
			        LTS: "h:mm:ss A",
			        L: "MM/DD/YYYY",
			        LL: "MMMM Do YYYY",
			        LLL: "MMM Do LT",
			        LLLL: "dddd, MMMM Do YYYY LT"
			    }
			});
        	var time;
        	if (input !== undefined) {
        		time = moment(input).format('LT');
        		return time;
        	}
        };
    });
    
    bdpAppFilters.filter('bdpSpotNumber', function () {
        return function (input) {
        	if(input === 4){
        		input = 1;
        	}else if (input === 5){
        		input = 2;
        	}else{
        		if(input === 6){
        			input = 3;
        		}
        	}
        	return input;
        };
    });
    
    bdpAppFilters.filter('reportTime', function () {
        return function (input) {
        	return input.substring(11);
        };
    });
    
    bdpAppFilters.filter('orderObjectBy', function(){
    	 return function(input, attribute) {
    	    if (!angular.isObject(input)) return input;

    	    var array = [];
    	    for(var objectKey in input) {
    	        array.push(input[objectKey]);
    	    }

    	    array.sort(function(a, b){
    	        a = parseInt(a[attribute]);
    	        b = parseInt(b[attribute]);
    	        return a - b;
    	    });
    	    return array;
    	 }
    });
