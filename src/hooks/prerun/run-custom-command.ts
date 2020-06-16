import {Hook} from '@oclif/config'
import { CustomCommand } from "../../libs/shell/models";

const hook: Hook<'prerun'> = async function (opts) {
  process.stdout.write(`example hook running ${opts}\n`)

  if ((opts?.Command as unknown as CustomCommand).type) {
    return;
  }

  console.log("opts", opts)
  console.log("test")
  process.exit()
}

export default hook
