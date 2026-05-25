import verList from "../data/version_dict.json";
import translate from "../data/translation_dict.json";
type VersionKey = keyof typeof verList;

/**
 * Comparator function for sorting aspects by their translated names
 * @param {string} aspectA - First aspect key
 * @param {string} aspectB - Second aspect key
 * @param {Object.<string, string>} translateDict - Translation dictionary
 * @returns {number} -1 if a < b, 0 if equal, 1 if a > b
 */
export function compareAspectsByTranslation(
  aspectA: string,
  aspectB: string,
  translateDict: Record<string, string>,
) {
  if (aspectA === aspectB) return 0;

  const translatedA = translateDict[aspectA] || aspectA;
  const translatedB = translateDict[aspectB] || aspectB;

  return translatedA < translatedB ? -1 : 1;
}

export function getAspectsForVersion(
  version: VersionKey,
  enabledAddons: string[] = [],
): Array<keyof typeof translate> {
  const versionData = verList[version];
  const baseAspects = versionData.base_aspects || [];
  const combinations = versionData.combinations || {};

  const tierAspects = Object.keys(combinations);

  const combined = Array.from(
    new Set([...baseAspects, ...tierAspects /*, ...addonAspects*/]),
  );
  combined.sort((a, b) =>
    compareAspectsByTranslation(a, b, translate as Record<string, string>),
  );

  return combined as Array<keyof typeof translate>;
}

export function getInitialVersion(): VersionKey {
  const fallback = Object.keys(verList)[0] as VersionKey;

  try {
    const saved = localStorage.getItem("version") as VersionKey | null;
    return saved ?? fallback;
  } catch {
    return fallback;
  }
}
