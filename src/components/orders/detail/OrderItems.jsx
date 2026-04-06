export default function OrderItems({ order }) {
  const items = order?.items || [];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold">Order Items</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-green-50 text-sm">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-center">Qty</th>
              <th className="px-6 py-4 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const product = item?.variant?.product;

              return (
                <tr key={item.id} className="border-t hover:bg-green-50">
                  {/* PRODUCT */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">IMG</span>
                      </div>

                      <div>
                        <p className="font-bold">{product?.name}</p>

                        <p className="text-xs text-slate-500">
                          {item?.variant?.option_name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4">
                    {Number(item?.price_at_purchase || 0).toLocaleString()} ₫
                  </td>

                  {/* QTY */}
                  <td className="px-6 py-4 text-center">{item?.quantity}</td>

                  {/* TOTAL */}
                  <td className="px-6 py-4 text-right font-bold text-green-600">
                    {Number(
                      item?.price_at_purchase * item?.quantity || 0,
                    ).toLocaleString()}{" "}
                    ₫
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* TOTAL */}
          <tfoot>
            <tr className="bg-green-50">
              <td colSpan="3" className="px-6 py-4 text-right font-medium">
                Total
              </td>

              <td className="px-6 py-4 text-right font-bold text-green-600">
                {Number(order?.total_amount || 0).toLocaleString()} ₫
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
