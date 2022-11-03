import { useState } from "react"
import initialStore from "../libs/store"
import useSWR, { mutate } from "swr"

const useSharedState = (key, initial) => {
  console.log(key, initial)
  const { data: state, mutate: setState } = useSWR(key, {
    fallbackData: initial,
  })

  return [state, setState]
}

function Profile() {
  const { data } = useSWR("globalState", { fallbackData: initialStore })
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
          mutate("globalState", { ...data, name: value }, false)
        }}
      >
        Uppercase my name!
      </button>
    </div>
  )
}

function SysInfo() {
  const [data, setData] = useSharedState('os', 'Window');
  const [os, setOs] = useState(data);
  console.log(os, setOs)
  console.log(data, setData)

  return (
    <div>
    <h1>I am  using {data}.</h1>
    <input
      value={os}
      onChange={e => setOs(e.target.value)}
      style={{ width: 200, marginRight: 8 }}
    />
    <button
      type="button"
      onClick={() => {
        setData(os);
      }}
    >
      Write your OS !
    </button>
  </div>
  )

}

function Other() {
  const { data } = useSWR("globalState", { fallbackData: initialStore })
  const [ sysOS, setSysOS] = useSharedState('os', 'Window');
  if (!data) {
    return null
  }
  return (
    <div style={{ border: "1px solid #ddd", marginTop: 30, padding: 20 }}>
      <h1>
        Another Component: <br />
        My name is {data.name}. <br />
        I am  using {sysOS}.
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
      <Other />
    </div>
  )
}
