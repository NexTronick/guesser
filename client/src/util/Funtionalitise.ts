export const firstLetterUppercase = (text: string) => {
  return text.replace(text[0], text[0].toUpperCase());
};

export const printUnderline = (text: string) => {
  let underlines = "";
  for (let i = 1; i < text.length; i++) {
    underlines += " _";
  }
  return underlines;
};

