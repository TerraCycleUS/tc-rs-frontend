import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Page from '../../Layouts/Page'
import RetailerMenu from '../../components/RetailerMenu'
import classes from './SelectRetailer.module.scss'

import MakeupSkincareIcon from '../../assets/icons/makeup-&-skincare.svg'
import OralCareIcon from '../../assets/icons/oral-care.svg'
import GroomingIcon from '../../assets/icons/grooming.svg'
import HairCareIcon from '../../assets/icons/hair-care.svg'
import DeodorantsIcon from '../../assets/icons/deoderants.svg'
import ShowerBathSoapIcon from '../../assets/icons/shower-bath-soap.svg'
import Button from '../../components/Button'

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
  const [retailers] = useState(mockRetailers)

  return (
    <Page backgroundGrey className="with-animation">
      <RetailerMenu
        retailers={retailers.map((retailer) => ({
          id: retailer.id,
          name: retailer.name,
        }))}
        setActiveRetailer={setActiveRetailer}
        activeRetailer={activeRetailer}
      />
      <div className={classes.carouselContainer}>
        {retailers.map(({ id, name, iconUrl, backGroundImUrl, text }) => (
          <div key={id} className={classes.carouselItem}>
            <div className={classes.brandContainer}>
              <p className={classes.brandName}>{name}</p>
              <img
                className={classes.brandIcon}
                src={iconUrl}
                alt="brand-icon"
              />
            </div>
            <img
              className={classes.shopPhoto}
              src={backGroundImUrl}
              alt="shop"
            />
            <p className={classes.description}>{text}</p>
            <p className={classes.whatToRecycle}>
              <FormattedMessage
                id="SelectRetailer:WhatToRecycle"
                defaultMessage="What can you recycle"
              />
            </p>
            <RecyclableCategories />
            <Link className={classes.registerLink} to="../retailers-id">
              <Button>
                <FormattedMessage
                  id="SelectRetailer:Register"
                  defaultMessage="Register"
                />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Page>
  )
}

function RecyclableCategories() {
  const categories = [
    {
      id: 0,
      iconSrc: MakeupSkincareIcon,
      text: {
        id: 'selectRetailer:MakeupSkincare',
        defaultMessage: 'Makeup & Skincare',
      },
    },
    {
      id: 1,
      iconSrc: OralCareIcon,
      text: { id: 'selectRetailer:OralCare', defaultMessage: 'Oral Care' },
    },
    {
      id: 2,
      iconSrc: GroomingIcon,
      text: { id: 'selectRetailer:Grooming', defaultMessage: 'Grooming' },
    },
    {
      id: 3,
      iconSrc: HairCareIcon,
      text: { id: 'selectRetailer:HairCare', defaultMessage: 'Hair Care' },
    },
    {
      id: 4,
      iconSrc: DeodorantsIcon,
      text: { id: 'selectRetailer:Deodorants', defaultMessage: 'Deodorants' },
    },
    {
      id: 5,
      iconSrc: ShowerBathSoapIcon,
      text: {
        id: 'selectRetailer:ShowerBathSoap',
        defaultMessage: 'Shower, Bath & Hand hygiene',
      },
    },
  ]

  return (
    <div className={classes.categoryWrapper}>
      {categories.map(({ id, iconSrc, text }) => (
        <div key={id} className={classes.category}>
          <img src={iconSrc} alt="category" className={classes.categoryIcon} />
          <p className={classes.categoryText}>
            <FormattedMessage
              id={text.id}
              defaultMessage={text.defaultMessage}
            />
          </p>
        </div>
      ))}
    </div>
  )
}
