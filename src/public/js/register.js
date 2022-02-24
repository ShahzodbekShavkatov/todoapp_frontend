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

let login = document.querySelector("#login1")
let parol = document.querySelector("#parol1")
let select = document.querySelector("#select")
let birthday = document.querySelector("#birthday")
let loginBtn = document.querySelector("#loginBtn")

async function registration() {
    let data = await request('/users', 'GET')
    loginBtn.addEventListener("click", event => {
        event.preventDefault()
    
        if(login.value.length > 20) return alert("Login 20 tadan kam belgi bo'lishi kerak")
        if( !(parolCheck(parol.value) == true) && !(parol.value.length >= 8)) return alert("Paroldagi belgilar soni 8 tadan kam bo'lmasligi, unda belgilar, katta va kichik harflar hamda sonlar qatnashishi shart!")
        
        data.forEach( user => {
            if(user.username == login.value) return 
        })
        let userObj = {
            username: login.value,
            parol: parol.value,
            gender: select.value,
            birthday: birthday.value
        }
        post(userObj)
    })
}

async function post(obj) {
    let postData = await request('/register', 'POST', obj)
    alert(postData.message)
    console.log(login.value)
    if (postData.message == 'OK') {
        let userid = 0
        let data = await request('/users', 'GET')
        data.forEach( user => {
            if (user.username == login.value) {
                console.log(user.userId)
                userid = user.userId
            }
        })
        window.localStorage.setItem('userData', JSON.stringify(userid))
        login.value = null
        parol.value = null
        select.value = null
        birthday.value = null
        window.location = '/'
    }

}

function parolCheck(pass) {
    let count = 0
    let  result = 0
    for (let i of pass) {
        if (i.match(/[a-z]/)) count++
    }
    if (count > 0) {
        result++
        count = 0
    }
    for (let i of pass) {
        if (i.match(/[A-Z]/)) count++
    }
    if (count > 0) {
        result++
        count = 0
    }
    for (let i of pass) {
        if (i.match(/[0-9]/)) count++
    }
    if (count > 0) {
        result++
        count = 0
    }
    for (let i of pass) {
        if (i.match(/[!,@,#,$,%,&,*]/)) count++
    }
    if (count > 0) {
        result++
        count = 0
    }
    if (result >= 4) return true
    else return false
}

registration()
