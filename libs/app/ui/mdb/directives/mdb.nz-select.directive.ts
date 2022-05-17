import { Directive, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { NzSelectComponent } from "ng-zorro-antd/select";
import { Observable, Subject, takeUntil } from "rxjs";

@Directive({
  selector: '[mdbNzSelect]'
})
export class MdbNzSelectDirective implements OnInit, OnDestroy {
  onDispose = new Subject();
  node:HTMLElement;
  constructor(private nzS: NzSelectComponent) {}
  ngOnInit() {
    this.node = <HTMLElement>(this.nzS.originElement.nativeElement).parentElement;
    this.removeActive()
    this.listenForChanges()
  }

  listenForChanges(){
     this.nzS['nzOpenChange']
       .pipe(takeUntil(this.onDispose))
       .subscribe(() => this.updateStates());
     this.nzS['listOfValue$']
       .pipe(takeUntil(this.onDispose))
       .subscribe(()=> this.updateStates()
    )
  }

  ngOnDestroy() {
    this.onDispose.next(null);
    this.onDispose.complete();
  }

  updateStates(){

    this.nzS.listOfValue.length ?
      this.node.classList.add('has-value') :
      this.node.classList.remove('has-value');

    console.log(this.nzS.listOfValue.length,this.node.classList.contains('has-value'))
  }

  removeActive(){
    setTimeout(()=>{
      console.log(this.node.classList,this.node)
      this.node.classList.remove("active")
    })
  }
}
