

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    // form input value
    const location = search.value

    messageOne.textContent= 'Loading...' // clear output message
    messageTwo.textContent= '' // clear output message

    fetch('/weather?address=' + location).then((response)=>{

       
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

        })
    })
})