// import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
// import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";


export const signInUP = [
  {
    name: "fullname",
    type: "text",
    placeholder: "Full Name",
    id: "",
    defaultValue: "",
    className: "input-box",
    pageType: 1,
    icon: "input-icon fi fi-rr-user",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    id: "",
    defaultValue: "",
    className: "input-box",
    pageType: 2,
    icon: "input-icon fi fi-rr-envelope",
  },

  {
    name: "password",
    type: "password",
    placeholder: "Password",
    id: "",
    defaultValue: "",
    className: "input-box",
    pageType: 2,
    icon: "input-icon fi fi-sr-key",
    eye_closed: "input-icon fi fi-rs-crossed-eye password-eye-icon",
    eye_opened: "input-icon password-eye-icon fi fi-rr-eye",
  },
];

export const userNavMenu = [
  {
    path: "/editor",
    className: "flex gap-2 link md:hidden pl-8 py-4",
    icon: "fi fi-rr-drawer-alt",
    label: "Write",
    isIcon: true,
  },
  {
    path: "/user",
    className: "flex gap-2 link pl-8 py-4",
    icon: "fi fi-rr-drawer-alt",
    label: "Profile",
    isIcon: false,
  },

  {
    path: "/settings/edit-profile",
    className: "flex gap-2 link pl-8 py-4",
    icon: "fi fi-rr-drawer-alt",
    label: "Settings",
    isIcon: false,
  },

  {
    path: "/dashboard/blogs",
    className: "flex gap-2 link pl-8 py-4",
    icon: "fi fi-rr-drawer-alt",
    label: "Dashboard",
    isIcon: false,
  },
];

// export const products = [
//     {
//         imgURL: shoe4,
//         name: "Nike Air Jordan-01",
//         price: "$200.20",
//     },
//     {
//         imgURL: shoe5,
//         name: "Nike Air Jordan-10",
//         price: "$210.20",
//     },
//     {
//         imgURL: shoe6,
//         name: "Nike Air Jordan-100",
//         price: "$220.20",
//     },
//     {
//         imgURL: shoe7,
//         name: "Nike Air Jordan-001",
//         price: "$230.20",
//     },
// ];
