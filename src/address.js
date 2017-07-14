/**
 * Created by mr.xie on 2017/7/13.
 */
/**
 * Created by mr.xie on 2017/7/13.
 */
const axios = require('axios');
const config = require('./config');

function getAddress(address, callback) {
    axios.get(config.http.geocode.url, {
        params: {
            address,
            key: config.http.key,
            city: config.http.geocode.params.city
        }
    }).then(function ({data}) {
        if (parseInt(data.status)) {
            if (!data.geocodes.length) {
                callback(new Error('地理编码api无法匹配'));
                return;
            }
            const location = data.geocodes.map(function (item) {
                return `${item.location}@@${item.formatted_address}`;
            }).join('||');
            callback(undefined, location);
        } else {
            callback(new Error(data.info));
        }
    }).catch(function (error) {
        callback(error);
    })
}

function getDistance(destination, callback) {
    axios.get(config.http.distance.url, {
        params: {
            destination,
            key: config.http.key,
            origins: config.http.distance.params.origins,
            type: config.http.distance.params.type
        }
    }).then(function ({data}) {
        if (parseInt(data.status)) {
            if (!data.results.length) {
                callback(new Error('距离api无法匹配'));
                return;
            }
            const result = data.results.map(function (item) {
                if (item.code) {
                    return `(${item.code}->${item.info})`;
                }
                return `${item.distance}@@${item.duration}`;
            }).join('||');
            callback(undefined, result);
        } else {
            callback(new Error(data.info));
        }
    }).catch(function (error) {
        callback(error);
    })
}

function addressService(address, callback) {
    getAddress(address, function (error, location) {
        if (error) {
            callback(error);
            return;
        }
        const locationResult = location.split('||')[0];
        let location_location = locationResult.split('@@')[0];
        getDistance(location_location, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            callback(undefined, `${locationResult}@@${result}`)
        })
    })
}


module.exports = {
    getAddress,
    getDistance,
    addressService
};




