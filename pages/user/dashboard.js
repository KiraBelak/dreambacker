import React from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  // Dummy data for projects
  const projects = [
    { id: 1, title: "Project 1" },
    { id: 2, title: "Project 2" },
    { id: 3, title: "Project 3" },
  ];

  const handleCreateProject = () => {
    // Navigate to the create project page
    router.push("/create-project");
  };

  const handleProjectClick = (projectId) => {
    // Navigate to the project donation page
    router.push(`/project/${projectId}`);
  };

  return (
    <div>
      <h1>Welcome to the Donor Dashboard</h1>
      <button onClick={handleCreateProject}>Create New Project</button>

      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => handleProjectClick(project.id)}>
            {project.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
