import React from 'react'
import { render } from '@testing-library/react'
import PictureExport from '../index'
import '@testing-library/jest-dom'

jest.mock('../../../../utils/http')
jest.mock('../../../../utils/useApiCall', () => () => jest.fn(() => {}))

describe('PictureExport', () => {
  test('it renders PictureExport component', async () => {
    render(<PictureExport />)
  })
})
