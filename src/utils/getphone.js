const restify = require('restify');
const cheerio = require('cheerio');
const request = require('request');
const corsMiddleware = require('restify-cors-middleware');

var URI = "https://www.gsmarena.com";

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional 
    origins: ['*'],
})

// Get All Phone Brands Maker from GSM ARENA
const phoneBrands = (req, res, next) => {

    request({
        url: URI + '/makers.php3',
        headers: {
            "User-Agent": "request"
        }
    }, (error, response, html) => {
        if (!error) {
            $ = cheerio.load(html)
            let json = [];
            let brands = $('table').find('td')
            brands.each((i, el) => {
                let brand = {
                    name: $(el).find('a').text().replace(' devices', '').replace(/[0-9]/g, ""),
                    devices: $(el).find('span').text().replace(' devices', ''),
                    url: $(el).find('a').attr('href')
                }
                json.push(brand)
            })

            res.send(json);
            next();
        } else {
            res.send({
                error: "Error failed fetching source"
            })
            next()
        }
    })
};


// Get brand phone list
const phoneBrand = (req, res, next) => {
    request({
        url: URI + '/' + req.params.id,
        headers: {
            "User-Agent": "request"
        }
    }, (error, response, html) => {
        if (!error) {
            $ = cheerio.load(html)
            let json = [];

            // Get all list phone
            let phones = $('.makers').find('li')
            phones.each((i, el) => {
                let phone = {
                    name: $(el).find('span').text(),
                    img: $(el).find('img').attr('src'),
                    url: $(el).find('a').attr('href'),
                    description: $(el).find('img').attr('title')
                }
                json.push(phone)
            })

            // get next and prev page link
            let nextPage = $('a.pages-next').attr('href');
            let prevPage = $('a.pages-prev').attr('href');

            let data = {
                data: json,
                next: nextPage,
                prev: prevPage
            }

            res.send(data);
            next();
        } else {
            res.send({
                error: "Error failed fetching source"
            })
            next()
        }
    })
};


// Get phone detail
const phoneDetail = (req, res, next) => {
    request({
        url: URI + '/' + req.params.phone,
        headers: {
            "User-Agent": "request"
        }
    }, function (error, response, html) {
        if (!error) {
            $ = cheerio.load(html)
            let json = [];

            // Get phone detail
            let display_size = $('span[data-spec=displaysize-hl]').text();
            let display_res = $('div[data-spec=displayres-hl]').text();
            let camera_pixels = $('.accent-camera').text();
            let video_pixels = $('div[data-spec=videopixels-hl]').text();
            let ram_size = $('.accent-expansion').text();
            let chipset = $('div[data-spec=chipset-hl]').text();
            let battery_size = $('.accent-battery').text();
            let battery_type = $('div[data-spec=battype-hl]').text();

            let quick_spec = {
                display_size: display_size,
                display_res: display_res,
                camera_pixels: camera_pixels,
                video_pixels: video_pixels,
                ram_size: ram_size,
                chipset: chipset,
                battery_size: battery_size,
                battery_type: battery_type
            }

            let title = $('.specs-phone-name-title').text();
            let img = $('.specs-photo-main a img').attr('src');
            let img_url = $('.specs-photo-main a').attr('href');

            let specNode = $('table')
            let spec_detail = []
            specNode.each((i, el) => {
                let specList = []
                let category = $(el).find('th').text();
                let specN = $(el).find('tr')
                specN.each((index, ele) => {
                    let a = {
                        name: $('td.ttl', ele).text(),
                        value: $('td.nfo', ele).text()
                    }
                    specList.push(a)
                });

                spec_detail.push({
                    category: category,
                    specs: specList
                })
            });

            // get next and prev page link


            data = {
                title: title,
                img: img,
                img_url: img_url,
                spec_detail: spec_detail,
                quick_spec: quick_spec
            }

            res.send(data);
            next();
        } else {
            res.send({
                error: "Error failed fetching source"
            })
            next()
        }
    })
};


// search for phone
const phoneSearch = (req, res, next) => {
    request({
        url: URI + '/results.php3?sQuickSearch=yes&sName=' + req.params.phone,
        headers: {
            "User-Agent": "request"
        }
    }, (error, response, html) => {
        if (!error) {
            $ = cheerio.load(html)
            let json = [];

            // Get all list phone
            let phones = $('.makers').find('li')
            phones.each((i, el) => {
                let phone = {
                    name: $(el).find('span').html().split('<br>').join(' '),
                    img: $(el).find('img').attr('src'),
                    url: $(el).find('a').attr('href'),
                    description: $(el).find('img').attr('title')
                }
                json.push(phone)
            })


            res.send(json);
            next();
        } else {
            res.send({
                error: "Error failed fetching source"
            })
            next()
        }
    })
};


// Get all reviews
const phoneReviews = (req, res, next) => {
    request({
        url: URI + '/reviews.php3',
        headers: {
            "User-Agent": "request"
        }
    }, (error, response, html) => {
        if (!error) {
            $ = cheerio.load(html)
            let json = [];

            // Get all list phone
            let reviews = $('.review-item')
            reviews.each((i, el) => {
                let review = {
                    title: $(el).find('.review-item-title').text(),
                    img: $(el).find('img').attr('src'),
                    url: $(el).find('a').attr('href'),
                    time: $(el).find('.meta-item-time').text()
                }
                json.push(review)
            })


            // get next and prev page link
            let nextPage = $('a.pages-next').attr('href');
            let prevPage = $('a.pages-prev').attr('href');

            data = {
                data: json,
                next: nextPage,
                prev: prevPage
            }

            res.send(data);
            next();
        } else {
            res.send({
                error: "Error failed fetching source"
            })
            next()
        }
    })
};

const phoneReview = (req, res, next) => {
    request({
        url: URI + '/' + req.params.url,
        headers: {
            "User-Agent": "request"
        }
    }, (error, response, html) => {
        if (!error) {
            $ = cheerio.load(html)
            let json = [];

            // Get all list phone
            let date = $('.dtreviewed').text();
            let reviewer = $('.reviewer').text();
            let title = $('.article-info-name').text();
            let review = $('#review-body').html()
            // get next and prev page link
            let nextPage = $('a.pages-next').attr('href');
            let prevPage = $('a.pages-prev').attr('href');

            let data = {
                date: date,
                reviewer: reviewer,
                review: review,
                title: title,
                next: nextPage,
                prev: prevPage
            }
            res.send(data);
            next();
        } else {
            res.send({
                error: "Error failed fetching source"
            })
            next()
        }
    })
};




var server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);

server.get('/gsmarena/brands', phoneBrands);
server.head('/gsmarena/brands', phoneBrands);

server.get('/gsmarena/brand/:id', phoneBrand);
server.head('/gsmarena/brand/:id', phoneBrand);

server.get('/gsmarena/phone/:phone', phoneDetail);
server.head('/gsmarena/phone/:phone', phoneDetail);

server.get('/gsmarena/search/phone/:phone', phoneSearch);
server.head('/gsmarena/search/phone/:phone', phoneSearch);

server.get('/gsmarena/reviews', phoneReviews);
server.head('/gsmarena/reviews', phoneReviews);

server.get('/gsmarena/review/:url', phoneReview);
server.head('/gsmarena/review/:url', phoneReview);



server.listen(8888, function () {
    console.log('GSMArena API running at http://localhost:8888.');
});

module.exports = {
    phoneBrands,
    phoneBrand,
    phoneDetail,
    phoneSearch,
    phoneReviews,
    phoneReview
}