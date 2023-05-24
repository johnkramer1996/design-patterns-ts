var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Account = /** @class */ (function () {
    function Account(_name, _money) {
        this._name = _name;
        this._money = _money;
    }
    Account.prototype.info = function () {
        console.log(this._money);
    };
    Object.defineProperty(Account.prototype, "money", {
        get: function () {
            return this._money;
        },
        set: function (value) {
            this._money = value;
        },
        enumerable: false,
        configurable: true
    });
    return Account;
}());
var Operation = /** @class */ (function () {
    function Operation(account, money) {
        this.account = account;
        this.money = money;
        this.IsComplete = false;
    }
    Operation.prototype.execute = function () { };
    return Operation;
}());
var Deposit = /** @class */ (function (_super) {
    __extends(Deposit, _super);
    function Deposit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Deposit.prototype.execute = function () {
        this.account.money += this.money;
        this.IsComplete = true;
    };
    return Deposit;
}(Operation));
var Withdraw = /** @class */ (function (_super) {
    __extends(Withdraw, _super);
    function Withdraw() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Withdraw.prototype.execute = function () {
        if (this.account.money - this.money < 0)
            return;
        this.account.money -= this.money;
        this.IsComplete = true;
    };
    return Withdraw;
}(Operation));
var OperationManager = /** @class */ (function () {
    function OperationManager() {
        this.transactions = new Array();
    }
    OperationManager.prototype.AddOperation = function (operation) {
        this.transactions.push(operation);
    };
    OperationManager.prototype.ProcessOperations = function () {
        var completed = 0;
        this.transactions.forEach(function (el) { return (!el.IsComplete ? el.execute() : ''); });
        if (completed)
            this.ProcessOperations();
    };
    OperationManager.instanse = new OperationManager();
    return OperationManager;
}());
var account1 = new Account('user1', 0);
var account2 = new Account('user2', 0);
var account3 = new Account('user3', 0);
account1.info();
account2.info();
account3.info();
var manager = OperationManager.instanse;
manager.AddOperation(new Deposit(account3, 1000));
manager.AddOperation(new Deposit(account2, 2000));
manager.AddOperation(new Deposit(account3, 3000));
manager.ProcessOperations();
account1.info();
account2.info();
account3.info();
manager.AddOperation(new Withdraw(account1, 1000));
manager.AddOperation(new Withdraw(account2, 2000));
manager.AddOperation(new Withdraw(account3, 3000));
manager.ProcessOperations();
account1.info();
account2.info();
account3.info();
manager.AddOperation(new Deposit(account1, 2000));
manager.ProcessOperations();
account1.info();
account2.info();
account3.info();
