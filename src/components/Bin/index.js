import React from 'react'
import { ReactComponent as HairCareIcon } from '../../assets/icons/hair-care.svg'
import { ReactComponent as DeodorantsIcon } from '../../assets/icons/deoderants.svg'
import { ReactComponent as ShowerBathSoapIcon } from '../../assets/icons/shower-bath-soap.svg'
import { ReactComponent as OralCareIcon } from '../../assets/icons/oral-care.svg'
import { ReactComponent as MakeupSkincareIcon } from '../../assets/icons/makeup-&-skincare.svg'
import { ReactComponent as GroomingIcon } from '../../assets/icons/grooming.svg'

export default function getCategoryIcon(category) {
  switch (category) {
    case 1:
      return <HairCareIcon />

    case 2:
      return <DeodorantsIcon />

    case 3:
      return <ShowerBathSoapIcon />

    case 4:
      return <OralCareIcon />

    case 5:
      return <MakeupSkincareIcon />

    case 6:
      return <GroomingIcon />

    default:
      return null
  }
}
