// const { User } = require("./db");
const db = require("./db");

accountDetails = {
  1001: { name: "user1", acno: 1001, pin: 4387, password: "userone", balance: 3000, transactions: [] },
  1002: { name: "user2", acno: 1002, pin: 4388, password: "usertwo", balance: 4000, transactions: [] },
  1003: { name: "user3", acno: 1003, pin: 4287, password: "userthree", balance: 2000, transactions: [] },
  1004: { name: "user4", acno: 1004, pin: 1388, password: "userfour", balance: 1000, transactions: [] },
  1005: { name: "user5", acno: 1005, pin: 1318, password: "userfive", balance: 1500, transactions: [] }



}

let currentUser;


const register = (name, acno, pin, password) => {
  return db.User.findOne({
    acno:acno
  })
    .then(user => {

      if (user) {
        return {
          status: false,
          statusCode: 422,
          message: "account already exists,please login"
        }
      }
      const newUser = new db.User({
        name,
        acno,
        pin,
        password,
        balance: 0,
        transactions: []
      });

      newUser.save();

      return {
        status: true,
        statusCode: 200,
        message: "account registered successfully.please login"
      }

    })
  // if (acno in accountDetails) {
  //     return {
  //         status: false,
  //         statusCode:422,
  //         message: "account already exists"
  //     }

  // }




  // accountDetails[acno] = {
  //     name,
  //     acno,
  //     password,
  //     pin,
  //     balance: 0,
  //     Transactions: []
  // }
  // // console.log(this.accountDetails)
  // // this.saveDetails();
  // return {
  //     status: true,
  //     statusCode:200,
  //     message: "account registered successfully.please login"
  // }
}

const login = (req, acno, password) => {
  var acno = parseInt(acno);

  return db.User.findOne({
    acno:acno,
    
    
    password
  })
    .then(user => {

      if (user) {
        req.session.currentUser =acno;
        return {
          status: true,
          statusCode: 200,
          message: "logged in"
        }
      }
      return {
        status: false,
        statusCode: 422,
        message: "invalid credentials"
      }
    })


      // console.log(acno, password)

      // console.log(accountDetails);
      // var data = accountDetails;
      // if (acno1 in data) {
      //   var pwd = data[acno].password
      //   if (pwd == password) {

      //     req.session.currentUser = data[acno];
      //     // this.saveDetails();
      //     return {
      //       status: true,
      //       statusCode: 200,
      //       message: "login successfully"
      //     }
      //   }
      // }
      // return {
      //   status: false,
      //   statusCode: 422,
      //   message: "invalid credentials"
      // }
    }

const deposit = (acno, pin, amount1) => {

  return db.User.findOne({
    acno,
    pin,
    amount:amount1
  })
    .then(user => {

      if (!user) {
        return {
          status: false,
          statusCode: 422,
          message: "incorrect account details"
        }
      }

      user.balance+=parseInt(amount1)
      user.transactions.push({
        amount:amount1,
        typeOfTransaction:'credit'
       


      })
      user.save();
  

      return {
        status: true,
        statusCode: 200,
        message: "account has been credited",
        balance:user.balance
      }

    })


    // var amount = parseInt(amount1)
    // var data = accountDetails;
    // if (acno in data) {
    //   let mpin = data[acno].pin

    //   if (pin == mpin) {
    //     data[acno].balance += amount;
    //     data[acno].transactions.push({

    //       amount: amount,
    //       type: 'credit',
    //       id: Math.floor(Math.random() * 10000)
    //     })

    //     // this.saveDetails();
    //     return {
    //       status: true,
    //       statusCode: 200,
    //       message: 'account has been credited',
    //       balance: data[acno].balance
    //     }

    //   }

    //   return {
    //     status: false,
    //     statusCode: 422,
    //     message: 'incorrect account details'

    //   }

    // }


  }

  const withdraw = (acno, pin, amount1) => {
    return db.User.findOne({
      acno,
      pin,
      amount:amount1
    })
      .then(user => {
  
        if (!user) {
          return {
            status: false,
            statusCode: 422,
            message: "incorrect account details"
          }
        }

        if(user.balance<parseInt(amount1)){
          return{
            status:false,
            statusCode:422,
            message:'insufficient balance',
            balance:user.balance
          }
        }
  
        user.balance-=parseInt(amount1)
        user.transactions.push({
          amount:amount1,
          typeOfTransaction:'debit'
          
  
  
        })
        user.save();
    
  
        return {
          status: true,
          statusCode: 200,
          message: "account has been debited",
          balance:user.balance

        }
  
      })


  }


  const getTransactions = (req) => {
    return db.User.findOne({
      acno:req.session.currentUser
    })
    .then(user=>{
      if(user){
        return user.transactions;
      }
    })
    
    // return accountDetails[req.session.currentUser.acno].transactions
  }

  const deleteTransaction = (req, id) => {
    return db.User.findOne({
      acno:req.session.currentUser
    })
    .then(user=>{
      user.transactions = user.transactions.filter(t=>{
        if(t._id==id){
          return false;
        }
        return true
      })
      user.save();
      return {
        status: true,
        statusCode: 200,
        message: 'transacion delted succesfuly'
      }
     
    })
    
    // let transactions = accountDetails[req.session.currentUser.acno].transactions;
    // transactions = transactions.filter(t => {
    //   if (t.id == id) {
    //     return false;
    //   }
    //   return true;

    // })
    // accountDetails[req.session.currentUser.acno].transactions = transactions
  

  }



  module.exports = {
    register,

    login,
    deposit,
    withdraw,
    getTransactions,
    deleteTransaction,
  }
