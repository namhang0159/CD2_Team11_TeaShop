export const inventoryData = [
  {
    id: 1,
    importCode: "IMP-001",
    importDate: "2024-05-24 14:20:00",
    supplierId: 1,
    supplierName: "Công ty Trà Thái Nguyên",
    phone: "0123456789",
    address: "123 Đường Trà, TP. Thái Nguyên",
    totalAmount: 3200000,
    status: "Received",
    note: "Nhập hàng từ nhà cung cấp chính, kiểm tra chất lượng sản phẩm trước khi nhập kho.",
    items: [
      {
        id: 101,
        variantId: 1,
        productName: "Trà Xanh Thượng Hạng",
        optionName: "200g",

        batchCode: "BATCH_TX_001",
        quantity: 50,
        importPrice: 80000,
        expiryDate: "2026-12-31",

        stockAfterImport: 150,
      },

      {
        id: 102,
        variantId: 2,
        productName: "Trà Ô Long Cao Cấp",
        optionName: "100g",

        batchCode: "BATCH_OL_002",
        quantity: 30,
        importPrice: 70000,
        expiryDate: "2026-12-31",

        stockAfterImport: 80,
      },
    ],
  },
  {
    id: 2,
    importCode: "IMP-002",
    importDate: "2024-05-25 09:15:00",
    supplierId: 2,
    supplierName: "Trang trại Trà Lâm Đồng",
    totalAmount: 1500000,
    status: "Received",
    phone: "0987654321",
    address: "456 Đường Trà, TP. Lâm Đồng",
    note: "Nhập hàng từ trang trại, cần kiểm tra kỹ về hạn sử dụng và chất lượng sản phẩm.",
    items: [
      {
        id: 201,
        variantId: 3,
        productName: "Trà Ô Long Cao Cấp",
        optionName: "200g",

        batchCode: "BATCH_OL_003",
        quantity: 20,
        importPrice: 120000,
        expiryDate: "2026-12-31",

        stockAfterImport: 100,
      },
    ],
  },
];
