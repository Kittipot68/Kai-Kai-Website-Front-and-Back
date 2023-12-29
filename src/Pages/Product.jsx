import React from 'react';
import Category from '../Component/Product/Category';
import ProductItem from '../Component/Product/ProductItem'

const products = [
  {
    name: 'เอ็นไก่จัดจ้าน - Spicy Chicken Tendon',
    image: 'path_to_image1.jpg',
  },
  {
    name: 'แหนมเอ็นไก่ - Sour Chicken Tendon',
    image: 'path_to_image2.jpg',
  },
  {
    name: 'สะโพกหมักสไปซี่ - Thigh Meat With Spicy Flavor',
    image: 'path_to_image3.jpg',
  },
  {
    name: 'สะโพกหมักสไปซี่ - Thigh Meat With Spicy Flavor',
    image: 'path_to_image3.jpg',
  },{
    name: 'สะโพกหมักสไปซี่ - Thigh Meat With Spicy Flavor',
    image: 'path_to_image3.jpg',
  },{
    name: 'สะโพกหมักสไปซี่ - Thigh Meat With Spicy Flavor',
    image: 'path_to_image3.jpg',
  },{
    name: 'สะโพกหมักสไปซี่ - Thigh Meat With Spicy Flavor',
    image: 'path_to_image3.jpg',
  },{
    name: 'สะโพกหมักสไปซี่ - Thigh Meat With Spicy Flavor',
    image: 'path_to_image3.jpg',
  },
  // Add more product objects as needed
];

function ProductGrid() {
  return (
   <div><ProductItem /></div>
  );
}

export default ProductGrid;
