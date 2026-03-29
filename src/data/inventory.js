export const inventoryData = [
  {
    id: 1,
    name: "Trà Xanh Tân Cương",
    category: "Trà Xanh",
    region: "Thái Nguyên",
    variants: [
      {
        variantId: 1,
        weight: "50g",
        stock: 120,
        batches: [
          { batchCode: "TX-001", quantity: 50, expiry: "2026-12-31" },
          { batchCode: "TX-002", quantity: 70, expiry: "2026-11-30" },
        ],
      },
      {
        variantId: 2,
        weight: "100g",
        stock: 200,
        batches: [{ batchCode: "TX-003", quantity: 200, expiry: "2027-01-15" }],
      },
      {
        variantId: 3,
        weight: "500g",
        stock: 130,
        batches: [{ batchCode: "TX-004", quantity: 130, expiry: "2027-02-01" }],
      },
    ],
    totalStock: 450,
    status: "in_stock",
    updatedAt: "24/05/2024 14:20",
  },

  {
    id: 2,
    name: "Ô Long Tứ Quý",
    category: "Trà Ô Long",
    region: "Lâm Đồng",
    variants: [
      {
        variantId: 4,
        weight: "100g",
        stock: 5,
        batches: [{ batchCode: "OL-001", quantity: 5, expiry: "2026-08-01" }],
      },
      {
        variantId: 5,
        weight: "500g",
        stock: 3,
        batches: [{ batchCode: "OL-002", quantity: 3, expiry: "2026-09-01" }],
      },
    ],
    totalStock: 8,
    status: "low_stock",
    updatedAt: "24/05/2024 09:15",
  },

  {
    id: 3,
    name: "Bạch Trà Shan Tuyết",
    category: "Bạch Trà",
    region: "Hà Giang",
    variants: [
      {
        variantId: 6,
        weight: "50g",
        stock: 0,
        batches: [{ batchCode: "BT-001", quantity: 0, expiry: "2026-10-10" }],
      },
    ],
    totalStock: 0,
    status: "out_of_stock",
    updatedAt: "23/05/2024 22:05",
  },

  {
    id: 4,
    name: "Trà Sen Hồ Tây",
    category: "Trà Ướp Hoa",
    region: "Hà Nội",
    variants: [
      {
        variantId: 7,
        weight: "100g",
        stock: 120,
        batches: [{ batchCode: "TS-001", quantity: 120, expiry: "2026-12-01" }],
      },
    ],
    totalStock: 120,
    status: "in_stock",
    updatedAt: "24/05/2024 10:30",
  },
];
