#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filexpath2>')
  .action((filepath1, filepath2, format) => console.log(genDiff(filepath1, filepath2)));

program.parse(process.argv);