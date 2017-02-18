/// <reference path="jquery.d.ts" />
/// <reference path="filter.ts" />
module Driving {
    
    /**
     * this class defines Price Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide a slider to choose a price range, and update filtersJSON cookie
     * 3. add/remove a price tag of a certain price range to the left-side filter container
     */
    export class PriceFilter extends Driving.Dropdown{
        
        constructor(wrapper: string, duration: number = 300) { 
            super(wrapper, duration);

        }
        
        
    }
    
    /**
     * this class defines Fuel Economy Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide to choose a range for city/high way, and update filtersJSON cookie
     * 3. add/remove a fuel eco tag of a certain range to the left-side filter container
     */
    export class FuelEcoFilter extends Driving.Dropdown{
        
        constructor(wrapper: string, duration: number = 300) { 
            super(wrapper, duration);

        }
        
        
    }
    
    /**
     * this class defines Seating Capacity (passenger/seating) Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide to choose a range for seating capacity, and update filtersJSON cookie
     * 3. add/remove a seating capacity tag of a certain range to the left-side filter container
     */
    export class SeatingCapacityFilter extends Driving.Dropdown{
        
        constructor(wrapper: string, duration: number = 300) { 
            super(wrapper, duration);

        }
        
        
    }

    /**
     * this class defines Towing Capacity Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide to choose a range for towing capacity, and update filtersJSON cookie
     * 3. add/remove a towing capacity tag of a certain range to the left-side filter container
     */
    export class TowingCapacityFilter extends Driving.Dropdown{
        
        constructor(wrapper: string, duration: number = 300) { 
            super(wrapper, duration);

        }
        
        
    }

    /**
     * this class defines Horsepower Filter functionalitis.
     * 1. toggle open/close dropdown list
     * 2. slide to choose a range for horsepower, and update filtersJSON cookie
     * 3. add/remove a horsepower tag of a certain range to the left-side filter container
     */
    export class HorsepowerFilter extends Driving.Dropdown{
        
        constructor(wrapper: string, duration: number = 300) { 
            super(wrapper, duration);

        }
        
        
    }
    
    /**
     * this class defines functionalitis of Advanced Filters container only.
     * 1. toggle open/close advanced filters container
     */
    export class AdvancedFilters extends Driving.Dropdown{
        
        constructor(wrapper: string, duration: number = 300) { 
            super(wrapper, duration);

        }
        
    }
    
    /**
    * this class defines functionalitis of checkbox dropdown filters.
    * 1. toggle open/close filters container
    */
    export class CheckboxDropdown extends Driving.Dropdown implements sync {
        
        private checkboxes: JQuery;
        private filterType: string;
        
        constructor(wrapper: string, duration: number = 300) { 
            super(wrapper, duration);
            this.checkboxes = this.dropdownBdy.find(':checkbox');
            this.filterType = this.checkboxes.attr('name');
            
            this.addListener();
        }
        
        private addListener(): void {

            this.dropdownBdy.on('click', (e: JQueryEventObject) => {
                
                var filtersJSON = JSON.parse( Driving.Common.utilGetCookie('filtersJSON'));
                
                filtersJSON.properties[ this.filterType ] = { 'type' : this.getTypeValues() };
                Driving.Common.utilSetCookie('filtersJSON', JSON.stringify(filtersJSON));
                this.updateFilterLists();
            });
        }
        
        //to get type values from checked checkboxes
        private getTypeValues(): string[] {

            var typeValues: string[] = [];
            this.checkboxes.each(function(){
                if ($(this).is(':checked')) {
                    typeValues.push($(this).val());
                }
            });
            
            return typeValues;
        }
        
        public updateFilterLists(): void {

            if(this.filterType === 'make'){
                ComparePage.updateMakeModelFilterLists();
            }
            else{
                ComparePage.updateFilterTagLists();
            }            
        }
        


    } 
    


    export interface sync {
        updateFilterLists(): void;
    }
    
    export class ComparePage {
        public static medelFilterContainer: JQuery = $('.medel-filter-container');
        public static filterTagContainer: JQuery = $('.filter-tag-container');
        public static filterSetContainer: JQuery = $('.filter-set');
        
        
        
        constructor() {
            this.getAndSetDefaultFiltersJSON();
            this.buildLeftSideSelectedFilters()
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
        
        private buildLeftSideSelectedFilters(): void {

            ComparePage.updateMakeModelFilterLists();
            ComparePage.updateFilterTagLists();
        }
        /**
         * return default filter settings in JSON and
         * set cookie for the filter settings
         */
        private getAndSetDefaultFiltersJSON(): any {

            var currentYear = Driving.Common.utilGetCurrentYear(),
                followingYear = currentYear+1,
                followingYearChk = $(ComparePage.filterSetContainer).find('#year'+followingYear),
                retJSON = null;

            if( followingYearChk.length > 0 ){
                retJSON = {properties:{sort:{type: 'lowest to highest',display: 'Price: lowest to highest',orderby: 'msrp',order:'asc'},showbasemodelsonly:{type:false},year:{type:[followingYear,currentYear]}}};
            }else {
              retJSON = {properties:{sort:{type: 'lowest to highest',display: 'Price: lowest to highest',orderby: 'msrp',order:'asc'},showbasemodelsonly:{type:false},year:{type:[ currentYear]}}};
            }
            
            var cookieVal: any = Driving.Common.utilGetCookie('filtersJSON');
    
            if (cookieVal === null){
                
                Driving.Common.utilSetCookie('filtersJSON',JSON.stringify(retJSON));
            }
            return retJSON;
        }
        
        public static updateFilterTagLists(): void {
            var filtersJSON = JSON.parse( Driving.Common.utilGetCookie('filtersJSON'));
            var json =  filtersJSON.properties,
                isShowBaseModelsChecked = true;
       
            ComparePage.filterTagContainer.empty();
            var jsonCtn = Driving.Common.utilGetJSONLen(json)-1;
            var filterTags = $('<ul>');
            
            for(var key in json ){
                if( key === 'make' ) continue;
                
                if( key != 'sort' && key != 'showbasemodelsonly'){
                  //clearFilterBtn.show();
                  var arr = json[key].type;
                  if( $('#filter'+key).data('type')== 'checklist' ){
                    for(var i=0,j=arr.length;i<j;i++){
                      var tempID =  arr[i].toString().toLowerCase().replace(/\s/g,'').replace(/[_\s]/g,'').replace(/[-\s]/g,'').replace(/[-\s]/g,''),
                        t = $('#lbl'+key+tempID).text();
                      if( t.length > 0 ){
                        filterTags.append(
                          $('<li>',{'id':'selfilter_'+key,'data-filter':key,'data-filter-value':tempID}).append(
                            $('<span>',{'class':'filter-text'}).text(t),
                            $('<div>',{'class':'delete-button'})
                          )
                        );
                      }
                    }
                  }else{
                    filterTags.append(
                      $('<li>',{'id':'selfilter_'+key,'data-filter':key,'data-filter-value':arr}).append(
                        $('<span>',{'class':'filter-text'}).text(json[key].output),
                        $('<div>',{'class':'delete-button'})
                      )
                    );
                  }
                }else if(key == 'sort'){
                  filterTags.append(
                    $('<li>',{'id':'selfilter_'+key,'data-filter':key,'data-filter-value':json[key].type}).append(
                      $('<div>',{'id':'filtersort','class':'filter as-dropdown sort','data-type':'sortlist'}).append(
                        $('<h4>').text('Sort By:'),
                        $('<div>',{'class':'sort-holder'}).append(
                          $('<button>',{'class':'selected'}).append(
                            $('<div>',{'class':'dd-text sort-value-text'}).text(json[key].display),
                            $('<div>',{'class':'menu-arrow'})
                          ),
                          $('<ul>').append(
                            $('<li>',{'data-default':'true','data-order':'asc','data-sort':'lowest to highest','data-order-by':'msrp'}).text('Price: lowest to highest'),
                            $('<li>',{'data-order':'desc','data-sort':'highest to lowest','data-order-by':'msrp'}).text('Price: highest to lowest'),
                            $('<li>',{'data-order':'asc','data-sort':'a to z','data-order-by':'make'}).text('Make name: A to Z'),
                            $('<li>',{'data-order':'desc','data-sort':'z to a','data-order-by':'make'}).text('Make name: Z to A'),
                            $('<li>',{'data-order':'asc','data-sort':'lowest to highest','data-order-by':'fueleconhwy.value'}).text('Litres/100km (most efficient)')
                          )
                        ),
                        $('<h4>',{'class':'filter-by-lbl'}).text('Filter By:')
                      )
                    )
                  );
                }else {
                  isShowBaseModelsChecked = json[key].type;
                  filterTags.append(
                      $('<li>',{'id':'selfilter_'+key,'data-filter':key,'data-filter-value':json[key].type}).append(
                        $('<div>',{'data-type':'checklist','class':'filter basemodels','id':'filtershowbasemodelsonly'}).append(
                          $('<input>',{'id':'showbasemodelsonly','type':'checkbox','checked':isShowBaseModelsChecked,'value':'true','name':'showbasemodelsonly'}),
                          $('<label>',{'id':'lblshowbasemodelsonly','for':'showbasemodelsonly'}).text('Show only base models')
                        )
                      )
                    );
                }
                if( jsonCtn >= 2 ){
                  //clearFilterBtn.show();
                }else{
                  //clearFilterBtn.hide();
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
            
            
        }
        
        public static updateMakeModelFilterLists(): void {

            var filtersJSON = JSON.parse( Driving.Common.utilGetCookie('filtersJSON'));
            var makes =  filtersJSON.properties.make;
       var json =  filtersJSON.properties,
                isShowBaseModelsChecked = true;
            ComparePage.medelFilterContainer.empty();
            var jsonCtn = Driving.Common.utilGetJSONLen(json)-1;

            if( makes === undefined ) return;
            
            for(var key in makes ){
                
                if( key != 'sort' && key != 'showbasemodelsonly'){
                  //clearFilterBtn.show();
                  var arr = json[key].type;
                  if( $('#filter'+key).data('type')== 'checklist' ){
                    for(var i=0,j=arr.length;i<j;i++){
                      var tempID =  arr[i].toString().toLowerCase().replace(/\s/g,'').replace(/[_\s]/g,'').replace(/[-\s]/g,'').replace(/[-\s]/g,''),
                        t = $('#lbl'+key+tempID).text();
                      if( t.length > 0 ){
                        ComparePage.filterTagContainer.append(
                          $('<li>',{'id':'selfilter_'+key,'data-filter':key,'data-filter-value':tempID}).append(
                            $('<span>',{'class':'filter-text'}).text(t),
                            $('<div>',{'class':'delete-button'})
                          )
                        );
                      }
                    }
                  }else{
                    ComparePage.filterTagContainer.append(
                      $('<li>',{'id':'selfilter_'+key,'data-filter':key,'data-filter-value':arr}).append(
                        $('<span>',{'class':'filter-text'}).text(json[key].output),
                        $('<div>',{'class':'delete-button'})
                      )
                    );
                  }
                }else if(key == 'sort'){
                  ComparePage.filterTagContainer.append(
                    $('<li>',{'id':'selfilter_'+key,'data-filter':key,'data-filter-value':json[key].type}).append(
                      $('<div>',{'id':'filtersort','class':'filter as-dropdown sort','data-type':'sortlist'}).append(
                        $('<h4>').text('Sort By:'),
                        $('<div>',{'class':'sort-holder'}).append(
                          $('<button>',{'class':'selected'}).append(
                            $('<div>',{'class':'dd-text sort-value-text'}).text(json[key].display),
                            $('<div>',{'class':'menu-arrow'})
                          ),
                          $('<ul>').append(
                            $('<li>',{'data-default':'true','data-order':'asc','data-sort':'lowest to highest','data-order-by':'msrp'}).text('Price: lowest to highest'),
                            $('<li>',{'data-order':'desc','data-sort':'highest to lowest','data-order-by':'msrp'}).text('Price: highest to lowest'),
                            $('<li>',{'data-order':'asc','data-sort':'a to z','data-order-by':'make'}).text('Make name: A to Z'),
                            $('<li>',{'data-order':'desc','data-sort':'z to a','data-order-by':'make'}).text('Make name: Z to A'),
                            $('<li>',{'data-order':'asc','data-sort':'lowest to highest','data-order-by':'fueleconhwy.value'}).text('Litres/100km (most efficient)')
                          )
                        ),
                        $('<h4>',{'class':'filter-by-lbl'}).text('Filter By:')
                      )
                    )
                  );
                }else {
                  isShowBaseModelsChecked = json[key].type;
                  ComparePage.filterTagContainer.append(
                      $('<li>',{'id':'selfilter_'+key,'data-filter':key,'data-filter-value':json[key].type}).append(
                        $('<div>',{'data-type':'checklist','class':'filter basemodels','id':'filtershowbasemodelsonly'}).append(
                          $('<input>',{'id':'showbasemodelsonly','type':'checkbox','checked':isShowBaseModelsChecked,'value':'true','name':'showbasemodelsonly'}),
                          $('<label>',{'id':'lblshowbasemodelsonly','for':'showbasemodelsonly'}).text('Show only base models')
                        )
                      )
                    );
                }
                if( jsonCtn >= 2 ){
                  //clearFilterBtn.show();
                }else{
                  //clearFilterBtn.hide();
                }
            }

        }
    
    }
    
    
    
    
    
    
    
    
    
}