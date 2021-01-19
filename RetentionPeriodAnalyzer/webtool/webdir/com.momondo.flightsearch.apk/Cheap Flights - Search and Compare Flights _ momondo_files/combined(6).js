define("default/flights/results/react/FlexMatrixCollapsibleContainer", ['exports', 'stl!flights.results.FlexMatrixCollapsibleContainer.FlexMatrixCollapsibleContainer', 'stl!flights.results.FlexMatrixCollapsibleContainer.FlexMatrixCollapsibleContainer__Container', 'stl!flights.results.FlexMatrixCollapsibleContainer.FlexMatrixCollapsibleContainer__Body', 'flights/results/react/FlexMatrixContainer', 'flights/results/react/FlexMatrixHeader', 'flights/results/react/FlexMatrix', 'flights/results/react/actions/FlexMatrixActions', 'flights/results/react/constants/FlexMatrixConstants'], function (exports, _stlFlexMatrixCollapsibleContainer, _stlFlexMatrixCollapsibleContainer__Container, _stlFlexMatrixCollapsibleContainer__Body, _FlexMatrixContainer2, _FlexMatrixHeader, _FlexMatrix, _FlexMatrixActions, _FlexMatrixConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexMatrixCollapsibleContainer = undefined;

    var _stlFlexMatrixCollapsibleContainer2 = babelHelpers.interopRequireDefault(_stlFlexMatrixCollapsibleContainer);

    var _stlFlexMatrixCollapsibleContainer__Container2 = babelHelpers.interopRequireDefault(_stlFlexMatrixCollapsibleContainer__Container);

    var _stlFlexMatrixCollapsibleContainer__Body2 = babelHelpers.interopRequireDefault(_stlFlexMatrixCollapsibleContainer__Body);

    var _FlexMatrixHeader2 = babelHelpers.interopRequireDefault(_FlexMatrixHeader);

    var _FlexMatrix2 = babelHelpers.interopRequireDefault(_FlexMatrix);

    var flexMatrixActions = babelHelpers.interopRequireWildcard(_FlexMatrixActions);
    /* eslint-disable react/jsx-no-undef */

    var initialState = { accordionOpenDefault: true, contentHeight: null };

    var FlexMatrixCollapsibleContainer = exports.FlexMatrixCollapsibleContainer = function (_FlexMatrixContainer) {
        babelHelpers.inherits(FlexMatrixCollapsibleContainer, _FlexMatrixContainer);

        function FlexMatrixCollapsibleContainer(props) {
            babelHelpers.classCallCheck(this, FlexMatrixCollapsibleContainer);

            var _this = babelHelpers.possibleConstructorReturn(this, (FlexMatrixCollapsibleContainer.__proto__ || Object.getPrototypeOf(FlexMatrixCollapsibleContainer)).call(this, props));

            _this.contentElement = null;

            if (_FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER === props.displayMode) {
                initialState.accordionOpenDefault = false;
            }
            _this.state = initialState;
            _this.onHeightUpdate = _this.onHeightUpdate.bind(_this);
            _this.updateHoverState = _this.updateHoverState.bind(_this);
            return _this;
        }

        babelHelpers.createClass(FlexMatrixCollapsibleContainer, [{
            key: 'updateHoverState',
            value: function updateHoverState() {
                this.props.updateHoverState('', '');
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.syncContentHeight();
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                var willBeOpenDefault = !nextProps.noResults && _FlexMatrixConstants.displayModes.PLUS_MINUS_THREE === nextProps.displayMode;
                if (this.state.accordionOpenDefault !== willBeOpenDefault) {
                    this.setState({ accordionOpenDefault: willBeOpenDefault });
                }
            }
        }, {
            key: 'onHeightUpdate',
            value: function onHeightUpdate(contentHeight) {
                if (this.state.contentHeight !== contentHeight) {
                    this.setState({ contentHeight: contentHeight });
                }
            }
        }, {
            key: 'syncContentHeight',
            value: function syncContentHeight() {
                var contentHeight = this.contentElement && this.contentElement.clientHeight;
                if (contentHeight !== this.state.contentHeight && typeof contentHeight === 'number') {
                    this.setState({ contentHeight: contentHeight });
                }
            }
        }, {
            key: 'getContainerHeight',
            value: function getContainerHeight(accordionOpen) {
                if (!accordionOpen) {
                    return 0;
                } else if (this.state.contentHeight) {
                    return this.state.contentHeight + 'px';
                }
                return 'auto';
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props = this.props,
                    anyFilterApplied = _props.anyFilterApplied,
                    displayMode = _props.displayMode,
                    extraCssClass = _props.extraCssClass,
                    initialDisplayMode = _props.initialDisplayMode,
                    fullWidth = _props.fullWidth;

                var accordionOpen = typeof this.props.accordionOpen === 'undefined' ? this.state.accordionOpenDefault : this.props.accordionOpen;
                if (displayMode === _FlexMatrixConstants.displayModes.NONE) {
                    return null;
                }
                return babelHelpers.jsx('div', {
                    className: _stlFlexMatrixCollapsibleContainer2.default + ' ' + extraCssClass
                }, void 0, babelHelpers.jsx(_FlexMatrixHeader2.default, {
                    accordionOpen: accordionOpen,
                    anyFilterApplied: anyFilterApplied
                }), babelHelpers.jsx('div', {
                    className: _stlFlexMatrixCollapsibleContainer__Container2.default,
                    style: { height: this.getContainerHeight(accordionOpen) }
                }, void 0, React.createElement(
                    'div',
                    { className: _stlFlexMatrixCollapsibleContainer__Body2.default + '}', ref: function ref(contentElement) {
                            _this2.contentElement = contentElement;
                        }, onMouseLeave: this.updateHoverState },
                    babelHelpers.jsx(_FlexMatrix2.default, {
                        initialDisplayMode: initialDisplayMode,
                        fullWidth: fullWidth,
                        onHeightUpdate: this.onHeightUpdate
                    })
                )));
            }
        }]);
        return FlexMatrixCollapsibleContainer;
    }(_FlexMatrixContainer2.FlexMatrixContainer);

    exports.default = ReactRedux.connect(function (_ref, _ref2) {
        var FlexMatrix = _ref.FlexMatrix,
            SearchPoll = _ref.SearchPoll,
            FilterState = _ref.FilterState;
        var extraCssClass = _ref2.extraCssClass,
            fullWidth = _ref2.fullWidth,
            initialDisplayMode = _ref2.initialDisplayMode;
        return {
            extraCssClass: extraCssClass,
            fullWidth: fullWidth,
            initialDisplayMode: initialDisplayMode,
            accordionOpen: FlexMatrix.ui.accordionOpen,
            displayMode: FlexMatrix.ui.displayMode || initialDisplayMode,
            anyFilterApplied: FilterState.ui.anyFilterApplied,
            noResults: SearchPoll.noResults
        };
    }, function (dispatch) {
        return {
            updateNonstopOnlyState: function updateNonstopOnlyState(setChecked) {
                return dispatch(flexMatrixActions.updateNonstopOnlyState(setChecked));
            },
            updateHoverState: function updateHoverState(departFilterValue, returnFilterValue) {
                return dispatch(flexMatrixActions.updateCellHoverState(departFilterValue, returnFilterValue));
            }
        };
    })(FlexMatrixCollapsibleContainer);
});define("default/common/react/ReactSvgInline", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var cleanups = {
        title: /<title>.*<\/title>/gi,
        desc: /<desc>.*<\/desc>/gi,
        comment: /<!--.*-->/gi,
        defs: /<defs>.*<\/defs>/gi,

        width: / +width="\d+(\.\d+)?(px)?"/gi,
        height: / +height="\d+(\.\d+)?(px)?"/gi,

        fill: / +fill="(none|#[0-9a-f]+)"/gi,

        sketchMSShapeGroup: / +sketch:type="MSShapeGroup"/gi,
        sketchMSPage: / +sketch:type="MSPage"/gi,
        sketchMSLayerGroup: / +sketch:type="MSLayerGroup"/gi
    };

    var splitParams = function splitParams(params) {
        return params.trim().split('" ');
    };

    var splitParam = function splitParam(param) {
        return param.trim().split('="');
    };

    var stringParamsToObj = function stringParamsToObj(stringParams) {
        return splitParams(stringParams).map(function (p) {
            if (p.indexOf('="') >= 0) {
                var param = splitParam(p);
                if (param.length > 1) {
                    return babelHelpers.defineProperty({}, param[0], param[1].replace(/^"|"$/, '').trim());
                }
            }
            return null;
        }).filter(function (i) {
            return i;
        }) // filter null vals
        .reduce(function (acc, itm) {
            return babelHelpers.extends({}, acc, itm);
        }, {});
    };

    var getStringParams = function getStringParams(svg) {
        var svgParamsMatch = svg.match(/<svg([^>]*)>/);
        if (svgParamsMatch && svgParamsMatch.length > 1) {
            return svgParamsMatch[1].trim();
        }
        return '';
    };

    var safeText = function safeText() {
        var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (typeof string === 'string') {
            return string.replace(/<(?:.|\n)*?>/gm, '');
        }
        return '';
    };

    var addAccessibilityData = function addAccessibilityData(svg) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var title = data.title,
            titleId = data.titleId,
            description = data.description,
            descriptionId = data.descriptionId;

        if (!title && !titleId && !description && !descriptionId) {
            return svg;
        }

        var svgMatch = svg.match(/(<svg.*?>)(.*?)(<\/svg>)/);
        if (!svgMatch || svgMatch.length < 3) {
            return svg;
        }

        var _svgMatch = babelHelpers.slicedToArray(svgMatch, 4),
            openTag = _svgMatch[1],
            content = _svgMatch[2],
            closeTag = _svgMatch[3];

        var finalContent = content;
        var descriptionText = safeText(description);
        if (descriptionText !== '' && descriptionId) {
            finalContent = '<desc id="' + descriptionId + '">' + descriptionText + '</desc>' + finalContent;
        }

        var titleText = safeText(title);
        if (titleText !== '' && titleId) {
            finalContent = '<title id="' + titleId + '">' + titleText + '</title>' + finalContent;
        }

        return '' + openTag + finalContent + closeTag;
    };

    /* eslint-disable prefer-const */
    var SVGInline = function SVGInline(props) {
        var className = props.className,
            parentClassName = props.parentClassName,
            svg = props.svg,
            id = props.id,
            parentId = props.parentId,
            ariaLabelledBy = props.ariaLabelledBy,
            title = props.title,
            ariaDescribedBy = props.ariaDescribedBy,
            description = props.description,
            width = props.width,
            height = props.height,
            fill = props.fill,
            cleanup = props.cleanup,
            cleanupExceptions = props.cleanupExceptions,
            noWrapperElement = props.noWrapperElement,
            transform = props.transform,
            svgNonFocusable = props.svgNonFocusable,
            componentProps = babelHelpers.objectWithoutProperties(props, ['className', 'parentClassName', 'svg', 'id', 'parentId', 'ariaLabelledBy', 'title', 'ariaDescribedBy', 'description', 'width', 'height', 'fill', 'cleanup', 'cleanupExceptions', 'noWrapperElement', 'transform', 'svgNonFocusable']);


        if (
        // simple way to enable entire cleanup
        cleanup === true ||
        // passing cleanupExceptions enable cleanup as well
        cleanup.length === 0 && cleanupExceptions.length > 0) {
            cleanup = Object.keys(cleanups);
        }
        cleanup = cleanup.filter(function (key) {
            return !(cleanupExceptions.indexOf(key) > -1);
        });

        if (width && height === undefined) {
            height = width;
        }

        var idSufx = id || Date.now().toString(36);
        var titleId = title ? ariaLabelledBy || 'title_' + idSufx : null;
        var descriptionId = description ? ariaDescribedBy || 'description_' + idSufx : null;
        var cleanedUpSVG = addAccessibilityData(SVGInline.cleanupSvg(svg, cleanup), { titleId: titleId, title: title, descriptionId: descriptionId, description: description });

        var accessibilityParams = '';
        if (titleId) {
            accessibilityParams += ' aria-labelledby=' + titleId;
        }

        if (descriptionId) {
            accessibilityParams += ' aria-describedby=' + descriptionId;
        }

        var idString = id ? 'id=' + id : '';

        var style = 'width:inherit;height:inherit;line-height:inherit;color:inherit;';
        return noWrapperElement ? React.createElement('svg', babelHelpers.extends({}, stringParamsToObj(getStringParams(cleanedUpSVG)), stringParamsToObj(accessibilityParams.trim()), stringParamsToObj(idString), {
            className: className,
            'aria-labelledby': ariaLabelledBy,
            'aria-describedby': ariaDescribedBy,
            role: 'img'
        }, componentProps, {
            dangerouslySetInnerHTML: {
                __html: cleanedUpSVG.replace(/<svg([^>]*)>/, '').replace(/<\/svg>/, '')
            }
        })) : React.createElement('span', babelHelpers.extends({}, componentProps, parentId ? { id: parentId } : {}, {
            className: parentClassName ? 'svg ' + parentClassName : 'svg',
            style: {
                transform: transform || 'translate3d(0,0,0)',
                verticalAlign: 'middle',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                height: height || false,
                width: width || false,
                fill: fill || false
            },
            dangerouslySetInnerHTML: {
                __html: cleanedUpSVG.replace(/<svg/, '<svg ' + idString + (' class="' + (className || '') + '"') + ' role="img"' + (' ' + accessibilityParams.trim()) + (' style="' + style + '"') + (' ' + (svgNonFocusable ? 'focusable="false"' : '')))
            }
        }));
    };

    SVGInline.defaultProps = {
        cleanup: [],
        cleanupExceptions: []
    };

    SVGInline.cleanupSvg = function (svg) {
        var cleanup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        return Object.keys(cleanups).filter(function (key) {
            return cleanup.indexOf(key) > -1;
        }).reduce(function (acc, key) {
            return acc.replace(cleanups[key], '');
        }, svg).trim();
    };

    exports.default = SVGInline;
});define("default/flights/results/react/FlexMatrix", ['exports', 'stl!flights.results.FlexMatrix.FlexMatrix', 'stl!flights.results.FlexMatrix.FlexMatrix--no-filters', 'stl!flights.results.FlexMatrix.FlexMatrix__CheckboxWrapper', 'stl!flights.results.FlexMatrix.FlexMatrix__GridContainer__Grid', 'stl!flights.results.FlexMatrix.FlexMatrix__GridRowsContainer', 'stl!flights.results.FlexMatrix.FlexMatrix__Content', 'stl!flights.results.FlexMatrix.FlexMatrix__Content--V2', 'stl!flights.results.FlexMatrix.FlexMatrix__AboveGridRow', 'stl!flights.results.FlexMatrix.FlexMatrix__AboveGridRow--v2', 'stl!flights.results.FlexMatrix.FlexMatrix__ReturnAxis__Label', 'stl!flights.results.FlexMatrix.FlexMatrix__ReturnAxis__Label--v2', 'stl!flights.results.FlexMatrix.FlexMatrix__Cell--spacer--v2', 'stl!flights.results.FlexMatrix.FlexMatrix__Axis__Label', 'stl!flights.results.FlexMatrix.FlexMatrix__ReturnAxis__Label__Text', 'stl!flights.results.FlexMatrix.FlexMatrix__DepartAxis', 'stl!flights.results.FlexMatrix.FlexMatrix__ReturnAxisColumn', 'stl!flights.results.FlexMatrix.FlexMatrix__ReturnAxis', 'stl!flights.results.FlexMatrix.FlexMatrix__Axis__Icon', 'stl!flights.results.FlexMatrix.FlexMatrix__FilterExplanation__Text', 'stl!flights.results.FlexMatrix.FlexMatrix__FilterExplanation__Link', 'flights/results/_svg_/arrow-down', 'flights/results/_svg_/arrow-forward', 'string!flights/results//FLEX_MATRIX_NONSTOP_ONLY_CHECKBOX', 'string!flights/results//FLEX_MATRIX_NEO_DEPART_AXIS_LABEL', 'string!flights/results//FLEX_MATRIX_NEO_RETURN_AXIS_LABEL', 'string!flights/results//FLEX_MATRIX_NEO_FILTER_EXPLANATION', 'string!flights/results//FLEX_MATRIX_NEO_FILTER_EXPLANATION_RESET', 'string!flights/results//FLEX_MATRIX_PREDICTION_PRICE_DISCLAIMER', 'property!horizon.flights.results.flexMatrix.returnLabelInMatrix', 'property!horizon.flights.results.flexMatrix.useLabelIcons', 'property!horizon.flights.results.flexMatrix.presentation', 'property!horizon.flights.results.flexMatrix.scrollToTop', 'property!horizon.flights.results.flexMatrix.scrollOffset', 'property!kapi.search.vInternal.flights.flexMatrix.filters.apply', 'flights/results/react/FlexMatrixDepartLabel', 'flights/results/react/FlexMatrixReturnLabel', 'flights/results/react/FlexMatrixGrid', 'common/widgets/checkbox/react/StyleJamCheckbox', 'flights/results/react/FlexMatrixBar', 'flights/results/react/FlexMatrixGridRow', 'flights/results/react/FlexMatrixGridBlock', 'flights/results/react/actions/FlexMatrixActions', 'common/analytics/react/Analytics', 'common/utils/react/presentate', 'common/results/filters/react/FilterStateController', 'common/utils/react/events', 'common/utils/react/question', 'flights/results/react/constants/FlexMatrixConstants', 'common/widgets/checkbox/react/constants/StyleJamCheckboxConstants', 'common/react/constants/layout', 'common/react/constants/globals'], function (exports, _stlFlexMatrix, _stlFlexMatrixNoFilters, _stlFlexMatrix__CheckboxWrapper, _stlFlexMatrix__GridContainer__Grid, _stlFlexMatrix__GridRowsContainer, _stlFlexMatrix__Content, _stlFlexMatrix__ContentV, _stlFlexMatrix__AboveGridRow, _stlFlexMatrix__AboveGridRowV, _stlFlexMatrix__ReturnAxis__Label, _stlFlexMatrix__ReturnAxis__LabelV, _stlFlexMatrix__CellSpacerV, _stlFlexMatrix__Axis__Label, _stlFlexMatrix__ReturnAxis__Label__Text, _stlFlexMatrix__DepartAxis, _stlFlexMatrix__ReturnAxisColumn, _stlFlexMatrix__ReturnAxis, _stlFlexMatrix__Axis__Icon, _stlFlexMatrix__FilterExplanation__Text, _stlFlexMatrix__FilterExplanation__Link, _svgArrowDown, _svgArrowForward, _stringFLEX_MATRIX_NONSTOP_ONLY_CHECKBOX, _stringFLEX_MATRIX_NEO_DEPART_AXIS_LABEL, _stringFLEX_MATRIX_NEO_RETURN_AXIS_LABEL, _stringFLEX_MATRIX_NEO_FILTER_EXPLANATION, _stringFLEX_MATRIX_NEO_FILTER_EXPLANATION_RESET, _stringFLEX_MATRIX_PREDICTION_PRICE_DISCLAIMER, _propertyHorizonFlightsResultsFlexMatrix, _propertyHorizonFlightsResultsFlexMatrix2, _propertyHorizonFlightsResultsFlexMatrix3, _propertyHorizonFlightsResultsFlexMatrix4, _propertyHorizonFlightsResultsFlexMatrix5, _propertyKapiSearchVInternalFlightsFlexMatrixFilters, _FlexMatrixDepartLabel, _FlexMatrixReturnLabel, _FlexMatrixGrid, _StyleJamCheckbox, _FlexMatrixBar, _FlexMatrixGridRow, _FlexMatrixGridBlock, _FlexMatrixActions, _Analytics, _presentate, _FilterStateController, _events, _question, _FlexMatrixConstants, _StyleJamCheckboxConstants, _layout, _globals) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexMatrix = exports.presentations = exports.PureFlexMatrix = undefined;

    var _stlFlexMatrix2 = babelHelpers.interopRequireDefault(_stlFlexMatrix);

    var _stlFlexMatrixNoFilters2 = babelHelpers.interopRequireDefault(_stlFlexMatrixNoFilters);

    var _stlFlexMatrix__CheckboxWrapper2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__CheckboxWrapper);

    var _stlFlexMatrix__GridContainer__Grid2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__GridContainer__Grid);

    var _stlFlexMatrix__GridRowsContainer2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__GridRowsContainer);

    var _stlFlexMatrix__Content2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__Content);

    var _stlFlexMatrix__ContentV2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__ContentV);

    var _stlFlexMatrix__AboveGridRow2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__AboveGridRow);

    var _stlFlexMatrix__AboveGridRowV2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__AboveGridRowV);

    var _stlFlexMatrix__ReturnAxis__Label2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__ReturnAxis__Label);

    var _stlFlexMatrix__ReturnAxis__LabelV2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__ReturnAxis__LabelV);

    var _stlFlexMatrix__CellSpacerV2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__CellSpacerV);

    var _stlFlexMatrix__Axis__Label2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__Axis__Label);

    var _stlFlexMatrix__ReturnAxis__Label__Text2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__ReturnAxis__Label__Text);

    var _stlFlexMatrix__DepartAxis2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__DepartAxis);

    var _stlFlexMatrix__ReturnAxisColumn2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__ReturnAxisColumn);

    var _stlFlexMatrix__ReturnAxis2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__ReturnAxis);

    var _stlFlexMatrix__Axis__Icon2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__Axis__Icon);

    var _stlFlexMatrix__FilterExplanation__Text2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__FilterExplanation__Text);

    var _stlFlexMatrix__FilterExplanation__Link2 = babelHelpers.interopRequireDefault(_stlFlexMatrix__FilterExplanation__Link);

    var _svgArrowDown2 = babelHelpers.interopRequireDefault(_svgArrowDown);

    var _svgArrowForward2 = babelHelpers.interopRequireDefault(_svgArrowForward);

    var _stringFLEX_MATRIX_NONSTOP_ONLY_CHECKBOX2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NONSTOP_ONLY_CHECKBOX);

    var _stringFLEX_MATRIX_NEO_DEPART_AXIS_LABEL2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_DEPART_AXIS_LABEL);

    var _stringFLEX_MATRIX_NEO_RETURN_AXIS_LABEL2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_RETURN_AXIS_LABEL);

    var _stringFLEX_MATRIX_NEO_FILTER_EXPLANATION2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_FILTER_EXPLANATION);

    var _stringFLEX_MATRIX_NEO_FILTER_EXPLANATION_RESET2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_FILTER_EXPLANATION_RESET);

    var _stringFLEX_MATRIX_PREDICTION_PRICE_DISCLAIMER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_PRICE_DISCLAIMER);

    var _FlexMatrixDepartLabel2 = babelHelpers.interopRequireDefault(_FlexMatrixDepartLabel);

    var _FlexMatrixReturnLabel2 = babelHelpers.interopRequireDefault(_FlexMatrixReturnLabel);

    var _FlexMatrixGrid2 = babelHelpers.interopRequireDefault(_FlexMatrixGrid);

    var _StyleJamCheckbox2 = babelHelpers.interopRequireDefault(_StyleJamCheckbox);

    var _FlexMatrixGridRow2 = babelHelpers.interopRequireDefault(_FlexMatrixGridRow);

    var flexMatrixActions = babelHelpers.interopRequireWildcard(_FlexMatrixActions);

    var _Analytics2 = babelHelpers.interopRequireDefault(_Analytics);

    var _presentate2 = babelHelpers.interopRequireDefault(_presentate);

    var FilterStateController = babelHelpers.interopRequireWildcard(_FilterStateController);

    var _events2 = babelHelpers.interopRequireDefault(_events);

    var _question2 = babelHelpers.interopRequireDefault(_question);

    var checkboxConstants = babelHelpers.interopRequireWildcard(_StyleJamCheckboxConstants);

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    var _presentations, _dec, _class;

    function GridRowsContainer(_ref) {
        var children = _ref.children,
            className = _ref.className,
            rowWidth = _ref.rowWidth;

        return babelHelpers.jsx('div', {
            className: className,
            style: { flex: '' + rowWidth }
        }, void 0, children);
    }

    var PureFlexMatrix = exports.PureFlexMatrix = function (_React$Component) {
        babelHelpers.inherits(PureFlexMatrix, _React$Component);

        function PureFlexMatrix(props) {
            babelHelpers.classCallCheck(this, PureFlexMatrix);

            var _this = babelHelpers.possibleConstructorReturn(this, (PureFlexMatrix.__proto__ || Object.getPrototypeOf(PureFlexMatrix)).call(this, props));

            _this.analytics = null;
            _this.wrapper = null;

            _this.analytics = new _Analytics2.default();
            _this.onCellClick = _this.onCellClick.bind(_this);
            return _this;
        }

        babelHelpers.createClass(PureFlexMatrix, [{
            key: 'toggleNonstopOnly',
            value: function toggleNonstopOnly(event) {
                if (_globals2.default.keyCodeSets.SELECT.includes(event.nativeEvent.which)) {
                    var _props = this.props,
                        nonstopOnly = _props.nonstopOnly,
                        undoStopsFilterState = _props.undoStopsFilterState,
                        updateNonstopOnlyState = _props.updateNonstopOnlyState;

                    var setChecked = !nonstopOnly;
                    updateNonstopOnlyState(setChecked);
                    if (undoStopsFilterState) {
                        FilterStateController.pushValueSetFilterUpdates({
                            stops: function stops(filterState) {
                                return babelHelpers.extends({}, filterState, undoStopsFilterState);
                            }
                        });
                    }
                    this.analytics.trackEvent({
                        action: 'click',
                        category: 'flexforall',
                        label: 'nonstoponly',
                        value: setChecked ? 'checked' : 'unchecked'
                    });
                }
            }
        }, {
            key: 'resetFilters',
            value: function resetFilters() {
                FilterStateController.resetAllFilters();
                this.analytics.trackEvent({
                    category: 'flex-matrix/filter-reset-link',
                    action: 'click',
                    value: this.props.flexFilterApplied ? 'flex-filters' : 'non-flex-filters'
                });
            }
        }, {
            key: 'onCellClick',
            value: function onCellClick() {
                if ((0, _propertyHorizonFlightsResultsFlexMatrix4.getBoolean)(false)) {
                    var boundingRect = this.wrapper.getBoundingClientRect();
                    var scrollAmount = (boundingRect.y ? boundingRect.y : boundingRect.top) + window.scrollY - (0, _propertyHorizonFlightsResultsFlexMatrix5.getNumber)(0);
                    window.scrollTo({
                        top: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        }, {
            key: 'publishHeightUpdates',
            value: function publishHeightUpdates() {
                if (!this.wrapper) {
                    return false;
                }
                var onHeightUpdate = this.props.onHeightUpdate;

                var componentHeight = this.wrapper.clientHeight;

                _events2.default.publish('flights.results.react.FlexMatrix.rendered.height', componentHeight);
                if (typeof onHeightUpdate === 'function') {
                    onHeightUpdate(componentHeight);
                    return true;
                }
                return false;
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                this.publishHeightUpdates();
                _question2.default.answer('flights.results.react.FlexMatrix.height', function () {
                    if (!_this2.wrapper) {
                        return null;
                    }
                    return _this2.wrapper.clientHeight;
                });
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.publishHeightUpdates();
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                _question2.default.forget('flights.results.react.FlexMatrix.height');
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var _props2 = this.props,
                    anyFilterApplied = _props2.anyFilterApplied,
                    departLabels = _props2.departLabels,
                    displayMode = _props2.displayMode,
                    flexFilterApplied = _props2.flexFilterApplied,
                    fullWidth = _props2.fullWidth,
                    hasNonstopToggle = _props2.hasNonstopToggle,
                    nonstopOnly = _props2.nonstopOnly,
                    predictionCellCount = _props2.predictionCellCount,
                    presentation = _props2.presentation,
                    returnLabels = _props2.returnLabels,
                    roundTrip = _props2.roundTrip,
                    uiStateKey = _props2.uiStateKey;


                if (displayMode === _FlexMatrixConstants.displayModes.NONE) {
                    return null;
                }
                var showResetLink = (0, _propertyKapiSearchVInternalFlightsFlexMatrixFilters.getBoolean)(true) && predictionCellCount <= 0 && (anyFilterApplied || flexFilterApplied && _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER !== displayMode);
                var departGridWidth = departLabels.length;
                var returnAxisWidth = 1;
                return React.createElement(
                    'div',
                    { className: _stlFlexMatrix2.default + ' ' + (!showResetLink ? _stlFlexMatrixNoFilters2.default : ''), ref: function ref(wrapper) {
                            _this3.wrapper = wrapper;
                        } },
                    babelHelpers.jsx('div', {
                        className: presentation.aboveGridRow
                    }, void 0, babelHelpers.jsx('div', {
                        className: _stlFlexMatrix__Axis__Label2.default + ' ' + presentation.bodyContent
                    }, void 0, (0, _propertyHorizonFlightsResultsFlexMatrix2.getBoolean)(false) ? babelHelpers.jsx(React.Fragment, {}, void 0, (0, _stringFLEX_MATRIX_NEO_DEPART_AXIS_LABEL2.default)(), babelHelpers.jsx(_svgArrowForward2.default, {
                        className: _stlFlexMatrix__Axis__Icon2.default
                    })) : (0, _stringFLEX_MATRIX_NEO_DEPART_AXIS_LABEL2.default)()), hasNonstopToggle && babelHelpers.jsx('div', {
                        className: _stlFlexMatrix__CheckboxWrapper2.default
                    }, void 0, babelHelpers.jsx(_StyleJamCheckbox2.default, {
                        id: 'FlexMatrix__NonStopToggle',
                        name: 'FlexMatrix__NonStopToggle',
                        value: 'nonstop',
                        label: _stringFLEX_MATRIX_NONSTOP_ONLY_CHECKBOX2.default.value(),
                        checked: nonstopOnly,
                        presentation: checkboxConstants.presentationKeys.MUTED,
                        size: _layout.sizes.MEDIUM,
                        ariaLabel: _stringFLEX_MATRIX_NONSTOP_ONLY_CHECKBOX2.default.value(),
                        click: function click(event) {
                            return _this3.toggleNonstopOnly(event);
                        },
                        keyDown: function keyDown(event) {
                            return _this3.toggleNonstopOnly(event);
                        }
                    }))),
                    babelHelpers.jsx('div', {
                        className: _stlFlexMatrix__GridContainer__Grid2.default + ' ' + presentation.bodyContent,
                        role: 'grid'
                    }, void 0, babelHelpers.jsx(GridRowsContainer, {
                        className: _stlFlexMatrix__GridRowsContainer2.default,
                        rowWidth: departGridWidth
                    }, void 0, babelHelpers.jsx(_FlexMatrixGridRow2.default, {
                        className: _stlFlexMatrix__DepartAxis2.default,
                        role: 'row'
                    }, void 0, departLabels.map(function (label) {
                        return babelHelpers.jsx(_FlexMatrixDepartLabel2.default, {
                            axisLabel: label,
                            filterName: 'flexdepart',
                            fullWidth: fullWidth,
                            uiStateKey: uiStateKey
                        });
                    })), babelHelpers.jsx(_FlexMatrixGrid2.default, {
                        onCellClick: this.onCellClick
                    })), roundTrip && babelHelpers.jsx(GridRowsContainer, {
                        className: _stlFlexMatrix__GridRowsContainer2.default + ' ' + _stlFlexMatrix__ReturnAxisColumn2.default,
                        rowWidth: returnAxisWidth
                    }, void 0, babelHelpers.jsx('ul', {
                        className: _stlFlexMatrix__ReturnAxis2.default,
                        role: 'grid'
                    }, void 0, babelHelpers.jsx(_FlexMatrixGridBlock.FlexMatrixGridBlock, {
                        className: presentation.spacerCell,
                        isv2: presentation.gridBlocksV2 ? 1 : 0,
                        role: 'presentation'
                    }, void 0, (0, _propertyHorizonFlightsResultsFlexMatrix.getBoolean)(false) && babelHelpers.jsx('div', {
                        className: '' + _stlFlexMatrix__Axis__Label2.default
                    }, void 0, (0, _stringFLEX_MATRIX_NEO_RETURN_AXIS_LABEL2.default)(), (0, _propertyHorizonFlightsResultsFlexMatrix2.getBoolean)(false) && babelHelpers.jsx(_svgArrowDown2.default, {
                        className: _stlFlexMatrix__Axis__Icon2.default
                    }))), returnLabels.map(function (label) {
                        return babelHelpers.jsx(_FlexMatrixReturnLabel2.default, {
                            axisLabel: label,
                            filterName: 'flexreturn',
                            fullWidth: fullWidth,
                            uiStateKey: uiStateKey
                        });
                    }))), roundTrip && !(0, _propertyHorizonFlightsResultsFlexMatrix.getBoolean)(false) && babelHelpers.jsx('div', {
                        className: _stlFlexMatrix__Axis__Label2.default + ' ' + presentation.returnAxisLabel
                    }, void 0, babelHelpers.jsx('span', {
                        className: _stlFlexMatrix__ReturnAxis__Label__Text2.default
                    }, void 0, (0, _stringFLEX_MATRIX_NEO_RETURN_AXIS_LABEL2.default)()))),
                    (predictionCellCount || showResetLink) && babelHelpers.jsx(_FlexMatrixBar.FlexMatrixBarMultiRow, {
                        isv2: presentation.gridBlocksV2 ? 1 : 0
                    }, void 0, !!predictionCellCount && babelHelpers.jsx(_FlexMatrixBar.FlexMatrixBarRow, {
                        className: _stlFlexMatrix__FilterExplanation__Text2.default
                    }, void 0, (0, _stringFLEX_MATRIX_PREDICTION_PRICE_DISCLAIMER2.default)()), showResetLink && babelHelpers.jsx(_FlexMatrixBar.FlexMatrixBarRow, {
                        id: 'FlexMatrix__FilterReset'
                    }, void 0, anyFilterApplied && babelHelpers.jsx('span', {
                        className: _stlFlexMatrix__FilterExplanation__Text2.default
                    }, void 0, (0, _stringFLEX_MATRIX_NEO_FILTER_EXPLANATION2.default)()), babelHelpers.jsx('button', {
                        id: 'FlexMatrix__FilterReset',
                        className: 'Button-No-Standard-Style ' + _stlFlexMatrix__FilterExplanation__Link2.default,
                        onClick: function onClick() {
                            return _this3.resetFilters();
                        }
                    }, void 0, (0, _stringFLEX_MATRIX_NEO_FILTER_EXPLANATION_RESET2.default)())))
                );
            }
        }]);
        return PureFlexMatrix;
    }(React.Component);

    var presentations = exports.presentations = (_presentations = {}, babelHelpers.defineProperty(_presentations, _FlexMatrixConstants.presentationKeys.DEFAULT, {
        aboveGridRow: _stlFlexMatrix__AboveGridRow2.default,
        bodyContent: _stlFlexMatrix__Content2.default,
        returnAxisLabel: _stlFlexMatrix__ReturnAxis__Label2.default,
        spacerCell: '',
        gridBlocksV2: false
    }), babelHelpers.defineProperty(_presentations, _FlexMatrixConstants.presentationKeys.V2, {
        aboveGridRow: _stlFlexMatrix__AboveGridRowV2.default,
        bodyContent: _stlFlexMatrix__ContentV2.default,
        returnAxisLabel: _stlFlexMatrix__ReturnAxis__LabelV2.default,
        spacerCell: _stlFlexMatrix__CellSpacerV2.default,
        gridBlocksV2: true
    }), _presentations);

    var FlexMatrix = exports.FlexMatrix = (_dec = (0, _presentate2.default)(presentations, (0, _propertyHorizonFlightsResultsFlexMatrix3.getString)()), _dec(_class = function (_PureFlexMatrix) {
        babelHelpers.inherits(FlexMatrix, _PureFlexMatrix);

        function FlexMatrix() {
            babelHelpers.classCallCheck(this, FlexMatrix);
            return babelHelpers.possibleConstructorReturn(this, (FlexMatrix.__proto__ || Object.getPrototypeOf(FlexMatrix)).apply(this, arguments));
        }

        return FlexMatrix;
    }(PureFlexMatrix)) || _class);
    exports.default = ReactRedux.connect(function (_ref2, _ref3) {
        var FlexMatrixReducer = _ref2.FlexMatrix,
            SearchPoll = _ref2.SearchPoll,
            FilterState = _ref2.FilterState;
        var fullWidth = _ref3.fullWidth,
            initialDisplayMode = _ref3.initialDisplayMode,
            _ref3$isHidden = _ref3.isHidden,
            isHidden = _ref3$isHidden === undefined ? false : _ref3$isHidden,
            onHeightUpdate = _ref3.onHeightUpdate;
        var _FlexMatrixReducer$da = FlexMatrixReducer.data,
            departLabels = _FlexMatrixReducer$da.departLabels,
            returnLabels = _FlexMatrixReducer$da.returnLabels,
            roundTrip = _FlexMatrixReducer$da.roundTrip;
        var _FlexMatrixReducer$ui = FlexMatrixReducer.ui,
            _FlexMatrixReducer$ui2 = _FlexMatrixReducer$ui.displayMode,
            displayMode = _FlexMatrixReducer$ui2 === undefined ? initialDisplayMode : _FlexMatrixReducer$ui2,
            hasBanner = _FlexMatrixReducer$ui.hasBanner,
            hasNonstopToggle = _FlexMatrixReducer$ui.hasNonstopToggle,
            nonstopOnly = _FlexMatrixReducer$ui.nonstopOnly,
            predictionCellCount = _FlexMatrixReducer$ui.predictionCellCount,
            undoStopsFilterState = _FlexMatrixReducer$ui.undoStopsFilterState;
        var _FilterState$ui = FilterState.ui,
            anyFilterApplied = _FilterState$ui.anyFilterApplied,
            flexFilterApplied = _FilterState$ui.flexFilterApplied;
        var pollStatus = SearchPoll.pollStatus;

        return {
            departLabels: departLabels,
            returnLabels: returnLabels,
            roundTrip: roundTrip,
            displayMode: displayMode,
            hasBanner: hasBanner,
            hasNonstopToggle: hasNonstopToggle,
            nonstopOnly: nonstopOnly,
            undoStopsFilterState: undoStopsFilterState,
            flexFilterApplied: flexFilterApplied,
            predictionCellCount: predictionCellCount,
            pollStatus: pollStatus,
            isHidden: isHidden,
            fullWidth: fullWidth,
            onHeightUpdate: onHeightUpdate,
            anyFilterApplied: anyFilterApplied && (0, _propertyKapiSearchVInternalFlightsFlexMatrixFilters.getBoolean)(true),
            uiStateKey: babelHelpers.typeof(FlexMatrixReducer.ui) === 'object' ? JSON.stringify(FlexMatrixReducer.ui) : ''
        };
    }, function (dispatch) {
        return {
            updateNonstopOnlyState: function updateNonstopOnlyState(setChecked) {
                return dispatch(flexMatrixActions.updateNonstopOnlyState(setChecked));
            }
        };
    })(FlexMatrix);
});define("default/common/results/filters/react/constants/FilterConstants", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var itemSelectedStatus = exports.itemSelectedStatus = {
        NOT_SELECTED: 0,
        SELECTED: 1,
        ONLY: 2
    };

    exports.default = itemSelectedStatus;
});define("default/flights/results/react/FlexMatrixGridRow", ['exports', 'stl!flights.results.FlexMatrixGridRow.GridRow'], function (exports, _stlGridRow) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = FlexMatrixGridRow;

    var _stlGridRow2 = babelHelpers.interopRequireDefault(_stlGridRow);

    function FlexMatrixGridRow(_ref) {
        var children = _ref.children,
            className = _ref.className,
            id = _ref.id,
            role = _ref.role;

        return babelHelpers.jsx('ul', {
            id: id,
            className: _stlGridRow2.default + ' ' + className,
            role: role
        }, void 0, children);
    }
});define('momondo/flights/results/_svg_/arrow-down', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M100 165V35M65 135l35 30 35-30\"/></svg> ";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "momondo/flights/results/_svg_/arrow-down"}, params || {}, {svg: svgStr})); };
});define('momondo/common/icon/_svg_/chevron', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"100%\" height=\"100%\"> <path fill=\"none\" stroke=\"currentColor\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M45 80l55 50 55-50\"></path> </svg> ";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "momondo/common/icon/_svg_/chevron"}, params || {}, {svg: svgStr})); };
});define("default/common/icon/react/SvgIcon", ['exports', 'common/icon/_svg_/checkmark', 'common/icon/_svg_/chevron', 'common/icon/_svg_/chevron-stroke', 'common/icon/_svg_/control-tower', 'common/icon/_svg_/heart', 'common/icon/_svg_/filters', 'common/icon/_svg_/magnifying-glass', 'common/icon/_svg_/share-alternate', 'common/icon/_svg_/save-outline', 'common/icon/_svg_/save-filled', 'common/icon/_svg_/heart-empty', 'common/icon/_svg_/heart-filled', 'property!horizon.common.results.kill-watchlist.enabled'], function (exports, _svgCheckmark, _svgChevron, _svgChevronStroke, _svgControlTower, _svgHeart, _svgFilters, _svgMagnifyingGlass, _svgShareAlternate, _svgSaveOutline, _svgSaveFilled, _svgHeartEmpty, _svgHeartFilled, _propertyHorizonCommonResultsKillWatchlist) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _svgCheckmark2 = babelHelpers.interopRequireDefault(_svgCheckmark);

    var _svgChevron2 = babelHelpers.interopRequireDefault(_svgChevron);

    var _svgChevronStroke2 = babelHelpers.interopRequireDefault(_svgChevronStroke);

    var _svgControlTower2 = babelHelpers.interopRequireDefault(_svgControlTower);

    var _svgHeart2 = babelHelpers.interopRequireDefault(_svgHeart);

    var _svgFilters2 = babelHelpers.interopRequireDefault(_svgFilters);

    var _svgMagnifyingGlass2 = babelHelpers.interopRequireDefault(_svgMagnifyingGlass);

    var _svgShareAlternate2 = babelHelpers.interopRequireDefault(_svgShareAlternate);

    var _svgSaveOutline2 = babelHelpers.interopRequireDefault(_svgSaveOutline);

    var _svgSaveFilled2 = babelHelpers.interopRequireDefault(_svgSaveFilled);

    var _svgHeartEmpty2 = babelHelpers.interopRequireDefault(_svgHeartEmpty);

    var _svgHeartFilled2 = babelHelpers.interopRequireDefault(_svgHeartFilled);

    var svgMap = {
        checkmark: _svgCheckmark2.default,
        chevron: _svgChevron2.default,
        'chevron-stroke': _svgChevronStroke2.default,
        'control-tower': _svgControlTower2.default,
        heart: _svgHeart2.default,
        filters: _svgFilters2.default,
        'magnifying-glass': _svgMagnifyingGlass2.default,
        'share-alternate': _svgShareAlternate2.default,
        'save-outline': (0, _propertyHorizonCommonResultsKillWatchlist.getBoolean)(false) ? _svgHeartEmpty2.default : _svgSaveOutline2.default,
        'save-filled': (0, _propertyHorizonCommonResultsKillWatchlist.getBoolean)(false) ? _svgHeartFilled2.default : _svgSaveFilled2.default
    };

    /*
    * Wrapper for common SVG Icons used across Horizon.
    */
    // Add svg icon imports as needed

    var SvgIcon = function (_React$PureComponent) {
        babelHelpers.inherits(SvgIcon, _React$PureComponent);

        function SvgIcon() {
            babelHelpers.classCallCheck(this, SvgIcon);
            return babelHelpers.possibleConstructorReturn(this, (SvgIcon.__proto__ || Object.getPrototypeOf(SvgIcon)).apply(this, arguments));
        }

        babelHelpers.createClass(SvgIcon, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    name = _props.name,
                    parentClassName = _props.parentClassName,
                    className = _props.className,
                    width = _props.width,
                    height = _props.height;

                var iconKey = name.replace('.svg', '').toLowerCase();

                if (svgMap[iconKey]) {
                    var Icon = svgMap[iconKey];
                    return babelHelpers.jsx(Icon, {
                        parentClassName: parentClassName,
                        className: className,
                        width: width,
                        height: height
                    });
                }
                return null;
            }
        }]);
        return SvgIcon;
    }(React.PureComponent);

    exports.default = SvgIcon;
});define("default/common/results/react/actions/SearchPollActions", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.clearSearch = clearSearch;
    exports.updateStartSearchState = updateStartSearchState;
    exports.updateSearchPoll = updateSearchPoll;
    exports.startSearchPolling = startSearchPolling;
    exports.endSearchPolling = endSearchPolling;
    var BASE_PATH = 'SearchPollListener.';

    var CLEAR_SEARCH = exports.CLEAR_SEARCH = BASE_PATH + 'CLEAR_SEARCH';
    var UPDATE_START_SEARCH_PARAMS = exports.UPDATE_START_SEARCH_PARAMS = BASE_PATH + 'UPDATE_START_SEARCH_PARAMS';
    var INIT_POLLING = exports.INIT_POLLING = BASE_PATH + 'INIT_POLLING';
    var END_POLLING = exports.END_POLLING = BASE_PATH + 'END_POLLING';
    var POLL_RESPONSE = exports.POLL_RESPONSE = BASE_PATH + 'POLL_RESPONSE';

    function mapCommonSearchStartDataToPoll(startData) {
        var _split = (startData.destination || '').split('/'),
            _split2 = babelHelpers.slicedToArray(_split, 2),
            destination = _split2[0],
            destinationId = _split2[1];

        var _split3 = (startData.origin || '').split('/'),
            _split4 = babelHelpers.slicedToArray(_split3, 2),
            origin = _split4[0],
            originId = _split4[1];

        return {
            activeCabin: startData.cabin,
            depart_date: startData.depart_date,
            depart_date_canon: startData.depart_date_canon,
            depart_date_flex: startData.depart_date_flex,
            destination: destination,
            destinationId: destinationId,
            flexCategory: startData.flex_category,
            isMulticity: startData.isMulticity,
            isOneWay: startData.oneWay,
            legCount: startData.legCount,
            origin: origin,
            originId: originId,
            preserveFilters: startData.preserveFilters,
            return_date: startData.return_date,
            return_date_canon: startData.return_date_canon,
            return_date_flex: startData.return_date_flex,
            resultsChanged: true,
            travelers: startData.travelers
        };
    }

    function mapSearchStartUpdateToPoll(startData) {
        return babelHelpers.extends({}, mapCommonSearchStartDataToPoll(startData), {
            isFlex: startData.flex_category === undefined || startData.depart_date_flex === undefined ? undefined : startData.flex_category !== 'exact' && startData.depart_date_flex !== 'exact' && (!startData.return_date_flex || startData.return_date_flex !== 'exact'),
            isRoundTrip: startData.oneWay === undefined ? undefined : !startData.oneWay,
            showPlusMinusThree: startData.flex_category === undefined || startData.cabin === undefined || startData.oneWay === undefined ? undefined : startData.flex_category === 'plusminusthree' && startData.cabin === 'e' && !startData.oneWay
        });
    }

    function mapSearchStartDataToPoll(startData) {
        return babelHelpers.extends({}, mapCommonSearchStartDataToPoll(startData), {
            isFlex: startData.flex_category !== 'exact' && startData.depart_date_flex !== 'exact' && (!startData.return_date_flex || startData.return_date_flex !== 'exact'),
            isRoundTrip: !startData.oneWay,
            showPlusMinusThree: startData.flex_category === 'plusminusthree' && startData.cabin === 'e' && !startData.oneWay
        });
    }

    function clearSearch() {
        return {
            type: CLEAR_SEARCH,
            payload: {}
        };
    }

    function updateStartSearchState(data) {
        return {
            type: UPDATE_START_SEARCH_PARAMS,
            payload: mapSearchStartUpdateToPoll(data)
        };
    }

    function updateSearchPoll(response) {
        return {
            type: POLL_RESPONSE,
            payload: response
        };
    }

    function startSearchPolling(data) {
        return {
            type: INIT_POLLING,
            payload: mapSearchStartDataToPoll(data)
        };
    }

    function endSearchPolling() {
        return {
            type: END_POLLING,
            payload: {
                completed: true
            }
        };
    }
});define("default/flights/results/react/actions/FlexMatrixActions", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.setUndoStopsFilterState = setUndoStopsFilterState;
    exports.updateAccordionState = updateAccordionState;
    exports.dismissNotification = dismissNotification;
    exports.updateCellHoverState = updateCellHoverState;
    exports.updateAxisHoverState = updateAxisHoverState;
    exports.updateNonstopOnlyState = updateNonstopOnlyState;
    var BASE_PATH = 'FlexMatrix.';
    var CHANGE_ACCORDION_STATE = exports.CHANGE_ACCORDION_STATE = BASE_PATH + 'CHANGE_ACCORDION_STATE';
    var DISMISS_NOTIFICATION = exports.DISMISS_NOTIFICATION = BASE_PATH + 'DISMISS_NOTIFICATION';
    var SET_UNDO_STOPS_FILTER_STATE = exports.SET_UNDO_STOPS_FILTER_STATE = BASE_PATH + 'SET_UNDO_STOPS_FILTER_STATE';
    var UPDATE_HOVERED_AXIS_LABEL = exports.UPDATE_HOVERED_AXIS_LABEL = BASE_PATH + 'UPDATE_HOVERED_AXIS_LABEL';
    var UPDATE_HOVERED_CELL = exports.UPDATE_HOVERED_CELL = BASE_PATH + 'UPDATE_HOVERED_CELL';
    var UPDATE_NONSTOP_ONLY = exports.UPDATE_NONSTOP_ONLY = BASE_PATH + 'UPDATE_NONSTOP_ONLY';

    function setUndoStopsFilterState(filterState) {
        return {
            type: SET_UNDO_STOPS_FILTER_STATE,
            payload: {
                filterState: filterState
            }
        };
    }
    function updateAccordionState(opened) {
        return {
            type: CHANGE_ACCORDION_STATE,
            payload: {
                accordionOpen: opened
            }
        };
    }

    function dismissNotification() {
        return {
            type: DISMISS_NOTIFICATION,
            payload: {}
        };
    }

    function updateCellHoverState(departId, returnId) {
        return {
            type: UPDATE_HOVERED_CELL,
            payload: {
                departId: departId,
                returnId: returnId
            }
        };
    }

    function updateAxisHoverState(departId, returnId) {
        return {
            type: UPDATE_HOVERED_AXIS_LABEL,
            payload: {
                departId: departId,
                returnId: returnId
            }
        };
    }

    function updateNonstopOnlyState(isChecked) {
        return {
            type: UPDATE_NONSTOP_ONLY,
            payload: isChecked
        };
    }
});define('default/flights/results/_svg_/calendar-inverted', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\"> <path d=\"M15.8333333,2.5 L15.8333333,0 L13.3333333,0 L13.3333333,2.5 L6.66666667,2.5 L6.66666667,0 L4.16666667,0 L4.16666667,2.5 L0.833333333,2.5 L0.833333333,5.83333333 L19.1666667,5.83333333 L19.1666667,2.5 L15.8333333,2.5 Z M0.833333333,7.5 L0.833333333,17.5 C0.833333333,18.4204746 1.57952542,19.1666667 2.5,19.1666667 L17.5,19.1666667 C18.4204746,19.1666667 19.1666667,18.4204746 19.1666667,17.5 L19.1666667,7.5 L0.833333333,7.5 Z M6.66666667,17.5 L3.33333333,17.5 L3.33333333,14.1666667 L6.66666667,14.1666667 L6.66666667,17.5 Z M6.66666667,12.5 L3.33333333,12.5 L3.33333333,9.16666667 L6.66666667,9.16666667 L6.66666667,12.5 Z M11.6666667,17.5 L8.33333333,17.5 L8.33333333,14.1666667 L11.6666667,14.1666667 L11.6666667,17.5 Z M11.6666667,12.5 L8.33333333,12.5 L8.33333333,9.16666667 L11.6666667,9.16666667 L11.6666667,12.5 Z M16.6666667,12.5 L13.3333333,12.5 L13.3333333,9.16666667 L16.6666667,9.16666667 L16.6666667,12.5 Z\"></path> </svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/flights/results/_svg_/calendar-inverted"}, params || {}, {svg: svgStr})); };
});define("default/flights/results/react/FlexMatrixCellLegsPanel", ['exports', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Leg', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Leg--not-first', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Leg__Airline-Logo', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Leg__Info', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Leg__Info__Row', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Leg__Label', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Leg__Airline-Name', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Leg__Details', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Leg__Details__Detail--not-last', 'stl!flights.results.FlexMatrixCellLegsPanel.Panel__Similar-Flights', 'string!flights/results//FLEX_MATRIX_CELL_LEGS_DEPART_LABEL', 'string!flights/results//FLEX_MATRIX_CELL_LEGS_RETURN_LABEL', 'string!flights/results//FLEX_MATRIX_CELL_SIMILAR_FLIGHTS', 'string!flights/results//FLEX_MATRIX_CELL_DATE_RANGE'], function (exports, _stlPanel, _stlPanel__Leg, _stlPanel__LegNotFirst, _stlPanel__Leg__AirlineLogo, _stlPanel__Leg__Info, _stlPanel__Leg__Info__Row, _stlPanel__Leg__Label, _stlPanel__Leg__AirlineName, _stlPanel__Leg__Details, _stlPanel__Leg__Details__DetailNotLast, _stlPanel__SimilarFlights, _stringFLEX_MATRIX_CELL_LEGS_DEPART_LABEL, _stringFLEX_MATRIX_CELL_LEGS_RETURN_LABEL, _stringFLEX_MATRIX_CELL_SIMILAR_FLIGHTS, _stringFLEX_MATRIX_CELL_DATE_RANGE) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _stlPanel2 = babelHelpers.interopRequireDefault(_stlPanel);

    var _stlPanel__Leg2 = babelHelpers.interopRequireDefault(_stlPanel__Leg);

    var _stlPanel__LegNotFirst2 = babelHelpers.interopRequireDefault(_stlPanel__LegNotFirst);

    var _stlPanel__Leg__AirlineLogo2 = babelHelpers.interopRequireDefault(_stlPanel__Leg__AirlineLogo);

    var _stlPanel__Leg__Info2 = babelHelpers.interopRequireDefault(_stlPanel__Leg__Info);

    var _stlPanel__Leg__Info__Row2 = babelHelpers.interopRequireDefault(_stlPanel__Leg__Info__Row);

    var _stlPanel__Leg__Label2 = babelHelpers.interopRequireDefault(_stlPanel__Leg__Label);

    var _stlPanel__Leg__AirlineName2 = babelHelpers.interopRequireDefault(_stlPanel__Leg__AirlineName);

    var _stlPanel__Leg__Details2 = babelHelpers.interopRequireDefault(_stlPanel__Leg__Details);

    var _stlPanel__Leg__Details__DetailNotLast2 = babelHelpers.interopRequireDefault(_stlPanel__Leg__Details__DetailNotLast);

    var _stlPanel__SimilarFlights2 = babelHelpers.interopRequireDefault(_stlPanel__SimilarFlights);

    var _stringFLEX_MATRIX_CELL_LEGS_DEPART_LABEL2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_CELL_LEGS_DEPART_LABEL);

    var _stringFLEX_MATRIX_CELL_LEGS_RETURN_LABEL2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_CELL_LEGS_RETURN_LABEL);

    var _stringFLEX_MATRIX_CELL_SIMILAR_FLIGHTS2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_CELL_SIMILAR_FLIGHTS);

    var _stringFLEX_MATRIX_CELL_DATE_RANGE2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_CELL_DATE_RANGE);

    var FlexMatrixCellLegsPanel = function (_React$PureComponent) {
        babelHelpers.inherits(FlexMatrixCellLegsPanel, _React$PureComponent);

        function FlexMatrixCellLegsPanel() {
            babelHelpers.classCallCheck(this, FlexMatrixCellLegsPanel);
            return babelHelpers.possibleConstructorReturn(this, (FlexMatrixCellLegsPanel.__proto__ || Object.getPrototypeOf(FlexMatrixCellLegsPanel)).apply(this, arguments));
        }

        babelHelpers.createClass(FlexMatrixCellLegsPanel, [{
            key: 'render',
            value: function render() {
                var dateRange = this.props.cellData.dateRange;
                var _props$flightSetData = this.props.flightSetData,
                    displayFlight = _props$flightSetData.displayFlight,
                    similarFlights = _props$flightSetData.similarFlights;

                return babelHelpers.jsx('div', {
                    className: _stlPanel2.default
                }, void 0, displayFlight.legs.map(function (leg, index) {
                    return babelHelpers.jsx('div', {
                        className: _stlPanel__Leg2.default + ' ' + (index > 0 && _stlPanel__LegNotFirst2.default)
                    }, void 0, babelHelpers.jsx('div', {
                        className: _stlPanel__Leg__AirlineLogo2.default
                    }, void 0, leg.airline && babelHelpers.jsx('img', {
                        src: leg.airline.logo,
                        alt: leg.airline.name,
                        width: '30'
                    })), babelHelpers.jsx('div', {
                        className: _stlPanel__Leg__Info2.default
                    }, void 0, babelHelpers.jsx('div', {
                        className: _stlPanel__Leg__Label2.default + ' ' + _stlPanel__Leg__Info__Row2.default
                    }, void 0, index === 0 ? (0, _stringFLEX_MATRIX_CELL_LEGS_DEPART_LABEL2.default)() : (0, _stringFLEX_MATRIX_CELL_LEGS_RETURN_LABEL2.default)()), leg.airline && babelHelpers.jsx('div', {
                        className: _stlPanel__Leg__AirlineName2.default + ' ' + _stlPanel__Leg__Info__Row2.default
                    }, void 0, leg.airline.name), babelHelpers.jsx('div', {
                        className: _stlPanel__Leg__Details2.default + ' ' + _stlPanel__Leg__Info__Row2.default
                    }, void 0, babelHelpers.jsx('span', {
                        className: _stlPanel__Leg__Details__DetailNotLast2.default
                    }, void 0, leg.origin, ' \u2013 ', leg.destination), babelHelpers.jsx('span', {
                        className: _stlPanel__Leg__Details__DetailNotLast2.default
                    }, void 0, leg.duration), babelHelpers.jsx('span', {}, void 0, leg.stops))));
                }), babelHelpers.jsx('div', {
                    className: _stlPanel__SimilarFlights2.default
                }, void 0, babelHelpers.jsx('span', {}, void 0, similarFlights > 0 ? (0, _stringFLEX_MATRIX_CELL_SIMILAR_FLIGHTS2.default)(similarFlights.toString()) : undefined), babelHelpers.jsx('span', {}, void 0, (0, _stringFLEX_MATRIX_CELL_DATE_RANGE2.default)(dateRange.toString()))));
            }
        }]);
        return FlexMatrixCellLegsPanel;
    }(React.PureComponent);

    exports.default = FlexMatrixCellLegsPanel;
});define("default/flights/results/react/constants/NearbyAirportInsightsContants", ['exports', 'prop-types', 'flights/results/react/constants/InsightsBannerConstants'], function (exports, _propTypes, _InsightsBannerConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.nearbyInsightsBannerShape = exports.airportRecommendationTypes = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var airportRecommendationTypes = exports.airportRecommendationTypes = babelHelpers.extends({}, _InsightsBannerConstants.genericRecommendationTypes, {
        CHANGE_ORIGIN: 'CHANGE_ORIGIN',
        CHANGE_DESTINATION: 'CHANGE_DESTINATION',
        CHANGE_BOTH: 'CHANGE_BOTH'
    });

    var nearbyInsightsBannerShape = exports.nearbyInsightsBannerShape = {
        data: _propTypes2.default.shape(babelHelpers.extends({}, _InsightsBannerConstants.genericInsightsBannerDataShape, {
            recommendationType: _propTypes2.default.oneOf(Object.values(airportRecommendationTypes)).isRequired,
            destinationCode: _propTypes2.default.string.isRequired,
            lowestPrice: _propTypes2.default.string.isRequired,
            originCode: _propTypes2.default.string.isRequired,
            displaySavings: _propTypes2.default.string.isRequired
        })),
        ui: _propTypes2.default.shape(_InsightsBannerConstants.genericInsightsBannerUiShape)
    };
});define("default/common/widgets/tip/react/StyleJamTooltip", ['exports', 'prop-types', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Wrapper', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Wrapper--absolute', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Wrapper--base-layer', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Wrapper--modal-layer', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Content', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--up', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--right', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--down', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--left', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Wrapper:kayak-branded', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Content:kayak-branded', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--up:kayak-branded', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--right:kayak-branded', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--down:kayak-branded', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--left:kayak-branded', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Wrapper:panel-white', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Content:panel-white', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--up:panel-white', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--right:panel-white', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--down:panel-white', 'stl!common.widgets.tip.StyleJamTooltip.Tooltip__Pointer--left:panel-white', 'common/react/Popover', 'common/widgets/tip/react/constants/TooltipConstants', 'common/utils/react/presentate'], function (exports, _propTypes, _stlTooltip__Wrapper, _stlTooltip__WrapperAbsolute, _stlTooltip__WrapperBaseLayer, _stlTooltip__WrapperModalLayer, _stlTooltip__Content, _stlTooltip__Pointer, _stlTooltip__PointerUp, _stlTooltip__PointerRight, _stlTooltip__PointerDown, _stlTooltip__PointerLeft, _stlTooltip__WrapperKayakBranded, _stlTooltip__ContentKayakBranded, _stlTooltip__PointerUpKayakBranded, _stlTooltip__PointerRightKayakBranded, _stlTooltip__PointerDownKayakBranded, _stlTooltip__PointerLeftKayakBranded, _stlTooltip__WrapperPanelWhite, _stlTooltip__ContentPanelWhite, _stlTooltip__PointerUpPanelWhite, _stlTooltip__PointerRightPanelWhite, _stlTooltip__PointerDownPanelWhite, _stlTooltip__PointerLeftPanelWhite, _Popover, _TooltipConstants, _presentate) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _stlTooltip__Wrapper2 = babelHelpers.interopRequireDefault(_stlTooltip__Wrapper);

    var _stlTooltip__WrapperAbsolute2 = babelHelpers.interopRequireDefault(_stlTooltip__WrapperAbsolute);

    var _stlTooltip__WrapperBaseLayer2 = babelHelpers.interopRequireDefault(_stlTooltip__WrapperBaseLayer);

    var _stlTooltip__WrapperModalLayer2 = babelHelpers.interopRequireDefault(_stlTooltip__WrapperModalLayer);

    var _stlTooltip__Content2 = babelHelpers.interopRequireDefault(_stlTooltip__Content);

    var _stlTooltip__Pointer2 = babelHelpers.interopRequireDefault(_stlTooltip__Pointer);

    var _stlTooltip__PointerUp2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerUp);

    var _stlTooltip__PointerRight2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerRight);

    var _stlTooltip__PointerDown2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerDown);

    var _stlTooltip__PointerLeft2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerLeft);

    var _stlTooltip__WrapperKayakBranded2 = babelHelpers.interopRequireDefault(_stlTooltip__WrapperKayakBranded);

    var _stlTooltip__ContentKayakBranded2 = babelHelpers.interopRequireDefault(_stlTooltip__ContentKayakBranded);

    var _stlTooltip__PointerUpKayakBranded2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerUpKayakBranded);

    var _stlTooltip__PointerRightKayakBranded2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerRightKayakBranded);

    var _stlTooltip__PointerDownKayakBranded2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerDownKayakBranded);

    var _stlTooltip__PointerLeftKayakBranded2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerLeftKayakBranded);

    var _stlTooltip__WrapperPanelWhite2 = babelHelpers.interopRequireDefault(_stlTooltip__WrapperPanelWhite);

    var _stlTooltip__ContentPanelWhite2 = babelHelpers.interopRequireDefault(_stlTooltip__ContentPanelWhite);

    var _stlTooltip__PointerUpPanelWhite2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerUpPanelWhite);

    var _stlTooltip__PointerRightPanelWhite2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerRightPanelWhite);

    var _stlTooltip__PointerDownPanelWhite2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerDownPanelWhite);

    var _stlTooltip__PointerLeftPanelWhite2 = babelHelpers.interopRequireDefault(_stlTooltip__PointerLeftPanelWhite);

    var _Popover2 = babelHelpers.interopRequireDefault(_Popover);

    var _presentate2 = babelHelpers.interopRequireDefault(_presentate);

    var _dec, _class;

    var presentations = {
        default: {
            wrapper: _stlTooltip__Wrapper2.default + ' ' + _stlTooltip__WrapperAbsolute2.default,
            content: _stlTooltip__Content2.default,
            pointerUp: _stlTooltip__PointerUp2.default,
            pointerRight: _stlTooltip__PointerRight2.default,
            pointerDown: _stlTooltip__PointerDown2.default,
            pointerLeft: _stlTooltip__PointerLeft2.default
        },
        'kayak-branded': {
            wrapper: _stlTooltip__WrapperKayakBranded2.default + ' ' + _stlTooltip__WrapperAbsolute2.default,
            content: _stlTooltip__ContentKayakBranded2.default,
            pointerUp: _stlTooltip__PointerUpKayakBranded2.default,
            pointerRight: _stlTooltip__PointerRightKayakBranded2.default,
            pointerDown: _stlTooltip__PointerDownKayakBranded2.default,
            pointerLeft: _stlTooltip__PointerLeftKayakBranded2.default
        },
        'panel-white': {
            wrapper: _stlTooltip__WrapperPanelWhite2.default + ' ' + _stlTooltip__WrapperAbsolute2.default,
            content: _stlTooltip__ContentPanelWhite2.default,
            pointerUp: _stlTooltip__PointerUpPanelWhite2.default,
            pointerRight: _stlTooltip__PointerRightPanelWhite2.default,
            pointerDown: _stlTooltip__PointerDownPanelWhite2.default,
            pointerLeft: _stlTooltip__PointerLeftPanelWhite2.default
        }
    };

    var Tooltip = (_dec = (0, _presentate2.default)(presentations), _dec(_class = function (_React$PureComponent) {
        babelHelpers.inherits(Tooltip, _React$PureComponent);

        function Tooltip() {
            babelHelpers.classCallCheck(this, Tooltip);
            return babelHelpers.possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
        }

        babelHelpers.createClass(Tooltip, [{
            key: 'popoverPosition',
            value: function popoverPosition(rect, targetRect) {
                var _props = this.props,
                    hidePointer = _props.hidePointer,
                    offset = _props.offset;
                var position = this.props.position;

                var offsetDefault = hidePointer ? 8 : 3;
                var extraOffset = typeof offset !== 'undefined' ? offset : offsetDefault;

                var startOffset = this.getPositionOffset(position, extraOffset, rect, targetRect);
                var orientationOffset = this.getOrientationOffset(position, rect, targetRect);

                if (this.shouldFlipPosition(position, startOffset, position.isVertical ? rect.height : rect.width, targetRect)) {
                    position = position.opposite;
                    startOffset = this.getPositionOffset(position, extraOffset, rect, targetRect);
                }
                return {
                    top: position.isVertical ? startOffset : orientationOffset,
                    left: position.isVertical ? orientationOffset : startOffset
                };
            }
        }, {
            key: 'getPositionOffset',
            value: function getPositionOffset(position, offset, _ref, _ref2) {
                var popoverWidth = _ref.width,
                    popoverHeight = _ref.height;
                var targetWidth = _ref2.width,
                    targetHeight = _ref2.height;

                var targetLength = position.isVertical ? targetHeight : targetWidth;
                var popoverLength = position.isVertical ? popoverHeight : popoverWidth;
                return position.isAfterTarget ? targetLength + offset : -popoverLength - offset;
            }
        }, {
            key: 'getOrientationOffset',
            value: function getOrientationOffset(position, _ref3, _ref4) {
                var popoverWidth = _ref3.width,
                    popoverHeight = _ref3.height;
                var targetWidth = _ref4.width,
                    targetHeight = _ref4.height;

                var targetOrientationLength = position.isVertical ? targetWidth : targetHeight;
                var popoverOrientationLength = position.isVertical ? popoverWidth : popoverHeight;
                switch (this.props.orientation) {
                    case _TooltipConstants.orientations.START:
                        return 0;
                    case _TooltipConstants.orientations.END:
                        return targetOrientationLength - popoverOrientationLength;
                    case _TooltipConstants.orientations.CENTER:
                    default:
                        return targetOrientationLength / 2 - popoverOrientationLength / 2;
                }
            }
        }, {
            key: 'shouldFlipPosition',
            value: function shouldFlipPosition(position, startOffset, popoverWidth, targetRect) {
                if (position.isAfterTarget) {
                    var targetEnd = position.isVertical ? targetRect.height + targetRect.y : targetRect.width + targetRect.x;
                    var popoverEnd = targetEnd + startOffset + popoverWidth;
                    var windowEnd = position.isVertical ? window.innerHeight : window.innerWidth;
                    return popoverEnd > windowEnd;
                }
                var windowStart = position.isVertical ? window.pageYOffset : window.pageXOffset;
                var targetStart = position.isVertical ? targetRect.y + startOffset : targetRect.x + startOffset;
                return targetStart < windowStart;
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props2 = this.props,
                    content = _props2.children,
                    target = _props2.for,
                    hidden = _props2.hidden,
                    hidePointer = _props2.hidePointer,
                    manageVisibility = _props2.manageVisibility,
                    modalLayer = _props2.modalLayer,
                    position = _props2.position,
                    presentation = _props2.presentation;

                if (!content) {
                    return null;
                }
                return babelHelpers.jsx(_Popover2.default, {
                    hidden: hidden || manageVisibility,
                    noAutoEvents: !manageVisibility,
                    showEvent: 'mouseover',
                    hideEvent: 'mouseout',
                    'for': target,
                    className: presentation.wrapper + ' ' + (modalLayer ? _stlTooltip__WrapperModalLayer2.default : _stlTooltip__WrapperBaseLayer2.default),
                    position: function position() {
                        return _this2.popoverPosition.apply(_this2, arguments);
                    }
                }, void 0, babelHelpers.jsx('div', {
                    className: '' + presentation.content
                }, void 0, content), !hidePointer && babelHelpers.jsx('div', {
                    className: _stlTooltip__Pointer2.default + ' ' + presentation[position.pointerStyles]
                }));
            }
        }], [{
            key: 'defaultProps',
            get: function get() {
                return {
                    for: null,
                    hidden: false,
                    hidePointer: false,
                    manageVisibility: false,
                    orientation: _TooltipConstants.orientations.CENTER,
                    position: _TooltipConstants.positions.BELOW
                };
            }
        }, {
            key: 'propTypes',
            get: function get() {
                return {
                    children: _propTypes2.default.node.isRequired,
                    for: _propTypes2.default.node,
                    hidden: _propTypes2.default.bool,
                    hidePointer: _propTypes2.default.bool,
                    manageVisibility: _propTypes2.default.bool,
                    orientation: _propTypes2.default.oneOf([_TooltipConstants.orientations.START, _TooltipConstants.orientations.CENTER, _TooltipConstants.orientations.END]),
                    position: _propTypes2.default.oneOf([_TooltipConstants.positions.ABOVE, _TooltipConstants.positions.RIGHT, _TooltipConstants.positions.BELOW, _TooltipConstants.positions.LEFT])
                };
            }
        }]);
        return Tooltip;
    }(React.PureComponent)) || _class);
    exports.default = Tooltip;
});define("default/flights/results/react/utils/FlexMatrixClientPredictionUtils", ['exports', 'flights/results/react/constants/FlexMatrixConstants'], function (exports, _FlexMatrixConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = setMatrixEntryPriceCategories;
    var BEST_PRICE = _FlexMatrixConstants.priceCategories.BEST_PRICE,
        GOOD_PRICE = _FlexMatrixConstants.priceCategories.GOOD_PRICE,
        BAD_PRICE = _FlexMatrixConstants.priceCategories.BAD_PRICE,
        WORST_PRICE = _FlexMatrixConstants.priceCategories.WORST_PRICE,
        DEFAULT = _FlexMatrixConstants.priceCategories.DEFAULT;


    /**
     * Get mean, min, max and (medium|mean) price from the passed set of sortedPrices
     * midPrice will be median if there are outliers in the data, otherwise mean will be used
     */
    function calcPriceStatistics(sortedPrices, config) {
        var mean = sortedPrices.reduce(function (prev, curr) {
            return prev + curr;
        }, 0) / sortedPrices.length;
        if (mean) {
            var min = sortedPrices[0];
            var max = sortedPrices[sortedPrices.length - 1];
            var useMedian = mean - min > (max - mean) * config.medianMaxAverageToBoundsRatio || max - mean > (mean - min) * config.medianMaxAverageToBoundsRatio;
            var midPrice = useMedian ? sortedPrices[Math.floor(sortedPrices.length / 2)] : mean;
            return { max: max, mean: mean, min: min, midPrice: midPrice };
        }
        return null;
    }

    function getValidatedSortedPrices(matrixEntries, _ref, flightGroupKey) {
        var minPriceRange = _ref.minPriceRange,
            minUniquePrices = _ref.minUniquePrices;

        if (!matrixEntries) {
            return null;
        }
        var prices = Object.values(matrixEntries).map(function (entry) {
            return entry[flightGroupKey].price;
        }).filter(function (price) {
            return price > 0;
        });
        if (!prices.length) {
            return null;
        }
        var uniquePrices = new Set(null); // Can't pass array directly for IE11 support
        prices.forEach(function (price) {
            return uniquePrices.add(price);
        });
        if (uniquePrices.size < minUniquePrices) {
            return null;
        }
        var sortedPrices = [].concat(babelHelpers.toConsumableArray(prices)).sort();
        if (sortedPrices[sortedPrices.length - 1] - sortedPrices[0] < minPriceRange) {
            return null;
        }
        return sortedPrices;
    }

    function makePriceCategoryThresolds(matrixEntries, config, flightGroupKey) {
        var _thresholds;

        var sortedPrices = getValidatedSortedPrices(matrixEntries, config, flightGroupKey);
        if (!sortedPrices) {
            return null;
        }
        var thresholds = (_thresholds = {}, babelHelpers.defineProperty(_thresholds, BEST_PRICE, NaN), babelHelpers.defineProperty(_thresholds, GOOD_PRICE, NaN), babelHelpers.defineProperty(_thresholds, BAD_PRICE, NaN), babelHelpers.defineProperty(_thresholds, WORST_PRICE, NaN), _thresholds);
        var badPricePercentAboveAvg = config.badPricePercentAboveAvg,
            calculateBestPrice = config.calculateBestPrice,
            calculateGoodPrice = config.calculateGoodPrice,
            calculateBadPrice = config.calculateBadPrice,
            calculateWorstPrice = config.calculateWorstPrice,
            goodPricePercentBelowAvg = config.goodPricePercentBelowAvg,
            maxCellsPerCategory = config.maxCellsPerCategory;

        var maxGoodPrice = NaN;
        var minBadPrice = NaN;
        var goodPriceCount = 0;
        var badPriceCount = 0;

        if (calculateGoodPrice || calculateBadPrice) {
            var statistics = calcPriceStatistics(sortedPrices, config);
            if (statistics) {
                if (calculateGoodPrice) {
                    maxGoodPrice = statistics.midPrice - (statistics.midPrice - statistics.min) * (goodPricePercentBelowAvg / 100);
                }
                if (calculateBadPrice) {
                    minBadPrice = statistics.midPrice - (statistics.midPrice - statistics.min) * (badPricePercentAboveAvg / 100);
                }
            }
        }
        sortedPrices.forEach(function (price, index, allPrices) {
            if (calculateWorstPrice && index === 0) {
                thresholds[WORST_PRICE] = price;
            } else if (calculateBestPrice && index === allPrices.length - 1) {
                thresholds[BEST_PRICE] = price;
            } else if (calculateGoodPrice && price <= maxGoodPrice) {
                thresholds[GOOD_PRICE] = price;
                goodPriceCount += 1;
            } else if (calculateBadPrice && price >= minBadPrice) {
                thresholds[BAD_PRICE] = thresholds[BAD_PRICE] || price;
                badPriceCount += 1;
            }
        });
        // If good/bad price cell count is above the max, ignore it - that matrix would be all green/red
        if (calculateGoodPrice && goodPriceCount > maxCellsPerCategory) {
            thresholds[GOOD_PRICE] = NaN;
        }
        if (calculateBadPrice && badPriceCount > maxCellsPerCategory) {
            thresholds[BAD_PRICE] = NaN;
        }
        return thresholds;
    }

    function getPriceCategory(price, thresholds) {
        if (price <= thresholds[BEST_PRICE]) {
            return BEST_PRICE;
        } else if (price <= thresholds[GOOD_PRICE]) {
            return GOOD_PRICE;
        } else if (price >= thresholds[BAD_PRICE]) {
            return BAD_PRICE;
        } else if (price >= thresholds[WORST_PRICE]) {
            return WORST_PRICE;
        }
        return DEFAULT;
    }

    function setMatrixEntryPriceCategories(matrixEntries, _ref2) {
        var priceCategoryConfig = _ref2.priceCategoryConfig;
        var flightGroupKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'allFlights';

        var thresholds = makePriceCategoryThresolds(matrixEntries, priceCategoryConfig, flightGroupKey);
        if (!thresholds) {
            return matrixEntries;
        }
        var entries = {};
        Object.keys(matrixEntries).forEach(function (entryKey) {
            entries[entryKey] = babelHelpers.extends({}, matrixEntries[entryKey], babelHelpers.defineProperty({}, flightGroupKey, babelHelpers.extends({}, matrixEntries[entryKey][flightGroupKey], {
                priceCategory: getPriceCategory(matrixEntries[entryKey].price, thresholds)
            })));
        });
        return entries;
    }
});define("default/common/widgets/checkbox/react/constants/StyleJamCheckboxConstants", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var presentationKeys = exports.presentationKeys = {
        VANILLA: 'VANILLA',
        ICON_LAYOUT: 'ICON_LAYOUT',
        MUTED: 'MUTED',
        MUTED_UIKIT: 'MUTED_UIKIT',
        BUTTON_STYLE: 'BUTTON_STYLE',
        FLAT_BUTTON_STYLE: 'FLAT_BUTTON_STYLE',
        PHOENIX_RISING_FD: 'PHOENIX_RISING_FD',
        PHOENIX_RISING_RP: 'PHOENIX_RISING_RP',
        FLEX_MATRIX: 'FLEX_MATRIX'
    };

    var states = exports.states = {
        CHECKED: 'CHECKED',
        UNCHECKED: 'UNCHECKED',
        FOCUSED_CHECKED: 'FOCUSED_CHECKED',
        FOCUSED_UNCHECKED: 'FOCUSED_UNCHECKED',
        ALT_HOVER_CHECKED: 'ALT_HOVER_CHECKED',
        ALT_HOVER_UNCHECKED: 'ALT_HOVER_UNCHECKED'
    };
});define("default/flights/results/react/FlexMatrixBar", ['exports', 'stl!flights.results.FlexMatrixBar.FlexMatrixBar', 'stl!flights.results.FlexMatrixBar.FlexMatrixBar--v1', 'stl!flights.results.FlexMatrixBar.FlexMatrixBar--v2', 'stl!flights.results.FlexMatrixBar.FlexMatrixBar--MultiRow', 'stl!flights.results.FlexMatrixBar.FlexMatrixBar--MultiRow__Row'], function (exports, _stlFlexMatrixBar, _stlFlexMatrixBarV, _stlFlexMatrixBarV3, _stlFlexMatrixBarMultiRow, _stlFlexMatrixBarMultiRow__Row) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexMatrixBar = FlexMatrixBar;
    exports.FlexMatrixBarMultiRow = FlexMatrixBarMultiRow;
    exports.FlexMatrixBarRow = FlexMatrixBarRow;

    var _stlFlexMatrixBar2 = babelHelpers.interopRequireDefault(_stlFlexMatrixBar);

    var _stlFlexMatrixBarV2 = babelHelpers.interopRequireDefault(_stlFlexMatrixBarV);

    var _stlFlexMatrixBarV4 = babelHelpers.interopRequireDefault(_stlFlexMatrixBarV3);

    var _stlFlexMatrixBarMultiRow2 = babelHelpers.interopRequireDefault(_stlFlexMatrixBarMultiRow);

    var _stlFlexMatrixBarMultiRow__Row2 = babelHelpers.interopRequireDefault(_stlFlexMatrixBarMultiRow__Row);

    function FlexMatrixBar(_ref) {
        var className = _ref.className,
            children = _ref.children,
            isv2 = _ref.isv2;

        return babelHelpers.jsx('div', {
            className: className + ' ' + _stlFlexMatrixBar2.default + ' ' + (isv2 ? _stlFlexMatrixBarV4.default : _stlFlexMatrixBarV2.default)
        }, void 0, children);
    }

    function FlexMatrixBarMultiRow(_ref2) {
        var className = _ref2.className,
            children = _ref2.children,
            isv2 = _ref2.isv2;

        return babelHelpers.jsx('div', {
            className: className + ' ' + _stlFlexMatrixBarMultiRow2.default + ' ' + (isv2 ? _stlFlexMatrixBarV4.default : _stlFlexMatrixBarV2.default)
        }, void 0, children);
    }

    function FlexMatrixBarRow(_ref3) {
        var className = _ref3.className,
            children = _ref3.children;

        return babelHelpers.jsx('div', {
            className: className + ' ' + _stlFlexMatrixBarMultiRow__Row2.default
        }, void 0, children);
    }
});define("default/common/widgets/checkbox/react/StyleJamCheckbox", ['exports', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--base', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__input--base', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__label--base', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__label--default', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__label--default-size', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--size-s__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--size-ms__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--size-l__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--checked__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--unchecked__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--checked--alternate-hover__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--unchecked--alternate-hover__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__icon--base', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__icon--default', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__icon--default-size', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--size-s__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--size-ms__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--size-l__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--checked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--unchecked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--iconLayout', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--iconLayout__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--checked--iconLayout__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted--checked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted--unchecked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted--focus--checked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted--focus--unchecked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted-uikit--size-s__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted-uikit--size-m__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted-uikit--size-l__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted-uikit--checked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted-uikit--focus--checked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted-uikit--size-s__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted-uikit--size-m__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--muted-uikit--size-l__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--buttonStyle', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--buttonStyle__input', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--buttonStyle__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--buttonStyle__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--buttonStyle--checked__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flatButtonStyle', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flatButtonStyle__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flatButtonStyle__input', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flatButtonStyle--checked__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flatButtonStyle--unchecked__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flatButtonStyle__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flatButtonStyle--checked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flatButtonStyle--unchecked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--rising-fd__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--rising-fd__label__on', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--rising-fd__label__off', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--rising-fd__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--rising-fd__icon--checked', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--rising-fd__icon--unchecked', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--rising-rp__label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--rising-rp__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flex-matrix--unchecked__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flex-matrix--unchecked__icon--base', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox--flex-matrix--unchecked--altermate-hover__icon', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__label--hidden', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__icon--with-label', 'stl!common.widgets.checkbox.StyleJamCheckbox.Checkbox__icon--no-label', 'common/widgets/checkbox/_svg_/checkmark-uikit', 'common/widgets/checkbox/react/constants/StyleJamCheckboxConstants', 'common/react/constants/globals', 'common/utils/react/presentate', 'common/react/constants/layout'], function (exports, _stlCheckboxBase, _stlCheckbox__inputBase, _stlCheckbox__labelBase, _stlCheckbox__labelDefault, _stlCheckbox__labelDefaultSize, _stlCheckboxSizeS__label, _stlCheckboxSizeMs__label, _stlCheckboxSizeL__label, _stlCheckboxChecked__label, _stlCheckboxUnchecked__label, _stlCheckboxCheckedAlternateHover__icon, _stlCheckboxUncheckedAlternateHover__icon, _stlCheckbox__iconBase, _stlCheckbox__iconDefault, _stlCheckbox__iconDefaultSize, _stlCheckboxSizeS__icon, _stlCheckboxSizeMs__icon, _stlCheckboxSizeL__icon, _stlCheckboxChecked__icon, _stlCheckboxUnchecked__icon, _stlCheckboxIconLayout, _stlCheckboxIconLayout__label, _stlCheckboxCheckedIconLayout__label, _stlCheckboxMuted__icon, _stlCheckboxMutedChecked__icon, _stlCheckboxMutedUnchecked__icon, _stlCheckboxMutedFocusChecked__icon, _stlCheckboxMutedFocusUnchecked__icon, _stlCheckboxMutedUikitSizeS__icon, _stlCheckboxMutedUikitSizeM__icon, _stlCheckboxMutedUikitSizeL__icon, _stlCheckboxMutedUikitChecked__icon, _stlCheckboxMutedUikitFocusChecked__icon, _stlCheckboxMutedUikitSizeS__label, _stlCheckboxMutedUikitSizeM__label, _stlCheckboxMutedUikitSizeL__label, _stlCheckboxButtonStyle, _stlCheckboxButtonStyle__input, _stlCheckboxButtonStyle__label, _stlCheckboxButtonStyle__icon, _stlCheckboxButtonStyleChecked__label, _stlCheckboxFlatButtonStyle, _stlCheckboxFlatButtonStyle__label, _stlCheckboxFlatButtonStyle__input, _stlCheckboxFlatButtonStyleChecked__label, _stlCheckboxFlatButtonStyleUnchecked__label, _stlCheckboxFlatButtonStyle__icon, _stlCheckboxFlatButtonStyleChecked__icon, _stlCheckboxFlatButtonStyleUnchecked__icon, _stlCheckboxRisingFd__label, _stlCheckboxRisingFd__label__on, _stlCheckboxRisingFd__label__off, _stlCheckboxRisingFd__icon, _stlCheckboxRisingFd__iconChecked, _stlCheckboxRisingFd__iconUnchecked, _stlCheckboxRisingRp__label, _stlCheckboxRisingRp__icon, _stlCheckboxFlexMatrixUnchecked__icon, _stlCheckboxFlexMatrixUnchecked__iconBase, _stlCheckboxFlexMatrixUncheckedAltermateHover__icon, _stlCheckbox__labelHidden, _stlCheckbox__iconWithLabel, _stlCheckbox__iconNoLabel, _svgCheckmarkUikit, _StyleJamCheckboxConstants, _globals, _presentate, _layout) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _stlCheckboxBase2 = babelHelpers.interopRequireDefault(_stlCheckboxBase);

    var _stlCheckbox__inputBase2 = babelHelpers.interopRequireDefault(_stlCheckbox__inputBase);

    var _stlCheckbox__labelBase2 = babelHelpers.interopRequireDefault(_stlCheckbox__labelBase);

    var _stlCheckbox__labelDefault2 = babelHelpers.interopRequireDefault(_stlCheckbox__labelDefault);

    var _stlCheckbox__labelDefaultSize2 = babelHelpers.interopRequireDefault(_stlCheckbox__labelDefaultSize);

    var _stlCheckboxSizeS__label2 = babelHelpers.interopRequireDefault(_stlCheckboxSizeS__label);

    var _stlCheckboxSizeMs__label2 = babelHelpers.interopRequireDefault(_stlCheckboxSizeMs__label);

    var _stlCheckboxSizeL__label2 = babelHelpers.interopRequireDefault(_stlCheckboxSizeL__label);

    var _stlCheckboxChecked__label2 = babelHelpers.interopRequireDefault(_stlCheckboxChecked__label);

    var _stlCheckboxUnchecked__label2 = babelHelpers.interopRequireDefault(_stlCheckboxUnchecked__label);

    var _stlCheckboxCheckedAlternateHover__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxCheckedAlternateHover__icon);

    var _stlCheckboxUncheckedAlternateHover__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxUncheckedAlternateHover__icon);

    var _stlCheckbox__iconBase2 = babelHelpers.interopRequireDefault(_stlCheckbox__iconBase);

    var _stlCheckbox__iconDefault2 = babelHelpers.interopRequireDefault(_stlCheckbox__iconDefault);

    var _stlCheckbox__iconDefaultSize2 = babelHelpers.interopRequireDefault(_stlCheckbox__iconDefaultSize);

    var _stlCheckboxSizeS__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxSizeS__icon);

    var _stlCheckboxSizeMs__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxSizeMs__icon);

    var _stlCheckboxSizeL__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxSizeL__icon);

    var _stlCheckboxChecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxChecked__icon);

    var _stlCheckboxUnchecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxUnchecked__icon);

    var _stlCheckboxIconLayout2 = babelHelpers.interopRequireDefault(_stlCheckboxIconLayout);

    var _stlCheckboxIconLayout__label2 = babelHelpers.interopRequireDefault(_stlCheckboxIconLayout__label);

    var _stlCheckboxCheckedIconLayout__label2 = babelHelpers.interopRequireDefault(_stlCheckboxCheckedIconLayout__label);

    var _stlCheckboxMuted__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMuted__icon);

    var _stlCheckboxMutedChecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedChecked__icon);

    var _stlCheckboxMutedUnchecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedUnchecked__icon);

    var _stlCheckboxMutedFocusChecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedFocusChecked__icon);

    var _stlCheckboxMutedFocusUnchecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedFocusUnchecked__icon);

    var _stlCheckboxMutedUikitSizeS__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedUikitSizeS__icon);

    var _stlCheckboxMutedUikitSizeM__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedUikitSizeM__icon);

    var _stlCheckboxMutedUikitSizeL__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedUikitSizeL__icon);

    var _stlCheckboxMutedUikitChecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedUikitChecked__icon);

    var _stlCheckboxMutedUikitFocusChecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedUikitFocusChecked__icon);

    var _stlCheckboxMutedUikitSizeS__label2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedUikitSizeS__label);

    var _stlCheckboxMutedUikitSizeM__label2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedUikitSizeM__label);

    var _stlCheckboxMutedUikitSizeL__label2 = babelHelpers.interopRequireDefault(_stlCheckboxMutedUikitSizeL__label);

    var _stlCheckboxButtonStyle2 = babelHelpers.interopRequireDefault(_stlCheckboxButtonStyle);

    var _stlCheckboxButtonStyle__input2 = babelHelpers.interopRequireDefault(_stlCheckboxButtonStyle__input);

    var _stlCheckboxButtonStyle__label2 = babelHelpers.interopRequireDefault(_stlCheckboxButtonStyle__label);

    var _stlCheckboxButtonStyle__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxButtonStyle__icon);

    var _stlCheckboxButtonStyleChecked__label2 = babelHelpers.interopRequireDefault(_stlCheckboxButtonStyleChecked__label);

    var _stlCheckboxFlatButtonStyle2 = babelHelpers.interopRequireDefault(_stlCheckboxFlatButtonStyle);

    var _stlCheckboxFlatButtonStyle__label2 = babelHelpers.interopRequireDefault(_stlCheckboxFlatButtonStyle__label);

    var _stlCheckboxFlatButtonStyle__input2 = babelHelpers.interopRequireDefault(_stlCheckboxFlatButtonStyle__input);

    var _stlCheckboxFlatButtonStyleChecked__label2 = babelHelpers.interopRequireDefault(_stlCheckboxFlatButtonStyleChecked__label);

    var _stlCheckboxFlatButtonStyleUnchecked__label2 = babelHelpers.interopRequireDefault(_stlCheckboxFlatButtonStyleUnchecked__label);

    var _stlCheckboxFlatButtonStyle__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxFlatButtonStyle__icon);

    var _stlCheckboxFlatButtonStyleChecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxFlatButtonStyleChecked__icon);

    var _stlCheckboxFlatButtonStyleUnchecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxFlatButtonStyleUnchecked__icon);

    var _stlCheckboxRisingFd__label2 = babelHelpers.interopRequireDefault(_stlCheckboxRisingFd__label);

    var _stlCheckboxRisingFd__label__on2 = babelHelpers.interopRequireDefault(_stlCheckboxRisingFd__label__on);

    var _stlCheckboxRisingFd__label__off2 = babelHelpers.interopRequireDefault(_stlCheckboxRisingFd__label__off);

    var _stlCheckboxRisingFd__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxRisingFd__icon);

    var _stlCheckboxRisingFd__iconChecked2 = babelHelpers.interopRequireDefault(_stlCheckboxRisingFd__iconChecked);

    var _stlCheckboxRisingFd__iconUnchecked2 = babelHelpers.interopRequireDefault(_stlCheckboxRisingFd__iconUnchecked);

    var _stlCheckboxRisingRp__label2 = babelHelpers.interopRequireDefault(_stlCheckboxRisingRp__label);

    var _stlCheckboxRisingRp__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxRisingRp__icon);

    var _stlCheckboxFlexMatrixUnchecked__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxFlexMatrixUnchecked__icon);

    var _stlCheckboxFlexMatrixUnchecked__iconBase2 = babelHelpers.interopRequireDefault(_stlCheckboxFlexMatrixUnchecked__iconBase);

    var _stlCheckboxFlexMatrixUncheckedAltermateHover__icon2 = babelHelpers.interopRequireDefault(_stlCheckboxFlexMatrixUncheckedAltermateHover__icon);

    var _stlCheckbox__labelHidden2 = babelHelpers.interopRequireDefault(_stlCheckbox__labelHidden);

    var _stlCheckbox__iconWithLabel2 = babelHelpers.interopRequireDefault(_stlCheckbox__iconWithLabel);

    var _stlCheckbox__iconNoLabel2 = babelHelpers.interopRequireDefault(_stlCheckbox__iconNoLabel);

    var _svgCheckmarkUikit2 = babelHelpers.interopRequireDefault(_svgCheckmarkUikit);

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    var _presentate2 = babelHelpers.interopRequireDefault(_presentate);

    var _labelStateClasses, _iconStateClasses, _labelStateClasses2, _iconStateClasses2, _iconStateClasses3, _iconSizeOverrides, _labelSizeOverrides, _labelStateClasses3, _labelStateClasses4, _iconStateClasses4, _labelStateClasses5, _iconStateClasses5, _iconStateClasses6, _presentations, _labelClasses, _iconClasses, _dec, _class;

    var vanillaPresentation = {
        componentClasses: _stlCheckboxBase2.default,
        inputClasses: _stlCheckbox__inputBase2.default,
        labelClasses: _stlCheckbox__labelBase2.default + ' ' + _stlCheckbox__labelDefault2.default,
        labelStateClasses: (_labelStateClasses = {}, babelHelpers.defineProperty(_labelStateClasses, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxChecked__label2.default), babelHelpers.defineProperty(_labelStateClasses, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxUnchecked__label2.default), _labelStateClasses),
        iconClasses: _stlCheckbox__iconBase2.default + ' ' + _stlCheckbox__iconDefault2.default,
        iconStateClasses: (_iconStateClasses = {}, babelHelpers.defineProperty(_iconStateClasses, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxChecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxUnchecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses, _StyleJamCheckboxConstants.states.ALT_HOVER_CHECKED, _stlCheckboxCheckedAlternateHover__icon2.default), babelHelpers.defineProperty(_iconStateClasses, _StyleJamCheckboxConstants.states.ALT_HOVER_UNCHECKED, _stlCheckboxUncheckedAlternateHover__icon2.default), _iconStateClasses)
    };

    var presentations = (_presentations = {}, babelHelpers.defineProperty(_presentations, _StyleJamCheckboxConstants.presentationKeys.VANILLA, vanillaPresentation), babelHelpers.defineProperty(_presentations, _StyleJamCheckboxConstants.presentationKeys.ICON_LAYOUT, babelHelpers.extends({}, vanillaPresentation, {
        componentClasses: _stlCheckboxBase2.default + ' ' + _stlCheckboxIconLayout2.default,
        labelClasses: _stlCheckbox__labelBase2.default + ' ' + _stlCheckboxIconLayout__label2.default,
        labelStateClasses: (_labelStateClasses2 = {}, babelHelpers.defineProperty(_labelStateClasses2, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxCheckedIconLayout__label2.default), babelHelpers.defineProperty(_labelStateClasses2, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxUnchecked__label2.default), _labelStateClasses2)
    })), babelHelpers.defineProperty(_presentations, _StyleJamCheckboxConstants.presentationKeys.MUTED, babelHelpers.extends({}, vanillaPresentation, {
        iconClasses: _stlCheckboxMuted__icon2.default,
        iconStateClasses: (_iconStateClasses2 = {}, babelHelpers.defineProperty(_iconStateClasses2, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxMutedChecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses2, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxMutedUnchecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses2, _StyleJamCheckboxConstants.states.FOCUSED_CHECKED, _stlCheckboxMutedFocusChecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses2, _StyleJamCheckboxConstants.states.FOCUSED_UNCHECKED, _stlCheckboxMutedFocusUnchecked__icon2.default), _iconStateClasses2),
        labelStateClasses: {}
    })), babelHelpers.defineProperty(_presentations, _StyleJamCheckboxConstants.presentationKeys.MUTED_UIKIT, babelHelpers.extends({}, vanillaPresentation, {
        iconClasses: _stlCheckboxMuted__icon2.default,
        iconStateClasses: (_iconStateClasses3 = {}, babelHelpers.defineProperty(_iconStateClasses3, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxMutedUikitChecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses3, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxMutedUnchecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses3, _StyleJamCheckboxConstants.states.FOCUSED_CHECKED, _stlCheckboxMutedUikitFocusChecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses3, _StyleJamCheckboxConstants.states.FOCUSED_UNCHECKED, _stlCheckboxMutedFocusUnchecked__icon2.default), _iconStateClasses3),
        iconSizeOverrides: (_iconSizeOverrides = {}, babelHelpers.defineProperty(_iconSizeOverrides, _layout.sizes.SMALL, _stlCheckboxMutedUikitSizeS__icon2.default), babelHelpers.defineProperty(_iconSizeOverrides, _layout.sizes.MEDIUM, _stlCheckboxMutedUikitSizeM__icon2.default), babelHelpers.defineProperty(_iconSizeOverrides, _layout.sizes.LARGE, _stlCheckboxMutedUikitSizeL__icon2.default), _iconSizeOverrides),
        iconSvg: _svgCheckmarkUikit2.default,
        labelStateClasses: {},
        labelSizeOverrides: (_labelSizeOverrides = {}, babelHelpers.defineProperty(_labelSizeOverrides, _layout.sizes.SMALL, _stlCheckboxMutedUikitSizeS__label2.default), babelHelpers.defineProperty(_labelSizeOverrides, _layout.sizes.MEDIUM, _stlCheckboxMutedUikitSizeM__label2.default), babelHelpers.defineProperty(_labelSizeOverrides, _layout.sizes.LARGE, _stlCheckboxMutedUikitSizeL__label2.default), _labelSizeOverrides)
    })), babelHelpers.defineProperty(_presentations, _StyleJamCheckboxConstants.presentationKeys.BUTTON_STYLE, babelHelpers.extends({}, vanillaPresentation, {
        componentClasses: _stlCheckboxBase2.default + ' ' + _stlCheckboxButtonStyle2.default,
        inputClasses: _stlCheckboxButtonStyle__input2.default,
        labelClasses: _stlCheckboxButtonStyle__label2.default,
        labelStateClasses: (_labelStateClasses3 = {}, babelHelpers.defineProperty(_labelStateClasses3, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxButtonStyleChecked__label2.default), babelHelpers.defineProperty(_labelStateClasses3, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxUnchecked__label2.default), _labelStateClasses3),
        iconClasses: _stlCheckboxButtonStyle__icon2.default
    })), babelHelpers.defineProperty(_presentations, _StyleJamCheckboxConstants.presentationKeys.FLAT_BUTTON_STYLE, babelHelpers.extends({}, vanillaPresentation, {
        componentClasses: _stlCheckboxBase2.default + ' ' + _stlCheckboxFlatButtonStyle2.default,
        inputClasses: _stlCheckboxFlatButtonStyle__input2.default,
        labelClasses: _stlCheckboxFlatButtonStyle__label2.default,
        labelStateClasses: (_labelStateClasses4 = {}, babelHelpers.defineProperty(_labelStateClasses4, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxFlatButtonStyleChecked__label2.default), babelHelpers.defineProperty(_labelStateClasses4, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxFlatButtonStyleUnchecked__label2.default), _labelStateClasses4),
        iconClasses: _stlCheckboxFlatButtonStyle__icon2.default,
        iconStateClasses: (_iconStateClasses4 = {}, babelHelpers.defineProperty(_iconStateClasses4, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxFlatButtonStyleChecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses4, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxFlatButtonStyleUnchecked__icon2.default), _iconStateClasses4)
    })), babelHelpers.defineProperty(_presentations, _StyleJamCheckboxConstants.presentationKeys.PHOENIX_RISING_FD, babelHelpers.extends({}, vanillaPresentation, {
        labelClasses: _stlCheckboxRisingFd__label2.default + ' ' + _stlCheckbox__labelDefault2.default,
        labelStateClasses: (_labelStateClasses5 = {}, babelHelpers.defineProperty(_labelStateClasses5, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxRisingFd__label__on2.default), babelHelpers.defineProperty(_labelStateClasses5, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxRisingFd__label__off2.default), _labelStateClasses5),
        iconClasses: _stlCheckboxRisingFd__icon2.default,
        iconStateClasses: (_iconStateClasses5 = {}, babelHelpers.defineProperty(_iconStateClasses5, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxRisingFd__iconChecked2.default), babelHelpers.defineProperty(_iconStateClasses5, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxRisingFd__iconUnchecked2.default), _iconStateClasses5)
    })), babelHelpers.defineProperty(_presentations, _StyleJamCheckboxConstants.presentationKeys.PHOENIX_RISING_RP, babelHelpers.extends({}, vanillaPresentation, {
        labelClasses: _stlCheckboxRisingRp__label2.default + ' ' + _stlCheckbox__labelDefault2.default,
        iconClasses: _stlCheckboxRisingRp__icon2.default
    })), babelHelpers.defineProperty(_presentations, _StyleJamCheckboxConstants.presentationKeys.FLEX_MATRIX, babelHelpers.extends({}, vanillaPresentation, {
        iconStateClasses: (_iconStateClasses6 = {}, babelHelpers.defineProperty(_iconStateClasses6, _StyleJamCheckboxConstants.states.CHECKED, _stlCheckboxChecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses6, _StyleJamCheckboxConstants.states.UNCHECKED, _stlCheckboxFlexMatrixUnchecked__icon2.default + ' ' + _stlCheckboxFlexMatrixUnchecked__iconBase2.default), babelHelpers.defineProperty(_iconStateClasses6, _StyleJamCheckboxConstants.states.ALT_HOVER_CHECKED, _stlCheckboxChecked__icon2.default), babelHelpers.defineProperty(_iconStateClasses6, _StyleJamCheckboxConstants.states.ALT_HOVER_UNCHECKED, _stlCheckboxFlexMatrixUncheckedAltermateHover__icon2.default + ' ' + _stlCheckboxFlexMatrixUnchecked__iconBase2.default), _iconStateClasses6)
    })), _presentations);

    var sizePresentations = {
        labelClasses: (_labelClasses = {}, babelHelpers.defineProperty(_labelClasses, _layout.sizes.SMALL, _stlCheckboxSizeS__label2.default), babelHelpers.defineProperty(_labelClasses, _layout.sizes.MEDIUM_SMALL, _stlCheckboxSizeMs__label2.default), babelHelpers.defineProperty(_labelClasses, _layout.sizes.MEDIUM, _stlCheckbox__labelDefaultSize2.default), babelHelpers.defineProperty(_labelClasses, _layout.sizes.LARGE, _stlCheckboxSizeL__label2.default), _labelClasses),
        iconClasses: (_iconClasses = {}, babelHelpers.defineProperty(_iconClasses, _layout.sizes.SMALL, _stlCheckboxSizeS__icon2.default), babelHelpers.defineProperty(_iconClasses, _layout.sizes.MEDIUM_SMALL, _stlCheckboxSizeMs__icon2.default), babelHelpers.defineProperty(_iconClasses, _layout.sizes.MEDIUM, _stlCheckbox__iconDefaultSize2.default), babelHelpers.defineProperty(_iconClasses, _layout.sizes.LARGE, _stlCheckboxSizeL__icon2.default), _iconClasses)
    };

    /*
     * Port of StyleJamCheckbox as a react component, without toggle support (which should be a subclass of this if needed for react)
     */
    var StyleJamCheckbox = (_dec = (0, _presentate2.default)(presentations), _dec(_class = function (_React$Component) {
        babelHelpers.inherits(StyleJamCheckbox, _React$Component);
        babelHelpers.createClass(StyleJamCheckbox, null, [{
            key: 'defaultProps',
            get: function get() {
                return {
                    size: _layout.sizes.MEDIUM,
                    presentation: _StyleJamCheckboxConstants.presentationKeys.VANILLA,
                    manageStateManually: false
                };
            }
        }]);

        function StyleJamCheckbox(props) {
            babelHelpers.classCallCheck(this, StyleJamCheckbox);

            var _this = babelHelpers.possibleConstructorReturn(this, (StyleJamCheckbox.__proto__ || Object.getPrototypeOf(StyleJamCheckbox)).call(this, props));

            _this.state = { checked: props.checked, focused: props.focused };
            return _this;
        }

        babelHelpers.createClass(StyleJamCheckbox, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.manageStateManually && nextProps.checked !== this.state.checked && nextProps.checked !== this.props.checked) {
                    this.setState({ checked: nextProps.checked, 'aria-checked': nextProps.checked });
                }
            }
        }, {
            key: 'id',
            value: function id(suffix) {
                return '' + this.props.id + (suffix ? '_' + suffix : '');
            }
        }, {
            key: 'toggle',
            value: function toggle() {
                if (!this.props.disabled) {
                    this.setState({ checked: !this.state.checked, 'aria-checked': !this.state.checked });
                }
            }
        }, {
            key: 'handleClick',
            value: function handleClick(event) {
                if (this.props.click) {
                    this.props.click(event);
                }
                if (!this.props.manageStateManually) {
                    this.toggle();
                }
            }
        }, {
            key: 'handleChange',
            value: function handleChange(event) {
                if (this.props.change) {
                    this.props.change(event);
                }
            }
        }, {
            key: 'handleFocus',
            value: function handleFocus(event) {
                if (this.props.focus) {
                    this.props.focus(event);
                }
                if (!this.props.manageStateManually) {
                    this.setState({ focused: true });
                }
            }
        }, {
            key: 'handleBlur',
            value: function handleBlur(event) {
                if (this.props.blur) {
                    this.props.blur(event);
                }
                if (!this.props.manageStateManually) {
                    this.setState({ focused: false });
                }
            }
        }, {
            key: 'handleKeyDown',
            value: function handleKeyDown(event) {
                if (this.props.keyDown) {
                    this.props.keyDown(event);
                }
                if (!this.props.manageStateManually && _globals2.default.keyCodeSets.SELECT.includes(event.nativeEvent.which)) {
                    this.toggle();
                }
            }
        }, {
            key: 'getStlStateClasses',
            value: function getStlStateClasses(stateClasses) {
                var _props = this.props,
                    checked = _props.checked,
                    focused = _props.focused,
                    alternateHovered = _props.alternateHovered;

                if (checked) {
                    if (focused && stateClasses[_StyleJamCheckboxConstants.states.FOCUSED_CHECKED]) {
                        return stateClasses[_StyleJamCheckboxConstants.states.FOCUSED_CHECKED];
                    }
                    return alternateHovered && stateClasses[_StyleJamCheckboxConstants.states.ALT_HOVER_CHECKED] || stateClasses[_StyleJamCheckboxConstants.states.CHECKED];
                }
                if (focused && stateClasses[_StyleJamCheckboxConstants.states.FOCUSED_UNCHECKED]) {
                    return stateClasses[_StyleJamCheckboxConstants.states.FOCUSED_UNCHECKED];
                }
                return alternateHovered && stateClasses[_StyleJamCheckboxConstants.states.ALT_HOVER_UNCHECKED] || stateClasses[_StyleJamCheckboxConstants.states.UNCHECKED];
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props$state = babelHelpers.extends({}, this.props, this.state),
                    label = _props$state.label,
                    value = _props$state.value,
                    name = _props$state.name,
                    checked = _props$state.checked,
                    disabled = _props$state.disabled,
                    presentation = _props$state.presentation,
                    size = _props$state.size,
                    extraClassName = _props$state.extraClassName,
                    _props$state$showLabe = _props$state.showLabel,
                    showLabel = _props$state$showLabe === undefined ? true : _props$state$showLabe,
                    ariaLabel = _props$state.ariaLabel,
                    ariaControls = _props$state.ariaControls,
                    ariaLive = _props$state.ariaLive,
                    tabIndex = _props$state.tabIndex;

                var componentClasses = presentation.componentClasses,
                    inputClasses = presentation.inputClasses,
                    iconClasses = presentation.iconClasses,
                    labelClasses = presentation.labelClasses;


                var iconStateClasses = this.getStlStateClasses(presentation.iconStateClasses);
                var labelStateClasses = this.getStlStateClasses(presentation.labelStateClasses);
                var iconSizeClasses = presentation.iconSizeOverrides ? presentation.iconSizeOverrides[size] : sizePresentations.iconClasses[size];
                var labelSizeClasses = presentation.labelSizeOverrides ? presentation.labelSizeOverrides[size] : sizePresentations.labelClasses[size];

                return babelHelpers.jsx('div', {
                    className: 'StyleJamCheckbox ' + componentClasses + ' ' + extraClassName
                }, void 0, babelHelpers.jsx('input', {
                    id: this.id(),
                    className: inputClasses,
                    name: name,
                    value: value,
                    checked: checked ? 'checked' : undefined,
                    type: 'checkbox',
                    'aria-checked': checked,
                    disabled: disabled ? 'disabled' : undefined,
                    'aria-disabled': disabled,
                    'aria-label': ariaLabel || this.id('label'),
                    'aria-controls': ariaControls,
                    'aria-live': ariaLive,
                    'aria-atomic': ariaLive ? 'true' : undefined,
                    tabIndex: tabIndex,
                    onClick: function onClick(event) {
                        return _this2.handleClick(event);
                    },
                    onChange: function onChange(event) {
                        return _this2.handleChange(event);
                    },
                    onBlur: function onBlur(event) {
                        return _this2.handleBlur(event);
                    },
                    onFocus: function onFocus(event) {
                        return _this2.handleFocus(event);
                    },
                    onKeyDown: function onKeyDown(event) {
                        return _this2.handleKeyDown(event);
                    }
                }, this.id('inputKey')), babelHelpers.jsx('div', {
                    id: '' + this.id('icon'),
                    className: iconClasses + ' ' + iconStateClasses + ' ' + iconSizeClasses + '\n                        ' + (showLabel ? _stlCheckbox__iconWithLabel2.default : _stlCheckbox__iconNoLabel2.default)
                }, void 0, presentation.iconSvg && checked ? presentation.iconSvg() : undefined), babelHelpers.jsx('label', {
                    id: '' + this.id('label'),
                    htmlFor: '' + this.id(),
                    className: labelClasses + ' ' + labelStateClasses + ' ' + labelSizeClasses + ' ' + (!showLabel ? _stlCheckbox__labelHidden2.default : ''),
                    'data-name': name,
                    'aria-label': label
                }, void 0, label));
            }
        }]);
        return StyleJamCheckbox;
    }(React.Component)) || _class);
    exports.default = StyleJamCheckbox;
});define("default/common/react/constants/globals", ['exports', 'common/react/constants/keyCodes', 'common/react/constants/breakPoints'], function (exports, _keyCodes, _breakPoints) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _keyCodes2 = babelHelpers.interopRequireDefault(_keyCodes);

    var _breakPoints2 = babelHelpers.interopRequireDefault(_breakPoints);

    /*
     * React wrapper for the R9 globals object
     * Used to prevent exceptions where the R9 context isn't available.
     */

    var reactGlobals = {
        keyCodeSets: {
            SELECT: [_keyCodes2.default.MOUSE_LEFT, _keyCodes2.default.ENTER],
            SCROLL: [_keyCodes2.default.HOME, _keyCodes2.default.PAGE_UP, _keyCodes2.default.PAGE_DOWN, _keyCodes2.default.END],
            ARROW_KEYS: [_keyCodes2.default.UP, _keyCodes2.default.RIGHT, _keyCodes2.default.DOWN, _keyCodes2.default.LEFT],
            MOUSE_BUTTONS: [_keyCodes2.default.MOUSE_LEFT, _keyCodes2.default.MOUSE_MIDDLE, _keyCodes2.default.MOUSE_RIGHT]
        }
    };

    var globals = function () {
        if (typeof R9 !== 'undefined') {
            return babelHelpers.extends({}, R9.globals, reactGlobals);
        }
        console.warn('globals not available without R9 context. Global objects and arrays have been mocked to prevent exceptions');
        return babelHelpers.extends({
            analytics: {},
            browserCapabilities: {},
            currencyConversionRates: {},
            dateFormats: {
                isoDate: 'YYYY-MM-DD'
            },
            features: [],
            keyCodes: _keyCodes2.default,
            breakPoints: _breakPoints2.default,
            locale: {},
            optimizeExperiments: [],
            uiconfig: {}
        }, reactGlobals);
    }();

    exports.default = globals;
});define("default/common/results/react/constants/SearchPollConstants", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var searchPollStatus = exports.searchPollStatus = {
        NO_SEARCH: 'NO_SEARCH',
        SEARCH_STARTED: 'SEARCH_STARTED',
        FIRST_PHASE: 'FIRST_PHASE',
        SECOND_PHASE: 'SECOND_PHASE',
        SEARCH_FINISHED: 'SEARCH_FINISHED',
        NO_RESULTS: 'NO_RESULTS',
        SEARCH_EXPIRED: 'SEARCH_EXPIRED',
        SEARCH_ERROR: 'SEARCH_ERROR'
    };

    var inProgressStatuses = exports.inProgressStatuses = [searchPollStatus.SEARCH_STARTED, searchPollStatus.FIRST_PHASE, searchPollStatus.SECOND_PHASE];

    var noResultStatuses = exports.noResultStatuses = [searchPollStatus.NO_RESULTS, searchPollStatus.SEARCH_EXPIRED, searchPollStatus.SEARCH_ERROR];

    var searchStartRequiredParams = exports.searchStartRequiredParams = ['origin', 'destination', 'depart_date_canon'];

    var endSearchReasons = exports.endSearchReasons = {
        COMPLETED: 'completed',
        SECOND_PHASE_TIMEOUT: '2ftimeout',
        ERROR: 'error'
    };
});define("default/flights/results/react/constants/AveragePriceInsightsConstants", ['exports', 'prop-types', 'flights/results/react/constants/InsightsBannerConstants'], function (exports, _propTypes, _InsightsBannerConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.averagePriceInsightsBannerShape = exports.averagePriceRecommendationTypes = exports.averagePriceAdvantageTypeGroups = exports.averagePriceAdvantageTypes = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var averagePriceAdvantageTypes = exports.averagePriceAdvantageTypes = babelHelpers.extends({}, _InsightsBannerConstants.advantageTypes, {
        FLEX_SEARCH_LET_THE_USER_DECIDE: 'FLEX_SEARCH_LET_THE_USER_DECIDE',
        LOADING_AVERAGE_PRICE: 'LOADING_AVERAGE_PRICE',
        LOADING_SEARCH_PRICE: 'LOADING_SEARCH_PRICE'
    });

    var averagePriceAdvantageTypeGroups = exports.averagePriceAdvantageTypeGroups = {
        ANY_LOADING: [_InsightsBannerConstants.advantageTypes.LOADING, averagePriceAdvantageTypes.LOADING_AVERAGE_PRICE, averagePriceAdvantageTypes.LOADING_SEARCH_PRICE],
        HIDE_IF_AJAX_FINISHED: [].concat(babelHelpers.toConsumableArray(_InsightsBannerConstants.advantageTypeGroups.NO_ADVANTAGE), [averagePriceAdvantageTypes.LOADING, averagePriceAdvantageTypes.LOADING_AVERAGE_PRICE])
    };

    var averagePriceRecommendationTypes = exports.averagePriceRecommendationTypes = babelHelpers.extends({}, _InsightsBannerConstants.genericRecommendationTypes, {
        ABOVE_AVERAGE_PRICE: 'ABOVE_AVERAGE_PRICE',
        AVERAGE_PRICE: 'AVERAGE_PRICE',
        BELOW_AVERAGE_PRICE: 'BELOW_AVERAGE_PRICE',
        DEFER_CLIENT_SIDE: 'DEFER_CLIENT_SIDE'
    });

    var averagePriceInsightsBannerShape = exports.averagePriceInsightsBannerShape = {
        clientDerivedData: _propTypes2.default.shape({
            advantageType: _propTypes2.default.oneOf(Object.values(averagePriceAdvantageTypes)).isRequired,
            ajaxStatus: _propTypes2.default.oneOf(Object.values(_InsightsBannerConstants.ajaxRequestStatus)).isRequired,
            averagePrice: _propTypes2.default.number.isRequired,
            recommendationType: _propTypes2.default.oneOf(Object.values(averagePriceRecommendationTypes)).isRequired
        }),
        data: _propTypes2.default.shape(babelHelpers.extends({}, _InsightsBannerConstants.genericInsightsBannerDataShape, {
            cheapestSearchPrice: _propTypes2.default.number.isRequired
        })),
        ui: _propTypes2.default.shape(_InsightsBannerConstants.genericInsightsBannerUiShape)
    };
});define('default/flights/results/_svg_/calendar-star', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg width=\"19.5\" height=\"19.5\" viewBox=\"0 0 19.5 19.5\" xmlns=\"http://www.w3.org/2000/svg\"> <path fill=\"currentColor\" d=\"M15.8333333,2.5 L15.8333333,0 L13.3333333,0 L13.3333333,2.5 L6.66666667,2.5 L6.66666667,0 L4.16666667,0 L4.16666667,2.5 L0.833333333,2.5 L0.833333333,5.83333333 L19.1666667,5.83333333 L19.1666667,2.5 L15.8333333,2.5 Z M0.833333333,7.5 L0.833333333,17.5 C0.833333333,18.4204746 1.57952542,19.1666667 2.5,19.1666667 L17.5,19.1666667 C18.4204746,19.1666667 19.1666667,18.4204746 19.1666667,17.5 L19.1666667,7.5 L0.833333333,7.5 Z M8.43099983,12.067833 C8.7001665,12.067833 8.94183316,11.9061663 9.04433316,11.657833 L10.0743332,9.16699966 L11.1043332,11.657833 C11.2076665,11.9061663 11.4501665,12.067833 11.7184998,12.067833 L14.1668332,12.067833 L12.2118332,13.985333 C12.0509998,14.1436663 11.9809998,14.3719997 12.0259998,14.592833 L12.6259998,17.500333 L10.4451665,16.032833 C10.2209998,15.8819997 9.9276665,15.8819997 9.70349983,16.032833 L7.5226665,17.500333 L8.12433316,14.607833 C8.17183316,14.3786663 8.09599983,14.1419997 7.92349983,13.9836663 L5.83349983,12.067833 L8.43099983,12.067833 Z\"></path> </svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/flights/results/_svg_/calendar-star"}, params || {}, {svg: svgStr})); };
});define("default/common/analytics/react/Google", ['exports', 'context', 'property!ui.ga.forceOff', 'property!nucleus.analytics.plugins.google.tid', 'common/react/constants/globals'], function (exports, _context, _propertyUiGa, _propertyNucleusAnalyticsPluginsGoogle, _globals) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _context2 = babelHelpers.interopRequireDefault(_context);

    var _propertyUiGa2 = babelHelpers.interopRequireDefault(_propertyUiGa);

    var _propertyNucleusAnalyticsPluginsGoogle2 = babelHelpers.interopRequireDefault(_propertyNucleusAnalyticsPluginsGoogle);

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    var KAYAK_VERTICAL = 'dimension1';
    var KAYAK_PAGE = 'dimension2';
    var KAYAK_SUB_PAGE = 'dimension3';
    var KAYAK_LOCALE = 'dimension4';
    var KAYAK_AFFILIATE = 'dimension5';
    var KAYAK_EXPERIMENT = 'dimension6';
    var KAYAK_AFFILIATESKIN = 'dimension7';
    var KAYAK_PRESENTATION = 'dimension8';
    var KAYAK_LOGINSTATE = 'dimension9';
    var KAYAK_DESTINATIONID = 'dimension10';
    var KAYAK_HOTELPROPERTYID = 'dimension11';
    var KAYAK_ORIGINIATACODE = 'dimension12';
    var KAYAK_DESTINATIONIATACODE = 'dimension13';
    var KAYAK_SESSIONID = 'dimension28';

    var trackerCreated = false;

    var Google = function () {
        babelHelpers.createClass(Google, [{
            key: 'initialize',
            value: function initialize() {
                setTimeout(function () {
                    (function initGoogleAnalytics(s, o, g, r) {
                        var i = window;
                        i.GoogleAnalyticsObject = r;
                        if (!i[r]) {
                            i[r] = function () {
                                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                    args[_key] = arguments[_key];
                                }

                                (i[r].q = i[r].q || []).push(args);
                            };
                        }
                        i[r].l = 1 * new Date();

                        if (_propertyUiGa2.default.value !== 'true') {
                            var a = s.createElement(o);
                            var m = s.getElementsByTagName(o)[0];
                            a.async = 1;
                            a.src = g;
                            m.parentNode.insertBefore(a, m);
                        } else {
                            // no GA allowed
                            // but dummy ga tracker should handle callbacks.
                            i[r] = function () {
                                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                    args[_key2] = arguments[_key2];
                                }

                                if (args && args.length > 2 && args[2] && typeof args[2].hitCallback === 'function') {
                                    args[2].hitCallback();
                                }
                            };
                        }
                    })(window.document, 'script', '//www.google-analytics.com/analytics.js', 'gaTracker');
                }, 500);
            }
        }]);

        function Google() {
            var _this = this;

            var globals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _globals2.default;
            babelHelpers.classCallCheck(this, Google);

            this.globals = globals;

            if (_context2.default.isClient() && typeof window.gaTracker === 'undefined') {
                var i = window;
                var r = 'gaTracker';
                if (!i[r]) {
                    i[r] = function () {
                        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            args[_key3] = arguments[_key3];
                        }

                        (i[r].q = i[r].q || []).push(args);
                    };
                }

                if (_context2.default.isServer()) {
                    return;
                }

                if (window.document.readyState === 'complete') {
                    this.initialize();
                } else {
                    window.addEventListener('load', function () {
                        return _this.initialize();
                    });
                }
            }

            this.thirdPartyEvents = ['details/inlinemultibook', 'results/button/resultclick', 'results/multibooklinks', 'details/resultclick/button', 'results/inline/click', 'clickout/results/offers/cheapest_price/button', 'clickout/results/offers/inline_vertical_multibook', 'clickout/listview/detailslayer/offers/cheapest_price/button', 'clickout/mapview/detailslayer/offers/cheapest_price/button', 'clickout/results/offers/inline_horizontal_multibook', 'mapview/popup/results/button/resultclick', 'clickout/mapview/detailslayer/offers/cheapest_price/button', 'mapview/results/multibooklinks', 'details/rates/button/resultclick', '/multibook/buttonClicked', 'inline/hmultibook/resultclick', '/multibook/linkClicked', 'hotel/inline/rates/show', 'results/inline/horizontal/click'];
        }

        babelHelpers.createClass(Google, [{
            key: 'pageHandler',
            value: function pageHandler(data) {
                var _this2 = this;

                return new Promise(function (resolve) {
                    var trackPageView = _this2.globals.analytics.google.trackPageView === 'true';

                    if (_context2.default.isClient() && (trackPageView || _this2.globals.wlgoogle)) {
                        Google.createTracker(_this2.globals.analytics.utoken);
                        var googleData = Google.makeGooglePageData(data, resolve);

                        if (_this2.globals.wlgoogle) {
                            var settings = {
                                name: _this2.globals.wlgoogle.name
                            };

                            if (_this2.globals.wlgoogle.autolinker === 'true') {
                                settings.allowLinker = true;
                            }

                            window.gaTracker('create', _this2.globals.wlgoogle.id, 'auto', settings);

                            window.gaTracker(_this2.globals.wlgoogle.name + '.send', 'pageview');
                        }

                        if (trackPageView) {
                            if (R9.globals.analytics.google.trackPageView_send_extra_dims === 'true') {
                                Google.setupTracker(window.gaTracker, googleData);
                                window.gaTracker('send', 'pageview', googleData);
                            } else {
                                window.gaTracker('send', 'pageview', {
                                    location: "/",
                                    hitCallback: resolve
                                });
                            }
                        }
                    } else {
                        resolve();
                    }
                });
            }
        }, {
            key: 'hasEvent',
            value: function hasEvent(c) {
                var containts = false;
                this.thirdPartyEvents.forEach(function (event) {
                    if (!containts) {
                        containts = c.indexof(event) > -1;
                    }
                });
                return containts;
            }
        }, {
            key: 'eventHandler',
            value: function eventHandler(data) {
                var _this3 = this;

                return new Promise(function (resolve) {
                    var trackPageEvents = _this3.globals.analytics.google.trackEvent === 'true';

                    if (_context2.default.isClient() && (trackPageEvents || _this3.globals.wlgoogle)) {
                        Google.createTracker(_this3.globals.analytics.utoken);
                        var googleData = Google.makeGoogleEventData(data, resolve);

                        if (_this3.globals.wlgoogle) {
                            if (_this3.hasEvent(googleData.eventCategory)) {
                                window.gaTracker(_this3.globals.wlgoogle.name + '.send', 'event', 'kayak_' + googleData[KAYAK_VERTICAL] + '_offerlist', 'ota_click');
                            }
                        }

                        if (trackPageEvents) {
                            Google.setupTracker(window.gaTracker, googleData);
                            window.gaTracker('send', 'event', googleData);
                        }
                    } else {
                        resolve();
                    }
                });
            }
        }], [{
            key: 'makeCommonData',
            value: function makeCommonData(data, callback) {
                var googleData = {};

                googleData[KAYAK_VERTICAL] = data.vertical;
                googleData[KAYAK_PAGE] = data.pageId;
                googleData[KAYAK_SUB_PAGE] = data.subPageId;
                googleData[KAYAK_LOCALE] = data.locale;
                googleData[KAYAK_AFFILIATE] = data.affiliate;
                googleData[KAYAK_AFFILIATESKIN] = data.affiliateskin;
                googleData[KAYAK_EXPERIMENT] = data.experiment;
                googleData[KAYAK_PRESENTATION] = data.presentation;
                googleData[KAYAK_LOGINSTATE] = data.loginState;
                googleData[KAYAK_SESSIONID] = data.sessionId;

                if (_context2.default.isClient()) {
                    googleData.title = window.document.title;
                    googleData.location = window.document.location.href;
                    googleData.hitCallback = callback;
                }

                return googleData;
            }
        }, {
            key: 'makeGooglePageData',
            value: function makeGooglePageData(data, callback) {
                var googleData = Google.makeCommonData(data, callback);

                googleData[KAYAK_DESTINATIONID] = data.pixelContext.destination && data.pixelContext.destination.cityId;
                googleData[KAYAK_HOTELPROPERTYID] = data.pixelContext.hotelId;
                googleData[KAYAK_ORIGINIATACODE] = data.pixelContext.originCode;
                googleData[KAYAK_DESTINATIONIATACODE] = data.pixelContext.destinationCode;

                return googleData;
            }
        }, {
            key: 'makeGoogleEventData',
            value: function makeGoogleEventData(data, callback) {
                var googleData = Google.makeCommonData(data, callback);

                googleData.eventCategory = data.category;
                googleData.eventAction = data.action || (data.auto ? 'auto' : 'click');

                if (data.auto) {
                    googleData.nonInteraction = 1;
                }
                if (data.label) {
                    googleData.eventLabel = data.label;
                }
                if (data.value) {
                    googleData.eventValue = data.value;
                }

                return googleData;
            }
        }, {
            key: 'setupTracker',
            value: function setupTracker(tracker, googleData) {
                var cg1 = googleData[KAYAK_VERTICAL] || '';
                var cg2 = cg1 + '/' + (googleData[KAYAK_PAGE] || '');
                var cg3 = cg2 + '/' + (googleData[KAYAK_SUB_PAGE] || '');
                tracker('set', 'contentGroup1', cg1);
                tracker('set', 'contentGroup2', cg2);
                tracker('set', 'contentGroup3', cg3);
            }
        }, {
            key: 'createTracker',
            value: function createTracker(utoken) {
                if (trackerCreated) {
                    return;
                }
                var user = 'auto';

                if (utoken) {
                    user = { userId: utoken };
                }
                if (_context2.default.isClient()) {
                    window.gaTracker('create', _propertyNucleusAnalyticsPluginsGoogle2.default.value, user);
                    window.gaTracker('require', 'displayfeatures');
                    window.gaTracker('require', 'ecommerce');
                }
                trackerCreated = true;
            }
        }]);
        return Google;
    }();

    exports.default = Google;
});define("default/common/results/react/SearchPollListener", ['exports', 'common/results/react/actions/SearchPollActions', 'common/results/react/constants/SearchPollConstants', 'common/results/filters/react/FilterStateController', 'common/utils/react/events'], function (exports, _SearchPollActions, _SearchPollConstants, _FilterStateController, _events) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getInstance = getInstance;
    exports.addListener = addListener;
    exports.removeListener = removeListener;
    exports.startListening = startListening;
    exports.stopListening = stopListening;
    var actions = babelHelpers.interopRequireWildcard(_SearchPollActions);
    var constants = babelHelpers.interopRequireWildcard(_SearchPollConstants);
    var FilterStateController = babelHelpers.interopRequireWildcard(_FilterStateController);

    var _events2 = babelHelpers.interopRequireDefault(_events);

    var instance = null;

    var dispatch = function dispatch(payload) {
        return typeof R9 !== 'undefined' && R9.redux.dispatch(payload);
    };

    function getState() {
        if (typeof R9 !== 'undefined' && R9.redux && typeof R9.redux.store === 'function') {
            var store = R9.redux.store();
            if (store && typeof store.getState === 'function') {
                return store.getState();
            }
        }
        return {};
    }

    /*
     * Helper for wiring search poll data into redux stores.
     * On each published search poll, this adds the current poll's data to the store, along with a search poll status set in the reducer.
     */

    var SearchPollListener = function () {
        function SearchPollListener() {
            babelHelpers.classCallCheck(this, SearchPollListener);
            this.listeners = new Set(null);
            this.pollSubscription = null;
            this.searchStartSubscription = null;
            this.searchDoneSubscription = null;
            this.filledInitialSearchStart = false;
        }

        babelHelpers.createClass(SearchPollListener, [{
            key: 'addListener',
            value: function addListener(component) {
                var listenOnInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                var willStartListening = listenOnInit && !this.listeners.size;
                this.listeners.add(component);
                if (willStartListening) {
                    this.startListening();
                }
            }
        }, {
            key: 'removeListener',
            value: function removeListener(component) {
                this.listeners.delete(component);
                if (!this.listeners.size) {
                    this.stopListening();
                    instance = null;
                }
            }
        }, {
            key: 'startListening',
            value: function startListening() {
                var _this = this;

                if (!this.pollSubscription) {
                    this.pollSubscription = _events2.default.subscribe('search.poll.response', function (data) {
                        return _this.handleResponse(data);
                    });
                    this.searchStartSubscription = _events2.default.subscribe('search.startSearch', function (data) {
                        return _this.handleSearchStart(data);
                    });
                    this.searchDoneSubscription = _events2.default.subscribe('resultspage.streaming.done', function () {
                        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                        return _this.handleStreamingDone(data);
                    });
                    this.fillMissingSearchStartSubscription();
                    return true;
                }
                return false;
            }
        }, {
            key: 'stopListening',
            value: function stopListening() {
                if (this.pollSubscription) {
                    _events2.default.unsubscribe('search.poll.response', this.pollSubscription);
                    _events2.default.unsubscribe('search.startSearch', this.searchStartSubscription);
                    _events2.default.unsubscribe('resultspage.streaming.done', this.searchDoneSubscription);
                    return true;
                }
                return false;
            }
        }, {
            key: 'fillMissingSearchStartSubscription',
            value: function fillMissingSearchStartSubscription() {
                var _getState = getState(),
                    SearchPoll = _getState.SearchPoll;

                if (!this.filledInitialSearchStart && SearchPoll && constants.searchPollStatus.NO_SEARCH !== SearchPoll.status && SearchPoll && constants.searchStartRequiredParams.some(function (p) {
                    return SearchPoll[p] === undefined;
                })) {
                    var questionAnswer = R9.question.ask('flights.rp.searchform');
                    this.filledInitialSearchStart = true;
                    if (questionAnswer) {
                        dispatch(actions.updateStartSearchState(questionAnswer));
                    } else {
                        _events2.default.when('flights.searchForm.questionAnswers', function () {
                            dispatch(actions.updateStartSearchState(R9.question.ask('flights.rp.searchform')));
                        });
                    }
                }
            }
        }, {
            key: 'handleResponse',
            value: function handleResponse(data) {
                dispatch(actions.updateSearchPoll(data));
            }
        }, {
            key: 'handleSearchStart',
            value: function handleSearchStart(data) {
                dispatch(actions.startSearchPolling(data));
                if (data.preserveFilters === false) {
                    FilterStateController.resetAllFilters();
                }
            }
        }, {
            key: 'handleStreamingDone',
            value: function handleStreamingDone() {
                dispatch(actions.endSearchPolling());
            }
        }]);
        return SearchPollListener;
    }();

    function getInstance() {
        if (!instance) {
            instance = new SearchPollListener();
        }
        return instance;
    }

    function addListener(component, listenOnInit) {
        return getInstance().addListener(component, listenOnInit);
    }

    function removeListener(component) {
        return getInstance().removeListener(component);
    }

    function startListening() {
        return getInstance().startListening();
    }

    function stopListening() {
        return getInstance().stopListening();
    }
});define("default/common/react/constants/layout", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var sizes = exports.sizes = {
        EXTRA_SMALL: 'EXTRA_SMALL',
        SMALL: 'SMALL',
        MEDIUM_SMALL: 'MEDIUM_SMALL',
        MEDIUM: 'MEDIUM',
        MEDIUM_LARGE: 'MEDIUM_LARGE',
        LARGE: 'LARGE',
        EXTRA_LARGE: 'EXTRA_LARGE'
    };

    exports.default = sizes;
});define("default/flights/results/react/FlexMatrixRecommendationController", ['exports', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_ALL_SIMILAR', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_ALREADY_CHEAPEST', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_BEFORE', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_AFTER', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_BEFORE', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_AFTER', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_RETURN', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_LIMITED', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_RT', 'string!flights/results//FLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_OW', 'property!horizon.flights.results.insightsContainer.enabled', 'property!flights.results.neoFlex.prediction.recommendation.minSavings.absolute.usd', 'property!flights.results.neoFlex.prediction.recommendation.minSavings.daysAway.0', 'property!flights.results.neoFlex.prediction.recommendation.minSavings.daysAway.1', 'property!flights.results.neoFlex.prediction.recommendation.minSavings.daysAway.2', 'property!flights.results.neoFlex.prediction.recommendation.minSavings.daysAway.3', 'property!flights.results.neoFlex.prediction.recommendation.minSavings.minor.daysAway.2', 'property!flights.results.neoFlex.prediction.recommendation.minSavings.minor.daysAway.3', 'flights/results/react/constants/FlexMatrixConstants', 'common/results/react/constants/SearchPollConstants', 'common/utils/react/events', 'common/utils/react/logger', 'flights/results/react/utils/FlexMatrixRecommendationUtils'], function (exports, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_ALL_SIMILAR, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_ALREADY_CHEAPEST, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_BEFORE, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_AFTER, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_BEFORE, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_AFTER, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_RETURN, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_LIMITED, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_RT, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_OW, _propertyHorizonFlightsResultsInsightsContainer, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsAbsolute, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsDaysAway, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsDaysAway2, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsDaysAway3, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsDaysAway4, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsMinorDaysAway, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsMinorDaysAway2, _FlexMatrixConstants, _SearchPollConstants, _events, _logger, _FlexMatrixRecommendationUtils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_ALL_SIMILAR2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_ALL_SIMILAR);

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_ALREADY_CHEAPEST2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_ALREADY_CHEAPEST);

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_BEFORE2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_BEFORE);

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_AFTER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_AFTER);

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_BEFORE2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_BEFORE);

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_AFTER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_AFTER);

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_RETURN2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_RETURN);

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_LIMITED2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_LIMITED);

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_RT2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_RT);

    var _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_OW2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_OW);

    var _events2 = babelHelpers.interopRequireDefault(_events);

    var _logger2 = babelHelpers.interopRequireDefault(_logger);

    var FlexMatrixRecommendationController = function (_React$Component) {
        babelHelpers.inherits(FlexMatrixRecommendationController, _React$Component);

        function FlexMatrixRecommendationController() {
            var _ref, _this$configMap, _this$stringMap;

            var _temp, _this, _ret;

            babelHelpers.classCallCheck(this, FlexMatrixRecommendationController);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_ref = FlexMatrixRecommendationController.__proto__ || Object.getPrototypeOf(FlexMatrixRecommendationController)).call.apply(_ref, [this].concat(args))), _this), _this.configMap = (_this$configMap = {}, babelHelpers.defineProperty(_this$configMap, _FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_ABSOLUTE_USD, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsAbsolute.getNumber), babelHelpers.defineProperty(_this$configMap, _FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_QUERY_DATES, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsDaysAway.getNumber), babelHelpers.defineProperty(_this$configMap, _FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_ONE_DAY_AWAY, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsDaysAway2.getNumber), babelHelpers.defineProperty(_this$configMap, _FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_TWO_DAYS_AWAY, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsDaysAway3.getNumber), babelHelpers.defineProperty(_this$configMap, _FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_THREE_DAYS_AWAY, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsDaysAway4.getNumber), babelHelpers.defineProperty(_this$configMap, _FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_MINOR_TWO_DAYS_AWAY, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsMinorDaysAway.getNumber), babelHelpers.defineProperty(_this$configMap, _FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_MINOR_THREE_DAYS_AWAY, _propertyFlightsResultsNeoFlexPredictionRecommendationMinSavingsMinorDaysAway2.getNumber), _this$configMap), _this.stringMap = (_this$stringMap = {}, babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_ALL_SIMILAR_DATES, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_ALL_SIMILAR2.default), babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_ALREADY_CHEAPEST_DATES, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_ALREADY_CHEAPEST2.default), babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_DEPART_BEFORE, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_BEFORE2.default), babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_DEPART_AFTER, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_AFTER2.default), babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_RETURN_BEFORE, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_BEFORE2.default), babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_RETURN_AFTER, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_RETURN_AFTER2.default), babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_DEPART_RETURN, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_DEPART_RETURN2.default), babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_LIMITED_SAVINGS, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_SAVINGS_LIMITED2.default), babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_FLEX_SEARCH_RECOMMENDED_RT, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_RT2.default), babelHelpers.defineProperty(_this$stringMap, _FlexMatrixConstants.recommendationStringKeys.TAB_FLEX_SEARCH_RECOMMENDED_OW, _stringFLEX_MATRIX_PREDICTION_RECOMMENDATION_PLUS_MINUS_THREE_OW2.default), _this$stringMap), _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
        }

        babelHelpers.createClass(FlexMatrixRecommendationController, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps) {
                return nextProps.displayMode !== this.props.displayMode && nextProps.searchStatus !== this.props.searchStatus;
            }
        }, {
            key: 'publishRecommendation',
            value: function publishRecommendation(displayMode, matrixEntries, standardCellCount) {
                var message = null;
                switch (displayMode) {
                    case _FlexMatrixConstants.displayModes.FLEX_DATE_PREDICTIONS:
                    case _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER:
                        message = (0, _FlexMatrixRecommendationUtils.findExactDateRecommendation)(matrixEntries, this.configMap, this.stringMap);
                        break;
                    case _FlexMatrixConstants.displayModes.PLUS_MINUS_THREE:
                        message = (0, _FlexMatrixRecommendationUtils.findFlexDateInsightsRecommendation)(matrixEntries, this.configMap, this.stringMap);
                        break;
                    default:
                }
                var enabled = !!message || standardCellCount >= 2;
                _events2.default.publish('flights.results.react.flexMatrix.predictedDates.recommendation', { message: message, enabled: enabled });
            }
        }, {
            key: 'publishInsightsTabEnabled',
            value: function publishInsightsTabEnabled(nextDisplayMode) {
                var visible = null;
                if (nextDisplayMode === _FlexMatrixConstants.displayModes.NONE) {
                    visible = false;
                } else if (this.props.displayMode === _FlexMatrixConstants.displayModes.NONE) {
                    visible = true;
                }
                if (visible !== null) {
                    _events2.default.publish('flights.insights.setTabEnabled', { name: 'flex', enabled: visible });
                }
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.searchStatus === _SearchPollConstants.searchPollStatus.SEARCH_FINISHED) {
                    this.publishRecommendation(nextProps.displayMode, nextProps.matrixEntries, nextProps.standardCellCount);
                }
                if (nextProps.displayMode !== this.props.displayMode && (0, _propertyHorizonFlightsResultsInsightsContainer.getBoolean)(false)) {
                    this.publishInsightsTabEnabled(nextProps.displayMode);
                }
            }
        }, {
            key: 'componentDidCatch',
            value: function componentDidCatch(error, errorInfo) {
                new _logger2.default('FlexMatrixRecommendationController').error('Error finding recommended flex date message', error, errorInfo);
            }
        }, {
            key: 'render',
            value: function render() {
                return null;
            }
        }]);
        return FlexMatrixRecommendationController;
    }(React.Component);

    var ConnectedFlexMatrixRecommendationController = ReactRedux.connect(function (_ref2) {
        var SearchPoll = _ref2.SearchPoll,
            FlexMatrix = _ref2.FlexMatrix;
        return {
            displayMode: FlexMatrix.ui.displayMode,
            matrixEntries: FlexMatrix.data.matrixEntries,
            searchStatus: SearchPoll.status,
            standardCellCount: FlexMatrix.ui.standardCellCount
        };
    })(FlexMatrixRecommendationController);

    exports.default = ConnectedFlexMatrixRecommendationController;
});define("default/flights/results/react/FlexMatrixCellTooltips", ['exports', 'prop-types', 'stl!flights.results.FlexMatrixCellTooltips.Cell--Predicted__Tooltip', 'stl!flights.results.FlexMatrixCellTooltips.Cell--Predicted__Tooltip__Icon', 'stl!flights.results.FlexMatrixCellTooltips.Cell--Predicted__Tooltip__Icon__Inner', 'stl!flights.results.FlexMatrixCellTooltips.Text--NoWrap', 'string!flights/results//FLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ONE_WAY', 'string!flights/results//FLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ROUND_TRIP', 'string!flights/results//FLEX_MATRIX_DATE_RANGE', 'flights/results/react/FlexMatrixCellLegsPanel', 'common/icon/react/SvgIcon', 'common/widgets/tip/react/StyleJamTooltip', 'flights/results/react/constants/InsightsBannerConstants', 'common/results/react/constants/SearchPollConstants', 'common/widgets/tip/react/constants/TooltipConstants', 'common/utils/react/logger', 'flights/results/react/utils/FlexMatrixClientBuilder'], function (exports, _propTypes, _stlCellPredicted__Tooltip, _stlCellPredicted__Tooltip__Icon, _stlCellPredicted__Tooltip__Icon__Inner, _stlTextNoWrap, _stringFLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ONE_WAY, _stringFLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ROUND_TRIP, _stringFLEX_MATRIX_DATE_RANGE, _FlexMatrixCellLegsPanel, _SvgIcon, _StyleJamTooltip, _InsightsBannerConstants, _SearchPollConstants, _TooltipConstants, _logger, _FlexMatrixClientBuilder) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _stlCellPredicted__Tooltip2 = babelHelpers.interopRequireDefault(_stlCellPredicted__Tooltip);

    var _stlCellPredicted__Tooltip__Icon2 = babelHelpers.interopRequireDefault(_stlCellPredicted__Tooltip__Icon);

    var _stlCellPredicted__Tooltip__Icon__Inner2 = babelHelpers.interopRequireDefault(_stlCellPredicted__Tooltip__Icon__Inner);

    var _stlTextNoWrap2 = babelHelpers.interopRequireDefault(_stlTextNoWrap);

    var _stringFLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ONE_WAY2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ONE_WAY);

    var _stringFLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ROUND_TRIP2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ROUND_TRIP);

    var _stringFLEX_MATRIX_DATE_RANGE2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_DATE_RANGE);

    var _FlexMatrixCellLegsPanel2 = babelHelpers.interopRequireDefault(_FlexMatrixCellLegsPanel);

    var _SvgIcon2 = babelHelpers.interopRequireDefault(_SvgIcon);

    var _StyleJamTooltip2 = babelHelpers.interopRequireDefault(_StyleJamTooltip);

    var _logger2 = babelHelpers.interopRequireDefault(_logger);

    var FlexMatrixClientBuilder = babelHelpers.interopRequireWildcard(_FlexMatrixClientBuilder);


    /*
     * It's safe to assume that there will only be one FlexMatrix per page, so this is safe to cache outside of the component instance.
     * When/if the flex matrix cells are refactored to never be unmounted/remounted, this can be stored in the component instance.
     */
    var cachedPredictionPanels = {};
    var cachedPredictionTooltipStrings = {};
    var loadedAirlineCodes = new Set();

    /**
     * Any one of the tooltips shown below hovered/focused FlexMatrixCells.
     * There should only be one instance per matrix, placed inside the active cell component.
     */

    var FlexMatrixCellTooltips = function (_React$Component) {
        babelHelpers.inherits(FlexMatrixCellTooltips, _React$Component);

        function FlexMatrixCellTooltips(props) {
            babelHelpers.classCallCheck(this, FlexMatrixCellTooltips);

            var _this = babelHelpers.possibleConstructorReturn(this, (FlexMatrixCellTooltips.__proto__ || Object.getPrototypeOf(FlexMatrixCellTooltips)).call(this, props));

            _this.state = {};
            _this.logger = new _logger2.default('FlexMatrixCellTooltips');
            return _this;
        }

        babelHelpers.createClass(FlexMatrixCellTooltips, [{
            key: 'getTooltipContent',
            value: function getTooltipContent(cellData, cellId) {
                if (!cellData || cellData.disabled) {
                    return null;
                }
                if (cellData.prediction) {
                    return FlexMatrixCellTooltips.getFlexMatrixCellLegsPanel(cellData, cellId);
                }
                var _props = this.props,
                    nonstopOnly = _props.nonstopOnly,
                    searchCompleted = _props.searchCompleted;

                var flightSetKey = nonstopOnly ? 'nonstopFlights' : 'allFlights';
                if (searchCompleted && cellData[flightSetKey] && cellData[flightSetKey].displayFlight && cellData[flightSetKey].displayFlight.legs.length) {
                    return FlexMatrixCellTooltips.getLegsPanel(cellData, cellId);
                }
                return null;
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                var _props2 = this.props,
                    nonstopOnly = _props2.nonstopOnly,
                    searchStatus = _props2.searchStatus;

                var clearSearchStatuses = [_SearchPollConstants.searchPollStatus.SEARCH_STARTED, _SearchPollConstants.searchPollStatus.NO_SEARCH];
                if (clearSearchStatuses.includes(nextProps.searchStatus) && !clearSearchStatuses.includes(searchStatus) || nonstopOnly !== nextProps.nonstopOnly) {
                    FlexMatrixCellTooltips.clearCached();
                }
            }
        }, {
            key: 'preComputeTooltipContent',
            value: function preComputeTooltipContent() {
                var _this2 = this;

                Object.keys(this.props.matrixEntries).forEach(function (entryKey) {
                    _this2.getTooltipContent(_this2.props.matrixEntries[entryKey], entryKey);
                });
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                var _props3 = this.props,
                    predictionAjaxStatus = _props3.predictionAjaxStatus,
                    searchStatus = _props3.searchStatus;

                if (_SearchPollConstants.searchPollStatus.SEARCH_FINISHED === searchStatus && prevProps.searchStatus !== searchStatus || _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_RECEIVED === predictionAjaxStatus && predictionAjaxStatus !== prevProps.predictionAjaxStatus) {
                    this.preComputeTooltipContent();
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var _props4 = this.props,
                    hoveredDepartCell = _props4.hoveredDepartCell,
                    hoveredReturnCell = _props4.hoveredReturnCell,
                    matrixEntries = _props4.matrixEntries;

                var cellData = void 0;
                var cellId = FlexMatrixClientBuilder.makeMatrixEntryKey(hoveredDepartCell, hoveredReturnCell);
                if (cellId) {
                    cellData = matrixEntries[cellId];
                    if (!cellData) {
                        this.logger.error('Matrix entry key mismatch between matrixEntries and hoveredDepartCell/hoveredReturnCell key.\nhovered cell id: ' + cellId);
                    }
                }
                var renderedContent = this.getTooltipContent(cellData, cellId);
                if (!renderedContent) {
                    return null;
                }
                return babelHelpers.jsx(_StyleJamTooltip2.default, {
                    hidden: this.state.hidden ? true : undefined,
                    hidePointer: true,
                    offset: 0,
                    presentation: 'panel-white',
                    position: _TooltipConstants.positions.BELOW
                }, void 0, babelHelpers.jsx('div', {
                    onMouseOver: function onMouseOver() {
                        return _this3.setState({ hidden: true });
                    },
                    onFocus: function onFocus() {
                        return undefined;
                    }
                }, void 0, renderedContent));
            }
        }], [{
            key: 'getNoWrapHtmlString',
            value: function getNoWrapHtmlString(content) {
                return '<span class="' + _stlTextNoWrap2.default + '">' + content + '</span>';
            }
        }, {
            key: 'getPredictionTooltipHtml',
            value: function getPredictionTooltipHtml(departDate, returnDate, cellId) {
                if (cachedPredictionTooltipStrings[cellId]) {
                    return cachedPredictionTooltipStrings[cellId];
                }
                var message = void 0;
                if (returnDate) {
                    var dateRange = _stringFLEX_MATRIX_DATE_RANGE2.default.value(FlexMatrixClientBuilder.filterDateToDayOfWeek(departDate), FlexMatrixClientBuilder.filterDateToDayOfWeek(returnDate));
                    message = _stringFLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ROUND_TRIP2.default.value(FlexMatrixCellTooltips.getNoWrapHtmlString(dateRange));
                } else {
                    message = _stringFLEX_MATRIX_PREDICTION_TOOLTIP_CONTENT_ONE_WAY2.default.value(FlexMatrixCellTooltips.getNoWrapHtmlString(FlexMatrixClientBuilder.filterDateToDayOfWeek(departDate)));
                }
                cachedPredictionTooltipStrings[cellId] = message;
                return message;
            }
        }, {
            key: 'getLegsPanel',
            value: function getLegsPanel(cellData, cellId) {
                var panel = babelHelpers.jsx(_FlexMatrixCellLegsPanel2.default, {
                    cellData: cellData,
                    flightSetData: cellData.allFlights
                });
                if (cachedPredictionPanels[cellId]) {
                    cachedPredictionPanels[cellId] = undefined;
                }
                if (cellData.allFlights.displayFlight) {
                    cellData.allFlights.displayFlight.legs.forEach(function (leg) {
                        if (!loadedAirlineCodes.has(leg.airline.name)) {
                            new window.Image().src = leg.airline.logo;
                            loadedAirlineCodes.add(leg.airline.name);
                        }
                    });
                }
                return panel;
            }
        }, {
            key: 'getFlexMatrixCellLegsPanel',
            value: function getFlexMatrixCellLegsPanel(cellData, cellId) {
                if (cachedPredictionPanels[cellId]) {
                    return cachedPredictionPanels[cellId];
                }
                var panel = babelHelpers.jsx('div', {
                    className: _stlCellPredicted__Tooltip2.default
                }, void 0, babelHelpers.jsx(_SvgIcon2.default, {
                    name: 'magnifying-glass',
                    className: _stlCellPredicted__Tooltip__Icon__Inner2.default,
                    parentClassName: _stlCellPredicted__Tooltip__Icon2.default,
                    width: 20,
                    height: 20
                }), babelHelpers.jsx('div', {
                    dangerouslySetInnerHTML: { __html: FlexMatrixCellTooltips.getPredictionTooltipHtml(cellData.departFilterValue, cellData.returnFilterValue, cellId) }
                }));
                cachedPredictionPanels[cellId] = panel;
                return panel;
            }
        }, {
            key: 'clearCached',
            value: function clearCached() {
                cachedPredictionPanels = {};
                cachedPredictionTooltipStrings = {};
            }
        }]);
        return FlexMatrixCellTooltips;
    }(React.Component);

    FlexMatrixCellTooltips.propTypes = {
        hoveredDepartCell: _propTypes2.default.string,
        hoveredReturnCell: _propTypes2.default.string,
        nonstopOnly: _propTypes2.default.bool.isRequired,
        matrixEntries: _propTypes2.default.objectOf(_propTypes2.default.any).isRequired,
        predictionAjaxStatus: _propTypes2.default.oneOf(Object.values(_InsightsBannerConstants.ajaxRequestStatus)).isRequired,
        searchCompleted: _propTypes2.default.bool.isRequired,
        searchStatus: _propTypes2.default.oneOf(Object.values(_SearchPollConstants.searchPollStatus)).isRequired
    };

    FlexMatrixCellTooltips.defaultProps = {
        hoveredDepartCell: '',
        hoveredReturnCell: ''
    };

    exports.default = ReactRedux.connect(function (_ref) {
        var FlexMatrix = _ref.FlexMatrix,
            SearchPoll = _ref.SearchPoll;
        return {
            hoveredDepartCell: FlexMatrix.ui.hoveredDepartCell,
            hoveredReturnCell: FlexMatrix.ui.hoveredReturnCell,
            matrixEntries: FlexMatrix.data.matrixEntries,
            nonstopOnly: FlexMatrix.ui.nonstopOnly,
            predictionAjaxStatus: FlexMatrix.clientDerivedData.ajaxStatus,
            searchCompleted: SearchPoll.completed,
            searchStatus: SearchPoll.status
        };
    })(FlexMatrixCellTooltips);
});define('default/common/icon/_svg_/control-tower', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" fill=\"currentColor\"><path d=\"M150 50H50c17.47-39.984 82.529-39.987 100 0zm30 10l-10.698 56h-10.635c-17.673 0-32 14.327-32 32v32H73.333v-32c0-17.673-14.327-32-32-32H30.698L20 60h160zM75 75H35l5 30h35V75zm42.5 0h-35v30h35V75zm47.5 0h-40v30h35l5-30z\"/></svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/common/icon/_svg_/control-tower"}, params || {}, {svg: svgStr})); };
});define('default/common/icon/_svg_/filters', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 41 43\"><path fill=\"currentColor\" d=\"M12.5 11.5A6 6 0 0 0 8 5.7V0H5v5.7a6 6 0 0 0 0 11.6V43h3V17.3a6 6 0 0 0 4.5-5.8zM8 14.08a3.16 3.16 0 0 1-.56.25l-.22.07-.22.05a3 3 0 0 1-.51.05 3 3 0 0 1-.49-.05h-.21l-.22-.07a3.16 3.16 0 0 1-.57-.3 3 3 0 0 1 0-5.16 3.16 3.16 0 0 1 .56-.25l.22-.07.22-.05a3 3 0 0 1 .5-.05 3 3 0 0 1 .5.05h.21l.23.12a3.16 3.16 0 0 1 .56.25 3 3 0 0 1 0 5.16zM26.5 19a6 6 0 0 0-4.5-5.8V0h-3v13.2a6 6 0 0 0 0 11.6V43h3V24.8a6 6 0 0 0 4.5-5.8zM22 21.58a3.16 3.16 0 0 1-.56.25l-.22.07h-.21a2.54 2.54 0 0 1-1 0h-.21l-.22-.07a3.16 3.16 0 0 1-.58-.25 3 3 0 0 1 0-5.17 3.16 3.16 0 0 1 .56-.25l.22-.07h.21a2.54 2.54 0 0 1 1 0h.21l.22.07a3.16 3.16 0 0 1 .56.25 3 3 0 0 1 .02 5.17zM40.5 30a6 6 0 0 0-4.5-5.8V0h-3v24.2a6 6 0 0 0 0 11.6V43h3v-7.2a6 6 0 0 0 4.5-5.8zM36 32.58a3.16 3.16 0 0 1-.56.25l-.22.07h-.21a2.54 2.54 0 0 1-1 0h-.21l-.22-.07a3.16 3.16 0 0 1-.58-.25 3 3 0 0 1 0-5.17 3.16 3.16 0 0 1 .56-.25l.22-.07h.21a2.54 2.54 0 0 1 1 0h.21l.22.07a3.16 3.16 0 0 1 .56.25 3 3 0 0 1 .02 5.17z\"/></svg> ";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/common/icon/_svg_/filters"}, params || {}, {svg: svgStr})); };
});define('default/common/icon/_svg_/checkmark', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg viewBox=\"0 0 26 26\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"currentColor\" d=\"M24.81 6.498l-1.563-1.356a.593.593 0 0 0-.813.04l-11.888 12.64-6.173-5.353a.593.593 0 0 0-.813.04l-1.412 1.5a.54.54 0 0 0 .042.78l8.15 7.069a.57.57 0 0 0 .28.128.591.591 0 0 0 .556-.168l13.676-14.54a.54.54 0 0 0-.042-.78\"/></svg> ";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/common/icon/_svg_/checkmark"}, params || {}, {svg: svgStr})); };
});define('momondo/common/icon/_svg_/magnifying-glass', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 25 25\"><path style=\"fill:currentcolor\" d=\"M24.41,23.35L17,15.95a9.57,9.57,0,1,0-1.43,1.3L23,24.71a1,1,0,0,0,1.37-1.36h0ZM2.3,9.62a7.61,7.61,0,1,1,7.61,7.61h0A7.61,7.61,0,0,1,2.3,9.62Z\"/></svg> ";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "momondo/common/icon/_svg_/magnifying-glass"}, params || {}, {svg: svgStr})); };
});define("default/flights/results/react/FlexMatrixGrid", ['exports', 'property!horizon.flights.results.priceforecast.fetchMonthAverage', 'property!horizon.flights.results.flexMatrix.showTooltip', 'stl!flights.results.FlexMatrixGrid.Grid', 'stl!flights.results.FlexMatrixGrid.Grid__Row', 'flights/results/react/FlexMatrixCell', 'flights/results/react/FlexMatrixGridRow', 'flights/results/react/actions/SearchPredictionsAjaxActions', 'flights/results/react/constants/InsightsBannerConstants', 'flights/results/react/FlexMatrixCellTooltips', 'flights/results/react/actions/FlexMatrixActions', 'flights/results/react/utils/FlexMatrixClientBuilder'], function (exports, _propertyHorizonFlightsResultsPriceforecast, _propertyHorizonFlightsResultsFlexMatrix, _stlGrid, _stlGrid__Row, _FlexMatrixCell, _FlexMatrixGridRow, _SearchPredictionsAjaxActions, _InsightsBannerConstants, _FlexMatrixCellTooltips, _FlexMatrixActions, _FlexMatrixClientBuilder) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexMatrixGrid = undefined;

    var _stlGrid2 = babelHelpers.interopRequireDefault(_stlGrid);

    var _stlGrid__Row2 = babelHelpers.interopRequireDefault(_stlGrid__Row);

    var _FlexMatrixCell2 = babelHelpers.interopRequireDefault(_FlexMatrixCell);

    var _FlexMatrixGridRow2 = babelHelpers.interopRequireDefault(_FlexMatrixGridRow);

    var SearchPredictionsAjaxActions = babelHelpers.interopRequireWildcard(_SearchPredictionsAjaxActions);

    var _FlexMatrixCellTooltips2 = babelHelpers.interopRequireDefault(_FlexMatrixCellTooltips);

    var flexMatrixActions = babelHelpers.interopRequireWildcard(_FlexMatrixActions);
    var FlexMatrixClientBuilder = babelHelpers.interopRequireWildcard(_FlexMatrixClientBuilder);


    var initialState = {
        departUpdatedUiStates: [],
        returnUpdatedUiStates: [],
        updateGrid: false
    };

    var FlexMatrixGrid = exports.FlexMatrixGrid = function (_React$Component) {
        babelHelpers.inherits(FlexMatrixGrid, _React$Component);

        function FlexMatrixGrid(props) {
            babelHelpers.classCallCheck(this, FlexMatrixGrid);

            var _this = babelHelpers.possibleConstructorReturn(this, (FlexMatrixGrid.__proto__ || Object.getPrototypeOf(FlexMatrixGrid)).call(this, props));

            _this.element = null;
            _this.isHoveredInterval = null;
            _this.isHoveredIntervalTimeMs = 100;
            _this.isHoveredMouseMoveListener = null;
            _this.tooltipsComponent = null;

            _this.state = babelHelpers.extends({}, initialState);
            return _this;
        }

        babelHelpers.createClass(FlexMatrixGrid, [{
            key: 'makeUiStateKey',
            value: function makeUiStateKey(uiState) {
                return Object.keys(uiState).sort().reduce(function (accumulator, key) {
                    return accumulator + '_' + uiState[key];
                }, '');
            }
        }, {
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps) {
                var _props = this.props,
                    ajaxStatus = _props.ajaxStatus,
                    SearchPoll = _props.SearchPoll,
                    uiState = _props.uiState;

                return nextProps.SearchPoll.resultsChanged === true || SearchPoll.status !== nextProps.SearchPoll.status || ajaxStatus === _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_RECEIVED && nextProps.ajaxStatus !== ajaxStatus || this.makeUiStateKey(uiState) !== this.makeUiStateKey(nextProps.uiState);
            }
        }, {
            key: 'startPrediction',
            value: function startPrediction() {
                if ((0, _propertyHorizonFlightsResultsPriceforecast.getBoolean)(false)) {
                    this.props.dispatchListenerPrediction();
                } else {
                    this.props.dispatchPredictionRequest();
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (this.props.ajaxStatus === _InsightsBannerConstants.ajaxRequestStatus.START_REQUEST) {
                    this.startPrediction();
                }
                if ((0, _propertyHorizonFlightsResultsFlexMatrix.getBoolean)(true)) {
                    this.tooltipsComponent = babelHelpers.jsx(_FlexMatrixCellTooltips2.default, {});
                }
            }

            // Calculate which cells should re-render here (rather than cell-by-cell 49 times)

        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                var _props2 = this.props,
                    ajaxStatus = _props2.ajaxStatus,
                    uiState = _props2.uiState;

                var updates = babelHelpers.extends({}, initialState);
                if (uiState.hoveredDepartCell !== nextProps.uiState.hoveredDepartCell) {
                    updates.departUpdatedUiStates = [uiState.hoveredDepartCell, nextProps.uiState.hoveredDepartCell];
                }
                if (uiState.hoveredReturnCell !== nextProps.uiState.hoveredReturnCell) {
                    updates.returnUpdatedUiStates = [uiState.hoveredReturnCell, nextProps.uiState.hoveredReturnCell];
                }
                var defaultDatesSelectedChanged = uiState.defaultDatesSelected !== nextProps.uiState.defaultDatesSelected;
                var nonstopOnlyChanged = uiState.nonstopOnly !== nextProps.uiState.nonstopOnly;
                var receivedAjaxResponse = nextProps.ajaxStatus === _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_RECEIVED || ajaxStatus !== _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_RECEIVED;
                updates.updateGrid = defaultDatesSelectedChanged || nonstopOnlyChanged || receivedAjaxResponse;
                if (ajaxStatus !== _InsightsBannerConstants.ajaxRequestStatus.START_REQUEST && nextProps.ajaxStatus === _InsightsBannerConstants.ajaxRequestStatus.START_REQUEST) {
                    this.startPrediction();
                }
                this.setState(updates);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                if (this.isHoveredInterval) {
                    window.clearInterval(this.isHoveredInterval);
                }
                this.isHoveredMouseMoveListener = null;
            }
        }, {
            key: 'handleMouseOver',
            value: function handleMouseOver() {
                var _this2 = this;

                if (this.isHoveredInterval) {
                    window.clearInterval(this.isHoveredInterval);
                }
                this.isHoveredMouseMoveListener = function (event) {
                    if (!_this2.element) {
                        return;
                    }

                    var _element$getBoundingC = _this2.element.getBoundingClientRect(),
                        top = _element$getBoundingC.top,
                        right = _element$getBoundingC.right,
                        bottom = _element$getBoundingC.bottom,
                        left = _element$getBoundingC.left;

                    window.requestAnimationFrame(function () {
                        if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
                            window.clearInterval(_this2.isHoveredInterval);
                            _this2.props.updateHoverState(false);
                        }
                    });
                    _this2.isHoveredMouseMoveListener = null;
                };
                this.isHoveredInterval = window.setInterval(function () {
                    if (!_this2.element) {
                        return;
                    }
                    if (!_this2.props.hoveredDepartCell) {
                        window.clearInterval(_this2.isHoveredInterval);
                    }
                    document.addEventListener('mousemove', _this2.isHoveredMouseMoveListener, { once: true });
                }, this.isHoveredIntervalTimeMs);
            }
        }, {
            key: 'handleMouseLeave',
            value: function handleMouseLeave() {
                window.clearInterval(this.isHoveredInterval);
                this.isHoveredMouseMoveListener = null;
                this.props.updateHoverState(false);
            }
        }, {
            key: 'renderCell',
            value: function renderCell(cellId, hoveredCellId, selectedCells, index, hasUiUpdate) {
                var _props3 = this.props,
                    matrixEntries = _props3.matrixEntries,
                    onCellClick = _props3.onCellClick;

                return babelHelpers.jsx(_FlexMatrixCell2.default, {
                    cellId: cellId,
                    cellData: matrixEntries[cellId],
                    selectedCells: selectedCells,
                    column: index,
                    hasUiUpdate: hasUiUpdate,
                    onCellClick: onCellClick,
                    tooltip: hoveredCellId === cellId ? this.tooltipsComponent : null
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var _props4 = this.props,
                    columnLabels = _props4.columnLabels,
                    rowLabels = _props4.rowLabels,
                    matrixEntries = _props4.matrixEntries,
                    hoveredDepartCell = _props4.hoveredDepartCell,
                    hoveredReturnCell = _props4.hoveredReturnCell;

                if (!matrixEntries || !Object.keys(matrixEntries).length) {
                    return null;
                }
                var gridHasUiUpdate = this.state.updateGrid;
                var sortedMatrixKeys = Object.keys(matrixEntries).sort();
                var selectedCells = Object.values(matrixEntries).filter(function (e) {
                    return e.selected;
                });
                var hoveredCellId = FlexMatrixClientBuilder.makeMatrixEntryKey(hoveredDepartCell, hoveredReturnCell);

                return React.createElement(
                    'div',
                    {
                        className: _stlGrid2.default,
                        ref: function ref(_ref) {
                            _this3.element = _ref;
                        },
                        role: 'rowgroup',
                        onMouseOver: function onMouseOver() {
                            return _this3.handleMouseOver();
                        },
                        onMouseLeave: function onMouseLeave() {
                            return _this3.handleMouseLeave();
                        },
                        onFocus: function onFocus() {
                            return undefined;
                        }
                    },
                    rowLabels.map(function (label, i) {
                        var rowCellKeys = sortedMatrixKeys.slice(i * columnLabels.length, (i + 1) * columnLabels.length);
                        var rowHasUiUpdate = gridHasUiUpdate || _this3.state.returnUpdatedUiStates.includes(label.filterValue);
                        return babelHelpers.jsx(_FlexMatrixGridRow2.default, {
                            className: _stlGrid__Row2.default,
                            role: 'row'
                        }, void 0, rowCellKeys.map(function (cellId, index) {
                            var columnHasUiUpdate = rowHasUiUpdate || _this3.state.departUpdatedUiStates.includes(matrixEntries[cellId].departFilterValue);
                            return _this3.renderCell(cellId, hoveredCellId, selectedCells, index, columnHasUiUpdate || rowHasUiUpdate);
                        }));
                    })
                );
            }
        }]);
        return FlexMatrixGrid;
    }(React.Component);

    exports.default = ReactRedux.connect(function (_ref2) {
        var SearchPoll = _ref2.SearchPoll,
            FlexMatrix = _ref2.FlexMatrix;
        return {
            SearchPoll: SearchPoll,
            ajaxStatus: FlexMatrix.clientDerivedData.ajaxStatus,
            rowLabels: FlexMatrix.data.returnLabels,
            columnLabels: FlexMatrix.data.departLabels,
            matrixEntries: FlexMatrix.data.matrixEntries,
            hoveredDepartCell: FlexMatrix.ui.hoveredDepartCell,
            hoveredReturnCell: FlexMatrix.ui.hoveredReturnCell,
            uiState: FlexMatrix.ui
        };
    }, function (dispatch) {
        return {
            dispatchListenerPrediction: function dispatchListenerPrediction() {
                return dispatch(SearchPredictionsAjaxActions.listenFlexDatePredictions());
            },
            dispatchPredictionRequest: function dispatchPredictionRequest() {
                return dispatch(SearchPredictionsAjaxActions.fetchFlexDatePredictions());
            },
            updateHoverState: function updateHoverState() {
                return dispatch(flexMatrixActions.updateCellHoverState(null, null));
            }
        };
    })(FlexMatrixGrid);
});define("default/flights/results/react/constants/FlexMatrixConstants", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _flexDateNumericalRan;

    var displayModes = exports.displayModes = {
        NONE: 'NONE',
        PLUS_MINUS_THREE: 'PLUS_MINUS_THREE',
        FLEX_FOR_ALL_BANNER: 'FLEX_FOR_ALL_BANNER',
        FLEX_DATE_PREDICTIONS: 'FLEX_DATE_PREDICTIONS'
    };

    var presentationKeys = exports.presentationKeys = {
        DEFAULT: 'DEFAULT',
        V2: 'V2'
    };

    var priceCategories = exports.priceCategories = {
        BEST_PRICE: 'BEST_PRICE',
        GOOD_PRICE: 'GOOD_PRICE',
        DEFAULT: 'DEFAULT',
        BAD_PRICE: 'BAD_PRICE',
        WORST_PRICE: 'WORST_PRICE'
    };

    var flexFilterDateFormat = exports.flexFilterDateFormat = 'YYYYMMDD';

    // Flex date keys mapped to their numerical start and end ranges.
    // Uses the search form's depart_date_flex and return_date_flex values as keys.
    var flexDateNumericalRanges = exports.flexDateNumericalRanges = (_flexDateNumericalRan = {
        exact: [0, 0],
        minusone: [-1, 0],
        plusone: [0, 1],
        plusminusone: [-1, 1],
        plusminustwo: [-2, 2],
        plusminusthree: [-3, 3]
    }, babelHelpers.defineProperty(_flexDateNumericalRan, undefined, [-3, 3]), babelHelpers.defineProperty(_flexDateNumericalRan, null, [-3, 3]), _flexDateNumericalRan);

    var recommendationConfigKeys = exports.recommendationConfigKeys = {
        MIN_SAVINGS_ABSOLUTE_USD: 'MIN_SAVINGS_ABSOLUTE_USD',
        MIN_SAVINGS_QUERY_DATES: 'MIN_SAVINGS_QUERY_DATES',
        MIN_SAVINGS_ONE_DAY_AWAY: 'MIN_SAVINGS_ONE_DAY_AWAY',
        MIN_SAVINGS_TWO_DAYS_AWAY: 'MIN_SAVINGS_TWO_DAYS_AWAY',
        MIN_SAVINGS_THREE_DAYS_AWAY: 'MIN_SAVINGS_THREE_DAYS_AWAY',
        MIN_SAVINGS_MINOR_TWO_DAYS_AWAY: 'MIN_SAVINGS_MINOR_TWO_DAYS_AWAY',
        MIN_SAVINGS_MINOR_THREE_DAYS_AWAY: 'MIN_SAVINGS_MINOR_THREE_DAYS_AWAY'
    };

    var recommendationStringKeys = exports.recommendationStringKeys = {
        TAB_ALL_SIMILAR_DATES: 'TAB_ALL_SIMILAR_DATES',
        TAB_ALREADY_CHEAPEST_DATES: 'TAB_ALREADY_CHEAPEST_DATES',
        TAB_CHEAPER_DEPART_BEFORE: 'TAB_CHEAPER_DEPART_BEFORE',
        TAB_CHEAPER_DEPART_AFTER: 'TAB_CHEAPER_DEPART_AFTER',
        TAB_CHEAPER_RETURN_BEFORE: 'TAB_CHEAPER_RETURN_BEFORE',
        TAB_CHEAPER_RETURN_AFTER: 'TAB_CHEAPER_RETURN_AFTER',
        TAB_CHEAPER_DEPART_RETURN: 'TAB_CHEAPER_DEPART_RETURN',
        TAB_CHEAPER_LIMITED_SAVINGS: 'TAB_CHEAPER_LIMITED_SAVINGS',
        TAB_FLEX_SEARCH_RECOMMENDED_RT: 'TAB_FLEX_SEARCH_RECOMMENDED_RT',
        TAB_FLEX_SEARCH_RECOMMENDED_OW: 'TAB_FLEX_SEARCH_RECOMMENDED_OW'
    };
});define("default/flights/results/react/FlexMatrixCell", ['exports', 'prop-types', 'stl!flights.results.FlexMatrixCell.Cell', 'stl!flights.results.FlexMatrixCell.Cell--has-results', 'stl!flights.results.FlexMatrixCell.Cell__Border', 'stl!flights.results.FlexMatrixCell.Cell__Border--active', 'stl!flights.results.FlexMatrixCell.Cell__Border--inactive', 'stl!flights.results.FlexMatrixCell.Cell__Border--active--v2', 'stl!flights.results.FlexMatrixCell.Cell__Border--inactive--v2', 'stl!flights.results.FlexMatrixCell.Cell__Border--best--v2', 'stl!flights.results.FlexMatrixCell.Cell__Border--hovered', 'stl!flights.results.FlexMatrixCell.Cell__Border--selected', 'stl!flights.results.FlexMatrixCell.Cell__Bg', 'stl!flights.results.FlexMatrixCell.Cell__Bg__category', 'stl!flights.results.FlexMatrixCell.Cell__Bg__category--default', 'stl!flights.results.FlexMatrixCell.Cell__Bg__category--good', 'stl!flights.results.FlexMatrixCell.Cell__Bg__category--best', 'stl!flights.results.FlexMatrixCell.Cell__Bg__category--best--v2', 'stl!flights.results.FlexMatrixCell.Cell__Bg__category--active', 'stl!flights.results.FlexMatrixCell.Cell__Bg__category--inactive', 'stl!flights.results.FlexMatrixCell.Cell__Bg__interaction--adjacent-hovered', 'stl!flights.results.FlexMatrixCell.Cell__Bg__interaction--adjacent-selected', 'stl!flights.results.FlexMatrixCell.Cell__Inner', 'stl!flights.results.FlexMatrixCell.Cell__Inner--default', 'stl!flights.results.FlexMatrixCell.Cell__Inner--default--bold', 'stl!flights.results.FlexMatrixCell.Cell__Inner--good', 'stl!flights.results.FlexMatrixCell.Cell__Inner--good--bold', 'stl!flights.results.FlexMatrixCell.Cell__Inner--best', 'stl!flights.results.FlexMatrixCell.Cell__Inner--best--bold', 'stl!flights.results.FlexMatrixCell.Cell__Inner--best--v2', 'stl!flights.results.FlexMatrixCell.Cell__Inner--best--bold--v2', 'stl!flights.results.FlexMatrixCell.Cell__Inner--bad', 'stl!flights.results.FlexMatrixCell.Cell__Inner--bad--bold', 'stl!flights.results.FlexMatrixCell.Cell__Inner--prediction', 'stl!flights.results.FlexMatrixCell.Cell__Inner--active', 'stl!flights.results.FlexMatrixCell.Cell__Inner--inactive', 'stl!flights.results.FlexMatrixCell.Cell__Inner__Loading-shimmer', 'stl!flights.results.FlexMatrixCell.Cell__Inner--medium', 'stl!flights.results.FlexMatrixCell.Cell__Inner--small', 'string!flights/results//FLEX_MATRIX_CELL_ARIA_LABEL', 'string!flights/results//FLEX_MATRIX_CELL_ARIA_LABEL_ONE_WAY', 'string!flights/results//FLEX_MATRIX_CELL_EMPTY_LABEL', 'property!horizon.flights.results.flexMatrix.presentation', 'property!horizon.flights.results.flexMatrix.useSelectedHighlighting', 'common/results/filters/react/FilterStateController', 'flights/results/react/FlexMatrixGridBlock', 'flights/results/react/actions/FlexMatrixActions', 'common/analytics/react/Analytics', 'common/utils/react/presentate', 'flights/results/react/constants/FlexMatrixConstants', 'common/results/filters/react/constants/FilterConstants', 'flights/results/react/constants/InsightsBannerConstants'], function (exports, _propTypes, _stlCell, _stlCellHasResults, _stlCell__Border, _stlCell__BorderActive, _stlCell__BorderInactive, _stlCell__BorderActiveV, _stlCell__BorderInactiveV, _stlCell__BorderBestV, _stlCell__BorderHovered, _stlCell__BorderSelected, _stlCell__Bg, _stlCell__Bg__category, _stlCell__Bg__categoryDefault, _stlCell__Bg__categoryGood, _stlCell__Bg__categoryBest, _stlCell__Bg__categoryBestV, _stlCell__Bg__categoryActive, _stlCell__Bg__categoryInactive, _stlCell__Bg__interactionAdjacentHovered, _stlCell__Bg__interactionAdjacentSelected, _stlCell__Inner, _stlCell__InnerDefault, _stlCell__InnerDefaultBold, _stlCell__InnerGood, _stlCell__InnerGoodBold, _stlCell__InnerBest, _stlCell__InnerBestBold, _stlCell__InnerBestV, _stlCell__InnerBestBoldV, _stlCell__InnerBad, _stlCell__InnerBadBold, _stlCell__InnerPrediction, _stlCell__InnerActive, _stlCell__InnerInactive, _stlCell__Inner__LoadingShimmer, _stlCell__InnerMedium, _stlCell__InnerSmall, _stringFLEX_MATRIX_CELL_ARIA_LABEL, _stringFLEX_MATRIX_CELL_ARIA_LABEL_ONE_WAY, _stringFLEX_MATRIX_CELL_EMPTY_LABEL, _propertyHorizonFlightsResultsFlexMatrix, _propertyHorizonFlightsResultsFlexMatrix2, _FilterStateController, _FlexMatrixGridBlock, _FlexMatrixActions, _Analytics, _presentate, _FlexMatrixConstants, _FilterConstants, _InsightsBannerConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexMatrixCell = exports.presentations = exports.PureFlexMatrixCell = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _stlCell2 = babelHelpers.interopRequireDefault(_stlCell);

    var _stlCellHasResults2 = babelHelpers.interopRequireDefault(_stlCellHasResults);

    var _stlCell__Border2 = babelHelpers.interopRequireDefault(_stlCell__Border);

    var _stlCell__BorderActive2 = babelHelpers.interopRequireDefault(_stlCell__BorderActive);

    var _stlCell__BorderInactive2 = babelHelpers.interopRequireDefault(_stlCell__BorderInactive);

    var _stlCell__BorderActiveV2 = babelHelpers.interopRequireDefault(_stlCell__BorderActiveV);

    var _stlCell__BorderInactiveV2 = babelHelpers.interopRequireDefault(_stlCell__BorderInactiveV);

    var _stlCell__BorderBestV2 = babelHelpers.interopRequireDefault(_stlCell__BorderBestV);

    var _stlCell__BorderHovered2 = babelHelpers.interopRequireDefault(_stlCell__BorderHovered);

    var _stlCell__BorderSelected2 = babelHelpers.interopRequireDefault(_stlCell__BorderSelected);

    var _stlCell__Bg2 = babelHelpers.interopRequireDefault(_stlCell__Bg);

    var _stlCell__Bg__category2 = babelHelpers.interopRequireDefault(_stlCell__Bg__category);

    var _stlCell__Bg__categoryDefault2 = babelHelpers.interopRequireDefault(_stlCell__Bg__categoryDefault);

    var _stlCell__Bg__categoryGood2 = babelHelpers.interopRequireDefault(_stlCell__Bg__categoryGood);

    var _stlCell__Bg__categoryBest2 = babelHelpers.interopRequireDefault(_stlCell__Bg__categoryBest);

    var _stlCell__Bg__categoryBestV2 = babelHelpers.interopRequireDefault(_stlCell__Bg__categoryBestV);

    var _stlCell__Bg__categoryActive2 = babelHelpers.interopRequireDefault(_stlCell__Bg__categoryActive);

    var _stlCell__Bg__categoryInactive2 = babelHelpers.interopRequireDefault(_stlCell__Bg__categoryInactive);

    var _stlCell__Bg__interactionAdjacentHovered2 = babelHelpers.interopRequireDefault(_stlCell__Bg__interactionAdjacentHovered);

    var _stlCell__Bg__interactionAdjacentSelected2 = babelHelpers.interopRequireDefault(_stlCell__Bg__interactionAdjacentSelected);

    var _stlCell__Inner2 = babelHelpers.interopRequireDefault(_stlCell__Inner);

    var _stlCell__InnerDefault2 = babelHelpers.interopRequireDefault(_stlCell__InnerDefault);

    var _stlCell__InnerDefaultBold2 = babelHelpers.interopRequireDefault(_stlCell__InnerDefaultBold);

    var _stlCell__InnerGood2 = babelHelpers.interopRequireDefault(_stlCell__InnerGood);

    var _stlCell__InnerGoodBold2 = babelHelpers.interopRequireDefault(_stlCell__InnerGoodBold);

    var _stlCell__InnerBest2 = babelHelpers.interopRequireDefault(_stlCell__InnerBest);

    var _stlCell__InnerBestBold2 = babelHelpers.interopRequireDefault(_stlCell__InnerBestBold);

    var _stlCell__InnerBestV2 = babelHelpers.interopRequireDefault(_stlCell__InnerBestV);

    var _stlCell__InnerBestBoldV2 = babelHelpers.interopRequireDefault(_stlCell__InnerBestBoldV);

    var _stlCell__InnerBad2 = babelHelpers.interopRequireDefault(_stlCell__InnerBad);

    var _stlCell__InnerBadBold2 = babelHelpers.interopRequireDefault(_stlCell__InnerBadBold);

    var _stlCell__InnerPrediction2 = babelHelpers.interopRequireDefault(_stlCell__InnerPrediction);

    var _stlCell__InnerActive2 = babelHelpers.interopRequireDefault(_stlCell__InnerActive);

    var _stlCell__InnerInactive2 = babelHelpers.interopRequireDefault(_stlCell__InnerInactive);

    var _stlCell__Inner__LoadingShimmer2 = babelHelpers.interopRequireDefault(_stlCell__Inner__LoadingShimmer);

    var _stlCell__InnerMedium2 = babelHelpers.interopRequireDefault(_stlCell__InnerMedium);

    var _stlCell__InnerSmall2 = babelHelpers.interopRequireDefault(_stlCell__InnerSmall);

    var _stringFLEX_MATRIX_CELL_ARIA_LABEL2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_CELL_ARIA_LABEL);

    var _stringFLEX_MATRIX_CELL_ARIA_LABEL_ONE_WAY2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_CELL_ARIA_LABEL_ONE_WAY);

    var _stringFLEX_MATRIX_CELL_EMPTY_LABEL2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_CELL_EMPTY_LABEL);

    var _propertyHorizonFlightsResultsFlexMatrix3 = babelHelpers.interopRequireDefault(_propertyHorizonFlightsResultsFlexMatrix2);

    var FilterStateController = babelHelpers.interopRequireWildcard(_FilterStateController);
    var flexMatrixActions = babelHelpers.interopRequireWildcard(_FlexMatrixActions);

    var _Analytics2 = babelHelpers.interopRequireDefault(_Analytics);

    var _presentate2 = babelHelpers.interopRequireDefault(_presentate);

    var _presentations, _dec, _class;

    var initialState = {
        ariaLabel: '',
        loadedTimerSet: false
    };

    var PureFlexMatrixCell = exports.PureFlexMatrixCell = function (_React$Component) {
        babelHelpers.inherits(PureFlexMatrixCell, _React$Component);

        function PureFlexMatrixCell(props) {
            babelHelpers.classCallCheck(this, PureFlexMatrixCell);

            var _this = babelHelpers.possibleConstructorReturn(this, (PureFlexMatrixCell.__proto__ || Object.getPrototypeOf(PureFlexMatrixCell)).call(this, props));

            _this.analytics = null;
            _this.cancelClickFocusEvents = false;
            _this.loadingAnimationDelay = 0;
            _this.pendingLoadTransition = undefined;
            _this.forceComponentUpdate = false;

            _this.state = initialState;
            _this.analytics = new _Analytics2.default();
            _this.loadingAnimationDelay = Math.random() * 1250;
            return _this;
        }

        babelHelpers.createClass(PureFlexMatrixCell, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps) {
                var force = this.forceComponentUpdate;
                this.forceComponentUpdate = false;
                return force || nextProps.resultsChanged || nextProps.hasUiUpdate || !!this.props.tooltip !== !!nextProps.tooltip || this.props.selected !== nextProps.selected;
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.cellData.disabled) {
                    return;
                }
                var newState = {};
                if (this.state.ariaLabel && (nextProps.isLoading || this.props.cellId !== nextProps.cellId || this.props.cellData !== nextProps.cellData)) {
                    newState.ariaLabel = initialState.ariaLabel;
                }
                if (this.props.isLoading && !nextProps.isLoading) {
                    newState.loadedTimerSet = true;
                } else if (nextProps.isLoading) {
                    this.clearPendingLoadTransition();
                    newState.loadedTimerSet = false;
                }
                if (Object.keys(newState).length) {
                    this.setState(newState);
                }
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                var _this2 = this;

                if (this.state.loadedTimerSet && !this.pendingLoadTransition) {
                    this.pendingLoadTransition = setTimeout(function () {
                        _this2.pendingLoadTransition = undefined;
                        _this2.state.loadedTimerSet = false;
                        _this2.forceComponentUpdate = true;
                        _this2.forceUpdate();
                    }, this.loadingAnimationDelay);
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.clearPendingLoadTransition();
            }
        }, {
            key: 'clearPendingLoadTransition',
            value: function clearPendingLoadTransition() {
                if (this.pendingLoadTransition) {
                    window.clearTimeout(this.pendingLoadTransition);
                    this.pendingLoadTransition = undefined;
                }
            }
        }, {
            key: 'updateHoverState',
            value: function updateHoverState(isHovered) {
                var _props = this.props,
                    cellData = _props.cellData,
                    hoveredDepartCell = _props.hoveredDepartCell,
                    hoveredReturnCell = _props.hoveredReturnCell,
                    isLoading = _props.isLoading,
                    updateHoverState = _props.updateHoverState;

                if (this.state.loadedTimerSet && !isLoading && isHovered) {
                    this.clearPendingLoadTransition();
                    this.setState({ loadedTimerSet: false });
                }
                var newDepartState = isHovered ? cellData.departFilterValue : '';
                var newReturnState = isHovered ? cellData.returnFilterValue : '';
                if (newDepartState !== hoveredDepartCell || newReturnState !== hoveredReturnCell) {
                    updateHoverState(newDepartState, newReturnState);
                }
            }
        }, {
            key: 'updateFocusState',
            value: function updateFocusState(isFocused) {
                if (this.cancelClickFocusEvents) {
                    this.cancelClickFocusEvents = false; // Reset back to original state
                    return;
                }
                if (isFocused && !this.state.ariaLabel) {
                    this.setState(babelHelpers.extends({}, this.state, {
                        ariaLabel: this.generateAriaLabel()
                    }));
                }
                this.updateHoverState(isFocused);
            }
        }, {
            key: 'onCellClick',
            value: function onCellClick() {
                var _props2 = this.props,
                    cellData = _props2.cellData,
                    standardCellCount = _props2.standardCellCount;

                this.cancelClickFocusEvents = true;
                if (cellData.prediction) {
                    this.trackSelect('flex-matrix/prediction-cell');
                } else if (window.isNaN(standardCellCount) || standardCellCount > 1) {
                    this.updateFilterState();
                }
            }
        }, {
            key: 'trackSelect',
            value: function trackSelect(category) {
                var _props3 = this.props,
                    cellData = _props3.cellData,
                    flightSetData = _props3.flightSetData;

                var params = void 0;
                if (flightSetData) {
                    params = {
                        price: flightSetData.displayPrice,
                        price_category: flightSetData.priceCategory,
                        similar_flight_count: flightSetData.similarFlights
                    };
                }
                this.analytics.trackEvent({
                    category: category,
                    action: 'select',
                    value: cellData.departFilterValue + '_' + cellData.returnFilterValue,
                    params: params
                });
            }
        }, {
            key: 'updateFilterState',
            value: function updateFilterState() {
                var _props4 = this.props,
                    cellData = _props4.cellData,
                    departLabels = _props4.departLabels,
                    nonstopOnly = _props4.nonstopOnly,
                    returnLabels = _props4.returnLabels,
                    roundTrip = _props4.roundTrip,
                    setUndoStopsFilterState = _props4.setUndoStopsFilterState;

                var stateUpdaters = {
                    flexdepart: this.createFlexDateFilterThunk(cellData.departFilterValue, departLabels)
                };
                if (roundTrip) {
                    stateUpdaters.flexreturn = this.createFlexDateFilterThunk(cellData.returnFilterValue, returnLabels);
                }
                if (nonstopOnly) {
                    stateUpdaters.stops = function (_filterState) {
                        return { 0: 2, 1: 0, 2: 0 };
                    };
                    setUndoStopsFilterState(FilterStateController.getCurrentValueSetFilterState('stops'));
                }
                FilterStateController.pushValueSetFilterUpdates(stateUpdaters);
                this.trackSelect('flex-matrix/cell');
            }
        }, {
            key: 'createFlexDateFilterThunk',
            value: function createFlexDateFilterThunk(cellAxisKey, matrixAxisLabels) {
                var _this3 = this;

                return function (_filterState) {
                    return babelHelpers.extends({}, _this3.newFilterStateFromPoll(matrixAxisLabels, _FilterConstants.itemSelectedStatus.NOT_SELECTED), babelHelpers.defineProperty({}, cellAxisKey, _FilterConstants.itemSelectedStatus.ONLY));
                };
            }
        }, {
            key: 'newFilterStateFromPoll',
            value: function newFilterStateFromPoll(pollLabels) {
                var statusToSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _FilterConstants.itemSelectedStatus.SELECTED;

                var newState = {};
                pollLabels.forEach(function (label) {
                    newState[label.filterValue] = statusToSet;
                });
                return newState;
            }
        }, {
            key: 'generateAriaLabel',
            value: function generateAriaLabel() {
                var _props5 = this.props,
                    cellData = _props5.cellData,
                    departLabels = _props5.departLabels,
                    flightSetData = _props5.flightSetData,
                    returnLabels = _props5.returnLabels,
                    roundTrip = _props5.roundTrip;

                var departLabel = departLabels.find(function (label) {
                    return label.filterValue === cellData.departFilterValue;
                });
                if (!departLabel) {
                    return '';
                }
                if (!roundTrip) {
                    return _stringFLEX_MATRIX_CELL_ARIA_LABEL_ONE_WAY2.default.value(flightSetData.similarFlights, flightSetData.displayPrice, flightSetData.similarFlights, departLabel.display);
                }
                var returnLabel = returnLabels.find(function (label) {
                    return label.filterValue === cellData.returnFilterValue;
                });
                return _stringFLEX_MATRIX_CELL_ARIA_LABEL2.default.value(flightSetData.similarFlights, flightSetData.displayPrice, flightSetData.similarFlights, departLabel.display, returnLabel.display);
            }
        }, {
            key: 'getInnerPriceStyles',
            value: function getInnerPriceStyles() {
                var _ref3;

                var _props6 = this.props,
                    cellData = _props6.cellData,
                    displayMode = _props6.displayMode,
                    predictionCellCount = _props6.predictionCellCount,
                    presentation = _props6.presentation;

                if (cellData.prediction) {
                    var _ref;

                    return _ref = {}, babelHelpers.defineProperty(_ref, _FlexMatrixConstants.priceCategories.BAD_PRICE, _stlCell__InnerPrediction2.default), babelHelpers.defineProperty(_ref, _FlexMatrixConstants.priceCategories.DEFAULT, _stlCell__InnerPrediction2.default), babelHelpers.defineProperty(_ref, _FlexMatrixConstants.priceCategories.GOOD_PRICE, _stlCell__InnerGood2.default), babelHelpers.defineProperty(_ref, _FlexMatrixConstants.priceCategories.BEST_PRICE, _stlCell__InnerGood2.default), _ref;
                } else if (predictionCellCount) {
                    var _ref2;

                    return _ref2 = {}, babelHelpers.defineProperty(_ref2, _FlexMatrixConstants.priceCategories.BAD_PRICE, _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER === displayMode ? _stlCell__InnerDefaultBold2.default : _stlCell__InnerBadBold2.default), babelHelpers.defineProperty(_ref2, _FlexMatrixConstants.priceCategories.DEFAULT, _stlCell__InnerDefaultBold2.default), babelHelpers.defineProperty(_ref2, _FlexMatrixConstants.priceCategories.GOOD_PRICE, _stlCell__InnerGoodBold2.default), babelHelpers.defineProperty(_ref2, _FlexMatrixConstants.priceCategories.BEST_PRICE, presentation.textBestBold), _ref2;
                }
                return _ref3 = {}, babelHelpers.defineProperty(_ref3, _FlexMatrixConstants.priceCategories.BAD_PRICE, _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER === displayMode ? _stlCell__InnerDefault2.default : _stlCell__InnerBad2.default), babelHelpers.defineProperty(_ref3, _FlexMatrixConstants.priceCategories.DEFAULT, _stlCell__InnerDefault2.default), babelHelpers.defineProperty(_ref3, _FlexMatrixConstants.priceCategories.GOOD_PRICE, _stlCell__InnerGood2.default), babelHelpers.defineProperty(_ref3, _FlexMatrixConstants.priceCategories.BEST_PRICE, presentation.textBest), _ref3;
            }
        }, {
            key: 'renderWrapperElement',
            value: function renderWrapperElement(noResults, showLoading) {
                var _this4 = this;

                var _props7 = this.props,
                    cellData = _props7.cellData,
                    cellId = _props7.cellId,
                    isLoading = _props7.isLoading,
                    presentation = _props7.presentation;

                var blockCssClass = _stlCell2.default + ' ' + (!showLoading && !noResults ? _stlCellHasResults2.default : '');
                var isLink = !showLoading && cellData.prediction && cellData.searchUrl;
                var focusElementProps = {
                    onMouseUp: function onMouseUp() {
                        return noResults || showLoading ? undefined : _this4.onCellClick();
                    },
                    onMouseOver: function onMouseOver() {
                        return noResults || isLoading ? undefined : _this4.updateHoverState(true);
                    },
                    onFocus: function onFocus() {
                        return noResults || isLoading ? undefined : _this4.updateFocusState(true);
                    },
                    onBlur: function onBlur() {
                        return noResults || isLoading ? undefined : _this4.updateFocusState(false);
                    },
                    ariaLabel: this.ariaLabel,
                    tabIndex: 0
                };
                var WrapperItem = function WrapperItem(_ref4) {
                    var children = _ref4.children;
                    return React.createElement(
                        _FlexMatrixGridBlock.FlexMatrixGridBlock,
                        babelHelpers.extends({
                            id: 'FlexMatrixCell__' + cellId,
                            className: blockCssClass,
                            role: 'gridcell',
                            tabIndex: isLink ? -1 : 0,
                            isv2: presentation.gridBlocksV2 ? 1 : 0
                        }, isLink ? {} : focusElementProps),
                        children
                    );
                };

                if (isLink) {
                    return function (_ref5) {
                        var children = _ref5.children;
                        return babelHelpers.jsx(WrapperItem, {}, void 0, React.createElement(
                            _FlexMatrixGridBlock.FlexMatrixGridBlockLink,
                            babelHelpers.extends({
                                href: cellData.searchUrl,
                                target: '_blank',
                                className: blockCssClass,
                                isv2: presentation.gridBlocksV2 ? 1 : 0
                            }, focusElementProps),
                            children
                        ));
                    };
                }
                return function (_ref6) {
                    var children = _ref6.children;
                    return babelHelpers.jsx(WrapperItem, {}, void 0, children);
                };
            }
        }, {
            key: 'render',
            value: function render() {
                var _props8 = this.props,
                    cellData = _props8.cellData,
                    defaultDatesSelected = _props8.defaultDatesSelected,
                    departLabels = _props8.departLabels,
                    displayMode = _props8.displayMode,
                    hoveredDepartCell = _props8.hoveredDepartCell,
                    hoveredReturnCell = _props8.hoveredReturnCell,
                    selectedCells = _props8.selectedCells,
                    flexFilterApplied = _props8.flexFilterApplied,
                    isLoading = _props8.isLoading,
                    flightSetData = _props8.flightSetData,
                    presentation = _props8.presentation,
                    returnLabels = _props8.returnLabels,
                    roundTrip = _props8.roundTrip,
                    selected = _props8.selected,
                    smallDisplayCurrency = _props8.smallDisplayCurrency,
                    tooltip = _props8.tooltip;


                var showLoading = isLoading || this.state.loadedTimerSet;
                var isBest = !showLoading && flightSetData.priceCategory === _FlexMatrixConstants.priceCategories.BEST_PRICE;
                var isGood = !showLoading && flightSetData.priceCategory === _FlexMatrixConstants.priceCategories.GOOD_PRICE;

                var hoveredDepartDaysAway = parseInt(hoveredDepartCell, 10) - parseInt(cellData.departFilterValue, 10);
                var hoveredReturnDaysAway = parseInt(hoveredReturnCell, 10) - parseInt(cellData.returnFilterValue, 10);
                var directlyHovered = !cellData.disabled && !isLoading && hoveredDepartDaysAway === 0 && (!roundTrip || hoveredReturnDaysAway === 0);
                var adjacentHovered = departLabels.length > 1 && returnLabels.length > 1 && (hoveredDepartDaysAway === 0 && hoveredReturnDaysAway > 0 || hoveredReturnDaysAway === 0 && hoveredDepartDaysAway < 0);

                var isHovering = hoveredDepartCell !== '' || hoveredReturnCell !== '';
                var adjacentSelected = false;

                if (_propertyHorizonFlightsResultsFlexMatrix3.default.getBoolean(false) && selectedCells) {
                    for (var i = 0; i < selectedCells.length; i += 1) {
                        var selectedCell = selectedCells[i];
                        var selectedDepartDaysAway = parseInt(selectedCell.departFilterValue, 10) - parseInt(cellData.departFilterValue, 10);
                        var selectedReturnDaysAway = parseInt(selectedCell.returnFilterValue, 10) - parseInt(cellData.returnFilterValue, 10);
                        adjacentSelected = departLabels.length > 1 && returnLabels.length > 1 && (selectedDepartDaysAway === 0 && selectedReturnDaysAway > 0 || selectedReturnDaysAway === 0 && selectedDepartDaysAway < 0);
                        if (adjacentSelected) {
                            break;
                        }
                    }
                }

                var noResults = !cellData || !flightSetData || !flightSetData.displayPrice;

                var isInactive = (displayMode === _FlexMatrixConstants.displayModes.PLUS_MINUS_THREE || !defaultDatesSelected) && !selected || noResults;

                var categoryBackgroundClasses = void 0;
                if (isBest) {
                    categoryBackgroundClasses = presentation.bgBest;
                } else if (isGood) {
                    categoryBackgroundClasses = presentation.bgGood;
                } else {
                    categoryBackgroundClasses = _stlCell__Bg__categoryDefault2.default;
                }
                var categoryActiveBackgroundClasses = isInactive && !directlyHovered ? _stlCell__Bg__categoryInactive2.default : _stlCell__Bg__categoryActive2.default;

                var interactionBackgroundClasses = '';
                if (adjacentHovered) {
                    interactionBackgroundClasses = _stlCell__Bg__interactionAdjacentHovered2.default;
                } else if (!selected && adjacentSelected && !isHovering) {
                    interactionBackgroundClasses = _stlCell__Bg__interactionAdjacentSelected2.default;
                }
                var innerClasses = this.getInnerPriceStyles()[flightSetData.priceCategory];
                var innerActiveClasses = !directlyHovered && isInactive ? _stlCell__InnerInactive2.default : _stlCell__InnerActive2.default;
                var innerSizeClasses = smallDisplayCurrency ? _stlCell__InnerSmall2.default : _stlCell__InnerMedium2.default;

                var cellLabel = flightSetData.displayPrice ? flightSetData.displayPrice : _stringFLEX_MATRIX_CELL_EMPTY_LABEL2.default.value();

                var borderClasses = void 0;
                if (directlyHovered) {
                    borderClasses = _stlCell__BorderHovered2.default;
                } else if (!isLoading && _propertyHorizonFlightsResultsFlexMatrix3.default.getBoolean(false) && flexFilterApplied && selected && !isHovering) {
                    borderClasses = _stlCell__BorderSelected2.default;
                } else if (isBest && presentation.borderBest) {
                    borderClasses = presentation.borderBest;
                } else {
                    borderClasses = isInactive ? presentation.borderInactive : presentation.borderActive;
                }

                var WrapperElement = this.renderWrapperElement(noResults, showLoading);

                return babelHelpers.jsx(WrapperElement, {}, void 0, babelHelpers.jsx('div', {
                    className: _stlCell__Bg2.default + ' ' + _stlCell__Bg__category2.default + ' ' + categoryBackgroundClasses + ' ' + categoryActiveBackgroundClasses
                }), babelHelpers.jsx('div', {
                    className: _stlCell__Bg2.default + ' ' + interactionBackgroundClasses
                }), babelHelpers.jsx('div', {
                    className: _stlCell__Border2.default + ' ' + borderClasses
                }), babelHelpers.jsx('div', {
                    className: _stlCell__Inner2.default + ' ' + innerClasses + ' ' + innerActiveClasses + ' ' + innerSizeClasses
                }, void 0, showLoading ? babelHelpers.jsx('div', {
                    className: _stlCell__Inner__LoadingShimmer2.default,
                    style: { animationDelay: this.props.column / departLabels.length + 's' }
                }) : cellLabel), tooltip);
            }
        }]);
        return PureFlexMatrixCell;
    }(React.Component);

    PureFlexMatrixCell.propTypes = {
        cellData: _propTypes2.default.objectOf(_propTypes2.default.any).isRequired,
        cellId: _propTypes2.default.string.isRequired,
        column: _propTypes2.default.number.isRequired,
        defaultDatesSelected: _propTypes2.default.bool.isRequired,
        departLabels: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
        displayMode: _propTypes2.default.oneOf(Object.values(_FlexMatrixConstants.displayModes)).isRequired,
        flightSetData: _propTypes2.default.objectOf(_propTypes2.default.any),
        flexFilterApplied: _propTypes2.default.bool,
        hasUiUpdate: _propTypes2.default.bool.isRequired,
        hoveredDepartCell: _propTypes2.default.string,
        hoveredReturnCell: _propTypes2.default.string,
        selectedCells: _propTypes2.default.arrayOf(_propTypes2.default.any),
        isLoading: _propTypes2.default.bool.isRequired,
        presentation: _propTypes2.default.objectOf(_propTypes2.default.any).isRequired,
        resultsChanged: _propTypes2.default.bool.isRequired,
        returnLabels: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
        roundTrip: _propTypes2.default.bool.isRequired,
        selected: _propTypes2.default.bool.isRequired,
        smallDisplayCurrency: _propTypes2.default.bool,
        tooltip: _propTypes2.default.objectOf(_propTypes2.default.any)
    };

    PureFlexMatrixCell.defaultProps = {
        flightSetData: {},
        hoveredDepartCell: '',
        hoveredReturnCell: '',
        smallDisplayCurrency: false,
        flexFilterApplied: false,
        selectedCells: [],
        tooltip: null
    };

    var presentations = exports.presentations = (_presentations = {}, babelHelpers.defineProperty(_presentations, _FlexMatrixConstants.presentationKeys.DEFAULT, {
        bgBest: _stlCell__Bg__categoryBest2.default,
        bgGood: _stlCell__Bg__categoryGood2.default,
        borderActive: _stlCell__BorderActive2.default,
        borderInactive: _stlCell__BorderInactive2.default,
        borderBest: '',
        textBest: _stlCell__InnerBest2.default,
        textBestBold: _stlCell__InnerBestBold2.default,
        gridBlocksV2: undefined
    }), babelHelpers.defineProperty(_presentations, _FlexMatrixConstants.presentationKeys.V2, {
        bgBest: _stlCell__Bg__categoryBestV2.default,
        borderActive: _stlCell__BorderActiveV2.default,
        borderInactive: _stlCell__BorderInactiveV2.default,
        borderBest: _stlCell__BorderBestV2.default,
        textBest: _stlCell__InnerBestV2.default,
        textBestBold: _stlCell__InnerBestBoldV2.default,
        gridBlocksV2: true
    }), _presentations);

    var FlexMatrixCell = exports.FlexMatrixCell = (_dec = (0, _presentate2.default)(presentations, (0, _propertyHorizonFlightsResultsFlexMatrix.getString)()), _dec(_class = function (_PureFlexMatrixCell) {
        babelHelpers.inherits(FlexMatrixCell, _PureFlexMatrixCell);

        function FlexMatrixCell() {
            babelHelpers.classCallCheck(this, FlexMatrixCell);
            return babelHelpers.possibleConstructorReturn(this, (FlexMatrixCell.__proto__ || Object.getPrototypeOf(FlexMatrixCell)).apply(this, arguments));
        }

        return FlexMatrixCell;
    }(PureFlexMatrixCell)) || _class);
    exports.default = ReactRedux.connect(function (_ref7, _ref8) {
        var FlexMatrix = _ref7.FlexMatrix,
            SearchPoll = _ref7.SearchPoll,
            FilterState = _ref7.FilterState;
        var cellId = _ref8.cellId,
            selectedCells = _ref8.selectedCells,
            cellData = _ref8.cellData,
            column = _ref8.column,
            hasUiUpdate = _ref8.hasUiUpdate,
            tooltip = _ref8.tooltip;
        var ajaxStatus = FlexMatrix.clientDerivedData.ajaxStatus;
        var smallDisplayCurrency = FlexMatrix.config.smallDisplayCurrency;
        var _FlexMatrix$data = FlexMatrix.data,
            departLabels = _FlexMatrix$data.departLabels,
            returnLabels = _FlexMatrix$data.returnLabels,
            roundTrip = _FlexMatrix$data.roundTrip;
        var _FlexMatrix$ui = FlexMatrix.ui,
            defaultDatesSelected = _FlexMatrix$ui.defaultDatesSelected,
            displayMode = _FlexMatrix$ui.displayMode,
            hoveredDepartCell = _FlexMatrix$ui.hoveredDepartCell,
            hoveredReturnCell = _FlexMatrix$ui.hoveredReturnCell,
            nonstopOnly = _FlexMatrix$ui.nonstopOnly,
            predictionCellCount = _FlexMatrix$ui.predictionCellCount,
            standardCellCount = _FlexMatrix$ui.standardCellCount;
        var searchCompleted = SearchPoll.completed,
            resultsChanged = SearchPoll.resultsChanged;
        var flexFilterApplied = FilterState.ui.flexFilterApplied;


        return {
            smallDisplayCurrency: smallDisplayCurrency,
            departLabels: departLabels,
            returnLabels: returnLabels,
            roundTrip: roundTrip,
            defaultDatesSelected: defaultDatesSelected,
            displayMode: displayMode,
            hoveredDepartCell: hoveredDepartCell,
            hoveredReturnCell: hoveredReturnCell,
            selectedCells: selectedCells,
            flexFilterApplied: flexFilterApplied,
            nonstopOnly: nonstopOnly,
            predictionCellCount: predictionCellCount,
            resultsChanged: resultsChanged,
            standardCellCount: standardCellCount,
            cellData: cellData,
            cellId: cellId,
            column: column,
            hasUiUpdate: hasUiUpdate,
            tooltip: tooltip,
            flightSetData: nonstopOnly ? cellData.nonstopFlights : cellData.allFlights,
            isLoading: !cellData.allFlights.displayPrice && !cellData.disabled && !searchCompleted && (!cellData.prediction || ajaxStatus !== _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_RECEIVED),
            selected: cellData.selected
        };
    }, function (dispatch) {
        return {
            setUndoStopsFilterState: function setUndoStopsFilterState(filterState) {
                return dispatch(flexMatrixActions.setUndoStopsFilterState(filterState));
            },
            updateHoverState: function updateHoverState(departFilterValue, returnFilterValue) {
                return dispatch(flexMatrixActions.updateCellHoverState(departFilterValue, returnFilterValue));
            }
        };
    })(FlexMatrixCell);
});define('default/common/icon/_svg_/heart-filled', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M12.103 5.707L12 5.81l-.103-.12C9.461 2.658 5.992 2.15 3.713 4.364a5.685 5.685 0 0 0 0 8.134L12 20.682l8.287-8.167a5.685 5.685 0 0 0 0-8.134c-2.267-2.241-6.152-1.723-8.184 1.326z\"/></svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/common/icon/_svg_/heart-filled"}, params || {}, {svg: svgStr})); };
});define("default/common/react/constants/keyCodes", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        BACKSPACE: 8,
        DOWN: 40,
        END: 35,
        ESC: 27,
        HOME: 36,
        LEFT: 37,
        MOUSE_LEFT: 1,
        MOUSE_MIDDLE: 2,
        MOUSE_RIGHT: 3,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        RETURN: 13,
        RIGHT: 39,
        SHIFT: 16,
        SPACE: 32,
        TAB: 9,
        UP: 38
    };
});define("default/flights/results/react/utils/FlexMatrixRecommendationUtils", ['exports', 'flights/results/react/constants/FlexMatrixConstants', 'common/react/constants/globals', 'flights/results/react/utils/FlexMatrixClientPredictionUtils'], function (exports, _FlexMatrixConstants, _globals, _FlexMatrixClientPredictionUtils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.findExactDateRecommendation = findExactDateRecommendation;
    exports.findFlexDateInsightsRecommendation = findFlexDateInsightsRecommendation;

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    var _FlexMatrixClientPredictionUtils2 = babelHelpers.interopRequireDefault(_FlexMatrixClientPredictionUtils);

    function getRecommendationDatesToCompare(matrixEntries, flightGroupKey) {
        var dates = {
            queryDate: { key: null, price: null },
            cheapestFlexDate: { key: null, price: null }
        };
        Object.keys(matrixEntries).forEach(function (entryKey) {
            var entryFlightGroup = matrixEntries[entryKey][flightGroupKey];
            if (entryFlightGroup && entryFlightGroup.price > 0) {
                if (matrixEntries[entryKey].queryDate) {
                    dates.queryDate = { key: entryKey, price: entryFlightGroup.price };
                } else if (!dates.cheapestFlexDate.price || entryFlightGroup.price < dates.cheapestFlexDate.price) {
                    dates.cheapestFlexDate = { key: entryKey, price: entryFlightGroup.price };
                }
            }
        });
        return dates;
    }

    // Minimum savings percentage to show a 'significant' savings recommendation
    var getMinSavingsForDaysAway = function getMinSavingsForDaysAway(daysAway, config) {
        switch (daysAway) {
            case 1:
                return config[_FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_ONE_DAY_AWAY](0.05);
            case 2:
                return config[_FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_TWO_DAYS_AWAY](0.10);
            case 3:
                return config[_FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_THREE_DAYS_AWAY](0.15);
            case 0:
            default:
                return config[_FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_QUERY_DATES](0.05);
        }
    };
    // Savings percentages to show an alternate recommendation for 'limited' savings
    var getMinMinorSavingsForDaysAway = function getMinMinorSavingsForDaysAway(daysAway, config) {
        switch (daysAway) {
            case 2:
                return config[_FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_MINOR_TWO_DAYS_AWAY](0.05);
            case 3:
                return config[_FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_MINOR_THREE_DAYS_AWAY](0.05);
            default:
                return NaN;
        }
    };

    function getDisplaySavings(highPrice, lowPrice) {
        var priceSavings = highPrice - lowPrice;
        return R9 && R9.Common ? R9.Common.Utils.formatPrice(priceSavings) : priceSavings;
    }

    /**
     * Returns a formatted UI Message string with a recommendation for the best flex date.
     * Used for exact date searches.
     *
     * Because Horizon React doesn't allow strings/config to be imported from utility classes, they're passed in here.
     */
    function findExactDateRecommendation(matrixEntries, config, strings) {
        var flightGroupKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'allFlights';

        if (!matrixEntries) {
            return '';
        }

        var _getRecommendationDat = getRecommendationDatesToCompare(matrixEntries, flightGroupKey),
            cheapestFlexDate = _getRecommendationDat.cheapestFlexDate,
            queryDate = _getRecommendationDat.queryDate;

        if (!cheapestFlexDate.key || !cheapestFlexDate.price || !queryDate.key || !queryDate.price) {
            return '';
        }
        var cheapestEntry = matrixEntries[cheapestFlexDate.key];
        var priceSavingsDecimal = 1 - cheapestFlexDate.price / queryDate.price;
        var queryDateCheapest = priceSavingsDecimal <= 0;
        if (queryDateCheapest) {
            if (priceSavingsDecimal * -1 > getMinSavingsForDaysAway(0, config)) {
                var displaySavings = getDisplaySavings(cheapestEntry[flightGroupKey].price, queryDate.price);
                return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_ALREADY_CHEAPEST_DATES].value(displaySavings);
            }
            return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_ALL_SIMILAR_DATES].value();
        }
        var absoluteDepartDaysAway = Math.abs(cheapestEntry.departDaysAway);
        var absoluteReturnDaysAway = Math.abs(cheapestEntry.returnDaysAway);
        var mostDaysAway = Math.max(absoluteDepartDaysAway, absoluteReturnDaysAway);
        var priceSavingsAbsolute = queryDate.price - cheapestFlexDate.price;
        var localCurrencyMinSavingsAbsolute = config[_FlexMatrixConstants.recommendationConfigKeys.MIN_SAVINGS_ABSOLUTE_USD](5) * (_globals2.default.currencyConversionRates.fromUSD || 1);
        if (priceSavingsDecimal > getMinSavingsForDaysAway(mostDaysAway, config) && priceSavingsAbsolute > localCurrencyMinSavingsAbsolute) {
            var _displaySavings = getDisplaySavings(queryDate.price, cheapestEntry[flightGroupKey].price);
            if (cheapestEntry.departDaysAway !== 0 && cheapestEntry.returnDaysAway !== 0) {
                return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_DEPART_RETURN].value(_displaySavings);
            } else if (cheapestEntry.departDaysAway !== 0) {
                if (cheapestEntry.departDaysAway > 0) {
                    return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_DEPART_AFTER].value(absoluteDepartDaysAway, _displaySavings);
                }
                return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_DEPART_BEFORE].value(absoluteDepartDaysAway, _displaySavings);
            } else if (cheapestEntry.returnDaysAway !== 0) {
                if (cheapestEntry.returnDaysAway > 0) {
                    return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_RETURN_AFTER].value(absoluteReturnDaysAway, _displaySavings);
                }
                return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_RETURN_BEFORE].value(absoluteReturnDaysAway, _displaySavings);
            }
        } else {
            var minorSavings = getMinMinorSavingsForDaysAway(mostDaysAway, config);
            if (minorSavings && priceSavingsDecimal > minorSavings) {
                return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_CHEAPER_LIMITED_SAVINGS].value();
            }
        }
        return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_ALL_SIMILAR_DATES].value();
    }

    function formatFilterDateToDisplay(filterValue) {
        if (!filterValue) {
            return '';
        }
        var displayDate = filterValue;
        var momentDate = (0, _FlexMatrixClientPredictionUtils2.default)(filterValue, _FlexMatrixConstants.flexFilterDateFormat);
        if (_globals2.default.dateFormats.dayOfWeek) {
            displayDate = momentDate.format(_globals2.default.dateFormats.dayOfWeek);
        }
        // HTML written here as string to avoid it being in FeatureStrings
        return '<span style="white-space: nowrap">' + displayDate + '</span>';
    }

    /**
     * Returns a formatted UI Message string with a recommendation for the best flex date.
     * Used for flex date (plusminusthree) searches.
     *
     * Because Horizon React doesn't allow strings/config to be imported from utility classes, they're passed in here.
     */
    function findFlexDateInsightsRecommendation(matrixEntries, config, strings) {
        var flightGroupKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'allFlights';

        if (!matrixEntries) {
            return '';
        }

        var _getRecommendationDat2 = getRecommendationDatesToCompare(matrixEntries, flightGroupKey),
            cheapestFlexDate = _getRecommendationDat2.cheapestFlexDate,
            queryDate = _getRecommendationDat2.queryDate;

        if (!cheapestFlexDate.key || !cheapestFlexDate.price || !queryDate.key || !queryDate.price) {
            return '';
        }
        var priceSavingsDecimal = 1 - cheapestFlexDate.price / queryDate.price;
        var queryDateCheapest = priceSavingsDecimal <= 0;
        if (queryDateCheapest) {
            return '';
        }
        var cheapestEntry = matrixEntries[cheapestFlexDate.key];
        var mostDaysAway = Math.max(Math.abs(cheapestEntry.departDaysAway), Math.abs(cheapestEntry.returnDaysAway));
        if (priceSavingsDecimal > getMinSavingsForDaysAway(mostDaysAway, config)) {
            var departDate = formatFilterDateToDisplay(cheapestEntry.departFilterValue);
            var returnDate = formatFilterDateToDisplay(cheapestEntry.returnFilterValue);
            var cheapestPrice = cheapestEntry[flightGroupKey].price;
            var displayPrice = R9 && R9.Common && R9.Common.Utils ? R9.Common.Utils.formatPrice(cheapestPrice) : cheapestPrice;
            if (returnDate && departDate !== returnDate) {
                return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_FLEX_SEARCH_RECOMMENDED_RT].value(departDate, returnDate, displayPrice);
            }
            return strings[_FlexMatrixConstants.recommendationStringKeys.TAB_FLEX_SEARCH_RECOMMENDED_OW].value(departDate, displayPrice);
        }
        return '';
    }
});define("default/flights/results/react/constants/InsightsBannerConstants", ['exports', 'prop-types'], function (exports, _propTypes) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.genericInsightsBannerUiShape = exports.genericInsightsBannerDataShape = exports.ajaxRequestStatus = exports.genericRecommendationTypes = exports.advantageTypeGroups = exports.advantageTypes = exports.bannerTypes = exports.bannerLocations = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var bannerLocations = exports.bannerLocations = {
        RESULTS_TOP: 'RESULTS_TOP',
        FLEX_MATRIX: 'FLEX_MATRIX'
    };

    var bannerTypes = exports.bannerTypes = {
        DEFAULT: 'DEFAULT',
        FLEX_FOR_ALL: 'FLEX_FOR_ALL',
        NEARBY_AIRPORTS: 'NEARBY_AIRPORTS',
        AVERAGE_PRICE: 'AVERAGE_PRICE',
        USE_PREVIOUS: 'USE_PREVIOUS'
    };

    /*
     * Enums for Advantage types: why changing your search will give you better results
     */
    var advantageTypes = exports.advantageTypes = {
        ALREADY_BEST: 'ALREADY_BEST',
        ALL_SAME: 'ALL_SAME',
        SAVINGS: 'SAVINGS',
        NONSTOP: 'NONSTOP',
        NONSTOP_SAVINGS: 'NONSTOP_SAVINGS',
        LOADING: 'LOADING',
        ERROR: 'ERROR',
        NONE: 'NONE',
        // Fallback value for things derived from types - LOADING is the actual default
        DEFAULT: 'DEFAULT'
    };

    var advantageTypeGroups = exports.advantageTypeGroups = {
        NO_DATA: [advantageTypes.LOADING, advantageTypes.NONE, advantageTypes.ERROR],
        NO_ADVANTAGE: [advantageTypes.NONE, advantageTypes.ERROR],
        NONSTOP: [advantageTypes.NONSTOP, advantageTypes.NONSTOP_SAVINGS],
        WITH_RECOMMENDATIONS: [advantageTypes.SAVINGS, advantageTypes.NONSTOP, advantageTypes.NONSTOP_SAVINGS, advantageTypes.ALREADY_BEST, advantageTypes.ALL_SAME]
    };

    /*
     * Recommendation types: What part of the search should be changed
     */
    var genericRecommendationTypes = exports.genericRecommendationTypes = {
        NONE: 'NONE'
    };

    /*
     * Client-side/ajax enums
     */
    var ajaxRequestStatus = exports.ajaxRequestStatus = {
        NO_REQUEST: 'NO_REQUEST',
        START_REQUEST: 'START_REQUEST',
        REQUEST_PENDING: 'REQUEST_PENDING',
        RESPONSE_RECEIVED: 'RESPONSE_RECEIVED',
        RESPONSE_ERROR: 'RESPONSE_ERROR'
    };

    /*
     * Shapes for PropTypes: The types that InsightsBanner reducer props should have
     */
    var genericInsightsBannerDataShape = exports.genericInsightsBannerDataShape = {
        advantageType: _propTypes2.default.oneOf(Object.values(advantageTypes)).isRequired,
        location: _propTypes2.default.oneOf(Object.values(bannerLocations)).isRequired,
        type: _propTypes2.default.string.isRequired
    };

    var genericInsightsBannerUiShape = exports.genericInsightsBannerUiShape = {
        nearbyRecommendationApplied: _propTypes2.default.bool.isRequired,
        undoFilterState: _propTypes2.default.object.isRequired
    };
});define('default/flights/results/_svg_/stops-nonstop', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg width=\"23px\" height=\"13px\" viewBox=\"0 0 23 13\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"> <polyline points=\"15.3606061 8 18.4512764 11 21.5424242 8\"></polyline> <path d=\"M18.4242424,10.8092335 L18.4242424,8.96374154 C18.4242424,4.98803566 15.0663939,1.76470588 10.924339,1.76470588 C6.78209093,1.76470588 3.42424242,4.98803566 3.42424242,8.96374154 L3.42424242,9.96325472\"></path> <path d=\"M0,10 L7,10\"></path> </svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/flights/results/_svg_/stops-nonstop"}, params || {}, {svg: svgStr})); };
});define("default/common/results/filters/react/actions/FilterStateActions", ['exports', 'common/results/react/constants/ResultsPageConstants', 'common/utils/react/question'], function (exports, _ResultsPageConstants, _question) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UPDATE_FILTER_DATA = exports.ANY_FILTERS_CHANGED = exports.FILTER_RESET_PENDING = undefined;
    exports.updateValueSetFilterData = updateValueSetFilterData;
    exports.updateFilterData = updateFilterData;
    exports.handleAnyFiltersChanged = handleAnyFiltersChanged;
    exports.setFilterResetPending = setFilterResetPending;

    var _question2 = babelHelpers.interopRequireDefault(_question);

    var BASE_PATH = 'FilterState.';
    var FILTER_RESET_PENDING = exports.FILTER_RESET_PENDING = BASE_PATH + 'FILTER_RESET_PENDING';
    var ANY_FILTERS_CHANGED = exports.ANY_FILTERS_CHANGED = BASE_PATH + 'ANY_FILTERS_CHANGED';
    var UPDATE_FILTER_DATA = exports.UPDATE_FILTER_DATA = BASE_PATH + 'UPDATE_FILTER_DATA';

    // Merges value set filter data's original valueMap property with its new filter state
    function valueMapFromState(filterState, originalDataForFilter) {
        var valueMap = {};
        Object.keys(filterState).forEach(function (valueSetItemKey) {
            valueMap[valueSetItemKey] = babelHelpers.extends({}, originalDataForFilter.valueMap[valueSetItemKey] || {}, {
                selected: filterState[valueSetItemKey]
            });
        });
        return valueMap;
    }

    // For each value set filter in "states", convert filterState into the searchPoll's filtersData format.
    function valueSetDataFromState(states) {
        var originalData = _question2.default.ask(_ResultsPageConstants.RP_QUESTION_FILTER_DATA) || {};
        var newData = {};
        Object.keys(states).forEach(function (filterName) {
            var originalFilterData = originalData[filterName] || { valueMap: {} };
            newData[filterName] = babelHelpers.extends({}, originalFilterData, {
                valueMap: valueMapFromState(states[filterName], originalFilterData)
            });
        });
        return newData;
    }

    function updateValueSetFilterData(states) {
        return {
            type: UPDATE_FILTER_DATA,
            payload: {
                data: valueSetDataFromState(states)
            }
        };
    }

    function updateFilterData(data) {
        return {
            type: UPDATE_FILTER_DATA,
            payload: {
                data: data
            }
        };
    }

    function handleAnyFiltersChanged(data) {
        return {
            type: ANY_FILTERS_CHANGED,
            payload: {
                data: data
            }
        };
    }

    function setFilterResetPending(filterNames) {
        var filterData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return {
            type: FILTER_RESET_PENDING,
            payload: {
                filterNames: filterNames,
                data: filterData
            }
        };
    }
});define("default/flights/results/react/FlexMatrixReturnLabel", ['exports', 'flights/results/react/FlexMatrixAxisLabel', 'flights/results/react/actions/FlexMatrixActions'], function (exports, _FlexMatrixAxisLabel, _FlexMatrixActions) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _FlexMatrixAxisLabel2 = babelHelpers.interopRequireDefault(_FlexMatrixAxisLabel);

    var FlexMatrixReturnLabel = function (_React$Component) {
        babelHelpers.inherits(FlexMatrixReturnLabel, _React$Component);

        function FlexMatrixReturnLabel() {
            babelHelpers.classCallCheck(this, FlexMatrixReturnLabel);
            return babelHelpers.possibleConstructorReturn(this, (FlexMatrixReturnLabel.__proto__ || Object.getPrototypeOf(FlexMatrixReturnLabel)).apply(this, arguments));
        }

        babelHelpers.createClass(FlexMatrixReturnLabel, [{
            key: 'render',
            value: function render() {
                return React.createElement(_FlexMatrixAxisLabel2.default, babelHelpers.extends({}, this.props, {
                    checkboxId: 'FlexAxisLabelCheckbox_return_' + this.props.axisLabel.filterValue,
                    role: 'columnheader'
                }));
            }
        }]);
        return FlexMatrixReturnLabel;
    }(React.Component);

    exports.default = ReactRedux.connect(function (_ref, _ref2) {
        var FlexMatrix = _ref.FlexMatrix;
        var axisLabel = _ref2.axisLabel,
            filterName = _ref2.filterName,
            uiStateKey = _ref2.uiStateKey;
        return {
            axisLabel: axisLabel,
            filterName: filterName,
            uiStateKey: uiStateKey,
            allLabels: FlexMatrix.data.returnLabels,
            enabledLabelCount: FlexMatrix.ui.enabledReturnLabelCount,
            isHovered: axisLabel.filterValue === FlexMatrix.ui.hoveredReturnCell
        };
    }, function (dispatch) {
        return {
            updateHoverState: function updateHoverState(returnId) {
                return dispatch((0, _FlexMatrixActions.updateAxisHoverState)(null, returnId));
            }
        };
    })(FlexMatrixReturnLabel);
});define("default/common/analytics/react/VSLog", ['exports', 'common/utilities/react/Utils', 'common/react/constants/globals'], function (exports, _Utils, _globals) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    var VSLog = function () {
        function VSLog() {
            var globals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _globals2.default;
            babelHelpers.classCallCheck(this, VSLog);

            this.globals = globals;
        }

        babelHelpers.createClass(VSLog, [{
            key: 'pageHandler',
            value: function pageHandler(data) {
                var _this = this;

                return new Promise(function (resolve) {
                    if (_this.globals.analytics.vslog.trackPageView === 'true') {
                        VSLog.record(VSLog.makeVsPageData(data)).then(resolve).catch(resolve);
                    } else {
                        resolve();
                    }
                });
            }
        }, {
            key: 'eventHandler',
            value: function eventHandler(data, callback) {
                var _this2 = this;

                return new Promise(function (resolve) {
                    if (_this2.globals.analytics.vslog.trackEvent === 'true') {
                        VSLog.record(VSLog.makeVsEventData(data, callback)).then(resolve).catch(resolve);
                    } else {
                        resolve();
                    }
                });
            }
        }], [{
            key: 'makeVsEventData',
            value: function makeVsEventData(data) {
                var vsData = {};

                var url = ['/vs', data.vertical, data.pageId];

                if (data.subPageId) {
                    url.push(data.subPageId);
                }

                url.push(data.category);

                if (data.action) {
                    url.push(data.action);
                }

                if (data.label) {
                    url.push(data.label);
                }

                if (data.value) {
                    url.push(data.value);
                }

                if (data.auto) {
                    url.push('nonInteraction');
                }

                vsData.url = url.join('/').replace(/\/+/g, '/');

                vsData.data = data.params || {};

                vsData.data.action = 'vs';

                vsData.data.searchid = data.searchid;

                return vsData;
            }
        }, {
            key: 'makeVsPageData',
            value: function makeVsPageData(data) {
                var vsData = {};

                var url = ['/vs/page', data.vertical, data.pageId];

                if (data.subPageId) {
                    url.push(data.subPageId);
                }

                vsData.url = url.join('/');

                vsData.data = data.params || {};
                vsData.data.action = 'vs';
                vsData.data.searchid = data.searchid;

                return vsData;
            }
        }, {
            key: 'record',
            value: function record(data) {
                var params = {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: (0, _Utils.serialize)(data.data)
                };
                return fetch(data.url, params);
            }
        }]);
        return VSLog;
    }();

    exports.default = VSLog;
});define("default/common/utils/react/question", ['exports', 'common/utils/react/events', 'common/utils/react/logger'], function (exports, _events, _logger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _events2 = babelHelpers.interopRequireDefault(_events);

    var _logger2 = babelHelpers.interopRequireDefault(_logger);

    exports.default = function () {
        if (typeof R9 !== 'undefined' && R9.question) {
            return R9.question;
        }
        var logger = new _logger2.default('framework/question');
        var questionAnswerMap = {};
        var replaceQuestionNaming = function replaceQuestionNaming(str) {
            return str.replace(/\./g, '_');
        };

        return {
            answer: function answer(rawQuestionName, handler) {
                var questionName = replaceQuestionNaming(rawQuestionName);
                if (typeof questionAnswerMap[questionName] !== 'undefined') {
                    logger.error('Duplicate question name ' + questionName + ' is being overwritten.');
                }
                if (typeof handler !== 'function') {
                    logger.error('Handler for answer is not a function');
                } else {
                    questionAnswerMap[questionName] = handler;
                }
            },
            ask: function ask(rawQuestionName, questionData) {
                var questionName = replaceQuestionNaming(rawQuestionName);
                if (!questionName) {
                    logger.error('Missing question name - may cause weird stuff to happen');
                }

                if (typeof questionAnswerMap[questionName] === 'function') {
                    try {
                        return questionAnswerMap[questionName].call({ questionName: questionName }, questionData);
                    } catch (exception) {
                        logger.error('Error in question.ask (' + questionName + ')', exception, { questionName: questionName });
                    }
                }
                if (typeof _events2.default._debug !== 'undefined') {
                    logger.warn('Missing question answer: "%s".  No component is registered to answer this question'.format(questionName));
                }
                return null;
            },
            forget: function forget(rawQuestionName) {
                var questionName = replaceQuestionNaming(rawQuestionName);
                if (typeof questionAnswerMap[questionName] !== 'undefined') {
                    delete questionAnswerMap[questionName];
                    return true;
                }
                return false;
            }
        };
    }();
});define("default/common/react/Popover", ['exports', 'context', 'react-dom', 'stl!common.Popover.Popover'], function (exports, _context, _reactDom, _stlPopover) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _context2 = babelHelpers.interopRequireDefault(_context);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _stlPopover2 = babelHelpers.interopRequireDefault(_stlPopover);

    var isServer = _context2.default.isServer(); /* eslint-disable no-underscore-dangle,jsx-a11y/no-noninteractive-tabindex */

    var wrapperClassName = 'js-popoverWrapper';

    var Popover = function (_React$PureComponent) {
        babelHelpers.inherits(Popover, _React$PureComponent);

        function Popover(props) {
            babelHelpers.classCallCheck(this, Popover);

            var _this = babelHelpers.possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));

            _this._node = null;
            _this._targetNode = null;
            _this._containerNode = null;
            _this._wrapperNode = null;
            _this._shouldFireOnShow = false;
            _this._shouldFocus = false;
            _this._onShowEventObject = null;
            var _this$props = _this.props,
                _this$props$noAutoEve = _this$props.noAutoEvents,
                noAutoEvents = _this$props$noAutoEve === undefined ? false : _this$props$noAutoEve,
                _this$props$showEvent = _this$props.showEvent,
                showEvent = _this$props$showEvent === undefined ? noAutoEvents ? null : 'mouseover' : _this$props$showEvent,
                _this$props$showEvent2 = _this$props.showEvents,
                showEvents = _this$props$showEvent2 === undefined ? showEvent : _this$props$showEvent2,
                _this$props$hideEvent = _this$props.hideEvent,
                hideEvent = _this$props$hideEvent === undefined ? noAutoEvents ? null : 'mouseout' : _this$props$hideEvent,
                _this$props$hideEvent2 = _this$props.hideEvents,
                hideEvents = _this$props$hideEvent2 === undefined ? hideEvent : _this$props$hideEvent2,
                _this$props$position = _this$props.position,
                position = _this$props$position === undefined ? function () {
                return { top: 0, left: 0 };
            } : _this$props$position;


            _this.state = {
                visible: _this.isVisibleByProps()
            };

            _this.showEvents = showEvents;
            _this.hideEvents = hideEvents;
            _this.position = position.bind(_this);

            _this.toggle = _this.toggle.bind(_this);
            _this.show = _this.show.bind(_this);
            _this.hide = _this.hide.bind(_this);
            _this.throttledSetPosition = _this.throttledSetPosition.bind(_this);
            return _this;
        }

        babelHelpers.createClass(Popover, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.bind();
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.bind();
            }
        }, {
            key: 'componentWillUpdate',
            value: function componentWillUpdate() {
                this.unbind();
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.unbind();
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                var shouldBeVisible = this.isVisibleByProps(nextProps);
                if (this.isVisibleByProps() !== shouldBeVisible) {
                    this.setState(babelHelpers.extends({}, this.state, {
                        visible: shouldBeVisible
                    }));
                }
            }
        }, {
            key: 'bind',
            value: function bind() {
                var _this2 = this;

                var targetNode = this.targetNode;

                if (targetNode && !this.isVisibleByProps()) {
                    if (this.showEvents) {
                        this.showEvents.split(' ').map(function (event) {
                            return targetNode.addEventListener(event, _this2.show);
                        });
                    }
                    if (this.hideEvents) {
                        this.hideEvents.split(' ').map(function (event) {
                            return targetNode.addEventListener(event, _this2.hide);
                        });
                    }
                }
                this.setPosition();
                window.addEventListener('scroll', this.throttledSetPosition);
                window.addEventListener('resize', this.throttledSetPosition);
                if (this.containerNode !== null) {
                    this.containerNode.addEventListener('scroll', this.throttledSetPosition);
                    this.containerNode.addEventListener('resize', this.throttledSetPosition);
                }
            }
        }, {
            key: 'unbind',
            value: function unbind() {
                var _this3 = this;

                var targetNode = this.targetNode;

                if (targetNode && !this.isVisibleByProps()) {
                    if (this.showEvents) {
                        this.showEvents.split(' ').map(function (event) {
                            return targetNode.removeEventListener(event, _this3.show);
                        });
                    }
                    if (this.hideEvents) {
                        this.hideEvents.split(' ').map(function (event) {
                            return targetNode.removeEventListener(event, _this3.hide);
                        });
                    }
                }
                window.removeEventListener('scroll', this.throttledSetPosition);
                window.removeEventListener('resize', this.throttledSetPosition);
                if (this.containerNode !== null) {
                    this.containerNode.removeEventListener('scroll', this.throttledSetPosition);
                    this.containerNode.removeEventListener('resize', this.throttledSetPosition);
                }
            }
        }, {
            key: 'setPosition',
            value: function setPosition() {
                var _this4 = this;

                if (!this._node || !this.targetNode) {
                    setTimeout(function () {
                        return _this4.setPosition();
                    }, 100);
                    return;
                }

                if (this._node && this._targetNode && this._targetNode.getBoundingClientRect) {
                    var targetRect = this._targetNode.getBoundingClientRect();
                    if (this._containerNode !== null) {
                        var containerRect = this._containerNode.getBoundingClientRect();
                        var containerTop = containerRect.top,
                            containerHeight = containerRect.height;
                        var targetTop = targetRect.top,
                            targetHeight = targetRect.height;

                        if (targetTop + targetHeight < containerTop) {
                            this.hide();
                            return;
                        } else if (containerTop + containerHeight < targetTop + targetHeight) {
                            // @TODO popup should be rotated
                            this.hide();
                            return;
                        }
                    }

                    var rect = this._node.getBoundingClientRect();

                    var _document$documentEle = document.documentElement.getBoundingClientRect(),
                        documentWidth = _document$documentEle.width;

                    var width = rect.width,
                        height = rect.height;
                    var top = targetRect.top,
                        left = targetRect.left,
                        targetWidth = targetRect.width;

                    var pos = this.position(rect, targetRect);

                    var topOffset = pos.top,
                        _pos$left = pos.left,
                        leftOffset = _pos$left === undefined ? null : _pos$left,
                        _pos$right = pos.right,
                        rightOffset = _pos$right === undefined ? null : _pos$right,
                        override = pos.override,
                        _pos$position = pos.position,
                        position = _pos$position === undefined ? this.props.fixedPosition ? 'fixed' : '' : _pos$position;

                    var _ref = override || {},
                        _ref$top = _ref.top,
                        overrideTop = _ref$top === undefined ? null : _ref$top,
                        _ref$left = _ref.left,
                        overrideLeft = _ref$left === undefined ? null : _ref$left,
                        _ref$right = _ref.right,
                        overrideRight = _ref$right === undefined ? null : _ref$right,
                        _ref$width = _ref.width,
                        overrideWidth = _ref$width === undefined ? null : _ref$width,
                        _ref$height = _ref.height,
                        overrideHeight = _ref$height === undefined ? null : _ref$height;

                    var cssText = [];

                    var isAbsolute = !position || ('' + position).toLowerCase() === 'absolute';
                    if (position && !isAbsolute) {
                        cssText.push('position: ' + position + '!important');
                    }

                    var _ref2 = isAbsolute ? window : {},
                        _ref2$pageXOffset = _ref2.pageXOffset,
                        pageXOffset = _ref2$pageXOffset === undefined ? 0 : _ref2$pageXOffset,
                        _ref2$pageYOffset = _ref2.pageYOffset,
                        pageYOffset = _ref2$pageYOffset === undefined ? 0 : _ref2$pageYOffset;

                    var styleWidth = overrideWidth !== null ? overrideWidth : width;
                    if (styleWidth) {
                        if (typeof styleWidth === 'number') {
                            styleWidth = Math.ceil(styleWidth) + 'px';
                        }
                        cssText.push('width: ' + styleWidth + '!important');
                    }

                    var styleHeight = overrideHeight !== null ? overrideHeight : height;
                    if (styleHeight) {
                        if (typeof styleHeight === 'number') {
                            styleHeight = Math.ceil(styleHeight) + 'px';
                        }
                        cssText.push('height: ' + styleHeight + '!important');
                    }

                    if (overrideTop !== null) {
                        cssText.push('top: ' + Math.round(pageYOffset + overrideTop) + 'px!important');
                    } else {
                        cssText.push('top: ' + Math.round(pageYOffset + top + topOffset) + 'px!important');
                    }

                    if (overrideLeft != null) {
                        cssText.push('left: ' + Math.round(pageXOffset + overrideLeft) + 'px!important');
                    } else if (leftOffset != null) {
                        cssText.push('left: ' + Math.round(pageXOffset + left + leftOffset) + 'px!important');
                    } else if (overrideRight != null) {
                        cssText.push('right: ' + Math.round(documentWidth - (pageXOffset + overrideRight)) + 'px!important');
                    } else if (rightOffset != null) {
                        cssText.push('right: ' + Math.round(documentWidth - (pageXOffset + left + targetWidth + rightOffset)) + 'px!important');
                    }

                    this._node.style.cssText = cssText.join(';');

                    if (this._shouldFireOnShow) {
                        this.fireShowEvents(this._onShowEventObject);
                        this._shouldFireOnShow = false;
                    }

                    if (this._shouldFocus) {
                        this._node.focus();
                    }
                }
            }
        }, {
            key: 'throttledSetPosition',
            value: function throttledSetPosition() {
                if (this.state.visible) {
                    window.requestAnimationFrame(this.setPosition.bind(this));
                }
            }
        }, {
            key: 'toggle',
            value: function toggle(visible, event) {
                var v = visible;
                var e = event;
                if (visible != null && (typeof visible === 'undefined' ? 'undefined' : babelHelpers.typeof(visible)) === 'object') {
                    e = v;
                    v = null;
                }
                v = v != null ? !!v : !this.state.visible;
                if (this.state.visible !== v) {
                    if (v) {
                        this.show(e);
                    } else {
                        this.hide(e);
                    }
                }
            }
        }, {
            key: 'show',
            value: function show(e) {
                if (!e) {
                    // no event, custom call
                    this.setOnShowState(e);
                    return;
                }

                var relatedTarget = e.relatedTarget;
                var targetNode = this.targetNode;

                if (targetNode && targetNode !== relatedTarget && !targetNode.contains(relatedTarget)) {
                    this.setOnShowState(e);
                }
            }
        }, {
            key: 'setOnShowState',
            value: function setOnShowState(e) {
                var _this5 = this;

                var focusOnShow = this.props.focusOnShow;

                this.setState(function (prevState) {
                    if (!prevState.visible) {
                        _this5._shouldFireOnShow = true;
                        _this5._shouldFocus = focusOnShow;
                        _this5._onShowEventObject = e;
                    }
                    return babelHelpers.extends({}, prevState, {
                        visible: true
                    });
                });
            }
        }, {
            key: 'hide',
            value: function hide(e) {
                var _this6 = this;

                if (!e) {
                    // no event, custom call
                    this.setState(function (prevState) {
                        return babelHelpers.extends({}, prevState, {
                            visible: false
                        });
                    });
                    return;
                }

                var relatedTarget = e.relatedTarget;
                var targetNode = this.targetNode;

                if (targetNode && targetNode !== relatedTarget && (window === relatedTarget || !targetNode.contains(relatedTarget))) {
                    this.setState(function (prevState) {
                        if (prevState.visible) {
                            _this6.fireHideEvents(e);
                        }
                        return babelHelpers.extends({}, prevState, {
                            visible: false
                        });
                    });
                }
            }
        }, {
            key: 'fireShowEvents',
            value: function fireShowEvents(e) {
                var _props = this.props,
                    onShow = _props.onShow,
                    onToggle = _props.onToggle;

                if (typeof onShow === 'function') {
                    onShow.call(this, e, this);
                }
                if (typeof onToggle === 'function') {
                    onToggle.call(this, true, e, this);
                }
            }
        }, {
            key: 'fireHideEvents',
            value: function fireHideEvents(e) {
                var _props2 = this.props,
                    onHide = _props2.onHide,
                    onToggle = _props2.onToggle;

                if (typeof onHide === 'function') {
                    onHide.call(this, e, this);
                }
                if (typeof onToggle === 'function') {
                    onToggle.call(this, false, e, this);
                }
            }
        }, {
            key: 'targetOf',
            value: function targetOf(e) {
                var c = e.currentTarget,
                    r = e.relatedTarget;

                var t = r || document.activeElement;
                return t && (c && c.contains(t) || this._node && this._node.contains(t));
            }
        }, {
            key: 'isVisibleByProps',
            value: function isVisibleByProps() {
                var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
                var hidden = props.hidden,
                    visible = props.visible;

                return !(typeof hidden === 'undefined' ? !visible : hidden);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this7 = this;

                var visible = this.state.visible;

                if (!visible || isServer) {
                    return null;
                }

                var _props3 = this.props,
                    _props3$className = _props3.className,
                    className = _props3$className === undefined ? '' : _props3$className,
                    children = _props3.children,
                    focusOnShow = _props3.focusOnShow;


                var classNames = [_stlPopover2.default, className].filter(Boolean).join(' ');

                return _reactDom2.default.createPortal(React.createElement(
                    'div',
                    {
                        tabIndex: focusOnShow ? 0 : undefined,
                        className: classNames,
                        ref: function ref(node) {
                            _this7._node = node;
                        },
                        onClick: function onClick(e) {
                            return e.target === _this7._node && _this7.hide(e);
                        }
                    },
                    children
                ), this.wrapperNode);
            }
        }, {
            key: 'isVisible',
            get: function get() {
                return this.state.visible;
            }
        }, {
            key: 'targetNode',
            get: function get() {
                if (!this._targetNode) {
                    var target = this.props.for;

                    if (target) {
                        if (typeof target !== 'string') {
                            this._targetNode = target;
                            return this._targetNode;
                        }

                        this._targetNode = document.getElementById(target);
                        if (this._targetNode) {
                            return this._targetNode;
                        }

                        var targetNodes = document.getElementsByClassName(target) || document.querySelector(target);
                        if (targetNodes && targetNodes.length) {
                            this._targetNode = targetNodes.item(0);
                            return this._targetNode;
                        }
                    }

                    // searching for real node instead of react fiber node
                    var contentNode = this;
                    while (contentNode && !contentNode.getBoundingClientRect && contentNode._reactInternalFiber) {
                        var fiberNode = contentNode._reactInternalFiber.return;
                        if (!fiberNode) {
                            break; // broken chain
                        }
                        var stateNode = fiberNode.stateNode,
                            chainNode = fiberNode.return;

                        var chainStateNode = chainNode && chainNode.stateNode;
                        contentNode = stateNode || chainStateNode;
                    }
                    if (contentNode && !contentNode.getBoundingClientRect) {
                        contentNode = document.documentElement;
                    }
                    this._targetNode = contentNode;
                    this._targetNode.popoverNode = this._node; // setting reference node
                }

                return this._targetNode;
            }
        }, {
            key: 'containerNode',
            get: function get() {
                var container = this.props.container;

                if (!container) {
                    return null;
                }

                if (!this._containerNode) {
                    if (container) {
                        if (typeof container !== 'string') {
                            this._containerNode = container;
                            return this._containerNode;
                        }

                        this._containerNode = document.getElementById(container);
                        if (this._containerNode) {
                            return this._containerNode;
                        }

                        var targetNodes = document.getElementsByClassName(container) || document.querySelector(container);
                        if (targetNodes && targetNodes.length) {
                            this._containerNode = targetNodes.item(0);
                            return this._containerNode;
                        }
                    }
                }

                return this._containerNode;
            }
        }, {
            key: 'wrapperNode',
            get: function get() {
                if (!this._wrapperNode) {
                    var wrapperNodes = document.getElementsByClassName(wrapperClassName);
                    if (wrapperNodes && wrapperNodes.length) {
                        this._wrapperNode = wrapperNodes.item(0);
                    }
                    if (!this._wrapperNode) {
                        this._wrapperNode = document.createElement('div');
                        this._wrapperNode.classList.add(wrapperClassName);
                        document.body.appendChild(this._wrapperNode);
                    }
                }
                return this._wrapperNode;
            }
        }], [{
            key: 'attachTo',
            value: function attachTo(component, callback) {
                return function (ref) {
                    component.node = ref; // left for backward compatibility
                    component.ref = ref;
                    component.popover = ref && ref.popover || ref;
                    if (typeof callback === 'function') {
                        callback.call(component, ref);
                    }
                };
            }
        }, {
            key: 'toggle',
            value: function toggle(component, e) {
                e.stopPropagation();
                if (component.popover) {
                    var _component$popover;

                    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                        args[_key - 2] = arguments[_key];
                    }

                    (_component$popover = component.popover).toggle.apply(_component$popover, [e].concat(args));
                }
            }
        }, {
            key: 'show',
            value: function show(component, e) {
                e.stopPropagation();
                if (component.popover) {
                    component.popover.show(e);
                }
            }
        }, {
            key: 'hide',
            value: function hide(component, e) {
                e.stopPropagation();
                if (component.popover) {
                    component.popover.hide(e);
                }
            }
        }, {
            key: 'blur',
            value: function blur(component, e) {
                e.stopPropagation();
                if (component.popover && !component.popover.targetOf(e)) {
                    component.popover.hide(e);
                }
            }
        }]);
        return Popover;
    }(React.PureComponent);

    exports.default = Popover;
});define('momondo/common/icon/_svg_/share-alternate', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><path d=\"M145 150H55c-8.3 0-15-6.7-15-15v-30c0-2.8 2.2-5 5-5s5 2.2 5 5v30c0 2.8 2.2 5 5 5h90c2.8 0 5-2.2 5-5v-30c0-2.8 2.2-5 5-5s5 2.2 5 5v30c0 8.3-6.7 15-15 15zm-45-30c-2.8 0-5-2.2-5-5V65.4L78.1 78.9c-2.2 1.7-5.3 1.4-7-.8c-1.7-2.2-1.4-5.3.8-7l25-20c1.8-1.5 4.5-1.5 6.3 0l25 20c2.2 1.7 2.5 4.9.8 7c-1.7 2.2-4.9 2.5-7 .8l-17-13.5V115c0 2.8-2.2 5-5 5z\"/></svg> ";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "momondo/common/icon/_svg_/share-alternate"}, params || {}, {svg: svgStr})); };
});define('default/common/widgets/checkbox/_svg_/checkmark-uikit', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg width=\"16px\" height=\"16px\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#1E93F5\"> <path transform=\"translate(1.000000, 2.000000)\" d=\"M10.5,0 L3.81,7.66281248 L1.3125,5.43115832 L0,7.05490669 L2.88,9.63050754 C3.47395721,10.1690151 4.3603377,10.1125777 4.89,9.50252738 L12,1.44777564 L10.5,0 Z\"></path> </svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/common/widgets/checkbox/_svg_/checkmark-uikit"}, params || {}, {svg: svgStr})); };
});define("default/moment", ["exports","module","context"], function (exports, module, context) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    get: function() { return true; },
    set: function() {}
});



module.exports = moment;
});
define("default/common/utilities/react/Utils", ['exports', 'common/utilities/react/Constants'], function (exports, _Constants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.userAgentUtils = undefined;
    exports.serialize = serialize;
    exports.isEmptyString = isEmptyString;
    exports.isEmptyObject = isEmptyObject;
    exports.encodeLocation = encodeLocation;
    exports.appendScript = appendScript;
    exports.getScaledImage = getScaledImage;
    exports.loadImage = loadImage;
    exports.msIEVersion = msIEVersion;
    exports.capitalizeFirstLetter = capitalizeFirstLetter;
    exports.getPropsNoGlobal = getPropsNoGlobal;


    function removeAccentedChars(s) {
        return s.replace(_Constants.translateRe, function (match) {
            return _Constants.translate[match];
        });
    } /* global navigator */
    /* eslint-disable */

    function serialize(params) {
        var str = [];
        Object.keys(params).forEach(function (key) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
            }
        });
        return str.join('&');
    }

    function isEmptyString(val) {
        if (val != null) {
            return typeof val === 'string' && val.trim() === '';
        }
        return true;
    }

    function isEmptyObject(obj) {
        if (obj == null) return true;
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;
        if ((typeof obj === 'undefined' ? 'undefined' : babelHelpers.typeof(obj)) !== 'object') return true;

        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i += 1) {
            if (Object.prototype.hasOwnProperty.call(obj, keys[i])) {
                return false;
            }
        }
        return true;
    }

    function encodeLocation(location, global) {
        var url = removeAccentedChars(location.replace(/, /g, ',').replace(/ - /g, ',').replace(/ /g, '-'));

        if (!(typeof global !== 'undefined' && typeof global.useFullSearchUrl !== 'undefined' && global.useFullSearchUrl === true)) {
            url = url.replace(/[^A-Za-z0-9_\-,.]/g, '');
        }

        return url;
    }

    function appendScript(url, callback) {
        var script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.onload = script.onreadystatechange = function (_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                script.onload = script.onreadystatechange = null;
                script = undefined;
                if (!isAbort) {
                    if (callback) callback();
                }
            }
        };
        window.document.getElementsByTagName('head')[0].appendChild(script);
    }

    function getScaledImage(preview, factor) {
        var height = preview.height,
            width = preview.width;

        var canvas = window.document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = width * factor;
        canvas.height = height * factor;
        context.drawImage(preview, 0, 0, width * factor, height * factor);
        return canvas.toDataURL();
    }

    function loadImage(imageUrl, callback, error, crossOrigin) {
        var image = new window.Image();
        if (typeof crossOrigin === 'undefined' || crossOrigin) {
            image.crossOrigin = 'Anonymous';
        }
        image.onload = function () {
            callback(image);
        };
        image.error = function () {
            error();
        };
        image.src = imageUrl;
    }

    function msIEVersion() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        return 0;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getPropsNoGlobal(props) {
        var global = props.global,
            other = babelHelpers.objectWithoutProperties(props, ['global']);

        return other;
    }

    var userAgentUtils = exports.userAgentUtils = {
        getUserAgent: function getUserAgent() {
            return navigator.userAgent;
        },
        isAndroid: function isAndroid() {
            return (/Android/i.test(userAgentUtils.getUserAgent()) && !userAgentUtils.isWindows()
            );
        },
        isBlackBerry: function isBlackBerry() {
            return (/BlackBerry|BB10|PlayBook/i.test(userAgentUtils.getUserAgent())
            );
        },
        isIPhone: function isIPhone() {
            return (/iPhone/i.test(userAgentUtils.getUserAgent()) && !userAgentUtils.isIPad() && !userAgentUtils.isWindows()
            );
        },
        isIPod: function isIPod() {
            return (/iPod/i.test(userAgentUtils.getUserAgent())
            );
        },
        isIPad: function isIPad() {
            return (/iPad/i.test(userAgentUtils.getUserAgent())
            );
        },
        isIOS: function isIOS() {
            return userAgentUtils.isIPad() || userAgentUtils.isIPod() || userAgentUtils.isIPhone();
        },
        isOpera: function isOpera() {
            return (/Opera Mini/i.test(userAgentUtils.getUserAgent())
            );
        },
        isWindows: function isWindows() {
            return (/Windows Phone|IEMobile|WPDesktop/i.test(userAgentUtils.getUserAgent())
            );
        },
        isKindleFire: function isKindleFire() {
            return (/Kindle Fire|Silk|KFAPWA|KFSOWI|KFJWA|KFJWI|KFAPWI|KFAPWI|KFOT|KFTT|KFTHWI|KFTHWA|KFASWI|KFTBWI|KFMEWI|KFFOWI|KFSAWA|KFSAWI|KFARWI/i.test(userAgentUtils.getUserAgent())
            );
        },
        any: function any() {
            return userAgentUtils.isAndroid() || userAgentUtils.isBlackBerry() || userAgentUtils.isIOS() || userAgentUtils.isOpera() || userAgentUtils.isWindows();
        }
    };

    var Utils = {
        serialize: serialize,
        isEmptyObject: isEmptyObject,
        isEmptyString: isEmptyString,
        encodeLocation: encodeLocation,
        appendScript: appendScript,
        getScaledImage: getScaledImage,
        loadImage: loadImage,
        msIEVersion: msIEVersion,
        capitalizeFirstLetter: capitalizeFirstLetter,
        getPropsNoGlobal: getPropsNoGlobal
    };

    exports.default = Utils;
});define('momondo/common/icon/_svg_/chevron-stroke', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"100%\" height=\"100%\"> <path fill=\"none\" stroke=\"currentColor\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M45 80l55 50 55-50\"></path> </svg> ";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "momondo/common/icon/_svg_/chevron-stroke"}, params || {}, {svg: svgStr})); };
});define("default/flights/results/react/FlexMatrixStandardHeader", ['exports', 'prop-types', 'stl!flights.results.FlexMatrixStandardHeader.Heading', 'stl!flights.results.FlexMatrixStandardHeader.Chevron', 'stl!flights.results.FlexMatrixStandardHeader.Chevron--opened', 'stl!flights.results.FlexMatrixStandardHeader.Container', 'stl!flights.results.FlexMatrixStandardHeader.Container--opened', 'stl!flights.results.FlexMatrixStandardHeader.Container--closed', 'stl!flights.results.FlexMatrixStandardHeader.SubHeading', 'stl!flights.results.FlexMatrixStandardHeader.SubHeading--opened', 'stl!flights.results.FlexMatrixStandardHeader.SubHeading--closed', 'property!horizon.flights.results.flexMatrix.presentation', 'string!flights/results//FLEX_MATRIX_NEO_HEADING', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_ACCORDION_CLOSED', 'common/icon/react/SvgIcon', 'flights/results/react/FlexMatrixBar', 'flights/results/react/constants/FlexMatrixConstants'], function (exports, _propTypes, _stlHeading, _stlChevron, _stlChevronOpened, _stlContainer, _stlContainerOpened, _stlContainerClosed, _stlSubHeading, _stlSubHeadingOpened, _stlSubHeadingClosed, _propertyHorizonFlightsResultsFlexMatrix, _stringFLEX_MATRIX_NEO_HEADING, _stringFLEX_MATRIX_NEO_HEADING_ACCORDION_CLOSED, _SvgIcon, _FlexMatrixBar, _FlexMatrixConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _stlHeading2 = babelHelpers.interopRequireDefault(_stlHeading);

    var _stlChevron2 = babelHelpers.interopRequireDefault(_stlChevron);

    var _stlChevronOpened2 = babelHelpers.interopRequireDefault(_stlChevronOpened);

    var _stlContainer2 = babelHelpers.interopRequireDefault(_stlContainer);

    var _stlContainerOpened2 = babelHelpers.interopRequireDefault(_stlContainerOpened);

    var _stlContainerClosed2 = babelHelpers.interopRequireDefault(_stlContainerClosed);

    var _stlSubHeading2 = babelHelpers.interopRequireDefault(_stlSubHeading);

    var _stlSubHeadingOpened2 = babelHelpers.interopRequireDefault(_stlSubHeadingOpened);

    var _stlSubHeadingClosed2 = babelHelpers.interopRequireDefault(_stlSubHeadingClosed);

    var _stringFLEX_MATRIX_NEO_HEADING2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING);

    var _stringFLEX_MATRIX_NEO_HEADING_ACCORDION_CLOSED2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_ACCORDION_CLOSED);

    var _SvgIcon2 = babelHelpers.interopRequireDefault(_SvgIcon);

    var FlexMatrixStandardHeader = function (_React$Component) {
        babelHelpers.inherits(FlexMatrixStandardHeader, _React$Component);

        function FlexMatrixStandardHeader() {
            babelHelpers.classCallCheck(this, FlexMatrixStandardHeader);
            return babelHelpers.possibleConstructorReturn(this, (FlexMatrixStandardHeader.__proto__ || Object.getPrototypeOf(FlexMatrixStandardHeader)).apply(this, arguments));
        }

        babelHelpers.createClass(FlexMatrixStandardHeader, [{
            key: 'render',
            value: function render() {
                var accordionOpen = this.props.accordionOpen;

                return babelHelpers.jsx(_FlexMatrixBar.FlexMatrixBar, {
                    className: _stlContainer2.default + ' ' + (accordionOpen ? _stlContainerOpened2.default : _stlContainerClosed2.default),
                    isv2: _propertyHorizonFlightsResultsFlexMatrix.getString === _FlexMatrixConstants.presentationKeys.V2 ? 1 : 0
                }, void 0, babelHelpers.jsx('span', {
                    className: _stlHeading2.default
                }, void 0, (0, _stringFLEX_MATRIX_NEO_HEADING2.default)()), babelHelpers.jsx('span', {
                    className: _stlSubHeading2.default + ' ' + (accordionOpen ? _stlSubHeadingOpened2.default : _stlSubHeadingClosed2.default)
                }, void 0, (0, _stringFLEX_MATRIX_NEO_HEADING_ACCORDION_CLOSED2.default)()), babelHelpers.jsx(_SvgIcon2.default, {
                    name: 'chevron',
                    className: _stlChevron2.default + ' ' + (accordionOpen && _stlChevronOpened2.default),
                    width: '19',
                    height: '12'
                }));
            }
        }]);
        return FlexMatrixStandardHeader;
    }(React.Component);

    exports.default = FlexMatrixStandardHeader;


    FlexMatrixStandardHeader.propTypes = {
        accordionOpen: _propTypes2.default.bool.isRequired
    };
});define("default/flights/results/react/utils/FlexMatrixClientBuilder", ['exports', 'moment', 'common/utils/react/logger', 'flights/results/react/constants/FlexMatrixConstants', 'common/react/constants/globals'], function (exports, _moment, _logger, _FlexMatrixConstants, _globals) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.makeMatrixEntryKey = makeMatrixEntryKey;
    exports.isoDateToMoment = isoDateToMoment;
    exports.predictionDateToCanonical = predictionDateToCanonical;
    exports.canonicalDateToMoment = canonicalDateToMoment;
    exports.filterDateToDayOfWeek = filterDateToDayOfWeek;
    exports.buildPlaceholderPollData = buildPlaceholderPollData;
    exports.buildPredictedMatrixEntries = buildPredictedMatrixEntries;

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    var _logger2 = babelHelpers.interopRequireDefault(_logger);

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    /* eslint-disable no-undef */
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable prefer-rest-params */

    var cachedPlaceholderPollData = {};

    function makeMatrixEntryKey(departDateCanon, returnDateCanon) {
        return returnDateCanon ? returnDateCanon + '_' + departDateCanon : departDateCanon;
    }

    /**
     * Memoized/Cached value getters
     */

    var ISO_DATE_REGEX_PART = _globals2.default.dateFormats.isoDate.replace(/\w/g, '\\d') + '[-0-9A-z]{0,}';
    var URL_DEPART_DATE_RT_REGEX = new RegExp('(^.+/)(' + ISO_DATE_REGEX_PART + ')(/' + ISO_DATE_REGEX_PART + ')', 'g');
    var URL_DEPART_DATE_OW_REGEX = new RegExp('(^.+/)(' + ISO_DATE_REGEX_PART + ')', 'g');
    var URL_RETURN_DATE_REGEX = new RegExp('(^.+/' + ISO_DATE_REGEX_PART + '/)(' + ISO_DATE_REGEX_PART + ')', 'g');

    var cachedReplacedRTDepartPaths = {};
    function replaceRTDepartDate(pathname, newUrlDepart) {
        if (!cachedReplacedRTDepartPaths[newUrlDepart]) {
            cachedReplacedRTDepartPaths[newUrlDepart] = pathname.replace(URL_DEPART_DATE_RT_REGEX, function (matched, group1, _group2, group3) {
                return group1 + newUrlDepart + group3;
            });
        }
        return cachedReplacedRTDepartPaths[newUrlDepart];
    }

    var cachedMomentIsoDates = {};
    function isoDateToMoment(date) {
        if (cachedMomentIsoDates[date]) {
            return cachedMomentIsoDates[date];
        }
        return (0, _moment2.default)(date, _globals2.default.dateFormats.isoDate);
    }

    var cachedPredictionCanonicalDates = {};
    function predictionDateToCanonical(date) {
        if (cachedPredictionCanonicalDates[date]) {
            return cachedPredictionCanonicalDates[date];
        }
        return isoDateToMoment(date).format(_FlexMatrixConstants.flexFilterDateFormat);
    }

    var cachedMomentsFromCanonical = {};
    function canonicalDateToMoment(date) {
        if (!cachedMomentsFromCanonical[date]) {
            cachedMomentsFromCanonical[date] = (0, _moment2.default)(date, _FlexMatrixConstants.flexFilterDateFormat);
        }
        return cachedMomentsFromCanonical[date];
    }

    var cachedFilterDayOfWeekDates = {};
    function filterDateToDayOfWeek(filterDate) {
        if (!cachedFilterDayOfWeekDates[filterDate]) {
            var dateMoment = canonicalDateToMoment(filterDate);
            cachedFilterDayOfWeekDates[filterDate] = dateMoment.format(_globals2.default.dateFormats.dayOfWeek);
        }
        return cachedFilterDayOfWeekDates[filterDate];
    }

    function clearDateCache() {
        cachedReplacedRTDepartPaths = {};
        cachedMomentIsoDates = {};
        cachedPredictionCanonicalDates = {};
        cachedMomentsFromCanonical = {};
        cachedFilterDayOfWeekDates = {};
    }

    function createAxisLabel(momentDate, departStartOfWeek /* number or moment object */, checked) {
        var queryDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var _daysFromWeek = typeof departStartOfWeek === 'number' ? departStartOfWeek : momentDate.diff(departStartOfWeek, 'days');
        return {
            checked: checked,
            disabled: false,
            _daysFromWeek: _daysFromWeek,
            filterValue: momentDate.format(_FlexMatrixConstants.flexFilterDateFormat),
            queryDate: queryDate
        };
    }

    var baseMatrixEntry = {
        allFlights: {
            categoryThresholds: null,
            cheapestFlight: null,
            displayPrice: null,
            price: 0,
            priceCategory: _FlexMatrixConstants.priceCategories.DEFAULT,
            similarFlights: 0
        },
        departFilterValue: '',
        returnFilterValue: '',
        queryDate: false,
        selected: false,
        disabled: false,
        prediction: false,
        placeholder: true,
        searchUrl: null
    };

    /*
     * Create a placeholder dataset for FlexMatrix.data.
     * If departCodeCanon/returnCodeCanon is passed, the correct dates will be created for each axis label.
     * If departPlusMinus/returnPlusMinus is passed, dates outside flex range will be disabled.
     */
    function buildPlaceholderPollData(departCodeCanon, returnCodeCanon, departPlusMinusArg, returnPlusMinusArg) {
        var displayMode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _FlexMatrixConstants.displayModes.NONE;

        var key = Array.from(arguments).join('_');
        if (cachedPlaceholderPollData[key]) {
            return cachedPlaceholderPollData[key];
        }
        var model = {
            departLabels: [],
            matrixEntries: {},
            returnLabels: [],
            disableNonstopToggle: false,
            placeholder: true,
            roundTrip: !departCodeCanon || !!returnCodeCanon,
            selectedDateCount: 0
        };

        var departPlusMinus = departPlusMinusArg || 'plusminusthree';
        var returnPlusMinus = returnPlusMinusArg;
        var isFlexForAll = false;
        if ([_FlexMatrixConstants.displayModes.FLEX_DATE_PREDICTIONS, _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER].includes(displayMode)) {
            var exactDateSearch = departPlusMinus === 'exact' && (!returnPlusMinus || returnPlusMinus === 'exact');
            if (_FlexMatrixConstants.displayModes.FLEX_DATE_PREDICTIONS === displayMode) {
                isFlexForAll = exactDateSearch;
                departPlusMinus = 'plusminusthree';
                returnPlusMinus = model.roundTrip ? 'plusminusthree' : returnPlusMinus;
            } else if (_FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER === displayMode && exactDateSearch) {
                isFlexForAll = true;
                if (!model.roundTrip) {
                    departPlusMinus = 'plusminustwo';
                } else if (returnPlusMinus === 'exact') {
                    departPlusMinus = 'plusminusone';
                    returnPlusMinus = 'plusminusone';
                }
            }
        }
        if (typeof returnPlusMinus === 'undefined') {
            returnPlusMinus = 'plusminusthree';
        }

        var _flexDateNumericalRan = babelHelpers.slicedToArray(_FlexMatrixConstants.flexDateNumericalRanges[departPlusMinus], 2),
            departStartOffset = _flexDateNumericalRan[0],
            departEndOffset = _flexDateNumericalRan[1];

        var queryDepart = departCodeCanon ? (0, _moment2.default)(departCodeCanon) : (0, _moment2.default)().add(-1 * departStartOffset, 'days');
        var departMoment = queryDepart ? (0, _moment2.default)(departCodeCanon).add(departStartOffset, 'days') : (0, _moment2.default)();
        var departStartOfWeekMoment = (0, _moment2.default)(departMoment).startOf('week');
        var queryReturn = void 0;

        for (var i = departStartOffset; i <= departEndOffset; i += 1) {
            var checked = !isFlexForAll || queryDepart.get('date') === departMoment.get('date');
            model.departLabels.push(createAxisLabel(departMoment, departStartOfWeekMoment, checked, queryDepart.isSame(departMoment)));
            departMoment.add(1, 'days');
        }

        if (model.roundTrip) {
            var _flexDateNumericalRan2 = babelHelpers.slicedToArray(_FlexMatrixConstants.flexDateNumericalRanges[returnPlusMinus], 2),
                returnStartOffset = _flexDateNumericalRan2[0],
                returnEndOffset = _flexDateNumericalRan2[1];

            var returnMoment = returnCodeCanon ? (0, _moment2.default)(returnCodeCanon).add(returnStartOffset, 'days') : (0, _moment2.default)().add(departEndOffset + returnStartOffset, 'days');
            queryReturn = returnCodeCanon ? (0, _moment2.default)(returnCodeCanon) : (0, _moment2.default)().add(-1 * returnStartOffset, 'days');

            for (var _i = returnStartOffset; _i <= returnEndOffset; _i += 1) {
                var _checked = !isFlexForAll || queryReturn.get('date') === returnMoment.get('date');
                model.returnLabels.push(createAxisLabel(returnMoment, departStartOfWeekMoment, _checked, queryReturn.isSame(returnMoment)));
                returnMoment.add(1, 'days');
            }
        } else {
            model.returnLabels = [{}];
        }

        model.departLabels.forEach(function (departLabel) {
            return model.returnLabels.forEach(function (returnLabel) {
                var dateRange = typeof returnLabel.daysFromWeek === 'undefined' ? 1 : returnLabel._daysFromWeek - departLabel._daysFromWeek;
                var selected = departLabel.checked && (!returnLabel || returnLabel.checked);
                if (selected) {
                    model.selectedDateCount += 1;
                }
                model.matrixEntries[makeMatrixEntryKey(departLabel.filterValue, returnLabel.filterValue)] = babelHelpers.extends({}, baseMatrixEntry, {
                    departFilterValue: departLabel.filterValue,
                    returnFilterValue: returnLabel.filterValue || '',
                    departDaysAway: canonicalDateToMoment(departLabel.filterValue).diff(queryDepart, 'day'),
                    returnDaysAway: returnLabel.filterValue && queryReturn ? canonicalDateToMoment(returnLabel.filterValue).diff(queryReturn, 'day') : 0,
                    queryDate: departLabel.queryDate && (!returnLabel || returnLabel.queryDate),
                    selected: selected,
                    disabled: dateRange < 0,
                    dateRange: dateRange
                });
            });
        });

        cachedPlaceholderPollData[key] = model;
        return model;
    }

    function createExactDateUrl(departFilterValue, returnFilterValue) {
        if (!departFilterValue) {
            return null; // Cell is blank
        }
        var _window$location = window.location,
            origin = _window$location.origin,
            pathname = _window$location.pathname;

        var newUrlDepart = (0, _moment2.default)(departFilterValue, _FlexMatrixConstants.flexFilterDateFormat).format(_globals2.default.dateFormats.isoDate);
        var newPathname = void 0;
        if (returnFilterValue) {
            var departReplacedPathname = replaceRTDepartDate(pathname, newUrlDepart);
            var newUrlReturn = (0, _moment2.default)(returnFilterValue, _FlexMatrixConstants.flexFilterDateFormat).format(_globals2.default.dateFormats.isoDate);
            newPathname = departReplacedPathname.replace(URL_RETURN_DATE_REGEX, function (matched, group1, _group2) {
                return group1 + newUrlReturn;
            });
        } else {
            newPathname = pathname.replace(URL_DEPART_DATE_OW_REGEX, function (matched, group1, _group2) {
                return group1 + newUrlDepart;
            });
        }
        return origin + newPathname;
    }

    /**
     * Backfill for axis labels that don't exist yet for flex prediction.
     * This shouldn't normally happen - buildPlaceholderPollData should have already built these on search start
     */
    function createDefaultPredictedAxisLabel(entryDate, entryModifier, queryDate, flexCategory) {
        new _logger2.default('FlexMatrixClientBuilder').warnInternal('axis label needed to be backfilled for date ' + entryDate + '. This shouldn\'t ever be needed.');
        var isSelected = flexCategory === 'exact' ? entryDate === queryDate : true;
        return createAxisLabel(isoDateToMoment(entryDate), entryModifier, isSelected);
    }

    function buildPredictedMatrixEntries(data, state) {
        var entries = {};
        var keyedDepartLabels = {};
        var keyedReturnLabels = {};

        var _ref = state.SearchPoll || {},
            departDateCanon = _ref.depart_date_canon,
            flexCategory = _ref.flexCategory,
            returnDateCanon = _ref.return_date_canon;

        var _ref2 = state.FlexMatrix.data || {},
            departLabels = _ref2.departLabels,
            returnLabels = _ref2.returnLabels;

        clearDateCache();
        var queryDepartMoment = canonicalDateToMoment(departDateCanon);
        var queryReturnMoment = !!returnDateCanon && canonicalDateToMoment(returnDateCanon);
        data.forEach(function (entry) {
            var startDate = predictionDateToCanonical(entry.startDate);
            var endDate = entry.endDate ? predictionDateToCanonical(entry.endDate) : null;
            var key = makeMatrixEntryKey(startDate, endDate);
            var dateRange = Math.abs(entry.startModifier) + (endDate ? Math.abs(entry.endModifier) : 0);
            var departLabel = {};
            var returnLabel = {};
            if (departLabels) {
                if (!keyedDepartLabels[startDate]) {
                    keyedDepartLabels[startDate] = departLabels.find(function (label) {
                        return label.filterValue === startDate;
                    }) || createDefaultPredictedAxisLabel(entry.startDate, entry.startModifier, departDateCanon, flexCategory);
                }
                departLabel = keyedDepartLabels[startDate];
                if (endDate) {
                    if (!keyedReturnLabels[endDate]) {
                        keyedReturnLabels[endDate] = returnLabels.find(function (label) {
                            return label.filterValue === endDate;
                        }) || createDefaultPredictedAxisLabel(entry.endDate, entry.endModifier, returnDateCanon, flexCategory);
                    }
                    returnLabel = keyedReturnLabels[endDate];
                }
            }
            entries[key] = babelHelpers.extends({}, baseMatrixEntry, {
                allFlights: babelHelpers.extends({}, baseMatrixEntry.allFlights, {
                    displayPrice: R9 && R9.Common ? R9.Common.Utils.formatPrice(entry.minPrice) : '' + entry.minPrice,
                    price: entry.minPrice,
                    // Compute with full merged matrixEntries set in FlexMatrixClientPredictionUtils
                    priceCategory: _FlexMatrixConstants.priceCategories.DEFAULT
                }),
                departFilterValue: departLabel.filterValue,
                returnFilterValue: returnLabel.filterValue,
                departDaysAway: canonicalDateToMoment(departLabel.filterValue).diff(queryDepartMoment, 'day'),
                returnDaysAway: returnLabel.filterValue && queryReturnMoment ? canonicalDateToMoment(returnLabel.filterValue).diff(queryReturnMoment, 'day') : 0,
                queryDate: departLabel.queryDate && !!returnLabel.queryDate,
                selected: !!departLabel.checked && !!returnLabel.checked,
                disabled: dateRange < 0,
                prediction: true,
                placeholder: false,
                searchUrl: createExactDateUrl(departLabel.filterValue, returnLabel.filterValue),
                dateRange: dateRange
            });
        });
        return entries;
    }
});define("default/common/utils/react/logger", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /*
     * React wrapper for R9.logger.
     * Reverts to console methods if R9.logger isn't available.
     * If console somehow isn't available either, use mock object with noops
     */

    var noop = function noop() {
        return undefined;
    };

    var standardConsolePlaceholders = {
        error: noop, warn: noop, log: noop, info: noop, debug: noop, profile: noop, profileEnd: noop, time: noop, timeEnd: noop
    };
    var customLoggerPlaceholders = {
        errorInternal: noop, warnInternal: noop, console: noop, consoleGroup: noop
    };

    exports.default = function () {
        if (typeof R9 !== 'undefined' && R9.logger) {
            return R9.logger;
        } else if (typeof console !== 'undefined') {
            return function () {
                return babelHelpers.extends({}, console, customLoggerPlaceholders);
            };
        }
        return function () {
            return babelHelpers.extends({}, standardConsolePlaceholders, customLoggerPlaceholders);
        };
    }();
});define("default/common/results/filters/react/FilterStateController", ['exports', 'common/results/filters/react/actions/FilterStateActions', 'common/results/react/constants/ResultsPageConstants', 'common/utils/react/events', 'common/utils/react/question', 'common/utils/react/logger'], function (exports, _FilterStateActions, _ResultsPageConstants, _events, _question, _logger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.resetFilters = resetFilters;
    exports.resetAllFilters = resetAllFilters;
    exports.resetAllExcept = resetAllExcept;
    exports.registerReactFilters = registerReactFilters;
    exports.unregisterReactFilters = unregisterReactFilters;
    exports.getCurrentValueSetFilterState = getCurrentValueSetFilterState;
    exports.pushValueSetFilterUpdates = pushValueSetFilterUpdates;
    exports.pushFilterUpdates = pushFilterUpdates;
    var actions = babelHelpers.interopRequireWildcard(_FilterStateActions);

    var _events2 = babelHelpers.interopRequireDefault(_events);

    var _question2 = babelHelpers.interopRequireDefault(_question);

    var _logger2 = babelHelpers.interopRequireDefault(_logger);

    var logger = new _logger2.default('common/results/filters/FilterStateController');

    var reactFilterChangedSubscriptions = {};
    var reactFilterResetSubscriptions = {};
    var anyFiltersChangedSubscription = null;
    var resetAllSubscription = null;

    function getActiveFilters() {
        var filterState = _question2.default.ask(_ResultsPageConstants.RP_QUESTION_FILTER_STATE) || {};
        return Object.keys(filterState);
    }

    function publishStateUpdates(stateUpdates) {
        var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        // Updates are manually synced so that only one request is needed
        Object.keys(stateUpdates).forEach(function (filterName) {
            _events2.default.publish('resultspage.filters.sync', {
                name: filterName,
                reset: reset,
                state: stateUpdates[filterName],
                syncPreservedState: true
            });
        });
        _events2.default.publish('filters.changed', {});
    }

    /*
     * Reset filters passed by name in the filters param.
     * Horizon-only filters' states can't be updated directly; they need to be reset with the filters.reset event.
     *
     * Actual reset filter data will come back on the next poll - isDirty, isFiltering and isUserManipulated are updated in the Redux store until then.
     * We don't know the rest of each filter state that will be in the search poll response before we get it.
     */
    function resetFilters() {
        var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var userClick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var reactStateUpdates = {};
        var horizonActiveFilters = [];
        var filterData = _question2.default.ask(_ResultsPageConstants.RP_QUESTION_FILTER_DATA);
        var resetFilterData = {};
        [].concat(filters).forEach(function (name) {
            if (filterData && filterData[name] && filterData[name].valueMap) {
                var resetValueMap = {};
                Object.keys(filterData[name].valueMap).forEach(function (key) {
                    var valueData = filterData[name].valueMap[key];
                    resetValueMap[key] = valueData.resetState;
                });
                resetFilterData[name] = babelHelpers.extends({}, filterData[name], {
                    isDirty: false,
                    isFiltering: false,
                    isUserManipulated: userClick,
                    valueMap: resetValueMap
                });
            }
            if (reactFilterResetSubscriptions[name]) {
                reactStateUpdates[name] = null;
            } else {
                horizonActiveFilters.push(name);
            }
        });
        if (typeof R9 !== 'undefined') {
            R9.redux.dispatch(actions.setFilterResetPending(filters, resetFilterData));
        }
        publishStateUpdates(reactStateUpdates, true);
        horizonActiveFilters.forEach(function (name) {
            return _events2.default.publish('filter.reset', { name: name, userClick: userClick });
        });
    }

    function resetAllFilters() {
        resetFilters(getActiveFilters());
    }

    /*
     * Reset all filters - except for filters with names in the filtersToExclude param
     */
    function resetAllExcept() {
        var filtersToExclude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var filters = [].concat(filtersToExclude);
        var activeFilters = Object.keys(getActiveFilters()).filter(function (name) {
            return !filters.includes(name);
        });
        resetFilters(activeFilters);
    }

    function registerSubscription(subscriptionMap, subscriptionName, subscriptionFn, filterName, namespace) {
        subscriptionMap[filterName] = subscriptionMap[filterName] || {};
        subscriptionMap[filterName][namespace] = _events2.default.subscribe(subscriptionName, { name: filterName }, subscriptionFn.bind(this));
    }

    function updateResetAllSubscription() {
        var subscriptionCount = Object.keys(reactFilterResetSubscriptions).length;
        if (subscriptionCount > 0 && resetAllSubscription === null) {
            resetAllSubscription = _events2.default.subscribe('filters.reset', function () {
                return resetAllFilters();
            });
        } else if (subscriptionCount === 0 && resetAllSubscription !== null) {
            _events2.default.unsubscribe('filters.reset', resetAllSubscription);
            resetAllSubscription = null;
        }
    }

    /*
     * Adds R9 event subscriptions for filters which are handled by react.
     * filterNames is an array of filter name strings
     */
    function registerReactFilters(filterNames, namespace, changeSubscription) {
        [].concat(filterNames).filter(function (name) {
            return typeof reactFilterResetSubscriptions[name] === 'undefined';
        }).forEach(function (name) {
            if (typeof changeSubscription === 'function') {
                registerSubscription(reactFilterChangedSubscriptions, 'filters.changed', function (data) {
                    return changeSubscription(data);
                }, name, namespace);
            }
            registerSubscription(reactFilterResetSubscriptions, 'filter.reset', function () {
                return resetFilters([name]);
            }, name, namespace);
        });
        if (!anyFiltersChangedSubscription) {
            anyFiltersChangedSubscription = _events2.default.subscribe('filters.changed', function (data) {
                return R9.redux.dispatch(actions.handleAnyFiltersChanged(data));
            });
        }
        updateResetAllSubscription();
    }

    function unregisterSubscription(subscriptionMap, filterName, namespace) {
        if (!subscriptionMap[filterName] || !subscriptionMap[filterName][namespace]) {
            return;
        }
        _events2.default.unsubscribe('filter.reset', subscriptionMap[filterName][namespace]);
        delete subscriptionMap[filterName][namespace];
        if (Object.keys(subscriptionMap[filterName]).length === 0) {
            delete subscriptionMap[filterName];
        }
    }

    function unregisterReactFilters(filterNames, namespace) {
        [].concat(filterNames).forEach(function (name) {
            unregisterSubscription(reactFilterChangedSubscriptions, name, namespace);
            unregisterSubscription(reactFilterResetSubscriptions, name, namespace);
        });
        updateResetAllSubscription();
    }

    /*
     * Use filtersData to build a full filterState map for ValueSetFilters.
     */
    function getCurrentValueSetFilterState(filterName, pendingFilterData) {
        var originalState = {};
        var filterData = pendingFilterData && pendingFilterData[filterName] ? pendingFilterData : _question2.default.ask(_ResultsPageConstants.RP_QUESTION_FILTER_DATA);
        if (filterData && filterData[filterName]) {
            if (filterData[filterName].valueMap) {
                Object.keys(filterData[filterName].valueMap).forEach(function (key) {
                    var valueData = filterData[filterName].valueMap[key];
                    originalState[key] = valueData.selected;
                });
            } else if (window.R9 && window.R9.reactDevMode) {
                logger.debug('filterName ' + filterName + ' passed to getCurrentValueSetFilterState has no valueMap.\n                Is it a value set filter?');
            }
        }
        return originalState;
    }

    /*
     * Push updates to the current filter state, triggering a search poll with the new filter state applied.
     * The state is converted to filtersData by the filter action to be used by the redux store before the ajax request is finished.
     *     - If pendingFilterData includes a filter to update, it'll be used instead (pending updates aren't reflected in filtersData)
     *
     * The stateUpdateFunctions param should be an object of filter names mapped to their state updater functions.
     * These functions take the current filterState and update it before being published
     * The format is: { filterName: function(original_filter_state), }
     */

    function buildValueSetStateUpdates(filterStateThunks, pendingFilterData) {
        var newState = {};
        Object.keys(filterStateThunks).forEach(function (filterName) {
            var originalState = getCurrentValueSetFilterState(filterName, pendingFilterData);
            newState[filterName] = filterStateThunks[filterName](originalState) || originalState;
        });
        return newState;
    }

    /*
     * Push updates to the current filter state, triggering a search poll with the new filter state applied.
     * The state is converted to filtersData by the filter action to be used by the redux store before the ajax request is finished.
     *
     * The stateUpdateFunctions param should be an object of filter names mapped to their state updater functions.
     * These functions take the current filterState and update it before being published
     * The format is: { filterName: function(original_filter_state), }
     */

    function pushValueSetFilterUpdates(stateUpdateFunctions, pendingFilterData) {
        var stateUpdates = buildValueSetStateUpdates(stateUpdateFunctions, pendingFilterData);
        if (typeof R9 !== 'undefined') {
            R9.redux.dispatch(actions.updateValueSetFilterData(stateUpdates));
        }
        publishStateUpdates(stateUpdates);
    }

    function buildStateUpdates(filterStateThunks) {
        var originalState = _question2.default.ask(_ResultsPageConstants.RP_QUESTION_FILTER_STATE) || {};
        var newState = {};
        Object.keys(filterStateThunks).forEach(function (filterName) {
            var originalFilterState = originalState[filterName] || {};
            newState[filterName] = filterStateThunks[filterName](originalFilterState) || originalFilterState;
        });
        return newState;
    }

    /*
     * Publish filter state updates for any type of filter.
     * The Redux store won't be updated until the search poll response comes back.
     */
    function pushFilterUpdates(stateUpdateFunctions) {
        publishStateUpdates(buildStateUpdates(stateUpdateFunctions));
    }
});define("default/flights/results/react/FlexMatrixDepartLabel", ['exports', 'flights/results/react/FlexMatrixAxisLabel', 'flights/results/react/actions/FlexMatrixActions'], function (exports, _FlexMatrixAxisLabel, _FlexMatrixActions) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _FlexMatrixAxisLabel2 = babelHelpers.interopRequireDefault(_FlexMatrixAxisLabel);

    var FlexMatrixDepartLabel = function (_React$Component) {
        babelHelpers.inherits(FlexMatrixDepartLabel, _React$Component);

        function FlexMatrixDepartLabel() {
            babelHelpers.classCallCheck(this, FlexMatrixDepartLabel);
            return babelHelpers.possibleConstructorReturn(this, (FlexMatrixDepartLabel.__proto__ || Object.getPrototypeOf(FlexMatrixDepartLabel)).apply(this, arguments));
        }

        babelHelpers.createClass(FlexMatrixDepartLabel, [{
            key: 'render',
            value: function render() {
                return React.createElement(_FlexMatrixAxisLabel2.default, babelHelpers.extends({}, this.props, {
                    checkboxId: 'FlexAxisLabelCheckbox_depart_' + this.props.axisLabel.filterValue,
                    role: 'columnheader'
                }));
            }
        }]);
        return FlexMatrixDepartLabel;
    }(React.Component);

    exports.default = ReactRedux.connect(function (_ref, _ref2) {
        var FlexMatrix = _ref.FlexMatrix;
        var axisLabel = _ref2.axisLabel,
            filterName = _ref2.filterName,
            fullWidth = _ref2.fullWidth,
            uiStateKey = _ref2.uiStateKey;
        return {
            axisLabel: axisLabel,
            filterName: filterName,
            fullWidth: fullWidth,
            uiStateKey: uiStateKey,
            allLabels: FlexMatrix.data.departLabels,
            isHovered: axisLabel.filterValue === FlexMatrix.ui.hoveredDepartCell,
            enabledLabelCount: FlexMatrix.ui.enabledDepartLabelCount
        };
    }, function (dispatch) {
        return {
            updateHoverState: function updateHoverState(departId) {
                return dispatch((0, _FlexMatrixActions.updateAxisHoverState)(departId, null));
            }
        };
    })(FlexMatrixDepartLabel);
});define("default/common/utils/react/events", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.preventDefault = preventDefault;
    exports.stopPropagation = stopPropagation;
    exports.cancelEvent = cancelEvent;
    exports.cancelNativeEvent = cancelNativeEvent;

    exports.default = function () {
        if (typeof R9 !== 'undefined' && R9.events) {
            return R9.events;
        }
        var noop = function noop() {
            return undefined;
        };
        return {
            publish: noop,
            subscribe: function subscribe() {
                var subscription = function subscription() {
                    return console.warn('subscription events not supported when R9 is not available');
                };
                subscription.priority = null;
                return subscription;
            },
            unsubscribe: noop,
            when: noop,
            ready: noop,
            unready: noop
        };
    }();

    function preventDefault(e) {
        if (e) {
            e.preventDefault();
        }
    }

    function stopPropagation(e) {
        if (e) {
            e.stopPropagation();
        }
    }

    function cancelEvent(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    function cancelNativeEvent(e) {
        cancelEvent(e);
        if (e.nativeEvent) {
            e.nativeEvent.stopImmediatePropagation();
        }
    }
});define("default/common/utils/react/presentate", ['exports', 'common/utils/react/logger'], function (exports, _logger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _logger2 = babelHelpers.interopRequireDefault(_logger);

    var logger = new _logger2.default('common/react/utils/presentate'); /*
                                                                         * Presentate
                                                                         *
                                                                         * Decorator that assigns a Component's presentation based on the passed presentation map.
                                                                         *
                                                                         * The key of the presentation to use can either be passed as the 2nd argument in the decorator,
                                                                         *     or as the 'presentation' prop passed from the parent component.
                                                                         *
                                                                         * Default presentation will be used if defined in class' 'defaultProps' or if the presentation map has a 'DEFAULT' key.
                                                                         */

    exports.default = function (presentationMap, presentationKeyArg) {
        return function (WrappedComponent) {
            return function (_React$Component) {
                babelHelpers.inherits(_class, _React$Component);

                function _class() {
                    babelHelpers.classCallCheck(this, _class);
                    return babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                }

                babelHelpers.createClass(_class, [{
                    key: 'remapPresentation',
                    value: function remapPresentation() {
                        var presentationKey = typeof presentationKeyArg === 'undefined' ? this.props.presentation : presentationKeyArg;
                        if (presentationKey && presentationMap[presentationKey]) {
                            return presentationMap[presentationKey];
                        }
                        return this.getDefaultPresentation(presentationKey);
                    }
                }, {
                    key: 'getDefaultPresentation',
                    value: function getDefaultPresentation(notFoundKey) {
                        if (WrappedComponent.defaultProps && WrappedComponent.defaultProps.presentation) {
                            var defaultPresentation = WrappedComponent.defaultProps.presentation;
                            if (typeof defaultPresentation === 'string' && presentationMap[defaultPresentation]) {
                                return presentationMap[defaultPresentation];
                            } else if ((typeof defaultPresentation === 'undefined' ? 'undefined' : babelHelpers.typeof(defaultPresentation)) === 'object' && Object.values(presentationMap).includes(defaultPresentation)) {
                                return defaultPresentation;
                            }
                        } else if (presentationMap.default || presentationMap.DEFAULT) {
                            return presentationMap.default || presentationMap.DEFAULT;
                        } else if (notFoundKey !== 'undefined' && notFoundKey !== 'null') {
                            logger.error('No presentation found for ' + notFoundKey + ' in ' + WrappedComponent.name + '\'s presentation map ', presentationMap);
                        } else {
                            logger.error('No default presentation defined for ' + WrappedComponent.name + '. Use:\n                    "static get defaultProps() {\n                        return {\n                            presentation: presentationMap.<<default presentation>>,\n                        };\n                    }"\n                    syntax in the component\'s class to define a default presentation.');
                        }
                        return {};
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        var props = babelHelpers.extends({}, this.props, { presentation: this.remapPresentation() });
                        return React.createElement(WrappedComponent, props);
                    }
                }]);
                return _class;
            }(React.Component);
        };
    };
});define("default/flights/results/react/FlexMatrixGridBlock", ['exports', 'stl!flights.results.FlexMatrixGridBlock.GridBlock', 'stl!flights.results.FlexMatrixGridBlock.GridBlock--ListItem', 'stl!flights.results.FlexMatrixGridBlock.GridBlock--Link', 'stl!flights.results.FlexMatrixGridBlock.GridBlock--AlignLeft', 'stl!flights.results.FlexMatrixGridBlock.GridBlock--AlignCenter', 'stl!flights.results.FlexMatrixGridBlock.GridBlock--v1', 'stl!flights.results.FlexMatrixGridBlock.GridBlock--v2'], function (exports, _stlGridBlock, _stlGridBlockListItem, _stlGridBlockLink, _stlGridBlockAlignLeft, _stlGridBlockAlignCenter, _stlGridBlockV, _stlGridBlockV3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexMatrixGridBlock = FlexMatrixGridBlock;
    exports.FlexMatrixGridBlockLink = FlexMatrixGridBlockLink;

    var _stlGridBlock2 = babelHelpers.interopRequireDefault(_stlGridBlock);

    var _stlGridBlockListItem2 = babelHelpers.interopRequireDefault(_stlGridBlockListItem);

    var _stlGridBlockLink2 = babelHelpers.interopRequireDefault(_stlGridBlockLink);

    var _stlGridBlockAlignLeft2 = babelHelpers.interopRequireDefault(_stlGridBlockAlignLeft);

    var _stlGridBlockAlignCenter2 = babelHelpers.interopRequireDefault(_stlGridBlockAlignCenter);

    var _stlGridBlockV2 = babelHelpers.interopRequireDefault(_stlGridBlockV);

    var _stlGridBlockV4 = babelHelpers.interopRequireDefault(_stlGridBlockV3);

    function filterEventHandlerProps(props) {
        return Object.keys(props).filter(function (propKey) {
            return propKey.startsWith('on');
        }).reduce(function (prev, currPropKey) {
            return babelHelpers.extends({}, prev, babelHelpers.defineProperty({}, currPropKey, props[currPropKey]));
        }, {});
    }

    function FlexMatrixGridBlock(props) {
        var ariaLabel = props.ariaLabel,
            children = props.children,
            className = props.className,
            id = props.id,
            isLeftAlign = props.isLeftAlign,
            isv2 = props.isv2,
            role = props.role,
            tabIndex = props.tabIndex;

        var dynamicClassNames = className + '         ' + (isLeftAlign ? _stlGridBlockAlignLeft2.default : _stlGridBlockAlignCenter2.default) + '         ' + (isv2 ? _stlGridBlockV4.default : _stlGridBlockV2.default);

        return React.createElement(
            'li',
            babelHelpers.extends({
                id: id,
                className: _stlGridBlock2.default + ' ' + _stlGridBlockListItem2.default + ' ' + dynamicClassNames,
                'aria-label': ariaLabel,
                role: role,
                tabIndex: tabIndex
            }, filterEventHandlerProps(props)),
            children
        );
    }

    function FlexMatrixGridBlockLink(props) {
        var ariaLabel = props.ariaLabel,
            children = props.children,
            className = props.className,
            href = props.href,
            id = props.id,
            isLeftAlign = props.isLeftAlign,
            isv2 = props.isv2,
            role = props.role,
            target = props.target;

        var dynamicClassNames = className + '         ' + (isLeftAlign ? _stlGridBlockAlignLeft2.default : _stlGridBlockAlignCenter2.default) + '         ' + (isv2 ? _stlGridBlockV4.default : _stlGridBlockV2.default);

        return React.createElement(
            'a',
            babelHelpers.extends({
                id: id || undefined,
                href: href,
                target: target || undefined,
                className: _stlGridBlock2.default + ' ' + _stlGridBlockLink2.default + ' ' + dynamicClassNames,
                'aria-label': ariaLabel,
                role: role,
                tabIndex: 0
            }, filterEventHandlerProps(props)),
            children
        );
    }
});define("default/flights/results/react/utils/InsightsBannerUtils", ['exports', 'flights/results/react/constants/AveragePriceInsightsConstants', 'flights/results/react/constants/FlexForAllInsightsContants', 'flights/results/react/constants/InsightsBannerConstants', 'flights/results/react/constants/NearbyAirportInsightsContants', 'common/utils/react/logger'], function (exports, _AveragePriceInsightsConstants, _FlexForAllInsightsContants, _InsightsBannerConstants, _NearbyAirportInsightsContants, _logger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getAnalyticsData = getAnalyticsData;

    var _logger2 = babelHelpers.interopRequireDefault(_logger);

    var _analyticsLabelsForAd;

    var getAnalyticsValue = function getAnalyticsValue(advantageType, recommendationType, type) {
        if (_InsightsBannerConstants.bannerTypes.FLEX_FOR_ALL === type) {
            if (advantageType === _InsightsBannerConstants.advantageTypes.ALL_SAME) {
                return 'similar';
            } else if (advantageType === _InsightsBannerConstants.advantageTypes.ALREADY_BEST) {
                return 'cheapest';
            } else if (advantageType === _InsightsBannerConstants.advantageTypes.SAVINGS && recommendationType === _FlexForAllInsightsContants.flexRecommendationTypes.BOTH) {
                return 'fullflex';
            } else if (recommendationType === _FlexForAllInsightsContants.flexRecommendationTypes.BOTH) {
                return 'doubleflex';
            } else if (recommendationType !== _InsightsBannerConstants.genericRecommendationTypes.NONE) {
                return 'singleflex';
            }
        } else if (_InsightsBannerConstants.bannerTypes.NEARBY_AIRPORTS === type) {
            if (recommendationType === _NearbyAirportInsightsContants.airportRecommendationTypes.BOTH) {
                return 'doubleairport';
            } else if (recommendationType !== _InsightsBannerConstants.genericRecommendationTypes.NONE) {
                return 'singleairport';
            }
        } else if (_InsightsBannerConstants.bannerTypes.AVERAGE_PRICE === type) {
            if (recommendationType === _AveragePriceInsightsConstants.averagePriceRecommendationTypes.AVERAGE_PRICE) {
                return 'isAverage';
            } else if (recommendationType !== _AveragePriceInsightsConstants.averagePriceRecommendationTypes.ABOVE_AVERAGE_PRICE) {
                return 'aboveAverage';
            } else if (recommendationType !== _AveragePriceInsightsConstants.averagePriceRecommendationTypes.BELOW_AVERAGE_PRICE) {
                return 'belowAverage';
            }
        }
        new _logger2.default().warn('Insights Banner: Invalid vs log value attempted for banner type ' + type + '         with advantage type ' + advantageType + ' and recommendation type ' + recommendationType);
        return '';
    };

    var analyticsLabelsForAdvantage = (_analyticsLabelsForAd = {}, babelHelpers.defineProperty(_analyticsLabelsForAd, _InsightsBannerConstants.advantageTypes.ALREADY_BEST, 'searchdate'), babelHelpers.defineProperty(_analyticsLabelsForAd, _InsightsBannerConstants.advantageTypes.ALL_SAME, 'similar'), babelHelpers.defineProperty(_analyticsLabelsForAd, _InsightsBannerConstants.advantageTypes.SAVINGS, 'alternatesavings'), babelHelpers.defineProperty(_analyticsLabelsForAd, _InsightsBannerConstants.advantageTypes.NONSTOP, 'nonstopalternate'), babelHelpers.defineProperty(_analyticsLabelsForAd, _InsightsBannerConstants.advantageTypes.NONSTOP_SAVINGS, 'nonstopsavings'), _analyticsLabelsForAd);

    function getAnalyticsData(advantageType, recommendationType) {
        var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'displayed';
        var customLabel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

        return {
            action: action,
            category: type.replace(/_/g, '').toLowerCase(),
            label: customLabel || analyticsLabelsForAdvantage[advantageType],
            value: getAnalyticsValue(advantageType, recommendationType, type)
        };
    }

    exports.default = getAnalyticsData;
});define("default/flights/results/react/FlexMatrixHeader", ['exports', 'prop-types', 'stl!flights.results.FlexMatrixHeader.FlexMatrixHeader', 'stl!flights.results.FlexMatrixHeader.FlexMatrixHeader--opened', 'stl!flights.results.FlexMatrixHeader.FlexMatrixHeader--openable', 'flights/results/react/FlexMatrixStandardHeader', 'flights/results/react/FlexForAllInsightsBanner', 'flights/results/react/actions/FlexMatrixActions', 'common/react/constants/globals', 'flights/results/react/constants/InsightsBannerConstants', 'flights/results/react/constants/FlexMatrixConstants', 'flights/results/react/constants/FlexForAllInsightsContants', 'flights/results/react/utils/InsightsBannerUtils', 'common/analytics/react/Analytics'], function (exports, _propTypes, _stlFlexMatrixHeader, _stlFlexMatrixHeaderOpened, _stlFlexMatrixHeaderOpenable, _FlexMatrixStandardHeader, _FlexForAllInsightsBanner, _FlexMatrixActions, _globals, _InsightsBannerConstants, _FlexMatrixConstants, _FlexForAllInsightsContants, _InsightsBannerUtils, _Analytics) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexMatrixHeader = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _stlFlexMatrixHeader2 = babelHelpers.interopRequireDefault(_stlFlexMatrixHeader);

    var _stlFlexMatrixHeaderOpened2 = babelHelpers.interopRequireDefault(_stlFlexMatrixHeaderOpened);

    var _stlFlexMatrixHeaderOpenable2 = babelHelpers.interopRequireDefault(_stlFlexMatrixHeaderOpenable);

    var _FlexMatrixStandardHeader2 = babelHelpers.interopRequireDefault(_FlexMatrixStandardHeader);

    var _FlexForAllInsightsBanner2 = babelHelpers.interopRequireDefault(_FlexForAllInsightsBanner);

    var actions = babelHelpers.interopRequireWildcard(_FlexMatrixActions);

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    var _Analytics2 = babelHelpers.interopRequireDefault(_Analytics);

    var FlexMatrixHeader = exports.FlexMatrixHeader = function (_React$Component) {
        babelHelpers.inherits(FlexMatrixHeader, _React$Component);

        function FlexMatrixHeader() {
            babelHelpers.classCallCheck(this, FlexMatrixHeader);

            var _this = babelHelpers.possibleConstructorReturn(this, (FlexMatrixHeader.__proto__ || Object.getPrototypeOf(FlexMatrixHeader)).call(this));

            _this.analytics = new _Analytics2.default();
            return _this;
        }

        babelHelpers.createClass(FlexMatrixHeader, [{
            key: 'updateAccordionState',
            value: function updateAccordionState(willOpen) {
                var _props = this.props,
                    dispatchAccordionOpened = _props.dispatchAccordionOpened,
                    dispatchDismissNotification = _props.dispatchDismissNotification,
                    hasBanner = _props.hasBanner,
                    hasNotification = _props.hasNotification,
                    InsightsBanner = _props.InsightsBanner;

                dispatchAccordionOpened(willOpen);
                dispatchDismissNotification();
                this.analytics.trackEvent({
                    category: 'flex-matrix',
                    action: willOpen ? 'show' : 'hide'
                });
                if (hasBanner) {
                    var _InsightsBanner$data = InsightsBanner.data,
                        advantageType = _InsightsBanner$data.advantageType,
                        recommendationType = _InsightsBanner$data.recommendationType,
                        type = _InsightsBanner$data.type;

                    var action = willOpen ? 'matrixopen' : 'matrixclose';
                    var customLabel = hasNotification && _InsightsBannerConstants.advantageTypes.SAVINGS === advantageType ? 'filtersavings' : undefined;
                    this.analytics.trackEvent((0, _InsightsBannerUtils.getAnalyticsData)(advantageType, recommendationType, type, action, customLabel));
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props2 = this.props,
                    accordionOpen = _props2.accordionOpen,
                    anyFilterApplied = _props2.anyFilterApplied,
                    displayMode = _props2.displayMode,
                    filtersChanged = _props2.filtersChanged,
                    hasBanner = _props2.hasBanner,
                    hasNotification = _props2.hasNotification,
                    hasResults = _props2.hasResults,
                    InsightsBanner = _props2.InsightsBanner,
                    queryDatesSelected = _props2.queryDatesSelected,
                    savingsMissedThreshold = _props2.savingsMissedThreshold,
                    selectedDateCount = _props2.selectedDateCount;

                var canOpen = displayMode !== _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER || InsightsBanner.ui && InsightsBanner.ui.shouldDisplay && !_InsightsBannerConstants.advantageTypeGroups.NO_DATA.includes(InsightsBanner.data.advantageType);
                return babelHelpers.jsx('button', {
                    id: 'FlexMatrixHeader',
                    className: 'Button-No-Standard-Style ' + _stlFlexMatrixHeader2.default + ' ' + (accordionOpen ? _stlFlexMatrixHeaderOpened2.default : '') + ' ' + (canOpen ? _stlFlexMatrixHeaderOpenable2.default : ''),
                    onClick: function onClick() {
                        return canOpen && _this2.updateAccordionState(!accordionOpen);
                    },
                    onKeyPress: function onKeyPress(event) {
                        return canOpen && event.keyCode === _globals2.default.keyCodes.RETURN && _this2.updateAccordionState(!accordionOpen);
                    }
                }, void 0, hasBanner ? babelHelpers.jsx(_FlexForAllInsightsBanner2.default, {
                    accordionOpen: accordionOpen,
                    anyFilterApplied: anyFilterApplied,
                    queryDatesSelected: queryDatesSelected,
                    filtersChanged: filtersChanged,
                    hasNotification: hasNotification,
                    hasResults: hasResults,
                    InsightsBanner: InsightsBanner,
                    savingsMissedThreshold: savingsMissedThreshold,
                    selectedDateCount: selectedDateCount
                }) : babelHelpers.jsx(_FlexMatrixStandardHeader2.default, {
                    accordionOpen: accordionOpen
                }));
            }
        }]);
        return FlexMatrixHeader;
    }(React.Component);

    FlexMatrixHeader.propTypes = {
        accordionOpen: _propTypes2.default.bool.isRequired,
        anyFilterApplied: _propTypes2.default.bool.isRequired,
        dispatchAccordionOpened: _propTypes2.default.func.isRequired,
        displayMode: _propTypes2.default.oneOf(Object.values(_FlexMatrixConstants.displayModes)).isRequired,
        filtersChanged: _propTypes2.default.bool,
        hasBanner: _propTypes2.default.bool.isRequired,
        hasResults: _propTypes2.default.bool.isRequired,
        InsightsBanner: _propTypes2.default.shape(_FlexForAllInsightsContants.flexInsightsBannerShape),
        queryDatesSelected: _propTypes2.default.bool,
        savingsMissedThreshold: _propTypes2.default.bool,
        selectedDateCount: _propTypes2.default.number.isRequired
    };

    FlexMatrixHeader.defaultProps = {
        filtersChanged: false,
        InsightsBanner: {},
        queryDatesSelected: false,
        savingsMissedThreshold: false
    };

    exports.default = ReactRedux.connect(function (_ref, _ref2) {
        var InsightsBanner = _ref.FlexForAllInsightsBanner,
            FilterState = _ref.FilterState,
            FlexMatrix = _ref.FlexMatrix;
        var accordionOpen = _ref2.accordionOpen,
            anyFilterApplied = _ref2.anyFilterApplied;
        return {
            accordionOpen: accordionOpen,
            anyFilterApplied: anyFilterApplied,
            InsightsBanner: InsightsBanner && InsightsBanner.ui.shouldDisplay ? InsightsBanner : {},
            displayMode: FlexMatrix.ui.displayMode,
            filtersChanged: FilterState.ui.filtersChanged,
            hasBanner: FlexMatrix.ui.hasBanner && InsightsBanner.ui.shouldDisplay,
            hasNotification: InsightsBanner.ui.hasNotification,
            hasResults: FlexMatrix.data.matrixEntries && !!Object.keys(FlexMatrix.data.matrixEntries).length,
            queryDatesSelected: InsightsBanner.data.queryDatesSelected,
            savingsMissedThreshold: InsightsBanner.data.savingsMissedThreshold,
            selectedDateCount: FlexMatrix.data.selectedDateCount
        };
    }, function (dispatch) {
        return {
            dispatchAccordionOpened: function dispatchAccordionOpened(isOpen) {
                return dispatch(actions.updateAccordionState(isOpen));
            },
            dispatchDismissNotification: function dispatchDismissNotification() {
                return dispatch(actions.dismissNotification());
            }
        };
    })(FlexMatrixHeader);
});define("default/flights/results/react/FlexMatrixAxisLabel", ['exports', 'prop-types', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--default', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--default--v2', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--selected--v2', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--hovered', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--selected', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--valid', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--disabled', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel__Text', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--v2__Text', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--wide__Text', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--narrow__Text', 'stl!flights.results.FlexMatrixAxisLabel.AxisLabel--disabled__Text', 'property!horizon.flights.results.flexMatrix.presentation', 'property!horizon.flights.results.flexMatrix.useSelectedHighlighting', 'common/widgets/checkbox/react/StyleJamCheckbox', 'flights/results/react/FlexMatrixGridBlock', 'common/analytics/react/Analytics', 'common/results/filters/react/FilterStateController', 'common/react/constants/layout', 'flights/results/react/constants/FlexMatrixConstants', 'common/results/filters/react/constants/FilterConstants', 'common/widgets/checkbox/react/constants/StyleJamCheckboxConstants', 'common/utils/react/presentate', 'common/react/constants/globals'], function (exports, _propTypes, _stlAxisLabel, _stlAxisLabelDefault, _stlAxisLabelDefaultV, _stlAxisLabelSelectedV, _stlAxisLabelHovered, _stlAxisLabelSelected, _stlAxisLabelValid, _stlAxisLabelDisabled, _stlAxisLabel__Text, _stlAxisLabelV2__Text, _stlAxisLabelWide__Text, _stlAxisLabelNarrow__Text, _stlAxisLabelDisabled__Text, _propertyHorizonFlightsResultsFlexMatrix, _propertyHorizonFlightsResultsFlexMatrix2, _StyleJamCheckbox, _FlexMatrixGridBlock, _Analytics, _FilterStateController, _layout, _FlexMatrixConstants, _FilterConstants, _StyleJamCheckboxConstants, _presentate, _globals) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexMatrixAxisLabel = exports.presentations = exports.PureFlexMatrixAxisLabel = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _stlAxisLabel2 = babelHelpers.interopRequireDefault(_stlAxisLabel);

    var _stlAxisLabelDefault2 = babelHelpers.interopRequireDefault(_stlAxisLabelDefault);

    var _stlAxisLabelDefaultV2 = babelHelpers.interopRequireDefault(_stlAxisLabelDefaultV);

    var _stlAxisLabelSelectedV2 = babelHelpers.interopRequireDefault(_stlAxisLabelSelectedV);

    var _stlAxisLabelHovered2 = babelHelpers.interopRequireDefault(_stlAxisLabelHovered);

    var _stlAxisLabelSelected2 = babelHelpers.interopRequireDefault(_stlAxisLabelSelected);

    var _stlAxisLabelValid2 = babelHelpers.interopRequireDefault(_stlAxisLabelValid);

    var _stlAxisLabelDisabled2 = babelHelpers.interopRequireDefault(_stlAxisLabelDisabled);

    var _stlAxisLabel__Text2 = babelHelpers.interopRequireDefault(_stlAxisLabel__Text);

    var _stlAxisLabelV2__Text2 = babelHelpers.interopRequireDefault(_stlAxisLabelV2__Text);

    var _stlAxisLabelWide__Text2 = babelHelpers.interopRequireDefault(_stlAxisLabelWide__Text);

    var _stlAxisLabelNarrow__Text2 = babelHelpers.interopRequireDefault(_stlAxisLabelNarrow__Text);

    var _stlAxisLabelDisabled__Text2 = babelHelpers.interopRequireDefault(_stlAxisLabelDisabled__Text);

    var _propertyHorizonFlightsResultsFlexMatrix3 = babelHelpers.interopRequireDefault(_propertyHorizonFlightsResultsFlexMatrix2);

    var _StyleJamCheckbox2 = babelHelpers.interopRequireDefault(_StyleJamCheckbox);

    var _Analytics2 = babelHelpers.interopRequireDefault(_Analytics);

    var FilterStateController = babelHelpers.interopRequireWildcard(_FilterStateController);
    var flexMatrixConstants = babelHelpers.interopRequireWildcard(_FlexMatrixConstants);
    var checkboxConstants = babelHelpers.interopRequireWildcard(_StyleJamCheckboxConstants);

    var _presentate2 = babelHelpers.interopRequireDefault(_presentate);

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    var _presentations, _dec, _class;

    var PureFlexMatrixAxisLabel = exports.PureFlexMatrixAxisLabel = function (_React$Component) {
        babelHelpers.inherits(PureFlexMatrixAxisLabel, _React$Component);

        function PureFlexMatrixAxisLabel() {
            babelHelpers.classCallCheck(this, PureFlexMatrixAxisLabel);

            var _this = babelHelpers.possibleConstructorReturn(this, (PureFlexMatrixAxisLabel.__proto__ || Object.getPrototypeOf(PureFlexMatrixAxisLabel)).call(this));

            _this.analytics = new _Analytics2.default();
            return _this;
        }

        babelHelpers.createClass(PureFlexMatrixAxisLabel, [{
            key: 'shouldComponentUpdate',
            value: function shouldComponentUpdate(nextProps) {
                return nextProps.resultsChanged === true || this.props.uiStateKey !== nextProps.uiStateKey || this.props.selectedStatus !== nextProps.selectedStatus;
            }

            // Publish filter event, which will trigger a search poll and update state in the next render

        }, {
            key: 'handleCheckboxChange',
            value: function handleCheckboxChange() {
                var _props = this.props,
                    filterName = _props.filterName,
                    filterValue = _props.filterValue,
                    isChecked = _props.isChecked,
                    labelText = _props.labelText,
                    pendingFilterData = _props.pendingFilterData;

                var stateUpdaters = babelHelpers.defineProperty({}, filterName, this.createStateUpdateThunk());
                FilterStateController.pushValueSetFilterUpdates(stateUpdaters, pendingFilterData);
                this.analytics.trackEvent({
                    category: 'flex-matrix/' + filterName + '/axis-checkbox',
                    action: isChecked ? 'uncheck' : 'check',
                    label: labelText,
                    value: filterValue
                });
            }
        }, {
            key: 'createStateUpdateThunk',
            value: function createStateUpdateThunk() {
                var _this2 = this;

                var _props2 = this.props,
                    displayMode = _props2.displayMode,
                    filterValue = _props2.filterValue,
                    selectedStatus = _props2.selectedStatus;

                var defaultValue = displayMode === flexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER ? _FilterConstants.itemSelectedStatus.NOT_SELECTED : _FilterConstants.itemSelectedStatus.SELECTED;
                return function (filterState) {
                    switch (selectedStatus) {
                        case _FilterConstants.itemSelectedStatus.NOT_SELECTED:
                            return _this2.validateOnlyState(babelHelpers.extends({}, filterState || {}, babelHelpers.defineProperty({}, filterValue, _FilterConstants.itemSelectedStatus.SELECTED)));
                        case _FilterConstants.itemSelectedStatus.SELECTED:
                            return _this2.flagOnlyState(babelHelpers.extends({}, filterState || {}, babelHelpers.defineProperty({}, filterValue, _FilterConstants.itemSelectedStatus.NOT_SELECTED)));
                        case _FilterConstants.itemSelectedStatus.ONLY:
                            return babelHelpers.defineProperty({}, filterValue, _FilterConstants.itemSelectedStatus.SELECTED);
                        default:
                            return babelHelpers.defineProperty({}, filterValue, defaultValue);
                    }
                };
            }
        }, {
            key: 'validateOnlyState',
            value: function validateOnlyState(state) {
                var allKeys = this.props.allLabels.map(function (labelData) {
                    return labelData.filterValue;
                });
                var onlyKeys = allKeys.filter(function (labelKey) {
                    return labelKey && state[labelKey] === _FilterConstants.itemSelectedStatus.ONLY;
                });
                if (onlyKeys.length === 1) {
                    if (allKeys.some(function (labelKey) {
                        return !state[labelKey] || state[labelKey] !== _FilterConstants.itemSelectedStatus.NOT_SELECTED;
                    })) {
                        state[onlyKeys] = _FilterConstants.itemSelectedStatus.SELECTED;
                    }
                } else if (onlyKeys.length > 1) {
                    onlyKeys.forEach(function (labelKey) {
                        state[labelKey] = _FilterConstants.itemSelectedStatus.SELECTED;
                    });
                }
                return state;
            }
        }, {
            key: 'flagOnlyState',
            value: function flagOnlyState(state) {
                var selectedKeys = this.props.allLabels.filter(function (labelData) {
                    return typeof state[labelData.filterValue] === 'undefined' || state[labelData.filterValue] === _FilterConstants.itemSelectedStatus.SELECTED;
                });
                if (selectedKeys.length === 1) {
                    this.props.allLabels.forEach(function (labelData) {
                        state[labelData.filterValue] = _FilterConstants.itemSelectedStatus.NOT_SELECTED;
                    });
                    state[selectedKeys[0].filterValue] = _FilterConstants.itemSelectedStatus.ONLY;
                }
                return state;
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var _props3 = this.props,
                    checkboxId = _props3.checkboxId,
                    enabledLabelCount = _props3.enabledLabelCount,
                    filterValue = _props3.filterValue,
                    flexFilterApplied = _props3.flexFilterApplied,
                    isDisabled = _props3.isDisabled,
                    isHovered = _props3.isHovered,
                    fullWidth = _props3.fullWidth,
                    presentation = _props3.presentation,
                    role = _props3.role,
                    searchCompleted = _props3.searchCompleted,
                    selectedStatus = _props3.selectedStatus,
                    updateHoverState = _props3.updateHoverState;

                var date = moment(filterValue, flexMatrixConstants.flexFilterDateFormat);
                var labelText = date.isValid() && _globals2.default.dateFormats.dayOfWeek ? date.format(_globals2.default.dateFormats.dayOfWeek) : '--';
                var labelStateClass = (isDisabled ? _stlAxisLabelDisabled__Text2.default : '') + ' ' + (fullWidth ? _stlAxisLabelWide__Text2.default : _stlAxisLabelNarrow__Text2.default);

                var labelClasses = '';
                if (isHovered) {
                    labelClasses = _stlAxisLabelHovered2.default;
                } else if (_propertyHorizonFlightsResultsFlexMatrix3.default.getBoolean(false) && searchCompleted && selectedStatus === 1 && flexFilterApplied) {
                    labelClasses = _stlAxisLabelSelected2.default;
                } else {
                    labelClasses = presentation.axisLabelDefault;
                }

                return babelHelpers.jsx(_FlexMatrixGridBlock.FlexMatrixGridBlock, {
                    className: _stlAxisLabel2.default + ' ' + labelClasses + '\n                    ' + (isDisabled ? _stlAxisLabelDisabled2.default : _stlAxisLabelValid2.default),
                    onClick: function onClick() {
                        return isDisabled || !window.isNaN(enabledLabelCount) && enabledLabelCount < 2 ? undefined : _this3.handleCheckboxChange();
                    },
                    onMouseOver: function onMouseOver() {
                        return isDisabled ? undefined : updateHoverState(filterValue);
                    },
                    onMouseLeave: function onMouseLeave() {
                        return isDisabled ? undefined : updateHoverState('');
                    },
                    onFocus: function onFocus() {
                        return isDisabled ? undefined : updateHoverState(filterValue);
                    },
                    onBlur: function onBlur() {
                        return isDisabled ? undefined : updateHoverState('');
                    },
                    role: role,
                    isleftalign: fullWidth ? 1 : 0,
                    isv2: presentation.gridBlocksV2 ? 1 : 0
                }, void 0, babelHelpers.jsx('div', {
                    className: presentation.labelText + ' ' + labelStateClass
                }, void 0, labelText), babelHelpers.jsx(_StyleJamCheckbox2.default, {
                    id: checkboxId,
                    extraClassName: isDisabled ? _stlAxisLabelDisabled__Text2.default : undefined,
                    name: checkboxId,
                    value: filterValue,
                    checked: selectedStatus !== _FilterConstants.itemSelectedStatus.NOT_SELECTED,
                    disabled: isDisabled,
                    alternateHovered: isHovered,
                    presentation: presentation.checkboxPresentation,
                    size: presentation.checkboxSize,
                    showLabel: false,
                    ariaLabel: labelText,
                    manageStateManually: true
                }));
            }
        }]);
        return PureFlexMatrixAxisLabel;
    }(React.Component);

    PureFlexMatrixAxisLabel.propTypes = {
        allLabels: _propTypes2.default.arrayOf(_propTypes2.default.objectOf(_propTypes2.default.any)).isRequired,
        checkboxId: _propTypes2.default.string.isRequired,
        enabledLabelCount: _propTypes2.default.number.isRequired,
        filterName: _propTypes2.default.string.isRequired,
        isHovered: _propTypes2.default.bool.isRequired,
        fullWidth: _propTypes2.default.bool,
        pendingFilterData: _propTypes2.default.objectOf(_propTypes2.default.any).isRequired,
        presentation: _propTypes2.default.objectOf(_propTypes2.default.any).isRequired,
        role: _propTypes2.default.string.isRequired,
        selectedStatus: _propTypes2.default.number.isRequired,
        uiStateKey: _propTypes2.default.string.isRequired,
        updateHoverState: _propTypes2.default.func.isRequired
    };

    PureFlexMatrixAxisLabel.defaultProps = {
        fullWidth: false
    };

    var presentations = exports.presentations = (_presentations = {}, babelHelpers.defineProperty(_presentations, flexMatrixConstants.presentationKeys.DEFAULT, {
        axisLabelDefault: _stlAxisLabelDefault2.default,
        axisLabelSelected: _stlAxisLabelSelected2.default,
        labelText: _stlAxisLabel__Text2.default,
        checkboxSize: _layout.sizes.SMALL,
        checkboxPresentation: checkboxConstants.presentationKeys.FLEX_MATRIX,
        gridBlocksV2: false
    }), babelHelpers.defineProperty(_presentations, flexMatrixConstants.presentationKeys.V2, {
        axisLabelDefault: _stlAxisLabelDefaultV2.default,
        axisLabelSelected: _stlAxisLabelSelectedV2.default,
        labelText: _stlAxisLabelV2__Text2.default,
        checkboxSize: _layout.sizes.MEDIUM,
        checkboxPresentation: checkboxConstants.presentationKeys.MUTED_UIKIT,
        gridBlocksV2: true
    }), _presentations);

    var FlexMatrixAxisLabel = exports.FlexMatrixAxisLabel = (_dec = (0, _presentate2.default)(presentations, (0, _propertyHorizonFlightsResultsFlexMatrix.getString)()), _dec(_class = function (_PureFlexMatrixAxisLa) {
        babelHelpers.inherits(FlexMatrixAxisLabel, _PureFlexMatrixAxisLa);

        function FlexMatrixAxisLabel() {
            babelHelpers.classCallCheck(this, FlexMatrixAxisLabel);
            return babelHelpers.possibleConstructorReturn(this, (FlexMatrixAxisLabel.__proto__ || Object.getPrototypeOf(FlexMatrixAxisLabel)).apply(this, arguments));
        }

        return FlexMatrixAxisLabel;
    }(PureFlexMatrixAxisLabel)) || _class);
    exports.default = ReactRedux.connect(function (_ref3, _ref4) {
        var FilterState = _ref3.FilterState,
            FlexMatrix = _ref3.FlexMatrix,
            SearchPoll = _ref3.SearchPoll;
        var allLabels = _ref4.allLabels,
            axisLabel = _ref4.axisLabel,
            checkboxId = _ref4.checkboxId,
            enabledLabelCount = _ref4.enabledLabelCount,
            filterName = _ref4.filterName,
            isHovered = _ref4.isHovered,
            _ref4$fullWidth = _ref4.fullWidth,
            fullWidth = _ref4$fullWidth === undefined ? false : _ref4$fullWidth,
            role = _ref4.role,
            uiStateKey = _ref4.uiStateKey,
            updateHoverState = _ref4.updateHoverState;
        var isChecked = axisLabel.checked,
            isDisabled = axisLabel.disabled,
            filterValue = axisLabel.filterValue;
        var searchCompleted = SearchPoll.completed,
            resultsChanged = SearchPoll.resultsChanged;


        return {
            allLabels: allLabels,
            checkboxId: checkboxId,
            enabledLabelCount: enabledLabelCount,
            filterName: filterName,
            isHovered: isHovered,
            fullWidth: fullWidth,
            role: role,
            uiStateKey: uiStateKey,
            updateHoverState: updateHoverState,
            filterValue: filterValue,
            isChecked: isChecked,
            isDisabled: isDisabled,
            resultsChanged: resultsChanged,
            searchCompleted: searchCompleted,
            displayMode: FlexMatrix.ui.displayMode,
            selectedStatus: axisLabel.checked ? 1 : 0,
            pendingFilterData: FilterState.ui.pendingFilterData,
            flexFilterApplied: FilterState.ui.flexFilterApplied

        };
    })(FlexMatrixAxisLabel);
});define('default/common/icon/_svg_/save-filled', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\"><path d=\"m14.69 13.29a2.38 2.38 0 0 0 -1.69.71 2.33 2.33 0 0 0 0 3.33l4.14 4.08 4.16-4.11a2.32 2.32 0 0 0 0-3.32 2.4 2.4 0 0 0 -3.37 0l-.71.69-.76-.67a2.5 2.5 0 0 0 -1.77-.71z\"/><path d=\"m11.62 18.72a4.31 4.31 0 0 1 0-6.17 4.34 4.34 0 0 1 3.07-1.26 4.4 4.4 0 0 1 2.46.75 4.35 4.35 0 0 1 2.46-.75 4.61 4.61 0 0 1 1.39.24v-4.53a2 2 0 0 0 -2-2h-4v-2a2 2 0 0 0 -2-2h-4a2 2 0 0 0 -2 2v2h-4a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h8.9zm-2.62-15.72h4v2h-4z\"/></svg> ";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/common/icon/_svg_/save-filled"}, params || {}, {svg: svgStr})); };
});define("default/prop-types", ["exports","module","context"], function (exports, module, context) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    get: function() { return true; },
    set: function() {}
});



(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {
  module.exports = require('./cjs/react-is.production.min.js');
} else {
  module.exports = __webpack_require__(3);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(0);

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(4)(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (true) {
  (function () {
    'use strict';

    Object.defineProperty(exports, '__esModule', { value: true });

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' ||
      // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
    }

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    function typeOf(object) {
      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;
              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_LAZY_TYPE:
          case REACT_MEMO_TYPE:
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    }

    // AsyncMode is deprecated along with isAsyncMode
    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;

    var hasWarnedAboutDeprecatedIsAsyncMode = false;

    // AsyncMode should be deprecated
    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true;
          lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }
    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    exports.typeOf = typeOf;
    exports.AsyncMode = AsyncMode;
    exports.ConcurrentMode = ConcurrentMode;
    exports.ContextConsumer = ContextConsumer;
    exports.ContextProvider = ContextProvider;
    exports.Element = Element;
    exports.ForwardRef = ForwardRef;
    exports.Fragment = Fragment;
    exports.Lazy = Lazy;
    exports.Memo = Memo;
    exports.Portal = Portal;
    exports.Profiler = Profiler;
    exports.StrictMode = StrictMode;
    exports.Suspense = Suspense;
    exports.isValidElementType = isValidElementType;
    exports.isAsyncMode = isAsyncMode;
    exports.isConcurrentMode = isConcurrentMode;
    exports.isContextConsumer = isContextConsumer;
    exports.isContextProvider = isContextProvider;
    exports.isElement = isElement;
    exports.isForwardRef = isForwardRef;
    exports.isFragment = isFragment;
    exports.isLazy = isLazy;
    exports.isMemo = isMemo;
    exports.isPortal = isPortal;
    exports.isProfiler = isProfiler;
    exports.isStrictMode = isStrictMode;
    exports.isSuspense = isSuspense;
  })();
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ReactIs = __webpack_require__(0);
var assign = __webpack_require__(5);

var ReactPropTypesSecret = __webpack_require__(1);
var checkPropTypes = __webpack_require__(6);

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function printWarning() {};

if (true) {
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if ('development' !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var printWarning = function printWarning() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(1);
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof(typeSpecs[typeSpecName]) + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + (typeof error === 'undefined' ? 'undefined' : _typeof(error)) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function () {
  if (true) {
    loggedTypeFailures = {};
  }
};

module.exports = checkPropTypes;

/***/ })
/******/ ])));
});
define("default/flights/results/react/actions/SearchPredictionsAjaxActions", ['exports', 'moment', 'property!ui.horizon.api.origin.override', 'property!horizon.flights.results.insightsBanner.monthAverage.api.url', 'common/react/constants/globals', 'common/utils/react/logger', 'common/utils/react/events', 'flights/results/react/utils/FlexMatrixClientBuilder'], function (exports, _moment, _propertyUiHorizonApiOrigin, _propertyHorizonFlightsResultsInsightsBannerMonthAverageApi, _globals, _logger, _events, _FlexMatrixClientBuilder) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RECEIVE_FLEX_PREDICTIONS_ERROR = exports.RECEIVE_FLEX_PREDICTIONS_SUCCESS = exports.REQUEST_FLEX_PREDICTIONS = exports.RECEIVE_MONTH_PRICE_ERROR = exports.RECEIVE_NO_MONTH_PRICES = exports.RECEIVE_MONTH_PRICE = exports.REQUEST_MONTH_PRICES = undefined;
    exports.requestPrice = requestPrice;
    exports.receiveResponse = receiveResponse;
    exports.receiveNoPrediction = receiveNoPrediction;
    exports.receiveMonthPriceError = receiveMonthPriceError;
    exports.requestFlexDates = requestFlexDates;
    exports.receiveFlexPredictionSuccess = receiveFlexPredictionSuccess;
    exports.receiveFlexPredictionError = receiveFlexPredictionError;
    exports.fetchAveragePrice = fetchAveragePrice;
    exports.listenFlexDatePredictions = listenFlexDatePredictions;
    exports.fetchFlexDatePredictions = fetchFlexDatePredictions;

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    var _logger2 = babelHelpers.interopRequireDefault(_logger);

    var _events2 = babelHelpers.interopRequireDefault(_events);

    var FlexMatrixClientBuilder = babelHelpers.interopRequireWildcard(_FlexMatrixClientBuilder);


    var BASE_PATH = 'SearchPredictionsAjaxActions.';
    var REQUEST_MONTH_PRICES = exports.REQUEST_MONTH_PRICES = BASE_PATH + 'REQUEST_MONTH_PRICES';
    var RECEIVE_MONTH_PRICE = exports.RECEIVE_MONTH_PRICE = BASE_PATH + 'RECEIVE_MONTH_PRICE';
    var RECEIVE_NO_MONTH_PRICES = exports.RECEIVE_NO_MONTH_PRICES = BASE_PATH + 'RECEIVE_NO_MONTH_PRICES';
    var RECEIVE_MONTH_PRICE_ERROR = exports.RECEIVE_MONTH_PRICE_ERROR = BASE_PATH + 'RECEIVE_MONTH_PRICE_ERROR';
    var REQUEST_FLEX_PREDICTIONS = exports.REQUEST_FLEX_PREDICTIONS = BASE_PATH + 'REQUEST_FLEX_PREDICTIONS';
    var RECEIVE_FLEX_PREDICTIONS_SUCCESS = exports.RECEIVE_FLEX_PREDICTIONS_SUCCESS = BASE_PATH + 'RECEIVE_FLEX_PREDICTIONS_SUCCESS';
    var RECEIVE_FLEX_PREDICTIONS_ERROR = exports.RECEIVE_FLEX_PREDICTIONS_ERROR = BASE_PATH + 'RECEIVE_FLEX_PREDICTIONS_ERROR';

    function requestPrice() {
        return {
            type: REQUEST_MONTH_PRICES,
            payload: {}
        };
    }

    function receiveResponse(response) {
        return {
            type: RECEIVE_MONTH_PRICE,
            payload: response
        };
    }

    function receiveNoPrediction() {
        return {
            type: RECEIVE_NO_MONTH_PRICES,
            payload: {
                price: -1
            }
        };
    }

    function receiveMonthPriceError() {
        return {
            type: RECEIVE_MONTH_PRICE_ERROR,
            payload: {
                price: -1
            }
        };
    }

    function requestFlexDates() {
        return {
            type: REQUEST_MONTH_PRICES,
            payload: {}
        };
    }

    function receiveFlexPredictionSuccess(matrixEntries) {
        return {
            type: RECEIVE_FLEX_PREDICTIONS_SUCCESS,
            payload: {
                clientMatrixEntries: matrixEntries
            }
        };
    }

    function receiveFlexPredictionError() {
        return {
            type: RECEIVE_FLEX_PREDICTIONS_ERROR,
            payload: {
                price: -1
            }
        };
    }

    var monthAveragePriceAbsoluteUrl = void 0;
    function getMonthAveragePriceAbsoluteUrl() {
        if (!monthAveragePriceAbsoluteUrl) {
            var urlOrigin = (0, _propertyUiHorizonApiOrigin.getString)() || window.location.origin;
            monthAveragePriceAbsoluteUrl = urlOrigin + '/' + (0, _propertyHorizonFlightsResultsInsightsBannerMonthAverageApi.getString)();
        }
        return monthAveragePriceAbsoluteUrl;
    }

    function getNumericSearchMonthsFromQuery(SearchPoll) {
        var departDate = SearchPoll.depart_date_canon,
            returnDate = SearchPoll.return_date_canon;

        var departMonthNumeric = (0, _moment2.default)(departDate, _globals2.default.dateFormats.isoDate).get('month') + 1;
        var months = [departMonthNumeric];
        if (returnDate) {
            var returnMonthNumeric = (0, _moment2.default)(returnDate, _globals2.default.dateFormats.isoDate).get('month') + 1;
            if (departMonthNumeric !== returnMonthNumeric) {
                months.push(returnMonthNumeric);
            }
        }
        return months;
    }

    function mapAveragePriceForMonth(insights, monthNumeric, legNumber) {
        var monthMatchesNumeric = function monthMatchesNumeric(monthData) {
            return monthData.month === monthNumeric;
        };
        var monthDataForLeg = void 0;
        if (legNumber === 0) {
            monthDataForLeg = insights.monthAverage.find(monthMatchesNumeric);
        } else {
            var allLegsMonthData = insights.monthAverage.filter(monthMatchesNumeric);
            // Fall back to the first dataset if nothing is found for the matching depart/return leg
            monthDataForLeg = allLegsMonthData[legNumber] || allLegsMonthData[0];
        }
        if (monthDataForLeg && typeof monthDataForLeg.average === 'number' && monthDataForLeg.average > 0) {
            return monthDataForLeg.average;
        }
        return -1;
    }

    function getMonthAveragePrediction(responseInsights, state) {
        var monthsNumeric = getNumericSearchMonthsFromQuery(state.SearchPoll);
        var averageMinPrice = Math.round(monthsNumeric.map(function (monthNumeric, legIndex) {
            return mapAveragePriceForMonth(responseInsights, monthNumeric, legIndex);
        }).reduce(function (accumulator, current) {
            return accumulator + (current > 0 ? current : 0);
        }, 0) / monthsNumeric.length);
        if (averageMinPrice > 0) {
            var displayMonths = monthsNumeric.map(function (monthNumeric) {
                return (0, _moment2.default)(monthNumeric, 'M').format('MMMM');
            });
            return {
                displayPrice: R9 && R9.Common ? R9.Common.Utils.formatPrice(averageMinPrice) : '' + averageMinPrice,
                displayMonths: displayMonths,
                price: averageMinPrice
            };
        }
        return null;
    }

    function averagePriceReceiveResponse(_ref, dispatch, state) {
        var responseInsights = _ref.insights;

        var actionData = void 0;
        if (responseInsights && Object.keys(responseInsights).length) {
            actionData = getMonthAveragePrediction(responseInsights, state);
        }
        if (actionData) {
            dispatch(receiveResponse(actionData));
        } else {
            dispatch(receiveNoPrediction());
        }
    }

    function receiveFlexPredictionResponse(_ref2, dispatch, state) {
        var responseInsights = _ref2.insights;

        var flexPredictions = responseInsights.flexDayPredictions;
        var entries = flexPredictions ? FlexMatrixClientBuilder.buildPredictedMatrixEntries(flexPredictions, state) : null;
        dispatch(receiveFlexPredictionSuccess(entries));
    }

    function handleSearchInsightsError(errorMsg, deferred) {
        new _logger2.default('flights/results/SearchPredictionsAjaxActions').error('Error in Search Insights average month prices request: ' + errorMsg);
        deferred.reject();
    }

    var cachedRequests = {};
    function makeSearchInsightsRequest(state) {
        var SearchPoll = state.SearchPoll;
        var origin = SearchPoll.origin,
            destination = SearchPoll.destination,
            startDate = SearchPoll.depart_date_canon,
            endDate = SearchPoll.return_date_canon,
            isOneWay = SearchPoll.isOneWay;

        var deferred = $.Deferred();
        if (!origin || !destination || !startDate) {
            return deferred.reject();
        }
        var cacheKey = origin + '_' + destination + '_' + startDate + '_' + endDate;
        if (cachedRequests[cacheKey]) {
            return deferred.resolve(cachedRequests[cacheKey]);
        }

        var requestParams = { origin: origin, destination: destination, startDate: startDate };
        if (!isOneWay) {
            requestParams.endDate = endDate;
        }

        $.getJSON(getMonthAveragePriceAbsoluteUrl(), requestParams).then(function (data) {
            if (data.success) {
                cachedRequests[cacheKey] = data;
                deferred.resolve(data);
            } else {
                handleSearchInsightsError(data.error, deferred);
            }
            if (babelHelpers.typeof(data.warnings) === 'object' && data.warnings.length) {
                new _logger2.default('flights/results/SearchPredictionsAjaxActions').warn('Average price request returned warnings:\n' + data.warnings.join('\n'));
            }
        }).catch(function () {
            return handleSearchInsightsError('JSON Request from ' + getMonthAveragePriceAbsoluteUrl() + ' failed.', deferred);
        });

        return deferred;
    }

    /*
     * Async dispatcher functions
     *
     * These must return a function with dispatch and getState params, if needed.
     * call directly from inside ReduxConnect dispatch function like "dispatch([method])"
     */

    function fetchAveragePrice() {
        return function (dispatch, getState) {
            dispatch(requestPrice());
            makeSearchInsightsRequest(getState()).then(function (data) {
                return averagePriceReceiveResponse(data, dispatch, getState());
            }).catch(function () {
                return dispatch(receiveMonthPriceError());
            });
        };
    }

    var listenFlexDatePredictionsEvent = 'flights.results.insights.predictions.response';
    function listenFlexDatePredictionsCallback(data, dispatch, getState) {
        if (data.error) {
            receiveFlexPredictionError();
        } else {
            receiveFlexPredictionResponse(data, dispatch, getState());
        }
    }

    var firstListen = true;
    function listenFlexDatePredictions() {
        return function (dispatch, getState) {
            dispatch(requestFlexDates());

            // Check if prediction has already been made before subscription is set up
            if (firstListen) {
                firstListen = false;
                var whenResult = void 0;
                var whenCallback = function whenCallback(data) {
                    whenResult = data;
                };
                _events2.default.when(listenFlexDatePredictionsEvent, whenCallback);
                _events2.default.unsubscribe(listenFlexDatePredictionsEvent, whenCallback);
                if (whenResult) {
                    listenFlexDatePredictionsCallback(whenResult, dispatch, getState);
                    return;
                }
            }

            function subscription(data) {
                listenFlexDatePredictionsCallback(data, dispatch, getState);
                _events2.default.unsubscribe(listenFlexDatePredictionsEvent, subscription);
            }
            _events2.default.subscribe(listenFlexDatePredictionsEvent, subscription);
        };
    }

    function fetchFlexDatePredictions() {
        return function (dispatch, getState) {
            dispatch(requestFlexDates());
            makeSearchInsightsRequest(getState()).then(function (data) {
                return receiveFlexPredictionResponse(data, dispatch, getState());
            }).catch(function () {
                return dispatch(receiveFlexPredictionError());
            });
        };
    }
});define('default/common/icon/_svg_/heart-empty', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M12.103 5.707L12 5.81l-.103-.12C9.461 2.658 5.992 2.15 3.713 4.364a5.685 5.685 0 0 0 0 8.134L12 20.682l8.287-8.167a5.685 5.685 0 0 0 0-8.134c-2.267-2.241-6.152-1.723-8.184 1.326zM11.912 18l-7.034-7.464a3.21 3.21 0 0 1-.876-2.292 3.137 3.137 0 0 1 .876-2.29 2.83 2.83 0 0 1 2.139-.917c.798-.01 1.567.32 2.139.916l2.82 3.02 2.89-3.02A2.918 2.918 0 0 1 17.004 5c.803 0 1.573.343 2.139.953.572.602.882 1.433.855 2.291a3.095 3.095 0 0 1-.983 2.292L11.912 18z\"/></svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/common/icon/_svg_/heart-empty"}, params || {}, {svg: svgStr})); };
});define("default/flights/results/react/InsightsBanner", ['exports', 'prop-types', 'stl!flights.results.InsightsBanner.Banner', 'stl!flights.results.InsightsBanner.Heading', 'stl!flights.results.InsightsBanner.SubHeading', 'stl!flights.results.InsightsBanner.MessageWrapper', 'stl!flights.results.InsightsBanner.Message--FullLine', 'stl!flights.results.InsightsBanner.IconWrapper', 'stl!flights.results.InsightsBanner.Icon', 'stl!flights.results.InsightsBanner.BorderedIcon', 'stl!flights.results.InsightsBanner.UnborderedIcon', 'stl!flights.results.InsightsBanner.Icon__Svg--medium', 'stl!flights.results.InsightsBanner.Icon__Svg--large', 'stl!flights.results.InsightsBanner.Icon__FilteredIndicator', 'stl!flights.results.InsightsBanner.OptionalChildWrapper', 'common/icon/react/SvgIcon', 'flights/results/react/constants/InsightsBannerConstants', 'flights/results/react/utils/InsightsBannerUtils', 'common/react/constants/layout', 'common/analytics/react/Analytics', 'flights/results/react/constants/NearbyAirportInsightsContants', 'flights/results/react/constants/AveragePriceInsightsConstants', 'flights/results/react/constants/FlexForAllInsightsContants'], function (exports, _propTypes, _stlBanner, _stlHeading, _stlSubHeading, _stlMessageWrapper, _stlMessageFullLine, _stlIconWrapper, _stlIcon, _stlBorderedIcon, _stlUnborderedIcon, _stlIcon__SvgMedium, _stlIcon__SvgLarge, _stlIcon__FilteredIndicator, _stlOptionalChildWrapper, _SvgIcon, _InsightsBannerConstants, _InsightsBannerUtils, _layout, _Analytics, _NearbyAirportInsightsContants, _AveragePriceInsightsConstants, _FlexForAllInsightsContants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _stlBanner2 = babelHelpers.interopRequireDefault(_stlBanner);

    var _stlHeading2 = babelHelpers.interopRequireDefault(_stlHeading);

    var _stlSubHeading2 = babelHelpers.interopRequireDefault(_stlSubHeading);

    var _stlMessageWrapper2 = babelHelpers.interopRequireDefault(_stlMessageWrapper);

    var _stlMessageFullLine2 = babelHelpers.interopRequireDefault(_stlMessageFullLine);

    var _stlIconWrapper2 = babelHelpers.interopRequireDefault(_stlIconWrapper);

    var _stlIcon2 = babelHelpers.interopRequireDefault(_stlIcon);

    var _stlBorderedIcon2 = babelHelpers.interopRequireDefault(_stlBorderedIcon);

    var _stlUnborderedIcon2 = babelHelpers.interopRequireDefault(_stlUnborderedIcon);

    var _stlIcon__SvgMedium2 = babelHelpers.interopRequireDefault(_stlIcon__SvgMedium);

    var _stlIcon__SvgLarge2 = babelHelpers.interopRequireDefault(_stlIcon__SvgLarge);

    var _stlIcon__FilteredIndicator2 = babelHelpers.interopRequireDefault(_stlIcon__FilteredIndicator);

    var _stlOptionalChildWrapper2 = babelHelpers.interopRequireDefault(_stlOptionalChildWrapper);

    var _SvgIcon2 = babelHelpers.interopRequireDefault(_SvgIcon);

    var _Analytics2 = babelHelpers.interopRequireDefault(_Analytics);

    var InsightsBanner = function (_React$Component) {
        babelHelpers.inherits(InsightsBanner, _React$Component);

        function InsightsBanner(props) {
            babelHelpers.classCallCheck(this, InsightsBanner);

            var _this = babelHelpers.possibleConstructorReturn(this, (InsightsBanner.__proto__ || Object.getPrototypeOf(InsightsBanner)).call(this, props));

            _this.analytics = new _Analytics2.default();
            _this.state = { firstMount: true };
            return _this;
        }

        babelHelpers.createClass(InsightsBanner, [{
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                var _props = this.props,
                    advantageType = _props.advantageType,
                    hasResults = _props.hasResults,
                    headingMessage = _props.headingMessage,
                    logMessageChange = _props.logMessageChange,
                    recommendationType = _props.recommendationType,
                    subHeadingMessage = _props.subHeadingMessage;

                if (hasResults && _InsightsBannerConstants.advantageTypeGroups.WITH_RECOMMENDATIONS.includes(advantageType) && (this.state.firstMount || !prevProps.hasResults || advantageType !== prevProps.advantageType || recommendationType !== prevProps.recommendationType || logMessageChange && headingMessage !== prevProps.headingMessage || logMessageChange && subHeadingMessage !== prevProps.subHeadingMessage)) {
                    this.logRecommendationImpression();
                }
                if (this.state.firstMount) {
                    this.setState({ firstMount: false });
                }
            }
        }, {
            key: 'logRecommendationImpression',
            value: function logRecommendationImpression() {
                var _props2 = this.props,
                    advantageType = _props2.advantageType,
                    recommendationType = _props2.recommendationType,
                    showNotificationIndicator = _props2.showNotificationIndicator,
                    type = _props2.type;

                var customLabel = showNotificationIndicator && _InsightsBannerConstants.advantageTypes.SAVINGS === advantageType ? 'filtersavings' : undefined;
                this.analytics.trackEvent((0, _InsightsBannerUtils.getAnalyticsData)(advantageType, recommendationType, type, undefined, customLabel));
            }
        }, {
            key: 'getAdvantageValueFor',
            value: function getAdvantageValueFor(map) {
                if (!map) {
                    return null;
                }
                var advantageValue = map[this.props.advantageType] || map[_InsightsBannerConstants.advantageTypes.DEFAULT];
                return (typeof advantageValue === 'undefined' ? 'undefined' : babelHelpers.typeof(advantageValue)) === 'object' ? advantageValue[this.props.recommendationType] : advantageValue;
            }
        }, {
            key: 'renderIcon',
            value: function renderIcon() {
                var _props3 = this.props,
                    bannerData = _props3.bannerData,
                    hasBorder = _props3.hasBorder;
                var borderedIconSvgs = bannerData.borderedIconSvgs,
                    iconSvgSize = bannerData.iconSvgSize,
                    iconThemeStl = bannerData.iconThemeStl,
                    iconSvgThemeStl = bannerData.iconSvgThemeStl;

                var bannerDataSvg = this.getAdvantageValueFor(borderedIconSvgs);
                var sizeClass = _layout.sizes.LARGE === this.getAdvantageValueFor(iconSvgSize) ? _stlIcon__SvgLarge2.default : _stlIcon__SvgMedium2.default;
                var iconParams = {
                    name: typeof bannerDataSvg === 'string' ? bannerDataSvg : undefined,
                    parentClassName: _stlIcon2.default + ' ' + (hasBorder ? _stlBorderedIcon2.default : _stlUnborderedIcon2.default) + ' ' + this.getAdvantageValueFor(iconThemeStl),
                    className: this.getAdvantageValueFor(iconSvgThemeStl) + ' ' + sizeClass,
                    width: 24,
                    height: 24,
                    key: 'iconSvg'
                };
                if (typeof bannerDataSvg === 'string') {
                    return React.createElement(_SvgIcon2.default, iconParams);
                }
                return React.createElement(bannerDataSvg, iconParams);
            }
        }, {
            key: 'render',
            value: function render() {
                var _props4 = this.props,
                    advantageType = _props4.advantageType,
                    bannerData = _props4.bannerData,
                    containerCssClasses = _props4.containerCssClasses,
                    headingMessage = _props4.headingMessage,
                    showNotificationIndicator = _props4.showNotificationIndicator,
                    subHeadingMessage = _props4.subHeadingMessage;
                var headingThemeStl = bannerData.headingThemeStl,
                    subHeadingThemeStl = bannerData.subHeadingThemeStl;

                return babelHelpers.jsx('div', {
                    className: _stlBanner2.default + ' ' + containerCssClasses
                }, void 0, babelHelpers.jsx('div', {
                    className: _stlIconWrapper2.default
                }, void 0, this.renderIcon(), showNotificationIndicator && advantageType !== _InsightsBannerConstants.advantageTypes.LOADING && babelHelpers.jsx('div', {
                    className: _stlIcon__FilteredIndicator2.default
                }, 'indicator')), babelHelpers.jsx('div', {
                    className: _stlMessageWrapper2.default
                }, void 0, babelHelpers.jsx('span', {
                    className: _stlHeading2.default + ' ' + _stlMessageFullLine2.default + ' ' + this.getAdvantageValueFor(headingThemeStl)
                }, void 0, headingMessage), subHeadingMessage && babelHelpers.jsx('span', {
                    className: _stlSubHeading2.default + ' ' + _stlMessageFullLine2.default + ' ' + this.getAdvantageValueFor(subHeadingThemeStl)
                }, void 0, subHeadingMessage)), this.props.children && babelHelpers.jsx('div', {
                    className: _stlOptionalChildWrapper2.default
                }, void 0, this.props.children));
            }
        }]);
        return InsightsBanner;
    }(React.Component);

    exports.default = InsightsBanner;


    InsightsBanner.propTypes = {
        advantageType: _propTypes2.default.oneOf(Object.values(_InsightsBannerConstants.advantageTypes)).isRequired,
        bannerData: _propTypes2.default.shape({
            borderedIconSvgs: _propTypes2.default.object.isRequired,
            iconSvgSize: _propTypes2.default.oneOf(Object.values(_layout.sizes)),
            iconThemeStl: _propTypes2.default.object.isRequired
        }).isRequired,
        containerCssClasses: _propTypes2.default.string,
        hasBorder: _propTypes2.default.bool.isRequired,
        hasResults: _propTypes2.default.bool.isRequired,
        headingMessage: _propTypes2.default.string.isRequired,
        logMessageChange: _propTypes2.default.bool,
        recommendationType: _propTypes2.default.oneOf([].concat(babelHelpers.toConsumableArray(Object.values(_NearbyAirportInsightsContants.airportRecommendationTypes)), babelHelpers.toConsumableArray(Object.values(_AveragePriceInsightsConstants.averagePriceRecommendationTypes)), babelHelpers.toConsumableArray(Object.values(_FlexForAllInsightsContants.flexRecommendationTypes)))).isRequired,
        showNotificationIndicator: _propTypes2.default.bool,
        subHeadingMessage: _propTypes2.default.string,
        type: _propTypes2.default.string.isRequired
    };

    InsightsBanner.defaultProps = {
        containerCssClasses: '',
        logMessageChange: false,
        showNotificationIndicator: false,
        subHeadingMessage: ''
    };
});define('momondo/flights/results/_svg_/arrow-forward', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"><path fill=\"none\" stroke=\"currentColor\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M165 100H35m100 35l30-35-30-35\"/></svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "momondo/flights/results/_svg_/arrow-forward"}, params || {}, {svg: svgStr})); };
});define("default/flights/results/react/FlexMatrixContainer", ['exports', 'flights/results/react/FlexMatrix', 'flights/results/react/FlexMatrixRecommendationController', 'common/results/react/SearchPollListener', 'common/results/filters/react/FilterStateController'], function (exports, _FlexMatrix, _FlexMatrixRecommendationController, _SearchPollListener, _FilterStateController) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlexMatrixContainer = undefined;

    var _FlexMatrix2 = babelHelpers.interopRequireDefault(_FlexMatrix);

    var _FlexMatrixRecommendationController2 = babelHelpers.interopRequireDefault(_FlexMatrixRecommendationController);

    var SearchPollListener = babelHelpers.interopRequireWildcard(_SearchPollListener);
    var FilterStateController = babelHelpers.interopRequireWildcard(_FilterStateController);

    var FlexMatrixContainer = exports.FlexMatrixContainer = function (_React$Component) {
        babelHelpers.inherits(FlexMatrixContainer, _React$Component);

        function FlexMatrixContainer() {
            babelHelpers.classCallCheck(this, FlexMatrixContainer);
            return babelHelpers.possibleConstructorReturn(this, (FlexMatrixContainer.__proto__ || Object.getPrototypeOf(FlexMatrixContainer)).apply(this, arguments));
        }

        babelHelpers.createClass(FlexMatrixContainer, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                SearchPollListener.addListener(this, this.props.SearchPoll);
                FilterStateController.registerReactFilters(FlexMatrixContainer.filterNames, FlexMatrixContainer.listenerKey);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                SearchPollListener.removeListener(this);
                FilterStateController.unregisterReactFilters(FlexMatrixContainer.filterNames, FlexMatrixContainer.listenerKey);
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    initialDisplayMode = _props.initialDisplayMode,
                    fullWidth = _props.fullWidth;

                return babelHelpers.jsx('div', {}, void 0, babelHelpers.jsx(_FlexMatrix2.default, {
                    initialDisplayMode: initialDisplayMode,
                    fullWidth: fullWidth
                }), babelHelpers.jsx(_FlexMatrixRecommendationController2.default, {}));
            }
        }]);
        return FlexMatrixContainer;
    }(React.Component);

    FlexMatrixContainer.listenerKey = 'FlexMatrix';
    FlexMatrixContainer.filterNames = ['flexdepart', 'flexreturn'];


    var ConnectedFlexMatrixContainer = ReactRedux.connect(function (_ref, _ref2) {
        var SearchPoll = _ref.SearchPoll;
        var fullWidth = _ref2.fullWidth,
            initialDisplayMode = _ref2.initialDisplayMode;
        return {
            fullWidth: fullWidth,
            initialDisplayMode: initialDisplayMode,
            SearchPoll: SearchPoll
        };
    })(FlexMatrixContainer);

    exports.default = ConnectedFlexMatrixContainer;
});define('default/common/icon/_svg_/heart', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg viewBox=\"0 -1 39 37\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"currentColor\" fill-rule=\"nonzero\" d=\"M35.88 3.166c4.16 4.177 4.16 10.992 0 15.213L20.02 34.472 19.5 35 3.12 18.423c-4.16-4.22-4.16-11.036 0-15.257 4.117-4.221 10.833-4.221 14.993 0L19.5 4.573l1.387-1.407c4.116-4.221 10.833-4.221 14.993 0zM7.757 5.1v5.276h5.2V5.1h-5.2zM4.29 10.377v3.517h3.467v-3.517H4.29z\"/></svg>";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/common/icon/_svg_/heart"}, params || {}, {svg: svgStr})); };
});define("default/common/results/react/constants/ResultsPageConstants", ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var RP_QUESTION_FILTER_DATA = exports.RP_QUESTION_FILTER_DATA = 'resultspage_filterData_get';
  var RP_QUESTION_FILTER_STATE = exports.RP_QUESTION_FILTER_STATE = 'resultspage_filterState_is';
});define("default/common/react/constants/breakPoints", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        xs: 320,
        s: 568,
        m: 768,
        l: 1024,
        xl: 1280
    };
});define('default/common/icon/_svg_/save-outline', ['exports', 'common/react/ReactSvgInline'], function(exports, SVGInline) {

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var svgStr = "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\"><path d=\"m22 13.37a3.4 3.4 0 0 0 -4.78 0l-.06.06-.06-.07a3.43 3.43 0 0 0 -4.78 0 3.32 3.32 0 0 0 0 4.75l4.84 4.78 4.84-4.77a3.32 3.32 0 0 0 0-4.75zm-1.4 3.32-3.44 3.39-3.43-3.39a1.35 1.35 0 0 1 -.41-1 1.32 1.32 0 0 1 .41-1 1.37 1.37 0 0 1 1-.4 1.41 1.41 0 0 1 1 .4l1.46 1.45 1.47-1.45a1.41 1.41 0 0 1 2 0 1.34 1.34 0 0 1 .4 1 1.31 1.31 0 0 1 -.46 1z\"/><path d=\"m9.49 17h-6.49v-10h16v3.43h.61a5.37 5.37 0 0 1 1.39.17v-3.6a2 2 0 0 0 -2-2h-4v-2a2 2 0 0 0 -2-2h-4a2 2 0 0 0 -2 2v2h-4a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h7.47a5.27 5.27 0 0 1 -.98-2zm-.49-14h4v2h-4z\"/></svg> ";

    exports['default'] = function(params) { return React.createElement(SVGInline.default, Object.assign({key: "default/common/icon/_svg_/save-outline"}, params || {}, {svg: svgStr})); };
});define("default/common/widgets/tip/react/constants/TooltipConstants", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /*
     * Tooltip positions and associated data
     */
    var initialPositions = {
        ABOVE: {
            name: 'ABOVE',
            pointerStyles: 'pointerDown',
            isAfterTarget: false,
            isVertical: true
        },
        RIGHT: {
            name: 'RIGHT',
            pointerStyles: 'pointerLeft',
            isAfterTarget: true,
            isVertical: false
        },
        BELOW: {
            name: 'BELOW',
            pointerStyles: 'pointerUp',
            isAfterTarget: true,
            isVertical: true
        },
        LEFT: {
            name: 'LEFT',
            pointerStyles: 'pointerRight',
            isAfterTarget: false,
            isVertical: false
        }
    };
    initialPositions.ABOVE.opposite = initialPositions.BELOW;
    initialPositions.RIGHT.opposite = initialPositions.LEFT;
    initialPositions.BELOW.opposite = initialPositions.ABOVE;
    initialPositions.LEFT.opposite = initialPositions.RIGHT;

    var positions = exports.positions = babelHelpers.extends({}, initialPositions);

    /*
     * Tooltip orientations, same concept as flexbox's flex-start/flex-end values
     */
    var orientations = exports.orientations = {
        START: 'START',
        CENTER: 'CENTER',
        END: 'END'
    };
});define("default/flights/results/react/FlexForAllInsightsBanner", ['exports', 'prop-types', 'stl!flights.results.FlexForAllInsightsBanner.Container', 'stl!flights.results.FlexForAllInsightsBanner.Container--opened', 'stl!flights.results.FlexForAllInsightsBanner.Container--opened--v2', 'stl!flights.results.FlexForAllInsightsBanner.Container--closed', 'stl!flights.results.FlexForAllInsightsBanner.Icon--BestDate', 'stl!flights.results.FlexForAllInsightsBanner.Icon--Savings', 'stl!flights.results.FlexForAllInsightsBanner.Icon--FlightQuality', 'stl!flights.results.FlexForAllInsightsBanner.Icon--Loading', 'stl!flights.results.FlexForAllInsightsBanner.Chevron--UiKit', 'stl!flights.results.FlexForAllInsightsBanner.Chevron--closed', 'stl!flights.results.FlexForAllInsightsBanner.Chevron--open', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_ALREADY_BEST', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_ALL_SAME', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_EARLIER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_LATER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_EARLIER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_LATER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_CHANGE_BOTH', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_EARLIER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_LATER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_EARLIER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_LATER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_CHANGE_BOTH', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_EARLIER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_LATER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_EARLIER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_LATER', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_CHANGE_BOTH', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_LOADING', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST_MISSED_THRESHOLD', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME_MISSED_THRESHOLD', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NEW_DATES', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_CHEAPER_FILTERED', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NONSTOP_FILTERED', 'string!flights/results//FLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_LOADING', 'flights/results/_svg_/calendar-star', 'flights/results/_svg_/calendar-inverted', 'flights/results/_svg_/stops-nonstop', 'property!horizon.flights.results.flexMatrix.presentation', 'flights/results/react/InsightsBanner', 'common/utils/react/logger', 'common/react/constants/layout', 'flights/results/react/constants/FlexMatrixConstants', 'common/icon/react/SvgIcon', 'flights/results/react/constants/InsightsBannerConstants', 'flights/results/react/constants/FlexForAllInsightsContants'], function (exports, _propTypes, _stlContainer, _stlContainerOpened, _stlContainerOpenedV, _stlContainerClosed, _stlIconBestDate, _stlIconSavings, _stlIconFlightQuality, _stlIconLoading, _stlChevronUiKit, _stlChevronClosed, _stlChevronOpen, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_ALREADY_BEST, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_ALL_SAME, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_EARLIER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_LATER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_EARLIER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_LATER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_CHANGE_BOTH, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_EARLIER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_LATER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_EARLIER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_LATER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_CHANGE_BOTH, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_EARLIER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_LATER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_EARLIER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_LATER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_CHANGE_BOTH, _stringFLEX_MATRIX_NEO_HEADING_LOADING, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST_MISSED_THRESHOLD, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME_MISSED_THRESHOLD, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NEW_DATES, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_CHEAPER_FILTERED, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NONSTOP_FILTERED, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_LOADING, _svgCalendarStar, _svgCalendarInverted, _svgStopsNonstop, _propertyHorizonFlightsResultsFlexMatrix, _InsightsBanner, _logger, _layout, _FlexMatrixConstants, _SvgIcon, _InsightsBannerConstants, _FlexForAllInsightsContants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _stlContainer2 = babelHelpers.interopRequireDefault(_stlContainer);

    var _stlContainerOpened2 = babelHelpers.interopRequireDefault(_stlContainerOpened);

    var _stlContainerOpenedV2 = babelHelpers.interopRequireDefault(_stlContainerOpenedV);

    var _stlContainerClosed2 = babelHelpers.interopRequireDefault(_stlContainerClosed);

    var _stlIconBestDate2 = babelHelpers.interopRequireDefault(_stlIconBestDate);

    var _stlIconSavings2 = babelHelpers.interopRequireDefault(_stlIconSavings);

    var _stlIconFlightQuality2 = babelHelpers.interopRequireDefault(_stlIconFlightQuality);

    var _stlIconLoading2 = babelHelpers.interopRequireDefault(_stlIconLoading);

    var _stlChevronUiKit2 = babelHelpers.interopRequireDefault(_stlChevronUiKit);

    var _stlChevronClosed2 = babelHelpers.interopRequireDefault(_stlChevronClosed);

    var _stlChevronOpen2 = babelHelpers.interopRequireDefault(_stlChevronOpen);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_ALREADY_BEST2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_ALREADY_BEST);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_ALL_SAME2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_ALL_SAME);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_EARLIER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_EARLIER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_LATER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_LATER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_EARLIER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_EARLIER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_LATER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_LATER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_CHANGE_BOTH2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_CHANGE_BOTH);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_EARLIER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_EARLIER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_LATER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_LATER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_EARLIER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_EARLIER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_LATER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_LATER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_CHANGE_BOTH2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_CHANGE_BOTH);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_EARLIER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_EARLIER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_LATER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_LATER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_EARLIER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_EARLIER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_LATER2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_LATER);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_CHANGE_BOTH2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_CHANGE_BOTH);

    var _stringFLEX_MATRIX_NEO_HEADING_LOADING2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_LOADING);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST_MISSED_THRESHOLD2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST_MISSED_THRESHOLD);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME_MISSED_THRESHOLD2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME_MISSED_THRESHOLD);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NEW_DATES2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NEW_DATES);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_CHEAPER_FILTERED2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_CHEAPER_FILTERED);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NONSTOP_FILTERED2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NONSTOP_FILTERED);

    var _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_LOADING2 = babelHelpers.interopRequireDefault(_stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_LOADING);

    var _svgCalendarStar2 = babelHelpers.interopRequireDefault(_svgCalendarStar);

    var _svgCalendarInverted2 = babelHelpers.interopRequireDefault(_svgCalendarInverted);

    var _svgStopsNonstop2 = babelHelpers.interopRequireDefault(_svgStopsNonstop);

    var _InsightsBanner2 = babelHelpers.interopRequireDefault(_InsightsBanner);

    var _logger2 = babelHelpers.interopRequireDefault(_logger);

    var _SvgIcon2 = babelHelpers.interopRequireDefault(_SvgIcon);

    var _borderedIconSvgs, _iconSvgSize, _iconThemeStl, _advantageTypes$SAVIN, _advantageTypes$NONST, _advantageTypes$NONST2, _savingsHeadingMessag, _savingsSubHeadingMes, _missedThresholdSavin, _savingsFilteredSubHe;

    var bannerData = {
        borderedIconSvgs: (_borderedIconSvgs = {}, babelHelpers.defineProperty(_borderedIconSvgs, _InsightsBannerConstants.advantageTypes.ALREADY_BEST, _svgCalendarStar2.default), babelHelpers.defineProperty(_borderedIconSvgs, _InsightsBannerConstants.advantageTypes.ALL_SAME, _svgCalendarStar2.default), babelHelpers.defineProperty(_borderedIconSvgs, _InsightsBannerConstants.advantageTypes.SAVINGS, _svgCalendarInverted2.default), babelHelpers.defineProperty(_borderedIconSvgs, _InsightsBannerConstants.advantageTypes.NONSTOP, _svgStopsNonstop2.default), babelHelpers.defineProperty(_borderedIconSvgs, _InsightsBannerConstants.advantageTypes.NONSTOP_SAVINGS, _svgStopsNonstop2.default), babelHelpers.defineProperty(_borderedIconSvgs, _InsightsBannerConstants.advantageTypes.LOADING, _svgCalendarInverted2.default), _borderedIconSvgs),
        iconSvgSize: (_iconSvgSize = {}, babelHelpers.defineProperty(_iconSvgSize, _InsightsBannerConstants.advantageTypes.ALREADY_BEST, _layout.sizes.MEDIUM), babelHelpers.defineProperty(_iconSvgSize, _InsightsBannerConstants.advantageTypes.ALL_SAME, _layout.sizes.MEDIUM), babelHelpers.defineProperty(_iconSvgSize, _InsightsBannerConstants.advantageTypes.SAVINGS, _layout.sizes.MEDIUM), babelHelpers.defineProperty(_iconSvgSize, _InsightsBannerConstants.advantageTypes.NONSTOP, _layout.sizes.LARGE), babelHelpers.defineProperty(_iconSvgSize, _InsightsBannerConstants.advantageTypes.NONSTOP_SAVINGS, _layout.sizes.LARGE), babelHelpers.defineProperty(_iconSvgSize, _InsightsBannerConstants.advantageTypes.LOADING, _layout.sizes.MEDIUM), _iconSvgSize),
        iconThemeStl: (_iconThemeStl = {}, babelHelpers.defineProperty(_iconThemeStl, _InsightsBannerConstants.advantageTypes.ALREADY_BEST, _stlIconBestDate2.default), babelHelpers.defineProperty(_iconThemeStl, _InsightsBannerConstants.advantageTypes.ALL_SAME, _stlIconBestDate2.default), babelHelpers.defineProperty(_iconThemeStl, _InsightsBannerConstants.advantageTypes.SAVINGS, _stlIconSavings2.default), babelHelpers.defineProperty(_iconThemeStl, _InsightsBannerConstants.advantageTypes.NONSTOP, _stlIconFlightQuality2.default), babelHelpers.defineProperty(_iconThemeStl, _InsightsBannerConstants.advantageTypes.NONSTOP_SAVINGS, _stlIconSavings2.default), babelHelpers.defineProperty(_iconThemeStl, _InsightsBannerConstants.advantageTypes.LOADING, _stlIconLoading2.default), _iconThemeStl),
        savingsHeadingMessages: (_savingsHeadingMessag = {}, babelHelpers.defineProperty(_savingsHeadingMessag, _InsightsBannerConstants.advantageTypes.ALREADY_BEST, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_ALREADY_BEST2.default), babelHelpers.defineProperty(_savingsHeadingMessag, _InsightsBannerConstants.advantageTypes.ALL_SAME, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_ALL_SAME2.default), babelHelpers.defineProperty(_savingsHeadingMessag, _InsightsBannerConstants.advantageTypes.SAVINGS, (_advantageTypes$SAVIN = {}, babelHelpers.defineProperty(_advantageTypes$SAVIN, _FlexForAllInsightsContants.flexRecommendationTypes.DEPART_BEFORE, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_EARLIER2.default), babelHelpers.defineProperty(_advantageTypes$SAVIN, _FlexForAllInsightsContants.flexRecommendationTypes.DEPART_AFTER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_DEPART_LATER2.default), babelHelpers.defineProperty(_advantageTypes$SAVIN, _FlexForAllInsightsContants.flexRecommendationTypes.RETURN_BEFORE, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_EARLIER2.default), babelHelpers.defineProperty(_advantageTypes$SAVIN, _FlexForAllInsightsContants.flexRecommendationTypes.RETURN_AFTER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_RETURN_LATER2.default), babelHelpers.defineProperty(_advantageTypes$SAVIN, _FlexForAllInsightsContants.flexRecommendationTypes.BOTH, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_CHANGE_BOTH2.default), _advantageTypes$SAVIN)), babelHelpers.defineProperty(_savingsHeadingMessag, _InsightsBannerConstants.advantageTypes.NONSTOP, (_advantageTypes$NONST = {}, babelHelpers.defineProperty(_advantageTypes$NONST, _FlexForAllInsightsContants.flexRecommendationTypes.DEPART_BEFORE, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_EARLIER2.default), babelHelpers.defineProperty(_advantageTypes$NONST, _FlexForAllInsightsContants.flexRecommendationTypes.DEPART_AFTER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_DEPART_LATER2.default), babelHelpers.defineProperty(_advantageTypes$NONST, _FlexForAllInsightsContants.flexRecommendationTypes.RETURN_BEFORE, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_EARLIER2.default), babelHelpers.defineProperty(_advantageTypes$NONST, _FlexForAllInsightsContants.flexRecommendationTypes.RETURN_AFTER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_RETURN_LATER2.default), babelHelpers.defineProperty(_advantageTypes$NONST, _FlexForAllInsightsContants.flexRecommendationTypes.BOTH, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_CHANGE_BOTH2.default), _advantageTypes$NONST)), babelHelpers.defineProperty(_savingsHeadingMessag, _InsightsBannerConstants.advantageTypes.NONSTOP_SAVINGS, (_advantageTypes$NONST2 = {}, babelHelpers.defineProperty(_advantageTypes$NONST2, _FlexForAllInsightsContants.flexRecommendationTypes.DEPART_BEFORE, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_EARLIER2.default), babelHelpers.defineProperty(_advantageTypes$NONST2, _FlexForAllInsightsContants.flexRecommendationTypes.DEPART_AFTER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_DEPART_LATER2.default), babelHelpers.defineProperty(_advantageTypes$NONST2, _FlexForAllInsightsContants.flexRecommendationTypes.RETURN_BEFORE, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_EARLIER2.default), babelHelpers.defineProperty(_advantageTypes$NONST2, _FlexForAllInsightsContants.flexRecommendationTypes.RETURN_AFTER, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_RETURN_LATER2.default), babelHelpers.defineProperty(_advantageTypes$NONST2, _FlexForAllInsightsContants.flexRecommendationTypes.BOTH, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_NONSTOP_SAVE_CHANGE_BOTH2.default), _advantageTypes$NONST2)), babelHelpers.defineProperty(_savingsHeadingMessag, _InsightsBannerConstants.advantageTypes.LOADING, _stringFLEX_MATRIX_NEO_HEADING_LOADING2.default), babelHelpers.defineProperty(_savingsHeadingMessag, _InsightsBannerConstants.advantageTypes.DEFAULT, _stringFLEX_MATRIX_NEO_HEADING_LOADING2.default), _savingsHeadingMessag),
        savingsSubHeadingMessages: (_savingsSubHeadingMes = {}, babelHelpers.defineProperty(_savingsSubHeadingMes, _InsightsBannerConstants.advantageTypes.ALREADY_BEST, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST2.default), babelHelpers.defineProperty(_savingsSubHeadingMes, _InsightsBannerConstants.advantageTypes.ALL_SAME, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME2.default), babelHelpers.defineProperty(_savingsSubHeadingMes, _InsightsBannerConstants.advantageTypes.SAVINGS, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES2.default), babelHelpers.defineProperty(_savingsSubHeadingMes, _InsightsBannerConstants.advantageTypes.NONSTOP, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES2.default), babelHelpers.defineProperty(_savingsSubHeadingMes, _InsightsBannerConstants.advantageTypes.NONSTOP_SAVINGS, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES2.default), babelHelpers.defineProperty(_savingsSubHeadingMes, _InsightsBannerConstants.advantageTypes.LOADING, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_LOADING2.default), babelHelpers.defineProperty(_savingsSubHeadingMes, _InsightsBannerConstants.advantageTypes.DEFAULT, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_LOADING2.default), _savingsSubHeadingMes),
        missedThresholdSavingsSubHeadingMessages: (_missedThresholdSavin = {}, babelHelpers.defineProperty(_missedThresholdSavin, _InsightsBannerConstants.advantageTypes.ALREADY_BEST, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST_MISSED_THRESHOLD2.default), babelHelpers.defineProperty(_missedThresholdSavin, _InsightsBannerConstants.advantageTypes.ALL_SAME, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME_MISSED_THRESHOLD2.default), babelHelpers.defineProperty(_missedThresholdSavin, _InsightsBannerConstants.advantageTypes.SAVINGS, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES2.default), babelHelpers.defineProperty(_missedThresholdSavin, _InsightsBannerConstants.advantageTypes.NONSTOP, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES2.default), babelHelpers.defineProperty(_missedThresholdSavin, _InsightsBannerConstants.advantageTypes.NONSTOP_SAVINGS, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_RECOMMENDED_DATES2.default), babelHelpers.defineProperty(_missedThresholdSavin, _InsightsBannerConstants.advantageTypes.LOADING, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_LOADING2.default), _missedThresholdSavin),
        savingsFilteredSubHeadingMessages: (_savingsFilteredSubHe = {}, babelHelpers.defineProperty(_savingsFilteredSubHe, _InsightsBannerConstants.advantageTypes.ALREADY_BEST, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALREADY_BEST2.default), babelHelpers.defineProperty(_savingsFilteredSubHe, _InsightsBannerConstants.advantageTypes.ALL_SAME, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_ALL_SAME2.default), babelHelpers.defineProperty(_savingsFilteredSubHe, _InsightsBannerConstants.advantageTypes.SAVINGS, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_CHEAPER_FILTERED2.default), babelHelpers.defineProperty(_savingsFilteredSubHe, _InsightsBannerConstants.advantageTypes.NONSTOP, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NONSTOP_FILTERED2.default), babelHelpers.defineProperty(_savingsFilteredSubHe, _InsightsBannerConstants.advantageTypes.NONSTOP_SAVINGS, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_CHEAPER_FILTERED2.default), babelHelpers.defineProperty(_savingsFilteredSubHe, _InsightsBannerConstants.advantageTypes.LOADING, _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_LOADING2.default), _savingsFilteredSubHe)
    };

    var FlexForAllInsightsBanner = function (_React$Component) {
        babelHelpers.inherits(FlexForAllInsightsBanner, _React$Component);

        function FlexForAllInsightsBanner(props) {
            babelHelpers.classCallCheck(this, FlexForAllInsightsBanner);

            var _this = babelHelpers.possibleConstructorReturn(this, (FlexForAllInsightsBanner.__proto__ || Object.getPrototypeOf(FlexForAllInsightsBanner)).call(this, props));

            _this.logger = new _logger2.default('flights/results/FlexForAllInsightsBanner');
            return _this;
        }

        babelHelpers.createClass(FlexForAllInsightsBanner, [{
            key: 'getErrorMessageFallback',
            value: function getErrorMessageFallback() {
                var _this2 = this;

                var _ref = this.props.InsightsBanner.data || {},
                    advantageType = _ref.advantageType,
                    recommendationType = _ref.recommendationType;

                var errorFunction = function errorFunction() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    _this2.logger.error('invalid Flex Savings Header message combination: savings type: ' + advantageType + ' \n date change type: ' + recommendationType);
                    return bannerData.savingsHeadingMessages[_InsightsBannerConstants.advantageTypes.DEFAULT].value(args);
                };
                errorFunction.value = errorFunction;
                return errorFunction;
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    accordionOpen = _props.accordionOpen,
                    anyFilterApplied = _props.anyFilterApplied,
                    hasNotification = _props.hasNotification,
                    hasResults = _props.hasResults,
                    InsightsBanner = _props.InsightsBanner,
                    queryDatesSelected = _props.queryDatesSelected,
                    savingsMissedThreshold = _props.savingsMissedThreshold,
                    selectedDateCount = _props.selectedDateCount;
                var _InsightsBanner$data = InsightsBanner.data,
                    advantageType = _InsightsBanner$data.advantageType,
                    departDaysAway = _InsightsBanner$data.departDaysAway,
                    displaySavings = _InsightsBanner$data.displaySavings,
                    recommendationType = _InsightsBanner$data.recommendationType,
                    returnDaysAway = _InsightsBanner$data.returnDaysAway,
                    subheadingDateRange = _InsightsBanner$data.subheadingDateRange,
                    type = _InsightsBanner$data.type;


                var daysAway = departDaysAway || returnDaysAway || 0;

                var headingMessageBundle = void 0;
                if (!bannerData.savingsHeadingMessages[advantageType]) {
                    headingMessageBundle = this.getErrorMessageFallback();
                } else if (typeof bannerData.savingsHeadingMessages[advantageType] === 'function') {
                    headingMessageBundle = bannerData.savingsHeadingMessages[advantageType];
                } else {
                    headingMessageBundle = bannerData.savingsHeadingMessages[advantageType][recommendationType] || this.getErrorMessageFallback();
                }

                var subHeadingMessageBundle = bannerData.savingsSubHeadingMessages[_InsightsBannerConstants.advantageTypes.DEFAULT];
                if (!queryDatesSelected && selectedDateCount === 1 && anyFilterApplied) {
                    subHeadingMessageBundle = _stringFLEX_MATRIX_NEO_HEADING_SAVINGS_SUBHEADING_NEW_DATES2.default;
                } else if (hasNotification) {
                    subHeadingMessageBundle = bannerData.savingsFilteredSubHeadingMessages[advantageType];
                } else if (savingsMissedThreshold) {
                    subHeadingMessageBundle = bannerData.missedThresholdSavingsSubHeadingMessages[advantageType];
                } else if (bannerData.savingsSubHeadingMessages[advantageType]) {
                    subHeadingMessageBundle = bannerData.savingsSubHeadingMessages[advantageType];
                }

                var stlContainerState = void 0;
                if (accordionOpen) {
                    stlContainerState = (0, _propertyHorizonFlightsResultsFlexMatrix.getString)() === _FlexMatrixConstants.presentationKeys.V2 ? _stlContainerOpenedV2.default : _stlContainerOpened2.default;
                } else {
                    stlContainerState = _stlContainerClosed2.default;
                }
                return babelHelpers.jsx(_InsightsBanner2.default, {
                    advantageType: advantageType,
                    bannerData: bannerData,
                    containerCssClasses: _stlContainer2.default + ' ' + stlContainerState,
                    hasResults: hasResults,
                    headingMessage: headingMessageBundle.value(daysAway, daysAway, displaySavings),
                    props: this.props,
                    recommendationType: recommendationType,
                    showNotificationIndicator: hasNotification,
                    subHeadingMessage: subHeadingMessageBundle.value(subheadingDateRange, displaySavings),
                    type: type
                }, void 0, hasResults && advantageType !== _InsightsBannerConstants.advantageTypes.LOADING && babelHelpers.jsx(_SvgIcon2.default, {
                    name: 'chevron-stroke',
                    className: _stlChevronUiKit2.default + ' ' + (accordionOpen ? _stlChevronOpen2.default : _stlChevronClosed2.default),
                    width: '16',
                    height: '16'
                }));
            }
        }]);
        return FlexForAllInsightsBanner;
    }(React.Component);

    exports.default = FlexForAllInsightsBanner;


    FlexForAllInsightsBanner.propTypes = {
        accordionOpen: _propTypes2.default.bool.isRequired,
        anyFilterApplied: _propTypes2.default.bool.isRequired,
        hasNotification: _propTypes2.default.bool.isRequired,
        hasResults: _propTypes2.default.bool.isRequired,
        InsightsBanner: _propTypes2.default.shape(_FlexForAllInsightsContants.flexInsightsBannerShape).isRequired,
        queryDatesSelected: _propTypes2.default.bool.isRequired,
        selectedDateCount: _propTypes2.default.string.isRequired
    };
});define("default/flights/results/react/constants/FlexForAllInsightsContants", ['exports', 'prop-types', 'flights/results/react/constants/InsightsBannerConstants'], function (exports, _propTypes, _InsightsBannerConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.flexInsightsBannerShape = exports.flexRecommendationTypes = undefined;

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var flexRecommendationTypes = exports.flexRecommendationTypes = babelHelpers.extends({}, _InsightsBannerConstants.genericRecommendationTypes, {
        DEPART_BEFORE: 'DEPART_BEFORE',
        DEPART_AFTER: 'DEPART_AFTER',
        RETURN_BEFORE: 'RETURN_BEFORE',
        RETURN_AFTER: 'RETURN_AFTER',
        BOTH: 'BOTH'
    });

    var flexInsightsBannerShape = exports.flexInsightsBannerShape = {
        data: _propTypes2.default.shape(babelHelpers.extends({}, _InsightsBannerConstants.genericInsightsBannerDataShape, {
            departDaysAway: _propTypes2.default.number,
            displaySavings: _propTypes2.default.string,
            recommendationType: _propTypes2.default.oneOf(Object.values(flexRecommendationTypes)).isRequired,
            recommendedDates: _propTypes2.default.string,
            returnDaysAway: _propTypes2.default.number
        })),
        ui: _propTypes2.default.shape(_InsightsBannerConstants.genericInsightsBannerUiShape)
    };
});define("default/react-dom", ["exports","module","context"], function (exports, module, context) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    get: function() { return true; },
    set: function() {}
});



module.exports = ReactDOM;
});
define("default/common/analytics/react/Analytics", ['exports', 'context', 'common/analytics/react/Google', 'common/analytics/react/VSLog', 'common/react/constants/globals'], function (exports, _context, _Google, _VSLog, _globals) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NonVisualAnalytics = undefined;

    var _context2 = babelHelpers.interopRequireDefault(_context);

    var _Google2 = babelHelpers.interopRequireDefault(_Google);

    var _VSLog2 = babelHelpers.interopRequireDefault(_VSLog);

    var _globals2 = babelHelpers.interopRequireDefault(_globals);

    var Analytics = function () {
        function Analytics() {
            var globals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _globals2.default;
            babelHelpers.classCallCheck(this, Analytics);


            this.isServer = _context2.default.isServer();

            if (this.isServer) {
                return;
            }

            this.globals = globals;

            var google = new _Google2.default(globals);
            var vsLog = new _VSLog2.default(globals);

            this.handlers = {
                pageView: [google.pageHandler.bind(google), vsLog.pageHandler.bind(vsLog)],
                event: [google.eventHandler.bind(google), vsLog.eventHandler.bind(vsLog)],
                autoEvent: [google.eventHandler.bind(google), vsLog.eventHandler.bind(vsLog)]
            };
        }

        babelHelpers.createClass(Analytics, [{
            key: 'track',
            value: function track(handler, data, callback) {
                if (this.isServer) {
                    callback && callback();
                    return;
                }

                if (this.globals.analytics.doNotTrack) {
                    return;
                }
                Analytics.handle(handler, data, callback);
            }
        }, {
            key: 'trackPageView',
            value: function trackPageView(data, callback) {
                if (this.isServer) {
                    callback && callback();
                    return;
                }
                this.track(this.handlers.pageView, this.makePageData(data), callback);
            }
        }, {
            key: 'trackEvent',
            value: function trackEvent(data, callback) {
                if (this.isServer) {
                    callback && callback();
                    return;
                }
                this.track(this.handlers.event, this.makeEventData(data), callback);
            }
        }, {
            key: 'trackAutoEvent',
            value: function trackAutoEvent(data, callback) {
                if (this.isServer) {
                    callback && callback();
                    return;
                }
                var eventData = this.makeEventData(data);
                eventData.auto = true;
                this.track(this.handlers.autoEvent, eventData, callback);
            }
        }, {
            key: 'makeEventData',
            value: function makeEventData(allArgs) {
                var args = allArgs;
                if (typeof allArgs === 'string') {
                    args = { category: allArgs };
                }
                var data = this.makeCommonData(allArgs);

                var searchId = null;

                if (!searchId && _context2.default.isClient()) {
                    searchId = window.SearchID;
                }
                if (searchId) {
                    data.searchid = searchId;
                }

                if (args) {
                    data.category = args.category;
                    data.params = args.params;
                    data.searchid = data.searchid || args.searchid;
                    data.action = args.action;
                    data.label = args.label;
                    data.value = args.value;
                }

                return data;
            }
        }, {
            key: 'makePageData',
            value: function makePageData(allArgs) {
                return this.makeCommonData(allArgs);
            }
        }, {
            key: 'makeCommonData',
            value: function makeCommonData() {
                var allArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var data = {};
                var analytics = this.globals.analytics || {};

                data.vertical = allArgs.vertical || analytics.vertical || this.globals.vertical;
                data.locale = allArgs.locale || this.globals.locale.loc;
                data.affiliate = allArgs.affiliate || this.globals.affiliate;
                data.affiliateskin = allArgs.affiliateskin || allArgs.brand || this.globals.affiliateskin || this.globals.brand;
                data.experiment = allArgs.experiment || this.globals.experiment;
                data.pageId = allArgs.pageId || analytics.pageId;
                data.subPageId = allArgs.subPageId || analytics.subPageId;
                data.presentation = allArgs.presentation || analytics.presentation || this.globals.presentation;
                data.pixelContext = allArgs.pixelContext || analytics.pixelContext || {};
                data.loginState = allArgs.loginState || analytics.loginState;
                data.sessionId = allArgs.sessionId || analytics.sessionId;

                return data;
            }
        }], [{
            key: 'handle',
            value: function handle(handlers, data, callback) {
                var defs = [];

                handlers.forEach(function (handler) {
                    return defs.push(handler(data));
                });

                if (callback) {
                    Promise.all(defs).then(callback);
                }
            }
        }]);
        return Analytics;
    }();

    exports.default = Analytics;
    var NonVisualAnalytics = exports.NonVisualAnalytics = ReactRedux.connect(function (state) {
        return {
            global: state.global
        };
    })(function (props) {
        var state = props.global;

        if (_context2.default.isClient()) {
            new Analytics(state).trackPageView();
        }

        return null;
    });
});define("default/common/utilities/react/Constants", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var translateRe = exports.translateRe = /[öäüÖÄÜáàâéèêúùûóòôÁÀÂÉÈÊÚÙÛÓÒÔßæçØøðÇÐÌÍÎÏìíîïÑñŠšŸÿýŽžŒабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯΑαΆάΒβΓγΔδΕεΈέΖζΗηΉήΘθΙιΊίΪϊΐΚκΛλΜμΝνΞξΟοΌόΠπΡρΣσςΤτΥυΎύΫϋΰΦφΧχΨψΩωΏώ]/g;

    /* eslint-disable */
    var translate = exports.translate = {
        "ä": "a", "ö": "o", "ü": "u",
        "Ä": "A", "Ö": "O", "Ü": "U",
        "á": "a", "à": "a", "â": "a",
        "é": "e", "è": "e", "ê": "e",
        "ú": "u", "ù": "u", "û": "u",
        "ó": "o", "ò": "o", "ô": "o",
        "Á": "A", "À": "A", "Â": "A",
        "É": "E", "È": "E", "Ê": "E",
        "Ú": "U", "Ù": "U", "Û": "U",
        "Ó": "O", "Ò": "O", "Ô": "O",
        "ß": "s", "æ": "o", "ç": "c",
        "Ø": "O", "ø": "o", "ð": "e",
        "Ç": "C", "Ð": "D", "Ì": "I",
        "Í": "I", "Î": "I", "Ï": "I",
        "ì": "i", "í": "i", "î": "i",
        "ï": "i", "Ñ": "N", "ñ": "n",
        "Š": "S", "š": "s", "Ÿ": "Y",
        "ÿ": "y", "ý": "y", "Ž": "Z",
        "ž": "z", "Œ": "O", "ć": "c",
        "а": "a", "б": "b", "в": "v",
        "г": "g", "д": "d", "е": "e",
        "ё": "jo", "ж": "zh", "з": "z",
        "и": "i", "й": "jj", "к": "k",
        "л": "l", "м": "m", "н": "n",
        "о": "o", "п": "p", "р": "r",
        "с": "s", "т": "t", "у": "u",
        "ф": "f", "х": "kh", "ц": "c",
        "ч": "ch", "ш": "sh", "щ": "shh",
        "ъ": "\"", "ы": "y", "ь": "'",
        "э": "eh", "ю": "ju", "я": "ja",
        "А": "A", "Б": "B", "В": "V",
        "Г": "G", "Д": "D", "Е": "E",
        "Ё": "JO", "Ж": "ZH", "З": "Z",
        "И": "I", "Й": "JJ", "К": "K",
        "Л": "L", "М": "M", "Н": "N",
        "О": "O", "П": "P", "Р": "R",
        "С": "S", "Т": "T", "У": "U",
        "Ф": "F", "Х": "KH", "Ц": "C",
        "Ч": "CH", "Ш": "SH", "Щ": "SHH",
        "Ъ": '""', "Ы": "Y", "Ь": "''",
        "Э": "EH", "Ю": "JU", "Я": "JA",
        "Α": "A", "α": "a", "Ά": "A",
        "ά": "a", "Β": "V", "β": "v",
        "Γ": "G", "γ": "g", "Δ": "D",
        "δ": "d", "Ε": "E", "ε": "e",
        "Έ": "E", "έ": "e", "Ζ": "Z",
        "ζ": "z", "Η": "I", "η": "i",
        "Ή": "I", "ή": "i", "Θ": "Th",
        "θ": "th", "Ι": "I", "ι": "i",
        "Ί": "I", "ί": "i", "Ϊ": "I",
        "ϊ": "i", "ΐ": "i", "Κ": "K",
        "κ": "k", "Λ": "L", "λ": "l",
        "Μ": "M", "μ": "m", "Ν": "N",
        "ν": "n", "Ξ": "X", "ξ": "x",
        "Ο": "O", "ο": "o", "Ό": "O",
        "ό": "o", "Π": "P", "π": "p",
        "Ρ": "R", "ρ": "r", "Σ": "S",
        "σ": "s", "ς": "s", "Τ": "T",
        "τ": "t", "Υ": "Y", "υ": "y",
        "Ύ": "Y", "ύ": "y", "Ϋ": "Y",
        "ϋ": "y", "ΰ": "y", "Φ": "F",
        "φ": "f", "Χ": "Ch", "χ": "ch",
        "Ψ": "Ps", "ψ": "ps", "Ω": "O",
        "ω": "o", "Ώ": "O", "ώ": "o"
    };
    /* eslint-enable */

    var ISO_DATE = exports.ISO_DATE = 'YYYY-MM-DD';
});define("default/flights/results/react/reducers/FlexMatrixReducer", ['exports', 'flights/results/react/actions/FlexMatrixActions', 'common/results/filters/react/actions/FilterStateActions', 'common/results/react/actions/SearchPollActions', 'flights/results/react/constants/InsightsBannerConstants', 'flights/results/react/constants/FlexMatrixConstants', 'flights/results/react/utils/FlexMatrixClientBuilder', 'flights/results/react/reducers/FlexMatrixPredictedDatesReducer', 'common/results/react/reducers/SearchPollListenerReducer', 'common/results/react/constants/SearchPollConstants', 'flights/results/react/utils/FlexMatrixClientProcessingUtils'], function (exports, _FlexMatrixActions, _FilterStateActions, _SearchPollActions, _InsightsBannerConstants, _FlexMatrixConstants, _FlexMatrixClientBuilder, _FlexMatrixPredictedDatesReducer, _SearchPollListenerReducer, _SearchPollConstants, _FlexMatrixClientProcessingUtils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initialState = undefined;

    exports.default = function (state, action) {
        var reduced = flexMatrixReducer(state, action);
        if (state && state.config && state.config.flexDatePredictionsEnabled) {
            return (0, _FlexMatrixPredictedDatesReducer2.default)(state, action, reduced);
        }
        return reduced;
    };

    var flexMatrixActions = babelHelpers.interopRequireWildcard(_FlexMatrixActions);
    var filterStateActions = babelHelpers.interopRequireWildcard(_FilterStateActions);
    var searchPollActions = babelHelpers.interopRequireWildcard(_SearchPollActions);

    var _FlexMatrixPredictedDatesReducer2 = babelHelpers.interopRequireDefault(_FlexMatrixPredictedDatesReducer);

    /* eslint-disable no-case-declarations */

    var initialState = exports.initialState = {
        clientDerivedData: _FlexMatrixPredictedDatesReducer.initialClientDerivedData,
        config: {
            smallDisplayPrice: false,
            flexForAllEnabled: false,
            flexDatePredictionsEnabled: false,
            priceCategoryConfig: {
                badPricePercentAboveAvg: 70,
                calculateBestPrice: true,
                calculateGoodPrice: false,
                calculateBadPrice: false,
                calculateWorstPrice: true,
                goodPricePercentBelowAvg: 30,
                maxCellsPerCategory: 21,
                medianMaxAverageToBoundsRatio: 3,
                minUniquePrices: 3,
                minPriceRange: 15
            }
        },
        data: (0, _FlexMatrixClientBuilder.buildPlaceholderPollData)(),
        ui: {
            accordionOpen: undefined,
            defaultDatesSelected: true,
            displayMode: _FlexMatrixConstants.displayModes.NONE,
            enabledDepartLabelCount: 0,
            enabledReturnLabelCount: 0,
            hasBanner: false,
            hasNonstopToggle: false,
            hoveredDepartCell: '',
            hoveredReturnCell: '',
            hoveredDepartAxis: '',
            hoveredReturnAxis: '',
            nonstopOnly: false,
            predictionCellCount: NaN,
            standardCellCount: NaN,
            undoStopsFilterState: null
        }
    };

    function getFlexTypeOrOverride(flexType, state) {
        if (state.config.flexDatePredictionsEnabled === true) {
            return 'plusminusthree';
        }
        return flexType;
    }

    function getDisplayModeFromSearchStart(data, state) {
        if (!data.isMulticity) {
            if (state.config.flexDatePredictionsEnabled) {
                return _FlexMatrixConstants.displayModes.FLEX_DATE_PREDICTIONS;
            } else if (data.depart_date_flex === 'exact' && state.config.flexForAllEnabled) {
                return _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER;
            } else if (!['weekend', 'openflex'].includes(data.flexCategory) && (data.depart_date_flex !== 'exact' || data.return_date_flex && data.return_date_flex !== 'exact')) {
                return _FlexMatrixConstants.displayModes.PLUS_MINUS_THREE;
            }
        }
        return _FlexMatrixConstants.displayModes.NONE;
    }

    function getDisplayModeFromSearchPoll(searchPoll, state, hasBanner, searchEnded) {
        if (searchEnded && searchPoll.flexMatrix && searchPoll.flexMatrix.displayMode === _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER && hasBanner && searchPoll.flexForAllInsightsBanner && _InsightsBannerConstants.advantageTypeGroups.NO_DATA.includes(searchPoll.flexForAllInsightsBanner.advantageType)) {
            return _FlexMatrixConstants.displayModes.NONE;
        }
        if ([_SearchPollConstants.searchPollStatus.NO_RESULTS, _SearchPollConstants.searchPollStatus.SEARCH_ERROR].includes((0, _SearchPollListenerReducer.getPollStatus)(searchPoll))) {
            return _FlexMatrixConstants.displayModes.NONE;
        }
        if (typeof searchPoll.isFlex === 'undefined') {
            return state.ui.displayMode;
        }
        if (!searchPoll.isMulticity) {
            if (state.config.flexDatePredictionsEnabled) {
                return _FlexMatrixConstants.displayModes.FLEX_DATE_PREDICTIONS;
            } else if (searchPoll.isFlex === true && searchPoll.showPlusMinusThree !== false) {
                return _FlexMatrixConstants.displayModes.PLUS_MINUS_THREE;
            } else if (state.config.flexForAllEnabled && !searchPoll.isFlex && hasBanner && searchPoll.flexForAllInsightsBanner && (!searchPoll.completed || searchPoll.filteredCount !== 0) && !_InsightsBannerConstants.advantageTypeGroups.NO_ADVANTAGE.includes(searchPoll.flexForAllInsightsBanner.advantageType)) {
                return _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER;
            }
        }
        return _FlexMatrixConstants.displayModes.NONE;
    }

    /*
     * Controls FlexMatrix ui, poll data, and config. (Config property imports are only available to component files for some reason)
     * If predicted flex dates are enabled, that data is handled by another reducer called after this function
     */
    function flexMatrixReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _ref = action.payload || {},
            departCanon = _ref.depart_date_canon,
            returnCanon = _ref.return_date_canon,
            departFlex = _ref.depart_date_flex,
            returnFlex = _ref.return_date_flex;

        var displayMode = void 0;
        var flexMatrix = void 0;
        var departLabels = void 0;
        var returnLabels = void 0;

        switch (action.type) {
            case searchPollActions.CLEAR_SEARCH:
            case searchPollActions.INIT_POLLING:
            case searchPollActions.UPDATE_START_SEARCH_PARAMS:
                displayMode = getDisplayModeFromSearchStart(action.payload, state);
                return babelHelpers.extends({}, state, {
                    data: (0, _FlexMatrixClientBuilder.buildPlaceholderPollData)(departCanon, returnCanon, getFlexTypeOrOverride(departFlex, state), getFlexTypeOrOverride(returnFlex, state), displayMode),
                    ui: babelHelpers.extends({}, initialState.ui, {
                        displayMode: displayMode,
                        hasBanner: !!state.config.flexForAllEnabled && _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER === displayMode,
                        hasNonstopToggle: false,
                        nonstopOnly: false
                    })
                });

            case searchPollActions.POLL_RESPONSE:
            case searchPollActions.END_POLLING:
                var insightsBanner = action.payload.flexForAllInsightsBanner;


                var hasBanner = insightsBanner ? insightsBanner.location === _InsightsBannerConstants.bannerLocations.FLEX_MATRIX && !_InsightsBannerConstants.advantageTypeGroups.NO_ADVANTAGE.includes(insightsBanner.advantageType) : state.ui.hasBanner;
                if (hasBanner === undefined) {
                    hasBanner = initialState.ui.hasBanner;
                }
                displayMode = getDisplayModeFromSearchPoll(action.payload, state, hasBanner, action.payload.type === searchPollActions.END_POLLING);

                flexMatrix = action.payload.flexMatrix && action.payload.flexMatrix.matrixEntries ? action.payload.flexMatrix : state.data;

                var _getFinalDerivedFlexM = (0, _FlexMatrixClientProcessingUtils.getFinalDerivedFlexMatrixData)(flexMatrix, action, state);

                departLabels = _getFinalDerivedFlexM.departLabels;
                returnLabels = _getFinalDerivedFlexM.returnLabels;


                return babelHelpers.extends({}, state, {
                    data: babelHelpers.extends({}, flexMatrix, {
                        departLabels: departLabels,
                        returnLabels: returnLabels
                    }),
                    ui: babelHelpers.extends({}, initialState.ui, state.ui, {
                        accordionOpen: _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER !== displayMode || !insightsBanner || _InsightsBannerConstants.bannerTypes.USE_PREVIOUS === insightsBanner.type ? state.ui.accordionOpen : state.ui.accordionOpen && (!hasBanner || _InsightsBannerConstants.advantageTypes.LOADING !== insightsBanner.advantageType),
                        displayMode: displayMode,
                        defaultDatesSelected: flexMatrix.matrixEntries && Object.values(flexMatrix.matrixEntries).every(function (entry) {
                            return entry.selected === entry.queryDate;
                        }),
                        enabledDepartLabelCount: departLabels.filter(function (l) {
                            return !l.disabled;
                        }).length,
                        enabledReturnLabelCount: returnLabels.filter(function (l) {
                            return !l.disabled;
                        }).length,
                        hasBanner: hasBanner,
                        hasNonstopToggle: hasBanner && !flexMatrix.disableNonstopToggle && insightsBanner && _InsightsBannerConstants.advantageTypeGroups.NONSTOP.includes(insightsBanner.advantageType),
                        standardCellCount: Object.keys(flexMatrix.matrixEntries).length
                    })
                });

            case filterStateActions.FILTER_RESET_PENDING:
            case filterStateActions.UPDATE_FILTER_DATA:
                departLabels = (0, _FlexMatrixClientProcessingUtils.syncAxisLabelsToFilterState)(state.data.departLabels, action.payload.data.flexdepart, state.ui.displayMode);
                returnLabels = (0, _FlexMatrixClientProcessingUtils.syncAxisLabelsToFilterState)(state.data.returnLabels, action.payload.data.flexreturn, state.ui.displayMode);
                var matrixEntries = (0, _FlexMatrixClientProcessingUtils.syncMatrixEntriesToFilterState)(state, departLabels, returnLabels);
                var selectedEntries = Object.values(matrixEntries).filter(function (e) {
                    return e.selected;
                });
                return babelHelpers.extends({}, state, {
                    data: babelHelpers.extends({}, state.data, {
                        departLabels: departLabels,
                        matrixEntries: matrixEntries,
                        returnLabels: returnLabels,
                        selectedDateCount: selectedEntries.length
                    }),
                    ui: babelHelpers.extends({}, state.ui, {
                        defaultDatesSelected: selectedEntries.length === 1 && selectedEntries[0].queryDate
                    })
                });

            case flexMatrixActions.CHANGE_ACCORDION_STATE:
                return babelHelpers.extends({}, state, {
                    ui: babelHelpers.extends({}, state.ui, {
                        accordionOpen: action.payload.accordionOpen
                    })
                });

            case flexMatrixActions.UPDATE_NONSTOP_ONLY:
                return babelHelpers.extends({}, state, {
                    ui: babelHelpers.extends({}, state.ui, {
                        nonstopOnly: action.payload,
                        undoStopsFilterState: null
                    })
                });

            case flexMatrixActions.SET_UNDO_STOPS_FILTER_STATE:
                return babelHelpers.extends({}, state, {
                    ui: babelHelpers.extends({}, state.ui, {
                        undoStopsFilterState: action.payload.filterState
                    })
                });

            case flexMatrixActions.UPDATE_HOVERED_CELL:
            case flexMatrixActions.UPDATE_HOVERED_AXIS_LABEL:
                return babelHelpers.extends({}, state, {
                    ui: babelHelpers.extends({}, state.ui, {
                        hoveredDepartCell: action.payload.departId,
                        hoveredReturnCell: action.payload.returnId
                    })
                });

            default:
                return babelHelpers.extends({}, initialState, state, {
                    data: babelHelpers.extends({}, initialState.data, state.data && state.data.matrixEntries ? state.data : {}),
                    ui: babelHelpers.extends({}, initialState.ui, state.ui, {
                        hasBanner: state.config && state.ui && state.config.flexForAllEnabled && _FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER === state.ui.displayMode
                    })
                });
        }
    }
});define("default/flights/results/react/reducers/NearbyAirportInsightsBannerReducer", ['exports', 'flights/results/react/actions/NearbyAirportInsightsBannerActions', 'common/results/react/actions/SearchPollActions', 'flights/results/react/constants/InsightsBannerConstants'], function (exports, _NearbyAirportInsightsBannerActions, _SearchPollActions, _InsightsBannerConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initialState = undefined;

    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        switch (action.type) {
            case nearbyAirportActions.SET_NEARBY_RECOMMENDATION_APPLIED:
                return babelHelpers.extends({}, state, {
                    ui: babelHelpers.extends({}, state.ui, {
                        nearbyRecommendationApplied: valueOrDefault(action.payload.nearbyRecommendationApplied, state.ui.nearbyRecommendationApplied),
                        undoFilterState: valueOrDefault(action.payload.undoFilterState, state.ui.undoFilterState)
                    })
                });
            case searchPollActions.CLEAR_SEARCH:
            case searchPollActions.INIT_POLLING:
            case searchPollActions.UPDATE_START_SEARCH_PARAMS:
                return babelHelpers.extends({}, state, initialState);
            case searchPollActions.POLL_RESPONSE:
            case searchPollActions.END_POLLING:
                return babelHelpers.extends({}, state, {
                    data: dataFromSearchPoll(action.payload, state)
                });
            default:
                return babelHelpers.extends({}, initialState, state);
        }
    };

    var nearbyAirportActions = babelHelpers.interopRequireWildcard(_NearbyAirportInsightsBannerActions);
    var searchPollActions = babelHelpers.interopRequireWildcard(_SearchPollActions);
    var initialState = exports.initialState = {
        data: {
            type: _InsightsBannerConstants.bannerTypes.DEFAULT,
            advantageType: _InsightsBannerConstants.advantageTypes.LOADING,
            recommendationType: _InsightsBannerConstants.genericRecommendationTypes.NONE,
            location: _InsightsBannerConstants.bannerLocations.RESULTS_TOP,
            destinationCode: '',
            lowestPrice: '',
            originCode: '',
            savings: ''
        },
        ui: {
            nearbyRecommendationApplied: false,
            undoFilterState: {}
        }
    }; /* eslint-disable no-case-declarations */

    function dataFromSearchPoll(_ref, state) {
        var banner = _ref.nearbyAirportInsightsBanner;

        if (state.ui.nearbyRecommendationApplied) {
            return state.data;
        }
        if (banner && _InsightsBannerConstants.bannerTypes.USE_PREVIOUS !== banner.type) {
            return babelHelpers.extends({}, initialState.data, banner);
        }
        return state.data || initialState.data;
    }

    function valueOrDefault(value, defaultValue) {
        return typeof value !== 'undefined' ? value : defaultValue;
    }

    /*
     * This controls state for the banner that shows better alternate searches than the current search
     */
});define("default/flights/results/react/utils/FlexMatrixClientProcessingUtils", ['exports', 'flights/results/react/constants/FlexMatrixConstants'], function (exports, _FlexMatrixConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.syncMatrixEntriesToFilterState = syncMatrixEntriesToFilterState;
    exports.syncAxisLabelsToFilterState = syncAxisLabelsToFilterState;
    exports.getFinalDerivedFlexMatrixData = getFinalDerivedFlexMatrixData;


    /**
     * Each axis of the flex matrix is a filter, so the matrix entries need to be synced to both axes' filter states.
     */
    function syncMatrixEntriesToFilterState(state, departLabels, returnLabels) {
        var checkedDepartDates = departLabels.filter(function (label) {
            return label.checked;
        }).map(function (label) {
            return label.filterValue;
        });
        var checkedReturnDates = returnLabels ? returnLabels.filter(function (label) {
            return label.checked;
        }).map(function (label) {
            return label.filterValue;
        }) : null;
        var queryDepartDate = departLabels.filter(function (label) {
            return label.queryDate;
        }).map(function (label) {
            return label.filterValue;
        });
        var queryReturnDate = returnLabels ? returnLabels.filter(function (label) {
            return label.queryDate;
        }).map(function (label) {
            return label.filterValue;
        }) : null;
        var oldEntries = state.data.matrixEntries;
        var newEntries = {};
        Object.keys(oldEntries).forEach(function (key) {
            newEntries[key] = babelHelpers.extends({}, oldEntries[key], {
                queryDate: queryDepartDate.includes(oldEntries[key].departFilterValue) && (queryReturnDate === null || queryReturnDate.includes(oldEntries[key].returnFilterValue)),
                selected: checkedDepartDates.includes(oldEntries[key].departFilterValue) && (checkedReturnDates === null || checkedReturnDates.includes(oldEntries[key].returnFilterValue))
            });
        });
        return newEntries;
    } /**
       * Common methods for processing flex matrix data and merging it with current state.
       * Normally only used for reducers
       */

    function isAxisLabelCheckedDefault(label, displayMode) {
        if (_FlexMatrixConstants.displayModes.FLEX_FOR_ALL_BANNER === displayMode) {
            return label.queryDate;
        }
        return true;
    }

    /**
     * Match each date in the passed axis to the current filter state
     * @param axisLabels - Axis dates to sync, can be either depart or return labels
     * @param legFilterState - Either the flexdepart or flexreturn filter state, matching the passed axisLabels' axis
     * @param displayMode - current FlexMatrix display mode
     */
    function syncAxisLabelsToFilterState() {
        var axisLabels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var legFilterState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var displayMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _FlexMatrixConstants.displayModes.NONE;

        if (legFilterState.valueMap) {
            return axisLabels.map(function (label) {
                return babelHelpers.extends({}, label, {
                    checked: legFilterState.valueMap[label.filterValue] && typeof legFilterState.valueMap[label.filterValue].selected !== 'undefined' ? !!legFilterState.valueMap[label.filterValue].selected : isAxisLabelCheckedDefault(label, displayMode)
                });
            });
        }
        return axisLabels;
    }

    /*
     * Sets matrix axis labels' "disabled" state if:
     * 1. all entries for label are disabled
     * 2. all entries are flex date predictions
     */
    function syncDisabledAxisLabels(axisLabels, oppositeAxisLabels, matrixEntries, entryFilterKey) {
        var allAxisValuesCount = oppositeAxisLabels.length;
        var disabledEntryCounts = {};
        Object.values(matrixEntries).filter(function (entry) {
            return entry.prediction || entry.placeholder || entry.disabled;
        }).forEach(function (entry) {
            disabledEntryCounts[entry[entryFilterKey]] = (disabledEntryCounts[entry[entryFilterKey]] || 0) + 1;
        });

        return axisLabels.reduce(function (resultArray, currentLabel) {
            return resultArray.concat(babelHelpers.extends({}, currentLabel, { disabled: disabledEntryCounts[currentLabel.filterValue] === allAxisValuesCount }));
        }, []);
    }
    function syncDisabledDepartLabels(_ref) {
        var departLabels = _ref.departLabels,
            matrixEntries = _ref.matrixEntries,
            returnLabels = _ref.returnLabels;

        return syncDisabledAxisLabels(departLabels, returnLabels, matrixEntries, 'departFilterValue');
    }
    function syncDisabledReturnLabels(_ref2) {
        var departLabels = _ref2.departLabels,
            matrixEntries = _ref2.matrixEntries,
            returnLabels = _ref2.returnLabels;

        return syncDisabledAxisLabels(returnLabels, departLabels, matrixEntries, 'returnFilterValue');
    }

    /**
     * Get all data derived from the final, processed flex matrix
     * @param flexMatrix - Processed flex matrix, corresponding to store's FlexMatrix.data object
     * @param action
     * @param state
     * @return {{departLabels: array, returnLabels: array, predictionCellCount: number}}
     */
    function getFinalDerivedFlexMatrixData(flexMatrix, action, state) {
        return {
            departLabels: syncDisabledDepartLabels(flexMatrix),
            returnLabels: syncDisabledReturnLabels(flexMatrix),
            predictionCellCount: state.config.flexDatePredictionsEnabled && action.payload.resultsChanged && flexMatrix.matrixEntries ? Object.values(flexMatrix.matrixEntries).filter(function (e) {
                return e.prediction;
            }).length : state.ui.predictionCellCount
        };
    }
});define("default/flights/results/react/reducers/FlexForAllInsightsBannerReducer", ['exports', 'common/results/react/actions/SearchPollActions', 'common/results/filters/react/reducers/FilterStateReducer', 'flights/results/react/actions/FlexMatrixActions', 'flights/results/react/constants/InsightsBannerConstants', 'flights/results/react/constants/FlexForAllInsightsContants'], function (exports, _SearchPollActions, _FilterStateReducer, _FlexMatrixActions, _InsightsBannerConstants, _FlexForAllInsightsContants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initialState = undefined;

    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        switch (action.type) {
            case flexMatrixActions.DISMISS_NOTIFICATION:
                return babelHelpers.extends({}, state, {
                    ui: babelHelpers.extends({}, state.ui, {
                        hasNotification: false
                    })
                });
            case searchPollActions.CLEAR_SEARCH:
            case searchPollActions.INIT_POLLING:
            case searchPollActions.UPDATE_START_SEARCH_PARAMS:
                return babelHelpers.extends({}, state, {
                    data: babelHelpers.extends({}, state.data, initialState.data),
                    private: {
                        filtersData: {},
                        isFlex: action.payload.isFlex
                    },
                    ui: babelHelpers.extends({}, state.ui, {
                        hasNotification: false,
                        shouldDisplay: shouldDisplayFromSearchStart(action.payload, state)
                    })
                });
            case searchPollActions.POLL_RESPONSE:
            case searchPollActions.END_POLLING:
                return babelHelpers.extends({}, state, {
                    data: dataFromSearchPoll(action.payload, state),
                    private: babelHelpers.extends({}, state.private, {
                        filtersData: action.payload.filtersData || state.private.filtersData || {}
                    }),
                    ui: babelHelpers.extends({}, state.ui, {
                        hasNotification: hasNotificationFromPoll(action.payload, state),
                        shouldDisplay: shouldDisplayFromSearchPoll(action.payload, state)
                    })
                });
            default:
                return babelHelpers.extends({}, initialState, state);
        }
    };

    var searchPollActions = babelHelpers.interopRequireWildcard(_SearchPollActions);
    var filterStateReducer = babelHelpers.interopRequireWildcard(_FilterStateReducer);
    var flexMatrixActions = babelHelpers.interopRequireWildcard(_FlexMatrixActions);
    var initialState = exports.initialState = {
        config: {
            flexForAllBannerEnabled: false
        },
        data: {
            type: _InsightsBannerConstants.bannerTypes.FLEX_FOR_ALL,
            advantageType: _InsightsBannerConstants.advantageTypes.LOADING,
            recommendationType: _FlexForAllInsightsContants.flexRecommendationTypes.NONE,
            location: _InsightsBannerConstants.bannerLocations.FLEX_MATRIX,
            disableNonstopToggle: false,
            departFilterValue: '',
            returnFilterValue: '',
            subheadingDateRange: '',
            departDaysAway: 0,
            returnDaysAway: 0,
            queryDatesSelected: true,
            savingsMissedThreshold: false
        },
        private: {
            filtersData: {},
            isFlex: false
        },
        ui: {
            hasNotification: false,
            shouldDisplay: false
        }
    };

    function shouldDisplayFromSearchStart(data, state) {
        if (data.depart_date_flex) {
            return state.config.flexForAllBannerEnabled && data.depart_date_flex === 'exact' && !data.isMulticity;
        }
        return state.ui.shouldDisplay;
    }

    function shouldDisplayFromSearchPoll(data, state) {
        if (data.flex_category) {
            return state.config.flexForAllBannerEnabled && data.flex_category === 'exact' && !data.isMulticity;
        }
        return state.ui.shouldDisplay;
    }

    function dataFromSearchPoll(searchPoll, state) {
        if (searchPoll.flexForAllInsightsBanner && _InsightsBannerConstants.bannerTypes.USE_PREVIOUS !== searchPoll.flexForAllInsightsBanner.type) {
            // Only update the banner if non-flex filters are applied.
            if (!searchPoll.flexForAllInsightsBanner.queryDatesSelected && (!state.private.filtersData || Object.keys(searchPoll.filtersData).filter(function (filterName) {
                return !['flexdepart', 'flexreturn'].includes(filterName);
            }).every(function (filterName) {
                return state.private.filtersData[filterName] && !searchPoll.filtersData[filterName].isUserManipulated && !state.private.filtersData[filterName].isUserManipulated;
            }))) {
                return state.data;
            }
            return babelHelpers.extends({}, initialState.data, searchPoll.flexForAllInsightsBanner);
        }
        return state.data || initialState.data;
    }

    function hasNotificationFromPoll(searchPoll, state) {
        if (!state.ui.shouldDisplay) {
            return false;
        }
        if (!searchPoll || !searchPoll.resultsChanged || !searchPoll.flexForAllInsightsBanner) {
            return state.ui.hasNotification;
        }
        return searchPoll.filteredCount > 0 && searchPoll.resultsChanged && searchPoll.flexForAllInsightsBanner.recommendationType !== _FlexForAllInsightsContants.flexRecommendationTypes.NONE && filterStateReducer.anyFilterAppliedFromFiltersData(searchPoll.filtersData);
    }

    /*
     * This controls state for the banner that shows better alternate searches than the current search
     */
});define("default/common/results/react/reducers/SearchPollListenerReducer", ['exports', 'common/utils/react/ImmutableObjectUtils', 'common/results/react/constants/SearchPollConstants', 'common/results/react/actions/SearchPollActions'], function (exports, _ImmutableObjectUtils, _SearchPollConstants, _SearchPollActions) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initialState = undefined;
    exports.getPollStatus = getPollStatus;

    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var status = void 0;
        filteredCount = filteredCount === null && state.filteredCount ? state.filteredCount // First run, accept json param in state
        : action.payload && action.payload.filteredCount || filteredCount;

        switch (action.type) {
            case actions.CLEAR_SEARCH:
                return initialState;

            case actions.INIT_POLLING:
                return babelHelpers.extends({}, initialState, (0, _ImmutableObjectUtils.omit)(action.payload, pollKeysToOmit), {
                    noResults: false,
                    status: _SearchPollConstants.searchPollStatus.SEARCH_STARTED
                });
            case actions.UPDATE_START_SEARCH_PARAMS:
                return babelHelpers.extends({}, state, (0, _ImmutableObjectUtils.omit)(action.payload, pollKeysToOmit));

            case actions.POLL_RESPONSE:
                status = getPollStatus(action.payload);
                return babelHelpers.extends({}, state, (0, _ImmutableObjectUtils.omit)(action.payload, pollKeysToOmit), {
                    noResults: [_SearchPollConstants.searchPollStatus.NO_RESULTS, _SearchPollConstants.searchPollStatus.SEARCH_ERROR].includes(status),
                    status: status
                });

            case actions.END_POLLING:
                status = getPollStatus(action.payload);
                return babelHelpers.extends({}, initialState, state, (0, _ImmutableObjectUtils.omit)(action.payload, pollKeysToOmit), {
                    noResults: [_SearchPollConstants.searchPollStatus.NO_RESULTS, _SearchPollConstants.searchPollStatus.SEARCH_ERROR].includes(status),
                    status: getPollStatus(action.payload)
                });

            default:
                return babelHelpers.extends({}, state, {
                    resultsChanged: state === initialState
                });
        }
    };

    var actions = babelHelpers.interopRequireWildcard(_SearchPollActions);
    var initialState = exports.initialState = {
        activeCabin: 'e',
        completed: false,
        depart_date_canon: '',
        destination: '',
        destinationId: '',
        filteredCount: 0,
        firstPhaseCompleted: false,
        flexCategory: '',
        isFlex: false,
        isMulticity: false,
        isOneWay: false,
        isRoundTrip: true,
        noResults: false,
        origin: '',
        originId: '',
        pageNumber: 1,
        resultsChanged: true,
        return_date_canon: '',
        status: _SearchPollConstants.searchPollStatus.NO_SEARCH
    };

    /*
     * All search poll keys that are handled by other reducers belong here.
     */
    var pollKeysToOmit = ['averagePriceInsightsBanner', 'insightsBanner', 'filtersData', 'flexForAllInsightsBanner', 'flexMatrix'];

    var filteredCount = null;

    function getPollStatus(data) {
        if (data.error) {
            if (data.searchExpired) {
                return _SearchPollConstants.searchPollStatus.SEARCH_EXPIRED;
            }
            return _SearchPollConstants.searchPollStatus.SEARCH_ERROR;
        } else if (data.completed) {
            if (data.filteredCount === 0 || filteredCount === 0) {
                return _SearchPollConstants.searchPollStatus.NO_RESULTS;
            }
            return _SearchPollConstants.searchPollStatus.SEARCH_FINISHED;
        } else if (data.searchStartedThisPoll) {
            return _SearchPollConstants.searchPollStatus.FIRST_PHASE;
        } else if (data.isFirstPhaseCompleted) {
            return _SearchPollConstants.searchPollStatus.SECOND_PHASE;
        }
        return _SearchPollConstants.searchPollStatus.FIRST_PHASE;
    }
});define("default/common/results/react/reducers/WatchlistReducer", ['exports', 'common/results/react/actions/WatchlistActions'], function (exports, _WatchlistActions) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var type = action.type,
            payload = action.payload;


        switch (type) {
            case _WatchlistActions.UPDATE_WATCHLIST:
                return updateWatchlist(state, payload);
            case _WatchlistActions.ADD_TO_WATCHLIST:
                return addToWatchlist(state, payload);
            case _WatchlistActions.TOGGLE_ITEM_STATE:
                return updateItemState(state, payload);
            case _WatchlistActions.REMOVE_FROM_WATCHLIST:
                return removeFromWatchlist(state, payload);
            default:
                return state;
        }
    };

    var initialState = {
        hotels: [],
        flights: [],
        cars: [],
        packages: [],
        trains: [],
        rentals: []
    };

    function updateWatchlist(state, payload) {
        var newState = babelHelpers.extends({}, state);
        newState[payload.vertical] = [].concat(payload.watchList);

        return newState;
    }

    function addToWatchlist(state, payload) {
        var vertical = payload.vertical,
            item = payload.item;

        var newState = babelHelpers.extends({}, state);

        newState[vertical] = [].concat(newState[vertical]);

        if (!newState[vertical].filter(function (ri) {
            return ri.resultId === item.resultId;
        }).length) {
            newState[vertical].push(item);
        }

        return newState;
    }

    function updateItemState(state, _ref) {
        var vertical = _ref.vertical,
            resultId = _ref.resultId,
            isPaused = _ref.isPaused,
            alertId = _ref.alertId;

        var newState = babelHelpers.extends({}, state);
        newState[vertical] = [].concat(newState[vertical]);

        newState[vertical].forEach(function (itemState, idx) {
            if (resultId === itemState.resultId) {
                newState[vertical][idx] = babelHelpers.extends({}, itemState, { isPaused: isPaused, alertId: alertId });
            }
        });

        return newState;
    }

    function removeFromWatchlist(state, _ref2) {
        var vertical = _ref2.vertical,
            resultId = _ref2.resultId;

        var newState = babelHelpers.extends({}, state);

        newState[vertical] = [].concat(newState[vertical]).filter(function (item) {
            return item.resultId !== resultId;
        });

        return newState;
    }
});define("default/flights/results/react/reducers/AveragePriceInsightsBannerReducer", ['exports', 'common/results/react/actions/SearchPollActions', 'flights/results/react/actions/SearchPredictionsAjaxActions', 'flights/results/react/constants/AveragePriceInsightsConstants', 'flights/results/react/constants/InsightsBannerConstants', 'flights/results/react/utils/AveragePriceInsightsBannerUtils'], function (exports, _SearchPollActions, _SearchPredictionsAjaxActions, _AveragePriceInsightsConstants, _InsightsBannerConstants, _AveragePriceInsightsBannerUtils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initialState = undefined;

    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        switch (action.type) {
            case searchPredictionsAjaxActions.REQUEST_MONTH_PRICES:
                {
                    return babelHelpers.extends({}, state, {
                        clientDerivedData: babelHelpers.extends({}, state.clientDerivedData, {
                            ajaxStatus: _InsightsBannerConstants.ajaxRequestStatus.REQUEST_PENDING
                        })
                    });
                }
            case searchPredictionsAjaxActions.RECEIVE_MONTH_PRICE:
                {
                    var _pricePercentDifference = (0, _AveragePriceInsightsBannerUtils.getAbsolutePricePercentDifference)(state.data.cheapestSearchPrice, action.payload.price);
                    return babelHelpers.extends({}, state, {
                        clientDerivedData: babelHelpers.extends({}, state.clientDerivedData, {
                            advantageType: (0, _AveragePriceInsightsBannerUtils.getClientDerivedAdvantageType)(state, state.data.cheapestSearchPrice, action.payload.price),
                            ajaxStatus: _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_RECEIVED,
                            averagePrice: action.payload.price,
                            averagePriceDisplay: action.payload.displayPrice,
                            averagePriceMonths: action.payload.displayMonths,
                            pricePercentDifference: _pricePercentDifference,
                            recommendationType: (0, _AveragePriceInsightsBannerUtils.getClientDerivedRecommendationType)(state.data.cheapestSearchPrice, action.payload.price, _pricePercentDifference, state.config.averagePricePercentThreshold)
                        })
                    });
                }
            case searchPredictionsAjaxActions.RECEIVE_NO_MONTH_PRICES:
                {
                    return babelHelpers.extends({}, state, {
                        clientDerivedData: babelHelpers.extends({}, state.clientDerivedData, {
                            advantageType: _AveragePriceInsightsConstants.averagePriceAdvantageTypes.NONE,
                            ajaxStatus: _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_RECEIVED,
                            averagePrice: action.payload.price,
                            averagePriceDisplay: '',
                            averagePriceMonths: [],
                            pricePercentDifference: NaN,
                            recommendationType: _AveragePriceInsightsConstants.averagePriceRecommendationTypes.NONE
                        }),
                        ui: {
                            shouldDisplay: false
                        }
                    });
                }
            case searchPredictionsAjaxActions.RECEIVE_MONTH_PRICE_ERROR:
                {
                    return babelHelpers.extends({}, state, {
                        clientDerivedData: babelHelpers.extends({}, state.clientDerivedData, {
                            advantageType: _AveragePriceInsightsConstants.averagePriceAdvantageTypes.ERROR,
                            ajaxStatus: _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_ERROR,
                            averagePrice: action.payload.price,
                            averagePriceDisplay: '',
                            averagePriceMonths: [],
                            pricePercentDifference: NaN,
                            recommendationType: _AveragePriceInsightsConstants.averagePriceRecommendationTypes.NONE
                        }),
                        ui: {
                            shouldDisplay: false
                        }
                    });
                }
            case searchPollActions.CLEAR_SEARCH:
            case searchPollActions.INIT_POLLING:
            case searchPollActions.UPDATE_START_SEARCH_PARAMS:
                return babelHelpers.extends({}, state, {
                    clientDerivedData: babelHelpers.extends({}, initialState.clientDerivedData, {
                        ajaxStatus: state.clientDerivedData.ajaxStatus !== _InsightsBannerConstants.ajaxRequestStatus.REQUEST_PENDING ? _InsightsBannerConstants.ajaxRequestStatus.START_REQUEST : state.clientDerivedData.ajaxStatus,
                        recommendationType: _AveragePriceInsightsConstants.averagePriceRecommendationTypes.NONE
                    }),
                    data: babelHelpers.extends({}, state.data, initialState.data, {
                        type: state.config.averagePriceBannerEnabled ? _InsightsBannerConstants.bannerTypes.AVERAGE_PRICE : _InsightsBannerConstants.bannerTypes.DEFAULT
                    }),
                    private: {
                        isFlex: action.payload.isFlex
                    },
                    ui: {
                        shouldDisplay: state.config.averagePriceBannerEnabled && !action.payload.isMulticity
                    }
                });
            case searchPollActions.POLL_RESPONSE:
            case searchPollActions.END_POLLING:
                var bannerData = action.payload.averagePriceInsightsBanner || state.data;
                var pricePercentDifference = (0, _AveragePriceInsightsBannerUtils.getAbsolutePricePercentDifference)(bannerData.cheapestSearchPrice, state.clientDerivedData.averagePrice);
                var clientDerivedAdvantageType = (0, _AveragePriceInsightsBannerUtils.getClientDerivedAdvantageType)(state, bannerData.cheapestSearchPrice, state.clientDerivedData.averagePrice, action.payload.completed);
                return babelHelpers.extends({}, state, {
                    clientDerivedData: babelHelpers.extends({}, state.clientDerivedData, {
                        advantageType: clientDerivedAdvantageType,
                        pricePercentDifference: pricePercentDifference,
                        recommendationType: (0, _AveragePriceInsightsBannerUtils.getClientDerivedRecommendationType)(bannerData.cheapestSearchPrice, state.clientDerivedData.averagePrice, pricePercentDifference, state.config.averagePricePercentThreshold)
                    }),
                    data: dataFromSearchPoll(action.payload, state),
                    private: {
                        isFlex: action.payload.isFlex
                    },
                    ui: {
                        shouldDisplay: state.ui.shouldDisplay && !_InsightsBannerConstants.advantageTypeGroups.NO_DATA.includes(clientDerivedAdvantageType)
                    }
                });
            default:
                return babelHelpers.extends({}, initialState, state);
        }
    };

    var searchPollActions = babelHelpers.interopRequireWildcard(_SearchPollActions);
    var searchPredictionsAjaxActions = babelHelpers.interopRequireWildcard(_SearchPredictionsAjaxActions);
    var initialState = exports.initialState = {
        clientDerivedData: {
            advantageType: _AveragePriceInsightsConstants.averagePriceAdvantageTypes.LOADING,
            ajaxStatus: _InsightsBannerConstants.ajaxRequestStatus.NO_REQUEST,
            averagePrice: undefined,
            averagePriceDisplay: '',
            averagePriceMonths: [],
            pricePercentDifference: NaN,
            recommendationType: _AveragePriceInsightsConstants.averagePriceRecommendationTypes.NONE
        },
        config: {
            averagePriceBannerEnabled: false,
            averagePricePercentThreshold: NaN
        },
        data: {
            type: _InsightsBannerConstants.bannerTypes.DEFAULT,
            advantageType: _AveragePriceInsightsConstants.averagePriceAdvantageTypes.LOADING,
            cheapestSearchPrice: null,
            recommendationType: _AveragePriceInsightsConstants.averagePriceRecommendationTypes.NONE,
            location: _InsightsBannerConstants.bannerLocations.RESULTS_TOP
        },
        private: {
            isFlex: false
        },
        ui: {
            shouldDisplay: false
        }
    }; /* eslint-disable no-case-declarations */

    function dataFromSearchPoll(searchPoll, state) {
        if (searchPoll.averagePriceInsightsBanner && _InsightsBannerConstants.bannerTypes.USE_PREVIOUS !== searchPoll.averagePriceInsightsBanner.type) {
            return babelHelpers.extends({}, initialState.data, searchPoll.averagePriceInsightsBanner);
        }
        return state.data || initialState.data;
    }

    /*
     * This controls state for the banner that shows better alternate searches than the current search
     */
});define("default/common/react/reducers/PageGlobals", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        switch (action.type) {
            default:
                return state;
        }
    };

    var initialState = [];
});define("default/common/results/filters/react/reducers/FilterStateReducer", ['exports', 'common/results/filters/react/actions/FilterStateActions', 'common/results/react/actions/SearchPollActions'], function (exports, _FilterStateActions, _SearchPollActions) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initialState = undefined;
    exports.anyFilterAppliedFromFiltersData = anyFilterAppliedFromFiltersData;

    exports.default = function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var data = void 0;
        switch (action.type) {
            case searchPollActions.CLEAR_SEARCH:
            case searchPollActions.INIT_POLLING:
                return babelHelpers.extends({}, action.payload.preserveFilters && state.data ? state : initialState, {
                    ui: babelHelpers.extends({}, initialState.ui, action.payload.preserveFilters && state.ui ? state.ui : {}, {
                        pendingFilterData: {}
                    })
                });

            case searchPollActions.POLL_RESPONSE:
                data = babelHelpers.extends({}, state.data, action.payload.filtersData || action.payload.data, {
                    filteredCount: action.payload.filteredCount || state.data.filteredCount
                });
                return babelHelpers.extends({}, state, {
                    data: data,
                    ui: uiStateFromData(data, state, action.payload)
                });
            case filterActions.UPDATE_FILTER_DATA:
                data = babelHelpers.extends({}, state.data, action.payload.data);
                return babelHelpers.extends({}, state, {
                    data: data,
                    ui: uiStateFromFilterUpdate(data, state.data)
                });
            case filterActions.ANY_FILTERS_CHANGED:
                return babelHelpers.extends({}, state, {
                    ui: babelHelpers.extends({}, state.ui, {
                        filtersChanged: !action.payload.data.reset && !ignoredFilters.includes(action.payload.data.name) && !!action.payload.data.changeData
                    })
                });
            case filterActions.FILTER_RESET_PENDING:
                return babelHelpers.extends({}, state, {
                    data: babelHelpers.extends({}, state.data, action.payload.data),
                    ui: {
                        anyFilterApplied: false,
                        filtersChanged: false,
                        flexFiltersApplied: state.ui.flexFiltersApplied,
                        pendingFilterData: action.payload.data
                    }
                });

            default:
                return babelHelpers.extends({}, initialState, state);
        }
    };

    var filterActions = babelHelpers.interopRequireWildcard(_FilterStateActions);
    var searchPollActions = babelHelpers.interopRequireWildcard(_SearchPollActions);


    // Add filter keys as needed
    var initialState = exports.initialState = {
        data: {
            filteredCount: 0,
            flexdepart: { valueMap: {} },
            flexreturn: { valueMap: {} }
        },
        ui: {
            anyFilterApplied: false,
            filtersChanged: false,
            flexFilterApplied: false,
            pendingFilterData: {}
        }
    };

    var ignoredFilters = ['flexdepart', 'flexreturn', 'baditin', 'bfc', 'cfc', 'pfc', 'airports'];

    // Todo: Make this data come from flightResultsMeta so that other reducers don't need to calculate this a second time
    function anyFilterAppliedFromFiltersData(data) {
        return Object.keys(data).some(function (filterName) {
            return data[filterName] && data[filterName].isUserManipulated && !ignoredFilters.includes(filterName);
        });
    }

    function uiStateFromData() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var state = arguments[1];
        var searchPoll = arguments[2];

        return {
            anyFilterApplied: anyFilterAppliedFromFiltersData(data),
            filtersChanged: !searchPoll || typeof searchPoll.filteredCount !== 'undefined' && searchPoll.filteredCount !== state.data.filteredCount,
            flexFilterApplied: data.flexdepart && data.flexdepart.isDirty || data.flexreturn && data.flexreturn.isDirty,
            pendingFilterData: data && Object.keys(data).length ? {} : state.ui.pendingFilterData
        };
    }

    function uiStateFromFilterUpdate() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var prevData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return {
            anyFilterApplied: Object.keys(data).some(function (name) {
                return data[name] && data[name].isUserManipulated && !ignoredFilters.includes(name);
            }),
            filtersChanged: Object.keys(data).some(function (key) {
                return key && !ignoredFilters.includes(key) && (!prevData[key] || key.isUserManupulated !== prevData[key].isUserManupulated);
            }),
            flexFilterApplied: data.flexdepart && data.flexdepart.isDirty || data.flexreturn && data.flexreturn.isDirty,
            pendingFilterData: data
        };
    }
});define("default/common/results/react/actions/WatchlistActions", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.updateWatchlist = updateWatchlist;
    exports.addToWatchlist = addToWatchlist;
    exports.toggleItemState = toggleItemState;
    exports.removeFromWatchlist = removeFromWatchlist;
    var UPDATE_WATCHLIST = exports.UPDATE_WATCHLIST = "updateWatchlist";
    var ADD_TO_WATCHLIST = exports.ADD_TO_WATCHLIST = "addToWatchlist";
    var TOGGLE_ITEM_STATE = exports.TOGGLE_ITEM_STATE = "toggleItemState";
    var REMOVE_FROM_WATCHLIST = exports.REMOVE_FROM_WATCHLIST = "removeFromWatchlist";

    function updateWatchlist(vertical, watchList) {
        return {
            type: UPDATE_WATCHLIST,
            payload: {
                vertical: vertical,
                watchList: watchList
            }
        };
    }

    function addToWatchlist(vertical, item) {
        return {
            type: ADD_TO_WATCHLIST,
            payload: {
                vertical: vertical,
                item: item
            }
        };
    }

    function toggleItemState(vertical, resultId, isPaused, alertId) {
        return {
            type: TOGGLE_ITEM_STATE,
            payload: {
                vertical: vertical,
                resultId: resultId,
                isPaused: isPaused,
                alertId: alertId
            }
        };
    }

    function removeFromWatchlist(vertical, resultId) {
        return {
            type: REMOVE_FROM_WATCHLIST,
            payload: {
                vertical: vertical,
                resultId: resultId
            }
        };
    }
});define("default/flights/results/react/utils/AveragePriceInsightsBannerUtils", ['exports', 'flights/results/react/constants/AveragePriceInsightsConstants'], function (exports, _AveragePriceInsightsConstants) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getClientDerivedAdvantageType = getClientDerivedAdvantageType;
    exports.getAbsolutePricePercentDifference = getAbsolutePricePercentDifference;
    exports.getClientDerivedRecommendationType = getClientDerivedRecommendationType;


    /*
     * For any function with searchPrice and averagePrice params:
     *
     * Null or undefined prices are considered part of an in-progress request.
     * Negative one or NaN prices are considered finished requests with no price data.
     */

    function getClientDerivedAdvantageType(prevState, searchPrice, averagePrice, searchCompleted) {
        var isFlexSearch = prevState.private.isFlex;
        var searchPriceLoading = !isFlexSearch && (searchPrice === null || searchPrice === undefined);
        var averagePriceLoading = averagePrice === null || averagePrice === undefined;
        var noSearchPrice = !searchPrice || searchPrice <= 0;
        var noAveragePrice = !averagePrice || averagePrice <= 0;

        if (searchPriceLoading && averagePriceLoading) {
            return prevState.data.advantageType;
        } else if (averagePriceLoading && (searchPriceLoading || !noSearchPrice)) {
            return _AveragePriceInsightsConstants.averagePriceAdvantageTypes.LOADING_AVERAGE_PRICE;
        } else if (isFlexSearch) {
            return _AveragePriceInsightsConstants.averagePriceAdvantageTypes.FLEX_SEARCH_LET_THE_USER_DECIDE;
        } else if (searchPriceLoading && !noAveragePrice && searchCompleted !== true) {
            return _AveragePriceInsightsConstants.averagePriceAdvantageTypes.LOADING_SEARCH_PRICE;
        } else if (noSearchPrice || noAveragePrice) {
            return _AveragePriceInsightsConstants.averagePriceAdvantageTypes.NONE;
        }
        return _AveragePriceInsightsConstants.averagePriceAdvantageTypes.SAVINGS;
    }

    function getAbsolutePricePercentDifference(searchPrice, averagePrice) {
        if (!searchPrice || !averagePrice || searchPrice <= 0 || averagePrice <= 0) {
            return NaN;
        }
        var isSearchPriceAboveAverage = searchPrice > averagePrice;
        var absoluteDifference = isSearchPriceAboveAverage ? searchPrice / averagePrice : averagePrice / searchPrice;
        return Math.round(absoluteDifference * 100) - 100;
    }

    function getClientDerivedRecommendationType(searchPrice, averagePrice) {
        var percentDifference = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getAbsolutePricePercentDifference(searchPrice, averagePrice);
        var recommendationPercentThreshold = arguments[3];

        if (!percentDifference && percentDifference !== 0) {
            return _AveragePriceInsightsConstants.averagePriceRecommendationTypes.NONE;
        }
        if (!recommendationPercentThreshold && recommendationPercentThreshold !== 0) {
            throw new Error('AveragePriceInsightsBanner#getClientDerivedRecommendationType:            Invalid argument for recommendationPercentThreshold: ' + recommendationPercentThreshold);
        }
        if (percentDifference >= recommendationPercentThreshold) {
            if (searchPrice > averagePrice) {
                return _AveragePriceInsightsConstants.averagePriceRecommendationTypes.ABOVE_AVERAGE_PRICE;
            }
            return _AveragePriceInsightsConstants.averagePriceRecommendationTypes.BELOW_AVERAGE_PRICE;
        }
        return _AveragePriceInsightsConstants.averagePriceRecommendationTypes.AVERAGE_PRICE;
    }
});define("default/flights/results/react/reducers/FlightResultsPage", ['exports', 'common/react/reducers/PageGlobals', 'flights/results/react/reducers/FlexMatrixReducer', 'flights/results/react/reducers/AveragePriceInsightsBannerReducer', 'flights/results/react/reducers/FlexForAllInsightsBannerReducer', 'flights/results/react/reducers/NearbyAirportInsightsBannerReducer', 'common/results/react/reducers/SearchPollListenerReducer', 'common/results/filters/react/reducers/FilterStateReducer', 'common/results/react/reducers/WatchlistReducer'], function (exports, _PageGlobals, _FlexMatrixReducer, _AveragePriceInsightsBannerReducer, _FlexForAllInsightsBannerReducer, _NearbyAirportInsightsBannerReducer, _SearchPollListenerReducer, _FilterStateReducer, _WatchlistReducer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _PageGlobals2 = babelHelpers.interopRequireDefault(_PageGlobals);

    var _FlexMatrixReducer2 = babelHelpers.interopRequireDefault(_FlexMatrixReducer);

    var _AveragePriceInsightsBannerReducer2 = babelHelpers.interopRequireDefault(_AveragePriceInsightsBannerReducer);

    var _FlexForAllInsightsBannerReducer2 = babelHelpers.interopRequireDefault(_FlexForAllInsightsBannerReducer);

    var _NearbyAirportInsightsBannerReducer2 = babelHelpers.interopRequireDefault(_NearbyAirportInsightsBannerReducer);

    var _SearchPollListenerReducer2 = babelHelpers.interopRequireDefault(_SearchPollListenerReducer);

    var _FilterStateReducer2 = babelHelpers.interopRequireDefault(_FilterStateReducer);

    var _WatchlistReducer2 = babelHelpers.interopRequireDefault(_WatchlistReducer);

    exports.default = Redux.combineReducers({
        PageGlobals: _PageGlobals2.default,
        FlexMatrix: _FlexMatrixReducer2.default,
        AveragePriceInsightsBanner: _AveragePriceInsightsBannerReducer2.default,
        FlexForAllInsightsBanner: _FlexForAllInsightsBannerReducer2.default,
        NearbyAirportInsightsBanner: _NearbyAirportInsightsBannerReducer2.default,
        SearchPoll: _SearchPollListenerReducer2.default,
        FilterState: _FilterStateReducer2.default,
        WatchListReducer: _WatchlistReducer2.default
    });
});define("default/flights/results/react/reducers/FlexMatrixPredictedDatesReducer", ['exports', 'common/results/react/actions/SearchPollActions', 'flights/results/react/constants/FlexMatrixConstants', 'flights/results/react/constants/InsightsBannerConstants', 'flights/results/react/actions/SearchPredictionsAjaxActions', 'flights/results/react/utils/FlexMatrixClientPredictionUtils', 'flights/results/react/utils/FlexMatrixClientProcessingUtils'], function (exports, _SearchPollActions, _FlexMatrixConstants, _InsightsBannerConstants, _SearchPredictionsAjaxActions, _FlexMatrixClientPredictionUtils, _FlexMatrixClientProcessingUtils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initialClientDerivedData = undefined;

    exports.default = function (originalState, action) {
        var superReducer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var flexMatrix = void 0;
        var departLabels = void 0;
        var returnLabels = void 0;
        var predictionCellCount = void 0;

        var state = originalState || superReducer;

        switch (action.type) {
            case searchPollActions.CLEAR_SEARCH:
            case searchPollActions.INIT_POLLING:
            case searchPollActions.UPDATE_START_SEARCH_PARAMS:
                return babelHelpers.extends({}, state, superReducer, {
                    clientDerivedData: babelHelpers.extends({}, initialClientDerivedData, {
                        ajaxStatus: superReducer.displayMode === _FlexMatrixConstants.displayModes.FLEX_DATE_PREDICTIONS ? _InsightsBannerConstants.ajaxRequestStatus.START_REQUEST : _InsightsBannerConstants.ajaxRequestStatus.NO_REQUEST
                    })
                });

            case searchPollActions.POLL_RESPONSE:
            case searchPollActions.END_POLLING:
                flexMatrix = processFlexMatrixSearchPoll(action, state);

                var _getFinalDerivedFlexM = (0, _FlexMatrixClientProcessingUtils.getFinalDerivedFlexMatrixData)(flexMatrix, action, state);

                departLabels = _getFinalDerivedFlexM.departLabels;
                returnLabels = _getFinalDerivedFlexM.returnLabels;
                predictionCellCount = _getFinalDerivedFlexM.predictionCellCount;

                return babelHelpers.extends({}, state, superReducer, {
                    data: babelHelpers.extends({}, superReducer.data, flexMatrix, {
                        departLabels: departLabels,
                        returnLabels: returnLabels
                    }),
                    ui: babelHelpers.extends({}, state.ui, superReducer.ui, {
                        defaultDatesSelected: flexMatrix.matrixEntries && Object.values(flexMatrix.matrixEntries).every(function (entry) {
                            return entry.selected === entry.queryDate;
                        }),
                        enabledDepartLabelCount: departLabels.filter(function (l) {
                            return !l.disabled;
                        }).length,
                        enabledReturnLabelCount: returnLabels.filter(function (l) {
                            return !l.disabled;
                        }).length,
                        predictionCellCount: predictionCellCount,
                        standardCellCount: Object.keys(flexMatrix.matrixEntries).length - predictionCellCount
                    })
                });

            case searchPredictionsAjaxActions.RECEIVE_FLEX_PREDICTIONS_SUCCESS:
                flexMatrix = babelHelpers.extends({}, state.data, {
                    matrixEntries: mergePredictedMatrixEntries(action.payload.clientMatrixEntries, state.data.matrixEntries, state) || {}
                });

                var _getFinalDerivedFlexM2 = (0, _FlexMatrixClientProcessingUtils.getFinalDerivedFlexMatrixData)(flexMatrix, action, state);

                departLabels = _getFinalDerivedFlexM2.departLabels;
                returnLabels = _getFinalDerivedFlexM2.returnLabels;
                predictionCellCount = _getFinalDerivedFlexM2.predictionCellCount;

                return babelHelpers.extends({}, state, {
                    clientDerivedData: {
                        ajaxStatus: _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_RECEIVED,
                        ajaxMatrixEntries: action.payload.clientMatrixEntries
                    },
                    data: babelHelpers.extends({}, flexMatrix, {
                        departLabels: departLabels,
                        returnLabels: returnLabels
                    }),
                    ui: babelHelpers.extends({}, state.ui, {
                        enabledDepartLabelCount: departLabels.filter(function (l) {
                            return !l.disabled;
                        }).length,
                        enabledReturnLabelCount: returnLabels.filter(function (l) {
                            return !l.disabled;
                        }).length,
                        predictionCellCount: predictionCellCount,
                        standardCellCount: Object.keys(flexMatrix.matrixEntries).length - predictionCellCount
                    })
                });

            case searchPredictionsAjaxActions.RECEIVE_FLEX_PREDICTIONS_ERROR:
                return babelHelpers.extends({}, state, {
                    clientDerivedData: {
                        ajaxStatus: _InsightsBannerConstants.ajaxRequestStatus.RESPONSE_ERROR
                    }
                });

            default:
                return superReducer;
        }
    };

    var searchPollActions = babelHelpers.interopRequireWildcard(_SearchPollActions);
    var searchPredictionsAjaxActions = babelHelpers.interopRequireWildcard(_SearchPredictionsAjaxActions);

    var _FlexMatrixClientPredictionUtils2 = babelHelpers.interopRequireDefault(_FlexMatrixClientPredictionUtils);

    /*
     * Combine predicted entries with actual entries, giving priority to actual entries when valid.
     * If the result === serverMatrixEntries, returns null.
     */
    function mergePredictedMatrixEntries(predictedMatrixEntries, serverMatrixEntries, state) {
        if (!predictedMatrixEntries) {
            return null;
        }
        var merged = {};
        var anyPredictedVisible = false;
        Object.keys(serverMatrixEntries).forEach(function (key) {
            var usePredicted = (!serverMatrixEntries[key] || serverMatrixEntries[key].placeholder) && predictedMatrixEntries[key];
            if (usePredicted && !anyPredictedVisible) {
                anyPredictedVisible = true;
            }
            merged[key] = usePredicted ? predictedMatrixEntries[key] : serverMatrixEntries[key];
        });
        if (!anyPredictedVisible) {
            return null;
        }
        (0, _FlexMatrixClientPredictionUtils2.default)(merged, state.config);
        return merged;
    }

    /**
     * Handles all post-processing of the flex matrix search poll response
     * @return Final flex matrix data object that corresponds to the store's FlexMatrix.data
     */
    function processFlexMatrixSearchPoll(action, state) {
        if (action.payload.flexMatrix && action.payload.flexMatrix.matrixEntries) {
            return babelHelpers.extends({}, action.payload.flexMatrix, {
                matrixEntries: mergePredictedMatrixEntries(state.clientDerivedData.ajaxMatrixEntries, action.payload.flexMatrix.matrixEntries, state) || action.payload.flexMatrix.matrixEntries

            });
        }
        return state.data;
    }

    var initialClientDerivedData = exports.initialClientDerivedData = {
        ajaxStatus: _InsightsBannerConstants.ajaxRequestStatus.NO_REQUEST,
        ajaxMatrixEntries: null
    };

    /**
     * Additional reducer used after the standard flexMatrixReducer,
     * used when predicted flex dates are enabled
     *
     * @param originalState - flexMatrixReducer state
     * @param action
     * @param superReducer - flexMatrixReducer result, returned reduced value
     */
});define("default/flights/results/react/actions/NearbyAirportInsightsBannerActions", ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.setNearbyRecommendationApplied = setNearbyRecommendationApplied;
    var BASE_PATH = 'NearbyAirportInsightsBanner.';
    var SET_NEARBY_RECOMMENDATION_APPLIED = exports.SET_NEARBY_RECOMMENDATION_APPLIED = BASE_PATH + 'SET_NEARBY_RECOMMENDATION_APPLIED';

    function setNearbyRecommendationApplied(nearbyRecommendationApplied, undoFilterState) {
        return {
            type: SET_NEARBY_RECOMMENDATION_APPLIED,
            payload: {
                nearbyRecommendationApplied: nearbyRecommendationApplied,
                undoFilterState: undoFilterState
            }
        };
    }
});define("default/common/utils/react/ImmutableObjectUtils", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.omit = omit;
  /*
   * Helpers for dealing with immutable objects (or objects that we pretend are immutable).
   * Mostly used for react reducers.
   */

  /*
   * Return a new object from obj, with all keys/values in omitKeys excluded.
   * Pretty much the same as lodash's _.omit without needing to import the whole library
   * @param obj: object
   * @param omitKeys: array{string}
   */
  function omit(obj, omitKeys) {
    var result = {};
    Object.keys(obj).filter(function (key) {
      return !omitKeys.includes(key);
    }).forEach(function (key) {
      result[key] = obj[key];
    });
    return result;
  }

  exports.default = omit;
});