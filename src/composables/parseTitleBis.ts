export function isTVShow(title: string): boolean {
  // Check if the title contains at least two colons
  const colonCount = (title.match(/:/g) || []).length;
  return colonCount >= 2;
}

export const splitTitle = async (title: string): Promise<string[]> => {
  // Regular expression to match the pattern
  const regex =
    /^(.+?):\s*(Saison|Partie|Volume|Mini-série)\s*([\dI]+)?\s*:\s*(.*)$/i;
  const match = title.match(regex);

  if (match) {
    const [, showTitle, seasonKeyword, seasonNumber, episodeTitle] = match;
    return [
      showTitle.trim(),
      `${seasonKeyword} ${seasonNumber}`.trim(),
      episodeTitle.trim(),
    ];
  }

  // If the regex does not match, handle more complex cases
  const parts = title.split(":");
  if (parts.length > 3) {
    return [
      parts.slice(0, 2).join(":").trim(),
      parts[2].trim(),
      parts.slice(3).join(":").trim(),
    ];
  } else if (parts.length === 3) {
    return parts.map((part) => part.trim());
  }

  return [title.trim()];
};
