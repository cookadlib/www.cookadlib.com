'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';

import * as config from '../config';
import * as helper from '../helper';

const namespace = helper.getNamespace(__filename);

let sourceFiles = config.files.source.fonts;

export function task(done) {
  return gulp.src(sourceFiles)
  .pipe(debug({
    title: namespace
  }))
  .pipe(gulp.dest(config.directory.destination.fonts))
  .on('error', helper.reportError);
}

export function watch(done) {
  return helper.defineWatcher(namespace, sourceFiles, task, true);
}

task.displayName = namespace;
task.description = 'Copy web font files';

export default task;
