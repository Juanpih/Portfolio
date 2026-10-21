import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sprite, { AVATAR, COIN, Hearts } from './Sprite.jsx'
import { profile } from '../data/profile.js'

const links = [
  ['HOME', '#top'],
  ['LEVELS', '#levels'],
  ['PROFILE', '#profile'],
  ['EXPERIENCE', '#experience'],
  ['MAP', '#map'],
  ['EDUCATION', '#education'],
  ['CONTACT', '#contact'],
]

export function HomeHud() {
  const [open, setOpen] = useState(false)
  return (
    <header className="hud" id="top">
      <a className="hud__player" href="#top">
        <Sprite rows={AVATAR} cell={3} color="var(--blue)" />
        <span>P1&nbsp; {profile.short}</span>
      </a>
      <nav className={`hud__nav ${open ? 'is-open' : ''}`} aria-label="Main">
        {links.map(([label, href], i) => (
          <a key={label} href={href} className={i === 0 ? 'is-active' : ''} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="hud__stats">
        <Hearts />
        <span className="hud__coins">
          <Sprite rows={COIN} cell={3} color="var(--sun)" />
          x06
        </span>
      </div>
      <button className="hud__burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <i />
        <i />
        <i />
      </button>
    </header>
  )
}

export function ProjectHud({ level }) {
  return (
    <header className="hud hud--project">
      <Link to="/" className="btn btn--outline btn--sm">
        &lt; BACK TO MENU
      </Link>
      <span className="hud__level">LEVEL {String(level).padStart(2, '0')} / 06</span>
      <div className="hud__stats">
        <Hearts />
        <Sprite rows={AVATAR} cell={3} color="var(--blue)" />
      </div>
    </header>
  )
}

export function FooterHud() {
  return (
    <footer className="footer">
      <div className="footer__hints">
        <span>
          <b style={{ background: 'var(--green)' }}>A</b>SELECT
        </span>
        <span>
          <b style={{ background: 'var(--coral)' }}>B</b>BACK
        </span>
        <span>
          <b style={{ background: 'var(--sun)' }}>START</b>MENU
        </span>
      </div>
      <span>(C) 2026 {profile.name}</span>
    </footer>
  )
}
