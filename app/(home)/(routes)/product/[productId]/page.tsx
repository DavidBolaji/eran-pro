import { productQuery } from "@/actions/data";
import { IProduct } from "@/actions/get-products";
import { ProductCardMini } from "@/components/card/product-card-mini";
import { CollapseComponent } from "@/components/collapsible";
import { Crumb } from "@/components/crumb/crumb";
import { ProductContent } from "@/components/product-content";
import { Typography } from "@/components/typography/typography";
import db from "@/db/db";
import { collapseData, collapseData2 } from "@/utils/data";
import { formatToNaira } from "@/utils/helper";
import React from "react";

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    select: productQuery,
  });

  const relatedProducts = await db.product.findMany({
    where: {
      categoryId: product?.category.id,
    },
    select: productQuery,
  });

  return (
    <div className="bg-gray-100">
      <div className="py-10 lg:px-0 px-4">
        <Crumb
          crumbData={[
            "Home",
            product?.category.name as string,
            product?.name as string,
          ]}
        />
      </div>
      <Typography
        as="h4"
        size="h4"
        align="left"
        className="pb-2 font-bold leading-10 text-4xl black-100 px-4 mb-6 lg:hidden block"
      >
        {product?.name}
      </Typography>
      <div className="flex items-center">
        <Typography
          as="h4"
          size="h4"
          align="left"
          className="font-medium leading-6 text-2xl px-4 black-100 mb-6 lg:hidden block"
        >
          {formatToNaira(product?.price as number)}
        </Typography>
      </div>
      <div className="grid lg:grid-cols-10 grid-cols-6 ">
        <div className="lg:col-span-4 col-span-6">
          <div className=" h-[443px] bg-black rounded-2xl mr-4 lg:ml-0 ml-4"></div>
          <div className="flex items-center lg:px-0 px-4 gap-3 lg:pb-0 pb-8 overflow-x-scroll scrollbar-hide pt-4">
            {["x", "y", "z"].map((el) => (
              <div key={el} className="rounded-2xl bg-black w-24 h-24"></div>
            ))}
          </div>
        </div>
        <div className="col-span-6 lg:px-0 px-4">
          <Typography
            as="h4"
            size="h4"
            align="left"
            className="pb-2 font-bold leading-10 text-4xl black-100 mb-6 lg:block hidden"
          >
            {product?.name}
          </Typography>
          <div className="lg:flex items-center hidden">
            <Typography
              as="h4"
              size="h4"
              align="left"
              className="font-medium leading-6 text-2xl black-100 mb-6 lg:block hidden"
            >
              {formatToNaira(product?.price as number)}
            </Typography>
          </div>
          <ProductContent
            product={product! as unknown as IProduct & { weight: number }}
          />
        </div>
      </div>
      <div className="mt-10 rounded-2xl bg-white">
        <Typography
          align="center"
          as="h5"
          size="h5"
          className="black-100 font-bold pt-10 mb-6"
        >
          Additional Information
        </Typography>
        <div className="lg:grid grid-cols-8 hidden gap-x-4 max-w-[1054px] mx-auto">
          <div className="col-span-4">
            <CollapseComponent data={collapseData} />
          </div>
          <div className="col-span-4">
            <CollapseComponent data={collapseData2} />
          </div>
        </div>
        <div className="lg:hidden grid-cols-8 grid gap-x-4 max-w-[1054px] mx-auto">
          <div className="col-span-8">
            <CollapseComponent data={[...collapseData, ...collapseData2]} />
          </div>
        </div>
      </div>
      <div>
        <Typography
          as="h4"
          size="h4"
          align="center"
          className="mb-10 mt-20 font-bold leading-10 text-4xl black-100"
        >
          Related Product
        </Typography>
        <div className="pb-20 lg:px-0 px-4">
          <div className="grid md:grid-cols-10 grid-cols-4 gap-x-4 gap-y-10">
            {relatedProducts.map((product: IProduct, index: number) => (
              <ProductCardMini key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
