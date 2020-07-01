import { infoTxt } from '../logging';

const fs = require('fs-extra'); // todo use @types/fs-extra if fixed
/**
 *
 * @param target
 * @param src
 */

export const createOrRenameSymlink = async (target: string, src: string): Promise<void> => {
  if (await fs.exists(target)) {
    await fs.rename(target, src);
    console.log(infoTxt('Symlink updated'));
  } else {
    await fs.symlink(target, src, 'file');
    console.log(infoTxt('created'));
  }
};
