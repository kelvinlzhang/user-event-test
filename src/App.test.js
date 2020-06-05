import React from 'react'
import user from '@testing-library/user-event'
import { render } from '@testing-library/react'

class CostInput extends React.Component {
  state = {
    value: '',
  }

  removeDollarSign = value => (value[0] === '$' ? value.slice(1) : value)
  getReturnValue = value => (value === '' ? '' : `$${value}`)
  handleChange = ev => {
    ev.preventDefault()
    const inputtedValue = ev.currentTarget.value
    const noDollarSign = this.removeDollarSign(inputtedValue)
    if (isNaN(noDollarSign)) return
    this.setState({ value: this.getReturnValue(noDollarSign) })
  }

  render() {
    return (
        <input
            value={this.state.value}
            aria-label="cost-input"
            onChange={this.handleChange}
        />
    )
  }
}

const setup = () => {
  const utils = render(<CostInput />)
  const input = utils.getByLabelText('cost-input')
  return {
    input,
    ...utils,
  }
}

test('It should keep a $ in front of the input', async () => {
  const { input } = setup()
  await user.type(input, "23")
  expect(input.value).toBe('$23')
})