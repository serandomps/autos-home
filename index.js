var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');

require('gallery');

dust.loadSource(dust.compile(require('./template'), 'autos-home'));

module.exports = function (ctx, sandbox, options, done) {
    var ads = {
      photos: [
          {url: 'https://d1kdoh4oxh2joj.cloudfront.net/images/800x450/5bd9329d809eef31d6e1e619'},
          {url: 'https://d1kdoh4oxh2joj.cloudfront.net/images/800x450/5bd9329d809eef31d6e1e618'}
      ]
    };
    dust.render('autos-home', ads, function (err, out) {
        if (err) {
            return done(err);
        }
        sandbox.append(out);
        done(null, {
            clean: function () {
                $('.autos-home', sandbox).remove();
            },
            ready: function () {
                var i;
                var o = [];
                var photos = ads.photos;
                var length = photos.length;
                var photo;
                for (i = 0; i < length; i++) {
                    photo = photos[i];
                    o.push({
                        href: photo.url
                    });
                }
                blueimp.Gallery(o, {
                    container: $('.blueimp-gallery-carousel', sandbox),
                    carousel: true,
                    stretchImages: true
                });
            }
        });
    });
};
