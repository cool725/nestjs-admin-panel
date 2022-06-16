import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'toFixed'})
export class ToFixedPipe implements PipeTransform  {
  transform(value?:number) {
    if(value){
      try{
        return value.toFixed(2)
      }catch (e) {
        return value
      }
    }
    return value
  }
}
