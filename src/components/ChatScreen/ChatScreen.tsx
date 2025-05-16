import React from "react";
import "./ChatScreen.scss";
import SendIcon from '@mui/icons-material/Send';

interface ChatScreenProps {
  storeName: string;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ storeName }) => {
  return (
    <div className="chat-screen">
      {/* Cabeçalho do chat */}
      <header className="chat-header">
        <div className="chat-header-content">
          <div className="chat-store-icon">
            <img
              src="https://picsum.photos/300/300"
              alt="Ícone da Loja"
              className="store-icon"
            />
          </div>
          <h2 className="chat-store-name">{storeName}</h2>
        </div>
      </header>

      {/* Espaço para a conversa */}
      <div className="chat-messages">
        <p className="placeholder"></p>
      </div>

      {/* Barra de mensagem */}
      <div className="chat-input-bar">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="chat-input"
        />
        <button className="chat-send-button"><SendIcon /></button>
      </div>
    </div>
  );
};

export default ChatScreen;