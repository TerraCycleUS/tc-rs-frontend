import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function AlertDialog({
                                      open,
                                      handleClose,
                                      title,
                                      description,
                                      agreeButtonText = 'Agree',
                                      disagreeButtonText = 'Disagree',
                                      onAgree,
                                      onDisagree,
                                    }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDisagree || handleClose}>{disagreeButtonText}</Button>
        <Button onClick={onAgree || handleClose} autoFocus>
          {agreeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  agreeButtonText: PropTypes.string,
  disagreeButtonText: PropTypes.string,
  onAgree: PropTypes.func,
  onDisagree: PropTypes.func,
};
