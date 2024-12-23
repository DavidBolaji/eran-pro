import { productQuery } from "@/actions/data";
import { IProduct } from "@/actions/get-products";
import { ProductCardMini } from "@/components/card/product-card-mini";
import { CollapseComponent } from "@/components/collapsible";
import { Crumb } from "@/components/crumb/crumb";
import { ProductContent } from "@/components/product-content";
import { Typography } from "@/components/typography/typography";
import db from "@/db/db";
import { collapseData, ICollapseData } from "@/utils/data";
import { formatToNaira } from "@/utils/helper";
import { Product } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import React from "react";

interface ProductPageProps {
  params: { productId: string };
}
export const revalidate = 0;

export const dynamicParams = true;


export async function generateStaticParams() {
    const products = await db.product.findMany({})
    return products.map((blog: Product) => ({
        id: blog.id,
    }));
}

export async function generateMetadata(
    { params }: ProductPageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.productId;

    // fetch data
    const product = await db.product.findUnique({ where: { id }, include: {images: true} })

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    if (!product) {
        return {
            title: "Not Found",
            description: `Product does not exist`,
        };
    }

    return {
        title: product?.name,
        description: product?.description,
        openGraph: {
            images: [product?.images[0].url, ...previousImages],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    select: productQuery,
  });

  const faqs = await db.faq.findMany();

  const relatedProducts = await db.product.findMany({
    where: {
      categoryId: product?.category.id,
    },
    select: productQuery,
  });

  // Process FAQs into the required structure for `CollapseComponent`
  const formattedFaqs: ICollapseData[] = faqs.map((faq) => ({
    key: faq.id, // Assuming FAQ has a unique ID field
    label: faq.question, // Assuming FAQ has a `question` field
    children: (
      <p className="bg-white w-full h-full">{faq.answer}</p> // Assuming FAQ has an `answer` field
    ),
  }));

  // Split FAQs for larger screens
  const halfIndex = Math.ceil(formattedFaqs.length / 2);
  const firstColumnData = formattedFaqs.slice(0, halfIndex);
  const secondColumnData = formattedFaqs.slice(halfIndex);

  return (
    <div className="bg-gray-100">
      <div className="py-10 lg:px-0 px-4">
        <Crumb
          crumbData={[
            {
              text: "Home",
              href: "/",
            },
            {
              text: product?.category?.name || "Category",
              href: "#",
            },
            {
              text: product?.name || "Product",
              href: "",
            },
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
          <div className="h-[443px] relative flex items-center justify-center bg-white rounded-2xl mr-4 lg:ml-0 ml-4">
            <Image
              fill
              className="w-full h-full object-contain absolute"
              src={product?.images[0]?.url || "/placeholder-image.png"}
              alt={product?.category?.name || "Product Image"}
            />
          </div>
          <div className="flex items-center lg:px-0 px-4 gap-3 lg:pb-0 pb-8 overflow-x-scroll scrollbar-hide pt-4">
            {product?.images.map((el) => (
              <div
                key={el.url}
                className="rounded-2xl flex relative items-center justify-center bg-white w-24 h-24"
              >
                <Image
                  fill
                  className="w-full h-full object-contain absolute"
                  src={el.url}
                  alt={product?.category?.name || "Product Image"}
                />
              </div>
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
            <CollapseComponent data={firstColumnData} />
          </div>
          <div className="col-span-4">
            <CollapseComponent data={secondColumnData} />
          </div>
        </div>
        <div className="lg:hidden grid-cols-8 grid gap-x-4 max-w-[1054px] mx-auto">
          <div className="col-span-8">
            <CollapseComponent data={[...collapseData]} />
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
          Related Products
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
}
