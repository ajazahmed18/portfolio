const skillGroups = [
  { title: "Programming & Fundamentals", skills: ["Java", "Data Structures and Algorithms", "JavaScript"] },
  { title: "Frontend", skills: ["HTML", "CSS", "React.js"] },
  { title: "Backend & Database", skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "SQL"] },
  { title: "Tools", skills: ["Git", "GitHub"] }
];

export default function Skills() {
  return (
    <section className="toolbox" id="skills">
      <div className="section-head reveal">
        <p className="eyebrow">My Toolbox</p>
        <h2>Skills I use and learn</h2>
        <p className="section-head__desc">Languages, interface, backend, and workflow tools I use across my projects.</p>
      </div>

      <div className="toolbox__grid">
        {skillGroups.map((group, index) => (
          <article className="tool-cat reveal" key={group.title}>
            <div className="tool-cat__head">
              <span className="tool-cat__index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
            </div>
            <ul className="tool-cat__skills">
              {group.skills.map(skill => <li key={skill}>{skill}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
