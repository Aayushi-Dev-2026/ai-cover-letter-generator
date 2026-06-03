import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    candidateName: '',
    targetRole: '',
    targetCompany: '',
    keySkills: ''
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateCoverLetter = (e) => {
    e.preventDefault();
    const { candidateName, targetRole, targetCompany, keySkills } = formData;

    if (!candidateName || !targetRole || !targetCompany || !keySkills) {
      alert("Please fill in all fields to generate your professional cover letter!");
      return;
    }

    // Dynamic Date Formatting
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Phase 1 Premium Corporate Template
    const template = `
${candidateName}
New Delhi, India
Email: ${candidateName.toLowerCase().replace(/\s+/g, '')}@example.com

Date: ${currentDate}

To,
The Hiring Committee,
${targetCompany}

Subject: Application for the Position of ${targetRole}

Dear Hiring Manager,

I am writing to formally express my strong interest in the ${targetRole} position currently open at ${targetCompany}. With a solid foundation in computer applications and hands-on experience developing modern software solutions, I am confident in my ability to deliver immediate value to your technical team.

I possess comprehensive expertise in key engineering and development areas, specifically: ${keySkills}. Throughout my academic curriculum and recent project engagements, I have successfully applied these core concepts to build responsive interfaces, optimize runtime execution, and collaborate smoothly across cross-functional workflows.

What profoundly excites me about ${targetCompany} is your relentless focus on driving technical innovation and maintaining an excellent corporate culture. I am eager to channel my technical problem-solving capabilities and adaptive mindset into your fast-paced environment. 

Thank you for your valuable time and consideration. I welcome the opportunity to discuss further how my technical background and professional dedication align perfectly with your team's strategic goals.

Sincerely,

${candidateName}
`.trim();

    setGeneratedLetter(template);
    setCopied(false); // Reset copy button state on new generation
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      <div className="card">
        <header className="card-header">
          <h1>AI Cover Letter Generator 🚀</h1>
          <p className="subtitle">Sprint 4 - Phase 1 Production Build</p>
        </header>

        <form onSubmit={generateCoverLetter} className="generator-form">
          <div className="input-group">
            <label htmlFor="candidateName">Candidate Name:</label>
            <input
              type="text"
              id="candidateName"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleInputChange}
              placeholder="e.g. Aayushi Sharma"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="targetRole">Target Job Role:</label>
            <input
              type="text"
              id="targetRole"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleInputChange}
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="targetCompany">Target Company:</label>
            <input
              type="text"
              id="targetCompany"
              name="targetCompany"
              value={formData.targetCompany}
              onChange={handleInputChange}
              placeholder="e.g. Prodesk IT"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="keySkills">Key Skills (Comma Separated):</label>
            <textarea
              id="keySkills"
              name="keySkills"
              value={formData.keySkills}
              onChange={handleInputChange}
              placeholder="e.g. React, HTML, CSS, JavaScript"
              rows="3"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Generate Cover Letter</button>
        </form>

        {generatedLetter && (
          <div className="output-section">
            <hr className="divider" />
            <div className="output-header">
              <h3>Your Professional Cover Letter</h3>
              <button onClick={copyToClipboard} className={`copy-btn ${copied ? 'copied' : ''}`}>
                {copied ? '✓ Copied!' : '📋 Copy Letter'}
              </button>
            </div>
            <pre className="output-box">{generatedLetter}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;