import {z} from "zod";

export type ErrorType = z.infer<typeof zodSchuma>;

export const zodSchuma = z.object({
  email: z.string().email("ایمیل معتبر نیست"),

  password: z
    .string()
    .min(8,"حداقل رمز عبور 8  کارکتر است"),

   passwordRepeat: z.string().min(8,"حداقل رمز عبور 8  کارکتر است"),

   verifyCode : z.string().min(6,"کد تایید حداقل 6 کارکتر است"),

    phoneNumber : z.string().min(11,"حداقل شماره تلفن 11 کارکتر است")
    .default("شماره تلفن نامتعبر است"),
});

// export const registerStep1 = z.object({
//     email: z.string().email("ایمیل معتبر نیست")
//     // .required("ایمیل الزامی است"),
// })

// export const registerStep2 = z.object({
//     verifyCode : z.string()
//     // .default("کد تایید نامتعبر است")
//     // .required("کد تایید الزامی است")
//     .min(6,"کد تایید حداقل 6 کارکتر است")
    
// })

// export const registerStep3 = z.object({
//     phoneNumber : z.string().min(11,"حداقل شماره تلفن 11 کارکتر است")
//     // .required("شماره تلفن الزامی است")
//     .default("شماره تلفن نامتعبر است"),
//     password: z.string()
//     // .required("رمز عبور الزامی است")
//     .min(8,"حداقل رمز عبور 8  کارکتر است")
//     .default("رمز عبور نامتعبر است"),
//     passwordRepeat: z.string()
//     // .required("رمز عبور الزامی است")
//     .min(8,"حداقل رمز عبور 8  کارکتر است")
    
    
// })
