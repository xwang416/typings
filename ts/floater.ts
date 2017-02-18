
module Driving {
    
    export class Floater{
        
        private floater: JQuery;
        private container: JQuery;
        private num: number;

        constructor(floater: String){
            
            this.floater = $(floater);
            this.container = this.floater.parent();
            this.num = 0;
            
            this.doResizing();
            this.doScolling();

        }
        
        private doPositioning(): void {
            var container = (this.container)[0].getBoundingClientRect(),
                containerTop = container.top,
                containerLeft = container.left;
            
            if(containerTop <= 0){
                this.floater.addClass('fixed').css({'top':0, 'left':containerLeft});
            }
            else{
                this.floater.removeClass('fixed').css({'top':'auto', 'left':'auto'});
            }
        }
        
        private doResizing(): void {
            var _this = this;
            var efficientResize = Driving.Common.debounce(function() {
                _this.floater.find('span').text( String(_this.num++) );
                _this.doPositioning();
            }, 50, false);
            
            window.addEventListener('resize', efficientResize);
        }
        
        private doScolling(): void {
            var _this = this;
            var efficientScroll = Driving.Common.debounce(function() {
                _this.floater.find('span').text( String(_this.num++) );
                _this.doPositioning();
            }, 0, false);

            window.addEventListener('scroll', efficientScroll);
        }

    }

}