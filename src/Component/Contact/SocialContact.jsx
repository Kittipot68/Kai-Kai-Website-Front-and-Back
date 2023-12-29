import React from 'react';
import shopeeLogo from '../../assets/shopee-banner.png';
import lineshopping from '../../assets/lineshop-banner.png';

function SocialContact() {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-36 ">
      {/* Column 1 */}
      <div className="p-4 border border-gray-300 rounded-md shadow-md flex flex-col items-center justify-start">

      <div>
  <div>
    <p className="text-3xl text-center text-red-600 font-semibold mb-2 opacity-90">สนใจสั่งซื้อสินค้า</p>
  </div>

  <div className='mt-2 flex flex-row justify-center'> {/* Updated to flex-row */}
    <a href='https://shop.line.me/@sungroup/' target="_blank" rel="noopener noreferrer">
      <img
        src={lineshopping}
        alt="Logo"
        className='mt-3 object-cover'
        style={{ width: '150px', height: '55px', marginRight: '10px' }} // Adjust the values as needed
      />
      <p className="text-center text-xl ">Line Shopping</p>
    </a>
    <a href='https://shopee.co.th/sunfoodnae' target="_blank" rel="noopener noreferrer">
      <img
        src={shopeeLogo}
        alt="Logo"
        className='mt-3 object-cover'
        style={{ width: '150px', height: '55px', marginRight: '10px' }} // Adjust the values as needed
      />
      <p className="text-center text-xl ">Shopee Sunfoodnae</p>
    </a>
  </div>
</div>

      </div>


      {/* Column 2 */}
      <div className="p-4 border border-gray-300 rounded-md shadow-md flex flex-col items-center justify-start">
        <div>
          <p className="text-3xl text-red-600 font-semibold mb-2 opacity-90">ติดต่อสำหรับธุรกิจ</p>
        </div>

        {/* Additional content for customers interested in business */}
        <div className='text-xl font-bold'>
          <p className=" text-center">
            สำหรับลูกค้าที่สนใจซื้อสินค้าเพื่อทำธุรกิจ
          </p>
          <p className="text-center">
            รบกวนคุณลูกค้ากรอกข้อมูลความต้องการผ่านลิ้งค์นี้
          </p>
          <p className="text-center p-2">
            <a href="https://linktr.ee/SunfoodbySungroup" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              https://linktr.ee/SunfoodbySungroup
            </a>
          </p>

          <p className="text-center">
            พนักงานขายจะติดต่อกลับเพื่อคุยรายละเอียดสินค้า ราคา และการส่งมอบภายใน 2 วันทำการค่ะ
          </p>
          <p className="text-center">
            (หยุดทำการวันเสาร์-อาทิตย์-วันหยุดนักขัตฤกษ์)
          </p>
          <p className="text-center mt-4">
            กรณียังไม่มีพนักงานขายติดต่อไป รบกวนแจ้งแอดมินเพื่อช่วยประสานงานติดตามให้ค่ะ
          </p>
        </div>

      </div>
    </div>

    // <div className="bg-gray-200 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-stretch justify-center text-gray-800">

    //   <div className="flex flex-col bg-white p-5 shadow-xl rounded-md text-center mb-4 md:mb-0 md:mr-8 md:flex-1">

    //     <div>
    //       <p className="text-2xl text-red-600 font-semibold mb-2 opacity-90">ติดต่อสำหรับธุรกิจ</p>
    //     </div>

    //     <div className="flex row items-center space-y-4">
    //       <p className="text-lg">สำหรับลูกค้าที่สนใจซื้อสินค้าเพื่อทำธุรกิจ</p>
    //       <p className="text-sm">รบกวนคุณลูกค้ากรอกข้อมูลความต้องการผ่านลิ้งค์นี้นะคะ</p>
    //       <a href="https://linktr.ee/SunfoodbySungroup" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">https://linktr.ee/SunfoodbySungroup</a>
    //     </div>
    //   </div>

    //   <div className="flex flex-col text-center bg-white p-5 shadow-xl rounded-md md:flex-1">

    //     <div>
    //       <p className="text-2xl text-red-600 font-semibold mb-2 opacity-90">สนใจสั่งซื้อสินค้า</p>
    //     </div>

    //     <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
    //       <a href='https://shopee.co.th/sunfoodnae' target="_blank" rel="noopener noreferrer">
    //         <img src={shopeeLogo} alt="Shopee Logo" className="w-40 h-auto mb-4 opacity-90" />
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
}

export default SocialContact;
