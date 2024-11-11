import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Logs from './components/PocketLog';
import BannerSection from './components/BannerSection';
import Popup from './components/Popup';

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newGroupData, setNewGroupData] = useState({});
  const [groupList, setGroupList] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [LogData, setLogData] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const updateView = () => {
      setIsSmallScreen(window.innerWidth <= 767);
    };

    window.addEventListener('resize', updateView);

    return () => window.removeEventListener('resize', updateView);
  }, []);

  useEffect(() => {
    if (newGroupData.groupName && newGroupData.color) {
      const storedGroups = JSON.parse(localStorage.getItem('group')) || [];
      const isDuplicateGroup = storedGroups.some(
        (group) => group.groupName === newGroupData.groupName
      );

      if (!isDuplicateGroup) {
        const updatedGroupList = [...storedGroups, newGroupData];
        localStorage.setItem('group', JSON.stringify(updatedGroupList));
        setGroupList(updatedGroupList);
      } else {
        alert("This group name is already taken. Please select a different name.");
      }
    }
  }, [newGroupData]);

  useEffect(() => {
    const savedGroups = localStorage.getItem('group');
    if (savedGroups) {
      setGroupList(JSON.parse(savedGroups));
    }
  }, []);

  const selectGroupHandler = (group) => {
    setActiveGroup(group);
  };

  return (
    <div className={`homepage ${isSmallScreen ? 'mobile' : 'desktop'}`}>
      {isSmallScreen ? (
        activeGroup ? (
          <Logs
            selectedGroup={activeGroup}
            Logs={LogData}
            setLogs={setLogData}
            setSelectedGroup={setActiveGroup}
          />
        ) : (
          <Sidebar
            setOpenPopup={setIsPopupOpen}
            groups={groupList}
            selectedGroup={activeGroup}
            setSelectedGroup={selectGroupHandler}
          />
        )
      ) : (
        <>
          <Sidebar
            setOpenPopup={setIsPopupOpen}
            groups={groupList}
            selectedGroup={activeGroup}
            setSelectedGroup={selectGroupHandler}
          />
          {activeGroup ? (
            <Logs selectedGroup={activeGroup} Logs={LogData} setLogs={setLogData} />
          ) : (
            <BannerSection />
          )}
        </>
      )}

      {isPopupOpen && (
        <Popup
          setOpenPopup={setIsPopupOpen}
          setGroupData={setNewGroupData}
        />
      )}
    </div>
  );
};

export default App;
