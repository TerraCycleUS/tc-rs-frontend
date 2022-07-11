import React from 'react'
import PropTypes from 'prop-types'
import Select, { components } from 'react-select'
import { ReactComponent as SelectIcon } from '../../assets/icons/select.svg'

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
      '&:hover': {
        borderColor: state.isFocused ? null : null,
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
  }

  return (
    <Select
      options={options}
      styles={customStyles}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator,
      }}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  )
}

StyledSelect.propTypes = {
  placeholder: PropTypes.node,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.object,
}
