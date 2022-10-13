import React from 'react'
import { render, screen } from '@testing-library/react'
import Tutorial from '../index'
import store from '../../../store'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'

describe('Tutorial ', () => {
  test('it renders Tutorial page', async () => {
    render(
      <TestEnvironment store={store}>
        <Tutorial />
      </TestEnvironment>,
    )
  })

  test('it renders home link', async () => {
    render(
      <TestEnvironment store={store}>
        <Tutorial />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('home')).toHaveProperty(
      'href',
      'http://localhost/',
    )
  })
})
