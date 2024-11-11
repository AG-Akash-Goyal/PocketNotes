// import bannerImg from "../assets/PN.png";
// import '../styles/mainContent.css'
// import { MdLock } from "react-icons/md";

// const MainContent = () => {
//   return (
//     <div className="bannerSection">
//         <div className="hero">
//             <img src={bannerImg} alt="" />
//             <h2 className="bannerHeading">Pocket Notes</h2>
//             <p className="bannerDescription">
//                 Send and receive messages without keeping your phone online.
//                 <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile phone
//             </p>
//         </div>
//         <div className="footer">
//             <MdLock/> end-to-end encrypted
//         </div>
//     </div>
//   );
// };

// export default MainContent;

import Image from "../assets/PN.png";
import "../styles/bannerSection.css";
import { MdLock } from "react-icons/md";

const BannerSection = () => {
  return (
    <section className="landing-banner">
      <div className="banner-content">
        <img className="banner-image" src={Image} alt="Pocket Notes" />
        <h2 className="banner-title">Pocket Notes</h2>
        <p className="banner-subtitle">
          Send and receive messages without keeping your phone online.
          <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <footer className="security-info">
        <MdLock /> end-to-end encrypted
      </footer>
    </section>
  );
};

export default BannerSection;
