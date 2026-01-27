
export const getGameDefinitionUrl = (gameId: string) => {
  // const baseUrl = typeof __webpack_public_path__ === 'undefined' ? '' : __webpack_public_path__;
  const baseUrl = '/';
  return `${baseUrl}definitions/${gameId}.json`;
}
