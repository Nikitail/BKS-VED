let mix = require('laravel-mix');

mix.js('src/js/app.js', 'js/app.js')
    .sass('src/sass/app.scss', 'css/app.css')
    .options({
        publicPath: 'public'
    });