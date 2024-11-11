import { useEffect, useState } from "react";
import Initials from "./Initials";
import "../styles/pocketLog.css";
import { IoMdSend } from "react-icons/io";
import TD_Fetch from "./TD_Fetch";
import { GoDotFill } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";

const Logs = ({ selectedGroup, setSelectedGroup }) => {
  const [input, setInput] = useState({
    text: "",
    timestamp: "",
  });
  const [storedLogs, setStoredLogs] = useState([]);

  const handleInputChange = (event) => {
    const currentTime = new Date().toLocaleString();
    setInput({
      text: event.target.value,
      timestamp: currentTime,
    });
  };

  const handleSubmitLogs = () => {
    if (!selectedGroup || !selectedGroup.groupName || !input.text.trim()) return;
    const groupName = selectedGroup.groupName;
    const existingLogs = JSON.parse(localStorage.getItem(groupName)) || [];
    const updatedLogs = [...existingLogs, input];
    localStorage.setItem(groupName, JSON.stringify(updatedLogs));
    setStoredLogs(updatedLogs);
    setInput({ text: "", timestamp: "" });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.text.trim()) {
      event.preventDefault();
      handleSubmitLogs();
    }
  };

  useEffect(() => {
    if (selectedGroup && selectedGroup.groupName) {
      const groupName = selectedGroup.groupName;
      const logs = localStorage.getItem(groupName);
      setStoredLogs(logs ? JSON.parse(logs) : []);
    }
  }, [selectedGroup]);

  return (
    <div className="log-container">
      <header className="log-header">
        <button className="back-button" onClick={() => setSelectedGroup(null)}>
          <FaArrowLeftLong />
        </button>
        <span
          className="group-icon-wrapper"
          style={{ backgroundColor: selectedGroup.color }}
        >
          <div className="group-initials">
            <Initials groupName={selectedGroup.groupName} />
          </div>
        </span>
        <h1 className="group-title">{selectedGroup.groupName}</h1>
      </header>

      <div className="log">
        {storedLogs.map((note, index) => {
          const { date, time } = TD_Fetch(note.timestamp);
          return (
            <div className="log-item" key={index}>
              <p className="log-text">{note.text}</p> {/* Updated this line */}
              <span className="log-timestamp">
                {date} <GoDotFill /> {time}
              </span>
            </div>
          );
        })}
      </div>

      <div className="input-area">
        <textarea
          className="log-input"
          value={input.text}
          placeholder="Enter your text here..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button
          type="button"
          className="send-button"
          style={{
            cursor: input.text ? "pointer" : "not-allowed",
            color: input.text ? "#001f8b" : "#b9bbc0",
          }}
          onClick={handleSubmitLogs}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Logs;