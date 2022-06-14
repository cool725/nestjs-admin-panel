import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormController } from '../../../form.controller';
import { EmployeeApi } from '../overview/employee.api.service';
import { Employee } from '../packages/employee.class';

@Component({
    selector: 'movit-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent extends FormController<Employee> implements OnInit {

    employeeForm = this.fb.group({
        gender: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.max(100)]),
        firstName: new FormControl('', [Validators.max(100)]),
        lastName: new FormControl('', [Validators.max(100)]),
        phone: new FormControl('', [Validators.maxLength(16)]),
        email: new FormControl('', [Validators.email]),
        birthDay: new FormControl('', []),
        vip: new FormControl('', []),
        languageId: new FormControl('', []),
        segments: new FormControl([], []),
        priceClassId: new FormControl('', []),
        source: new FormControl('', []),

        defaultAddress: new FormGroup({
            street: new FormControl('', [Validators.maxLength(71)]),
            city: new FormControl('', [Validators.maxLength(30)]),
            country: new FormControl('', [Validators.maxLength(25)]),
            zip: new FormControl('', [Validators.min(1), Validators.max(9999999)]),
        }),

        billingAddress: new FormGroup({
            street: new FormControl('', [Validators.maxLength(71)]),
            city: new FormControl('', [Validators.maxLength(30)]),
            country: new FormControl('', [Validators.maxLength(25)]),
            zip: new FormControl('', [Validators.min(1), Validators.max(9999999)]),
        }),


        job: new FormControl('', []),
        civilState: new FormControl('', []),
    })

    segments$ = new BehaviorSubject<any[]>([]);

    priceClasses$ = new BehaviorSubject<any[]>([]);

    constructor(override injector: Injector, private api: EmployeeApi<Employee>) {
        super(injector)
    }

    ngOnInit(): void {
    }

    get employeeType() {
        return this.employeeForm.value.gender;
    }

    override getData(): void {
        if (this.getId()) this.loadEmployee(this.getId())
    }

    loadEmployee(employeeId: number) {
        this.api.getEmployee(employeeId)
    }

    saveEmployee() {
        const data = this.employeeForm.value
        this.api.save(this.getId(), data).subscribe()
    }

}
