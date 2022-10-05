import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Page from '../../Layouts/Page'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'
import classes from './History.module.scss'
import retailerMenuClasses from '../../components/RetailerMenu/RetailerMenu.module.scss'
import { ReactComponent as HistoryBin } from '../../assets/icons/history-bin.svg'
import SortingPanel from '../../components/SortingPanel'
import formatDate from '../../utils/formatDate'
import EVENTS from './EVENTS'
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

const historyEvents = [
  {
    id: EVENTS.DROP_ITEMS,
    label: {
      id: 'history:DroppedCategory',
      defaultMessage: 'Drop-off',
    },
  },
  {
    id: EVENTS.SWAPPED_ITEMS,
    label: {
      id: 'history:UnlockedCategory',
      defaultMessage: 'Unlocked',
    },
  },
]

export default function History() {
  const user = useSelector((state) => state.user)
  const getAmountApiCall = useApiCall()
  const getHistoryApiCall = useApiCall()
  const [totalImpact, setTotalImpact] = useState(0)
  const [historyItems, setHistoryItems] = useState([])
  const [events] = useState(historyEvents)
  const [currentEvent, setCurrentEvent] = useState('All')
  const [retailers] = useState(mockRetailers)
  const [activeRetailer, setActiveRetailer] = useState(-1)
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  useEffect(() => {
    getAmountApiCall(
      () => http.get('/api/user/profile', config),
      (response) => {
        setTotalImpact(response.data.totalAmount)
      },
      null,
      null,
      { message: false },
    )
  }, [])

  useEffect(() => {
    getHistoryApiCall(
      () => http.get('/api/history', config),
      (response) => {
        setHistoryItems(response.data)
      },
      null,
      null,
      { message: false },
    )
  }, [])

  function renderHistory() {
    if (!historyItems?.length) return <HistoryNoItems />
    return (
      <HistoryItems
        events={events}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        historyItems={historyItems}
      />
    )
  }

  function renderRetailerMenu() {
    if (!historyItems?.length || !retailers?.length) return null
    return (
      <RetailerMenu
        retailers={retailers.map((retailer) => ({
          id: retailer.id,
          name: retailer.name,
        }))}
        setActiveRetailer={setActiveRetailer}
        activeRetailer={activeRetailer}
        className={retailerMenuClasses.pdBt28}
      />
    )
  }

  return (
    <Page backgroundGrey footer pdTop30>
      {renderRetailerMenu()}
      <h4 className={classes.totalImpact}>
        <FormattedMessage
          id="history:TotalImpact"
          defaultMessage="My total impact: {br}{totalImpact} items recycled"
          values={{
            br: <br />,
            totalImpact,
          }}
        />
      </h4>
      {renderHistory()}
    </Page>
  )
}

function HistoryItems({ events, currentEvent, setCurrentEvent, historyItems }) {
  return (
    <div className={classes.historyItemsWrapper}>
      <SortingPanel
        types={events}
        currentType={currentEvent}
        setCurrentType={setCurrentEvent}
        className={classes.forHistory}
      />
      <HistoryItemsWrapper
        currentEvent={currentEvent}
        historyItems={historyItems}
      />
    </div>
  )
}

HistoryItems.propTypes = {
  events: PropTypes.array,
  currentEvent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCurrentEvent: PropTypes.func,
  historyItems: PropTypes.array,
}

function HistoryItemsWrapper({ currentEvent, historyItems }) {
  const filteredItems = historyItems?.filter(
    (item) => item.event === currentEvent || currentEvent === 'All',
  )
  function renderName(couponId, coupon) {
    if (!couponId) return null
    return <p className={classes.description}>{coupon?.name}</p>
  }

  function renderDiscount(couponId, coupon) {
    if (!couponId) return null
    return (
      <p className={classes.discount}>
        <FormattedMessage
          id="history:Discount"
          defaultMessage="{discount}% Off"
          values={{ discount: coupon?.discount }}
        />
      </p>
    )
  }

  function plusOrMinusItems(couponId, numItems) {
    if (!couponId) return `+ ${numItems}`
    return `- ${numItems}`
  }

  function plusMinusClass(couponId) {
    if (!couponId) return classes.plus
    return classes.minus
  }

  function renderEvent(event) {
    if (event === EVENTS.SWAPPED_ITEMS)
      return (
        <FormattedMessage
          id="history:Unlocked"
          defaultMessage="Unlocked coupon"
        />
      )
    return (
      <FormattedMessage
        id="history:Dropped"
        defaultMessage="Dropped-off items"
      />
    )
  }

  return (
    <div className={classes.itemContainer}>
      {filteredItems?.map(
        ({ id, couponId, createdAt, itemsCount, event, coupon }) => (
          <div key={id} className={classes.historyItem}>
            <div className={classes.infoWrapper}>
              <p className={classes.date}>{formatDate(createdAt)}</p>
              <p className={classNames('my-text', classes.title)}>
                {renderEvent(event)}
              </p>
              {renderName(couponId, coupon)}
              {renderDiscount(couponId, coupon)}
            </div>
            <div
              className={classNames(
                classes.numWrapper,
                plusMinusClass(couponId),
              )}
            >
              <p className={classes.num}>
                {plusOrMinusItems(couponId, itemsCount)}
              </p>
              <p className={classes.items}>
                <FormattedMessage
                  id="history:ItemsRecycled"
                  defaultMessage="items{br}recycled"
                  values={{ br: <br /> }}
                />
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  )
}

HistoryItemsWrapper.propTypes = {
  currentEvent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  historyItems: PropTypes.array,
}

function HistoryNoItems() {
  return (
    <div className={classes.noHistoryWrapper}>
      <HistoryBin />
      <p className={classes.noHistoryText}>
        <FormattedMessage
          id="history:NoItems"
          defaultMessage="Your recycling activity will appear on this page. Start recycling and get rewarded!"
        />
      </p>
    </div>
  )
}
