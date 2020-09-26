const express = require('express')
const dataService =require('./dataservice/data.service')
// const session =require('express-session')
const app =express();

app.use(express.json())

// app.use(session({
//     secret : 'randomsecurestring',//create id for session..bus using this it will verify,secure thing..if it leakes ohers can acess data
//     resave :false,//it will save only if we modify
//     saveUninitialized:false
// }))

app.post('/login',(req,res)=>{
    
const result=dataService.login(req.body.acno,req.body.password)


res.status(result.statusCode).json(result);
})

app.post('/deposit',(req,res)=>{
   
const result=dataService.deposit(req.body.acno,req.body.pin,req.body.amount1)
res.status(result.statusCode).json(result);
})

app.post('/register',(req,res)=>{
    const result=dataService.register(req.body.name,req.body.acno,req.body.pin,req.body.password)
    res.status(result.statusCode).json(result);
    })

app.post('/withdraw',(req,res)=>{
const result=dataService.withdraw(req.body.acno,req.body.pin,req.body.amount1)
res.status(result.statusCode).json(result);
})

app.get('/transactions',(req,res)=>{
    const result=dataService.getTransactions()
    res.status(200
        ).json(result);
    })





app.patch('/',(req,res)=>
res.send("patch method"))

app.put('/',(req,res)=>
res.send("patch method"))

app.delete('/',(req,res)=>
res.send("patch method"))

app.listen(3000,()=>{
    console.log("server started at port 3000");//it will displayed on command prompt
})