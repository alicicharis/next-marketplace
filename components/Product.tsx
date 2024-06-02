import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

const Product = async ({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: string;
}) => {
  const parsedImages = JSON.parse(images);

  const imageUrl = await fetchQuery(api.products.getImageUrl, {
    imageId: parsedImages[0],
  });

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
        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
