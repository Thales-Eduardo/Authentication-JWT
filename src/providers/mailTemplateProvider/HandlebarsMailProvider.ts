import handlebars from 'handlebars';
import fs from 'fs';

import IPaserMailTemplateDTO from './dtos/IPaserMailTemplate';

class HandlebarsMailProvider {
  public async parse({
    file,
    variables,
  }: IPaserMailTemplateDTO): Promise<string> {
    const fileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(fileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailProvider;
