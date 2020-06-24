export const isVagrantLocked = (error: Error): RegExpMatchArray | null =>
    error.message.match(new RegExp('requested machine because it is locked!'));

export const isVagrantNotUp = (error: Error): RegExpMatchArray | null =>
    error.message.match(new RegExp('VM must be running to open SSH connection'));
