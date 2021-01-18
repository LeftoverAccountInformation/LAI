/**
 * jsPDF AutoTable plugin
 * Copyright (c) 2014 Simon Bengtsson, https://github.com/someatoms/jsPDF-AutoTable
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
(function (API) {
    'use strict';

    // On every new jsPDF object, clear variables
    API.events.push(['initialized', function () {
        doc = undefined;
        cellPos = undefined;
        pageCount = 1;
        settings = undefined;
    }], false);

    var MIN_COLUMN_WIDTH = 5;

    var doc, cellPos, pageCount = 1, settings;

    var pageTotal = 1;
    
    //Values added to the autoTable list of parameters to print header on every page of report.
    var dateRow = false;
    var dateRowCellCount = 0;
    var reportType = '';
    var startDate = '';
    var endDate = '';
    var centerAddress ='';
    var reportDate = '';
    var reportTime = '';
    // See README.md or examples for documentation of the options
    // return a new instance every time to avoid references issues
    var defaultOptions = function () {
        return {
            padding: 5,
            fontSize: 9,
            lineHeight: 20,
            renderHeader: function (doc, pageNumber, settings) {
            },
            renderFooter: function (doc, lastCellPos, pageNumber, settings) {
            	doc.text(5, 833, pageNumber + ' of ' + pageTotal);
            },
            renderHeaderCell: function (x, y, width, height, key, value, settings) {
                doc.setFillColor(255,255,255); // Asphalt
                doc.setTextColor(0, 0, 0);
                doc.setFontStyle('bold');
                doc.rect(x, y, width, height, 'F');     
                y += settings.lineHeight / 2 + 13.8 / 2;
                doc.text(value, x + settings.padding, y);
            },
            renderCell: function (x, y, width, height, key, value, row, settings) {
            	if(key === "date"){
            		dateRowCellCount = 0;
        			dateRow = false;
            	}
            	if((dateRow && value === '') || (value.substring(3,4) === ' ' && value.substring(7,8) === ' ' && value.substring(10,11) === ' ') || (dateRow && value === '__________')){
            		if(dateRow && value === '__________'){
            			value = '';
            		};
            		if((dateRowCellCount < 6 && reportType === 'Appointment By Type Report') || (dateRowCellCount < 6 && reportType === 'Playroom Report')){
	            		dateRowCellCount += 1;
	            		dateRow = true;
	                	doc.setFillColor(245);
	                	doc.setTextColor(50);
	                    doc.rect(x, y, width, height, 'F');
	                    y += settings.lineHeight / 2 + 13.8 / 2 - 2.5;               
	                    doc.text(value, x + settings.padding, y);
            		}else{
            			dateRowCellCount = 0;
            			dateRow = false;
            		}
                }else {
                	doc.setFillColor(255);
                	doc.setTextColor(50);
                    doc.rect(x, y, width, height, 'F');
                    y += settings.lineHeight / 2 + 13.8 / 2 - 2.5;               
                    doc.text(value, x + settings.padding, y);
                }
                
            },
            getMargins: function(){
            	if (pageCount === 0){
            		settings.margins = {right: 5, left: 5, top: 75, bottom: 25};
            	} else {
            		settings.margins = {right: 5, left: 5, top: 25, bottom: 25};
            	}
            },
            
            margins: {right: 5, left: 5, top: 75, bottom: 25},
            startY: false,
            overflow: 'ellipsize', // false, ellipsize or linebreak (false passes the raw text to renderCell)
            overflowColumns: false, // Specify which colums that gets subjected to the overflow method chosen. false indicates all
            avoidPageSplit: false,
            extendWidth: true
        }
    };

    /**
     * Create a table from a set of rows and columns.
     *
     * @param {Object[]|String[]} columns Either as an array of objects or array of strings
     * @param {Object[][]|String[][]} data Either as an array of objects or array of strings
     * @param {Object} [options={}] Options that will override the default ones (above)
     */
    API.autoTable = function (columns, data, options, reportTypeIn, startDateIn, endDateIn, centerAddressIn, reportDateIn, reportTimeIn) {
        options = options || {};
        columns = columns || [];
        
        doc = this;
        
        reportType = reportTypeIn;
        startDate = startDateIn;
        endDate = endDateIn;
        centerAddress = centerAddressIn;
        reportDate = reportDateIn;
        reportTime = reportTimeIn;

        if (reportType === "Appointment By Type Report" || reportType === "Playroom Report"){
        	data = prepareByTypeAndPlayroomReports(data);
        }
        determinePages(data);
        
        var userFontSize = doc.internal.getFontSize();

        initData({columns: columns, data: data});
        initOptions(options);

        cellPos = {
            x: settings.margins.left,
            y: settings.startY === false ? settings.margins.top : settings.startY
        };

        var tableHeight = settings.margins.bottom + settings.margins.top + settings.lineHeight * (data.length + 1) + 5 + settings.startY;
        if (settings.startY !== false && settings.avoidPageSplit && tableHeight > doc.internal.pageSize.height) {
            pageCount++;
            doc.addPage();
            cellPos.y = settings.margins.top;
        }

        settings.renderHeader(doc, pageCount, settings);
        var columnWidths = calculateColumnWidths(data, columns);
        printHeader(columns, columnWidths);
        printRows(columns, data, columnWidths);
        settings.renderFooter(doc, cellPos, pageCount, settings);

        doc.setFontSize(9);

        return this;
    };

    /**
     * Returns the Y position of the last drawn cell
     * @returns int
     */
    API.autoTableEndPosY = function () {
        // If cellPos is not set, autoTable() has probably not been called
        return cellPos ? cellPos.y : false;
    };

    /**
     * @deprecated Use autoTableEndPosY()
     */
    API.autoTableEndPos = function () {
        return cellPos;
    };

    /**
     * Parses an html table. To draw a table, use it like this:
     * `doc.autoTable(false, doc.autoTableHtmlToJson(tableDomElem))`
     *
     * @param table Html table element
     * @param indexBased Boolean flag if result should be returned as seperate cols and data
     * @returns []|{} Array of objects with object keys as headers or based on indexes if indexBased is set to true
     */
    API.autoTableHtmlToJson = function (table, indexBased) {
            var data = [], headers = {}, header = table.rows[0], i, tableRow, rowData, j;
        if (indexBased) {
            headers = [];
            for (i = 0; i < header.cells.length; i++) {
                headers.push(header.cells[i] ? header.cells[i].textContent : '');
            }

            for (i = 1; i < table.rows.length; i++) {
                tableRow = table.rows[i];
                rowData = [];
                for (j = 0; j < header.cells.length; j++) {
                    rowData.push(tableRow.cells[j] ? tableRow.cells[j].textContent : '');
                }
                data.push(rowData);
            }
            return {columns: headers, data: data};
        } else {
            for (i = 0; i < header.cells.length; i++) {
                headers[i] = header.cells[i] ? header.cells[i].textContent : '';
            }

            for (i = 1; i < table.rows.length; i++) {
                tableRow = table.rows[i];
                rowData = {};
                for (j = 0; j < header.cells.length; j++) {
                    rowData[headers[j]] = tableRow.cells[j] ? tableRow.cells[j].textContent : '';
                }
                data.push(rowData);
            }

            return data;
        }
    };

    /**
     * Transform all to the object initialization form
     * @param params
     */
    function initData(params) {

        // Object only initial
        if (!params.columns || params.columns.length === 0) {
            var keys = Object.keys(params.data[0]);
            Array.prototype.push.apply(params.columns, keys);
            params.columns.forEach(function (title, i) {
                params.columns[i] = {title: title, key: keys[i]};
            });
        }
        // Array initialization form
        else if (typeof params.columns[0] === 'string') {
            params.data.forEach(function (row, i) {
                var obj = {};
                for (var j = 0; j < row.length; j++) {
                    obj[j] = params.data[i][j];
                }
                params.data[i] = obj;
            });
            params.columns.forEach(function (title, i) {
                params.columns[i] = {title: title, key: i};
            });
        } else {
            // Use options as is
        }
    }

    function initOptions(raw) {
        settings = defaultOptions();
        Object.keys(raw).forEach(function (key) {
            settings[key] = raw[key];
        });
        doc.setFontSize(9);

        // Backwards compatibility
        if(settings.margins.horizontal !== undefined) {
            settings.margins.left = settings.margins.horizontal;
            settings.margins.right = settings.margins.horizontal;
        } else {
            settings.margins.horizontal = settings.margins.left;
        }
    }

    function calculateColumnWidths(rows, columns) {
        var widths = {};

        // Optimal widths
        var optimalTableWidth = 0;
        columns.forEach(function (header) {
            var widest = getStringWidth(header.title || '', true);
            if(typeof header.width == "number") {
                widest = header.width;
            } else {
                rows.forEach(function (row) {
                    if (!header.hasOwnProperty('key'))
                        throw new Error("The key attribute is required in every header");
                    var w = getStringWidth(prop(row, header.key));
                    if (w > widest) {
                        widest = w;
                    }
                });
            }
            widths[header.key] = widest;
            optimalTableWidth += widest;
        });

        var paddingAndMargin = settings.padding * 2 * columns.length + settings.margins.left + settings.margins.right;
        var spaceDiff = doc.internal.pageSize.width - optimalTableWidth - paddingAndMargin;

        var keys = Object.keys(widths);
        if (spaceDiff < 0) {
            // Shrink columns
            var shrinkableColumns = [];
            var shrinkableColumnWidths = 0;
            if (settings.overflowColumns === false) {
                keys.forEach(function (key) {
                    if (widths[key] > MIN_COLUMN_WIDTH) {
                        shrinkableColumns.push(key);
                        shrinkableColumnWidths += widths[key];
                    }
                });
            } else {
                shrinkableColumns = settings.overflowColumns;
                shrinkableColumns.forEach(function (col) {
                    shrinkableColumnWidths += widths[col];
                });
            }

            shrinkableColumns.forEach(function (key) {
                widths[key] += spaceDiff * (widths[key] / shrinkableColumnWidths);
            });
        } else if (spaceDiff > 0 && settings.extendWidth) {
            // Fill page horizontally
            keys.forEach(function (key) {
                widths[key] += spaceDiff / keys.length;
            });
        }

        return widths;
    }

    function printHeader(headers, columnWidths) {
    	doc.setFontSize(10);
        if (!headers) return;
        headers.forEach(function (header) {
            var width = columnWidths[header.key] + settings.padding * 2;
            var title = ellipsize(columnWidths[header.key], header.title || '');
            settings.renderHeaderCell(cellPos.x, cellPos.y, width, settings.lineHeight + 5, header.key, title, settings);
            cellPos.x += width;
        });
        doc.setTextColor(70, 70, 70);
        doc.setFontStyle('normal');

        cellPos.y += settings.lineHeight + 5;
        cellPos.x = settings.margins.left;
        doc.setFontSize(9);
    }

    function printRows(headers, rows, columnWidths) {
    	doc.setFontSize(9);
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];

            var maxRows = 1;
            if (settings.overflow === 'linebreak') {
                headers.forEach(function (header) {
                    if (settings.overflowColumns !== false && settings.overflowColumns.indexOf(header.key) !== -1) {
                        var value = prop(row, header.key);
                        var arr = doc.splitTextToSize(value, columnWidths[header.key]);
                        if (arr.length > maxRows) {
                            maxRows = arr.length;
                        }
                    }
                });
            }
            /*var rowHeight = settings.lineHeight + (maxRows - 1) * doc.internal.getLineHeight();*/
            var rowHeight = settings.lineHeight + (maxRows - 1) * 13.8;

            headers.forEach(function (header) {
                var value = prop(row, header.key);
                if (settings.overflow === 'linebreak') {
                    if (settings.overflowColumns !== false && settings.overflowColumns.indexOf(header.key) !== -1) {
                        value = doc.splitTextToSize(value, columnWidths[header.key]);
                    }
                } else if (settings.overflow === 'ellipsize') {
                    value = ellipsize(columnWidths[header.key], value);
                }
                var width = columnWidths[header.key] + settings.padding * 2;
                if(row.date !== '' && row.name !== '' && header.key === "date" && (reportType === "Appointment By Type Report" || reportType === "Playroom Report")){              	
            		value = '';
            	}
                settings.renderCell(cellPos.x, cellPos.y, width, rowHeight, header.key, value, i, settings);
                cellPos.x = cellPos.x + columnWidths[header.key] + settings.padding * 2;
            });

            var newPage = (cellPos.y + settings.margins.bottom + settings.lineHeight * 2) >= doc.internal.pageSize.height;
            if (newPage) {            	
            	//settings.getMargins();               	
        		settings.renderFooter(doc, cellPos, pageCount, settings);
                doc.addPage();
                doc.setFont("helvetica", "bolditalic");
            	doc.setFontSize(12);
            	if (reportType === "Override Report" || reportType === "Playroom Report"){
            		doc.text(245,20, reportType);
            	} else {
            		doc.text(220,20, reportType);
            	}
        		
        		doc.setFontSize(10);
        		doc.setFont("helvetica", "normal");
        		doc.text(5, 45, 'Report Dates: ' + startDate + ' to ' + endDate);
        		doc.text(5, 65, 'Center: ' + centerAddress);
        		doc.text(370, 45, 'Report Generated: ' + reportDate.replace(/[^ -~]/g,'') + ' ' + reportTime.replace(/[^ -~]/g,''));
        		doc.line(5, 75, 590, 75);
        		doc.setFontSize(9);
                pageCount++;
                cellPos = {x: settings.margins.left, y: settings.margins.top};                
                settings.renderHeader(doc, pageCount, settings);
                printHeader(headers, columnWidths);
            } else {
            	
                cellPos.y += rowHeight;
                cellPos.x = settings.margins.left;
            }
        }
    }

    /**
     * Ellipsize the text to fit in the width
     * @param width
     * @param text
     */
    function ellipsize(width, text) {
        if (width >= getStringWidth(text)) {
            return text;
        }
        while (width < getStringWidth(text + "...")) {
            if (text.length < 2) {
                break;
            }
            text = text.substring(0, text.length - 1);
        }
        text += "...";
        return text;
    }

    function prop(row, key) {
        return row.hasOwnProperty(key) ? '' + row[key] : '';
    }

    function getStringWidth(txt, isBold) {
        if(isBold) {
            doc.setFontStyle('bold');
        }
        var strWidth = doc.getStringUnitWidth(txt) * doc.internal.getFontSize();
        if(isBold) {
            doc.setFontStyle('normal');
        }
        return strWidth;
    }
    
    function determinePages(data){
    	var numOfRecords = data.length;
    	if (numOfRecords <= 35){
    		pageTotal = 1;
    	} else {
    		//35 records display per page
    		pageTotal = (Math.ceil(numOfRecords / 35));
    	}
    }
    
    function prepareByTypeAndPlayroomReports(data){
    	var date;
	    for (var i = 0; i < data.length; i += 35){
			if(reportType === "Playroom Report" && i !== 0 && data[i].date !== "" && data[i].name !== ""){
				date = data[i].date;
				data.splice(i, 0, {"date": date, "time": "", "name": "", "phone": "", "kids": "", "signOutLine": ""});
			}else{
				if (reportType === "Appointment By Type Report"){
					if(i !== 0 && data[i].date !== "" && data[i].name !== ""){
						date = data[i].date;
						data.splice(i, 0, {"date": date, "name": "", "pdn": "", "phone": "", "apptType": "", "apptTime": ""});
					}
				}
			}
		}
	    return data;
    }
})(jsPDF.API);
