'use strict';

import gulp from 'gulp';
import historyApiFallback from 'connect-history-api-fallback';

import {
  config,
  browserSync
  // ,
  // htmlInjector
} from '../config.js';

let sourceFiles = config.files.source.markup;

sourceFiles = sourceFiles.concat(config.files.source.markupIgnored.map(function(path) {
  return '!' + path;
}));

function onBrowsersyncInit() {

  if(config.instance.browsersync.server) {
    config.instance.browsersync.server.middleware = [
      historyApiFallback()
    ];
    console.info('Browsersync server set via config.instance.browsersync.server, not using config.instance.browsersync.proxy');
  } else if(config.instance.browsersync.proxy) {
    console.info('Browsersync server set via config.instance.browsersync.proxy, not using config.instance.browsersync.server');
  }

  // console.info(
  //   'To connect from an iOS device:\n',
  //   util.colors.magenta(
  //     'Go to Settings > Wi-Fi\n',
  //     'Tap the information icon next to the Wi-Fi network name that the device is connected to.\n',
  //     'From the Wi-Fi network settings page, set HTTP Proxy to "Auto"\n',
  //     `Enter "${config.browsersync.proxy.protocol}://${browserSync.instance.utils.devIp}" into the "URL" field\n`,
  //     `Enter ${browserSync.instance.options.get('urls').get('external')} into the browser address bar\n`
  //   )
  // );
}

export default function task() {
  // browserSync.use(htmlInjector, {
  //   files: sourceFiles
  // });

  browserSync.init(config.instance.browsersync, onBrowsersyncInit);
}

gulp.task('browser-sync', [
    // 'build' //no need to build every time that gulp is run; if you want to build then just type "gulp build" manually
], task);