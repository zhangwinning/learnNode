/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 **/

/*
*   箭头函数的引入有两个方面的作用
*   1, 更简短的函数书写
*   2, 对this的词法的解析
*/

console.log('------------------------------用法一 更简短的函数书写---------------------------------')
/*
 用法一:
 当删除大括号时，它将是一个隐式的返回值，这意味着我们不需要指定我们返回值
 (param1, param2, …, paramN) => expression;
 等价于
 (param1, param2, …, paramN) => { return expression; }

 当箭头函数只有一个参数时,圆括号是可以省略的
 (singleParam) => { statements; }
 等价于
 singleParam => { statements; }
*/
let a = [
    "Hydrogen",
    "Helium",
    "Lithium",
    "Beryl­lium"
];

let a2 = a.map(function(s) { return s.length });
console.log(a2);

let a3 = a.map(s => s.length);
console.log(a3);

console.log('------------------------------用法二 this 用法---------------------------------------')

//在箭头函数出现之前,每个新定义的函数都有其自己的this值,
function Person1 () {
    //构造函数Person()定义 `this` 就是新实例对象自己
    this.age = 0;
    setInterval(function growUp() {
        this.age++;
        //在非严格模式下,growUp函数定义了其内部的 `this` 为全局对象,
        //不同于构造函数Person()定义的`this`
        console.log(this.age);
    }, 1000);
}
let p1 = new Person1();


//解决方案一:把this的值赋给变量
function Person2() {
    var self = this;
    // 也有人选择使用 `that` 而非 `self`, 只要保证一致就好.
    self.age = 0;
    setInterval(function growUp() {
        // 回调里面的 `self` 变量就指向了期望的那个对象了
        self.age++;
        console.log(self.age);
    }, 1000);
}

var p2 = new Person2();

//解决方案二:通过bind函数
function Person3() {
    // 也有人选择使用 `that` 而非 `self`, 只要保证一致就好.
    this.age = 0;
    setInterval(function growUp() {
        // 回调里面的 `self` 变量就指向了期望的那个对象了
        this.age++;
        console.log(this.age);
    }.bind(this), 1000);
}

var p3 = new Person3();

//解决方案三:箭头函数会捕获其所在上下文的  this 值，作为自己的 this 值
function Person4() {
    this.age = 0;
    setInterval(() => {
        // 回调里面的 `this` 变量就指向了期望的那个对象了
        this.age++;
        console.log(this.age)
    }, 3000);
}

var p4 = new Person4();


/**
 * 使用 call 或 apply 调用
 * 由于 this 已经在词法层面完成了绑定，通过 call() 或 apply() 方法调用一个函数时，
 * 只是传入了参数而已，对 this 并没有什么影响：
 */

var adder = {
    base : 1,

    add : function(a) {
        var f = v => v + this.base;
        return f(a);
    },

    addThruCall: function(a) {
        var f = v => v + this.base;
        var b = {
            base : 2
        };

        return f.call(b, a);
    }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3）

/**
 * 箭头函数看上去是匿名函数的一种简写,但实际上,
 * 箭头函数和匿名函数有个明显的区别:箭头函数内部的this是词法作用域,
 * 有上下文确定
 */

var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        //var fn = function () {
        //    return new Date().getFullYear() - this.birth; // this指向window或undefined
        //};
        var fn = () => new Date().getFullYear() - this.birth;
        return fn();
    }
};

//console.log(obj.getAge())


/**
 * 由于this的箭头函数中已经按照词法作用域绑定了,所以,用call()或者apply()调用箭头函数时,无法对this 进行绑定,即传入的第一个参数是被忽略的
 */


var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};
//console.log(obj.getAge(2015));



