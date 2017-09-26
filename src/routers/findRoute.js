export default function findRoute(path, routes) {
  const route = routes.find(r => r.path === path);
  return {
    route,
  };
}
