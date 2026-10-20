const profiles = [
  {
    name: "GitHub",
    value: "@ajazahmed18",
    description: "Source code for my full stack and frontend projects.",
    href: "https://github.com/ajazahmed18"
  },
  {
    name: "LeetCode",
    value: "@ajazahmed18",
    description: "Data structures and algorithms practice.",
    href: "https://leetcode.com/u/ajazahmed18/"
  },
  {
    name: "LinkedIn",
    value: "Mohammed Ajaz Ahmed",
    description: "Professional profile and experience.",
    href: "https://www.linkedin.com/in/mohammad-ajaz-ahmed-341901378/"
  }
];

export default function Profiles() {
  return (
    <section className="profiles" id="profiles">
      <div className="section-head reveal">
        <p className="eyebrow">Find Me Online</p>
        <h2>Code and practice</h2>
        <p className="section-head__desc">Explore my projects, problem-solving practice, and professional profile.</p>
      </div>

      <div className="profiles__grid">
        {profiles.map(profile => (
          <a className="profile-card reveal" href={profile.href} target="_blank" rel="noopener" key={profile.name}>
            <span className="profile-card__k">{profile.name}</span>
            <span className="profile-card__v">{profile.value}</span>
            <span className="profile-card__d">{profile.description}</span>
            <span className="profile-card__go">Open profile ↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
