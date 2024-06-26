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
import { setDataToCookie } from "../../utils/data-service";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const initialValues: SignIn = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values: SignIn) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        navigate("/main")
        setDataToCookie("start",response?.data.created_at.slice(0,10))
        setDataToCookie("access_token",response?.data.access_token)
        setDataToCookie("refresh_token",response?.data.refresh_token)
        setDataToCookie("id",response?.data?.id)
        localStorage.setItem("token",response.data.access_token)
        Notifation({ title: "Tizimga muvaffaqiyatli kirdingiz", type: "success" });
       
        
      }
    } catch (error) {
      console.log(error);
      Notifation({ title: "Xatolik mavjud", type: "error" });
    }
  };

  return (
    <>
      <ToastContainer />
      <NestedModal open={modal} handelClose={() => setModal(false)} />  

      <div className="h-screen flex items-center justify-center flex-col gap-8 p-5 ">
        <h1 className="text-[35px] font-bold mt-[-150px]">Tizimga kirish</h1>
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
                <div className="flex  justify-between mb-3 items-center ">
                  <p
                    className=" cursor-pointer hover:text-blue"
                    onClick={() => setModal(true)}
                  >
                    Parolni unutdingizmi?
                  </p>

                  <p className="cursor-pointer" onClick={() => navigate("/")}>
                    Ro'yxatdan o'tish qismi
                  </p>
                </div>
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
