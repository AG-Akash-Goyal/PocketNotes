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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
  };

  const closePopup = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpenPopup(false);
    }
  };

  const handleColorSelect = (color) => {
    setFormData(prevState => ({ ...prevState, color }));
    setActiveColor(color);
    setFormErrors(prevErrors => ({ ...prevErrors, color: "" }));
  };

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
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div
        className="overlayPopup"
        onClick={closePopup}
      >
        <form
          className="popupBox"
          ref={popupRef}
          onSubmit={handleSubmitForm}
        >
          <h2 className="popupHeading">Create New Group</h2>
          <div className="inputGroup">
            <label className="popupLabel">Group Name</label>
            <input
              ref={inputRef}
              type="text"
              className="inputField"
              name="groupName"
              placeholder="Enter your group name"
              onChange={handleInputChange}
            />
          </div>
          {formErrors.groupName && <p className="error" style={{ color: 'red' }}>{formErrors.groupName}</p>}
          <div className="inputGroup">
            <label className="popupLabel">Choose Colour</label>
            {availableColors.map((color, idx) => (
              <button
                className="colorSelectButton"
                key={idx}
                style={{
                  backgroundColor: color,
                  border: activeColor === color ? "2px solid black" : "none"
                }}
                onClick={() => handleColorSelect(color)}
                type="button"
              />
            ))}
          </div>
          {formErrors.color && <p className="error" style={{ color: 'red' }}>{formErrors.color}</p>}
          <button type="submit" className="submitGroupBtn">Create</button>
        </form>
      </div>
    </>
  );
};

export default Popup;