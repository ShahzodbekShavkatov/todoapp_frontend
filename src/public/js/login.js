const backendApi = 'http://192.168.3.155:9009'

async function request (path, method, body) {
	const response = await fetch(backendApi + path, {
		method,
		headers: {
			'Content-Type':'application/json'
		},
		body: body ? JSON.stringify(body) : null
	})
	return await response.json()
}

let login1 = document.querySelector("#login")
let parol1 = document.querySelector("#parol")
let loginBtn = document.querySelector("#loginBtn")

async function loginCheck() {
    let data = await request('/users', 'GET')
    loginBtn.addEventListener("click", event => {
        event.preventDefault()
        console.log(login1.value)
        console.log(parol1.value)
        let user =  data.find( user => user.username == login1.value && user.parol == parol1.value) || ''

        if (user) {
            window.localStorage.setItem('userData', JSON.stringify(user.userId))
            let id = JSON.parse(window.localStorage.getItem('userData'))
            let object = {
                userId: id,
                online: true
            }
            log(object)

            login.value = null
            parol.value = null

            window.location.assign('/')
        } else {
            alert("Bunday foydalanuvchi bazada mavjud emas, iltimos registratsiyadan o'ting")
        }
    })
    
    
}

async function log(obj) {
	let data = await request('/users', 'PUT', obj)
	console.log(data.message)
}

loginCheck()
