import React from "react";

const SettingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Coming Soon</h1>

        <p className="text-lg md:text-xl text-gray-300 mb-4">
          Trang này đang được xây dựng
        </p>

        <p className="text-gray-400 mb-8">
          Chúng tôi sẽ sớm ra mắt trong thời gian tới. Hãy quay lại sau nhé!
        </p>

        <div className="animate-pulse text-sm text-gray-500">
          Thiên An Tea đang chuẩn bị điều đặc biệt 🔥
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
