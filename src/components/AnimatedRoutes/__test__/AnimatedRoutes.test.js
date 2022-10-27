import React from 'react'
import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AnimatedRoutes from '..'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import { setSeenTutorial } from '../../../actions/seenTutorial'
import { setUser } from '../../../actions/user'

describe('AnimatedRoutes', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(setSeenTutorial({ seenTutorial: true }))
      store.dispatch(setUser({ user: 'mock' }))
    })
  })

  test('it renders Home if user already seen tutorial by default', async () => {
    render(
      <TestEnvironment store={store}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Recycle with Monoprix/)).toBeInTheDocument()
  })

  test('it renders RecyclingBin ar route "/recycling-bin"', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/recycling-bin']}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('addItem-link')).toBeInTheDocument()
  })

  // this test at the bottom for specific reason
  // tests happen faster than redux store gets updated
  // await doesn't help
  // to fix this we need to make new store instance for each test
  test('it renders Tutorial for new user', async () => {
    await act(() => {
      store.dispatch(setSeenTutorial(null))
    })
    render(
      <TestEnvironment store={store}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(
      screen.getByText(
        /Individually scan accepted used products and packaging to save them in your virtual recycling bin./,
      ),
    ).toBeInTheDocument()
  })
})
