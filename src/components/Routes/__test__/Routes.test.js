import React from 'react'
import { act, cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Routes from '..'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import { setSeenTutorial } from '../../../actions/seenTutorial'
import { setUser } from '../../../actions/user'

describe('Routes', () => {
  beforeAll(() => {
    act(() => {
      store.dispatch(setSeenTutorial({ seenTutorial: true }))
      store.dispatch(setUser({ name: 'mock' }))
    })
  })

  afterEach(() => {
    cleanup()
  })

  test('it renders Admin if on route "/admin"', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/admin']}>
        <Routes />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('app-bar')).toBeInTheDocument()
  })

  test('it renders CameraScan if on route "/recycling-bin/camera-scan"', async () => {
    Object.defineProperty(window, 'MediaStreamTrack', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        start: jest.fn(),
        ondataavailable: jest.fn(),
        onerror: jest.fn(),
        state: '',
        stop: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
      })),
    })

    Object.defineProperty(window, 'MediaRecorder', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        start: jest.fn(),
        ondataavailable: jest.fn(),
        onerror: jest.fn(),
        state: '',
        stop: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
      })),
    })

    Object.defineProperty(MediaStreamTrack, 'isTypeSupported', {
      writable: true,
      value: () => true,
    })

    Object.defineProperty(MediaRecorder, 'isTypeSupported', {
      writable: true,
      value: () => true,
    })

    render(
      <TestEnvironment
        store={store}
        initialEntries={['/recycling-bin/camera-scan']}
      >
        <Routes />
      </TestEnvironment>,
    )

    expect(
      screen.getByText(/Please scan the bar code code on the item./),
    ).toBeInTheDocument()
  })
})
