import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Formik,Form } from "formik";

import { auth } from "../../../service";
import { UpdatePassword } from "../../../interface/aouth";
import {  updatePassValidationSchema } from "../../../utils/validation";
import { useEffect, useState } from "react";
import { ModalProps } from "../../../interface/global";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
interface IModalProps extends ModalProps {
  email: string;
}

function ChildModal({ open, handelClose, email }: IModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [secondsLeft, setSecondcLeft] = useState(60)
  const initialValues: UpdatePassword = {
    code: "",
    new_password: "",
  };
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
      handelClose();
    }
  
  },[secondsLeft,handelClose]);
  const handleSubmit = async (values: UpdatePassword) => {
    // console.log('hello')
    
    const payload = { ...values, email };
      console.log(payload);
    try {
      const response = await auth.update_password(payload);

      handelClose()
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handelClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography
            id="keep-mounted-modal-title "
            className="text-center"
            variant="h6"
            component="h2"
          >
            Password tiklash
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={updatePassValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                name="code"
                type="text"
                as={TextField}
                label="Code"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="code"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="new_password"
                type={showPassword ? "text" : "password"}
                as={TextField}
                label="New Password"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="new_password"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="body1" component="p" className="py-4">
                {`Time left ${secondsLeft} seconds`}
              </Typography>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                submit
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
export default ChildModal;
