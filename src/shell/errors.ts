export const isMachineLocked = (error: Error): boolean =>
  error.message.includes('requested machine because it is locked!');

export const isMachineNotUp = (error: Error): boolean =>
  error.message.includes('VM must be running to open SSH connection.');

export const isArgumentMissing = (error: Error): boolean => error.message.includes('Missing');
