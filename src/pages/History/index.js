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

const mockHistory = [
  {
    id: 3,
    event: 'SWAPPED_ITEMS',
    coupon: {
      id: 2,
      name: 'Gillette dispozable raizors Pack 4ct or larger',
      description:
        'Save up to 15% on selected Gillette disposable razor! This offer is available in store.May not be available online. Limit one coupon per purchase of products and quantities stated.Coupons not authorized if purchasing products for resale.',
      requiredAmount: 1,
      discount: 30,
      brandLogo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
      startDate: '2022-11-05T13:12:50.329Z',
      endDate: '2022-12-05T13:12:50.330Z',
      backgroundImage:
        'https://tc-rs-stage.herokuapp.com/api/waste/photo/b8fa6525-7094-439f-9ffb-b0acdda959be.png',
      createdAt: '2022-10-05T12:12:50.331Z',
      updatedAt: '2022-10-05T12:13:33.909Z',
    },
    itemsCount: 1,
    couponId: 2,
    createdAt: '2022-10-05T12:14:07.398Z',
    retailer: { id: 2, name: 'Monoprix' },
  },
  {
    id: 2,
    event: 'DROP_ITEMS',
    itemsCount: 8,
    couponId: null,
    createdAt: '2022-10-05T12:11:51.450Z',
    retailer: { id: 2, name: 'Monoprix' },
  },
  {
    id: 1,
    event: 'DROP_ITEMS',
    itemsCount: 1,
    couponId: null,
    createdAt: '2022-09-29T14:19:16.818Z',
    retailer: { id: 2, name: 'Monoprix' },
  },
  {
    id: 4,
    event: 'SWAPPED_ITEMS',
    coupon: {
      id: 2,
      name: 'Gillette dispozable raizors Pack 4ct or larger',
      description:
        'Save up to 15% on selected Gillette disposable razor! This offer is available in store.May not be available online. Limit one coupon per purchase of products and quantities stated.Coupons not authorized if purchasing products for resale.',
      requiredAmount: 1,
      discount: 30,
      brandLogo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
      startDate: '2022-11-05T13:12:50.329Z',
      endDate: '2022-12-05T13:12:50.330Z',
      backgroundImage:
        'https://tc-rs-stage.herokuapp.com/api/waste/photo/b8fa6525-7094-439f-9ffb-b0acdda959be.png',
      createdAt: '2022-10-05T12:12:50.331Z',
      updatedAt: '2022-10-05T12:13:33.909Z',
    },
    itemsCount: 1,
    couponId: 2,
    createdAt: '2022-10-05T12:14:07.398Z',
    retailer: { id: 0, name: 'Walmart' },
  },
  {
    id: 5,
    event: 'DROP_ITEMS',
    itemsCount: 8,
    couponId: null,
    createdAt: '2022-10-05T12:11:51.450Z',
    retailer: { id: 1, name: 'Carrefour' },
  },
  {
    id: 6,
    event: 'DROP_ITEMS',
    itemsCount: 1,
    couponId: null,
    createdAt: '2022-09-29T14:19:16.818Z',
    retailer: { id: 1, name: 'Carrefour' },
  },
  {
    id: 7,
    event: 'SWAPPED_ITEMS',
    coupon: {
      id: 2,
      name: 'Gillette dispozable raizors Pack 4ct or larger',
      description:
        'Save up to 15% on selected Gillette disposable razor! This offer is available in store.May not be available online. Limit one coupon per purchase of products and quantities stated.Coupons not authorized if purchasing products for resale.',
      requiredAmount: 1,
      discount: 30,
      brandLogo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
      startDate: '2022-11-05T13:12:50.329Z',
      endDate: '2022-12-05T13:12:50.330Z',
      backgroundImage:
        'https://tc-rs-stage.herokuapp.com/api/waste/photo/b8fa6525-7094-439f-9ffb-b0acdda959be.png',
      createdAt: '2022-10-05T12:12:50.331Z',
      updatedAt: '2022-10-05T12:13:33.909Z',
    },
    itemsCount: 1,
    couponId: 2,
    createdAt: '2022-10-05T12:14:07.398Z',
    retailer: { id: 1, name: 'Carrefour' },
  },
  {
    id: 8,
    event: 'DROP_ITEMS',
    itemsCount: 8,
    couponId: null,
    createdAt: '2022-10-05T12:11:51.450Z',
    retailer: { id: 0, name: 'Walmart' },
  },
  {
    id: 9,
    event: 'DROP_ITEMS',
    itemsCount: 1,
    couponId: null,
    createdAt: '2022-09-29T14:19:16.818Z',
    retailer: { id: 3, name: 'Sainsburys' },
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
  const [activeRetailer, setActiveRetailer] = useState(mockRetailers[0]?.id)
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
      // (response) => {
      //   setHistoryItems(response.data)
      // },
      () => {
        setHistoryItems(mockHistory)
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
        activeRetailer={activeRetailer}
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

function HistoryItems({
  events,
  currentEvent,
  setCurrentEvent,
  historyItems,
  activeRetailer,
}) {
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
        activeRetailer={activeRetailer}
      />
    </div>
  )
}

HistoryItems.propTypes = {
  events: PropTypes.array,
  currentEvent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCurrentEvent: PropTypes.func,
  historyItems: PropTypes.array,
  activeRetailer: PropTypes.number,
}

function HistoryItemsWrapper({ currentEvent, historyItems, activeRetailer }) {
  const filteredItems = historyItems
    ?.filter((item) => item.retailer.id === activeRetailer)
    ?.filter((item) => item.event === currentEvent || currentEvent === 'All')
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
  activeRetailer: PropTypes.number,
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
