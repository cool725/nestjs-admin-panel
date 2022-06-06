import { Global, Module } from '@nestjs/common';
import { AuthService } from "@movit/api/auth";
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRepository} from './classes/auth.repository.template';
import { EmployeeService } from "./employee.service";
import DBEmployeeOptions from "./db/employee.database";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeRepository]),
  ],
  providers: [ EmployeeService ],
  exports: [ EmployeeService ],
})
export class EmployeeModule {
  static dbSettings = DBEmployeeOptions;
}
