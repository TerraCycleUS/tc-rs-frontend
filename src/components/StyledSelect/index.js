import React from 'react'
import PropTypes from 'prop-types'
import Select, { components } from 'react-select'
import { ReactComponent as SelectIcon } from '../../assets/icons/select.svg'
import theme from '../../utils/theme'

function DropdownIndicator(props) {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <SelectIcon />
      </components.DropdownIndicator>
    )
  )
}

export default function StyledSelect({
  placeholder,
  options,
  onChange,
  value,
  id,
  className,
  onFocus,
  onBlur,
  noOptionsMessage,
}) {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: '#F1F1F1',
      border: 'none',
      width: '100%',
      padding: '0 16px 0 24px',
      height: '45px',
      borderColor: state.isFocused ? null : null,
      borderRadius: '30px',
      boxShadow: state.isFocused ? null : null,
      '&:focus-within': {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: `${theme.textSecondary}`,
      },
    }),
    container: (base) => ({
      ...base,
      width: '100%',
      height: '45px',
      marginBottom: '20px',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),
    indicatorContainer: (base) => ({
      ...base,
      padding: '0',
    }),
    placeholder: (base) => ({
      ...base,
      fontWeight: '500',
      fontSize: '15px',
      lineHeight: '24px',
      color: '#898989',
      margin: '0',
    }),
    input: (base) => ({
      ...base,
      fontWeight: '500',
      fontSize: '15px',
      lineHeight: '24px',
      color: '#13220F',
      margin: '0',
    }),
    singleValue: (base) => ({
      ...base,
      overflowY: 'hidden',
      overflowX: 'visible',
      margin: '0',
      fontWeight: '500',
      fontSize: '15px',
      lineHeight: '24px',
      color: '#13220F',
    }),
    option(base) {
      return {
        ...base,
        color: '#13220F',
      }
    },
  }

  return (
    <Select
      options={options}
      styles={customStyles}
      className={className}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator,
      }}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      inputId={id}
      onFocus={onFocus}
      onBlur={onBlur}
      noOptionsMessage={noOptionsMessage}
    />
  )
}

StyledSelect.propTypes = {
  placeholder: PropTypes.node,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  noOptionsMessage: PropTypes.func,
}
