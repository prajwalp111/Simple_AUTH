const express = require('express');
const app = express();
const User = require('./models/user')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const session = require('express-session')

app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/Auth-demo')
    .then(()=>{
        console.log('database connected successfuly')
    })
    .catch((err)=>{
        console.log(`couldn't connect  to db`)
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({secret: 'this is no longer a secrete',  resave: false,
  saveUninitialized: false}))

const requireLogin = (req, res, next)=>{
    if(!req.session.user._id){
        return res.redirect('/login')
    }
    next()
}

app.get('/', (req, res)=>{
    res.send('welcome to home page')
})

app.get('/register', (req, res)=>{
    res.render('register')
})

app.post('/register', async(req, res)=>{
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    // const user = new User({
    //     username,
    //     password : hash
    // })
    const user = new User({  username, password })
    await user.save()
    req.session.user_id = user._id;
    res.redirect('/')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', async(req, res)=>{
    const { username, password } = req.body;
    // const user = await User.findOne({username});
    // const validPass = await bcrypt.compare(password, user.password)
    // if(validPass){
    //     req.session.user_id = user._id
    //     res.redirect('/secret');
    // }                                             code shortend
    const foundUser = await User.findandValidate(username, password)
    if(foundUser){
        req.session.user_id = foundUser._id
        res.redirect('/secret');
    }
    else(
        res.redirect('/login')
    )
})

app.get('/secret', (req, res)=>{
    res.render('secret')
})

app.post('/logout', async(req ,res)=>{
   // req.session.user_id = null;  -> only for one attribute
    req.session.destroy();  // when multiple attribute in  session
    res.redirect('/login')
})

app.listen(3333, ()=>{
    console.log('the app is live on port 3333')
})