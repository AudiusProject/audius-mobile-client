# Audius Mobile Client

The Audius React Native mobile client.

This project is a React Native wrapper around the Audius web client, and requires a web client to be running.
The native project can be built & run against a local client (serving at localhost) or against a vendored staging/production build.

## Setup

```bash
make setup
```

### iOS

```bash
make setup_ios
```
### Android

```bash
make setup_android
```

## Running against localhost

> The WebView will be pointed at the url contained in `URL_OVERRIDE`

This URL should be a serving a mobile audius-client with either

`make run_local_stage` or `make run_local_prod`

## Running against a local static build

To run against a local staging or production build, build the client and copy the build into the mobile client:

```bash
# staging

make run_static_local_stage

# production

make run_static_local_prod
```

## Running against a remote static build

To run against a remote staging or production build, pull a the latest dapp from s3:

> Make sure you have s3 creds set up and the aws cli installed.

```bash
# staging
make run_remote_static_stage

# production
make run_remote_static_prod
```

## iOS

```bash
# Run a simulator using a prod configuration
npm run ios
# Run a simulator using a stage configuration
npm run ios:bounce
# Run a simulator using a dev configuration
npm run ios:dev

# Run the app on a device
npm run ios:device "Raymond's iPhone"
# To see available devices
xcrun xctrace list devices
```

## Android

```bash
# Run a simulator using a prod configuration
npm run android
# Run a simulator using a stage configuration
npm run android:bounce
# Run a simulator using a dev configuration
npm run android:dev

# Look at android devices
adb devices
# Connect device to dev server
adb -s <device name> reverse tcp:8081 tcp:8081
# If connecting to localhost, set up port forwarding
adb -s <device name> reverse tcp:3001 tcp:3001
# Run on device
npm run android
```

If you run into issues, try cleaning the android build folder

```bash
cd android && ./gradlew clean && cd ..
```

## Debugging

- To debug the native-layer of the app, install [React Native Debugger](https://github.com/jhen0409/react-native-debugger) and enable debugging (Cmd + D) in the simulator.
- Safari can also be used to debug against the WebView running the dapp. This can be seen by opening Safari > Develop > Device > Localhost.

On Android, you can use the adb Android Studio tool or

```bash
# Show device logs
adb logcat '*:V'
```

## Helpful

- Sometimes the simulator app code won't update. You should disable caching in `settings/Network` of React Native Debugger.
- If you feel like debugging the actual static app contained in the build, you can:

```bash
make run_debug
```
