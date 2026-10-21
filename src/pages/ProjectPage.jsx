import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProjectHud, FooterHud } from '../components/Hud.jsx'
import { getProject, nextProject } from '../data/projects.js'

function Shot({ image, alt, eager }) {
  return (
    <figure className="shot" style={image.max ? { maxWidth: `${image.max}px` } : undefined}>
      <img
        src={image.src}
        width={image.w}
        height={image.h}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </figure>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const p = getProject(slug)

  useEffect(() => {
    if (p) document.title = `${p.title} — Juan Pablo Ortiz Murillo`
    return () => {
      document.title = 'Juan Pablo Ortiz Murillo — Product Designer | UX/UI Designer'
    }
  }, [p])

  if (!p) return <Navigate to="/" replace />
  const next = nextProject(p)

  return (
    <div className="project" style={{ '--acc': p.accent, '--acc-t': p.accentText }}>
      <ProjectHud level={p.level} />
      <main>
        <section className="phero bg-stars">
          <div className="wrap">
            <div className="phero__tags">
              <span className="badge badge--acc">LEVEL {String(p.level).padStart(2, '0')}</span>
              <span className="phero__cat">{p.category}</span>
            </div>
            <h1 className="phero__title">{p.title}</h1>
            <p className="phero__tagline">{p.tagline}</p>
            <Shot image={p.hero} alt={`${p.title} hero`} eager />
          </div>
        </section>

        <section className="wrap meta">
          {p.meta.map(([k, v]) => (
            <div className="meta__cell" key={k}>
              <p className="eyebrow">{k}</p>
              <p className="meta__val">{v}</p>
            </div>
          ))}
        </section>

        {p.sections.map((s, i) => (
          <section
            key={`${s.title}-${i}`}
            className={`section ${i % 2 === 0 ? 'section--alt' : ''} ${s.center ? 'section--center' : ''}`}
            style={s.accent ? { '--acc': s.accent, '--acc-t': s.accentText } : undefined}
          >
            <div className="wrap">
              {s.title && (
                <div className="phead">
                  <p className="eyebrow eyebrow--acc">{s.label}</p>
                  <h2 className="h2 h2--sm">{s.title}</h2>
                  {s.sub && <p className="phead__sub">{s.sub}</p>}
                </div>
              )}
              <div className={`shots ${s.row ? 'shots--row' : ''}`}>
                {s.images.map((im, k) => (
                  <Shot key={k} image={im} alt={`${s.title || p.title} ${k + 1}`} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="next">
          <div className="wrap next__inner">
            <div>
              <p className="eyebrow">NEXT LEVEL</p>
              <p className="next__title">{next.cardTitle}</p>
            </div>
            <Link to={`/project/${next.slug}`} className="btn btn--acc btn--lg">
              &gt; PRESS START
            </Link>
          </div>
        </section>
      </main>
      <FooterHud />
    </div>
  )
}
