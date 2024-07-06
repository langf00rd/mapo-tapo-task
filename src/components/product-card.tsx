import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/app/lib/types";

export default function ProductCard(props: { product: Product }) {
  return (
    <li key={props.product.id}>
      <div className="bg-gray-100 relative rounded-md">
        <Image
          src={props.product.thumbnail}
          alt={props.product.title}
          width={500}
          height={500}
        />
        <p className="flex gap-1 items-center font-semibold bg-white w-max p-1 px-2 rounded-md absolute bottom-3 left-3">
          {props.product.rating}
          <Star className="text-green-700" fill="green" size={15} />
        </p>
      </div>
      <div className="py-4 space-y-2">
        <p className="font-semibold uppercase">{props.product.title}</p>
        <p className="text-gray-500 line-clamp-2">
          {props.product.description}
        </p>
        <p className="border-2 px-2 w-max rounded-md">
          {props.product.category}
        </p>
        <div className="flex font-semibold items-center gap-3">
          <p>${props.product.price}</p>

          <p className="text-primary">
            {props.product.discountPercentage}% Off
          </p>
        </div>
      </div>
    </li>
  );
}
