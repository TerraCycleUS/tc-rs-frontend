import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { FormattedMessage } from 'react-intl'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
// import http from '../../utils/http'
// import useApiCall from '../../utils/useApiCall'
import RetailerMenu from '../../components/RetailerMenu'

const mockRetailers = [
  {
    id: 0,
    name: 'Walmart',
    iconUrl: 'https://cdn.worldvectorlogo.com/logos/monoprix-logo.svg',
    backGroundImUrl:
      'https://techcrunch.com/wp-content/uploads/2018/03/gettyimages-480223866.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  },
  {
    id: 1,
    name: 'Carrefour',
    iconUrl: 'https://cdn.worldvectorlogo.com/logos/monoprix-logo.svg',
    backGroundImUrl:
      'https://techcrunch.com/wp-content/uploads/2018/03/gettyimages-480223866.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  },
  {
    id: 2,
    name: 'Monoprix',
    iconUrl: 'https://cdn.worldvectorlogo.com/logos/monoprix-logo.svg',
    backGroundImUrl:
      'https://techcrunch.com/wp-content/uploads/2018/03/gettyimages-480223866.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  },
  {
    id: 3,
    name: 'Sainsburys',
    iconUrl: 'https://cdn.worldvectorlogo.com/logos/monoprix-logo.svg',
    backGroundImUrl:
      'https://techcrunch.com/wp-content/uploads/2018/03/gettyimages-480223866.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  },
]

export default function SelectRetailer() {
  const [activeRetailer, setActiveRetailer] = useState(-1)

  return (
    <Page backgroundGrey className="with-animation">
      <RetailerMenu
        retailers={mockRetailers.map((retailer) => ({
          id: retailer.id,
          name: retailer.name,
        }))}
        setActiveRetailer={setActiveRetailer}
        activeRetailer={activeRetailer}
      />
      <p>hfbehkfbhefh</p>
      <p>{activeRetailer}</p>
    </Page>
  )
}
