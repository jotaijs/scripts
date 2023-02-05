import { cac } from 'cac';
import { Options } from 'tsup';
import process from 'process';
import JoyCon from 'joycon';

import { version } from '../package.json';
import path from 'path';

const JOTAI_SCRIPTS_CONFIG_FILENAME = 'jotai-scripts.config.ts';

export async function main(options: Options = {}) {
  const cli = cac('jotai-scripts');

  cli
    .command('build', 'Bundle files')
    .option(
      '--watch [path]',
      'Watch mode, if path is not specified, it watches the current folder ".". Repeat "--watch" for more than one path',
    )
    .action(async (flags) => {
      const { build } = await import('tsup');
      Object.assign(options, {
        ...flags,
      });

      const cwd = process.cwd();
      const configJoycon = new JoyCon();
      const config = await configJoycon.resolve({
        files: ['jotai-scripts.config.ts'],
        cwd: process.cwd(),
        stopDir: path.parse(cwd).root,
      });

      if (!config) {
        throw new Error('jotai-scripts.config.ts file not found');
      }

      await build({ ...options, config });
    });

  cli.help();
  cli.version(version);
  cli.parse(process.argv, { run: false });

  await cli.runMatchedCommand();
}
