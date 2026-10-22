// Tetris rules, with no visuals. The board is COLS x ROWS; empty cells are 0,
// filled cells hold a colour name used by the screen.
export const COLS = 10
export const ROWS = 20

const PIECES = {
  I: { color: 'blue', cells: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]] },
  O: { color: 'sun', cells: [[1, 1], [1, 1]] },
  T: { color: 'purple', cells: [[0, 1, 0], [1, 1, 1], [0, 0, 0]] },
  S: { color: 'green', cells: [[0, 1, 1], [1, 1, 0], [0, 0, 0]] },
  Z: { color: 'coral', cells: [[1, 1, 0], [0, 1, 1], [0, 0, 0]] },
  J: { color: 'blue', cells: [[1, 0, 0], [1, 1, 1], [0, 0, 0]] },
  L: { color: 'orange', cells: [[0, 0, 1], [1, 1, 1], [0, 0, 0]] },
}
const NAMES = Object.keys(PIECES)
const LINE_POINTS = [0, 100, 300, 500, 800]

const emptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0))
const randomName = () => NAMES[Math.floor(Math.random() * NAMES.length)]

function makePiece(name) {
  const { cells, color } = PIECES[name]
  return { cells, color, x: Math.floor((COLS - cells[0].length) / 2), y: 0 }
}

const rotateCW = (m) => m[0].map((_, x) => m.map((row) => row[x]).reverse())

function collides(board, piece, dx = 0, dy = 0, cells = piece.cells) {
  for (let y = 0; y < cells.length; y++) {
    for (let x = 0; x < cells[y].length; x++) {
      if (!cells[y][x]) continue
      const bx = piece.x + x + dx
      const by = piece.y + y + dy
      if (bx < 0 || bx >= COLS || by >= ROWS) return true
      if (by >= 0 && board[by][bx]) return true
    }
  }
  return false
}

// Cells of the falling piece as [column, row, colour] triples (for drawing).
export function pieceCells(piece) {
  const out = []
  piece.cells.forEach((row, y) =>
    row.forEach((v, x) => {
      if (v) out.push([piece.x + x, piece.y + y, piece.color])
    }),
  )
  return out
}

export function ghostY(state) {
  let dy = 0
  while (!collides(state.board, state.piece, 0, dy + 1)) dy++
  return state.piece.y + dy
}

export const idleState = { status: 'idle', board: emptyBoard(), score: 0, lines: 0, level: 1 }

export function newGame() {
  const first = randomName()
  const piece = makePiece(first)
  return {
    status: 'playing',
    board: emptyBoard(),
    piece,
    next: randomName(),
    score: 0,
    lines: 0,
    level: 1,
  }
}

export const tickDelay = (level) => Math.max(100, 800 - (level - 1) * 70)

function lock(state) {
  const board = state.board.map((row) => row.slice())
  for (const [x, y, color] of pieceCells(state.piece)) {
    if (y >= 0) board[y][x] = color
  }
  const kept = board.filter((row) => row.some((c) => !c))
  const cleared = ROWS - kept.length
  while (kept.length < ROWS) kept.unshift(Array(COLS).fill(0))

  const lines = state.lines + cleared
  const level = Math.floor(lines / 10) + 1
  const score = state.score + LINE_POINTS[cleared] * state.level
  const piece = makePiece(state.next)
  const next = randomName()
  const over = collides(kept, piece)
  return { ...state, board: kept, piece, next, lines, level, score, status: over ? 'over' : 'playing' }
}

const move = (state, dx) =>
  collides(state.board, state.piece, dx, 0) ? state : { ...state, piece: { ...state.piece, x: state.piece.x + dx } }

// One step down: the piece falls, or locks when it lands.
const fall = (state) =>
  collides(state.board, state.piece, 0, 1) ? lock(state) : { ...state, piece: { ...state.piece, y: state.piece.y + 1 } }

function rotate(state) {
  const cells = rotateCW(state.piece.cells)
  // Small "wall kick": try shifting sideways if the turn hits a wall.
  for (const dx of [0, -1, 1, -2, 2]) {
    if (!collides(state.board, state.piece, dx, 0, cells)) {
      return { ...state, piece: { ...state.piece, cells, x: state.piece.x + dx } }
    }
  }
  return state
}

function hardDrop(state) {
  const dropped = { ...state, piece: { ...state.piece, y: ghostY(state) } }
  return lock({ ...dropped, score: dropped.score + 2 * (dropped.piece.y - state.piece.y) })
}

export function reducer(state, action) {
  if (action === 'START') return newGame()
  if (action === 'QUIT') return idleState
  if (state.status !== 'playing') return state
  switch (action) {
    case 'LEFT':
      return move(state, -1)
    case 'RIGHT':
      return move(state, 1)
    case 'ROTATE':
      return rotate(state)
    case 'DOWN':
      return fall({ ...state, score: state.score + (collides(state.board, state.piece, 0, 1) ? 0 : 1) })
    case 'DROP':
      return hardDrop(state)
    case 'TICK':
      return fall(state)
    default:
      return state
  }
}
