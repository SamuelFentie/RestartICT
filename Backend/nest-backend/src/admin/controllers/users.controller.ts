import { Controller, Get } from '@nestjs/common';
import { AdminService } from '../admin.service';

@Controller('users')
export class UsersController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getRegisteredUsers() {
    return await this.adminService.getRegisteredUsers();
  }
}
