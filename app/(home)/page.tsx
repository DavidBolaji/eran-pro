import { getCategories } from "@/actions/get-categories";
import { getProducts, IProduct } from "@/actions/get-products";
import { EnhanceCard } from "@/components/card/enhance-card";
import { FoodCard } from "@/components/card/food-card";
import { FreshMeatCard } from "@/components/card/fresh-meat-card";
import { ProductCardMini } from "@/components/card/product-card-mini";
// import { Footer } from "@/components/footer/footer";
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
  const allProducts = await getProducts("");

  return (
    <div className="bg-grey-200">
      <HeroSection />
      <Wrapper>
        <Typography
          as="h4"
          size="h4"
          align="left"
          className="font-bold md:pb-0 pb-2 lg:px-0 px-4 black-100"
        >
          Shop by Meat Category: Find Your Perfect Cut 🍗🥩
        </Typography>
        <Typography
          as="p"
          size="s1"
          align="left"
          className="md:pb-10 lg:px-0 md:px-4 px-4 black-100"
        >
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
        <div className="md:grid grid-cols-10 md:mt-20 gap-x-4 pb-20 md:px-0 hidden">
          <div className="md:col-span-4 col-span-10 md:mb-0 mb-4">
            <FreshMeatCard />
          </div>
          {["a", "b", "c"].map((el: string) => (
            <div key={el} className="md:col-span-2 md:mt-0 mt-6 md:mb-0 mb-4">
              <FoodCard />
            </div>
          ))}
        </div>
        <div className="md:hidden block">
          <FreshMeatCard />
          <div className="flex px-4 gap-x-4 overflow-x-scroll mt-6 mb-12 scrollbar-hide">
            {["a", "b", "c"].map((food) => (
              <FoodCard key={food} />
            ))}
          </div>
        </div>
      </Wrapper>
      <Wrapper>
        <Typography
          as="h4"
          size="h4"
          align="left"
          className="font-bold lg:px-0 px-4 black-100"
        >
          Selling Fast: Get Them Before They&apos;re Gone! 🚀
        </Typography>
        <Typography
          as="p"
          size="s1"
          align="left"
          className="pb-10 lg:px-0 px-4 black-100"
        >
          Discover fresh, top-quality chicken, turkey, beef, and goat. Browse
          and order the perfect cut for any meal!
        </Typography>
        <div className="pb-20 lg:px-0 px-4">
          <div className="grid md:grid-cols-10 grid-cols-4 gap-x-4 gap-y-10">
            {allProducts.map((product: IProduct, index: number) => (
              <ProductCardMini key={index} product={product} />
            ))}
          </div>
        </div>
        <EnhanceCard />
        <div className="pb-20" />
      </Wrapper>     
    </div>
  );
}
