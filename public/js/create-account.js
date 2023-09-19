const form = document.querySelector('form')
const emailInput = document.querySelector('[name="email"]')
const usernameInput = document.querySelector('[name="username"]')
const passwordInput = document.querySelector('[name="password"]')
const confirmPasswordInput = document.querySelector('[name="confirmPassword"]')

const handleSubmit = e => {
    e.preventDefault()
    console.log(passwordInput.value, confirmPasswordInput.value)
    if (passwordInput.value !== confirmPasswordInput.value){
        alert('passwords must match')
        return
    }
    const newUser = {
        email: emailInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
    }

    //console.log(JSON.stringify(newUser))
    fetch('/api/users/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
        .then(response => {
            console.log(response)
            if (response.ok){
                document.location.replace('/login');
            }
        })
        .catch(err => console.log(err))
}

form.addEventListener('submit', handleSubmit)