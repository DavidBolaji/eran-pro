import { FacebookIcon } from "@/constants/icons/facebook";
import { InstagramIcon } from "@/constants/icons/instagram";
import { LinkedInIcon } from "@/constants/icons/linkedin";
import { TwitterIcon } from "@/constants/icons/twitter";

export const footerNav = [
  {
    title: "Shop",
    navs: [
      {
        name: "Chicken",
        link: "",
      },
      {
        name: "Beef",
        link: "",
      },
      {
        name: "Goat",
        link: "",
      },
      {
        name: "Speciality Meats",
        link: "",
      },
      {
        name: "Sale Items",
        link: "",
      },
      {
        name: "Best Sellers",
        link: "",
      },
    ],
  },
  {
    title: "Resources",
    navs: [
      {
        name: "Cooking Tips",
        link: "",
      },
      {
        name: "Recipes",
        link: "",
      },
      {
        name: "Meat Handling Guidelines",
        link: "",
      },
      {
        name: "FAQs",
        link: "",
      },
    ],
  },
  {
    title: "Account",
    navs: [
      {
        name: "Sign In",
        link: "",
      },
      {
        name: "Create Account",
        link: "",
      },
      {
        name: "Order History",
        link: "",
      },
    ],
  },
  {
    title: "Customer Service",
    navs: [
      {
        name: "Contact Us",
        link: "",
      },
      {
        name: "Order Tracking",
        link: "",
      },
      {
        name: "Returns & Refunds",
        link: "",
      },
      {
        name: "Shipping Information",
        link: "",
      },
    ],
  },
  {
    title: "About Us",
    socials: [
      {
        icon: <FacebookIcon />,
      },
      {
        icon: <InstagramIcon />,
      },
      {
        icon: <LinkedInIcon />,
      },
      {
        icon: <TwitterIcon />,
      },
    ],
    navs: [
      {
        name: "Our Story",
        link: "",
      },
      {
        name: "Quality Commitment",
        link: "",
      },
      {
        name: "Meet Our Experts",
        link: "",
      },
    ],
  },
];

export type ICollapseData = {
  key: string;
  label: string;
  children: React.ReactNode;
};


export const collapseData: ICollapseData[] = [
  {
    key: "faq1",
    label: "Is the chicken breast fresh or frozen?",
    children: (
      <p className="bg-white w-full h-full ">
        Our chicken breast is delivered fresh, never frozen, to ensure the best
        quality and flavour.
      </p>
    ),
  },
  {
    key: "faq2",
    label: "How should I store chicken breast after delivery?",
    children: <p className="">hi</p>,
  },
  {
    key: "faq3",
    label: "How long does it take to cook chicken breast?",
    children: <p className="">hi</p>,
  },
  {
    key: "faq4",
    label: "Are your chicken breasts free from hormones and antibiotics?",
    children: <p className="">hi</p>,
  },
];

export const collapseData2: ICollapseData[] = [
  {
    key: "faq5",
    label: "How long does it take to cook chicken breast?",
    children: (
      <p className="">
        Yes, all our chicken is free from added hormones and antibiotics,
        sourced from trusted farms.
      </p>
    ),
  },
  {
    key: "faq6",
    label: "What is the weight of each chicken breast?",
    children: (
      <p className="md:text-[20px] text-[1rem] text-ash_400 md:leading-[2rem] leading-[1.5rem] md:tracking-[-0.025rem] tracking-[-0.02rem]">
        hi
      </p>
    ),
  },
  {
    key: "faq7",
    label: "Do you offer organic chicken breast?",
    children: (
      <p className="md:text-[20px] text-[1rem] text-ash_400 md:leading-[2rem] leading-[1.5rem] md:tracking-[-0.025rem] tracking-[-0.02rem]">
        hi
      </p>
    ),
  },
];