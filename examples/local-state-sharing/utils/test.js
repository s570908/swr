function getObj(obj, is, value) {
	console.log('getObj(obj, is, value): ', obj, is, value)
	if (typeof is == 'string')
			return getObj(obj,is.split('.'), value);
	else if (is.length==1 && value!==undefined) {
			//return obj[is[0]] = value;
			obj ={ [is[0]]: value }
			return obj;
	}
	else if (is.length==0)
			return obj;
	else
			return getObj(JSON.parse(JSON.stringify({ [is[0]]: {}} )),is.slice(1), value);
}

//////////////////

convertDotPathToNestedObject('foo.bar.x', 'FooBar')
// { foo: { bar: { x: 'FooBar' } } }

function convertDotPathToNestedObject(path, value) {
  const [last, ...paths] = path.split('.').reverse();
  return paths.reduce((acc, el) => ({ [el]: acc }), { [last]: value });
}
let go = {};
let foo = convertDotPathToNestedObject('foo.bar.x', 'FooBar')
// { foo: { bar: { x: 'FooBar' } } }
console.log(foo);
go = {...go, ...foo}
console.log(go)

///////////////


function index(obj, is, value) {
	if (typeof is == 'string')
			return index(obj,is.split('.'), value);
	else if (is.length==1 && value!==undefined)
			return obj[is[0]] = value;
	else if (is.length==0)
			return obj;
	else
			return index(obj[is[0]],is.slice(1), value);
}


////////////////////////
Object.prop = function(obj, prop, val){
	var props = prop.split('.')
		, final = props.pop(), p 
	while(p = props.shift()){
			if (typeof obj[p] === 'undefined')
					return undefined;
			obj = obj[p]
	}
	return val ? (obj[final] = val) : obj[final]
}

var obj = { a: { b: '1', c: '2' } }

// get
console.log(Object.prop(obj, 'a.c')) // -> 2
// set
Object.prop(obj, 'a.c', function(){})
console.log(obj) // -> { a: { b: '1', c: [Function] } }


///////

function getObj(obj, prop, val) {
	var props = prop.split('.')
		, final = props.pop(), p 
	while(p = props.shift()){
			if (typeof obj[p] === 'undefined')
					return undefined;
			obj = obj[p]
	}
	return val ? (obj[final] = val) : obj[final]
}

var obj = { a: { b: '1', c: '2' } }

// get
console.log(getObj(obj, 'a.c')) // -> 2
// set
getObj(obj, 'a.c', function(){})
console.log(obj) // -> { a: { b: '1', c: [Function] } }
