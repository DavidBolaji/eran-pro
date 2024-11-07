import { RenderDashboardcards } from "./components/render-dashboard-cards";
import { RenderProductOrder } from "./components/render-product-order";
import { RenderRevenueProduct } from "./components/render-revenue-product";


interface DashboardSearchParams {
  [key: string]: string;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  console.log(searchParams)


  return (
    <div className="bg-grey-200">
      <RenderDashboardcards />
      <RenderRevenueProduct />
      <RenderProductOrder  />
    </div>
  );
}
