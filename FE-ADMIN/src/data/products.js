export let products = [
  {
    id: 1,
    name: "Trà Ô Long Đặc Sản",
    sku: "TAT-TR-001",
    category: "tra",
    price: 350000,
    stock: 124,
    status: "inStock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAh8P7FWvl0jXebh113rAkifrjvO93Z4h_uaJP6OhrHGVhFWwHZY5v6QUGwfT7y4TJylLxp9mhkZk1ctYFn9YEyjJbn4C7AFIk20QlALRvKrcMNBLDtuBOxCGyZQ5BYW0Dj7tuqt7muX22mNruuX_HuuXaYyEDGcGxadb7uCV_sETqNI2HokTchzYaueR-dGE-onPCNdrPhYbNJ3Scq3gBQPe_UyLAgAqmTu8qllOmmN2kqjiZbqLxZRcb_ld11LtG6GCvAsBvvJ1I",
  },
  {
    id: 2,
    name: "Ấm trà Tử Sa Nghi Hưng",
    sku: "TAT-PK-042",
    category: "phukien",
    price: 1200000,
    stock: 5,
    status: "lowStock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyWjLMQ3HS94yo3TtSRWt8ovaNPO-kLEa_620f-40H3N5GrQnuxCoVIhUTFUyn8MjPrqTiSB6CmHjZpXKIw8B-6NH7chWNc6nW5wg0zP5MjJBBAJ-89QtCh2JrUCUOCvttL8ge_SKfKFygRT3CTeWVHNLnCe6lE1z5btfLDpOIo_tfPKkkQ3n2NgwILNr1eqOXlspHYLHa9e5wNWMTmJHXkFCm-7e2BOXPzzvBLHHpmmo9R4Oo-t7DCMyrJ4_BplFvsRWiVQrCqQk",
  },
  {
    id: 3,
    name: "Trà Xanh Thái Nguyên",
    sku: "TAT-TR-008",
    category: "tra",
    price: 220000,
    stock: 0,
    status: "outStock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVW9FjYDt5XrukZYU1cPV28gPpgx1Xpv72Kr6-W4FyAKx0jabbzOTF4Q3E3G75cl38EUFP54J-z1SqMCukYRpbELFTxITBJ6HyRaJwIsRUDaACC4qy4Axb1uFqzExNYcxeeXL6OrDlalVU0381z40V8k3AlCf5lwLwVhy36vShV_dC9-GP8CLrb-98HWlkEIlfnZP37RME9VNUKCByoNQqy5F71c8N2nxBdVMMrbzOeTKRYYVPDH-_ZiDruy1ZVRaGRYTPLzTKavM",
  },
  {
    id: 4,
    name: "Dụng cụ lọc trà bằng bạc",
    sku: "TAT-PK-015",
    category: "phukien",
    price: 450000,
    stock: 18,
    status: "inStock",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2y0B6-UENXBmC-XtQbAhLsiYkn5xqrIXUUjxkVj2tQni22ff4ZrIftfsnOfOc6OPUnbS5MsjAKVvDVZLfLNfVLxXgsJJhhm1Hl6CNxfTiDavLRdXf1fhUuxZdNZGQ9foODqXWSeeSHRl6iUfyEE4OrKNwmFScsUmjoZb1xmrGya_qngSmKtqH77I13kVOn8FnUnkTmuuifOMbmdsb6om2Lq42vMPh5wtgtT2BDD0fg62yVXd9HnJb1Z2yrlge_2Qls4HsLHoMAgQ",
  },
];
export function addProduct(product) {
  products.push(product);
}