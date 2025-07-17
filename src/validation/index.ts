import * as yup from "yup";

export const workshopSchema = yup.object().shape({
  title: yup.string().required("عنوان الزامی است"),
  organizers: yup.string().required("برگزار کنندگان الزامی است"),
  description: yup.string().required("توضیحات الزامی است"),
  start_date: yup.string().nullable(),
  end_date: yup.string().nullable(),
  week_day: yup.string().nullable(),
  time: yup.string().nullable(),
  image: yup.mixed().nullable(),
});

export const workshopSessionSchema = yup.object().shape({
  title: yup.string().required("عنوان الزامی است"),
  description: yup.string().required("توضیحات الزامی است"),
  start_time: yup.string().required("زمان شروع الزامی است"),
  end_time: yup.string().required("زمان پایان الزامی است"),
  session_date: yup.string().required("تاریخ برگزاری الزامی است"),
  location: yup.string().nullable(),
  link: yup.string().nullable(),
});

export const workshopParticipantSchema = yup.object().shape({
  name: yup.string().required("نام الزامی است"),
  name_en: yup.string().required("نام انگلیسی الزامی است"),
  phone: yup.string().required("تلفن الزامی است"),
  national_code: yup.string().required("کد ملی الزامی است"),
  gender: yup.string().required("جنسیت الزامی است"),
  approved: yup.boolean().nullable(),
});
