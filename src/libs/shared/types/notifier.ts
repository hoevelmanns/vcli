export interface Notification {
    message: string;
    icon?: string;
    type?: 'error' | 'info' | 'warn';
}
