import { profile } from "@/app/lib/profile";

export const metadata = {
  title: `${profile.name} | Resume`,
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <section className="resume-sheet">
        <header className="resume-header">
          <div>
            <p className="eyebrow">resume draft</p>
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
          </div>
          <div className="resume-links">
            <a href={profile.links.github}>GitHub</a>
            <a href={profile.links.linkedin}>LinkedIn</a>
            <a href={profile.links.email}>Email</a>
            <a href={profile.links.resumePdf}>PDF</a>
          </div>
        </header>

        <section>
          <h2>Overview</h2>
          <p>{profile.shortBio}</p>
          <p>{profile.lookingFor}</p>
        </section>

        <section>
          <h2>Skills</h2>
          <p>{profile.skills.join(" / ")}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {profile.experience.map((item) => (
            <article key={`${item.role}-${item.organization}`}>
              <h3>{item.role}</h3>
              <p>
                {item.organization} | {item.period} | {item.location}
              </p>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section>
          <h2>Projects</h2>
          {profile.projects.map((project) => (
            <article key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <p>{project.impact}</p>
              <p>{project.stack.join(" / ")}</p>
            </article>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          {profile.education.map((item) => (
            <article key={item.school}>
              <h3>{item.school}</h3>
              <p>
                {item.degree} | {item.graduation}
              </p>
              <p>{item.details.join(" / ")}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
