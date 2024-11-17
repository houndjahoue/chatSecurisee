import { $t } from 'src/i18n';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class Signup {
  @ApiProperty()
  @IsNotEmpty({ message: $t('USERNAME_REQUIRED') })
  username: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender, { message: $t('BAD_GENDER_FORMAT') })
  gender: Gender;

  @ApiProperty()
  @IsEmail(undefined, { message: $t('BAD_EMAIL_FORMAT') })
  email: string;

  @ApiProperty()
  @IsStrongPassword(undefined, {
    message: $t('STRONG_PASSWORD_REQUIRED'),
  })
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  profession?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiPropertyOptional()
  photo?: string;
}

export class Signin {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class ForgotPassword {
  @ApiProperty()
  @IsEmail(undefined, { message: $t('BAD_EMAIL_FORMAT') })
  email: string;
}

export class VerifyOtpPayload {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  value: string;
}

export class UpdatePassword {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  @IsStrongPassword(undefined, { message: $t('STRONG_PASSWORD_REQUIRED') })
  password: string;
}

// dto/update-username.dto.ts
export class UpdateUsernameDto {
  userId: string;
  username: string;
}

// dto/update-email.dto.ts
export class UpdateEmailDto {
  userId: string;
  email: string;
}

// dto/update-profession.dto.ts
export class UpdateProfessionDto {
  userId: string;
  profession: string;
}

// dto/update-nationality.dto.ts
export class UpdateNationalityDto {
  userId: string;
  nationality: string;
}
export class updateLastmessageDto {
  conversationId : string;
  message : string;
}

