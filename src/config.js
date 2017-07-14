/**
 * Created by mr.xie on 2017/7/13.
 */
module.exports = {
    db: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'qdm133335490_db',
        port: 3306
    },
    http: {
        key: '5df084993e8dbaed82a526f971645956',
        geocode: {
            url: 'http://restapi.amap.com/v3/geocode/geo',
            params: {
                city: '菏泽',
            },
        },
        distance: {
            url: 'http://restapi.amap.com/v3/distance',
            params: {
                origins: '115.502378,35.218897', //秉德坐标
                type: 1      //0直线距离1驾车距离2公交规划距离3步行规划距离（限5公里内）
            },
        },
        time: 20  //每次请求间隔时间，防api炸
    }
};