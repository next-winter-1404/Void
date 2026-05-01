import React from 'react'
import Image from 'next/image'
import Image2 from '@/app/assets/Images/components/rotbebartar/image5.png'
import homestart from '@/app/assets/Images/components/rotbebartar/Frame 80.png'
const Rotbebartart = () => {
  return (
    <div dir='ltr' className='flex  flex-col md:flex-row justify-between gap-5  py-20'>
        <div className='hidden md:block'>
            <Image src={Image2} alt='no' height={400} width={600}></Image>
        </div>
        <div dir='rtl' className='flex flex-col gap-5'>
            <Image  src={homestart} alt='sorry couldnt load:(' height={50} width={50}></Image>
            <h2 className='font-bold text-2xl sm:text-3xl leading-snug'>رتبه برتر در بین وبسایت های رزرو و اجاره ایران</h2>
            <p  className='max-w-xl leading-loose text-sm sm:text-base'>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت 
            </p>
        </div>
    </div>
  )
}

export default Rotbebartart