export const HEART = ['0110110', '1111111', '1111111', '0111110', '0011100', '0001000']
export const COIN = ['00111100', '01111110', '11100111', '11011011', '11011011', '11100111', '01111110', '00111100']
export const INVADER = ['00100000100', '00010001000', '00111111100', '01101110110', '11111111111', '10111111101', '10100000101', '00011011000']
export const AVATAR = ['001111111100', '011111111110', '111111111111', '110011110011', '110011110011', '111111111111', '111111111111', '110111111011', '111000000111', '011111111110', '001111111100', '000100001000']

// Pixel-art sprite drawn as crisp SVG rectangles.
export default function Sprite({ rows, cell = 3, color = 'currentColor', className }) {
  const w = rows[0].length
  const h = rows.length
  return (
    <svg
      className={className}
      width={w * cell}
      height={h * cell}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        [...row].map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} /> : null)),
      )}
    </svg>
  )
}

export function Hearts({ n = 3, cell = 3 }) {
  return (
    <span className="hearts" aria-label={`${n} lives`}>
      {Array.from({ length: n }).map((_, i) => (
        <Sprite key={i} rows={HEART} cell={cell} color="var(--coral)" />
      ))}
    </span>
  )
}
