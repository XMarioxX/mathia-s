import { Equation } from '@/components/ecuacion'
import React from 'react'

const HomeCalculoIntegral = () => {
  return (
    <div>
      <Equation math="f(x) = \int_{a}^{b} f(x) \, dx" />
    </div>
  )
}

export default HomeCalculoIntegral