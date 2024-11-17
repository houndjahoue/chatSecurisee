import { $t } from 'src/i18n';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Signin, Signup, UpdateEmailDto, updateLastmessageDto, UpdateNationalityDto, UpdatePassword, UpdateProfessionDto, UpdateUsernameDto, VerifyOtpPayload } from './users.dto';
import { hash, compare } from 'bcrypt';
import { UserSession } from './users.sessions';
import { OtpService } from 'src/otp/otp.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { stat } from 'fs';

export const USER_SELECT_FIELDS = {
  id: true,
  email: true,
  gender: true,
  photo: true,
  nationality: true,
  profession: true,
  username: true,
  publicKey: true,
  state: true
};


@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private session: UserSession,
    private otp: OtpService,
    private conversation: ConversationsService,
    private encryption: EncryptionService,
  ) {}
  

  async signup(data: Signup) {
    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] },
    });

    if (existingUser) {
      throw new ConflictException($t('USER_ALREADY_EXISTS'));
    }

    const hashedPassword = await hash(data.password, 3);
    data.password = hashedPassword;

    const { publicKey, privateKey } = await this.encryption.generateKeys();

    const user = await this.prisma.user.create({
      data: { ...data, privateKey, publicKey },
      select: USER_SELECT_FIELDS,
    });
    this.conversation.registerNewUser(user.id);
    return user;
  }

  async signin(data: Signin) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException($t('BAD_CREDENTIALS'));
    }

    const isValidPass = await compare(data.password, user.password);

    if (!isValidPass) {
      throw new UnauthorizedException($t('BAD_CREDENTIALS'));
    }

    delete user.password;
    const sessionToken = this.session.registerUser(user);
    return { user, authToken: sessionToken };
  }

  async logout({token, user}) {
    this.session.removeUser(token);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { state : false },
      select: USER_SELECT_FIELDS,
    })
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException($t('USER_NOT_FOUND'));
    }

    await this.otp.sendOtpByEmail(user);
    return { userId: user.id };
  }

  async forgotPassword2(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException($t('USER_NOT_FOUND'));
    }

    await this.otp.sendOtp2ByEmail(user);
    return { userId: user.id };
  }

  async verifyOtp({ userId, value }: VerifyOtpPayload) {
    await this.otp.verifyOtp(userId, value);
    return { isValid: true };
  }

  async verifyOtp2({ userId, value }: VerifyOtpPayload) {
    await this.otp.verifyOtp(userId, value);
    await this.prisma.user.update({
      where: { id: userId },
      data: { state : true },
      select: USER_SELECT_FIELDS,
    })
    return { isValid: true, state: true };
  }

  async updatePassword({ userId, password }: UpdatePassword) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const hashedPassword = await hash(password, 3);
    return await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
      select: USER_SELECT_FIELDS,
    });
  }

  async updateUsername({ userId, username }: UpdateUsernameDto) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { username },
      select: USER_SELECT_FIELDS,
    });
  }

  async updateEmail({ userId, email }: UpdateEmailDto) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { email },
      select: USER_SELECT_FIELDS,
    });
  }

  async updateProfession({ userId, profession }: UpdateProfessionDto) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { profession },
      select: USER_SELECT_FIELDS,
    });
  }

  async updateNationality({ userId, nationality }: UpdateNationalityDto) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { nationality },
      select: USER_SELECT_FIELDS,
    });
  }

  async updateLastmessage({conversationId, message}: updateLastmessageDto) {
    const conversation = await this.prisma.conversation.findUnique({ where: { id: conversationId } });
    return await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessage: message },
      select: {
        id: true,
        lastMessage: true
      }
    });
  }
}

