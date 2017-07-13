/**
 * Created by mr.xie on 2017/7/13.
 */
/**
 * Created by mr.xie on 2017/7/13.
 */
const axios = require('axios');
const config = require('./config');

function getAddress(address, callback) {
    axios.get(config.http.url, {
        params: {
            address,
            key: config.http.params.key,
            city: config.http.params.city
        }
    }).then(function ({data}) {
        if (parseInt(data.status)) {
            if (!data.geocodes.length) {
                callback(new Error('api无法匹配'));
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

module.exports = getAddress;




