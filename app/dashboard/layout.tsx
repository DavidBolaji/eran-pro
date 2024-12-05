import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Sidebar } from "./components/sidebar";
import { DashboardHeader } from "./components/dashboard-header";
import { CategoryDrawer } from "@/components/drawer/category-drawer/category-drawer";
import Loading from "@/components/loading";


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout
    
    >
      <Sidebar />
      <Layout
       
      >
       <DashboardHeader />
        <Content
          style={{
            // padding: 16,
            minHeight: "89vh",
            height: "89vh",
           
          }}
          className={`overflow-auto scrollbar-hide`}
        >
           <Loading />
          {children}
          <CategoryDrawer />
        </Content>
      </Layout>
    </Layout>
  );
}

{
  /* <div className="bg-grey-200">
<div className="w-full">
  <div className="fixed w-1/6">
    <Sidebar />
  </div>
  <div className="fixed w-5/6 left-56">
    <main className="">
      <DashboardHeader />
      <div className="p-6 w-4/6">{children}</div>
    </main>
  </div>
</div>
</div> */
}
// {/* <Layout>
// <div className={`h-full md:block hidden ${regularFont.className}`}>
//   <Sider
//     trigger={null}
//     collapsible
//     collapsed={collapsed}
//     style={{
//       backgroundColor: '#000',
//       height: '100vh',
//       maxHeight: '100vh',
//       position: 'sticky',
//       top: 0,
//       zIndex: 300,
//     }}
//     width={248}
//     className="pt-10 px-[12px]"
//   >
//     <DashboardMenu collapsed={collapsed} />
//   </Sider>
// </div>
// <Layout
//   style={{
//     background: '#faf9f9',
//   }}
// >
//   <Header
//     className="shadow-lg"
//     style={{
//       paddingLeft: 0,
//       paddingRight: '100px',
//       background: '#fff',
//     }}
//     id="shadow"
//   >
//     <div className="md:hidden block absolute w-full z-50">
//       <DashboardNav />
//     </div>
//     <div className="md:block hidden ">
//       <div className="flex h-full justify-between">
//         <button
//           type="button"
//           onClick={() => setCollapsed(!collapsed)}
//           className="bg-[#333333] "
//         >
//           {collapsed ? (
//             <PiCaretDoubleRightBold color="white" size={12} />
//           ) : (
//             <PiCaretDoubleLeftBold color="white" size={12} />
//           )}
//         </button>
//         <div
//           className={`flex ${regularFont.className} transition-color `}
//         >
//           {permissionGranted && (
//             <>
//               <div
//                 className="hover:text-orange cursor-pointer text-black"
//                 onClick={() => handleClick('/dashboard/school/new')}
//               >
//                 Add School
//               </div>
//               <div className="ml-[24px]">
//                 <Link
//                   className="hover:text-orange text-black"
//                   href="/dashboard/jobs"
//                 >
//                   Find a job
//                 </Link>
//               </div>
//               <div
//                 className="ml-[24px] hover:text-orange text-black cursor-pointer"
//                 onClick={() =>
//                   handleClick('/dashboard/school/new?post_job=1')
//                 }
//               >
//                 Post a job
//               </div>
//               <div className="mx-[20px] -mt-4 flex items-center">
//                 <NotificationDropdown mobile={false} />
//               </div>
//             </>
//           )}
//           <DropdownComponent isAdmin={isSchAdmin} />
//           <div className="scale-75 mt-20 translate-x-24">
//             <a
//               href={'https://wa.me/+2347067799302'}
//               rel="noreferrer"
//               target="_blank"
//             >
//               <Whatsapp2 />
//             </a>
//           </div>
//           {/* <Whatsapp2 /> */}
//         </div>
//       </div>
//     </div>
//   </Header>

//   <Content
//     style={{
//       padding: '0px 12px 150px 12px',
//       marginTop: 50,
//       minHeight: '100vh',
//       height: '100vh',
//     }}
//     className={`overflow-auto md:mx-[24px] md:py-[24px] px-5 py-10 no-s ${regularFont.className}`}
//   >
//     {props.children}
//   </Content>
// </Layout>
// </Layout> */}
