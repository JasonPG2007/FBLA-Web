import { useState } from "react";

export default function Chat() {
  // Variables
  const [isMoveToDetailsChat, setIsMoveToDetailsChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const chats = [
    {
      name: "Alice",
      messages: [
        { text: "Hello!", isMe: false },
        { text: "Hi Alice 👋", isMe: true },
      ],
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Bob",
      messages: [
        { text: "Hello!", isMe: false },
        { text: "Hi Alice 👋", isMe: true },
      ],
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      name: "Charlie",
      messages: [
        { text: "Hello!", isMe: false },
        { text: "Hi Alice 👋", isMe: true },
      ],
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      name: "David",
      messages: [
        { text: "Hello!", isMe: false },
        { text: "Hi Alice 👋", isMe: true },
      ],
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
      name: "Eve",
      messages: [
        { text: "Hello!", isMe: false },
        { text: "Hi Alice 👋", isMe: true },
      ],
      avatar: "https://i.pravatar.cc/40?img=5",
    },
  ];

  return (
    <>
      <div className="chat-container">
        <div
          className="chat-bubble"
          id="chatBubble"
          onClick={() => {
            const chatBubble = document.getElementById("chatBubble");
            const chatPopup = document.getElementById("chatPopup");
            if (chatPopup.style.display === "flex") {
              chatPopup.style.display = "none";
            } else {
              chatPopup.style.display = "flex";
            }

            // Click outside to close
            document.addEventListener("click", (e) => {
              if (
                !chatBubble.contains(e.target) &&
                !chatPopup.contains(e.target)
              ) {
                chatPopup.style.display = "none";
              }
            });
          }}
        >
          <i className="fa-solid fa-message"></i>
          <span className="chat-badge">2</span>
        </div>

        <div className="chat-popup" id="chatPopup">
          <div className="chat-header">Chats</div>
          <div className="chat-body" id="chatBody">
            <div className="chat-list">
              {chats.map((chat, idx) => (
                <div
                  className="chat-item"
                  key={idx}
                  onClick={() => {
                    document.getElementById("chatBody").style.transform =
                      "translateX(-270px)";

                    setSelectedChat(chat);
                    setIsMoveToDetailsChat(true);
                  }}
                >
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    loading="lazy"
                    className="avatar"
                  />
                  <div className="chat-info">
                    <div className="chat-name">{chat.name}</div>
                    <div className="chat-message">{chat.message}</div>
                  </div>
                </div>
              ))}
            </div>
            {isMoveToDetailsChat && selectedChat && (
              <div className="chat-details">
                {/* HEADER */}
                <div className="chat-details-header">
                  <i
                    className="fa-solid fa-arrow-left"
                    onClick={(e) => {
                      e.stopPropagation();

                      document.getElementById("chatBody").style.transform =
                        "translateX(0)";
                      setIsMoveToDetailsChat(false);
                    }}
                  ></i>

                  <img
                    src={selectedChat.avatar}
                    loading="lazy"
                    className="avatar"
                  />
                  <span>{selectedChat.name}</span>
                </div>

                {/* BODY */}
                <div className="chat-details-body">
                  {selectedChat.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`message ${msg.isMe ? "me" : "other"}`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {isMoveToDetailsChat && selectedChat && (
            <div className="chat-details-footer">
              <input type="text" placeholder="Type a message..." />
              <button>➤</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
