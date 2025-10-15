import * as yup from "yup";

export const assessmentSchema = yup.object().shape({
  client: yup.object({
    name: yup.string().required("نام الزامی است"),
    phone: yup.string().required("تلفن الزامی است"),
  }),
  doctor_id: yup.string().required("انتخاب مشاور الزامی است"),
  date: yup.string().required("تاریخ الزامی است"),
  time: yup.string().required("ساعت الزامی است"),
  status: yup.string().optional().default("pending"),
});
