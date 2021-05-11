const express = require('express')

const app = express()

const port = 3000
// 引入 express-handlebars
const exphbs = require('express-handlebars')

// 引入 seed.js
const data = require('./models/seed')
// 引入 body-parser
const bodyParser = require('body-parser')


// 設定使用 handlebars 網頁模板
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態目錄
app.use(express.static('public'))

// 設定 body-parser
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  console.log(req.body)
  const user = req.body
  const error = `Username or Password Error!!!`
  let loginFlag = false
  for (let i = 0; i < data.length; i++) {

    if ((data[i].email === user.email) && (data[i].password === user.password)) {
      console.log('帳號密碼驗證通過!!! 跳往歡迎頁面...')
      loginFlag = true
      res.render('loginPrompt', { user: data[i] })
    }

  }
  if (!loginFlag) {
    console.log('驗證不通過, 回傳登入頁')
    res.render('index', { error: error })
  }

})

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})