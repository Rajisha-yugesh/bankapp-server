accountDetails = {
    1001: { name: "user1", acno: 1001, pin: 4387, password: "userone", balance: 3000, transactions: [] },
    1002: { name: "user2", acno: 1002, pin: 4388, password: "usertwo", balance: 4000, transactions: [] },
    1003: { name: "user3", acno: 1003, pin: 4287, password: "userthree", balance: 2000, transactions: [] },
    1004: { name: "user4", acno: 1004, pin: 1388, password: "userfour", balance: 1000, transactions: [] },
    1005: { name: "user5", acno: 1005, pin: 1318, password: "userfive", balance: 1500, transactions: [] }



}

let currentUser;


const register=(name, acno, pin, password)=> {
    if (acno in accountDetails) {
        return {
            status: false,
            statusCode:422,
            message: "account already exists"
        }

    }




    accountDetails[acno] = {
        name,
        acno,
        password,
        pin,
        balance: 0,
        Transactions: []
    }
    // console.log(this.accountDetails)
    // this.saveDetails();
    return {
        status: true,
        statusCode:200,
        message: "account registered successfully.please login"
    }
}

const login=(acno, password)=> {
  console.log(acno,password)
    var acno1 = parseInt(acno);
    console.log(accountDetails);
    var data = accountDetails;
    if (acno1 in data) {
      var pwd = data[acno].password
      if (pwd == password) {
        
        currentUser = data[acno];
        // this.saveDetails();
        return{
            status:true,
        statusCode:200,
            message:"login successfully"
        }
      }
    }
    return{
        status:false,
        statusCode:422,
        message:"invalid credentials"
    }
  }

const deposit = (acno, pin, amount1) => {

  // if(!req.session.currentUser){
  //   return{
  //     status:true,
  //     statusCode :401,
  //     message:'please login'
  //   }
  // }
    var amount = parseInt(amount1)
    var data = accountDetails;
    if (acno in data) {
        let mpin = data[acno].pin

        if (pin == mpin) {
            data[acno].balance += amount;
            data[acno].transactions.push({

                amount: amount,
                type: 'credit'
            })

            // this.saveDetails();
            return {
                status: true,
                statusCode: 200,
                message: 'account has been credited',
                balance: data[acno].balance
            }

        }
        
            return {
                status: false,
                statusCode: 422,
                message: 'incorrect account details'

            }
        
    }


}

 const withdraw=(acno, pin, amount1)=> {
    var amount = parseInt(amount1)
    var data = accountDetails;
    if (acno in data) {
      let mpin = data[acno].pin

      if(data[acno].balance < amount){
        return{
          status :false,
          message :"insufficient balance",
          balance :data[acno].balance
        }
      }

      else if (pin == mpin) {
        data[acno].balance -= amount;
        data[acno].transactions.push(
          {
            amount:amount,
            type:'debit'
          }
        )
        // this.saveDetails();
        return {
          status: true,
          statusCode :200,
          message: 'account has been debited',
          balance: data[acno].balance
        }

      }
      else {
        return {
          status: false,
          statusCode :422,
          message: 'incorrect account details'

        }

      }
    }


  }


 const getTransactions=()=>{
    return accountDetails[currentUser.acno].transactions
  }

module.exports={
    register,
    
    login,
    deposit,
    withdraw,
    getTransactions,
}
