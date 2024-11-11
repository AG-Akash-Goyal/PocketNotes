const Initials = ({ groupName }) => {
  const asicons = groupName
    .split(" ")
    .map(word => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  
  return asicons;
}

export default Initials;