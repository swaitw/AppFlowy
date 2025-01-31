import { DatabaseNotification } from '../../../../../services/backend';
import { NotificationParser, OnNotificationError } from '../../../../../services/backend/notifications';

declare type DatabaseNotificationCallback = (ty: DatabaseNotification, payload: Uint8Array) => void;

export class DatabaseNotificationParser extends NotificationParser<DatabaseNotification> {
  constructor(params: { id?: string; callback: DatabaseNotificationCallback; onError?: OnNotificationError }) {
    super(
      params.callback,
      (ty) => {
        const notification = DatabaseNotification[ty];
        if (isDatabaseNotification(notification)) {
          return DatabaseNotification[notification];
        } else {
          return DatabaseNotification.Unknown;
        }
      },
      params.id,
      params.onError
    );
  }
}

const isDatabaseNotification = (notification: string): notification is keyof typeof DatabaseNotification => {
  return Object.values(DatabaseNotification).indexOf(notification) !== -1;
};
