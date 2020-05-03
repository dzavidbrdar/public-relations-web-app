import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {message} from 'antd';

export default function FormDialog(props) {

  const [myValue, setValue] = React.useState('')

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleResend = () => {
      try{
        document.getElementsByClassName("MuiDialog-root")[0].style.zIndex = 600;
      }
      catch(err){
          console.log("ta komponenta ne postoji");
      }
    const requestOpt = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch( 'https://main-server-si.herokuapp.com/api/reservations/' + props.objekat.id + '/resend', requestOpt)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        props.objekat.verificationCode = data.verificationCode;
    });
    message.success("Your verification code has been resent!");
    /*setOpen(false);
    console.log(props.objekat);
    var mod= document.getElementById('btnCancel');
    mod.click();*/
  };

  const handleVerify = () => {
    try{
        document.getElementsByClassName("MuiDialog-root")[0].style.zIndex = 600;
      }
      catch(err){
          console.log("ta komponenta ne postoji");
      }
    console.log(myValue);
    if(props.objekat.verificationCode != myValue) message.error("Wrong verification code"); 
    else{
    const obj = {};
    obj.email = props.objekat.email;
    obj.verificationCode = myValue;
    console.log(obj);
    const requestOpt = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    };
    fetch( 'https://main-server-si.herokuapp.com/api/reservations/' + props.objekat.id, requestOpt)
    .then(response => response.json())
    .then(data => console.log(data));
    message.success("You have successfully verified your reservation!");
    setOpen(false);
    var mod= document.getElementById('btnCancel');
    mod.click();
    }
    //console.log(props.objekat);
  };

  const handleClose = () => {
      //ovdje jos skonat sta cu
    /*setOpen(false);
    var mod= document.getElementById('btnCancel');
    mod.click();*/
  };

  const handleCancel = () => {
    //ovdje jos skonat sta cu
  setOpen(false);
  var mod= document.getElementById('btnCancel');
  mod.click();
};

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Verification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert verification code
          </DialogContentText>
          <TextField
            value={myValue}
			onChange={(e) => setValue(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Verification Code"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerify} color="primary">
            Verify
          </Button>
          <Button onClick={handleResend} color="primary">
            Resend
          </Button>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
