import React from 'react'
import { render } from '@testing-library/react'
import RetailerMenu from '../index'

describe('RetailerMenu ', () => {
  test('it renders Retailer menu', async () => {
    render(<RetailerMenu />)
  })

  test('it renders Retailer menu while using index prop', async () => {
    render(
      <RetailerMenu
        retailers={[{ id: 2, name: 'Carrefour', index: 2 }]}
        setActiveRetailer={() => {}}
        activeRetailer={1}
        className="mock"
        useIndex
      />,
    )
  })

  test('it renders Retailer menu with no index prop', async () => {
    render(
      <RetailerMenu
        retailers={[{ id: 2, name: 'Carrefour', index: 2 }]}
        setActiveRetailer={() => {}}
        activeRetailer={1}
        className="mock"
      />,
    )
  })
})
