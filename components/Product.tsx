import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { checkoutCredits } from "@/lib/actions/transaction.action";

const Product = async ({
  title,
  description,
  images,
  price,
}: {
  title: string;
  description: string;
  images: string;
  price: number;
}) => {
  const parsedImages = JSON.parse(images);

  const imageUrl = await fetchQuery(api.products.getImageUrl, {
    imageId: parsedImages[0],
  });

  const onCheckout = async () => {
    "use server";
    console.log("CHECKOUT");
    await checkoutCredits({
      plan: title,
      credits: 1,
      buyerId: "123",
      amount: price,
    });
  };

  return (
    <Card className="cursor-pointer w-fit">
      {imageUrl && (
        <Image src={imageUrl} alt="product" width={200} height={200} />
      )}
      <CardContent className="p-4">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-base font-normal text-start">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <form action={onCheckout}>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Buy
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Product;
