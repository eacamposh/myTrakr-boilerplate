class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];

  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return  total + transaction;
    }, 0);
  }

  // updateAccountTransaction(transaction){

  //   this.transactions.push(transaction);

  // }

 
}
