import { useState, useEffect } from "react";
import "../App.css"; // Importera CSS-filen

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/hmikho/repos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub repos");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching GitHub repos:", error);
        setError("Error fetching GitHub repos");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="projects-container">
      <h2>GitHub Projects</h2>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description || "No description available"}</p>
            <p>
              <strong>Language:</strong> {project.language || "Unknown"}
            </p>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
