import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import Sprite, { HEART, INVADER } from './Sprite.jsx'
import { COLS, ROWS, ghostY, idleState, pieceCells, reducer, tickDelay } from '../game/tetris.js'

const HI_KEY = 'portfolio-tetris-hi'
const KEYS = {
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  ArrowDown: 'DOWN',
  ArrowUp: 'ROTATE',
  ' ': 'DROP',
}

const pad6 = (n) => String(n).padStart(6, '0')

function readHi() {
  try {
    return Number(localStorage.getItem(HI_KEY)) || 0
  } catch {
    return 0
  }
}

// A console button that also works by touch. Held buttons repeat.
function PadButton({ action, send, repeat = false, className, label, children }) {
  const timer = useRef(null)
  const stop = () => {
    clearInterval(timer.current)
    clearTimeout(timer.current)
  }
  useEffect(() => stop, [])
  const down = (e) => {
    e.preventDefault()
    send(action)
    if (repeat) {
      stop()
      timer.current = setTimeout(() => {
        timer.current = setInterval(() => send(action), 90)
      }, 250)
    }
  }
  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      onPointerDown={down}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onKeyDown={(e) => {
        // Enter or Space on a focused button presses it once.
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          e.stopPropagation()
          send(action)
        }
      }}
    >
      {children}
    </button>
  )
}

function Block({ x, y, color, ghost = false }) {
  return (
    <rect
      x={x + 0.06}
      y={y + 0.06}
      width="0.88"
      height="0.88"
      fill={ghost ? 'none' : `var(--${color})`}
      stroke={ghost ? `var(--${color})` : 'none'}
      strokeWidth="0.08"
      opacity={ghost ? 0.5 : 1}
    />
  )
}

function GameScreen({ state, hi }) {
  const { board, piece, next, score, lines, level, status } = state
  const nextCells = pieceCells({ ...piece, x: 0, y: 0, cells: nextShape(next) })
  const cells = []
  board.forEach((row, y) => row.forEach((c, x) => c && cells.push([x, y, c])))
  const ghost = status === 'playing' ? pieceCells({ ...piece, y: ghostY(state) }) : []
  const shown = Math.max(hi, score)
  return (
    <svg className="console__game" viewBox="0 0 27 20" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="2" y="0" width={COLS} height={ROWS} fill="#060820" stroke="var(--blue)" strokeWidth="0.1" />
      {ghost.map(([x, y, c]) => (
        <Block key={`g${x}-${y}`} x={x + 2} y={y} color={c} ghost />
      ))}
      {cells.map(([x, y, c]) => (
        <Block key={`b${x}-${y}`} x={x + 2} y={y} color={c} />
      ))}
      {status === 'playing' &&
        pieceCells(piece).map(([x, y, c]) => <Block key={`p${x}-${y}`} x={x + 2} y={y} color={c} />)}
      <g fontFamily="var(--px)" fontSize="0.9">
        <text x="14" y="1.4" fill="var(--sun)">HI</text>
        <text x="14" y="2.7" fill="var(--sun)">{pad6(shown)}</text>
        <text x="14" y="5" fill="var(--blue)">SCORE</text>
        <text x="14" y="6.3" fill="var(--ink)">{pad6(score)}</text>
        <text x="14" y="8.6" fill="var(--green)">LINES {lines}</text>
        <text x="14" y="10.2" fill="var(--coral)">LEVEL {level}</text>
        <text x="14" y="12.6" fill="var(--dim)">NEXT</text>
      </g>
      <g transform="translate(15 13.4)">
        {nextCells.map(([x, y, c]) => (
          <Block key={`n${x}-${y}`} x={x} y={y} color={c} />
        ))}
      </g>
      {status === 'over' && (
        <g fontFamily="var(--px)" textAnchor="middle">
          <rect x="2" y="7" width={COLS} height="6" fill="#060820" stroke="var(--coral)" strokeWidth="0.1" />
          <text x="7" y="9.6" fontSize="1.1" fill="var(--coral)">GAME OVER</text>
          <text x="7" y="11.6" fontSize="0.8" fill="var(--blue)">PRESS START</text>
        </g>
      )}
    </svg>
  )
}

const NEXT_SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
}
function nextShape(name) {
  return NEXT_SHAPES[name]
}

// Handheld console. It looks like a mockup until START is pressed, then the screen runs Tetris.
export default function Console() {
  const [state, dispatch] = useReducer(reducer, idleState)
  const [hi, setHi] = useState(readHi)
  const active = state.status !== 'idle'
  const send = useCallback((action) => dispatch(action), [])

  // Gravity.
  useEffect(() => {
    if (state.status !== 'playing') return
    const id = setInterval(() => dispatch('TICK'), tickDelay(state.level))
    return () => clearInterval(id)
  }, [state.status, state.level])

  // Save the best score when a game ends.
  useEffect(() => {
    if (state.status === 'over' && state.score > hi) {
      setHi(state.score)
      try {
        localStorage.setItem(HI_KEY, String(state.score))
      } catch {
        /* storage unavailable: the score just won't be remembered */
      }
    }
  }, [state.status, state.score, hi])

  // Keyboard is only captured while a game is on, so the page scrolls normally otherwise.
  useEffect(() => {
    if (!active) return
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Escape') {
        e.preventDefault()
        dispatch('QUIT')
      } else if (state.status === 'over' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        dispatch('START')
      } else if (KEYS[e.key]) {
        e.preventDefault()
        dispatch(KEYS[e.key])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, state.status])

  return (
    <div className="console" role="group" aria-label="Handheld game console with a Tetris game. Press START to play.">
      <div className="console__star" />
      <div className="console__body">
        <div className="console__bezel">
          <div className="console__screen">
            {active ? (
              <GameScreen state={state} hi={hi} />
            ) : (
              <>
                <span className="console__hi">HI-SCORE {hi ? pad6(hi) : '099999'}</span>
                <span className="console__press">PRESS START</span>
                <Sprite rows={INVADER} cell={6} color="var(--green)" className="console__invader" />
                <span className="console__lives">
                  {[0, 1, 2].map((i) => (
                    <Sprite key={i} rows={HEART} cell={3} color="var(--coral)" />
                  ))}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="dpad">
          <i />
          <i />
          <PadButton action="ROTATE" send={send} className="dpad__btn dpad__btn--up" label="Rotate" />
          <PadButton action="DOWN" send={send} repeat className="dpad__btn dpad__btn--down" label="Move down" />
          <PadButton action="LEFT" send={send} repeat className="dpad__btn dpad__btn--left" label="Move left" />
          <PadButton action="RIGHT" send={send} repeat className="dpad__btn dpad__btn--right" label="Move right" />
        </div>
        <PadButton action="DROP" send={send} className="abtn abtn--b" label="Drop piece">
          B
        </PadButton>
        <PadButton action="ROTATE" send={send} className="abtn abtn--a" label="Rotate piece">
          A
        </PadButton>
        <div className="pills">
          <PadButton action="START" send={send} className="pills__start" label="Start game" />
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
