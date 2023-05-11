import React from 'react'
import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import GlobalHeader from '..'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import { setSeenTutorial } from '../../../actions/seenTutorial'
import { setUser } from '../../../actions/user'

describe('GlobalHeader', () => {
  beforeAll(() => {
    act(() => {
      store.dispatch(setSeenTutorial({ seenTutorial: true }))
      store.dispatch(setUser({ name: 'mock' }))
    })
  })

  test('it renders GlobalHeader at recycling-bin route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/recycling-bin']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/My recycling bin/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at recycling-bin scan-item route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/recycling-bin/scan-item']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Item/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at recycling-bin save-item route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/recycling-bin/save-item']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Item/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/profile']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Hello, mock/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile edit route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/profile/edit']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Edit/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile change-password route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/profile/change-password']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Change/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile language route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/profile/language']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Language/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile contact-us route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/profile/contact-us']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Contact/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile history route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/profile/history']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/History/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile faq route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/profile/faq']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/FAQ/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile privacy route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/profile/privacy']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Privacy/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile terms route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/profile/terms']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Terms/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile retailer-list route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/profile/retailer-list']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/retailers/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at profile retailer-id-edit route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/profile/retailer-id-edit']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/loyalty/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at sign-in route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/sign-in']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Sign/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at registration route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/registration']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Create/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at registration pw-setup route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/registration/pw-setup']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Password/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at registration email-check route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/registration/email-check']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Check/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at registration confirm-code route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/registration/confirm-code']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Confirm/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at registration select-retailer route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/registration/select-retailer']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/retailers/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at registration retailers-id route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/registration/retailers-id']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/ID/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at reset-password route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/reset-password']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/reset/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at reset-password email-check route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/reset-password/email-check']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Check/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at reset-password set-password route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/reset-password/set-password']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Password/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at social-login email-setup route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/social-login/email-setup']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Email/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at drop-off route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/drop-off']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/,/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at rewards-wallet route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/rewards-wallet']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Rewards/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at rewards-wallet route', async () => {
    render(
      <TestEnvironment store={store} initialEntries={['/rewards-wallet']}>
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Rewards/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at rewards-wallet rewards route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/rewards-wallet/rewards']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/Rewards/)).toBeInTheDocument()
  })

  test('it renders GlobalHeader at scan-or-type-carrefour route', async () => {
    render(
      <TestEnvironment
        store={store}
        initialEntries={['/scan-or-type-carrefour']}
      >
        <GlobalHeader />
      </TestEnvironment>,
    )
    expect(screen.getByText(/ID/)).toBeInTheDocument()
  })
})
