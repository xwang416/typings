var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="jquery.d.ts" />
/// <reference path="filter.ts" />
var Driving;
(function (Driving) {
    /**
     * this class defines Price Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide a slider to choose a price range, and update filtersJSON cookie
     * 3. add/remove a price tag of a certain price range to the left-side filter container
     */
    var PriceFilter = (function (_super) {
        __extends(PriceFilter, _super);
        function PriceFilter(wrapper, duration) {
            if (duration === void 0) { duration = 300; }
            return _super.call(this, wrapper, duration) || this;
        }
        return PriceFilter;
    }(Driving.Dropdown));
    Driving.PriceFilter = PriceFilter;
    /**
     * this class defines Fuel Economy Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide to choose a range for city/high way, and update filtersJSON cookie
     * 3. add/remove a fuel eco tag of a certain range to the left-side filter container
     */
    var FuelEcoFilter = (function (_super) {
        __extends(FuelEcoFilter, _super);
        function FuelEcoFilter(wrapper, duration) {
            if (duration === void 0) { duration = 300; }
            return _super.call(this, wrapper, duration) || this;
        }
        return FuelEcoFilter;
    }(Driving.Dropdown));
    Driving.FuelEcoFilter = FuelEcoFilter;
    /**
     * this class defines Seating Capacity (passenger/seating) Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide to choose a range for seating capacity, and update filtersJSON cookie
     * 3. add/remove a seating capacity tag of a certain range to the left-side filter container
     */
    var SeatingCapacityFilter = (function (_super) {
        __extends(SeatingCapacityFilter, _super);
        function SeatingCapacityFilter(wrapper, duration) {
            if (duration === void 0) { duration = 300; }
            return _super.call(this, wrapper, duration) || this;
        }
        return SeatingCapacityFilter;
    }(Driving.Dropdown));
    Driving.SeatingCapacityFilter = SeatingCapacityFilter;
    /**
     * this class defines Towing Capacity Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide to choose a range for towing capacity, and update filtersJSON cookie
     * 3. add/remove a towing capacity tag of a certain range to the left-side filter container
     */
    var TowingCapacityFilter = (function (_super) {
        __extends(TowingCapacityFilter, _super);
        function TowingCapacityFilter(wrapper, duration) {
            if (duration === void 0) { duration = 300; }
            return _super.call(this, wrapper, duration) || this;
        }
        return TowingCapacityFilter;
    }(Driving.Dropdown));
    Driving.TowingCapacityFilter = TowingCapacityFilter;
    /**
     * this class defines Horsepower Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide to choose a range for horsepower, and update filtersJSON cookie
     * 3. add/remove a horsepower tag of a certain range to the left-side filter container
     */
    var HorsepowerFilter = (function (_super) {
        __extends(HorsepowerFilter, _super);
        function HorsepowerFilter(wrapper, duration) {
            if (duration === void 0) { duration = 300; }
            return _super.call(this, wrapper, duration) || this;
        }
        return HorsepowerFilter;
    }(Driving.Dropdown));
    Driving.HorsepowerFilter = HorsepowerFilter;
    /**
     * this class defines functionalitis of Advanced Filters container only.
     * 1. toggle open/close advanced filters container
     */
    var AdvancedFilters = (function (_super) {
        __extends(AdvancedFilters, _super);
        function AdvancedFilters(wrapper, duration) {
            if (duration === void 0) { duration = 300; }
            return _super.call(this, wrapper, duration) || this;
        }
        return AdvancedFilters;
    }(Driving.Dropdown));
    Driving.AdvancedFilters = AdvancedFilters;
    /**
    * this class defines functionalitis of checkbox dropdown filters.
    * 1. toggle open/close filters container
    */
    var CheckboxDropdown = (function (_super) {
        __extends(CheckboxDropdown, _super);
        function CheckboxDropdown(wrapper, duration) {
            if (duration === void 0) { duration = 300; }
            var _this = _super.call(this, wrapper, duration) || this;
            _this.checkboxes = _this.dropdownBdy.find(':checkbox');
            _this.filterType = _this.checkboxes.attr('name');
            _this.addListener();
            return _this;
        }
        CheckboxDropdown.prototype.addListener = function () {
            var _this = this;
            this.dropdownBdy.on('click', function (e) {
                var filtersJSON = JSON.parse(Driving.Common.utilGetCookie('filtersJSON'));
                filtersJSON.properties[_this.filterType] = { 'type': _this.getTypeValues() };
                Driving.Common.utilSetCookie('filtersJSON', JSON.stringify(filtersJSON));
                _this.updateFilterLists();
            });
        };
        //to get type values from checked checkboxes
        CheckboxDropdown.prototype.getTypeValues = function () {
            var typeValues = [];
            this.checkboxes.each(function () {
                if ($(this).is(':checked')) {
                    typeValues.push($(this).val());
                }
            });
            return typeValues;
        };
        CheckboxDropdown.prototype.updateFilterLists = function () {
            if (this.filterType === 'make') {
                ComparePage.updateMakeModelFilterLists();
            }
            else {
                ComparePage.updateFilterTagLists();
            }
        };
        return CheckboxDropdown;
    }(Driving.Dropdown));
    Driving.CheckboxDropdown = CheckboxDropdown;
    var ComparePage = (function () {
        function ComparePage() {
            this.getAndSetDefaultFiltersJSON();
            this.buildLeftSideSelectedFilters();
            var pf = new PriceFilter('#filtermsrp');
            var mf = new CheckboxDropdown('#filtermake', 600);
            var yf = new CheckboxDropdown('#filteryear');
            var bs = new CheckboxDropdown('#filterbodystyle');
            var ft = new CheckboxDropdown('#filterfueltype');
            var fe = new FuelEcoFilter('#filterfuelecon');
            var sc = new SeatingCapacityFilter('#filtercapacity');
            var dt = new CheckboxDropdown('#filterdrivetrain');
            var tc = new Driving.TowingCapacityFilter('#filtertowingcapacity');
            var hp = new Driving.HorsepowerFilter('#filterhorsepower');
            var dlo = new Driving.DropdownsLayoutObserver('.filter-set');
            var adv_dlo = new Driving.DropdownsLayoutObserver('#advanced-filters>ul');
            var af = new Driving.AdvancedFilters('#advanced-filters');
        }
        ComparePage.prototype.buildLeftSideSelectedFilters = function () {
            ComparePage.updateMakeModelFilterLists();
            ComparePage.updateFilterTagLists();
        };
        /**
         * return default filter settings in JSON and
         * set cookie for the filter settings
         */
        ComparePage.prototype.getAndSetDefaultFiltersJSON = function () {
            var currentYear = Driving.Common.utilGetCurrentYear(), followingYear = currentYear + 1, followingYearChk = $(ComparePage.filterSetContainer).find('#year' + followingYear), retJSON = null;
            if (followingYearChk.length > 0) {
                retJSON = { properties: { sort: { type: 'lowest to highest', display: 'Price: lowest to highest', orderby: 'msrp', order: 'asc' }, showbasemodelsonly: { type: false }, year: { type: [followingYear, currentYear] } } };
            }
            else {
                retJSON = { properties: { sort: { type: 'lowest to highest', display: 'Price: lowest to highest', orderby: 'msrp', order: 'asc' }, showbasemodelsonly: { type: false }, year: { type: [currentYear] } } };
            }
            var cookieVal = Driving.Common.utilGetCookie('filtersJSON');
            if (cookieVal === null) {
                Driving.Common.utilSetCookie('filtersJSON', JSON.stringify(retJSON));
            }
            return retJSON;
        };
        ComparePage.updateFilterTagLists = function () {
            var filtersJSON = JSON.parse(Driving.Common.utilGetCookie('filtersJSON'));
            var json = filtersJSON.properties, isShowBaseModelsChecked = true;
            ComparePage.filterTagContainer.empty();
            var jsonCtn = Driving.Common.utilGetJSONLen(json) - 1;
            var filterTags = $('<ul>');
            for (var key in json) {
                if (key === 'make')
                    continue;
                if (key != 'sort' && key != 'showbasemodelsonly') {
                    //clearFilterBtn.show();
                    var arr = json[key].type;
                    if ($('#filter' + key).data('type') == 'checklist') {
                        for (var i = 0, j = arr.length; i < j; i++) {
                            var tempID = arr[i].toString().toLowerCase().replace(/\s/g, '').replace(/[_\s]/g, '').replace(/[-\s]/g, '').replace(/[-\s]/g, ''), t = $('#lbl' + key + tempID).text();
                            if (t.length > 0) {
                                filterTags.append($('<li>', { 'id': 'selfilter_' + key, 'data-filter': key, 'data-filter-value': tempID }).append($('<span>', { 'class': 'filter-text' }).text(t), $('<div>', { 'class': 'delete-button' })));
                            }
                        }
                    }
                    else {
                        filterTags.append($('<li>', { 'id': 'selfilter_' + key, 'data-filter': key, 'data-filter-value': arr }).append($('<span>', { 'class': 'filter-text' }).text(json[key].output), $('<div>', { 'class': 'delete-button' })));
                    }
                }
                else if (key == 'sort') {
                    filterTags.append($('<li>', { 'id': 'selfilter_' + key, 'data-filter': key, 'data-filter-value': json[key].type }).append($('<div>', { 'id': 'filtersort', 'class': 'filter as-dropdown sort', 'data-type': 'sortlist' }).append($('<h4>').text('Sort By:'), $('<div>', { 'class': 'sort-holder' }).append($('<button>', { 'class': 'selected' }).append($('<div>', { 'class': 'dd-text sort-value-text' }).text(json[key].display), $('<div>', { 'class': 'menu-arrow' })), $('<ul>').append($('<li>', { 'data-default': 'true', 'data-order': 'asc', 'data-sort': 'lowest to highest', 'data-order-by': 'msrp' }).text('Price: lowest to highest'), $('<li>', { 'data-order': 'desc', 'data-sort': 'highest to lowest', 'data-order-by': 'msrp' }).text('Price: highest to lowest'), $('<li>', { 'data-order': 'asc', 'data-sort': 'a to z', 'data-order-by': 'make' }).text('Make name: A to Z'), $('<li>', { 'data-order': 'desc', 'data-sort': 'z to a', 'data-order-by': 'make' }).text('Make name: Z to A'), $('<li>', { 'data-order': 'asc', 'data-sort': 'lowest to highest', 'data-order-by': 'fueleconhwy.value' }).text('Litres/100km (most efficient)'))), $('<h4>', { 'class': 'filter-by-lbl' }).text('Filter By:'))));
                }
                else {
                    isShowBaseModelsChecked = json[key].type;
                    filterTags.append($('<li>', { 'id': 'selfilter_' + key, 'data-filter': key, 'data-filter-value': json[key].type }).append($('<div>', { 'data-type': 'checklist', 'class': 'filter basemodels', 'id': 'filtershowbasemodelsonly' }).append($('<input>', { 'id': 'showbasemodelsonly', 'type': 'checkbox', 'checked': isShowBaseModelsChecked, 'value': 'true', 'name': 'showbasemodelsonly' }), $('<label>', { 'id': 'lblshowbasemodelsonly', 'for': 'showbasemodelsonly' }).text('Show only base models'))));
                }
                if (jsonCtn >= 2) {
                }
                else {
                }
            }
            ComparePage.filterTagContainer.append(filterTags);
            //          setCompareRemove();
            //          setBaseModels();
            //          setSortFilter();
            //          setMobileSortFilter();
            //          if( !dontCallExternal ){
            //            if( callExternal ){
            //              callExternal();
            //            }
            //          }
        };
        ComparePage.updateMakeModelFilterLists = function () {
            var filtersJSON = JSON.parse(Driving.Common.utilGetCookie('filtersJSON'));
            var makes = filtersJSON.properties.make;
            var json = filtersJSON.properties, isShowBaseModelsChecked = true;
            ComparePage.medelFilterContainer.empty();
            var jsonCtn = Driving.Common.utilGetJSONLen(json) - 1;
            if (makes === undefined)
                return;
            for (var key in makes) {
                if (key != 'sort' && key != 'showbasemodelsonly') {
                    //clearFilterBtn.show();
                    var arr = json[key].type;
                    if ($('#filter' + key).data('type') == 'checklist') {
                        for (var i = 0, j = arr.length; i < j; i++) {
                            var tempID = arr[i].toString().toLowerCase().replace(/\s/g, '').replace(/[_\s]/g, '').replace(/[-\s]/g, '').replace(/[-\s]/g, ''), t = $('#lbl' + key + tempID).text();
                            if (t.length > 0) {
                                ComparePage.filterTagContainer.append($('<li>', { 'id': 'selfilter_' + key, 'data-filter': key, 'data-filter-value': tempID }).append($('<span>', { 'class': 'filter-text' }).text(t), $('<div>', { 'class': 'delete-button' })));
                            }
                        }
                    }
                    else {
                        ComparePage.filterTagContainer.append($('<li>', { 'id': 'selfilter_' + key, 'data-filter': key, 'data-filter-value': arr }).append($('<span>', { 'class': 'filter-text' }).text(json[key].output), $('<div>', { 'class': 'delete-button' })));
                    }
                }
                else if (key == 'sort') {
                    ComparePage.filterTagContainer.append($('<li>', { 'id': 'selfilter_' + key, 'data-filter': key, 'data-filter-value': json[key].type }).append($('<div>', { 'id': 'filtersort', 'class': 'filter as-dropdown sort', 'data-type': 'sortlist' }).append($('<h4>').text('Sort By:'), $('<div>', { 'class': 'sort-holder' }).append($('<button>', { 'class': 'selected' }).append($('<div>', { 'class': 'dd-text sort-value-text' }).text(json[key].display), $('<div>', { 'class': 'menu-arrow' })), $('<ul>').append($('<li>', { 'data-default': 'true', 'data-order': 'asc', 'data-sort': 'lowest to highest', 'data-order-by': 'msrp' }).text('Price: lowest to highest'), $('<li>', { 'data-order': 'desc', 'data-sort': 'highest to lowest', 'data-order-by': 'msrp' }).text('Price: highest to lowest'), $('<li>', { 'data-order': 'asc', 'data-sort': 'a to z', 'data-order-by': 'make' }).text('Make name: A to Z'), $('<li>', { 'data-order': 'desc', 'data-sort': 'z to a', 'data-order-by': 'make' }).text('Make name: Z to A'), $('<li>', { 'data-order': 'asc', 'data-sort': 'lowest to highest', 'data-order-by': 'fueleconhwy.value' }).text('Litres/100km (most efficient)'))), $('<h4>', { 'class': 'filter-by-lbl' }).text('Filter By:'))));
                }
                else {
                    isShowBaseModelsChecked = json[key].type;
                    ComparePage.filterTagContainer.append($('<li>', { 'id': 'selfilter_' + key, 'data-filter': key, 'data-filter-value': json[key].type }).append($('<div>', { 'data-type': 'checklist', 'class': 'filter basemodels', 'id': 'filtershowbasemodelsonly' }).append($('<input>', { 'id': 'showbasemodelsonly', 'type': 'checkbox', 'checked': isShowBaseModelsChecked, 'value': 'true', 'name': 'showbasemodelsonly' }), $('<label>', { 'id': 'lblshowbasemodelsonly', 'for': 'showbasemodelsonly' }).text('Show only base models'))));
                }
                if (jsonCtn >= 2) {
                }
                else {
                }
            }
        };
        return ComparePage;
    }());
    ComparePage.medelFilterContainer = $('.medel-filter-container');
    ComparePage.filterTagContainer = $('.filter-tag-container');
    ComparePage.filterSetContainer = $('.filter-set');
    Driving.ComparePage = ComparePage;
})(Driving || (Driving = {}));
