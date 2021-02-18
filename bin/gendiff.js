#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const gendiff = new Command();

gendiff
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information');

gendiff.parse(process.argv);


// program.addHelpText('after', `
// Example call:
//   $ custom-help --help`);
