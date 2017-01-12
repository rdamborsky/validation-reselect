export default function apiMiddleware() {
  return (next) => (action) => {
    const { promise, types, ...params } = action;
    if (!promise) {
      return next(action);
    }
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...params, type: REQUEST });
    return promise.then(
      result => next({ ...params, result, type: SUCCESS }),
      error => next({ ...params, error, type: FAILURE })
    );
  };
}
