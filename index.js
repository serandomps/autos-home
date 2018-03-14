var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');

require('gallery');

dust.loadSource(dust.compile(require('./template'), 'autos-home'));

module.exports = function (sandbox, fn, options) {
    var ads = {
      photos: [
          {url: 'https://d1vda6a1j3uyzl.cloudfront.net/images/800x450/53699c34-67c1-4f69-957a-6706ddc4d2fc'},
          {url: 'https://d1vda6a1j3uyzl.cloudfront.net/images/800x450/622a1155-f2d5-45ed-bad5-c45d55cd7ca6'},
          {url: 'https://d1vda6a1j3uyzl.cloudfront.net/images/800x450/2b24f696-a85b-4c17-b7f7-5e09b58b2128'},
          {url: 'https://d1vda6a1j3uyzl.cloudfront.net/images/800x450/261be366-1ef6-4c3d-8efe-fe593148722c'}
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
