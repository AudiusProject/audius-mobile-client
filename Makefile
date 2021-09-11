bold := $(shell tput bold)
sgr0 := $(shell tput sgr0)

define important_text
	@echo '$(bold)${1}$(sgr0)'
endef

setup: copy_envs setup_ios setup_android setup_debug

copy_envs:
	@$(call important_text, 'copying env variables locally...')
	@cp .env.dev.tmpl .env.dev
	@cp .env.stage.tmpl .env.stage
	@cp .env.prod.tmpl .env.prod

setup_ios:
	@$(call important_text, 'installing ios dependencies...')
	@$(call important_text, 'installing cocoapods with sudo...')
	@sudo gem install cocoapods
	@$(call important_text, 'installing npm modules...')
	@npm install
	@$(call important_text, 'installing pod...')
	@pod install --project-directory=ios/
	@$(call important_text, 'creating ios build...')
	@npm run bundle:ios

setup_android:
	@$(call important_text, 'installing android dependencies...')
	@$(call important_text, 'installing node modules...')
	@npm install

setup_debug:
	@$(call important_text, 'installing debug libraries...')
	@npm install -g serve --user

run_debug:
	@$(call important_text, 'running serve...')
	@serve -s web-app/Web.bundle/build -p 9000

run_local_stage:
	@$(call important_text, 'running locally stage...')
	@URL_OVERRIDE=http://localhost:3001 npm run start:mobile-stage

run_local_prod:
	@$(call important_text, 'running locally production...')
	@URL_OVERRIDE=http://localhost:3001 npm run start:mobile-prod

run_static_local_stage:
	@$(call important_text, 'building with stage...')
	@npm run build:mobile-stage
	@$(call important_text, 'running copy...')
	@npm run copy:local-staging

run_static_local_prod:
	@$(call important_text, 'building with prod...')
	@npm run build:mobile-prod
	@$(call important_text, 'running copy...')
	@npm run copy:local-production

run_remote_static_stage:
	@$(call important_text, 'running copy stage...')
	@npm run copy:remote-staging

run_remote_static_prod:
	@$(call important_text, 'running copy production...')
	@npm run copy:remote-production