import * as notifier from 'node-notifier';
import { projectConfig, eventBus } from '../utils';
import { Notification } from '../types';

export function notify(notification: Notification | string) {
    if (projectConfig?.notifications?.disabled) {
        return;
    }

    const type = typeof notification === 'string' ? 'info' : notification.type;
    const msg = typeof notification === 'string' ? notification : notification.message;

    notifier.notify({
        title: projectConfig.project,
        message: msg,
        time: projectConfig.notifications?.time ?? 2000,
        type: type ?? 'info',
    });
}
