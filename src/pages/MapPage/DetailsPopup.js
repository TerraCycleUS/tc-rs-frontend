import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'

import { ReactComponent as Xmark } from '../../assets/icons/x-mark.svg'
import { ReactComponent as Grooming } from '../../assets/icons/grooming.svg'
import { ReactComponent as Shower } from '../../assets/icons/shower-bath-soap.svg'
import { ReactComponent as Navigate } from '../../assets/icons/arrow-navigate.svg'
import { ReactComponent as LearnMore } from '../../assets/icons/learn-more.svg'
import telIcon from '../../assets/icons/telephone.svg'

import Button from '../../components/Button'
import { DescriptionText, H4, TextPrimary } from '../../components/Text'

export default function DetailsPopup({
  item: { address, location, tel: _tel, city },
  onClose,
}) {
  const searchParams = new URLSearchParams({ query: `${location},${city}` })
  const searchLink = `${
    process.env.REACT_APP_GOOGLE_MAPS_SEARCH_LINK
  }&${searchParams.toString()}`
  const tel = _tel.replaceAll('.', ' ')

  return (
    <Wrapper className="fixed-bottom">
      <Container className="p-0">
        <header>
          <div className="d-flex justify-content-between">
            <H4>{location}</H4>
            <button onClick={onClose} type="button">
              <Xmark />
            </button>
          </div>
          <DescriptionText>{address}</DescriptionText>
        </header>
        <div className="tools d-flex">
          <div className="left d-flex justify-content-center flex-wrap">
            <Grooming />
            <Shower />
            <Description className="text-center">Waste stream</Description>
          </div>
          <div className="right d-flex justify-content-between">
            <div className="navigate">
              <ToolBtn href={searchLink} target="_blank">
                <Navigate />
              </ToolBtn>
              <a href={searchLink} target="_blank">
                <Description>
                  <FormattedMessage
                    id="mapDetails:Navigate"
                    defaultMessage="Navigate"
                  />
                </Description>
              </a>
            </div>
            <div className="learn-more">
              <ToolBtn href={process.env.REACT_APP_MAP_ITEM_LEARN_MORE_LINK}>
                <LearnMore />
              </ToolBtn>
              <a href={process.env.REACT_APP_MAP_ITEM_LEARN_MORE_LINK}>
                <Description>
                  <FormattedMessage
                    id="mapDetails:LearnMore"
                    defaultMessage="Learn more"
                  />
                </Description>
              </a>
            </div>
          </div>
        </div>
        <div className="details">
          <TextPrimary className="details-title" as="h4">
            <FormattedMessage
              id="mapDetails:StoreDetails"
              defaultMessage="Store details:"
            />
          </TextPrimary>
          <DescriptionText className="hours">
            8AM - 10PM Mon. - Sat., 10AM - 8PM Sun.
          </DescriptionText>
          <DescriptionText className="tel" as="a" href={`tel:${tel}`}>
            {tel}
          </DescriptionText>
        </div>
        <Button className="drop-off">
          <FormattedMessage
            id="mapDetails:ButtonSubmit"
            defaultMessage="Drop-off your items"
          />
        </Button>
      </Container>
    </Wrapper>
  )
}

DetailsPopup.propTypes = {
  item: PropTypes.shape({
    address: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func,
}

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 30px 30px 0px 0px;
  padding: 22px 16px 20px;

  header {
    padding: 0 6px;
  }

  .tools {
    margin-top: 10px;
    background-color: ${({ theme }) => theme.terraGrey};
    border-radius: 20px;
    padding: 14px 16px;

    > div {
      width: 50%;
    }

    .left {
      position: relative;
      padding-right: 15px;

      &::after {
        content: '';
        width: 2px;
        display: block;
        background-color: #d6d6d6;
        height: 54px;
        position: absolute;
        right: -1px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .right {
      padding-left: 15px;

      > div {
        width: 50%;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;

        a + a {
          width: 100%;
          text-align: center;
        }
      }
    }
  }

  .details {
    margin-top: 10px;
    padding: 0 6px;

    .details-title {
      color: ${({ theme }) => theme.textPrimary};
    }

    .hours {
      margin-top: 2px;
    }

    .tel {
      margin-top: 1px;

      &::before {
        content: '';
        display: inline-block;
        background-image: url(${telIcon});
        width: 12px;
        height: 12px;
        vertical-align: baseline;
        margin-right: 5px;
      }
    }
  }

  .drop-off {
    margin-top: 12px;
  }
`

const Description = styled.p`
  width: 100%;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: ${({ theme }) => theme.main};
`

const ToolBtn = styled.a`
  background-color: ${({ theme }) => theme.main};
  border-radius: 50%;
  width: 33px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
`
