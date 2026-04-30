import React from 'react'
import Image from 'next/image'
import PIZA from '../../../../../public/components/header/PIZA.png'
import trustme from '../../../../../public/components/footer/trustme.png'
import { footerData } from './FooterItemsDatas'

const FooterComponent = () => {
  return (
    <footer className="w-full border-t border-black bg-white" dir="rtl">
      <div className="max-w mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex-1 max-w-sm space-y-6 text-right">
          <Image src={PIZA} alt="PIZA" width={80} height={80} />
          <div className="text-sm leading-loose text-gray-700">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه
          </div>
          <Image src={trustme} alt="نشان اعتماد" width={120} height={60} />
        </div>

        <div className="
            flex-1
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            gap-8 text-right
            py-10
        ">
          {footerData.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-md mb-3">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className="hover:text-blue-600 transition-colors">
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent