<<<<<<< HEAD
import { toPersianFormat } from "@/util/helper/persionFormat";
=======
import { toPersianFormat } from "@/util/helper/persianFormat";
>>>>>>> mersad

type PriceProps = {
  price: number;      
  discount?: number;  
  currency?: string; 
};

export default function Price({ price, discount = 0, currency = "تومان" }: PriceProps) {
  const hasDiscount = discount > 0;

  const finalPrice = hasDiscount ? Math.round(price - price * (discount / 100)) : price;

  return (
    <div className="flex items-center gap-3">

      <div className="flex items-center gap-2 text-[20px] max-md:text-[12px]">

      
        {hasDiscount && (
          <span className="text-gray-400 line-through">
            {toPersianFormat(price)} {currency}
          </span>
        )}

        <span className="text-black font-bold text-base">
          {toPersianFormat(finalPrice)} {currency}
        </span>
      </div>

       {hasDiscount && (
        <span className="bg-red-600 text-white  text-[12px] px-2 py-1 rounded-full">
          {toPersianFormat(discount)}٪
        </span>
      )}
    </div>
  );
}
