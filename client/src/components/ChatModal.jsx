import { useState, useEffect, useRef } from 'react';
function ChatModal() {
    const inputRef = useRef()
  const [sendMessage, setSendMessage] = useState('');
  const [receiveMessage, setReceiveMessage] = useState([]);
  // WebSocket 연결 생성
  const socket = new WebSocket('ws://localhost:4000');
  socket.addEventListener('open', function (e) {
    console.log('============ 서버가 연결되었습니다 =============');
  });

  useEffect(() => {
    // 메시지 수신
    socket.addEventListener('message', function (e) {
      console.log('Message from server ', e.data);
      console.dir(e.data)
      setReceiveMessage([...receiveMessage, {
        sender: 'server',
        msg : e.data
      }]);
    });
  }, []);
  const handleChange = (e) => {
    setSendMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.send(sendMessage);
    setSendMessage('')
    inputRef.current.focus()
  };
  return (
    <>
      <div className="chat fixed right-0 h-1.5 w-xs z-10 bottom-1/2">
        <header className="bg-indigo-700 py-5 indent-3 flex gap-3">실시간 채팅 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>
</header>
        <div className="chat-body bg-black p-5 overflow-y-scroll min-h-60">
          {/* chat body start */}
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
          {/* chat body end*/}
        </div>
        <div>
          <footer className="bg-gray-600 py-5">
            <div>
              <form onSubmit={handleSubmit}>
                <fieldset className="flex justify-between px-5">
                    <input
                      type="text"
                      className="bg-gray-50 text-black indent-3"
                      value={sendMessage}
                      ref={inputRef}
                      onChange={handleChange} placeholder='메세지를 입력하세요'
                    />
                    <input
                      type="submit"
                      className="btn btn-soft btn-warning"
                      value="전송"
                    />
                </fieldset>
              </form>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default ChatModal;
