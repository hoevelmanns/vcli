import * as notifier from 'node-notifier';
import { INotification } from '../types';

export function notify(notification: INotification | string) {
    if (global.config.workspace.notifications?.disabled) {
        return;
    }

    const type = typeof notification === 'string' ? 'info' : notification.type;
    const msg = typeof notification === 'string' ? notification : notification.message;

    notifier.notify({
        title: global.config.workspace.name,
        message: msg,
        time: global.config.workspace?.notifications?.time ?? 2000,
        type: type ?? 'info',
    });
}
