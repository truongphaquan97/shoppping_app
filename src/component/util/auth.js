// //Xuất user
// export const getAuthUserArr = () => {
//   const userArr = localStorage.getItem("userArr");

//   if (!userArr) {
//     return null;
//   }

//   return userArr;
// };

// //Hàm Loader lấy userArr
// export const userArrLoader = () => {
//   const userArr = getAuthUserArr();
//   return userArr;
// };

// //xuất thông tin user đang đăng nhập
// export const getAuthUserCurrent = () => {
//   const userCurrent = localStorage.getItem("userCurrent");

//   if (!userCurrent) {
//     return null;
//   }

//   return userCurrent;
// };

// //Hàm lấy Loader lấy userCurrent
// export const userCurrentLoader = () => {
//   const userCurrent = getAuthUserCurrent();
//   return userCurrent;
// };

// //Xuất thông tin giỏ hàng
// export const getCart = () => {
//   const cart = localStorage.getItem("cart");

//   if (!cart) {
//     return null;
//   }

//   return cart;
// };

// //Hàm lấy thông tin giỏ hàng
// export const cartLoader = () => {
//   const cart = getCart();
//   return cart;
// };
