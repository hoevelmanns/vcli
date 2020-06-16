import * as notifier from 'node-notifier';
import { Notification } from '../types';
import { config } from './config';

export function notify(notification: Notification | string) {
    if (config.notifications?.disabled) {
        return;
    }

    const type = typeof notification === 'string' ? 'info' : notification.type;
    const msg = typeof notification === 'string' ? notification : notification.message;

    notifier.notify({
        title: config.project,
        message: msg,
        time: config.notifications?.time ?? 2000,
        type: type ?? 'info',
    });
}
