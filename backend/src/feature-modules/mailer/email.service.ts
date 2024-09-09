import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendVerificationEmail(
    to: string,
    token: string,
    userId: string,
  ): Promise<void> {
    const appUrl = this.configService.get('APP_URL');
    const verificationLink = `${appUrl}/auth/verify-email?token=${token}&userId=${userId}`;

    await this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM'),
      to: to,
      subject: 'Please verify your email',
      html: `
        <h1>Email Verification</h1>
        <p>Please click the button below to verify your email address:</p>
        <a href="${verificationLink}" style="padding: 10px; background-color: #4CAF50; color: white; text-decoration: none; display: inline-block;">
          Verify Email
        </a>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    });
  }
}
