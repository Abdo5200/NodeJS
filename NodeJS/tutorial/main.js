"use strict";
const s = new Map([
  ["ahmed", 22],
  ["ali", 20],
  ["mohamed", 21],
]);
function obj(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}
const person = {
  firstName: "John",
  lastName: "Doe",
  language: "EN",
  set lang(lang) {
    this.language = lang;
  },
};
person.firstName = "ahmed";
person.lang = "AR";
Object.defineProperty(person, "age", { value: 20 });
let p = new obj("ahmed", "mohamed", 80);
obj.prototype.nationality = "egypt";
console.log(person.language);
const x = (x, y = 10) => x + y;
console.log(x(20, 30));
function fun() {
  for (let i = 0; i < arguments.length; i++) console.log(arguments[i]);
}
fun(10, 20, 30, 40, 50);
const p1 = {
  fullname: function () {
    return this.firstName + " " + this.lastName;
  },
};
const p2 = {
  firstName: "ahmed",
  lastName: "mohamed",
};
console.log(p1.fullname.call(p2));
const p9 = {
  firstName: "John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

const member = {
  firstName: "Hege",
  lastName: "Nilsen",
  get fullName() {
    return this.firstName + " " + this.lastName;
  },
};

let fullName = p9.fullName.bind(member);
console.log(member.fullName + " asd");
class Car {
  constructor(model, color) {
    if (model instanceof Number && color instanceof String) {
      this.model = model;
      this.color = color;
    }
  }
  honk() {
    console.log("Beep!");
  }
}
class Honda extends Car {
  constructor(model, color, type) {
    super(model, color);
    this.type = type;
  }
  sound() {
    this.honk();
    console.log("Japanese sound");
  }
}
let c = new Honda(2011, "red", "sedan");
c.sound();
let j = "abdelrahman.mamdouh2200@gmail.com abdelrahmanmamdouh12@yahoo.com";
let regex = /(\w+.?\w+@\w+.com)/gi;
const arr = j.match(regex);
for (const x of arr) console.log(x);
console.log(regex.test(j));
let num = "S100S S3000S S50000S S950000S";
let pattern = /S\d{3,5}S/gi;
console.log(num.match(pattern));
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
arr1.push(...arr2);
console.log(Math.max(...arr1));

const add = (function () {
  let counter = 0;
  return function () {
    counter += 1;
    return counter;
  };
})();

add();
add();
add();

for (let id = 0; id < 3; id++) {
  // The setTimeout function uses a callback, and by the time the callback is executed,
  // the loop has already completed, so 'id' will always be 3 in all setTimeout callbacks.
  setTimeout(function () {
    console.log("seconds: " + id);
  }, id * 1000);
}
var expect = function (val) {
  return {
    toBe: (innerValue) => {
      if (val === innerValue) return true;
      else throw "Not Equal";
    },
    notToBe: (innerVal) => {
      if (val !== innerVal) return true;
      else throw "Equal";
    },
  };
};
const o = expect(6);
console.log(o.toBe(6));
