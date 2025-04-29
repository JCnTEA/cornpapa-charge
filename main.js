import React, { useEffect, useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

function ChargeMonitor() {
  const [vehicleData, setVehicleData] = useState(null);

  // ✅ TeslaFi API 載入函式
  async function fetchTeslaFiData() {
    const apiKey = '你的_API_KEY_貼這'; // 👈 請改成你的 TeslaFi API Key
    const url = `https://www.teslafi.com/feed.php?command=lastGood&token=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setVehicleData(data);
    } catch (err) {
      console.error("TeslaFi API 失敗", err);
    }
  }

  useEffect(() => {
    fetchTeslaFiData(); // 首次載入
    const timer = setInterval(fetchTeslaFiData, 30000); // 每30秒更新
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-4 text-[#ff8200]">CORN PAPA 車輛充電監控</h1>
      {vehicleData ? (
        <div className="border p-4 rounded-xl shadow max-w-md">
          <h2 className="text-xl font-bold mb-2">{vehicleData.car_version}</h2>
          <p>🔋 電量：<span className="text-green-600 font-bold">{vehicleData.battery_level}%</span></p>
          <div className="w-full bg-gray-200 rounded-full h-3 my-2">
            <div className="bg-green-500 h-3" style={{ width: `${vehicleData.battery_level}%`, transition: 'width 0.5s' }}></div>
          </div>
          <p>⚡ 狀態：<span className="text-[#ff8200]">{vehicleData.charging_state}</span></p>
          <p>🚗 續航：約 {vehicleData.ideal_battery_range} 公里</p>
        </div>
      ) : (
        <p>📡 載入中...</p>
      )}
    </div>
  );
}

ReactDOM.render(<ChargeMonitor />, document.getElementById('root'));
