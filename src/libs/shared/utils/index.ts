export * from './notifier';
export * from './event-bus';
export * from './config';
export * from './template';

export const mergeArrays = (...arrays: any[]) => {
    let jointArray: any[] = [];

    arrays.forEach((array) => {
        jointArray = [...jointArray, ...array];
    });

    return jointArray.filter((item, index) => jointArray.indexOf(item) === index);
};
