install:
	npm install

publish:
	npm publish --dry-run

test:
	npm test

lint:
	npx eslint .
