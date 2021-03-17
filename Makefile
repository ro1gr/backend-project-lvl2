install:
	npm install

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage

test-watch:
	npm test -- --watch

lint:
	npx eslint .
