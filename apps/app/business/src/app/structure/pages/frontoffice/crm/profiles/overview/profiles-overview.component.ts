import {Component, Injector, OnInit} from '@angular/core';
import {PageController} from "../../../../page.controller";
import {ProfilesAPI} from "../packages/profile-api.service";
import {ITableBaseFilter, Table} from "@movit/app/common";

class Profile {
  profileId:number
  companyId:number

  firstName:string
  lastName:string
  email:string
  phone:string


  static create(params:Partial<Profile>){
    return Object.assign(new Profile(),params)
  }
}

@Component({
  selector: 'movit-profiles-overview',
  templateUrl: './profiles-overview.component.html',
  styleUrls: ['./profiles-overview.component.css']
})
export class ProfilesOverviewComponent extends PageController implements OnInit {
  public profileTable = new Table<Profile, ITableBaseFilter>(this.api.profiles$);

  constructor(override injector: Injector, public api:ProfilesAPI<Profile, any>) {
    super(injector);
  }

  ngOnInit(): void {

  }

  getData(): void {
    this.onLoadAndSetData(this.api.getProfiles(),this.api.profiles$)
  }

}
