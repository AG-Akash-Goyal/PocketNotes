/* eslint-disable react/prop-types */
import Initials from './Initials';
import '../styles/sidebar.css'
import { FaPlus } from "react-icons/fa6";

const Sidebar = ({ setOpenPopup, groups, selectedGroup, setSelectedGroup}) => {

  return (
    <div className='sidebarContainer'>
        <h1 className="title">Pocket Notes</h1>
        <div className="groupList">
            {groups.map((group, index) => {
               return (
                    <div 
                        className="groupItem" 
                        key={index}
                        style={{
                            backgroundColor: selectedGroup === group ? '#DCDCDC' : '#fff',
                        }}
                        onClick={() => setSelectedGroup(group)}
                    >
                        <span className='groupIcon' style={{backgroundColor: group.color}}>
                            <span className="Icon">
                                <Initials groupName={group.groupName}/>
                            </span>
                        </span>
                        <h2 className='groupName'>{group.groupName}</h2>
                    </div>
                )
            })}
        </div>
        <button 
        className="AddBtn"
        onClick={()=>setOpenPopup(true)}
        >
            <FaPlus />
        </button>
    </div>
  )
}

export default Sidebar