import { MegamenuItem, NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";
import __megamenu from "./jsons/__megamenu.json";


const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Online booking",
  },
  {
    id: ncNanoId(),
    href: "/home-2",
    name: "Real estate",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/home-3",
    name: "Home 3",
    isNew: true,
  },
];

const otherPageChildMenus: NavItemType[] = [
  { id: ncNanoId(), href: "/blog", name: "Blog page" },
  { id: ncNanoId(), href: "/blog/single" as Route, name: "Blog single" },
  { id: ncNanoId(), href: "/about", name: "About" },
  { id: ncNanoId(), href: "/contact", name: "Contact us" },
  { id: ncNanoId(), href: "/login", name: "Login" },
  { id: ncNanoId(), href: "/signup", name: "Signup" },
];

const templatesChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/add-listing/1" as Route,
    name: "Add listing",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/add-listing/1" as Route,
        name: "Add listing 1",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/2" as Route,
        name: "Add listing 2",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/3" as Route,
        name: "Add listing 3",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/4" as Route,
        name: "Add listing 4",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/5" as Route,
        name: "Add listing 5",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/6" as Route,
        name: "Add listing 6",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/7" as Route,
        name: "Add listing 7",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/8" as Route,
        name: "Add listing 8",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/9" as Route,
        name: "Add listing 9",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/10" as Route,
        name: "Add listing 10",
      },
    ],
  },
  //
  { id: ncNanoId(), href: "/checkout", name: "Checkout" },
  { id: ncNanoId(), href: "/pay-done", name: "Pay done" },
  //
  { id: ncNanoId(), href: "/author", name: "Author page" },
  { id: ncNanoId(), href: "/account", name: "Account page" },
  //
  {
    id: ncNanoId(),
    href: "/subscription",
    name: "Subscription",
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Listing Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/listing-stay",
        name: "Stay listings",
        type: "dropdown",
        children: [
          { id: ncNanoId(), href: "/listing-stay", name: "Stay page" },
          {
            id: ncNanoId(),
            href: "/listing-stay-map",
            name: "Stay page (map)",
          },
          { id: ncNanoId(), href: "/listing-stay-detail", name: "Stay Detail" },
        ],
      },

      //
      {
        id: ncNanoId(),
        href: "/listing-experiences",
        name: "Experiences listings",
        type: "dropdown",
        children: [
          {
            id: ncNanoId(),
            href: "/listing-experiences",
            name: "Experiences page",
          },
          {
            id: ncNanoId(),
            href: "/listing-experiences-map",
            name: "Experiences page (map)",
          },
          {
            id: ncNanoId(),
            href: "/listing-experiences-detail",
            name: "Experiences Detail",
          },
        ],
      },

      //
      {
        id: ncNanoId(),
        href: "/listing-car",
        name: "Cars listings",
        type: "dropdown",
        children: [
          { id: ncNanoId(), href: "/listing-car", name: "Cars page" },
          { id: ncNanoId(), href: "/listing-car-map", name: "Cars page (map)" },
          { id: ncNanoId(), href: "/listing-car-detail", name: "Car Detail" },
        ],
      },

      //
      {
        id: ncNanoId(),
        href: "/listing-real-estate",
        name: "Real Estate Listings",
        type: "dropdown",
        children: [
          {
            id: ncNanoId(),
            href: "/listing-real-estate",
            name: "Real Estate Listings",
          },
          {
            id: ncNanoId(),
            href: "/listing-real-estate-map",
            name: "Real Estate Maps",
          },
        ],
      },
      //
      {
        id: ncNanoId(),
        href: "/listing-flights",
        name: "Flights listings",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/author",
    name: "Templates",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  {
    id: ncNanoId(),
    href: "/blog",
    name: "Other pages",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];
