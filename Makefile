install:
	npm install

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .
