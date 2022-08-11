import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Page from '../../Layouts/Page'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'
import classes from './History.module.scss'
import { ReactComponent as HistoryBin } from '../../assets/icons/history-bin.svg'
import ProductMenu from '../../components/ProductMenu'
import formatDate from '../../utils/formatDate'

const mockHistory = [
  {
    id: 0,
    date: '01.11.2021',
    itemTitle: 'Dropped-off items',
    numItems: 8,
    description: '',
    discount: '',
  },
  {
    id: 1,
    date: '01.11.2021',
    itemTitle: 'Unlocked coupon',
    numItems: 8,
    description: 'Gillette dispozable raizors Pack 4ct or larger ',
    discount: '30',
  },
]

const mockCategories = [
  {
    id: 0,
    title: 'Dropped-off items',
  },
  {
    id: 1,
    title: 'Swapped items',
  },
]

export default function History() {
  const user = useSelector((state) => state.user)
  const getAmountApiCall = useApiCall()
  const getHistoryApiCall = useApiCall()
  const [totalImpact, setTotalImpact] = useState(0)
  const [historyItems, setHistoryItems] = useState([])
  const [categories] = useState(mockCategories)
  const [currentCategory, setCurrentCategory] = useState('All')
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
        categories={categories}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        historyItems={historyItems}
      />
    )
  }

  return (
    <Page backgroundGrey>
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
  categories,
  currentCategory,
  setCurrentCategory,
  historyItems,
}) {
  return (
    <div className={classes.historyItemsWrapper}>
      <ProductMenu
        categories={categories}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        className={classes.forHistory}
      />
      <HistoryItemsWrapper
        currentCategory={currentCategory}
        historyItems={historyItems}
      />
    </div>
  )
}

HistoryItems.propTypes = {
  categories: PropTypes.array,
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setCurrentCategory: PropTypes.func,
  historyItems: PropTypes.array,
}

function HistoryItemsWrapper({ currentCategory, historyItems }) {
  const filteredItems = historyItems?.filter(
    (item) => item.id === currentCategory || currentCategory === 'All',
  )
  function renderDescription(description) {
    if (!description) return null
    return <p className={classes.description}>{description}</p>
  }

  function renderDiscount(discount) {
    if (!discount) return null
    return (
      <p className={classes.discount}>
        <FormattedMessage
          id="history:Discount"
          defaultMessage="{discount}% Off"
          values={{ discount }}
        />
      </p>
    )
  }

  function plusOrMinusItems(discount, description, numItems) {
    if (!discount && !description) return `- ${numItems}`
    return `+ ${numItems}`
  }

  function plusMinusClass(discount, description) {
    if (!discount && !description) return classes.plus
    return classes.minus
  }

  return (
    <div className={classes.itemContainer}>
      {filteredItems?.map(
        ({ id, date, itemTitle, numItems, description, discount, event, title, coupon }) => (
          <div key={id} className={classes.historyItem}>
            <div className={classes.infoWrapper}>
              <p className={classes.date}>{formatDate(date)}</p>
              <p className={classNames('my-text', classes.title)}>
                {itemTitle}
              </p>
              {renderDescription(description)}
              {renderDiscount(discount)}
            </div>
            <div
              className={classNames(
                classes.numWrapper,
                plusMinusClass(discount, description),
              )}
            >
              <p className={classes.num}>
                {plusOrMinusItems(discount, description, numItems)}
              </p>
              <p className={classes.items}>
                <FormattedMessage
                  id="history:ItemsRecycled"
                  defaultMessage="items{br}recycled"
                  values={{ br: <br /> }}
                />
              </p>
            </div>

            event {event}, title {title}, coupon {coupon?.name} {coupon?.discount}
          </div>
        ),
      )}
    </div>
  )
}

HistoryItemsWrapper.propTypes = {
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
