const facts = [
  { label: "Based in", value: "India" },
  { label: "Focus", value: "Full Stack Development" },
  { label: "Currently", value: "B.Tech CSE-DS Student" }
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__grid">
        <div className="about__figure reveal">
          <svg viewBox="0 0 320 320" className="about__mark" aria-hidden="true">
            <circle cx="160" cy="160" r="118" className="ring ring--1" />
            <circle cx="160" cy="160" r="86" className="ring ring--2" />
            <line x1="160" y1="20" x2="160" y2="300" className="ring ring--3" />
            <line x1="20" y1="160" x2="300" y2="160" className="ring ring--3" />
            <text x="160" y="172" textAnchor="middle" className="about__initials">MA</text>
          </svg>
        </div>

        <div className="about__copy reveal">
          <p className="eyebrow">About Me</p>
          <h2>A full stack developer learning by building real projects.</h2>

          <p>
            Hello! I’m Mohammed Ajaz Ahmed, a B.Tech Computer Science and Data Science
            student at VNR VJIET, Hyderabad, India. I’m passionate about software
            development, web technologies, and solving real-world problems through code.
          </p>

          <p>
            I work with Java, JavaScript, React.js, Node.js, Express.js, and MongoDB, and
            I’m building full-stack projects using REST APIs, database integration, and
            authentication. I also practise Data Structures and Algorithms in Java on
            LeetCode and use Git and GitHub to manage my code.
          </p>

          <p>
            I’m actively looking for software development internships where I can apply
            my skills, build impactful projects, learn from experienced developers, and
            contribute to a team.
          </p>

          <div className="about__facts">
            {facts.map(fact => (
              <div className="fact" key={fact.label}>
                <span className="fact__k">{fact.label}</span>
                <span className="fact__v">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
