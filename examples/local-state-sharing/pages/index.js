import { useState } from "react"
import useSharedState from "../libs/store"
import useSWR, { mutate } from "swr"

function Profile() {
  const [data, setData] = useSharedState('info', 'initInfo');
  const [value, updateValue] = useState((data || {}).name)
  if (!data) {
    return null
  }
  return (
    <div>
      <h1>My name is {data.name}.</h1>
      <input
        value={value}
        onChange={e => updateValue(e.target.value)}
        style={{ width: 200, marginRight: 8 }}
      />
      <button
        type="button"
        onClick={() => {
          setData({...data, name: value})
        }}
      >
        Input my name
      </button>
    </div>
  )
}

function SysInfo() {
  const [data, setData] = useSharedState('info', 'initInfo');
  const [os, setOs] = useState(data.os);

  const [test, setTest] = useSharedState('test', 'initTest');
  const [maker, setMaker] = useState(test.board.maker);

  return (
    <div>
    <h1>I am  using {data.os}.</h1>
    <input
      value={os}
      onChange={e => setOs(e.target.value)}
      style={{ width: 200, marginRight: 8 }}
    />
    <button
      type="button"
      onClick={() => {
        setData({...data, os:os} );
      }}
    >
      Write my OS
    </button>
  </div>
  )

}

function SysHardware() {
  // 여기에서 세번째 argument로 초기화하는 것은 좋은 예제는 아니다.
  // 초기화는 store.js에서 하고 세번째 argumenmt는 사용하지 않는 것이 좋다.
  // 이 에제에서는 nested object를 사용하여 store.js가 아닌 곳에서도 초기화를 할 수 있음을 보여 주기 위한 것이다. 다시 말하지만 좋은 방법은 아니다. 
  // 즉 useSharedState에서는 초기화하는 세번째 arguemnt를 정의하지 않는 것이 좋은 방법이다.  
  const [test, setTest] = useSharedState('test', 'initTest', {main:{cpu: "intel", clock:"10G"}, board: {maker:'ASUS', year:"2020"}});
  const [maker, setMaker] = useState(test.board.maker);

  return (
  <div>
    <h1>I am  testing {test.board.maker}.</h1>
    <input
      value={maker}
      onChange={e => setMaker(e.target.value)}
      style={{ width: 200, marginRight: 8 }}
    />
    <button
      type="button"
      onClick={() => {
        setTest({...test, board: {maker:maker}})
      }}
    >
      Write my board maker
    </button>
  </div>
  )
}

function Dish() {
  const [data, setData] = useSharedState('dish', 'initDish');
  const [dish, setDish] = useState(data.dish);

  return (
    <div>
    <h1>I am  ordering {data.dish}.</h1>
    <input
      value={dish}
      onChange={e => setDish(e.target.value)}
      style={{ width: 200, marginRight: 8 }}
    />
    <button
      type="button"
      onClick={() => {
        setData({...data, dish:dish, spicy: {hot:'very hot'} });
      }}
    >
      Order my dish
    </button>
  </div>
  )

}

function Other() {
  const [ data ] = useSharedState('info', 'initInfo');
  const [ dataDish ] = useSharedState('dish', 'initDish');
  const [ test ] = useSharedState('test', 'initTest');
  if (!data) {
    return null
  }
  return (
    <div style={{ border: "1px solid #ddd", marginTop: 30, padding: 20 }}>
      <h1>
        Another Component: <br />
        My name is {data.name}. <br />
        I am  using {data.os}. <br />
        My board is made in: {test.board.maker}. <br />
        I am ordering: {dataDish.dish}. <br />        
        {dataDish.spicy?.hot != undefined ? <span>Spicy: {dataDish.spicy.hot}.</span> : null}
      </h1>
    </div>
  )
}

export default function Index() {
  return (
    <div style={{ padding: 40 }}>
      useSWR can share state between components:
      <Profile />
      <SysInfo />
      <SysHardware />
      < Dish />
      < Other />
    </div>
  )
}
