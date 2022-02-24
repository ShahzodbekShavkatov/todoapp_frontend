const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 9099

const app  = express()

app.use(express.static(path.join(__dirname, 'public') ))

app.get('/' , (req,res) => res.sendFile(path.join(__dirname, 'views' , 'home.html')))
app.get('/login' , (req,res) => res.sendFile(path.join(__dirname, 'views' , 'login.html')))
app.get('/register' , (req,res) => res.sendFile(path.join(__dirname, 'views' , 'register.html')))
app.get('/todoappend' , (req,res) => res.sendFile(path.join(__dirname, 'views' , 'todo_append.html')))

app.listen(PORT, () => console.log('Client server is running on http://192.168.3.155:' + PORT))



























