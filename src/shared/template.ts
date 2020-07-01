import * as camelcase from 'camelcase';

export const makeClassName = (name: string): string => camelcase(name.split(':').join('-'), { pascalCase: true });

export const makeFunctionName = (name: string): string => {
  const className = makeClassName(name);
  return className.charAt(0).toLowerCase() + className.slice(1);
};

export const makeFileName = (name: string, extension = 'ts'): string => {
  const parts = name.split(':');
  return parts[parts.length - 1] + `.${extension}`;
};

export const makePath = (name: string): string => {
  const parts = name.split(':');
  return parts.slice(0, parts.length - 1).join('/');
};
