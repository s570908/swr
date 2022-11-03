function getObj(obj, is, value) {
	if (typeof is == 'string')
			return getObj(obj,is.split('.'), value);
	else if (is.length==1 && value!==undefined)
			return obj[is[0]] = value;
	else if (is.length==0)
			return obj;
	else
			return getObj(obj[is[0]],is.slice(1), value);
}

export default getObj;