import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {CashSystemDeviceRepository} from "./classes/cashsystem.repository.device";

@Injectable()
export class CashSystemDeviceService {
    constructor(@InjectRepository(CashSystemDeviceRepository)
                private deviceRepo: CashSystemDeviceRepository) {}

}
