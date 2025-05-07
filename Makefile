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

qlty-check:
	qlty check --all

qlty-metrics:
	qlty metrics
