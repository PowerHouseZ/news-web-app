import React from "react";

const ContactPage = ({ onBackToNews }) => {
  const handleBackClick = () => {
    onBackToNews();
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or feedback, please feel free to reach out to
        us using the contact information below:
      </p>
      <div className="contact-info">
        <p>Email: buta852747@my.yosemite.edu</p>
        <p>Email: duron686951@my.yosemite.edu</p>
      </div>
      <button className="back-button" onClick={handleBackClick}>
        Back to the News
      </button>
    </div>
  );
};

export default ContactPage;
