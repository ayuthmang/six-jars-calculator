'use client'
import React, { useEffect } from 'react'
import classnames from 'classnames'

const defaultCalculation = {
  necessities: 0.55,
  education: 0.1,
  longTermSavings: 0.1,
  financialFreedom: 0.1,
  play: 0.1,
  give: 0.05,
}

const toFixed = (num: number) => +num.toFixed(4)

type JarsState = {
  necessities: number
  education: number
  longTermSavings: number
  financialFreedom: number
  play: number
  give: number
}

const jarsReducer = (
  state: typeof defaultCalculation,
  action: { type: string; value: number }
): JarsState => {
  const max = 1
  const value = action.value / 100

  switch (action.type) {
    case 'necessities':
      return { ...state, necessities: value }
    case 'education':
      return { ...state, education: value }
    case 'longTermSavings':
      return { ...state, longTermSavings: value }
    case 'financialFreedom':
      return { ...state, financialFreedom: value }
    case 'play':
      return { ...state, play: value }
    case 'give':
      return { ...state, give: value }

    default:
      return state
  }
}

function Input({
  label,
  value,
  onChange,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="number"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}

export default function Home() {
  const [income, setIncome] = React.useState(0)
  const [state, dispatch] = React.useReducer(jarsReducer, defaultCalculation)
  const [calculatedResult, setCalculatedResult] =
    React.useState<JarsState | null>(null)

  useEffect(() => {
    if (income === null || income === undefined) return

    function calculate(state: JarsState, income: number) {
      return {
        necessities: toFixed(income * state.necessities),
        education: toFixed(income * state.education),
        longTermSavings: toFixed(income * state.longTermSavings),
        financialFreedom: toFixed(income * state.financialFreedom),
        play: toFixed(income * state.play),
        give: toFixed(income * state.give),
      }
    }

    setCalculatedResult(calculate(state, income))
  }, [state, income])

  return (
    <main className="">
      <div>
        <label htmlFor="income">income</label>
        <input
          id="income"
          type="number"
          value={income}
          onChange={(e) => setIncome(+e.target.value)}
        />
      </div>

      <div>
        <h2>Calculation config</h2>
        <div>
          <label htmlFor="necessities">necessities</label>
          <input
            id="necessities"
            type="number"
            onChange={(e) =>
              dispatch({ type: 'necessities', value: +e.target.value })
            }
            min={0}
            max={100}
            value={toFixed(state.necessities * 100)}
          />
          %
        </div>
        <div>
          <label htmlFor="education">education</label>
          <input
            id="education"
            type="number"
            onChange={(e) =>
              dispatch({ type: 'education', value: +e.target.value })
            }
            min={0}
            max={100}
            value={toFixed(state.education * 100)}
          />
          %
        </div>
        <div>
          <label htmlFor="longTermSavings">longTermSavings</label>
          <input
            id="longTermSavings"
            type="number"
            onChange={(e) =>
              dispatch({ type: 'longTermSavings', value: +e.target.value })
            }
            min={0}
            max={100}
            value={toFixed(state.longTermSavings * 100)}
          />
          %
        </div>
        <div>
          <label htmlFor="financialFreedom">financialFreedom</label>
          <input
            id="financialFreedom"
            type="number"
            onChange={(e) =>
              dispatch({ type: 'financialFreedom', value: +e.target.value })
            }
            min={0}
            max={100}
            value={toFixed(state.financialFreedom * 100)}
          />
          %
        </div>
        <div>
          <label htmlFor="play">play</label>
          <input
            id="play"
            type="number"
            onChange={(e) => dispatch({ type: 'play', value: +e.target.value })}
            min={0}
            max={100}
            value={toFixed(state.play * 100)}
          />
          %
        </div>
        <div>
          <label htmlFor="give">give</label>
          <input
            id="give"
            type="number"
            onChange={(e) => dispatch({ type: 'give', value: +e.target.value })}
            min={0}
            max={100}
            value={toFixed(state.give * 100)}
          />
          %
        </div>
      </div>

      <div className={classnames(`pt-2`)}>
        <h2>Summary</h2>
        {calculatedResult && (
          <div>
            <p>Necessities: {calculatedResult.necessities}</p>
            <p>Education: {calculatedResult.education}</p>
            <p>Long Term Savings: {calculatedResult.longTermSavings}</p>
            <p>Financial Freedom: {calculatedResult.financialFreedom}</p>
            <p>Play: {calculatedResult.play}</p>
            <p>Give: {calculatedResult.give}</p>
            <p>
              Total:{' '}
              {toFixed(
                Object.values(calculatedResult).reduce((acc, v) => acc + v)
              )}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
