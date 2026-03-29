export default function OrderTimeline({ order }) {
  return (
    <div className="bg-white  rounded-xl shadow-sm p-6">

      <h3 className="text-xl font-bold mb-6">
        Order Timeline
      </h3>

      <div className="relative">

        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-primary/20"></div>

        {order.timeline.map((t, i) => (

          <div
            key={i}
            className="relative flex justify-between pl-12 mb-8"
          >

            <div className="absolute left-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">

              <span className="material-symbols-outlined text-sm">
                {t.icon}
              </span>

            </div>


            <div>

              <p className="font-bold">
                {t.title}
              </p>

              <p className="text-sm text-slate-500">
                {t.text}
              </p>

            </div>


            <p className="text-xs text-slate-400">
              {t.time}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}