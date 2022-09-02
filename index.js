class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let sum = 0;
    for (let trans of this.transactions) {
      if (trans instanceof Withdrawal) {
        sum -= trans.amount;
      }
      if (trans instanceof Deposit) {
        sum += trans.amount;
      }
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }



}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount
  }

  isAllowed() {
    if (this.account.balance - this.amount < 0) {
      return false
    }
    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    if (this.amount < 0) {
      return false;
    }
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

const t1 = new Withdrawal(50.25, myAccount);
console.log(`This transaction's validity is ${t1.commit()}`);
console.log('Transaction 1:', t1.value);

const t2 = new Withdrawal(9.99, myAccount);
console.log(`This transaction's validity is ${t2.commit()}`);
console.log('Transaction 2:', t2.value);

const t3 = new Deposit(120.00, myAccount);
console.log(`This transaction's validity is ${t3.commit()}`);
console.log(`Transaction 3: `, t3.value);

// console.log('Ending Balance:', myAccount.balance)

console.log(`Ending balance: ${myAccount.balance}`);
