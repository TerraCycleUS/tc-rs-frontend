import React from "react";
import PropTypes from "prop-types";
import classes from "./LearnMoreBtn.module.scss";

export default function LearnMoreBtn({ onClick }) {
  return (
    <button
      type="button"
      aria-label="learn more"
      className={classes.learnMoreBtn}
      onClick={() => onClick()}
    />
  );
}

LearnMoreBtn.propTypes = {
  onClick: PropTypes.func,
};
