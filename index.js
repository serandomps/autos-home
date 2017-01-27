var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');

require('gallery');

dust.loadSource(dust.compile(require('./template'), 'autos-home'));

module.exports = function (sandbox, fn, options) {
    var ads = {
      photos: [
          {url: 'https://d1vda6a1j3uyzl.cloudfront.net/images/800x450/cc1a7057-cbac-4f1d-9eb2-6c92a8ebb012'},
          {url: 'https://d1vda6a1j3uyzl.cloudfront.net/images/800x450/c8c0e590-f49b-4283-9de0-7f91d9bc5197'}
      ]
    };
    dust.render('autos-home', ads, function (err, out) {
        sandbox.append(out);
        if (!fn) {
            return fn(true, serand.none);
        }
        fn(false, {
            clean: function () {
                $('.autos-home', sandbox).remove();
            },
            done: function () {
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
