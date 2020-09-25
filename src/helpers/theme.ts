import preset from '@rebass/preset'

const breakpoints = ['576px', '768px', '992px', '1440px']
const space = [0, 4, 8, 16, 24, 32, 48, 64]
const fontSizes = [12, 14, 16, 20, 24, 32]

export const theme = { ...preset, breakpoints, space, fontSizes }
