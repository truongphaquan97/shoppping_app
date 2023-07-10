import { useDispatch, useSelector } from "react-redux";
import "./PopupChat.css";
import { Form } from "react-router-dom";

const PopupChat = ({request}) => {
  const dispatch = useDispatch();
  const isChat = useSelector((state) => state.toggle.chat);


  const text =  request.formData();
  const textData = text.get("text");

  console.log(textData);

  const saveInbox = () => {
    dispatch({
      type: "SEND",
      payload: { data: textData },
    });
  };


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
            <div className="text-chat">{}</div>
            <div className="form-type">
              <Form method="post">
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
                ></input>
                <i className="fa-solid fa-paperclip"></i>
                <i className="fa-solid fa-face-smile"></i>
                <i className="fa-sharp fa-solid fa-paper-plane" onClick={}></i>
              </Form>
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
