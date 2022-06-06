import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('emp_employee')
export class EmployeeEntity extends BaseEntity  {
  @PrimaryGeneratedColumn('increment')
  id: string;
}
