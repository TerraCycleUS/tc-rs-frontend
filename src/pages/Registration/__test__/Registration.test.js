import React from 'react'
import { render, screen } from '@testing-library/react'
import Registration from '../index'
import store from '../../../store'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import { fbLoginUrl, googleLoginUrl } from '../../../utils/socialLoginUrl'

// tests below search for link by their english text
jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('Registration', () => {
  test('it renders Registration page', async () => {
    render(
      <TestEnvironment store={store}>
        <Registration />
      </TestEnvironment>,
    )
  })

  test('it has correct terms and conditions link', async () => {
    render(
      <TestEnvironment store={store}>
        <Registration />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('terms')).toHaveProperty(
      'href',
      'http://localhost/profile/terms?targetBlank=true',
    )
  })

  test('it has correct privacy policy link', async () => {
    render(
      <TestEnvironment store={store}>
        <Registration />
      </TestEnvironment>,
    )
    expect(screen.getByTestId('privacy')).toHaveProperty(
      'href',
      'http://localhost/profile/privacy?targetBlank=true',
    )
  })

  test('it has correct sign-in link', async () => {
    const { container } = render(
      <TestEnvironment store={store}>
        <Registration />
      </TestEnvironment>,
    )
    expect(container.querySelector('[class="sign-in-link"]')).toHaveProperty(
      'href',
      'http://localhost/sign-in',
    )
  })

  test('it has google social login link', async () => {
    const { container } = render(
      <TestEnvironment store={store}>
        <Registration />
      </TestEnvironment>,
    )
    expect(
      container.querySelector(`a[href="${googleLoginUrl('undefined')}"]`),
    ).toBeTruthy()
  })

  test('it has facebook social register link', async () => {
    const { container } = render(
      <TestEnvironment store={store}>
        <Registration />
      </TestEnvironment>,
    )
    expect(container.querySelector(`a[href="${fbLoginUrl()}"]`)).toBeTruthy()
  })
})
