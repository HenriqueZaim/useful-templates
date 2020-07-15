"use strict";  // Procura pelo pacote gulp na pasta node_modules

const gulp = require('gulp');
const sass = require('gulp-sass');
const purgecss = require('gulp-purgecss');
const purgeMap = new Map();

purgeMap.set('index.css', 'index.html');

sass.compiler = require('node-sass');

gulp.task('scss', function(){
    return gulp.src('scss/custom/pages/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('stylesheets'));
});

gulp.task('watch', function(){
    gulp.watch('./scss/**/*.scss', gulp.series('scss'));
});

gulp.task('purgecss', () => {
    for(let [ key, val ] of purgeMap.entries()){
        return gulp.src('stylesheets/' + key).pipe(
            purgecss({
                content: ['templates/' + val]
            })
        )
        .pipe(gulp.dest('stylesheets/'))
    }
  })