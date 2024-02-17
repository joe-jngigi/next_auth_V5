'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [numberOne, setnumberOne] = useState('')
  const [numberTwo, setnumberTwo] = useState('')
  const [number, setNumber] = useState(0)

  const wairimu = () => {
    const num1 = parseInt(numberOne)
    const num2 = parseInt(numberTwo)
    setNumber(  num1 + num2)
  }

  return (
    <div className='bg-amber-900 flex justify-center flex-col gap-2 items-center h-[100vh]'>
      <h1 className='text-2xl font-bold font-about text-red-500'>Naomi Wairimu Njoroge</h1>
      <label htmlFor="">Number one</label>
      <input className='text-yellow-900' type="text" onChange={(e) => setnumberOne(e.target.value)} />
      <p>{numberOne}</p>

      <label htmlFor="">Number Two</label>
      <input className='text-black' type="text" onChange={(e) => setnumberTwo(e.target.value)} />
      <p>{numberTwo}</p>

      <button onClick={wairimu} className='black_btn'>Add</button>
      <p>{number}</p>
    </div>
  )
}
