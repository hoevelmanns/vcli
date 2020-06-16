import { EventEmitter } from 'events';

class MyEmitter extends EventEmitter {
    emit(event: string | symbol, ...args: any): boolean {
        return super.emit(event, ...args);
    }
}

export const eventBus = new MyEmitter();
