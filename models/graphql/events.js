import Event from "../Event";

async function findEvents() {
  const { start, end } = currentWeekDates();
  const a = await Event.find({
    date: {
      $gte: start,
      $lte: end,
    },
  });
  console.log(a, "ovde je a");
  return a;
}

function currentWeekDates() {
  const start = new Date();
  start.setDate(start.getDate() - 3);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setDate(end.getDate() + 3);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}
// const products = [
//   {
//     id: "redshoe",
//     description: "Red Shoe",
//     price: 42.12,
//     reviews: [],
//   },
//   {
//     id: "bluejean",
//     description: "Blue Jeans",
//     price: 55.55,
//     reviews: [],
//   },
// ];

// function getAllProducts() {
//   return products;
// }

// function getProductsByPrice(min, max) {
//   return products.filter((product) => product.price >= min && product.price <= max);
// }
// function getProductById(id) {
//   return products.find((product) => product.id === id);
// }

// function addNewProduct(id, description, price) {
//   const newProduct = {
//     id,
//     description,
//     price,
//     reviews: [],
//   };

//   products.push(newProduct);
//   return newProduct;
// }

// function addNewProductReview(id, rating, comment) {
//   const matchedProduct = getProductById(id);
//   if (matchedProduct) {
//     const newProductReview = {
//       rating,
//       comment,
//     };
//     matchedProduct.reviews.push(newProductReview);
//     return newProductReview;
//   }
// }
module.exports = {
  findEvents,
  // getAllProducts,
  // getProductsByPrice,
  // getProductById,
  // addNewProduct,
  // addNewProductReview,
};
