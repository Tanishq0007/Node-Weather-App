const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express config
const public = path.join(__dirname, '../public')
const viwesPaths = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handel bar engine and views location
app.set('view engine','hbs')
app.set('views',viwesPaths)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wheather',
        name: 'Tanishq'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Tanishq'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tanishq'
    })
})

app.get('/wheather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Provide a Location'
        })
    }

    geocode(req.query.address, (error, { lattitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({error})
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
      })
    
    })
})

app.get('/help/*', (req,res) => {
    res.render('Error',{
        name: 'Help article not fuond'
    })
})

app.get('*', (req,res) => {
    res.render('Error', {
        name: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})