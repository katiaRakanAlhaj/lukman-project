// src/utils/formatDate.js

/**
 * Format an ISO date string to DD-MM-YYYY.
 * @param {string} isoDate - e.g. "2024-05-13T10:00:00Z"
 * @returns {string} - e.g. "13-05-2024", or the original value if invalid.
 */
export const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return isoDate;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export default formatDate;