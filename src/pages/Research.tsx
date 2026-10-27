import { Fragment, type ReactNode } from "react";
import { FileText } from "lucide-react";
import { WorldOfText } from "../components/WorldOfText";
import { documents } from "../data/documents";
import { papers, type Paper } from "../data/papers";
import { sampleProjects } from "../data/projects";
import { bowAscii } from "../data/ascii";

const heading =
  "font-sans text-base font-semibold leading-tight tracking-tight text-black sm:text-lg";
const copy =
  "font-mono text-[13px] leading-relaxed text-neutral-800 sm:text-sm";
const projectTopics: Record<string, string> = {
  "privacy-period-tracker": "Privacy",
  "health-companion": "Web design",
  "design-system": "Civic tech",
};

function TextLink({
  href,
  children,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  arrow?: boolean;
}) {
  const external = href.startsWith("https://") || href.endsWith(".pdf");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-cursor-label="open"
      className="underline decoration-black/40 underline-offset-4 transition-colors duration-200 hover:bg-[#e4e8dc] hover:decoration-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
    >
      {children}
      {arrow && (
        <span aria-hidden="true" className="font-sans">
          {"\u00a0"}↗
        </span>
      )}
    </a>
  );
}

function ResearchEntries({ entries }: { entries: Paper[] }) {
  return (
    <ul className="mt-6 space-y-8">
      {entries.map((paper) => (
        <li key={paper.id}>
          {paper.category !== "resource" && (
            <p className="font-mono text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
              <>
                {paper.year}
                {paper.format && ` · ${paper.format}`}
              </>
            </p>
          )}
          <h3 className="mt-1 font-sans text-base font-semibold leading-snug tracking-tight text-black">
            {paper.href ? (
              <TextLink href={paper.href}>{paper.title}</TextLink>
            ) : (
              paper.title
            )}
            {paper.titleSuffix && ` (${paper.titleSuffix})`}
          </h3>
          {(paper.contributors ||
            paper.detail ||
            paper.detailEmphasis ||
            paper.venues) && (
            <div className="mt-2 space-y-1 font-mono text-[12px] leading-relaxed text-neutral-700 sm:text-[13px]">
              {paper.contributors ? (
                <p>
                  {paper.contributors.map((person, index) => (
                    <Fragment key={person.name}>
                      {index > 0 &&
                        (index === (paper.contributors?.length ?? 0) - 1
                          ? ", and "
                          : ", ")}
                      {person.href ? (
                        <TextLink href={person.href}>{person.name}</TextLink>
                      ) : (
                        <strong className="font-semibold">{person.name}</strong>
                      )}
                    </Fragment>
                  ))}
                </p>
              ) : (
                paper.detail &&
                paper.detail !== paper.format && (
                  <p>
                    {paper.detail
                      .split(/(Maja Mishevska)/)
                      .map((part, index) =>
                        part === "Maja Mishevska" ? (
                          <strong key={index} className="font-semibold">
                            {part}
                          </strong>
                        ) : (
                          part
                        ),
                      )}
                  </p>
                )
              )}
              {paper.detailEmphasis && (
                <p className={paper.id === "steinhaus-zisson-grant" ? undefined : "font-bold"}>
                  {paper.detailEmphasisHref ? (
                    <TextLink href={paper.detailEmphasisHref}>
                      {paper.detailEmphasis}
                    </TextLink>
                  ) : (
                    paper.detailEmphasis
                  )}
                </p>
              )}
              {paper.venues && (
                <ul className="space-y-1">
                  {paper.venues.map((venue) => (
                    <li key={venue.label}>
                      {(paper.venues?.length ?? 0) > 1 && (
                        <span aria-hidden="true">• </span>
                      )}
                      {venue.href ? (
                        <TextLink href={venue.href}>{venue.label}</TextLink>
                      ) : venue.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {paper.description && (
            <p className="mt-3 font-mono text-[12px] leading-relaxed text-neutral-800 sm:text-[13px]">
              {paper.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Research() {
  return (
    <>
      <div className="overflow-x-clip px-5 pb-10 pt-5 sm:px-8 sm:pb-12 sm:pt-6 lg:px-10 lg:pb-16 lg:pt-8">
        <div className="grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <aside className="flex min-w-0 flex-col lg:sticky lg:top-8 lg:min-h-[calc(100dvh-4rem)]">
            <header className="flow-root w-full">
              <div className="relative float-left mb-2 mr-4 w-20 sm:mr-6 sm:w-24">
                <img
                  src="/about/internship/1.png"
                  alt="Maja Mishevska holding a rabbit"
                  width={2230}
                  height={2973}
                  className="aspect-[3/4] w-full object-cover"
                  decoding="async"
                />
                <pre
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-2 left-1/2 z-10 m-0 -translate-x-1/2 select-none whitespace-pre font-mono text-[2.5px] leading-[1.05] text-[#74805f] sm:-top-3 sm:text-[3px]"
                >
                  {bowAscii}
                </pre>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <h1 className={heading}>Maja Mishevska</h1>
              </div>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
                CS + GNSS @ Brown ’27 · Former SDE Intern @ AWS
              </p>
              <div className={`mt-6 ${copy}`}>
                <p>
                  <span data-cursor-label="hello">Zdravo!</span> I’m{" "}
                  <strong
                    className="font-semibold"
                    data-cursor-label="/mai · uh/"
                  >
                    Maja
                  </strong>
                  , a researcher, designer, and technologist studying intimacy
                  and privacy in emerging technologies through the lens of{" "}
                  <span className="whitespace-nowrap bg-[#e4e8dc] px-1.5 py-0.5 font-medium text-black">
                    gender and power
                  </span>
                  . My current work examines AI-generated intimate imagery and
                  how AI systems account for privacy in vulnerable contexts.
                </p>
              </div>
              <div className={`mt-5 ${copy}`}>
                <p>
                  I’m a research assistant in Professor{" "}
                  <TextLink href="https://dfreed.me/">Diana Freed’s</TextLink>{" "}
                  SWRL lab and work with Brown’s{" "}
                  <TextLink href="https://cntr.brown.edu/">CNTR</TextLink>. I’ve
                  also served as a TA and Head TA for{" "}
                  <TextLink href="https://cs.brown.edu/courses/info/csci1302/">
                    CSCI1302
                  </TextLink>{" "}
                  for four semesters (half of my time at Brown)! I’m pursuing a
                  BS in Computer Science and a BA in Gender and Sexuality
                  Studies at Brown University, always finding ways to put the two{" "}
                  <span className="whitespace-nowrap bg-[#e4e8dc] px-1.5 py-0.5 font-medium text-black">
                    in conversation
                  </span>
                  .
                </p>
              </div>
            </header>
            <div className="mt-6 w-full">
              <p className={`mb-5 break-words ${copy}`}>
                Contact me at{" "}
                <span className="inline-flex max-w-full items-baseline gap-0.5 align-baseline">
                  <TextLink href="mailto:maja_mishevska@brown.edu">
                    maja_mishevska@brown.edu
                  </TextLink>
                  <span
                    aria-hidden="true"
                    className="text-xl leading-none text-[#74805f]"
                  >
                    ★
                  </span>
                </span>
              </p>
              <nav aria-labelledby="index-heading">
                <h2
                  id="index-heading"
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500"
                >
                  Table of Contents
                </h2>
                <ul className="mt-2 space-y-1 font-mono text-[13px] leading-relaxed text-neutral-500 sm:text-sm">
                  <li>
                    <TextLink href="#research-writing">
                      Research & Writing
                    </TextLink>
                  </li>
                  <li>
                    <TextLink href="#research-resources">
                      Research Tools & Resources
                    </TextLink>
                  </li>
                  <li>
                    <TextLink href="#fellowships-programs">
                      Fellowships & Honors
                    </TextLink>
                  </li>
                  <li>
                    <TextLink href="#selected-projects">
                      Selected Projects
                    </TextLink>
                  </li>
                  {/* <li>
                    <TextLink href="/about" arrow>
                      About Me
                    </TextLink>
                  </li> */}
                </ul>
              </nav>
            </div>
            <div
              className="mt-8 flex items-center gap-2 lg:mt-auto lg:pt-8"
              aria-label="Profile links"
            >
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/majamishevska",
                  icon: (
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.53 2.865 8.373 6.839 9.729.5.095.682-.22.682-.489 0-.242-.009-.883-.014-1.733-2.782.616-3.369-1.37-3.369-1.37-.455-1.184-1.11-1.5-1.11-1.5-.907-.64.069-.627.069-.627 1.003.072 1.531 1.056 1.531 1.056.892 1.565 2.341 1.113 2.91.85.091-.67.349-1.113.635-1.369-2.22-.26-4.555-1.14-4.555-5.072 0-1.12.389-2.034 1.029-2.752-.103-.26-.446-1.309.098-2.728 0 0 .84-.276 2.75 1.05A9.25 9.25 0 0 1 12 6.994a9.25 9.25 0 0 1 2.504.35c1.909-1.326 2.748-1.05 2.748-1.05.546 1.419.203 2.468.1 2.728.64.718 1.028 1.632 1.028 2.752 0 3.942-2.338 4.809-4.566 5.064.359.316.679.94.679 1.894 0 1.367-.013 2.47-.013 2.807 0 .27.18.588.688.488A10.02 10.02 0 0 0 22 12.253C22 6.588 17.523 2 12 2Z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/maja-mishevska/",
                  icon: (
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.371 4.267 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.114 20.452H3.558V9h3.556v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                    </svg>
                  ),
                },
                {
                  label: "Bluesky",
                  href: "https://bsky.app/profile/mmishevs.bsky.social",
                  icon: (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                    >
                      <path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" />
                    </svg>
                  ),
                },
                {
                  label: "Resume",
                  href: documents.resumePdf,
                  icon: (
                    <FileText
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      strokeWidth={1.5}
                    />
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  data-cursor-label="open"
                  className="inline-flex h-7 w-7 items-center justify-center border border-black text-black transition-colors duration-200 hover:bg-[#e4e8dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  {icon}
                </a>
              ))}
            </div>
          </aside>
          <div className="min-w-0 space-y-12">
            <section aria-labelledby="research-writing">
              <h2 id="research-writing" className={`scroll-mt-10 ${heading}`}>
                Research & Writing
              </h2>
              <ResearchEntries
                entries={papers.filter((paper) => !paper.category)}
              />
            </section>
            <section
              aria-labelledby="research-resources"
              className="relative pt-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 w-screen border-t border-[#74805f]"
              />
              <h2 id="research-resources" className={`scroll-mt-10 ${heading}`}>
                Research Tools & Resources
              </h2>
              <ResearchEntries
                entries={papers.filter(
                  (paper) => paper.category === "resource",
                )}
              />
            </section>
            <section
              aria-labelledby="fellowships-programs"
              className="relative py-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 w-screen border-t border-[#74805f]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 w-screen border-t border-[#74805f]"
              />
              <h2
                id="fellowships-programs"
                className={`scroll-mt-10 ${heading}`}
              >
                Fellowships & Honors
              </h2>
              <ul className="mt-6 space-y-5">
                {papers
                  .filter((paper) => paper.category === "program")
                  .map((paper) => (
                    <li key={paper.id}>
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1">
                        <h3 className="min-w-0 font-sans text-base font-medium leading-snug tracking-tight text-black">
                          {paper.title}
                        </h3>
                        <p className="shrink-0 font-mono text-[11px] text-neutral-500 sm:text-xs">
                          {paper.year}
                        </p>
                      </div>
                      <p className="mt-1 font-mono text-[12px] leading-relaxed text-neutral-700 sm:text-[13px]">
                        {paper.detail}
                      </p>
                    </li>
                  ))}
              </ul>
            </section>
            <section aria-labelledby="selected-projects">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2
                  id="selected-projects"
                  className={`scroll-mt-10 ${heading}`}
                >
                  Selected Projects
                </h2>
                {/* <p className="font-mono text-xs">
                  <TextLink href="/projects" arrow>
                    All projects
                  </TextLink>
                </p> */}
              </div>
              <ul className={`mt-6 space-y-3 ${copy}`}>
                {sampleProjects
                  .filter((project) => project.id !== "maps-experiment")
                  .map((project) => (
                    <li
                      key={project.id}
                      className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6"
                    >
                      <span className="min-w-0">
                        <TextLink href={project.href}>{project.title}</TextLink>
                      </span>
                      <span className="shrink-0 text-right text-xs text-neutral-500">
                        {projectTopics[project.id]} · {project.year}
                      </span>
                    </li>
                  ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
      <WorldOfText />
    </>
  );
}
