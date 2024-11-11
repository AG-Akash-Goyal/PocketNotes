const TD_Fetch = (date = Date.now()) => {
    const currDate = new Date(date);
  
    const cDate = [
      currDate.getDate(),
      currDate.toLocaleString("en-US", { month: "short" }),
      currDate.getFullYear()
    ].join(" ");
  
    const cTime = currDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    });
  
    return {
      date: cDate,
      time: cTime
    };
  };
  
  export default TD_Fetch;