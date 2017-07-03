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

- Improve weapon selector

## Changes

<!-- BEGIN RELEASE NOTES -->
- 0.2.0:
  - UI tweaks
  - Added Gun shot effect
<!-- END RELEASE NOTES -->
- 0.1.3:
  - Animated explosions
  - Weapon selector and multiple weapons
- 0.1.2:
  - Integrate TRAVIS
  - Converted to TypeScript
- 0.1.1: Fixes
  - BUG: Switching cameras shoots
  - BUG: Only one explosion sound at a time.
  - BUG: Rotating the screen is weird.
- 0.1.0: MVP



[co]: https://cordova.apache.org/
[cp]: https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview

