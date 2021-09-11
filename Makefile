bold := $(shell tput bold)
sgr0 := $(shell tput sgr0)

define important_text
	@echo '$(bold)${1}$(sgr0)'
endef

setup: copy_envs setup_ios setup_android
	

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