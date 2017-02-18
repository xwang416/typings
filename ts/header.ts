
module Driving {
    
    export class StickyHeader{
        
        private fixedContainer: JQuery;
        private stickyHeader: JQuery;

        constructor(){
            
            this.fixedContainer = $('.fixed-header-container');
            this.stickyHeader = this.fixedContainer.find('.sticky-header');
            
            this.buildStickyHeader();
            this.doHeader();

        }
        
        private doHeader(): void {
            var lastScrollTop: number = 0, 
                st: number,
                bodyTop: number,
                down: boolean = false,
                _this: any = this;
            
            $(window).scroll( function(event: JQueryEventObject) {
                
                bodyTop = $('body')[0].getBoundingClientRect().top;
                st = $(this).scrollTop();
                
                if (st > lastScrollTop){    // downscroll code
                    
                    _this.fixedContainer.removeClass('down');   
                    down = false;

                } else {    // upscroll code
                    
                    _this.fixedContainer.addClass('down');  
                    down = true;
                }
                
                if( down && bodyTop > -100 ){
                    
                    //_this.fixedContainer.removeClass('down');
                    
                }

                lastScrollTop = st;
            });
        }
        
        private buildStickyHeader(){
            if( this.stickyHeader.children().length <= 0 ){
                $('.header .nav').clone().appendTo(this.stickyHeader);
            }
        }

    }
    
    export class Menu{
        
        private wrapper: JQuery;
        private mainMemuItems: JQuery;
    
        constructor(wrapper: String){
            this.wrapper = $(wrapper);
            this.mainMemuItems = this.wrapper.find('.main-menu-item');

            this.doDesMenu();
        }
    
        private doDesMenu(): void{
            var timer: any;
            this.mainMemuItems.mouseenter(
                function(){
                    var self = $(this);
                    self.addClass('open');
                    timer = setTimeout(function(){
                        var dropdown = self.find('.sub-menu');
                        dropdown.slideDown(300);
                    }, 200);
            })
            .mouseleave(
                
                function(){
                    
                    clearTimeout(timer);
                    $(this).removeClass('open');
                    var dropdown = $(this).find('.sub-menu');
                    dropdown.slideUp(300);
                }
            );
        }
    
    
    }

}