var Driving;
(function (Driving) {
    var StickyHeader = (function () {
        function StickyHeader() {
            this.fixedContainer = $('.fixed-header-container');
            this.stickyHeader = this.fixedContainer.find('.sticky-header');
            this.buildStickyHeader();
            this.doHeader();
        }
        StickyHeader.prototype.doHeader = function () {
            var lastScrollTop = 0, st, bodyTop, down = false, _this = this;
            $(window).scroll(function (event) {
                bodyTop = $('body')[0].getBoundingClientRect().top;
                st = $(this).scrollTop();
                if (st > lastScrollTop) {
                    _this.fixedContainer.removeClass('down');
                    down = false;
                }
                else {
                    _this.fixedContainer.addClass('down');
                    down = true;
                }
                if (down && bodyTop > -100) {
                }
                lastScrollTop = st;
            });
        };
        StickyHeader.prototype.buildStickyHeader = function () {
            if (this.stickyHeader.children().length <= 0) {
                $('.header .nav').clone().appendTo(this.stickyHeader);
            }
        };
        return StickyHeader;
    }());
    Driving.StickyHeader = StickyHeader;
    var Menu = (function () {
        function Menu(wrapper) {
            this.wrapper = $(wrapper);
            this.mainMemuItems = this.wrapper.find('.main-menu-item');
            this.doDesMenu();
        }
        Menu.prototype.doDesMenu = function () {
            var timer;
            this.mainMemuItems.mouseenter(function () {
                var self = $(this);
                self.addClass('open');
                timer = setTimeout(function () {
                    var dropdown = self.find('.sub-menu');
                    dropdown.slideDown(300);
                }, 200);
            })
                .mouseleave(function () {
                clearTimeout(timer);
                $(this).removeClass('open');
                var dropdown = $(this).find('.sub-menu');
                dropdown.slideUp(300);
            });
        };
        return Menu;
    }());
    Driving.Menu = Menu;
})(Driving || (Driving = {}));
