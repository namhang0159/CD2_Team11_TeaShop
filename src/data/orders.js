// export const orders = [
//   {
//     id: "TAT-1234",
//     name: "Hoàng Minh Anh",
//     email: "minhanh@email.com",
//     phone: "0901234567",
//     address: "123 Lê Lợi, Q1, HCM",
//     total: 45,
//     status: "Shipped",
//     date: "Oct 24, 2023",
//   },
//   {
//     id: "TAT-1235",
//     name: "Nguyễn Thu Hà",
//     email: "thuha@email.com",
//     phone: "0912345678",
//     address: "Hà Nội",
//     total: 128,
//     status: "Pending",
//     date: "Oct 23, 2023",
//   },
//   {
//     id: "TAT-1236",
//     name: "Lê Văn Thành",
//     email: "thanh@email.com",
//     phone: "0922222222",
//     address: "Đà Nẵng",
//     total: 72,
//     status: "Delivered",
//     date: "Oct 22, 2023",
//   },
// ];



export const orders = [
  {
    id: "TAT-1234",
    name: "Hoàng Minh Anh",
    email: "minhanh@email.com",
    phone: "0901234567",
    address: "123 Lê Lợi, Quận 1, TP HCM",

    total: 45,
    status: "Shipped",
    date: "Oct 24, 2023",

    payment: "Visa",
    shipping: "Standard Delivery",

    items: [
      {
        name: "Premium Lotus Tea",
        sku: "LAT-001",
        price: 25,
        qty: 1,
        img: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
      },
      {
        name: "Ceramic Tea Set",
        sku: "ACC-104",
        price: 20,
        qty: 1,
        img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      },
    ],

    timeline: [
      {
        title: "Shipped",
        text: "Carrier: Vietnam Post • Tracking: VN1293848",
        time: "Oct 26",
        icon: "local_shipping",
      },
      {
        title: "Payment Confirmed",
        text: "Credit Card Transaction ID: #TXN-9082",
        time: "Oct 24",
        icon: "payments",
      },
      {
        title: "Order Placed",
        text: "Order received from website store",
        time: "Oct 24",
        icon: "check_circle",
      },
    ],
  },

  {
    id: "TAT-1235",
    name: "Nguyễn Thu Hà",
    email: "thuha@email.com",
    phone: "0912345678",
    address: "Hà Nội, Vietnam",

    total: 128,
    status: "Pending",
    date: "Oct 23, 2023",

    payment: "COD",
    shipping: "Express Delivery",

    items: [
      {
        name: "Jasmine Tea",
        sku: "LAT-002",
        price: 50,
        qty: 1,
        img: "https://picsum.photos/100?1",
      },
      {
        name: "Glass Tea Cup",
        sku: "ACC-200",
        price: 78,
        qty: 1,
        img: "https://picsum.photos/100?2",
      },
    ],

    timeline: [
      {
        title: "Pending",
        text: "Waiting for confirmation",
        time: "Oct 23",
        icon: "schedule",
      },
      {
        title: "Order Placed",
        text: "Order created",
        time: "Oct 23",
        icon: "check_circle",
      },
    ],
  },

  {
    id: "TAT-1236",
    name: "Lê Văn Thành",
    email: "thanh@email.com",
    phone: "0922222222",
    address: "Đà Nẵng, Vietnam",

    total: 72,
    status: "Delivered",
    date: "Oct 22, 2023",

    payment: "Bank Transfer",
    shipping: "Standard Delivery",

    items: [
      {
        name: "Oolong Tea",
        sku: "LAT-003",
        price: 72,
        qty: 1,
        img: "https://picsum.photos/100?3",
      },
    ],

    timeline: [
      {
        title: "Delivered",
        text: "Package delivered",
        time: "Oct 25",
        icon: "done",
      },
      {
        title: "Shipped",
        text: "Shipping started",
        time: "Oct 23",
        icon: "local_shipping",
      },
      {
        title: "Order Placed",
        text: "Order created",
        time: "Oct 22",
        icon: "check_circle",
      },
    ],
  },
];