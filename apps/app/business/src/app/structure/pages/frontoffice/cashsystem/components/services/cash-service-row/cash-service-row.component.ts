import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';

class ItemCategory {
  title: string
  color: string
    items: any[]
  children: ItemCategory[]
  isCollapsed: boolean
}

@Component({
  selector:    'movit-cashsystem-service-row',
  templateUrl: './cash-service-row.component.html',
  styleUrls:  ['./cash-service-item.component.scss']
})
export class CashSystemServicesRowComponent  {

  @Input() depthLevel =  0;

  @Input() row =  1;

  @Input() bgColor =  '';

  @Input() category:ItemCategory; // ServiceCategory

  settings = {
      showSeparatorLine:true
  }

  categoryHasItems = undefined

  hasItems(items:any[], subCategories:ItemCategory[] = []){
    if(this.categoryHasItems !== undefined) return this.categoryHasItems

    // has 1 level children
    if(items.findIndex(p => this.canShow(p) ) >= 0 ) {
            this.categoryHasItems = true;
            return true
        }

    // search in Children
    if(subCategories && subCategories && subCategories.length){
       this.categoryHasItems = subCategories.findIndex(child=> this.hasItems(child.items,child.children))>=0
       return this.categoryHasItems;
    }

    this.categoryHasItems = false
    return false
   /*
    if(!this.filterValue  && this.filterSettings.canShow){
      if(arry.findIndex(p => this.canShow(p) )>=0)
      return  true
      if(childs && childTyp && childs.length){
       return  childs.findIndex(child=> this.hasItems(child[childTyp],k,child.children,childTyp))>=0
      }
    }
    if(!this.filterValue){
      return true
    }


    return arry.filter(i=> (i[k]+'').toLowerCase().includes(this.filterValue.toLowerCase())).filter(p=> this.canShow(p)).length

    * */
 }

  get levelTreeSeperator(){
      let str = '';
      if(this.settings.showSeparatorLine)
          for(let l = 0; l < this.depthLevel;l++)
              str+='-'

      return str
  }


    canShow(v:any){
        return true
    }
}
