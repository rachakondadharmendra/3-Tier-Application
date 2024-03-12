import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { postData } from './CrudApi'; 
const imageUrl = `${process.env.REACT_APP_IMAGE_FOLDER_PATH}`;
console.log(imageUrl);

function Content() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ask for confirmation
    const confirmed = window.confirm('Are you sure you want to submit the form?');
  
    // Proceed only if confirmed
    if (confirmed) {
      try {
        // Send data to the backend using postData function
        await postData({ ...formData, status: true });
        console.log('Message sent successfully');
        // Clear form fields after successful submission
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        // Set submission status to "success"
        setSubmissionStatus('success');
      } catch (error) {
        console.error('Error sending message:', error);
        // Set submission status to "error"
        setSubmissionStatus('error');
      }
    }
  };
  
  
  return (
    <main>
      <section id="home">
        <div className="profile">
          <h1>Welcome to my <span className="portfolio-static">Portfolio</span></h1>
          <p>I am a skilled DevOps engineer with a passion for automating and streamlining software development and deployment processes. With years of experience in various industries, I excel at bridging the gap between development and operations teams.</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/rachakonda-dharmendra/" target="_blank" rel="noreferrer">
              <FaLinkedin /> 
            </a>
            <a href="https://github.com/rachakondadharmendra" target="_blank" rel="noreferrer">
              <FaGithub /> 
            </a>
            <a href="mailto:rachakondadharmendrainfo@gmail.com" target="_blank" rel="noreferrer">
              <FaEnvelope /> 
            </a>
          </div>       
        </div>
        <div className="tech-stack">
          <h3>Tech Stack</h3>
          <div className="tech-stack-icons">
            <img src= {`${imageUrl}/aws.png`} alt="AWS" title="AWS" />
            <img src={`${imageUrl}/terraform.png`} alt="Terraform" title="Terraform" />
            <img src={`${imageUrl}/git.png`} alt="Git" title="Git" />
            <img src={`${imageUrl}/jenkins.png`} alt="Jenkins" title="Jenkins" />
            <img src={`${imageUrl}/docker.png`} alt="Docker" title="Docker" />
            <img src={`${imageUrl}/kubernetes.png`} alt="Kubernetes" title="Kubernetes" />
            <img src={`${imageUrl}/ansible.png`} alt="Ansible" title="Ansible" />
            <img src={`${imageUrl}/jmeter.png`} alt="Jmeter" title="Jmeter" />
            <img src={`${imageUrl}/helm.png`} alt="Helm" title="Helm" />
            <img src={`${imageUrl}/istio.png`} alt="Istio" title="Istio" />
            <img src={`${imageUrl}/linux.png`} alt="Linux" title="Linux" />
            <img src={`${imageUrl}/bash.png`} alt="Bash Scripting" title="Bash Scripting" />
            <img src={`${imageUrl}/postgresql.png`} alt="Postresql" title="Postresql" />
            <img src={`${imageUrl}/argocd.png`} alt="ArgoCD" title="ArgoCD" />
            <img src={`${imageUrl}/sonarqube.svg`} alt="Sonar Qube" title="Sonar Qube" />
            <img src={`${imageUrl}/jira.png`} alt="Jira Software" title="Jira Software" />
          </div>
        </div>
      </section>

      <section id="about">
        <h2>About Me</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-circle-left"></div>
            <div className="timeline-content">
              <h3>DevOps Engineer (Freelance)</h3>
              <p>May 2023 – Jan 2024<br />Self-Employed, Hyderabad</p>
              <ul>
              </ul>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-circle-right"></div>
            <div className="timeline-content">
              <h3>DevOps Engineer</h3>
              <p>Feb 2023 - Apr 2023<br />Decimal Point Analytics, Nashik</p>
              <ul>
              </ul>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-circle-left"></div>
            <div className="timeline-content">
              <h3>SDE DevOps 1</h3>
              <p>Jun 2022 - Feb 2023<br />Careerlabs Technologies Pvt. Ltd. (Product Company), Bangalore</p>
              <ul>
              </ul>
            </div>
          </div>
          <div className="timeline-item right">
            <div className="timeline-circle-right"></div>
            <div className="timeline-content">
              <h3>SDE DevOps Intern</h3>
              <p>Dec 2021 - May 2022<br />Careerlabs Technologies Pvt. Ltd. (Product Company), Tirunelveli</p>
              <ul>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Project 1</h3>
            <p>Description of project 1.</p>
          </div>
          <div className="project-card">
            <h3>Project 2</h3>
            <p>Description of project 2.</p>
          </div>
          <div className="project-card">
            <h3>Project 3</h3>
            <p>Description of project 3.</p>
          </div>
          <div className="project-card">
            <h3>Project 1</h3>
            <p>Description of project 1.</p>
          </div>
          <div className="project-card">
            <h3>Project 2</h3>
            <p>Description of project 2.</p>
          </div>
          <div className="project-card">
            <h3>Project 3</h3>
            <p>Description of project 3.</p>
          </div>
          <div className="project-card">
            <h3>Project 2</h3>
            <p>Description of project 2.</p>
          </div>
          <div className="project-card">
            <h3>Project 3</h3>
            <p>Description of project 3.</p>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="contact-container">
          <div className="contact-image">
            <img src={`${imageUrl}/getintouch_image.jpg`} alt="Contact Image" />
          </div>
          {submissionStatus !== 'success' ? (
          <div className="contact-form">
            <h2 className="section-title animate-text">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder=" " value={formData.name} onChange={handleChange} required />
                <label htmlFor="name" className="form-label">
                  <i className="fas fa-user"></i>
                  Name
                </label>
              </div>

              <div className="form-group">
                <input type="email" id="email" name="email" placeholder=" " value={formData.email} onChange={handleChange} required />
                <label htmlFor="email" className="form-label">
                  <i className="fas fa-envelope"></i>
                  Email
                </label>
              </div>

              <div className="form-group">
                <textarea id="message" name="message" placeholder=" " value={formData.message} onChange={handleChange} required></textarea>
                <label htmlFor="message" className="form-label">
                  <i className="fas fa-pencil-alt"></i>
                  Message
                </label>
              </div>

              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
         ) : (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <p>Thank you! Your message has been sent successfully.</p>
          </div>
         )}
</div>
</section>
    </main>
  );
}

export default Content;
