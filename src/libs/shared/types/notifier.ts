export interface INotification {
    message: string;
    icon?: string;
    type?: 'error' | 'info' | 'warn';
}
