console.log(_.random(1, 10));
// 定义一个JavaScript内置对象  
var jsData = {  
    name : 'data'  
}  
 
// 通过_()方法将对象创建为一个Underscore对象  
// underscoreData对象的原型中包含了Underscore中定义的所有方法，你可以任意使用  
var underscoreData = _(jsData);  
 
// 通过value方法获取原生数据, 即jsData  
underscoreData.value();

var stooge = {name: 'moe', age: 16};
console.log(_.property('age')(stooge));
function fnlen(q,w,e,r) {}
console.log(_.getLength(fnlen))
console.log(_.isArrayLike(fnlen))

// Underscore对象  
console.dir(_);  
// 将Underscore对象重命名为us, 后面都通过us来访问和创建Underscore对象  
var underscore = _.noConflict();
// underscore.each(..);
// 输出"自定义变量"  
console.dir(underscore);  
