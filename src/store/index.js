import { createStore } from "redux";
import { combineReducers } from "redux";

//Hàm reducer dùng để ẩn/hiện
const toggleReducer = (state = { data: null, chat: false }, action) => {
  //Hiện popup ở trang HomePage
  if (action.type === "SHOW_POPUP") {
    return {
      ...state,
      data: action.data,
    };
  }

  //Ẩn popup ở trang HomePage
  if (action.type === "HIDE_POPUP") {
    return {
      ...state,
      data: null,
    };
  }

  //Đóng/mở livechat
  if (action.type === "LIVE_CHAT") {
    return {
      chat: action.payload.toggle,
    };
  }
  return state;
};

//HÀm reducer dùng để lưu thogn6 tin lien quan đến giỏ hàng, đăng xuất/nhập
const cartReducer = (
  state = {
    listItem: [],
    allItem: [],
    auth: JSON.parse(localStorage.getItem("userCurrent")) ?? null,
    listCart: [],
    category: "",
  },
  action
) => {
  //Lọc theo category ở trang ShopPage
  if (action.type === "FILTER") {
    localStorage.setItem("array", JSON.stringify(action.payload.data));

    return {
      ...state,
      listItem: action.payload.data.filter(
        (product) => product.category === action.payload.category
      ),
      category: action.payload.category,
    };
  }

  //Hiên hết sản phẩm ở ShopPage
  if (action.type === "ALL") {
    localStorage.setItem("array", JSON.stringify(action.payload.data));
    return {
      ...state,
      listItem: action.payload.data,
      category: action.payload.category,
    };
  }

  //Đăng nhập
  if (action.type === "ON_LOGIN") {
    localStorage.setItem("userCurrent", JSON.stringify(action.payload.current));
    return {
      auth: action.payload.current,
    };
  }

  //Đăng xuất
  if (action.type === "ON_LOGOUT") {
    localStorage.removeItem("userCurrent");
    localStorage.removeItem("token");
    return {
      auth: null,
    };
  }

  //Thêm sản phẩm vào giỏ hàng
  if (action.type === "ADD_CART") {
    const dataCart = JSON.parse(localStorage.getItem("cart")) ?? [];

    //Tìm sản phẩm đó trong các sản phẩm có trong cart trước đó
    const findData = dataCart.find(
      (product) => product.data.id.$oid === action.payload.data.id.$oid
    );

    //Nếu có chọn trươc đó thì cập nhật số lượng lại
    if (findData) {
      console.log(findData.quantity);
      findData.quantity = action.payload.quantity + findData.quantity;
      console.log(action.payload.quantity);
    }

    //Nếu chưa chọn thì lưu sản phẩm vừa chọn vào dataCart
    if (!findData) {
      dataCart.push(action.payload);
    }

    //Sau đó lưu dataCart vào localStorage
    localStorage.setItem("cart", JSON.stringify(dataCart));

    //Lưu xong lấy gì hàng vừa mới lưu lên
    const newCart = JSON.parse(localStorage.getItem("cart")) ?? [];

    //Trong các sản phâm lấy giá X số lượng
    const takeTotal = newCart.map((e) => e.data.price * e.quantity);
    console.log(takeTotal);

    //Sau đó cộng dồn hết số tiền đó để lấy số tiền tổng đơn
    const newTotal = takeTotal.reduce((num, index) => {
      return num + index;
    });

    //Lưu tiền tổng tính được vào localStorage
    localStorage.setItem("total", JSON.stringify(newTotal));
    return {
      ...state,
      listCart: action.payload,
      total: newTotal,
    };
  }

  //Upudate cart được dùng ở trang CartPage khi người dùng click vào tăng giảm số lượng
  if (action.type === "UPDATE_CART") {
    //Lấy sản phẩm từ localStorage lên
    const dataCart = JSON.parse(localStorage.getItem("cart")) ?? [];

    //Tìm sản phẩm khớp id của sản phẩm đang được click
    const findData = dataCart.find(
      (product) => product.data.id.$oid === action.payload.data.id.$oid
    );
    console.log(findData);

    //Nếu có sản phẩm đó thì cập nhật số lượng mới
    if (findData) {
      findData.quantity = action.payload.quantity;
    }

    //Nếu không thì lưu lại - bước này em kiểm tra cho chắc
    if (!findData) {
      dataCart.push(action.payload);
    }

    //Lưu về localStorage
    localStorage.setItem("cart", JSON.stringify(dataCart));

    //Đồng thời cập nhật lại tiền tổng cảu đơn hàng tương tự như ở action.type = ADD_CART
    const newCart = JSON.parse(localStorage.getItem("cart")) ?? [];

    const takeTotal = newCart.map((e) => e.data.price * e.quantity);
    console.log(takeTotal);
    const newTotal = takeTotal.reduce((num, index) => {
      return num + index;
    });
    localStorage.setItem("total", JSON.stringify(newTotal));
    return {
      ...state,
      listCart: action.payload,
      total: newTotal,
    };
  }

  //Xóa sản phẩm khỏi giỏ hàng
  if (action.type === "DELETE_CART") {
    //Lấy sản phẩm từ localStorage lên
    const dataCart = JSON.parse(localStorage.getItem("cart")) ?? [];
    console.log(dataCart);

    //Lấy các sản phẩm khác với id của sản phẩm đang được click
    const filterData = dataCart.filter(
      (product) => product.data.id.$oid !== action.payload.data.id.$oid
    );
    console.log(filterData);

    //Lưu về localStorage
    localStorage.setItem("cart", JSON.stringify(filterData));

    //Tiếp tục tính tiền tổn dơn như action.type = ADD_CART
    const newCart = JSON.parse(localStorage.getItem("cart")) ?? [];

    const takeTotal = newCart.map((e) => e.data.price * e.quantity);
    console.log(takeTotal);
    if (takeTotal.length > 1) {
      //nếu hơn 1 sản phẩm thì dùng reduce để tính tổng
      const newTotal = takeTotal.reduce((num, index) => {
        return num + index;
      });
      localStorage.setItem("total", JSON.stringify(newTotal));
    }

    if (takeTotal.length === 1) {
      //Nếu 1 sản phẩm thì chỉ lấy sản phẩm đầu tiên
      const newTotal = takeTotal[0];
      localStorage.setItem("total", JSON.stringify(newTotal));
    }

    if (takeTotal.length === 0) {
      //Nếu không có sản phẩm thì cho nó bằng 0
      const newTotal = 0;
      localStorage.setItem("total", JSON.stringify(newTotal));
    }

    //Lấy số tiền tổng từ localStorage lên
    const newTotal = JSON.parse(localStorage.getItem("total")) ?? [];

    return {
      ...state,
      listCart: action.payload,
      total: newTotal,
    };
  }

  return state;
};

//Hàm reducer chưa thông tin chat
const inboxReducer = (state = { data: null }, action) => {
  //Gửi tin nhắn
  if (action.type === "SEND") {
    //Lấy tông tin tin nhắn từ localStorage lên
    const inboxData = JSON.parse(localStorage.getItem("inboxData")) ?? [];

    //Thêm tin nhăn vừa được gửi vào inboxData
    inboxData.push(action.payload.data);

    //Lưu về localStorage
    localStorage.setItem("inboxData", JSON.stringify(inboxData));

    return {
      ...state,
      data: action.payload,
    };
  }

  return state;
};

//Kết hợp các reducer
const rootReducer = combineReducers({
  toggle: toggleReducer,
  cart: cartReducer,
  inbox: inboxReducer,
});

const store = createStore(rootReducer);

export default store;
