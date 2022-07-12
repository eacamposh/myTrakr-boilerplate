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
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

}


class Transfer extends Transaction {
  constructor(amount, account, idFrom, idTo, description, category) {
    super(amount, account);

    this.idFrom = idFrom;
    this.idTo = idTo;
    this.description = description;
    this.category = category;
  }

  get value() {
    return this.amount;
  }
}
