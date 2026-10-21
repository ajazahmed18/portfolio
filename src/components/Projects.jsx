import { useState } from "react";
import projects from "../data/projects.js";

const filters = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "web", label: "Web Apps" }
];

function pad(number) {
  return String(number).padStart(2, "0");
}

function ProjectLink({ url, label }) {
  if (!url || url === "#") {
    return <span className="project-link project-link--disabled">{label} — coming soon</span>;
  }

  return <a href={url} target="_blank" rel="noopener">{label} ↗</a>;
}

function ProjectRow({ project, index, isOpen, onToggle }) {
  return (
    <article className={`ledger-row${isOpen ? " is-open" : ""}`} data-category={project.category}>
      <button className="ledger-row__head" type="button" aria-expanded={isOpen} onClick={onToggle}>
        <span className="ledger-row__num">No. {pad(index + 1)}</span>
        <span className="ledger-row__title">{project.title}</span>
        <span className="ledger-row__tag">{project.tag}</span>
        <span className="ledger-row__year">{project.year}</span>
        <span className="ledger-row__chevron">+</span>
      </button>

      <div className="ledger-row__body">
        <div className="ledger-row__body-inner">
          <div>
            <p className="ledger-row__desc">{project.desc}</p>

            <div className="ledger-row__meta">
              {project.stack.map(skill => <span className="chip" key={skill}>{skill}</span>)}
            </div>

            <div className="ledger-row__links">
              <ProjectLink url={project.live} label="View live" />
              <ProjectLink url={project.code} label="Source code" />
            </div>
          </div>

          <div className={`ledger-row__preview${project.image ? " ledger-row__preview--image" : ""}`} aria-hidden="true">
            {project.image ? (
              <img className="ledger-row__preview-image" src={project.image} alt="" loading="lazy" />
            ) : (
              <>
                <span className="project-preview__icon">{project.icon}</span>
                <span className="project-preview__name">{project.title}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openProject, setOpenProject] = useState(null);

  const visibleProjects = projects.filter(project =>
    activeFilter === "all" || project.category === activeFilter
  );

  const selectFilter = filter => {
    setActiveFilter(filter);
    if (openProject && filter !== "all") {
      const openItem = projects.find(project => project.title === openProject);
      if (openItem?.category !== filter) setOpenProject(null);
    }
  };

  return (
    <section className="index" id="work">
      <div className="section-head reveal">
        <p className="eyebrow">Selected Work</p>
        <h2>My Projects</h2>
        <p className="section-head__desc">
          Full stack and frontend projects I have built while learning to ship complete applications.
          Click any project to see its details.
        </p>
      </div>

      <div className="filters reveal" id="filters">
        {filters.map(filter => (
          <button
            key={filter.id}
            type="button"
            className={`filter${activeFilter === filter.id ? " is-active" : ""}`}
            aria-pressed={activeFilter === filter.id}
            onClick={() => selectFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="ledger" id="ledger">
        {visibleProjects.map(project => (
          <ProjectRow
            key={project.title}
            project={project}
            index={projects.indexOf(project)}
            isOpen={openProject === project.title}
            onToggle={() => setOpenProject(current => current === project.title ? null : project.title)}
          />
        ))}
      </div>
    </section>
  );
}
