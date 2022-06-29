import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Page from '../../Layouts/Page'
import FooterNav from '../../components/FooterNav'

const mockedItems = [
  { name: 'Stick deodorant', brand: 'Dove', category: 'Grooming' },
  { name: 'Toothbrush', brand: 'Colgate', category: 'Oral care' },
  { name: 'Shower gel', brand: 'Old Spice', category: 'Cosmetics & scincare' },
  { name: 'Razor', brand: 'Gilette', category: 'Grooming' },
  { name: 'Shower gel', brand: 'Old Spice', category: 'Cosmetics & scincare' },
]

export default function RecyclingBin() {
  const [items, setItems] = useState([])
  // const [items, setItems] = useState(mockedItems)
  return (
    <Page
      footer
      title={<FormattedMessage id="signIn:Title" defaultMessage="Sign in" />}
    >
      {items.length ? (
        <div>Items</div>
      ) : (
        <div>no Items</div>
      )}
    </Page>
  )
}
