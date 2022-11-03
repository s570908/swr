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
        setData({...data, dish:dish} );
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
  if (!data) {
    return null
  }
  return (
    <div style={{ border: "1px solid #ddd", marginTop: 30, padding: 20 }}>
      <h1>
        Another Component: <br />
        My name is {data.name}. <br />
        I am  using {data.os}. <br />
        I am ordering: {dataDish.dish}
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
      < Dish />
      <Other />
    </div>
  )
}
