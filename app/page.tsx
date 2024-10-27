import { getCategories } from "@/actions/get-categories";
import { getProducts, IProduct } from "@/actions/get-products";
import { EnhanceCard } from "@/components/card/enhance-card";
import { FoodCard } from "@/components/card/food-card";
import { FreshMeatCard } from "@/components/card/fresh-meat-card";
import { ProductCardMini } from "@/components/card/product-card-mini";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Header2 } from "@/components/header/header2";
import { HeroSection } from "@/components/sections/hero-section";
import { ShoppingComponent } from "@/components/sections/shopping-component";

import { Typography } from "@/components/typography/typography";
import { Wrapper } from "@/components/wrapper/wrapper";
export const revalidate = 0;

interface HomeSearchParams {
  [key: string]: string;
}

export default async function Home({

  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
  const categories = await getCategories();
  const categoryName = searchParams?.name || "All Categories";
  const categoryId = searchParams?.category || "1";
  const products = await getProducts(categoryId);
  const allProducts = await getProducts('');

  return (
    <div className="bg-grey-200">

      <Header2 />
      <Header />
      <HeroSection />
      <Wrapper>
        <Typography as="h4" size="h4" align="left" className="font-bold">
          Shop by Meat Category: Find Your Perfect Cut 🍗🥩
        </Typography>
        <Typography as="p" size="s1" align="left" className="pb-10">
          Discover fresh, top-quality chicken, turkey, beef, and goat. Browse
          and order the perfect cut for any meal!
        </Typography>
      </Wrapper>
      <ShoppingComponent
        categories={categories}
        categoryName={categoryName}
        products={[...products]}
      />
      <Wrapper>
        <div className="grid grid-cols-10 mt-20 gap-x-4 pb-20">
          <div className="col-span-4">
            <FreshMeatCard />
          </div>
          {["a", "b", "c"].map((el: string) => (
            <div key={el} className="col-span-2">
              <FoodCard />
            </div>
          ))}
        </div>
      </Wrapper>
      <Wrapper>
        <Typography as="h4" size="h4" align="left" className="font-bold">
          Selling Fast: Get Them Before They&apos;re Gone! 🚀
        </Typography>
        <Typography as="p" size="s1" align="left" className="pb-10">
          Discover fresh, top-quality chicken, turkey, beef, and goat. Browse
          and order the perfect cut for any meal!
        </Typography>
        <div className="pb-20">
          <div className="grid grid-cols-10 gap-x-4 gap-y-10">
            {allProducts.map((product: IProduct, index: number) => (
              <ProductCardMini key={index} product={product} />
            ))}
          </div>
        </div>
        <EnhanceCard />
      </Wrapper>

      <Footer />
    </div>
  );
}
