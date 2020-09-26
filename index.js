const express = require('express')
const dataService =require('./dataservice/data.service')
const session =require('express-session');//we installed and required
const app =express();

app.use(express.json())

app.use(session({
    secret : 'randomsecurestring',//create id for session..but using this it will verify,secure thing..if it leakes ohers can acess data
    resave :false,//it will save only if we modify
    saveUninitialized:false
}))

const logMiddleware=(req,res,next)=>{
    console.log(req.body)
    next();
};

app.use(logMiddleware);

const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
        return res.json({
          status:false,
          statusCode :401,
          message:'please login'
        })
      }else{
          next();
      }

}

app.post('/login',(req,res)=>{
    
const result=dataService.login(req,req.body.acno,req.body.password)



res.status(result.statusCode).json(result);
})

app.post('/deposit',authMiddleware,(req,res)=>{
   
const result=dataService.deposit(req.body.acno,req.body.pin,req.body.amount1)
res.status(result.statusCode).json(result);
})

app.post('/register',(req,res)=>{
    const result=dataService.register(req.body.name,req.body.acno,req.body.pin,req.body.password)
    res.status(result.statusCode).json(result);
    })

app.post('/withdraw',authMiddleware,(req,res)=>{
const result=dataService.withdraw(req.body.acno,req.body.pin,req.body.amount1)
res.status(result.statusCode).json(result);
})

app.get('/transactions',authMiddleware,(req,res)=>{
    const result=dataService.getTransactions(req)
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