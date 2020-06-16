import * as notifier from 'node-notifier';
import { INotification } from '../types';
import { config } from './config';

export function notify(notification: INotification | string) {
    if (config.workspace.notifications?.disabled) {
        return;
    }

    const type = typeof notification === 'string' ? 'info' : notification.type;
    const msg = typeof notification === 'string' ? notification : notification.message;

    notifier.notify({
        title: config.workspace.name,
        message: msg,
        time: config.workspace?.notifications?.time ?? 2000,
        type: type ?? 'info',
    });
}
