# Stress Blaster

This is my first try at a [Cordova][co] application.  It makes use of
the [camera preview][cp] plugin.

## Install

```
cordova platform add android
cordova build android

```

## Reset / Update Plugins to Latest

If you last installed an older version of the plugin and want to
ensure the sample app is up to date again just do the following to
reset.

```
rm -rf platforms/ plugins/

cordova platform add android
cordova build android

cordova platform add ios
cordova build ios
```

## TODO

- BUG: Rotating the screen is weird.

- Animated explosions
- Weapon selector and multiple weapos (Maybe through volume buttons?)
- Integrate TRAVIS

## Changes

<!-- BEGIN RELEASE NOTES -->
- 0.1.2:
  - Converted to TypeScript

<!-- END RELEASE NOTES -->
- 0.1.1: Fixes
  - BUG: Switching cameras shoots
  - BUG: Only one explosion sound at a time.
- 0.1.0: MVP



[co]: https://cordova.apache.org/
[cp]: https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview

