import Sprite, { HEART, INVADER } from './Sprite.jsx'

// Handheld console illustration built with CSS.
export default function Console() {
  return (
    <div className="console" role="img" aria-label="Handheld game console showing PRESS START">
      <div className="console__star" />
      <div className="console__body">
        <div className="console__bezel">
          <div className="console__screen">
            <span className="console__hi">HI-SCORE 099999</span>
            <span className="console__press">PRESS START</span>
            <Sprite rows={INVADER} cell={6} color="#2F8F46" className="console__invader" />
            <span className="console__lives">
              {[0, 1, 2].map((i) => (
                <Sprite key={i} rows={HEART} cell={3} color="var(--coral)" />
              ))}
            </span>
          </div>
        </div>
        <div className="dpad">
          <i />
          <i />
        </div>
        <div className="abtn abtn--b">B</div>
        <div className="abtn abtn--a">A</div>
        <div className="pills">
          <i />
          <i />
        </div>
        <div className="slits">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
