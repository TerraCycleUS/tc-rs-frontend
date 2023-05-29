import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import MonoprixId from '..'
import { setUser } from '../../../actions/user'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('MonoprixId ', () => {
  test('it renders MonoprixId page', async () => {
    store.dispatch(setUser({ authorization: 'token' }))
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="asdasd"
          isNum={false}
          setCode={(code) => code}
          submitHandler={() => {}}
        />
      </TestEnvironment>,
    )
  })

  test('it renders MonoprixId different props', async () => {
    store.dispatch(setUser({ authorization: 'token' }))
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="9135720000000000000"
          isNum
          setCode={(code) => code}
          submitHandler={(code) => code}
        />
      </TestEnvironment>,
    )
  })

  test('it renders MonoprixId invalid code', async () => {
    store.dispatch(setUser({ authorization: 'token' }))
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="000913"
          isNum
          setCode={() => {}}
          submitHandler={(code) => code}
        />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('submit-btn')).toHaveProperty('disabled')
  })
})
