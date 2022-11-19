function getObj(obj, prop, val) {
	const props = prop.split('.');
	const final = props.pop(); // 마지막 프로퍼티는 final로 뽑아 놓는다.
	let p;
	while(p = props.shift()){
		if (typeof obj[p] === 'undefined') {
			// If we're setting
			if (typeof val !== 'undefined') {
				// If we're not at the end of the props, keep adding new empty objects
				obj[p] = {};
			}
			else
				return undefined;
		}
		obj = obj[p]
	}

	// val 이 주어지지 않았다면 get이다.
	// 현재 obj 는 마지막 object이고 {final: <<someValue>>} 이다.
	//
	// val 이 주어졌다면 set이다.
	// 현재 obj 는 마지막 object이고 {final: <<someValue>>}  혹은 {} 이다.
	//
	// val 이 주어졌을 경우, 
	// 	obj 가  {final: <<someValue>>} 라면 obj는 {final: value}  로 업데이트된다.
	// 	obj가 {} 이라면 {final: value} 로 내용을 만들어서 넣는다.
	return val ? (obj[final] = val) : obj[final]
}

export default getObj;
