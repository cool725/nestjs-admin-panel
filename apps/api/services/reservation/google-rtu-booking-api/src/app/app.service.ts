import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return {
      message: 'Welcome to api/services/reservation/google-rtu-booking-api!',
    };
  }
}
