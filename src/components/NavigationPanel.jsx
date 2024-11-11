import Initials from './Initials';
import '../styles/navigationPanel.css'
import { FaPlus } from "react-icons/fa6";

const NavigationPanel = ({ setOpenPopup, groups, selectedGroup, setSelectedGroup }) => {
  return (
    <div className='navigationPanel'>
      <h1 className="header">Pocket Notes</h1>
      <div className="listOfGroups">
        {groups?.map((group, index) => {
          return ( // Added return statement here
            <div 
              className="groupElement" 
              key={index}
              style={{
                backgroundColor: selectedGroup === group ? '#DCDCDC' : '#fff',
              }}
              onClick={() => setSelectedGroup(group)}
            >
              <span className='groupAvatar' style={{ backgroundColor: group.color }}>
                <span className="avatarContent">
                  <Initials groupName={group.groupName} />
                </span>
              </span>
              <h2 className='groupTitle'>{group.groupName}</h2>
            </div>
          );
        })}
      </div>
      <button 
        className="addGroupBtn"
        onClick={() => setOpenPopup(true)}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default NavigationPanel;