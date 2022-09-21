import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import Home from './index'

afterEach(cleanup)

test('it redirect to sign-in if user not logged in(no user in local storage)', async () => {
  const { getByPlaceholderText, getByText, findByDisplayValue } = render(
    <Home />,
  )

  await act(async () => {
    const input = getByPlaceholderText(/Book's title/)
    fireEvent.change(input, { target: { value: 'Yama Loka Terminus' }})
    await findByDisplayValue(/Yama Loka Terminus/)

    const button = getByText(/Create book/)
    fireEvent.click(button)
  })

  expect(api.createBook).toHaveBeenCalledWith({ title: 'Yama Loka Terminus' });
})
