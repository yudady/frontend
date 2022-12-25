import * as _ from 'lodash';

var myArr = [
    { name: "john", age: 23 },
    { name: "john", age: 43 },
    { name: "jim", age: 101 },
    { name: "bob", age: 67 }];

let fi = _.filter(myArr, function (o) {
    return o.name == 'john';
});

console.log(fi)