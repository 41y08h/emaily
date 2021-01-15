const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
  <div 
    style='background-color: #23232e;
    padding: 50px 0;
    font-family: "Poppins", sans-serif;
    color: #fff;
    text-align: center;
    font-size: 2rem;
    border-radius: 12px'
  >
    <p>${survey.body}</p>
    <div>
      <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
      <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
    </div>
  </div>
  `;
};
