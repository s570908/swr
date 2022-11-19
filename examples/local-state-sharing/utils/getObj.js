function getObj(obj, prop, val) {
	const props = prop.split('.');
	const final = props.pop();
	let p;
	while(p = props.shift()){
			if (typeof obj[p] === 'undefined')
					return undefined;
			obj = obj[p]
	}
	return val ? (obj[final] = val) : obj[final]
}

export default getObj;
