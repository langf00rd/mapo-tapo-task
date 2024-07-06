/** saves a search query in local storage
 * @param searchQuery - search query to be saved in local storage
 */
export function saveQueryInSearchHistory(searchQuery: string) {
  const existingHistoryData = localStorage.getItem("search_history");
  let existingHistoryDataArray = existingHistoryData
    ? JSON.parse(existingHistoryData)
    : [];
  existingHistoryDataArray.push(searchQuery);
  const updatedArrayJson = JSON.stringify(existingHistoryDataArray);
  localStorage.setItem("search_history", updatedArrayJson);
}
