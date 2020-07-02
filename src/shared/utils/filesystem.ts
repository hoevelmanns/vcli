import { infoTxt } from '../logging';
import { asyncExec } from 'async-shelljs';
import { Stats } from 'fs';

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

export const getPathByInode = async (inode: number): Promise<string> =>
  await asyncExec(`find ~/ -inum ${inode} -print -quit`);

export const getCwdInode = async (): Promise<string> => await fs.lstat(process.cwd()).then((stats: Stats) => stats.ino);
