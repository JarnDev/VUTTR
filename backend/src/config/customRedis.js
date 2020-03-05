var useCache = true
const redis = require("redis");
const redisClient = redis.createClient();
const { promisify } = require("util");
var getAsync = promisify(redisClient.get).bind(redisClient);
var clearAsync = promisify(redisClient.flushall).bind(redisClient);

redisClient.on('error', function (err) {
    console.log('Redis error: ' + err);
    useCache = false
    if (err.code === "ECONNREFUSED") { redisQuit(); }
});

function redisQuit() {
    redisClient.quit();
}

async function get(key) {
    return useCache ? JSON.parse(await getAsync(JSON.stringify(key))) : null
}

function set(key, value) {
    return useCache ? redisClient.set(JSON.stringify(key), JSON.stringify(value)) : null

}

async function clearAll() {
    return useCache ? await clearAsync() : null
}

module.exports = {
    get,
    set,
    clearAll
}
