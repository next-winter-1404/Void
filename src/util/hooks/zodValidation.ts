import {z} from "zod";

export type ErrorType = z.infer<typeof loginZod | 
typeof verifyCodeZod | typeof finalRegisterZod |typeof verifyEmailZod | typeof resetPassZod
 | typeof passwordChangeZod | typeof profileChangerZod >;

export const loginZod = z.object({
  email: z.string().email("ایمیل معتبر نیست"),

  password: z
    .string()
    .min(8,"حداقل رمز عبور 8  کارکتر است"),
   
});


export const verifyEmailZod = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
});

export const verifyCodeZod = z.object({

  verifyCode : z.string().min(6,"کد تایید حداقل 6 کارکتر است"),
 
})

export const finalRegisterZod = z.object({
  
   phoneNumber : z.string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

 password: z
    .string()
    .min(8,"حداقل رمز عبور 8  کارکتر است"),

  passwordRepeat: z.string().min(8,"حداقل رمز عبور 8  کارکتر است"),

}).superRefine((data, ctx) => {
  if (data.password !== data.passwordRepeat) {
    ctx.addIssue({
      code: 'custom',
      message: 'رمز عبور و تکرار آن مطابقت ندارند',
      path: ['passwordRepeat'],
    });
  }
});

export const  resetPassZod = z.object({
 
 password: z
    .string()
    .min(8,"حداقل رمز عبور 8  کارکتر است"),

  passwordRepeat: z.string().min(8,"حداقل رمز عبور 8  کارکتر است"),

}).superRefine((data, ctx) => {
  if (data.password !== data.passwordRepeat) {
    ctx.addIssue({
      code: 'custom',
      message: 'رمز عبور و تکرار آن مطابقت ندارند',
      path: ['passwordRepeat'],
    });
  }
});


//////profile

export const  profileChangerZod = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
   phone : z.string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
    
   address:z.string().min(5,"آدرس نمی تواند خالی باشد") 

})

export const passwordChangeZod = z.object({

  currentPassword:z.string()
    .min(8,"حداقل رمز عبور 8  کارکتر است"),

  
 newPassword: z
    .string()
    .min(8,"حداقل رمز عبور 8  کارکتر است"),

  repeatNewPassword: z.string().min(8,"حداقل رمز عبور 8  کارکتر است"),

}).superRefine((data, ctx) => {
  if (data.newPassword !== data.repeatNewPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'رمز عبور و تکرار آن مطابقت ندارند',
      path: ['repeatNewPassword'],
    });
  }
});





