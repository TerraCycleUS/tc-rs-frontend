import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import Button from "../../Button";
import StyledRecycleSave from "../../Icons/StyledRecycleSave";
import classes from "./CreateNow.module.scss";

import { Bubble, BubbleContainer, BubbleEnd } from "../../Bubble";
import { PopContainer, PopWrapper } from "../GenericPop";
import { ReactComponent as Arrow } from "../../../assets/icons/arrow.svg";
import { ReactComponent as Download } from "../../../assets/icons/download.svg";
import { ReactComponent as CreateId } from "../../../assets/icons/create-id.svg";
import { ReactComponent as ComeBack } from "../../../assets/icons/come-back.svg";
import { ReactComponent as Xmark } from "../../../assets/icons/x-mark.svg";
import getMobileOperatingSystem from "../../../utils/getMobileOperatingSystem";

export default function CreateNow({ setShow }) {
  const [downloadLink] = useState(getMobileOperatingSystem());

  return (
    <PopWrapper>
      <PopContainer>
        <Xmark onClick={() => setShow(false)} className="close-btn" />
        <StyledRecycleSave className={classes.recycleLogo} />
        <BubbleContainer className={classes.container}>
          <Bubble className={classes.popBubble}>
            <Download className={classes.bubbleIcon} />
            <p className="bubble-text my-text-description my-color-textPrimary">
              <FormattedMessage
                id="createNow:Bubble1"
                defaultMessage="Download M’ {br}Monoprix app"
                values={{
                  br: <br />,
                }}
              />
            </p>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className={classes.popBubble}>
            <CreateId className={classes.bubbleIcon} />
            <p className="bubble-text my-text-description my-color-textPrimary">
              <FormattedMessage
                id="createNow:Bubble2"
                defaultMessage="Set up M’ account"
                values={{ br: <br /> }}
              />
            </p>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className={classes.popBubble}>
            <ComeBack className={classes.bubbleIcon} />
            <p className="bubble-text my-text-description my-color-textPrimary">
              <FormattedMessage
                id="createNow:Bubble3"
                defaultMessage="Go back to {br} Recycle+Save"
                values={{ br: <br /> }}
              />
            </p>
          </Bubble>
        </BubbleContainer>
        <Button as="a" href={downloadLink} target="_blank">
          <FormattedMessage id="createNow:ButtonStart" defaultMessage="Start" />
        </Button>
        <Button className="no-bg-btn" onClick={() => setShow(false)}>
          <FormattedMessage
            id="createNow:ButtonClose"
            defaultMessage="Continue later"
          />
        </Button>
      </PopContainer>
    </PopWrapper>
  );
}

CreateNow.propTypes = {
  setShow: PropTypes.func,
};
