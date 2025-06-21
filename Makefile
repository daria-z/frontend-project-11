install:
	npm ci

develop:
	npm run dev

lint:
	npx eslint .

build:
	NODE_ENV=production npm run build

test:
	npx playwright test

test-report:
	npx playwright show-report

qlty-check:
	qlty check --all

qlty-metrics:
	qlty metrics
