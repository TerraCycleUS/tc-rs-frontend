import React from 'react'
import { render, screen } from '@testing-library/react'
import SelectRetailer, { RetailerCarousel } from '../index'
import store from '../../../store'
import TestEnvironment from '../../../components/ForTestWriting/TestEnvironment'

describe('SelectRetailer ', () => {
  test('it renders Select Retailer', async () => {
    render(
      <TestEnvironment store={store}>
        <SelectRetailer />
      </TestEnvironment>,
    )
  })

  test('it renders link to scan-or-type-carrefour if provided with carrefour id', async () => {
    const retailersMock = [
      {
        id: 2,
        name: 'Carrefour',
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/Carrefour-Logo-1982.png',
        backgroundImage:
          'https://www.ukrainianinpoland.pl/wp-content/uploads/2022/08/carefour_atrium_promenada-1000x500.jpg',
        smallLogo:
          'https://tc-rs-stage.herokuapp.com/api/waste/photo/4906a49a-5ec8-4895-b53f-0d8aac1de042.png',
        description:
          'Carrefour SA (IPA: /karfur/) is a French international hypermarket chain. It has many shops around the world. It is the second largest retail group in the world in terms of revenue and sales figures after Wal-Mart. Carrefour operates mainly in the European Union, Brazil, Argentina and Colombia. It also has shops in Africa, and Asia. Carrefour means cross-road (the place where two roads meet) in French.',
        createdAt: '2022-10-05T08:00:03.822Z',
        updatedAt: '2022-10-05T08:00:03.822Z',
      },
    ]
    render(
      <TestEnvironment store={store}>
        <RetailerCarousel retailers={retailersMock} />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('retailers-id')).toHaveProperty(
      'href',
      'http://localhost/scan-or-type-carrefour',
    )
  })

  test('it renders link to retailers-id if provided with retailer', async () => {
    const retailersMock = [
      {
        id: 1,
        name: 'Carrefour',
        logo: 'https://logos-world.net/wp-content/uploads/2020/11/Carrefour-Logo-1982.png',
        backgroundImage:
          'https://www.ukrainianinpoland.pl/wp-content/uploads/2022/08/carefour_atrium_promenada-1000x500.jpg',
        smallLogo:
          'https://tc-rs-stage.herokuapp.com/api/waste/photo/4906a49a-5ec8-4895-b53f-0d8aac1de042.png',
        description:
          'Carrefour SA (IPA: /karfur/) is a French international hypermarket chain. It has many shops around the world. It is the second largest retail group in the world in terms of revenue and sales figures after Wal-Mart. Carrefour operates mainly in the European Union, Brazil, Argentina and Colombia. It also has shops in Africa, and Asia. Carrefour means cross-road (the place where two roads meet) in French.',
        createdAt: '2022-10-05T08:00:03.822Z',
        updatedAt: '2022-10-05T08:00:03.822Z',
      },
    ]
    render(
      <TestEnvironment store={store}>
        <RetailerCarousel retailers={retailersMock} />
      </TestEnvironment>,
    )

    expect(screen.getByTestId('retailers-id')).toHaveProperty(
      'href',
      'http://localhost/retailers-id',
    )
  })
})
