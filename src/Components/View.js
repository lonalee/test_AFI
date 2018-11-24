// Dumb Container
import React from "react";

const View = props => {
  const { contactInfo } = props;
  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        {contactInfo.user.map(contact => (
          <li key={contact.id}>
            <div>
              {" "}
              <span>{contact.userName}</span>&nbsp; :: &nbsp;
              <span>{contact.number}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default View;
