/* eslint-disable react/prop-types */
// import {useEffect, useRef, useState } from "react";
// import "../styles/modal.css";

// const Modal = ({setOpenModal, setGroupData}) => {
//   const modalRef = useRef(null);
//   const inputRef = useRef(null);
//   const [formData, setFormData] = useState({ groupName: "", color: "" });
//   const [active, setActive] = useState("");
//   const [error, setError] = useState({});
//   const color = [
//     "#B38BFA",
//     "#FF79F2",
//     "#43E6FC",
//     "#F19576",
//     "#0047FF",
//     "#6691FF",
//   ];
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.groupName) {
//       newErrors.groupName = "Group Name is required";
//     }
//     if (!formData.color) {
//       newErrors.color = "Please select a color";
//     }
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   };

//   const handleModalClose = (e)=>{
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//         setOpenModal(false);
//     }
//   }

//   const handleColorChange = (color) => {
//     setFormData({ ...formData, color });
//     setActive(color)
//     setError((prevErrors) => ({ ...prevErrors, color: "" }));
//   };

//   const handleSubmit = (e)=>{
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setError(validationErrors);
//       return;
//     }

//     if(!error.groupName || !error.color){
//         setGroupData(formData);
//         setError({});
//         setOpenModal(false)
//     }
//   }

//   useEffect(()=>{
//     if(inputRef.current){
//       inputRef.current.focus();
//     }
//   },[])
//   return (
//     <>
//       <div 
//       className="modalOverlay"
//       onClick={handleModalClose}
//       >
//         <form className="modalContainer" ref={modalRef} onSubmit={handleSubmit}> 
//           <h2 className="modalHeading">Create New Group</h2>
//             <div className="formGroup">
//                 <label className="modalGrp">Group Name</label>
//                 <input
//                     ref={inputRef}
//                     type="text"
//                     className="modalText"
//                     name="groupName"
//                     placeholder="Enter your group name"
//                     onChange={handleChange}
                    
//                 />
//             </div>
//             {error.groupName && <p style={{color : 'red'}} className="error">{error.groupName}</p>}
//             <div className="formGroup">
//                 <label className="modalColor">Choose Colour</label>
//                 {color.map((color, index) => (
//                     <button
//                     className="colorButton"
//                     name="color"
//                     key={index}
//                     style={{
//                         background: color,
//                         border: `${active == color ? "2px solid black" : "none"}`
//                     }}
//                     onClick={() => handleColorChange(color)}
//                     type="button"
//                     ></button>
//                 ))}
//             </div>
//             {error.color && <p style={{color : 'red'}} className="error">{error.color}</p>}
//             <button type="submit" className="createGroup">Create</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Modal;

/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "../styles/popup.css";

const Popup = ({ setOpenPopup, setGroupData }) => {
  const popupRef = useRef(null);
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({ groupName: "", color: "" });
  const [activeColor, setActiveColor] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const availableColors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.groupName) {
      errors.groupName = "Group Name is required";
    }
    if (!formData.color) {
      errors.color = "Please select a color";
    }
    return errors;
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Close popup when clicking outside
  const closePopup = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpenPopup(false);
    }
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setFormData((prevState) => ({ ...prevState, color }));
    setActiveColor(color);
    setFormErrors((prevErrors) => ({ ...prevErrors, color: "" }));
  };

  // Handle form submission
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    if (!formErrors.groupName && !formErrors.color) {
      setGroupData(formData);
      setFormErrors({});
      setOpenPopup(false); // Close popup after form submission
    }
  };

  // Focus on input field on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="overlayPopup" onClick={closePopup}>
        <form className="popupBox" ref={popupRef} onSubmit={handleSubmitForm}>
          <h2 className="popupHeading">Create New Group</h2>
          <div className="inputGroup">
            <label className="popupLabel">Group Name</label>
            <input
              ref={inputRef}
              type="text"
              className="inputField"
              name="groupName"
              placeholder="Enter your group name"
              value={formData.groupName}
              onChange={handleInputChange}
            />
          </div>
          {formErrors.groupName && (
            <p className="error" style={{ color: "red" }}>
              {formErrors.groupName}
            </p>
          )}
          <div className="inputGroup">
            <label className="popupLabel">Choose Colour</label>
            {availableColors.map((color, idx) => (
              <button
                className="colorSelectButton"
                key={idx}
                style={{
                  backgroundColor: color,
                  border: activeColor === color ? "2px solid black" : "none",
                }}
                onClick={() => handleColorSelect(color)}
                type="button"
              />
            ))}
          </div>
          {formErrors.color && (
            <p className="error" style={{ color: "red" }}>
              {formErrors.color}
            </p>
          )}
          <button type="submit" className="submitGroupBtn">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default Popup;