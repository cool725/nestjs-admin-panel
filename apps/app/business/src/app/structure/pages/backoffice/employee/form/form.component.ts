import {Component, Injector, OnInit} from '@angular/core';
import {PageController} from "../../../page.controller";
import {FormController} from "../../../form.controller";
import {Employee} from "../packages/employee.class";
import {EmployeeService} from "@movit/api/models/employee";
import {EmployeeApi} from "../overview/employee.api.service";

@Component({
  selector: 'movit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class EmployeeFormComponent extends FormController<Employee> implements OnInit {

  employeeForm = this.fb.group({

  })

  constructor(override injector: Injector, private api: EmployeeApi<Employee>) {
    super(injector)
  }

  ngOnInit(): void {}

  override getData(): void {
    if(this.getId())this.loadEmployee(this.getId())
  }

  loadEmployee(employeeId:number){
    this.api.getEmployee(employeeId)
  }

  saveEmployee(){
    const data = this.employeeForm.value
    this.api.save(this.getId(),data).subscribe()
  }

}
