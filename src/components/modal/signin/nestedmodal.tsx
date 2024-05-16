import { useState } from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { ModalProps } from "../../../interface/global";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { verifyPassValidationSchema } from "../../../utils/validation";
import { auth } from "../../../service";
import ChildModal from "./child-modal";
import { ForgetPassword } from "../../../interface/aouth";

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

export default function NestedModal({ open, handelClose }: ModalProps) {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");

  const initialValues: ForgetPassword = {
    email: "",
  };

  const handleSubmit = async (values: ForgetPassword) => {
   setEmail(values.email)
    try {
      const response = await auth.forget_password(values);
      response.status === 200 && setModal(true);
      handelClose()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <ChildModal open={modal} handelClose={()=>setModal(false) } email={email}/>
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
                Emailni kiriting
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={verifyPassValidationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                <Field
                    name="email"
                    type="email"
                    as={TextField}
                    label="Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                    <ErrorMessage
                        name="email"
                        component="p"
                        className="text-[red] text-[15px]"
                    />
                    }
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    // disabled={isSubmitting}
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
