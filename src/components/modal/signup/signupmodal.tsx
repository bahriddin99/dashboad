import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { ModalProps } from "../../../interface/global";
// import { useNavigat } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  bgcolor: "background.paper",
  boxShodow: 24,
  p: 4,
};
interface IModalProp extends ModalProps {
  email: string;
}

const Signupmodal = ({ open, handleClose, email }: IModalProp) => {
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondcLeft] = useState(60)
  const navigate = useNavigate();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(code);
  };

  try {
    const payload = { code, email };
    const response = auth.auth_verify(payload);
    console.log(response);

    if (response.status === 201) {
      navigate("/signin");
    }
  } catch (error) {
    console.log(error);
  }
  useEffect(()=>{
    let timer = null;
    if(open){
      timer = setInterval(()=>{
        setSecondcLeft((prevSeconds)=>prevSeconds-1);
      },1000)
    }
    return ()=>{
      if(timer) clearInterval(timer);
    };
  },[open]);
  useEffect(()=>{
    // let timer = null;
    if(secondsLeft === 0){
    handleClose();
    }
  
  },[secondsLeft,handleClose]);

  return (
    <>
      
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              className="text-center"
              variant="h6"
             
              component="h2"
            >
              Parolni kiriting
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Parolni kiriting"
                id="fullWidth"
                sx={{ marginY: "20px" }}
                onChange={(e) => setCode(e.target.value)}
              />
                {/* <Typography variant="body1" component="p" className="py-4">
                {`Time left ${secondsLeft} seconds`}
              </Typography> */}
              <Button
                type="submit"
                fullWidth
                style={{ background: "blue", color: "white" }}
              >
                submit
              </Button>
            </form>
          </Box>
        </Modal>
   
    </>
  );
};

export default Signupmodal;
