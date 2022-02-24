const backendApi = 'http://192.168.3.155:9009'

const users = document.querySelector(".users")
const todo_append_btn = document.querySelector(".todo_append")
todo_append_btn.setAttribute('disabled', 'disabled')
const log_out_btn = document.querySelector(".log_out_btn")
log_out_btn.setAttribute('disabled', 'disabled')
let first_ul = document.querySelector(".first_ul")

let liTodoTrue = document.querySelector(".todoTrue")
let second_ul = document.querySelector(".second_ul")

let liDoingTrue = document.querySelector(".doingTrue")
let middileUl = document.querySelector(".middileUl")

let liDoneTrue = document.querySelector(".doneTrue")
let ulli = document.querySelector(".ulli")

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

async function renderDatas () {
    let data = await request('/users', 'GET')
	users.innerHTML = null
	users.innerHTML = `<h1 class="user_text">Users</h1>`
    data.forEach( user => {
		let h2U = document.createElement("h2")
		h2U.setAttribute("class", "user_name")
		if (user.online == true) {
			h2U.textContent = user.username
			users.append(h2U)
		}
	})
	let h2s = document.querySelectorAll(".user_name")
	let userTodos = await request('/todos', 'GET')
	h2s.forEach( h2 => {
		h2.addEventListener("click", event => {
			// event.preventDefault()
			users.innerHTML = null
			users.innerHTML = `<h1 class="user_text">Users</h1>`
			second_ul.innerHTML = null
			middileUl.innerHTML = null
			ulli.innerHTML = null
			first_ul.innerHTML = null
			renderDatas()

			let li1 = document.createElement("li")
			li1.setAttribute("class", "todo_li")
			let p1 = document.createElement("p")
			p1.textContent = "-----------------------------------------------------------"
			li1.append(p1)
			second_ul.append(li1)

			let li2 = document.createElement("li")
			li2.setAttribute("class", "todo_li")
			let p2 = document.createElement("p")
			p2.textContent = "-----------------------------------------------------------"
			li2.append(p2)
			middileUl.append(li2)

			let li3 = document.createElement("li")
			li3.setAttribute("class", "todo_li")
			let p3 = document.createElement("p")
			p3.textContent = "-----------------------------------------------------------"
			li3.append(p3)
			ulli.append(li3)

			first_ul.append(second_ul)
			first_ul.append(middileUl)
			first_ul.append(ulli)


			let userData = data.find( user => user.username == h2.textContent)
			userTodos.forEach( todo => {
				if (todo) {
					todo_append_btn.removeAttribute('disabled', 'disabled')
					log_out_btn.removeAttribute('disabled', 'disabled')
				} 
				if (todo.userId == userData.userId) {
					let id = JSON.parse(window.localStorage.getItem('userData'))
					if (id !== userData.userId) {
						todo_append_btn.setAttribute('disabled', 'disabled')
						log_out_btn.setAttribute('disabled', 'disabled')
					} else {
						todo_append_btn.removeAttribute('disabled', 'disabled')
						log_out_btn.removeAttribute('disabled', 'disabled')
					}
					todo.todos.forEach(array => {
						if (array.todo === true) {
							let todo_li = document.createElement('li')
							todo_li.setAttribute("class", "todo_li")
							let h2 = document.createElement("h2")
							let p = document.createElement('p')
							let select = document.createElement("select")
							select.setAttribute("class", "select_todo")
							let option1 = document.createElement("option")
							option1.value = 'todo'
							option1.textContent = 'Todo'
							let option2 = document.createElement("option")
							option2.value = 'doing'
							option2.textContent = 'Doing'
							let option3 = document.createElement("option")
							option3.value = 'done'
							option3.textContent = 'Done'
							h2.textContent = array.title
							p.textContent = array.text

							select.append(option1)
							select.append(option2)
							select.append(option3)

							todo_li.append(h2)
							todo_li.append(p)
							todo_li.append(select)

							second_ul.append(todo_li)
							liTodoTrue.append(second_ul)
							first_ul.append(liTodoTrue)

							if (id !== userData.userId) {
								select.setAttribute('disabled', 'disabled')
							} else {
								select.removeAttribute('disabled', 'disabled')
							}

							todo_li.onchange = () => {
								putTodo(select.value, array.todoId)
							}
						}
					})
					
					todo.todos.forEach( array => {
						if (array.doing === true) {
							let todo_li = document.createElement('li')
							todo_li.setAttribute("class", "todo_li")
							let h2 = document.createElement("h2")
							let p = document.createElement('p')
							let select = document.createElement("select")
							select.setAttribute("class", "select_todo")
							let option1 = document.createElement("option")
							option1.value = 'todo'
							option1.textContent = 'Todo'
							let option2 = document.createElement("option")
							option2.value = 'doing'
							option2.textContent = 'Doing'
							let option3 = document.createElement("option")
							option3.value = 'done'
							option3.textContent = 'Done'
							h2.textContent = array.title
							p.textContent = array.text

							select.append(option2)
							select.append(option1)
							select.append(option3)

							todo_li.append(h2)
							todo_li.append(p)
							todo_li.append(select)

							middileUl.append(todo_li)
							liDoingTrue.append(middileUl)
							first_ul.append(liDoingTrue)

							if (id !== userData.userId) {
								select.setAttribute('disabled', 'disabled')
							} else {
								select.removeAttribute('disabled', 'disabled')
							}

							todo_li.onchange = () => {
								putTodo(select.value, array.todoId)
							}
						}
					})

					todo.todos.forEach( array => {
						if (array.done === true) {
							let todo_li = document.createElement('li')
							todo_li.setAttribute("class", "todo_li")
							let h2 = document.createElement("h2")
							let p = document.createElement('p')
							let select = document.createElement("select")
							select.setAttribute("class", "select_todo")
							let option1 = document.createElement("option")
							option1.value = 'todo'
							option1.textContent = 'Todo'
							let option2 = document.createElement("option")
							option2.value = 'doing'
							option2.textContent = 'Doing'
							let option3 = document.createElement("option")
							option3.value = 'done'
							option3.textContent = 'Done'
							h2.textContent = array.title
							p.textContent = array.text

							select.append(option3)
							select.append(option1)
							select.append(option2)

							todo_li.append(h2)
							todo_li.append(p)
							todo_li.append(select)

							ulli.append(todo_li)
							liDoneTrue.append(ulli)
							first_ul.append(liDoneTrue)

							if (id !== userData.userId) {
								select.setAttribute('disabled', 'disabled')
							} else {
								select.removeAttribute('disabled', 'disabled')
							}

							todo_li.onchange = () => {
								putTodo(select.value, array.todoId)
							}
						}
					})
				}
			})
		})
	})
}


async function putTodo(select, idTodo) {
	let userIdp = JSON.parse( window.localStorage.getItem('userData') )
	let todo = ''
	let doing = ''
	let done = ''
	if (select == 'todo') {
		todo = true,
		doing = false,
		done = false
	} else if (select == 'doing') {
		todo = false,
		doing = true,
		done = false
	} else if (select == 'done') {
		todo = false,
		doing = false,
		done = true
	}
	let obj = {
		userId: userIdp,
		todoId: idTodo,
		todo: todo,
		doing: doing,
		done: done
	}
	// console.log(obj)
	let data = await request('/todos', 'PUT', obj)
	console.log(data.message)
	// renderDatas()
}


todo_append_btn.addEventListener("click", event => {
	event.preventDefault()
	window.location = '/todoappend'
})

log_out_btn.addEventListener("click", event => {
	event.preventDefault()
	let id = JSON.parse(window.localStorage.getItem('userData'))
	let object = {
		userId: id,
		online: false
	}
	logOut(object)
})

async function logOut(obj) {
	let data = await request('/users', 'PUT', obj)
	console.log('hello')
	console.log(data.message)
	window.localStorage.setItem('userData', '')
	window.location = '/'
}

renderDatas()
