import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { CreateOrders } from "@orders-interface";
import { ordersValidationSchema } from "../../../utils/validation";
// import { getDataFromCookie } from "../../../utils/data-service";
import { ModalProps } from "../../../interface/global";
import useOrdersStore from "../../../store/orders";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { MenuItem, Select, TextField } from "@mui/material";
import useServeceStore from "../../../store/service";
// import Notifation from "../../../utils/notifation";
import { useEffect } from "react";

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

const OrdersAddModal = ({ open, handelClose, item }: ModalProps) => {
  const { createData,updateData} = useOrdersStore();
  const { getData, data } = useServeceStore();
  useEffect(() => {
    getData({ page: 1, limit: 10 });
  }, []);
  console.log(item, "moadl");

  const initialValues: CreateOrders = {
    client_full_name: "",
    client_phone_number: "",
    service_id: "",
    amount: "",
  };

  //         }
  //     } catch (error) {
  //         console.log(error);
  //         Notifation({title: "Xatolik mavjud", type: "success"})

  //     }
  // };

  const handelSubmit = async (values: CreateOrders) => {
    console.log(values);
    const status = await createData(values);
    console.log(status);

    // const payload = {
    //   ...values,
    //   price: Number(values.price),
    //   owner_id: getDataFromCookie("id"),
    // };
    // if (!item.id) {
    //   const status = await createData(payload);
    //   if (status === 201) {
    //     // Notifation({ title: "Muvafaqatiyatli qo'shildi", type: "success" });
    //     handelClose();
    //   } else {
    //     Notifation({ title: "Nimadir xato ☹️", type: "error" });
    //   }
    // } else {
    //   await updateData({ ...payload, id: item.id });
    // }
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
            validationSchema={ordersValidationSchema}
            onSubmit={handelSubmit}
          >
            <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
                Buyurtmalar
              </h1>
              <Field
                as={TextField}
                label="Mijoz ismini kiriting"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="client_full_name"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
               <ErrorMessage
                    name="name"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />

              <Field
                as={TextField}
                label="Mijoz telefon raqami"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="client_phone_number"
                className=" w-[100%]  mb-3 outline-none py-0"
              />
               <ErrorMessage
                    name="client_phone_number"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
              <Field
                as={Select}
                label="Mijoz telefon raqami"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="service_id"
                className=" w-[100%]  mb-3 outline-none py-0"
              >
                <ErrorMessage
                    name="service_id"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />
                {data.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Field>
              <Field
                name="amount"
                as={TextField}
                label="Miqdorini kiriting"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="number"
                className=" w-[100%]  mb-3 outline-none py-0"
                />
                  <ErrorMessage
                    name="amount"
                    component="p"
                    className="mb-3 text-red-500 text-center"
                  />

              <Button
                sx={{ fontSize: "16px", fontWeight: "600" }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                Qo'shish
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default OrdersAddModal;
