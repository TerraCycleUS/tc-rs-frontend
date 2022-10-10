import React from 'react'
import { render } from '@testing-library/react'
import RetailerList from '../index'
import store from '../../../store'
import { setUser } from '../../../actions/user'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'

describe('RetailerList', () => {
  test('it renders Retailer list page', async () => {
    store.dispatch(setUser({ user: 'mock' }))
    render(
      <TestEnvironment store={store}>
        <RetailerList />
      </TestEnvironment>,
    )
  })

  // test('it renders add retailer link', async () => {
  //   store.dispatch(setUser({ user: 'mock' }))
  //   render(
  //     <TestEnvironment store={store}>
  //       <RetailerList />
  //     </TestEnvironment>,
  //   )
  // })
  //
  // test('it renders link to retailer', async () => {
  //   store.dispatch(setUser({ user: 'mock' }))
  //   render(
  //     <TestEnvironment store={store}>
  //       <RetailerList />
  //     </TestEnvironment>,
  //   )
  // })
})
