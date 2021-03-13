#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filexpath2>')
  .action((filepath1, filepath2, options) => {
    const formattedDiff = genDiff(filepath1, filepath2, options.format);
    console.log(formattedDiff);
  });

program.parse(process.argv);
