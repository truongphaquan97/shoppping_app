import { useDispatch, useSelector } from "react-redux";
import "./PopupChat.css";
import { useEffect, useRef } from "react";

const PopupChat = () => {
  const dispatch = useDispatch();
  const isChat = useSelector((state) => state.toggle.chat);
  const Chat = useSelector((state) => state.inbox.data);
  const inboxData = JSON.parse(localStorage.getItem("inboxData")) ?? [];
  console.log(inboxData);

  let inputRef = useRef();
  let srollRef = useRef(null);

  const sendHandler = () => {
    dispatch({
      type: "SEND",
      payload: { data: inputRef.current.value },
    });
    console.log(inputRef.current.value);
  };

  useEffect(() => {
    srollRef.current?.scrollIntoView(false);
  }, [Chat]);

  const textInbox = useSelector((state) => state.inbox.data);

  const liveChatHandler = () => {
    dispatch({
      type: "LIVE_CHAT",
      payload: { toggle: !isChat },
    });
    console.log(isChat);

    if (isChat) {
      dispatch({
        type: "CLOSE",
        payload: null,
      });
    }
  };

  return (
    <>
      {isChat ? (
        <div className="wrap-chat">
          <div className="box-chat">
            <div className="support-title">
              <p>Customer Support</p>
              <button>Let's Chat App</button>
            </div>
            <div className="text-chat">
              <ul className="text-box-chat">
                <li className="my-chat">Xin chào</li>
                <li className="my-chat">Làm thế nào để xem sản phẩm?</li>

                <img
                  className="they-img"
                  src="./images/supporter.png"
                  alt="supporter"
                />
                <li className="they-chat">ADMIN: Chào bạn</li>

                <div style={{ display: "flex" }}>
                  <img
                    className="they-img"
                    src="./images/supporter.png"
                    alt="supporter"
                  />
                  <li className="they-chat">
                    ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm
                  </li>
                </div>
                {textInbox
                  ? inboxData.map((ib, index) => <li key={index}>{ib}</li>)
                  : ""}
                <div className="scroll-div" ref={srollRef}></div>
              </ul>
            </div>
            <div className="form-type">
              <div>
                <img
                  className="support-img"
                  src="./images/supporter.png"
                  alt="supporter"
                />
                <input
                  className="support-input"
                  placeholder="Enter Message!"
                  type="text"
                  name="text"
                  ref={inputRef}
                ></input>
                <i className="fa-solid fa-paperclip"></i>
                <i className="fa-solid fa-face-smile"></i>
                <button className="btn-send" onClick={sendHandler}>
                  <i className="fa-sharp fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="wrap-mess">
        <button onClick={liveChatHandler}>
          <i className="fa-brands fa-facebook-messenger" />
        </button>
      </div>
    </>
  );
};

export default PopupChat;
