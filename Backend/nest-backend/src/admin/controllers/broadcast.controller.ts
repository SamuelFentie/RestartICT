import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminService } from '../admin.service';
import { BroadcastMessageDto } from '../dto/broadcast-message.dto';

@Controller('broadcast')
export class BroadcastController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async broadcastMessage(@Body() broadcastMessageDto: BroadcastMessageDto) {
    const result = await this.adminService.broadcastMessage(broadcastMessageDto);
    return {
      success: true,
      message: result.message,
      sentTo: result.sentTo
    };
  }
}
