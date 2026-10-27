import { ProjectCard } from './ProjectCard'
import { sampleProjects } from '../data/projects'

type MoreProjectsProps = {
  currentProjectId: string
}

export function MoreProjects({ currentProjectId }: MoreProjectsProps) {
  const projects = sampleProjects
    .filter((project) => project.id !== currentProjectId && !project.placeholder)
    .slice(0, 3)

  if (projects.length === 0) return null

  return (
    <section className="border-t border-black bg-neutral-100 px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5">
          <h2 className="font-mono text-[13px] font-medium uppercase leading-relaxed tracking-[0.12em] text-neutral-800 sm:text-sm">
            Visit another project
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5 lg:gap-6 [&_.font-sans.text-base]:leading-[1.05] [&_.font-sans.text-base]:sm:leading-[1.05]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} showTags={false} />
          ))}
        </div>
      </div>
    </section>
  )
}
