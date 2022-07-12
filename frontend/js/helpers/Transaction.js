class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
    
  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  constructor(){

    this.transactionType='withdrawal';
    super(amount, account);
  }
  get value() {

    return -this.amount;
  }
}

class Deposit extends Transaction {
constructor(){

  this.transactionType='deposit';
  super(amount, account);
}
  get value() {
    return this.amount;
  }

}


class Transfer extends Transaction {
  constructor(amount, account, idFrom, idTo, description, category) {
    super(amount, account);
    this.transactionType='transfer';
    this.idFrom = idFrom;
    this.idTo = idTo;
    this.description = description;
    this.category = category;
  }

  get value() {
    return this.amount;
  }
}
