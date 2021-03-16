# Diff Generator

[![Actions Status](https://github.com/ro1gr/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ro1gr/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/4fb7750aa4a551e86e75/maintainability)](https://codeclimate.com/github/ro1gr/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4fb7750aa4a551e86e75/test_coverage)](https://codeclimate.com/github/ro1gr/backend-project-lvl2/test_coverage)

## Comparing two files
`genDiff(filepath1, filepath2, outputFormat)` compares two files and prints diff in desired format. Supported formats:

- stylish,
- plain,
- json.

## Supported file extensions
Currently only JSON and YAML files are supported.

## CLI
```
Usage: gendiff [options] <filepath1> <filexpath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           output usage information
```

## Use cases
[![asciicast](https://asciinema.org/a/PjwOSVYeSjzU56feos0ENf15F.svg)](https://asciinema.org/a/PjwOSVYeSjzU56feos0ENf15F)
