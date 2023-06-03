import React from "react";
import Image from "next/image";

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
    <div className="moving-gallery">
      <div className="column moving-down">
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

      <div className="column moving-up">
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

      <style jsx>{`
        .moving-gallery {
          display: flex;
          justify-content: space-between;
        }

        .column {
          display: flex;
          flex-direction: column;
          flex: 1;
          align-items: center;
          gap: 20px;
          overflow: hidden;
        }

        .moving-down {
          flex-direction: column;
          animation: moveDown 5s infinite;
        }

        .moving-up {
          flex-direction: column-reverse;
          animation: moveUp 5s infinite;
        }

        @keyframes moveDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes moveUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .project-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 0;
          animation: fadeIn 1s ease-in-out forwards;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .image-container {
          width: 300px;
          height: 200px;
        }
      `}</style>
    </div>
  );
};

export default MovingGallery;
