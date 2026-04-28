import * as yup from "yup";

export const login = yup.object({
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  password: yup
    .string()
    .min(6, "رمز عبور حداقل 6 کاراکتر")
    .required("رمز عبور الزامی است"),
});

export const registerStep1 = yup.object({
    email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
})

export const registerStep2 = yup.object({
    verifyCode : yup.string().default("کد تایید نامتعبر است")
    .min(6,"کد تایید حداقل 6 کارکتر است")
    .required("کد تایید الزامی است")
    
})

export const registerStep3 = yup.object({
    phoneNumber : yup.string().min(11,"حداقل شماره تلفن 11 کارکتر است")
    .required("شماره تلفن الزامی است")
    .default("شماره تلفن نامتعبر است"),
    password: yup.string().required("رمز عبور الزامی است")
    .min(8,"حداقل رمز عبور 8  کارکتر است")
    .default("رمز عبور نامتعبر است"),
    passwordRepeat: yup.string().required("رمز عبور الزامی است")
    .min(8,"حداقل رمز عبور 8  کارکتر است")
    
    
})
