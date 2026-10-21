import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeHud, FooterHud } from '../components/Hud.jsx'
import Console from '../components/Console.jsx'
import Sprite, { AVATAR, COIN } from '../components/Sprite.jsx'
import { projects } from '../data/projects.js'
import { profile, attributes, experience, education, stages } from '../data/profile.js'

function SectionHead({ label, title, hint }) {
  return (
    <div className="shead">
      <div>
        <p className="eyebrow">{label}</p>
        <h2 className="h2">{title}</h2>
      </div>
      {hint && <p className="shead__hint">{hint}</p>}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero bg-stars">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <p className="tag">
            <i /> PLAYER 1 READY
          </p>
          <p className="hero__hello">HELLO, I&apos;M</p>
          <h1 className="hero__name">
            JUAN PABLO
            <br />
            ORTIZ MURILLO
          </h1>
          <p className="hero__role">{profile.tagline}</p>
          <p className="hero__summary">{profile.summary}</p>
          <div className="hero__cta">
            <a className="btn btn--green btn--lg" href="#levels">
              &gt; PRESS START
            </a>
            <a className="btn btn--outline btn--lg" href={profile.resume} target="_blank" rel="noreferrer">
              RESUME
            </a>
          </div>
        </div>
        <Console />
      </div>
    </section>
  )
}

function CoinBand() {
  const items = Array.from({ length: 10 })
  return (
    <div className="band" aria-hidden="true">
      <div className="band__track">
        {items.map((_, i) => (
          <span key={i}>
            <Sprite rows={COIN} cell={3} color="var(--sun)" /> INSERT COIN
          </span>
        ))}
      </div>
    </div>
  )
}

function Levels() {
  return (
    <section className="section section--alt" id="levels">
      <div className="wrap">
        <SectionHead label="[ 01 / MENU ]" title="SELECT LEVEL" hint="ARROWS: MOVE   A: ENTER" />
        <div className="cards">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/project/${p.slug}`}
              className="card"
              style={{ '--acc': p.accent }}
              aria-label={`Open ${p.cardTitle}`}
            >
              <div className="card__top">
                <span className="badge">LV.{String(p.level).padStart(2, '0')}</span>
                <span className="stars" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <i key={i} className={i < p.stars ? 'on' : ''} />
                  ))}
                </span>
              </div>
              <div className="card__cover">
                <img src={p.cover.src} width={p.cover.w} height={p.cover.h} alt={`${p.cardTitle} cover`} loading="lazy" />
              </div>
              <h3 className="card__title">{p.cardTitle}</h3>
              <p className="card__sub">{p.cardSub}</p>
              <span className="btn btn--acc btn--sm card__cta">&gt; PRESS A</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Profile() {
  return (
    <section className="section" id="profile">
      <div className="wrap">
        <SectionHead label="[ 02 / STATUS ]" title="PLAYER PROFILE" hint="CLASS: PRODUCT / UX/UI DESIGNER" />
        <div className="profile">
          <div className="panel panel--coral profile__avatar">
            <div className="profile__frame">
              <Sprite rows={AVATAR} cell={14} color="var(--blue)" />
            </div>
            <p className="profile__name">{profile.short}</p>
            <p className="profile__class">PRODUCT DESIGNER&nbsp; LV.07</p>
          </div>
          <div className="panel panel--blue profile__stats">
            <p className="eyebrow">ATTRIBUTES</p>
            {attributes.map(([label, value, color]) => (
              <div className="stat" key={label}>
                <span className="stat__label">{label}</span>
                <span className="stat__bar" aria-label={`${value} out of 10`}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <i key={i} style={i < value ? { background: `var(--${color})` } : undefined} />
                  ))}
                </span>
                <span className="stat__val">{value}/10</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dialog">
          <p className="dialog__who">{profile.short}:</p>
          <p className="dialog__text">{profile.dialog}</p>
          <p className="dialog__hint">v PRESS A TO CONTINUE</p>
        </div>
      </div>
    </section>
  )
}

function Quests({ id, label, title, hint, items, alt }) {
  return (
    <section className={`section ${alt ? 'section--alt' : ''}`} id={id}>
      <div className="wrap">
        <SectionHead label={label} title={title} hint={hint} />
        <div className="quests">
          {items.map((q) => (
            <article className={`quest ${q.status === 'ACTIVE' ? 'quest--active' : ''}`} key={q.title}>
              <span className="chip">{q.status || 'DONE'}</span>
              <div className="quest__body">
                <h3 className="quest__title">{q.title}</h3>
                <p className="quest__when">{q.when}</p>
                <p className="quest__desc">{q.desc}</p>
              </div>
              <span className="quest__tag">{q.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorldMap() {
  return (
    <section className="section" id="map">
      <div className="wrap">
        <SectionHead label="[ 04 / MAP ]" title="WORLD MAP" hint="SIX STAGES. ONE BOSS." />
        <div className="map">
          <svg className="map__path" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
            <polyline
              points="50,42 150,102 250,42 350,102 450,42 550,102"
              fill="none"
              stroke="var(--blue)"
              strokeWidth="3"
              strokeDasharray="8 8"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {stages.map(([code, name, desc, color], i) => (
            <div className="stage" key={code}>
              <span className={`stage__node ${i === 5 ? 'stage__node--boss' : ''}`} style={{ background: `var(--${color})` }}>
                {i === 5 ? '!' : i + 1}
              </span>
              <p className="stage__code">STAGE {code}</p>
              <h3 className="stage__name">{name}</h3>
              <p className="stage__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt('Copy email:', profile.email)
    }
  }
  return (
    <section className="contact bg-stars" id="contact">
      <div className="wrap">
        <div className="contact__title">
          <h2>CONTINUE?</h2>
          <span className="contact__count">09</span>
        </div>
        <p className="eyebrow contact__lead">INSERT A MESSAGE TO KEEP PLAYING.</p>
        <div className="panel panel--green contact__panel">
          <p className="eyebrow eyebrow--green">EMAIL</p>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email.toUpperCase()}
          </a>
          <p className="contact__loc">{profile.location}</p>
          <div className="contact__btns">
            <a className="btn btn--green" href={`mailto:${profile.email}`}>
              A&nbsp; SEND EMAIL
            </a>
            <button className="btn btn--outline" onClick={copy}>
              B&nbsp; {copied ? 'COPIED!' : 'COPY'}
            </button>
          </div>
          <div className="contact__links">
            {profile.links.map(([label, href], i) => (
              <a key={label} className={`btn btn--sm btn--outline ${i ? 'btn--coral-o' : 'btn--blue-o'}`} href={href} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HomeHud />
      <main>
        <Hero />
        <CoinBand />
        <Levels />
        <Profile />
        <Quests id="experience" label="[ 03 / QUESTS ]" title="EXPERIENCE" hint="MOST RECENT FIRST" items={experience} alt />
        <WorldMap />
        <Quests id="education" label="[ 05 / TRAINING ]" title="EDUCATION" hint="DEGREE & COURSES" items={education} alt />
        <Contact />
      </main>
      <FooterHud />
    </>
  )
}
