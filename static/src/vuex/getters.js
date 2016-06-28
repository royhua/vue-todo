import store from './store';

export function isLogin (state = store.state) {
  return state.user.current !== null;
}
