// Requires
const gulp         = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps   = require('gulp-sourcemaps'),
      concat       = require('gulp-concat'),
      sass         = require('gulp-sass'),
      addSrc       = require('gulp-add-src'),
      uglify       = require('gulp-uglifyjs'),
      babel        = require('gulp-babel'),
      size         = require('gulp-size')

// Plugins
const cssPlugins = [
          // './public/plugins/jquery-ui/themes/base/jquery-ui.min.css'
      ],
      jsPlugins  = [
          // './public/plugins/js-cookie/src/js.cookie.js'
      ]

// Toutes les taches Gulp
const allTasksGulp = ['sass-front', 'sass-back', 'js-front', 'js-back']

// Les fichiers à watcher
const watches = {
    css: {
        front: [
            // Tous les fichiers scss dans le dossier 'sass' + les plugins css 'cssPlugins'
            ...cssPlugins,
            './resources/assets/sass/frontend/**/*.scss'
        ],
        back: [
            ...cssPlugins,
            './resources/assets/sass/backend/**/*.scss'
        ]
    },
    js: {
        front: [
            // Tous les fichiers js dans le dossier 'front'
            './resources/assets/js/frontend/**/*.js'
        ],
        back: [
            './resources/assets/js/backend/**/*.js'
        ]
    }
}

// Les configurations prod et dev des plugins
const configs = {
    // Configuration en mode dev
    dev: {
        uglify: {},
        sass: {},
        autoprefixer: {
            cascade: true // On souhaite conserver les cascades (tabs) pour mieux s'y retrouver lors des debugs CSS
        },
        babel: {
            presets: ['env'] // Babel convertit ES6 en JS compatible pour tous les browsers
        },
        size: {
            showFiles: true, // Affiche la taille des fichiers dans la console
            showTotal: false // N'affiche pas le poids total de tous les fichiers
        }
    },
    // Configuration en mode prod
    prod: {
        // Configuration pour la compression des fichiers JS
        uglify: {
            compress: {
                sequences: true,  // join consecutive statemets with the “comma operator”
                properties: true,  // optimize property access: a["foo"] → a.foo
                dead_code: true,  // discard unreachable code
                drop_debugger: true,  // discard “debugger” statements
                unsafe: false, // some unsafe optimizations (see below)
                conditionals: true,  // optimize if-s and conditional expressions
                comparisons: true,  // optimize comparisons
                evaluate: true,  // evaluate constant expressions
                booleans: true,  // optimize boolean expressions
                loops: true,  // optimize loops
                unused: true,  // drop unused variables/functions
                hoist_funs: true,  // hoist function declarations
                hoist_vars: false, // hoist variable declarations
                if_return: true,  // optimize if-s followed by return/continue
                join_vars: true,  // join var declarations
                cascade: true,  // try to cascade `right` into `left` in sequences
                side_effects: true,  // drop side-effect-free statements
                warnings: true,  // warn about potentially dangerous optimizations/code
                global_defs: {}     // global definitions
            }
        },
        sass: {
            outputStyle: 'compressed' // Compresse les fichiers sass
        },
        autoprefixer: {
            browsers: ['last 3 versions', 'ie > 8'], // Prefix les transform, transition...etc. pour la compatibilité
            cascade: false
        },
        babel: {
            presets: ['env']
        },
        size: {
            showFiles: true, // Affiche la taille des fichiers dans la console
            showTotal: false // N'affiche pas le poids total de tous les fichiers
        }
    }
}

// La configuration sélectionné (soit prod, soit dev)
let configSelected = configs.dev

// Permet de savoir si nous sommes en dev ou en prod
let isDev = true

/** DEV **/
gulp.task('dev', () => {
    // Lance toutes les tasks gulp
    gulp.start(allTasksGulp)
})

/** PROD **/
gulp.task('prod', () => {
    isDev = false
    // Sélectionne la configuration 'prod'
    configSelected = configs.prod
    gulp.start('dev')
})

/** TASKS SASS **/
gulp.task('sass-front', () => {
    return gulp.src([
        './resources/assets/sass/front.scss'
    ])
    // Initialise un sourcemap
        .pipe(sourcemaps.init())
        // Convertit le SASS en CSS
        .pipe(sass(configSelected.sass).on('error', sass.logError))
        // Prefix attributs des règles CSS (-o-transform... etc.)
        .pipe(autoprefixer(configSelected.autoprefixer))
        // Ajoute les fichiers CSS des plugins
        .pipe(addSrc.prepend(cssPlugins))
        // Concat le tout pour faire un fichier 'bundle.css'
        .pipe(concat('frontend.css'))
        // Écrit le sourcemap 'bundle.css.map'
        .pipe(sourcemaps.write('.'))
        // Affiche la taille des fichiers dans la console
        .pipe(size(configSelected.size))
        // Envoie les fichiers 'bundle.css' et 'bundle.css.map' dans le dossier 'public/css'
        .pipe(gulp.dest('public/css'))
})

gulp.task('sass-back', () => {
    return gulp.src(watches.css.back)
    // Convertit le SASS en CSS
        .pipe(sass(configSelected.sass).on('error', sass.logError))
        // Prefix attributs des règles CSS (-o-transform... etc.)
        .pipe(autoprefixer(configSelected.autoprefixer))
        // Concat le tout pour faire un fichier 'back.css'
        .pipe(concat('backend.css'))
        // Affiche la taille des fichiers dans la console
        .pipe(size(configSelected.size))
        // Envoie les fichiers 'back.css' dans le dossier 'public/css/admin'
        .pipe(gulp.dest('public/css'))
})

/** TASKS JS **/
gulp.task('js-front', () => {
    let gulpSteps = gulp.src(watches.js.front)
    // Initialise un sourcemap
        .pipe(sourcemaps.init())
        // Convertit l'ES6 en JS compatible pour tous les navigateurs
        .pipe(babel(configSelected.babel))

    if(!isDev) {
        // Si nous ne sommes pas en dev, compresse les fichiers JS
        gulpSteps = gulpSteps.pipe(uglify(configSelected.uglify))
    }

    return gulpSteps
    // Ajoute les fichiers CSS des plugins
        .pipe(addSrc.prepend(jsPlugins))
        // Concat le tout pour faire un fichier 'frontend.css'
        .pipe(concat('frontend.js'))
        // Écrit le sourcemap 'frontend.js.map'
        .pipe(sourcemaps.write('.'))
        // Affiche la taille des fichiers dans la console
        .pipe(size(configSelected.size))
        // Envoie les fichiers 'bundle.js' et 'bundle.js.map' dans le dossier 'public/js'
        .pipe(gulp.dest('public/js'))
})

gulp.task('js-back', () => {
    let gulpSteps = gulp.src(watches.js.back)
    // Convertit l'ES6 en JS compatible pour tous les navigateurs
        .pipe(babel(configSelected.babel))

    if(!isDev) {
        // Si nous ne sommes pas en dev, compresse les fichiers JS
        gulpSteps = gulpSteps.pipe(uglify(configSelected.uglify))
    }

    return gulpSteps
    // Concat le tout pour faire un fichier 'backend.css'
        .pipe(concat('backend.js'))
        // Écrit le sourcemap 'backend.js.map'
        .pipe(sourcemaps.write('.'))
        // Affiche la taille des fichiers dans la console
        .pipe(size(configSelected.size))
        // Envoie les fichiers dans le dossier 'public/js'
        .pipe(gulp.dest('public/js/'))
})

/** WATCHES **/
gulp.task('watch', () => {
    // Lance toutes les tasks gulp une première fois
    gulp.start(allTasksGulp)

    gulp.watch(watches.css.front, ['sass-front'])
    gulp.watch(watches.css.back, ['sass-back'])
    gulp.watch(watches.js.front, ['js-front'])
    gulp.watch(watches.js.back, ['js-back'])
})