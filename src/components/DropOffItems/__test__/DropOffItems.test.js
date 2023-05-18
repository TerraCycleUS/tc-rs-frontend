import React from 'react'
import { render, screen } from '@testing-library/react'
import TestEnvironment from '../../ForTestWriting/TestEnvironment'
import store from '../../../store'
import DropOffItems from '..'
import '@testing-library/jest-dom'

jest.mock('../../../utils/http')
jest.mock('../../../utils/useApiCall', () => () => jest.fn(() => {}))

const mockProducts = [
  {
    id: 29,
    picture: '6014a07e6.jpeg',
    status: 'CREATED',
    userId: 1,
    barcode: null,
    brandId: 157,
    categoryId: 9,
    droppedAt: null,
    locationId: null,
    couponId: null,
    createdAt: '2023',
    updatedAt: '2023',
    categoryTitle: 'Writing instruments',
    brandTitle: 'Bic',
  },
]

describe('DropOffItems', () => {
  test('it renders DropOffItems', async () => {
    render(
      <TestEnvironment store={store}>
        <DropOffItems />
      </TestEnvironment>,
    )
  })

  test('it renders DropOffItems with no products present', async () => {
    render(
      <TestEnvironment store={store}>
        <DropOffItems currentCategory={2} setProducts={() => {}} />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('no items')).toBeInTheDocument()
  })

  test('it renders DropOffItems with products present', async () => {
    render(
      <TestEnvironment store={store}>
        <DropOffItems
          currentCategory={2}
          products={mockProducts}
          setProducts={() => {}}
        />
      </TestEnvironment>,
    )
  })
})
