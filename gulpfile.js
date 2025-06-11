import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'

const sass = gulpSass(dartSass)

// JS: Copia el JS por ahora (puedes usar concat + uglify más adelante)
export function js(done) {
    src('src/js/app.js')
        .pipe(dest('build/js'))
    done()
}

// CSS: Compila SASS y minifica CSS
export function css(done) {
    src('src/sass/app.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('build/css', { sourcemaps: '.' }))
    done()
}

// Dev: Ver cambios y compilar automáticamente
export function dev() {
    watch('src/sass/**/*.scss', css)
    watch('src/js/**/*.js', js)
    return Promise.resolve(); // o simplemente: return;
}

export default series(js, css, dev)
