class Transaction {
  constructor(amount, account,description,category) {
    this.amount = amount;
    this.account = account;
    this.description=description;
    this.category=category;

  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  constructor(amount,account,description,category){
    super(amount, account,description,category);
    this.transactionType='withdrawal';

  }
  get value() {

    return -this.amount;
  }
}

class Deposit extends Transaction {
  constructor(amount,account,description,category){
  super(amount, account,description,category);
  this.transactionType='deposit';

}
  get value() {
    return this.amount;
  }

}


class Transfer extends Transaction {
  constructor(amount, account, idFrom, idTo, description, category) {
    super(amount, account,description, category);
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
