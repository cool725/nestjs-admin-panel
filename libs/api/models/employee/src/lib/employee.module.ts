import { Global, Module } from '@nestjs/common';
import { AuthService } from "@movit/api/auth";
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository} from './classes/auth.repository.template';
import { EmployeeService } from "./employee.service";
import DBEmployeeOptions from "./db/employee.database";
import { EmployeeCreationService } from "./employee.creation.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeRepository]),
  ],
  providers: [ EmployeeService,EmployeeCreationService ],
  exports: [ EmployeeService ,EmployeeCreationService],
})
export class EmployeeModule {
  static dbSettings = DBEmployeeOptions;
}
