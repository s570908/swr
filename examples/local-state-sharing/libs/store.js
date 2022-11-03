import useSWR from "swr"
import getObj from "../utils/getObj"

const initStore = {
	initInfo: {name:'John', os:'Window'}
}

const useSharedState = (key, initObj) => {
  console.log(key, initObj)
	console.log('getObj(initStore, initObj): ', getObj(initStore, initObj))
	if(!getObj(initStore, initObj)) {
		console.log(`${initObj} is not in initStore`)
	}

  const { data: state, mutate: setState } = useSWR(key, {
    fallbackData: getObj(initStore, initObj),
  })

  return [state, setState]
}

export default useSharedState;
