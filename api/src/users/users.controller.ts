import { CurrentUser } from '../decorators/current-user.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ForgotPassword,
  Signin,
  Signup,
  UpdateEmailDto,
  updateLastmessageDto,
  UpdateNationalityDto,
  UpdatePassword,
  UpdateProfessionDto,
  UpdateUsernameDto,
  VerifyOtpPayload,
} from './users.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Session } from './users.typings';

@Controller('users')
@ApiTags('Utilisateurs')
@ApiBearerAuth()
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('signup')
  async signup(@Body() data: Signup) {
    return await this.service.signup(data);
  }

  @Post('signin')
  async signin(@Body() data: Signin) {
    return await this.service.signin(data);
  }

  @Post('logout')
  async logout(@CurrentUser() { user, token }: Session) {
    return this.service.logout({token, user});
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: ForgotPassword) {
    return this.service.forgotPassword(email);
  }

  @Post('forgot-password2')
  async forgotPassword2(@Body() { email }: ForgotPassword) {
    return this.service.forgotPassword2(email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() data: VerifyOtpPayload) {
    return this.service.verifyOtp(data);
  }

  @Post('verify-otp2')
  async verifyOtp2(@Body() data: VerifyOtpPayload) {
    return this.service.verifyOtp2(data);
  }
  
  @Post('update-password')
  async updatePassword(@Body() data: UpdatePassword) {
    return this.service.updatePassword(data);
  }

  @Post('update-username')
  async updateUsername(@Body() data: UpdateUsernameDto) {
    return this.service.updateUsername(data);
  }

  @Post('update-email')
  async updateEmail(@Body() data: UpdateEmailDto) {
    return this.service.updateEmail(data);
  }

  @Post('update-profession')
  async updateProfession(@Body() data: UpdateProfessionDto) {
    return this.service.updateProfession(data);
  }

  @Post('update-nationality')
  async updateNationality(@Body() data: UpdateNationalityDto) {
    return this.service.updateNationality(data);
  }

  @Post('update-lastmessage')
  async updateLastmessage(@Body() data : updateLastmessageDto) {
    return this.service.updateLastmessage(data);
  }

  @Get('me')
  async me(@CurrentUser() { user }: Session) {
    return user;
  }
}