
import Image from "next/image";

type GalleryProps = {
  images: string[];
};

export default function Gallery({images}:GalleryProps) {
  const main = images[0];    
  const thumbs = images.slice(1, 3);
  const moreCount = images.length - 3;

  return (
    <div className="w-full flex flex-col gap-4">
    
      <div className="rounded-2xl overflow-hidden">
        <Image
          src={main}
          alt="main"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {thumbs.map((src, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden">
            <Image
              src={src}
              alt={`thumb-${idx}`}
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}

        <div className="flex items-center justify-center border rounded-xl text-gray-600">
          <span>{`+${moreCount} عکس دیگر`}</span>
        </div>
      </div>
    </div>
  );
}
