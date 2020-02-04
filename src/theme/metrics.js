const metrics = {
  fullW: 1200,
  menuHeight: 50,
  mq: {
    vSmall: 320,
    small: 590,
    medium: 768,
    large: 1024,
    xLarge: 1440
  },
  padding: 1, // rem
  margin: 1, // rem
  dateTimeFontSize: 0.8, // rem
  cellFontSize: 0.9, // rem
  headerFontSize: 1.1, // rem
  fontWeight: 600,
  rowHeight: 3 // rem
}

export const mqs = {
  vSmall: `(max-width: ${metrics.mq.vSmall}px)`,
  small: `(max-width: ${metrics.mq.small}px)`,
  medium: `(max-width: ${metrics.mq.medium}px)`,
  large: `(max-width: ${metrics.mq.large}px)`,
  xLarge: `(max-width: ${metrics.mq.xLarge}px)`
}

export default metrics
