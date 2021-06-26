import IPaserMailTemplateDTO from '../../mailTemplateProvider/dtos/IPaserMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  template: IPaserMailTemplateDTO;
}
