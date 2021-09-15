import path from 'path';
import EtherealMailProvider from '../providers/mailProvider/mail';
const sendmailProvider = new EtherealMailProvider();

export default {
  key: 'emailRegister',
  async handle({ data }: any): Promise<void> {
    const { user } = data;
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'createUser.hbs'
    );
    await sendmailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[THALES] Cadastro Concluído.',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          surname: user.surname,
        },
      },
    });
  },
};
