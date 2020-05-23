const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    fetch('/wheather?address='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = 'Location Not Found!! Try Again'
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
    console.log(location) 
})