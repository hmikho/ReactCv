import { useEffect, useState } from "react";
import "../App.css";  // <-- Lägg till denna rad

export default function CV() {
  const [cvData, setCvData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/CvData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load CV data");
        }
        return response.json();
      })
      .then((data) => setCvData(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p className="error">Error: {error}</p>;
  if (!cvData) return <p>Loading...</p>;

  return (
    <div className="cv-container">
      <aside className="cv-sidebar">
        <h2>{cvData.profile.name}</h2>
        <p>{cvData.profile.title}</p>
        <section className="cv-contact-info">
          <h3>Contact</h3>
          <p>Email: {cvData.profile.contact.email}</p>
          <p>
            <a href={cvData.profile.contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
          <p>
            <a href={cvData.profile.contact.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </section>
      </aside>

      <section className="cv-content">
        <article className="cv-info">
          <h2>About Me</h2>
          <p>{cvData.profile.about}</p>
        </article>

        <hr />

        <article className="cv-info">
          <h2>Work Experience</h2>
          {cvData.workExperience.map((job, index) => (
            <section key={index}>
              <h3>{job.position} │ {job.company}</h3>
              <p>{job.description}</p>
            </section>
          ))}
        </article>

        <hr />

        <article className="cv-info">
          <h2>Education</h2>
          {cvData.education.map((edu, index) => (
            <section key={index}>
              <h3>{edu.degree} │ {edu.school} │ {edu.year}</h3>
            </section>
          ))}
        </article>
      </section>
    </div>
  );
}
