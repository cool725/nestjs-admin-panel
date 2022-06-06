import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {EmployeeRepository} from "./classes/auth.repository.template";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private authUserRepo: EmployeeRepository,
  ) {}

}
