import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useState } from "react";
import { SignIn } from "../../interface/aouth";
import { signInValidationSchema } from "../../utils/validation";
import { auth } from "../../service";
import NestedModal from "../../components/modal/signin/nestedmodal";
import Notifation from "../../utils/notifation";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate()

  const initialValues: SignIn = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values:SignIn) => {
   
    try {
      const response = await auth.sign_in(values)
     if(response.status===200){
      Notifation({title: "Success", type:"success"})
      navigate("/main")
     }
      
    } catch (error) {
      console.log(error);
      Notifation({title: "Xatolik mavjud", type:"error"})
      
    }
  };

  return (
    <>
    <ToastContainer/>
    <NestedModal open={modal} handleClose={()=>setModal(false)}/>
      <div className="h-screen flex items-center justify-center flex-col gap-8 p-5">
        <h1 className="text-[35px] font-bold">Tizimga kirish</h1>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
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
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
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
                <p
                  className="mb-3 cursor-pointer hover:text-blue"
                  onClick={() => setModal(true)}
                >
                  Parolni unutdingizmi?
                </p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Submitting" : "Tizimga kirish"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Signin;
