import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { ReactComponent as GreenBack } from '../../assets/icons/green-back.svg'
import { ReactComponent as MagnifyingGlass } from '../../assets/icons/magnifying-glass.svg'
import { ReactComponent as ResetSearch } from '../../assets/icons/reset-search.svg'
export default function LocationSearch({
  searchValue,
  setSearchValue,
  className,
  focused,
  setFocus,
}) {
  const { formatMessage } = useIntl()
  const placeholder = formatMessage({
    id: 'locationSearch:Search',
    defaultMessage: 'Search ...',
  })
  function getIcon() {
    if (focused)
      return (
        <IconBtn
          type="button"
          onClick={() => {
            setFocus(false)
          }}
        >
          <GreenBack className="left-icon" />
        </IconBtn>
      )
    return <MagnifyingGlass className="left-icon" />
  }

  function getClearBtn() {
    if (searchValue !== '')
      return (
        <IconBtn
          type="button"
          onClick={() => {
            setSearchValue('')
          }}
        >
          <ResetSearch className="right-icon" />
        </IconBtn>
      )
    return ''
  }

  return (
    <SearchWrapper className={className}>
      {getIcon()}
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setFocus(true)}
        placeholder={placeholder}
      />
      {getClearBtn()}
    </SearchWrapper>
  )
}

LocationSearch.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  className: PropTypes.string,
  focused: PropTypes.bool,
  setFocus: PropTypes.func,
}

const IconBtn = styled.button`
  background: none;
  border: none;
`

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 768px;
  position: relative;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.terraWhite};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.17);
  border-radius: 24px;
  margin-top: 33px;
  margin-bottom: 17px;

  .left-icon {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    flex-shrink: 0;
  }
  .right-icon {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 15px;
    flex-shrink: 0;
  }
`

const SearchInput = styled.input`
  width: 100%;
  display: flex;
  background-color: transparent;
  padding-left: 34px;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  color: ${({ theme }) => theme.textPrimary};
  max-width: calc(100% - 24px);
  overflow: hidden;

  &::placeholder {
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    color: ${({ theme }) => theme.textPrimary};
  }
`
