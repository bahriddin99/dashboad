// import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
// import { Typography } from '@mui/material';
// import TextField from '@mui/material';
// import Notifation from "../../../utils/notifation";
import { PostService } from "@services-interface";
import { serviceValidationSchema } from "../../../utils/validation";
import { getDataFromCookie } from "../../../utils/data-service";
import { ModalProps } from "../../../interface/global";
// import { servicess } from "../../../service";
import useServeceStore from "../../../store/service";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { TextField } from "@mui/material";
import Notifation from "../../../utils/notifation";

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

const ServiceAddModal = ({ open, handelClose, item }: ModalProps) => {
  const { createData, updateData } = useServeceStore();
  console.log(item, "moadl");

  const initialValues: PostService = {
    name: item.name || "",
    price: item.price || "",
  };
  // const handelSubmit = async (values:PostService)=>{
  //     const email = getDataFromCookie("email");
  //     const payload = {
  //         ...values, price:Number(values.price),owner_email:email
  //     };
  //     try {
  //         const response = await servicess.add_service(payload);
  //         if(response.status === 201){
  //             Notifation({title: "Muvaffaqiyatli qo'shildi", type: "success"})
  //             setTimeout(()=>{
  //                 handelClose();
  //             },1500)

  //         }
  //     } catch (error) {
  //         console.log(error);
  //         Notifation({title: "Xatolik mavjud", type: "success"})

  //     }
  // };

  const handelSubmit = async (values: PostService) => {
    const payload = {
      ...values,
      price: Number(values.price),
      owner_id: getDataFromCookie("id"),
    };
    if (!item.id) {
      const status = await createData(payload);
      if (status === 201) {
        handelClose();
      } else {
        Notifation({ title: "Nimadir xato ☹️", type: "error" });
      }
    } else {
      await updateData({ ...payload, id: item.id });
    }
  };
  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={serviceValidationSchema}
            onSubmit={handelSubmit}
          >
            <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
                Hizmat qo'shish
              </h1>
              <Field
                as={TextField}
                label="Hizmat turi"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="name"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="mb-3 text-red-500 text-center"
              />
              <Field
                as={TextField}
                label="Hizmat narhi"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="number"
                name="price"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="mb-3 text-red-500 text-center"
              />
              <Button
                sx={{ fontSize: "16px", fontWeight: "600" }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                qo'shish
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default ServiceAddModal;
