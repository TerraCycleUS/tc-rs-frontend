import React from 'react'
import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AnimatedRoutes from '..'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import { setSeenTutorial } from '../../../actions/seenTutorial'
import { setUser } from '../../../actions/user'

describe('AnimatedRoutes', () => {
  beforeAll(() => {
    act(() => {
      store.dispatch(setSeenTutorial({ seenTutorial: true }))
      store.dispatch(setUser({ name: 'mock' }))
    })
  })

  test('it renders Home if user already seen tutorial by default', async () => {
    render(
      <TestEnvironment store={store}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Recycle with us/)).toBeInTheDocument()
  })

  test('it renders RecyclingBin on route "/recycling-bin"', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/recycling-bin']}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('addItem-link')).toBeInTheDocument()
  })

  test('it renders MapPage on route "/map"', async () => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn(),
      clearWatch: jest.fn(),
    }
    render(
      <TestEnvironment store={store} initialEntries={['/map']}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('map')).toBeInTheDocument()
  })

  test('it renders Profile on route "/profile"', async () => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn(),
      clearWatch: jest.fn(),
    }
    render(
      <TestEnvironment store={store} initialEntries={['/profile']}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(
      screen.getByText(/Feel free to contact us, we are here to help!/),
    ).toBeInTheDocument()
  })

  test('it renders SignIn on route "/sign-in"', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/sign-in']}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Sign in/)).toBeInTheDocument()
  })

  test('it renders Registration on route "/registration"', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/registration']}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Create account/)).toBeInTheDocument()
  })

  test('it renders ResetPassword on route "/reset-password"', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/reset-password']}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(
      screen.getByText(/Please enter your registered email address:/),
    ).toBeInTheDocument()
  })

  test('it renders Drop on route "/drop-off" if there is query with location', async () => {
    const routeWithQuery =
      '/drop-off?address=CC%20la%20Vache%20Noire%20Place%20de%20la%20Vache%20Noire&city=ARCUEIL&id=91&location=ARCUEIL%20VACHE%20NOIRE&qrCode=pnctHTIBAm3qsSs6'
    render(
      <TestEnvironment store={store} initialEntries={[routeWithQuery]}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(
      screen.getByText(
        /Select the items you want to drop off in the in-store kiosk/,
      ),
    ).toBeInTheDocument()
  })

  test('it redirects from Drop-off to Map on route "/drop-off" if there is no query with location', async () => {
    const routeWithNoQuery = '/drop-off'
    render(
      <TestEnvironment store={store} initialEntries={[routeWithNoQuery]}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('map')).toBeInTheDocument()
  })

  test('it renders RewardsWallet page on "rewards-wallet" route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/rewards-wallet']}>
        <AnimatedRoutes />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Add Retailer/)).toBeInTheDocument()
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
