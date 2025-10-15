import { MailerService } from "@nestjs-modules/mailer";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "../../generated/prisma";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async sendMail(user: User, activationLink: string) {
    const url = `${this.configService.get("API_URL")}/api/auth/activate/${activationLink}`;
    const username = user.full_name;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: "Welcome to Clinic Service! Confirm your Email",
        html: `<html lang="en">
          <head> ... </head>
          <body>
            <div class="container">
              <h1>Welcome, ${username}! </h1>
              <p>Thanks for joining Clinic Service. Click below to confirm:</p>
              <a href="${url}" class="button">Confirm</a>
            </div>
          </body>
        </html>`,
      });

      this.logger.log(` Activation email sent to ${user.email}`);
    } catch (error) {
      this.logger.log(
        ` Failed to send activation email to ${user.email}`,
        error.stack
      );
      throw new InternalServerErrorException("Failed to send activation email");
    }
  }
}
