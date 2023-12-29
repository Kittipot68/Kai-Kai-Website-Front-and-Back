import React from 'react';

function ContactUs() {
  const content = [
    {
      address:
        'สำนักงานใหญ่ : เลขที่1/97-98 ถนนพหลโยธิน 40 แขวงเสนานิคม เขตจตุจักร กรุงเทพฯ 10900',
      tel: 'โทรศัพท์ : (66) 2561-1455',
      email: 'อีเมล: example@example.com',
    },
  ];

  return (
    <div className="bg-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8 mb-4">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 flex flex-col md:flex-row justify-center md:justify-between items-center">
            <div className="text-xl text-gray-800">
              {content.map((item, index) => (
                <div key={index}>
                  <p className="font-bold mb-2">{item.address}</p>
                  <p className="font-bold mb-2">{item.tel}</p>
                  <p className="font-bold">{item.email}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-4 md:mt-0">
              <div className="flex space-x-4">
                <i className="text-green-500 fab fa-line text-4xl"></i>
                <i className="text-blue-500 fab fa-facebook text-4xl"></i>
                <i className="text-red-500 fab fa-youtube text-4xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
