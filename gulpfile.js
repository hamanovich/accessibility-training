const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browserSync = require('browser-sync').create();

function scssTask(){
    return src('sass/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(dest('dist', { sourcemaps: '.' }))
}

function jsTask(){
    return src('js/custom.js', { sourcemaps: true })
        .pipe(dest('dist', { sourcemaps: '.' }))
}

function browsersyncServe(cb){
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browsersyncReload(cb){
    browserSync.reload();
    cb();
}

function watchTask(){
    watch('*.html', browsersyncReload);
    watch(['sass/**/*.scss', 'js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

exports.default = series(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
);
