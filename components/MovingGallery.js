import React from "react";
import Image from "next/image";
import styles from "../styles/movingGallery.module.css";

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/1_yxfrkb.png",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/2_jl8shc.png",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/2_jl8shc.png",
  },
  {
    id: 4,
    title: "Project 4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/2_jl8shc.png",
  },
  {
    id: 5,
    title: "Project 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/2_jl8shc.png",
  },
  // Add more projects as needed
];

const MovingGallery = () => {
  return (
    <div className={styles["moving-gallery"]}>
      <div className={`${styles.column} ${styles["moving-down"]}`}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-item"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="image-container">
              <Image
                src={project.image}
                alt={project.title}
                width={200}
                height={100}
              />
            </div>
            <div className="content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`${styles.column} ${styles["moving-up"]}`}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-item"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="image-container">
              <Image
                src={project.image}
                alt={project.title}
                width={200}
                height={100}
              />
            </div>
            <div className="content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingGallery;
