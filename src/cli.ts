import { cac } from 'cac';
import { Options } from 'tsup';

import { version } from '../package.json';

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

      await build({ ...options, config: JOTAI_SCRIPTS_CONFIG_FILENAME });
    });

  cli.help();
  cli.version(version);
  cli.parse(process.argv, { run: false });

  await cli.runMatchedCommand();
}
