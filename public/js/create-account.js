const form = document.querySelector('form')
const emailInput = document.querySelector('[name="email"]')
const usernameInput = document.querySelector('[name="username"]')
const passwordInput = document.querySelector('[name="password"]')

const handleSubmit = e => {
    e.preventDefault()
    const newUser = {
        email: emailInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
    }
    fetch('/api/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
        .then(response => console.log(response))
        .catch(err => console.log(err))
}

form.addEventListener('submit', handleSubmit)