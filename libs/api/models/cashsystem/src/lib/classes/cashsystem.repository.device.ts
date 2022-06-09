import { EntityRepository, Repository } from 'typeorm';
import {CashSystemDeviceEntity} from "../entities/cashsystem.device.entity";

@EntityRepository(CashSystemDeviceEntity)
export class CashSystemDeviceRepository extends Repository<CashSystemDeviceEntity> {}
