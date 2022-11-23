import useSWR from "swr"
import getObj from "../utils/getObj"

const initStore = {
	initInfo: {name:'John', os:'Window'},
	initDish: {dish: 'Hamburger', price:'$100'},
	initTest: {main:{cpu: "intel", clock:"10G"}, board: {maker:'ASUS', year:"2020"}},
}

const useSharedState = (key, initObj) => {
	if(!getObj(initStore, initObj)) {
		console.log(`${initObj} is not in initStore`)
	}
  const { data: state, mutate: setState } = useSWR(key, {
    fallbackData: getObj(initStore, initObj),
  })
  return [state, setState]
}

export default useSharedState;
