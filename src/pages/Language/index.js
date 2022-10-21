import classNames from 'classnames'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'

import Page from '../../Layouts/Page'
import { AVAILABLE_LANGUAGES } from '../../utils/const'
import classes from './Language.module.scss'
import { ReactComponent as Check } from '../../assets/icons/check.svg'
import Loader from '../../components/Loader'
import http from '../../utils/http'
import { updateUser } from '../../actions/user'
import useApiCall from '../../utils/useApiCall'
import { useMessageContext } from '../../context/message'

export default function Language() {
  const { lang: locale } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const [buttonLang, setButtonLang] = React.useState(locale)
  const { formatMessage } = useIntl()
  const [, updateMessage] = useMessageContext()
  const apiCall = useApiCall()

  const successCb = ({ data }) => {
    dispatch(updateUser({ lang: data.lang }))
    updateMessage(
      {
        type: 'success',
        text: formatMessage({
          id: 'language:SaveSuccess',
          defaultMessage: 'Saved successfully',
        }),
      },
      10000,
    )
  }

  function setLocale(lang) {
    setLoading(true)
    setButtonLang(lang)

    apiCall(
      () => http.put('/api/user/updateProfile', { lang }),
      successCb,
      null,
      () => setLoading(false),
    )
  }

  return (
    <Page>
      <ul className={classes.wrapper}>
        {Object.keys(AVAILABLE_LANGUAGES).map((lang) => (
          <li key={lang} className={classNames(classes[lang], classes.item)}>
            <button
              disabled={loading}
              type="button"
              onClick={() => setLocale(lang)}
              className="my-text w-100 my-color-textPrimary d-flex align-items-center"
            >
              <FormattedMessage id={lang} defaultMessage={lang} />
              {lang === buttonLang ? (
                <div className="tool-btn ms-auto">
                  {loading ? <Loader size={20} /> : <Check />}
                </div>
              ) : null}
            </button>
            <div className={classes.divider}></div>
          </li>
        ))}
      </ul>
    </Page>
  )
}
