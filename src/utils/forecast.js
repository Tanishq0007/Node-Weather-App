const request = require('request')

const forecast = ( longitude , lattitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0f174a7cfcff8402d40856f2c8b65dc6&query='+ lattitude +','+ longitude

    request({ url, json: true} , (error, { body }) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback( undefined, 'current tempreature is:' + body.current.temperature + ' and the tempreature feels like: ' + body.current.feelslike + ' and the time is: ' + body.current.observation_time)
        }
    })
}

module.exports = forecast