

module Driving{
    
    /**
     * This class observes dropdown lists in a certain container. 
     * when a dropdown is clicked, the other dropdowns including sub-dropdowns will close if opened. 
     * and the dropdown clicked may open or close, depending on this dropdown's own functionality.
     * @this class is also depending on dropdowns' html structures
     */
    export class DropdownsLayoutObserver{
        
        private wrapper: JQuery;
        private dropdownBtns: JQuery;
        private dropdownBty: JQuery;
        private duration: number;
        
        constructor(wrapper: string, duration: number = 300){
            this.wrapper = $(wrapper);
            this.dropdownBtns = this.wrapper.find('>.filter>button, >li>.filter>button');
            this.duration = duration;

            this.observe();
        }
    
        private observe(): void{
            var _this = this;
            
            _this.dropdownBtns.on('click', function(){
                //close all the other opened dropdowns, including sub-dropdowns
                _this.dropdownBtns.not(this).parent().find('ul').slideUp(_this.duration);
            });
        }

    }
    
    /**
     * This class defines a dropdown list functionality.
     * when a dropdown is clicked, it toggles open/close.
     */
    export class Dropdown{
        protected wrapper: JQuery;
        protected dropdownBtn: JQuery;
        protected dropdownBdy: JQuery;
        private duration: number;
        
        constructor(wrapper: string, duration: number = 300){
            this.wrapper = $(wrapper);
            this.dropdownBtn = this.wrapper.find('>button');
            this.dropdownBdy = this.wrapper.find('>ul');
            this.duration = duration;

            this.toggleDropdown();
        }
        
        private toggleDropdown(): void{
            
            this.dropdownBtn.on('click', () => this.dropdownBdy.slideToggle(this.duration) );
        }
        
    }
        

}  
