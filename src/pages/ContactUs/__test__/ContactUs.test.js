import React from 'react'
import { render } from '@testing-library/react'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'
import store from '../../../store'
import ContactUs from '..'

describe('ContactUs ', () => {
  test('it renders Contact Us page', async () => {
    render(
      <TestEnvironment store={store}>
        <ContactUs />
      </TestEnvironment>,
    )
  })
})
