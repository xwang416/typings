var Driving;
(function (Driving) {
    /**
     * This class observes dropdown lists in a certain container.
     * when a dropdown is clicked, the other dropdowns including sub-dropdowns will close if opened.
     * and the dropdown clicked may open or close, depending on this dropdown's own functionality.
     * @this class is also depending on dropdowns' html structures
     */
    var DropdownsLayoutObserver = (function () {
        function DropdownsLayoutObserver(wrapper, duration) {
            if (duration === void 0) { duration = 300; }
            this.wrapper = $(wrapper);
            this.dropdownBtns = this.wrapper.find('>.filter>button, >li>.filter>button');
            this.duration = duration;
            this.observe();
        }
        DropdownsLayoutObserver.prototype.observe = function () {
            var _this = this;
            _this.dropdownBtns.on('click', function () {
                //close all the other opened dropdowns, including sub-dropdowns
                _this.dropdownBtns.not(this).parent().find('ul').slideUp(_this.duration);
            });
        };
        return DropdownsLayoutObserver;
    }());
    Driving.DropdownsLayoutObserver = DropdownsLayoutObserver;
    /**
     * This class defines a dropdown list functionality.
     * when a dropdown is clicked, it toggles open/close.
     */
    var Dropdown = (function () {
        function Dropdown(wrapper, duration) {
            if (duration === void 0) { duration = 300; }
            this.wrapper = $(wrapper);
            this.dropdownBtn = this.wrapper.find('>button');
            this.dropdownBdy = this.wrapper.find('>ul');
            this.duration = duration;
            this.toggleDropdown();
        }
        Dropdown.prototype.toggleDropdown = function () {
            var _this = this;
            this.dropdownBtn.on('click', function () { return _this.dropdownBdy.slideToggle(_this.duration); });
        };
        return Dropdown;
    }());
    Driving.Dropdown = Dropdown;
})(Driving || (Driving = {}));
