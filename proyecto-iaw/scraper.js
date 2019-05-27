const fetch = require('node-fetch');
const cheerio = require('cheerio');

//const phonesUrl = 'https://celulares.mercadolibre.com.ar/';
const phonesUrl = 'https://celulares.mercadolibre.com.ar/_Desde_451';
const detailsUrl = 'https://articulo.mercadolibre.com.ar/';

const phonesCache = {};
const detailsCache = {};

function searchPhones() {
    if (phonesCache[phonesUrl])
    {
        return Promise.resolve(phonesCache[phonesUrl]);
    }

    return fetch(`${phonesUrl}`)
        .then(response => response.text())
        .then(body => {

            const phones = [];
            const $ = cheerio.load(body);
    
            $('.results-item').each(function(i, element) {
    
                const $element = $(element);
                const $id = $element.find('div.rowItem').attr('id');
                
                const $aux = $element.find('div a img').attr('data-src');
                const $img = ($aux != null) ? $aux : $element.find('div a img').attr('src');

                const $title = $element.find('span.main-title').text().trim();
                const $price = parseInt($element.find('span.price__fraction').text().trim().replace(".", ""));
                const $link = $element.find('div.images-viewer').attr('item-url').slice(37);
    
                const phone = {
                    id: $id,
                    title: $title,
                    img: $img,
                    price: $price,
                    link: $link,
                    inCart: false,
                    count: 0,
                    total: 0
                };
    
                phones.push(phone);    
            });

            phonesCache[phonesUrl] = phones;

            return phones;
        });
}

function searchPhoneDetails(id) {
    if (detailsCache[id])
    {
        return Promise.resolve(detailsCache[id]);
    }

    return fetch(`${detailsUrl}${id}`)
        .then(response => response.text())
        .then(body => {

            const $ = cheerio.load(body);
            
            const $title = $('h1.item-title__primary').text().trim();
            const $img = $('figure a img').attr('src');
            const $info = $('li.specs-item').text();

            const details = {
                info: $info,
                title: $title,
                img: $img
            };  

            detailsCache[id] = details;
            
            return details;
        });
}

module.exports = {
    searchPhones,
    searchPhoneDetails
};
    