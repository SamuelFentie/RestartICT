import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminService } from '../admin.service';
import { RegistrationStatusDto, ToggleRegistrationResponseDto } from '../dto/registration-status.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly adminService: AdminService) {}

  @Get('status')
  async getRegistrationStatus(): Promise<RegistrationStatusDto> {
    return await this.adminService.getRegistrationStatus();
  }

  @Post('toggle')
  @HttpCode(HttpStatus.OK)
  async toggleRegistration(): Promise<ToggleRegistrationResponseDto> {
    return await this.adminService.toggleRegistration();
  }

  @Post('register-user')
  @HttpCode(HttpStatus.OK)
  async registerUser(
    @Body() userData: {
      telegramId: number;
      username: string;
      firstName?: string;
      lastName?: string;
    }
  ) {
    const result = await this.adminService.registerUser(
      userData.telegramId,
      userData.username,
      userData.firstName,
      userData.lastName
    );
    
    return {
      success: result.success,
      message: result.message
    };
  }
}
