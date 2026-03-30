export default function OrderItems({ order }) {
  return (
    <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="p-6">
        <h3 className="text-xl font-bold">Order Items</h3>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">

          {/* HEAD */}
          <thead className="bg-primary/5 text-slate-600 dark:text-slate-400 text-sm bg-green-50">
            <tr>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold text-center">Qty</th>
              <th className="px-6 py-4 font-semibold text-right">Total</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-primary/5">
            {order.items.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-primary/5 transition-colors"
              >
                {/* PRODUCT */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">

                    {/* IMAGE */}
                    <div className="w-16 h-16 rounded-lg bg-background-light overflow-hidden flex-shrink-0 text-black">
                      <img 
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover  text-black"
                      />
                    </div>

                    {/* INFO */}
                    <div>
                     <p className="font-bold text-slate-900 ">
  {item.name}
</p>
                      <p className="text-xs text-slate-500">
                        SKU: {item.sku}
                      </p>
                    </div>

                  </div>
                </td>

                {/* PRICE */}
                <td className="px-6 py-4 font-medium">
                  ${item.price}
                </td>

                {/* QTY */}
                <td className="px-6 py-4 text-center">
                  {item.qty}
                </td>

                {/* TOTAL */}
                <td className="px-6 py-4 text-right font-bold text-primary text-green-600">
                  ${item.price * item.qty}
                </td>
              </tr>
            ))}
          </tbody>

          {/* FOOTER */}
          <tfoot className="bg-primary/5 bg-green-50">
            <tr>
              <td
                colSpan="3"
                className="px-6 py-4 text-right font-medium text-slate-600"
              >
                Subtotal
              </td>
              <td className="px-6 py-4 text-right font-bold text-primary">
                ${order.total}
              </td>
            </tr>
          </tfoot>

        </table>
      </div>
    </div>
  );
}