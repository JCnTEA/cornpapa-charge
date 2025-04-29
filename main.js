import React, { useEffect, useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';

const mockVehicles = [
  { zone: 'A區', name: 'Model 3 Highland', battery: 87, charging: '充電中', range: 356 },
  { zone: 'A區', name: 'Model Y Long Range', battery: 56, charging: '未充電', range: 221 },
  { zone: 'B區', name: 'Model S Plaid', battery: 92, charging: '充電中', range: 432 }
];

const mockProduct = {
  name: '特斯拉中控HUB集線器',
  img: 'https://fakeimg.pl/300x200/?text=HUB商品圖',
  link: 'https://shopee.tw/cornpapa_hub'
};

function ChargeMonitor() {
  const [vehicles, setVehicles] = useState([]);
  const [productVisible, setProductVisible] = useState(false);

  useEffect(() => {
    setVehicles(mockVehicles);

    const productTimer = setInterval(() => {
      setProductVisible(true);
      setTimeout(() => setProductVisible(false), 10000);
    }, 300000);

    const refreshTimer = setInterval(() => {
      console.log('⏳ 模擬刷新車輛資訊（30秒）');
    }, 30000);

    return () => {
      clearInterval(productTimer);
      clearInterval(refreshTimer);
    };
  }, []);

  return React.createElement('div', { className: 'p-6 min-h-screen' }, [
    React.createElement('h1', { className: 'text-3xl font-bold mb-4 text-[#ff8200]' }, 'CORN PAPA 車輛充電監控'),
    ...['A區', 'B區'].map(zone =>
      React.createElement('div', { key: zone, className: 'mb-6' }, [
        React.createElement('h2', { className: 'text-xl font-semibold text-[#ff8200] mb-2' }, `【${zone}】`),
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' },
          vehicles.filter(v => v.zone === zone).map((v, i) =>
            React.createElement('div', { key: i, className: 'border border-gray-300 rounded-2xl p-4 shadow' }, [
              React.createElement('h3', { className: 'text-lg font-bold mb-1' }, v.name),
              React.createElement('p', null, ['🔋 電量：', React.createElement('span', { className: 'text-[#ff8200] font-bold' }, `${v.battery}%`)]),
              React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-3 mt-1 mb-2 overflow-hidden' },
                React.createElement('div', {
                  className: 'h-3 bg-green-500',
                  style: { width: `${v.battery}%`, transition: 'width 1s ease-in-out' }
                })
              ),
              React.createElement('p', null, ['⚡ 狀態：', React.createElement('span', { className: 'text-[#ff8200] font-bold' }, v.charging)]),
              React.createElement('p', null, `🚗 續航：約 ${v.range} 公里`)
            ])
          )
        )
      ])
    ),
    productVisible && React.createElement('div', {
      className: 'fixed bottom-4 right-4 bg-white border border-[#ff8200] shadow-lg rounded-xl p-4 w-80'
    }, [
      React.createElement('h4', { className: 'text-[#ff8200] font-bold mb-2' }, '🔥 今日推薦'),
      React.createElement('img', { src: mockProduct.img, className: 'mb-2 rounded' }),
      React.createElement('p', { className: 'font-semibold mb-1' }, mockProduct.name),
      React.createElement('a', {
        href: mockProduct.link,
        target: '_blank',
        className: 'text-sm text-blue-600 underline'
      }, '立即購買')
    ])
  ]);
}

ReactDOM.render(React.createElement(ChargeMonitor), document.getElementById('root'));