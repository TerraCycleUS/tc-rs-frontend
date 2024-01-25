import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";
import classes from "./SwipingItem.module.scss";

export default function SwipingItem({
  children,
  actionButtons,
  actionButtonMinWidth,
  height = "80px",
}) {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const handlers = useSwipeable({
    onSwiped: () => handlePanEnd(),
    onSwipeStart: (eventData) => handlePanStart(eventData),
    onSwiping: (eventData) => handleSwipe(eventData),
    trackMouse: true,
  });

  function handlePanStart(e) {
    if (e.dir === "Down" || e.dir === "Up") {
      setIsScrolling(true);
    }
  }

  function handlePanEnd() {
    setIsScrolling(false);
  }

  function handleSwipe(e) {
    if (!isScrolling) {
      if (e.dir === "Left" && !isExpanded) {
        setIsExpanded(true);
      } else if (e.dir === "Right" && isExpanded) {
        setIsExpanded(false);
      }
    }
  }

  function handleActionClicked(callback) {
    callback();
    setIsExpanded(false);
  }

  return (
    <div className={classes.swipingContainer} {...handlers} style={{ height }}>
      <div className={classes.swipingActionContainer} style={{ height }}>
        {actionButtons.map((action) => (
          <button
            className={classes.actionButton}
            type="button"
            key={action.key}
            onClick={() => handleActionClicked(action.onClick)}
            style={{
              height,
              minWidth: actionButtonMinWidth,
            }}
            role={action.role || "button"}
          >
            {action.content}
          </button>
        ))}
      </div>
      <div
        className={classes.swipeableContentContainer}
        style={{
          height,
          transform: `translateX(${
            isExpanded
              ? `-${actionButtons.length * actionButtonMinWidth}px`
              : "0px"
          })`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

SwipingItem.propTypes = {
  children: PropTypes.node,
  actionButtons: PropTypes.array,
  actionButtonMinWidth: PropTypes.number,
  height: PropTypes.number,
};
