import React from 'react';
import './page.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faEnvelope, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function HomePage() {
  // Use useRef to create a reference to the footer sections
  const contactRef = React.useRef(null);
  const helpRef = React.useRef(null);

  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <h1 style={{ color: "cyan" }}>Health-Care Chatbot</h1>
        </div>
        <div className="header-right">
          <nav>
            <ul>
              <li><Link to="/login" className='login'><FontAwesomeIcon icon={faSignInAlt} /> Login</Link></li>
              <li><Link to="/signup" className='register'><FontAwesomeIcon icon={faUserPlus} /> Registration</Link></li>
              {/* Use onClick to scroll to the corresponding section in the footer */}
              <li><Link onClick={() => scrollToSection(contactRef)} className='contact'><FontAwesomeIcon icon={faEnvelope} /> Contact</Link></li>
              <li><Link onClick={() => scrollToSection(helpRef)} className='help'><FontAwesomeIcon icon={faQuestionCircle} /> Help</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="middle-section">
      </section>

      
      <footer className="footer">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>Welcome to Health-Care Chatbot , Our Chatbot Will solve your queries</p>
        </div>
        <div ref={contactRef} className="footer-section">
            <h2>Contact Us:</h2>
            <p>Have questions or need assistance? Reach out to us!</p>
            <p>Email: dharmesh.imscit21@gmail.com</p>
            <p>Phone: +91 8141427179 </p>
            <p>Address: Ahmedabad,Gujrat,India</p>
        </div>

        <div ref={helpRef} className="footer-section">
        <h2>Help</h2>
            <p>Need help using our chatbot or have concerns about your health? Check out our FAQ section or contact our support team for personalized assistance.</p>
            <p>Visit our <a href="#faq">FAQ page</a> for common queries.</p>
            <p>Contact Support: <a href="#contact">support@healthcarechatbot.com</a></p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;





// import React from 'react';
// import './page.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignInAlt, faUserPlus, faEnvelope, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

// function HomePage() {
//   return (
//     <div className="App">
//       {/* Header Section */}
//       <header className="header">
//         <div className="header-left">
//           <h1 style={{ color: "cyan" }}>Health-Care Chatbot</h1>
//         </div>
//         <div className="header-right">
//           <nav>
//             <ul>
//               <li><a href="#login" className='login'><FontAwesomeIcon icon={faSignInAlt} /> Login</a></li>
//               <li><a href="#registration" className='register'><FontAwesomeIcon icon={faUserPlus} /> Registration</a></li>
//               <li><a href="#contact" className='contact'><FontAwesomeIcon icon={faEnvelope} /> Contact</a></li>
//               <li><a href="#help" className='help'><FontAwesomeIcon icon={faQuestionCircle} /> Help</a></li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       {/* Middle Section with Image */}
//       <section className="middle-section">
//         {/* <img src={backgroundImg} alt="Health-Care Chatbot" /> */}
//       </section>

      {/* Footer Section */}
      // <footer className="footer">
      //   <div className="footer-section">
      //     <h2>About Us</h2>
      //     <p>Welcome to Health-Care Chatbot , Our Chatbot Will solve your queries</p>
      //   </div>
      //   <div className="footer-section">
      //       <h2>Contact Us:</h2>
      //       <p>Have questions or need assistance? Reach out to us!</p>
      //       <p>Email: dharmesh.imscit21@gmail.com</p>
      //       <p>Phone: +91 8141427179 </p>
      //       <p>Address: Ahmedabad,Gujrat,India</p>
      //   </div>

//         <div className="footer-section">
//             <h2>Help</h2>
//             <p>Need help using our chatbot or have concerns about your health? Check out our FAQ section or contact our support team for personalized assistance.</p>
//             <p>Visit our <a href="#faq">FAQ page</a> for common queries.</p>
//             <p>Contact Support: <a href="#contact">support@healthcarechatbot.com</a></p>
//         </div>
//         </footer>
//     </div>
//   );
// }

// export default HomePage;
