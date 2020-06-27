export const isMachineLocked = (error: Error): boolean =>
    error.message.includes('requested machine because it is locked!');
