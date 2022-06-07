import { EntityRepository, Repository } from 'typeorm';
import {EmployeeEntity} from "../entities/entity.employee";

@EntityRepository(EmployeeEntity)
export class EmployeeRepository extends Repository<EmployeeEntity> {

}
