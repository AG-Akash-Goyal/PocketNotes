// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import Initials from "./Initials";
// import "../styles/notes.css";
// import { IoMdSend } from "react-icons/io";
// import TD_Fetch from "./TD_Fetch";
// import { GoDotFill } from "react-icons/go";
// import { FaArrowLeftLong } from "react-icons/fa6";

// const Notes = ({ selectedGroup, setSelectedGroup }) => {
//   const [input, setInput] = useState({
//     text: "",
//     timestamp: "",
//   });
//   const [storedNotes, setStoredNotes] = useState([]);

//   const handleInputChange = (event) => {
//     const currentTime = new Date().toLocaleString();
//     setInput({
//       text: event.target.value,
//       timestamp: currentTime,
//     });
//   };

//   const handleSubmitNotes = () => {
//     if (!selectedGroup || !selectedGroup.groupName) return;
//     const grpName = selectedGroup.groupName;
//     const existingNotes = JSON.parse(localStorage.getItem(grpName)) || [];
//     const updatedNotes = [...existingNotes, input];
//     localStorage.setItem(grpName, JSON.stringify(updatedNotes));
//     setStoredNotes(updatedNotes);
//     setInput({ text: "", timestamp: "" });
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); 
//       handleSubmitNotes();
//     }
//   };

//   useEffect(() => {
//     if (selectedGroup && selectedGroup.groupName) {
//       const grpName = selectedGroup.groupName;
//       const notes = localStorage.getItem(grpName);
//       if (notes) {
//         setStoredNotes(JSON.parse(notes));
//       } else {
//         setStoredNotes([]);
//       }
//     }
//   }, [selectedGroup]);

//   return (
//     <div className="container">
//       <header className="header">
//         <button className="backBtn" onClick={() => setSelectedGroup(null)}>
//           <FaArrowLeftLong />
//         </button>
//         <span
//           className="groupIcon"
//           style={{ backgroundColor: selectedGroup.color }}
//         >
//           <div className="Icon">
//             <Initials groupName={selectedGroup.groupName} />
//           </div>
//         </span>
//         <h1 className="groupName">{selectedGroup.groupName}</h1>
//       </header>

//       <div className="notes">
//         {storedNotes.map((notes, index) => {
//           const { date, time } = TD_Fetch(notes.timestamp);
//           return (
//             <div className="note" key={index}>
//               <p>{notes.text}</p>
//               <span className="date">
//                 {date} <GoDotFill /> {time}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       <div className="textarea-container">
//         <textarea
//           className="textarea"
//           value={input.text}
//           placeholder="Enter your text here...."
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//         ></textarea>
//         <button
//           type="button"
//           className="send-icon"
//           style={{
//             cursor: `${input.text === "" ? "not-allowed" : "pointer"}`,
//             color: `${input.text === "" ? "#b9bbc0" : "#001f8b"}`,
//           }}
//           onClick={() => handleSubmitNotes()}
//         >
//           <IoMdSend />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Notes;

/* eslint-disable react/prop-types */
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
    if (!selectedGroup || !selectedGroup.groupName) return;
    const groupName = selectedGroup.groupName;
    const existingLogs = JSON.parse(localStorage.getItem(groupName)) || [];
    const updatedLogs = [...existingLogs, input];
    localStorage.setItem(groupName, JSON.stringify(updatedLogs));
    setStoredLogs(updatedLogs);
    setInput({ text: "", timestamp: "" });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitLogs();
    }
  };

  useEffect(() => {
    if (selectedGroup && selectedGroup.groupName) {
      const groupName = selectedGroup.groupName;
      const Logs = localStorage.getItem(groupName);
      setStoredLogs(Logs ? JSON.parse(Logs) : []);
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
        {storedLogs.map((log, index) => {
          const { date, time } = TD_Fetch(log.timestamp);
          return (
            <div className="log-item" key={index}>
              <p className="log-text">{log.text}</p>
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