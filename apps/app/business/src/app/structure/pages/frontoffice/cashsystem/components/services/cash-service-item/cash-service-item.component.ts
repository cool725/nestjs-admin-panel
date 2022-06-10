import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';

class ItemCategory{
  title:string
  color:string
  children:ItemCategory[]
}

@Component({
  selector:    'movit-cashsystem-service-item',
  templateUrl: './cash-service-item.component.html',
  styleUrls:  ['./cash-service-item.component.scss']
})
export class CashSystemServicesItemComponent implements OnInit {

  @Input() row =  1;

  @Input() bgColor =  '';

  @Input() cat:ItemCategory; // ServiceCategory


  hasItems(arry,k='title',childs=[],childTyp=null){

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
  }

  get levelTreeSeperator(){

  }
}
