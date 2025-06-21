install:
	npm ci

develop:
	npm run dev

lint:
	npx eslint .

build:
	NODE_ENV=production npm run build

test:
	echo no tests

playwright:
	npx playwright test

playwright-result:
	npx playwright show-report

qlty-check:
	qlty check --all

qlty-metrics:
	qlty metrics
