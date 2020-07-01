import * as notifier from 'node-notifier';
import { INotification } from './types';

export function notify(notification: INotification | string): void {
  if (global.config.workspace.notifications?.disabled) {
    return;
  }

  const type = typeof notification === 'string' ? 'info' : notification.type;
  const message = typeof notification === 'string' ? notification : notification.message;

  notifier.notify({
    ...global.config.workspace.notifications,
    ...{ title: global.config.workspace.name },
    ...{ message },
    type: type ?? 'info',
  });
}
