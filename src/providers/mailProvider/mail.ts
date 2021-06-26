import nodemailer, { Transporter } from 'nodemailer';

import HandlebarsMailProvider from '../mailTemplateProvider/HandlebarsMailProvider';
import IMailDTO from './dtos/IMailDTO';

const mailTemplateProvider = new HandlebarsMailProvider();

class EtherealMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      }); //cconfig da ferramenta de disparo.

      this.client = transporter;
      // console.log(account);
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    template,
  }: IMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Thales-Eduardo',
        address: from?.email || 'thalesdev22@gmail.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplateProvider.parse(template),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
