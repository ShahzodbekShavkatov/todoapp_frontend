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

let input_title = document.querySelector(".input_title")
let input_todo = document.querySelector(".input_todo")
let Append = document.querySelector("button")

let id = JSON.parse(window.localStorage.getItem('userData'))

Append.addEventListener("click", event => {
    event.preventDefault()
    let obj = {
        userId: id,
        title: input_title.value,
        text: input_todo.value
    }
    console.log(obj)
    postTodo(obj)
    input_title.value = null
    input_todo.value = null
})

async function postTodo(todo) {
    let data = await request('/todos', 'POST', todo)
}
