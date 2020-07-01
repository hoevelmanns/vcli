import { EventEmitter } from 'events';

class Emitter extends EventEmitter {
  emit(event: string | symbol, ...args: string[]): boolean {
    return super.emit(event, ...args);
  }
}

export const eventBus = new Emitter();
