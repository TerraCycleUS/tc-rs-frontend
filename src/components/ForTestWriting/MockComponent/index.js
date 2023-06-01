import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function MockComponent({ mockPromise, useApiCall }) {
  const effectMaker = useApiCall()
  const [check, setCheck] = useState()

  useEffect(() => {
    effectMaker(() => mockPromise)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log('res', res)
        setCheck(true)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error', error)
        setCheck(false)
      })
  }, [])
  return <div data-testid="apicall-mock">{check ? 'resolved' : 'rejected'}</div>
}

MockComponent.propTypes = {
  mockPromise: PropTypes.object,
  useApiCall: PropTypes.func,
}
