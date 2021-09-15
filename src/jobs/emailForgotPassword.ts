import path from 'path';
import EtherealMailProvider from '../providers/mailProvider/mail';
const sendmailProvider = new EtherealMailProvider();

export default {
  key: 'emailForgotPassword',
  async handle({ data }: any): Promise<void> {
    const { users } = data;
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'ForgotPassword.hbs'
    );
    await sendmailProvider.sendMail({
      to: {
        name: users.name,
        email: users.email,
      },
      subject: '[THALES] Recuperação de senha.',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: users.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${users.token}`,
        },
      },
    });
  },
};
