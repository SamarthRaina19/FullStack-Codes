import "./App.css";
import { React, useState } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("");
  const [stateName, setStateName] = useState("");
  const [skills, setSkills] = useState({
    html: false,
    css: false,
    javascript: false,
    react: false,
  });
  const [dobError, setDobError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState(null);

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const today = new Date().toISOString().split("T")[0];

  // ✅ Improved age calculation (still only used on submit)
  const calculateAge = (birthDate) => {
    const today = new Date();
    const dobDate = new Date(birthDate);
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dob > today) {
      setDobError("Future date is not allowed for DOB.");
      return;
    }

    setDobError("");

    const selectedSkills = Object.entries(skills)
      .filter(([, isSelected]) => isSelected)
      .map(([skill]) =>
        skill === "javascript" ? "JavaScript" : skill.toUpperCase(),
      );

    // ✅ Age calculated ONLY when submit is clicked
    const age = calculateAge(dob);

    setSubmittedDetails({
      firstName,
      lastName,
      dob,
      age, // ✅ Added age here
      gender,
      address,
      stateName,
      skills: selectedSkills.length ? selectedSkills.join(", ") : "None",
    });

    setIsPopupOpen(true);
  };

  const handleSkillChange = (skill) => {
    setSkills((prev) => ({
      ...prev,
      [skill]: !prev[skill],
    }));
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setDob("");
    setDobError("");
    setGender("male");
    setAddress("");
    setStateName("");
    setSkills({
      html: false,
      css: false,
      javascript: false,
      react: false,
    });
  };

  return (
    <div className="App">
      <h1>Form Submission 6.1</h1>
      <fieldset>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name*</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            required
          />

          <label htmlFor="lastname">Last Name*</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            required
          />

          <label htmlFor="dob">Date of Birth*</label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={dob}
            max={today}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          {dobError && <p className="error-text">{dobError}</p>}

          <label htmlFor="male">Gender*</label>
          <div className="option-group">
            <label className="inline-option">
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label className="inline-option">
              <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label className="inline-option">
              <input
                type="radio"
                name="gender"
                value="other"
                id="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>

          <label htmlFor="address">Address*</label>
          <textarea
            name="address"
            id="address"
            cols="30"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            required
          ></textarea>

          <label htmlFor="state">State*</label>
          <select
            name="state"
            id="state"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
          >
            <option value="" disabled>
              Select State
            </option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <label htmlFor="html">Skills</label>
          <div className="option-group">
            <label className="inline-option">
              <input
                type="checkbox"
                id="html"
                checked={skills.html}
                onChange={() => handleSkillChange("html")}
              />
              HTML
            </label>
            <label className="inline-option">
              <input
                type="checkbox"
                id="css"
                checked={skills.css}
                onChange={() => handleSkillChange("css")}
              />
              CSS
            </label>
            <label className="inline-option">
              <input
                type="checkbox"
                id="javascript"
                checked={skills.javascript}
                onChange={() => handleSkillChange("javascript")}
              />
              JavaScript
            </label>
            <label className="inline-option">
              <input
                type="checkbox"
                id="react"
                checked={skills.react}
                onChange={() => handleSkillChange("react")}
              />
              React
            </label>
          </div>

          <div className="action-buttons">
            <button type="reset" onClick={handleReset} className="cancel-btn">
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </fieldset>

      {isPopupOpen && submittedDetails && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button
              type="button"
              className="popup-close"
              onClick={() => setIsPopupOpen(false)}
            >
              ×
            </button>
            <h2>Submitted Details</h2>
            <p>
              <strong>First Name:</strong> {submittedDetails.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {submittedDetails.lastName}
            </p>
            <p>
              <strong>DOB:</strong> {submittedDetails.dob}
            </p>
            <p>
              <strong>Age:</strong> {submittedDetails.age}
            </p>{" "}
            <p>
              <strong>Gender:</strong> {submittedDetails.gender}
            </p>
            <p>
              <strong>Address:</strong> {submittedDetails.address}
            </p>
            <p>
              <strong>State:</strong> {submittedDetails.stateName}
            </p>
            <p>
              <strong>Skills:</strong> {submittedDetails.skills}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
