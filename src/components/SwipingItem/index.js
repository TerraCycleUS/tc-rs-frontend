import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function SwipingItem({
  children,
  actionButtons,
  actionButtonMinWidth,
  height = '80px',
}) {
  const [isScrolling, setIsScrolling] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const handlers = useSwipeable({
    onSwiped: () => handlePanEnd(),
    onSwipeStart: (eventData) => handlePanStart(eventData),
    onSwiping: (eventData) => handleSwipe(eventData),
    trackMouse: true,
  })

  function handlePanStart(e) {
    if (e.dir === 'Down' || e.dir === 'Up') {
      setIsScrolling(true)
    }
  }

  function handlePanEnd() {
    setIsScrolling(false)
  }

  function handleSwipe(e) {
    if (!isScrolling) {
      if (e.dir === 'Left' && !isExpanded) {
        setIsExpanded(true)
      } else if (e.dir === 'Right' && isExpanded) {
        setIsExpanded(false)
      }
    }
  }

  function handleActionClicked(callback) {
    callback()
    setIsExpanded(false)
  }

  return (
    <SwipingContainer {...handlers} style={{ height }}>
      <SwipingActionContainer style={{ height }}>
        {actionButtons.map((action) => (
          <ActionButton
            type="button"
            key={action.key}
            onClick={() => handleActionClicked(action.onClick)}
            style={{
              height,
              minWidth: actionButtonMinWidth,
            }}
            role={action.role || 'button'}
          >
            {action.content}
          </ActionButton>
        ))}
      </SwipingActionContainer>
      <SwipeableContentContainer
        style={{
          height,
          transform: `translateX(${
            isExpanded
              ? `-${actionButtons.length * actionButtonMinWidth}px`
              : '0px'
          })`,
        }}
      >
        {children}
      </SwipeableContentContainer>
    </SwipingContainer>
  )
}

export const SwipingContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 10px;
`

export const SwipingActionContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.delete};
  border-radius: 15px;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.terraGrey};
`

export const SwipeableContentContainer = styled.div`
  width: 100%;
  transition: transform 300ms linear;
`
export const ActionButton = styled.button`
  background-color: transparent;
`
SwipingItem.propTypes = {
  children: PropTypes.node,
  actionButtons: PropTypes.array,
  actionButtonMinWidth: PropTypes.number,
  height: PropTypes.number,
}
