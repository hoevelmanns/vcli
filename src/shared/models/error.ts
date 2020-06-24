export const isVagrantLocked = (error: Error) =>
    error.message.match(new RegExp('requested machine because it is locked!'));

export const isVagrantStopped = (error: Error) =>
    error.message.match(new RegExp('VM must be running to open SSH connection'));
