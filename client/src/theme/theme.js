import getMuiTheme from 'material-ui/styles/getMuiTheme'

const dracula = {
  background: "#282a36",
  currentLine: "#44475a",
  selection: "#44475a",
  foreground: "#f8f8f2",
  comment: "#6272a4",
  cyan: "#8be9fd",
  green: "#50fa7b",
  orange: "#ffb86c",
  pink: "#ff79c6",
  purple: "#bd93f9",
  red: "#ff5555",
  yellow: "#f1fa8c"
}

export const backgroundColor = dracula.background

export const accentColor = dracula.cyan
export const accentColor2 = dracula.green
export const accentColor3 = dracula.orange
export const accentColor4 = dracula.pink
export const accentColor5 = dracula.purple
export const accentColor6 = dracula.yellow

export const textColor = dracula.foreground

export const errorColor = dracula.red
export const infoNotif = dracula.cyan
export const affirmativeColor = dracula.green
export const negativeColor = dracula.red

export const muiTheme = getMuiTheme({
  palette: {
    textColor: dracula.foreground,
    alternateTextColor: dracula.currentLine,
    primary1Color: dracula.background,
    primary2Color: dracula.selection,
    accent1Color: dracula.cyan,
    accent2Color: dracula.orange,
    canvasColor: backgroundColor,
    borderColor: dracula.comment,
  },
  appBar: {
    height: 50,
  },
})