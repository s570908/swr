import { useDeferredValue } from "react"
import useSWR from "swr"
import getObj from "../utils/getObj"

const initStore = {
	initInfo: {name:'John', os:'Window'},
	initDish: {dish: 'Hamburger', price:'$100'},
	initTest: {main:{cpu: "intel", clock:"10G"}, board: {maker:'ASUS', year:"2020"}},
}

const useSharedState = (key, initObj) => {
  console.log(key, initObj)
	console.log('getObj(initStore, initObj): ', getObj(initStore, initObj))
	if(!getObj(initStore, initObj)) {
		console.log(`${initObj} is not in initStore`)
	}

	console.log("Before useSWR: ", initStore)
  const { data: state, mutate: setState } = useSWR(key, {
    fallbackData: getObj(initStore, initObj),
  })
	console.log("After useSWR: ", initStore)

  return [state, setState]
}

// const useSharedState = (key, initObj, value) => {
//   console.log(key, initObj, value)
// 	console.log('getObj(initStore, initObj): ', getObj(initStore, initObj, value))
// 	if(!getObj(initStore, initObj, value)) {
// 		console.log(`${initObj} is not in initStore`)
// 	}

// 	console.log("Before useSWR: ", initStore)
//   const { data: state, mutate: setState } = useSWR(key, {
//     fallbackData: getObj(initStore, initObj, value),
//   })
// 	console.log("After useSWR: ", initStore)

//   return [state, setState]
// }

export default useSharedState;
