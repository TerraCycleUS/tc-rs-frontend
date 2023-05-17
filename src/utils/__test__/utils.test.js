import extractErrorMessage from '../extractErrorMessage'
import '@testing-library/jest-dom'

describe('utils testing', () => {
  test('extractErrorMessage will find error in response to display', async () => {
    const input1 = { response: { data: { errors: 'One error text' } } }
    const input2 = {
      response: { data: { errors: ['One error text', 'One error text'] } },
    }
    const input3 = {
      response: { data: { message: 'Error message' } },
    }
    const input4 = {
      message: 'Error message',
    }

    expect(extractErrorMessage(input1)).toBe('One error text')
    expect(extractErrorMessage(input2)).toBe('One error text\nOne error text')
    expect(extractErrorMessage(input3)).toBe('Error message')
    expect(extractErrorMessage(input4)).toBe('Error message')
  })
})
