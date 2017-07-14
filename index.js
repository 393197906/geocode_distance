/**
 * Created by mr.xie on 2017/7/13.
 */
const POOL = require('./src/db');
const ADDRESS = require('./src/address');
const LOGGER = require('./src/logger');
const CONFIG = require('./src/config');

POOL.getConnection(function (error, conn) {
    if (error) throw error;
    const countSql = 'select count(address_id) as count from ecs_user_address';
    conn.query(countSql, function (error, result1) {
        if (error) throw error;
        // const count = parseInt(result1[0].count);
        const count = 100;
        let i = 0, k = 0;
        setTimeout(function doFor() {
            const sql = `select address_id,address from  ecs_user_address order by address_id limit ${i},1`;
            conn.query(sql, function (error, result2) {
                if (error) throw error;
                const {address_id, address} = result2[0];
                ADDRESS.addressService(address, function (error, result3) {
                    if (error) {
                        LOGGER.log('info', error.message);
                        return;
                    }
                    const update = `update ecs_user_address set location = '${result3}' where address_id='${address_id}'`;
                    conn.query(update, function (error, result4) {
                        if (error) throw error;
                        if (result4) {
                            k++;
                            LOGGER.log('info', `${i}=>${address_id}=>${address}--->${result3}`);
                        }
                    })
                });
            });

            if (i < count - 1) {
                i++
            } else {
                LOGGER.log('info', `--->共${count}条数据,成功操作${k}条<---`);
                return;
            }
            setTimeout(doFor, CONFIG.http.time)
        }, CONFIG.http.time)
    });
});


