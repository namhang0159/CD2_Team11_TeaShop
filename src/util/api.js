// src/utils/fakeApi.js
export async function getStats() {
  return [
    {
      title: "Tổng doanh thu",
      value: "254.8M ₫",
      icon: "fa-paypal",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Tổng đơn hàng",
      value: "1,245",
      icon: "fa-shopping-cart",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Khách hàng mới",
      value: "312",
      icon: "fa-user-plus",
      change: "+15.3%",
      trend: "up",
    },
    {
      title: "Sản phẩm hoạt động",
      value: "45",
      icon: "fa-box-open",
      change: "Ổn định",
      trend: "stable",
    },
  ];
}

export async function getTopProducts() {
  return [
    {
      name: "Trà Shan Tuyết",
      sold: 245,
      price: "1.2M ₫",
      img: "https://via.placeholder.com/40",
    },
    {
      name: "Trà Ô Long",
      sold: 182,
      price: "850k ₫",
      img: "https://via.placeholder.com/40",
    },
    {
      name: "Bộ Ấm Trà",
      sold: 96,
      price: "2.5M ₫",
      img: "https://via.placeholder.com/40",
    },
    {
      name: "Trà Xanh",
      sold: 154,
      price: "450k ₫",
      img: "https://via.placeholder.com/40",
    },
  ];
}

export async function getRecentOrders() {
  return [
    {
      id: "#DH-00241",
      customer: "Trần Văn Tú",
      product: "Trà Shan Tuyết (x2)",
      date: "12/10/2023",
      price: "2.4M ₫",
      status: "ĐÃ HOÀN THÀNH",
    },
    {
      id: "#DH-00240",
      customer: "Lê Thị Mai",
      product: "Bộ Ấm Trà (x1)",
      date: "12/10/2023",
      price: "2.5M ₫",
      status: "ĐANG XỬ LÝ",
    },
    {
      id: "#DH-00239",
      customer: "Nguyễn Hoàng Nam",
      product: "Trà Ô Long (x5)",
      date: "11/10/2023",
      price: "4.2M ₫",
      status: "ĐANG CHỜ",
    },
    {
      id: "#DH-00238",
      customer: "Phạm Hải Yến",
      product: "Trà Xanh (x1)",
      date: "11/10/2023",
      price: "450k ₫",
      status: "ĐÃ HỦY",
    },
  ];
}
