import './App.css';
import gptLogo from './assets/chatgpt.svg' ;
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';
import {useState, useRef, useEffect} from 'react';
function App() {

  const msgEnd = useRef(null);
  const[input, setInput] = useState("");
  const[messages, setMessages] = useState([
    {
        text: "Hi, I am ChatGPT",
        isBot: true,
    }
]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () =>{
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false},
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true},
    ])
  };

  const handleEnter = async(e) =>{
    if(e.key === 'Enter') await handleSend();
  }

  const handleQuery = async(e) =>{
    const text = e.target.value;
    setMessages([
      ...messages,
      {text, isBot: false},
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true},
    ])
  }
  return (
    <div className="App">
        <div className="sideBar">
            <div className="upperSide">
                <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /><span className="brand">ChatGPT</span></div>
                <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
                <div className="upperSideBottom">
                  <button className="query" onClick={handleQuery} value={"What is Programming ?"}><img src={msgIcon} alt="Query" />What is Programming ?</button>
                  <button className="query" onClick={handleQuery} value={"How To Use API ?"}><img src={msgIcon} alt="Query" />How To Use API ?</button>
                </div>
            </div>
            <div className="lowerside">
                <div className="listItems"><img src={home} alt="home" className="listItemsImg" />Home</div>
                <div className="listItems"><img src={saved} alt="saved" className="listItemsImg" />Saved</div>
                <div className="listItems"><img src={rocket} alt="upgrade" className="listItemsImg" />Upgrade To Pro</div>
            </div>
        </div>

        <div className="main">
          <div className="chats">
                {messages.map((message, index)=>
                    <div key={index} className={message.isBot?"chat bot":"chat"}>
                    <img className='chatImg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.text}</p>
                  </div>
                )}
                <div ref={msgEnd}/>
          </div>
          <div className="chatFooter">
            <div className="inp">
              <input type="text" placeholder="Send a Message" value={input} onKeyDown={handleEnter} onChange={(event)=> setInput(event.target.value)}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
            </div>
              <p>Chat GPT may produce inaccurate information about people, places or facts. ChatGPT August 20 version.</p>
          </div>
        </div>
    </div>
  );
}

export default App;
