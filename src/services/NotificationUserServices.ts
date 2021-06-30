import { getMongoRepository } from 'typeorm';

import Notification from '../schemas/Notification';

interface Request {
  user_id: string;
  content: string;
}

class NotificationUserServices {
  public async create({ user_id, content }: Request): Promise<Notification> {
    const notificationMongo = getMongoRepository(Notification, 'mongo');

    const notification = notificationMongo.create({
      user_id,
      content,
    });

    await notificationMongo.save(notification);

    return notification;
  }
}

export default NotificationUserServices;
