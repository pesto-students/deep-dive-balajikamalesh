function pathSatisfies(predicate, path, object) {
  if (path.length === 0) return false;

  const firstElement = path.shift();
  let visitedPath = object[firstElement];
  
  path.forEach(element => {
    visitedPath = visitedPath[element];
  });
  
  if (visitedPath === undefined) return false;
  return predicate(visitedPath);
}

export {
  pathSatisfies,
};
