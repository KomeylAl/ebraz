import * as yup from "yup";

export const assessmentSchema = yup.object().shape({
  name: yup.string().required("نام الزامی است"),
  phone: yup.string().required("تلفن الزامی است"),
  date: yup.string().required("تاریخ الزامی است"),
  time: yup.string().required("ساعت الزامی است"),
});
