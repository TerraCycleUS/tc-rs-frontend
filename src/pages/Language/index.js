import classNames from 'classnames'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { useLocale } from '../../context/locale'
import Page from '../../Layouts/Page'
import { AVAILABLE_LANGUAGES } from '../../utils/const'
import classes from './Language.module.scss'
import { ReactComponent as Check } from '../../assets/icons/check.svg'

export default function Language() {
  const [locale, setLocale] = useLocale()
  return (
    <Page
      title={<FormattedMessage id="language:Title" defaultMessage="Language" />}
      backButton
    >
      <ul className={classes.wrapper}>
        {Object.keys(AVAILABLE_LANGUAGES).map((lang) => (
          <li key={lang} className={classNames(classes[lang], classes.item)}>
            <button
              type="button"
              onClick={() => setLocale(lang)}
              className="my-text w-100 my-color-textPrimary d-flex align-items-center"
            >
              <FormattedMessage id={lang} defaultMessage={lang} />
              {lang === locale ? (
                <span className="tool-btn ms-auto">
                  <Check />
                </span>
              ) : null}
            </button>
            <div className={classes.divider}></div>
          </li>
        ))}
      </ul>
    </Page>
  )
}
