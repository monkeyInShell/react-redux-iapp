/**
 * Created by ink on 2018/4/8.
 */
export function center (state = {title: '欢迎来到个人中心'}, action) {
  switch (action.type) {
    case 'center_title':
      return Object.assign({}, state, {title: action.data})
    default:
      return state
  }
}

export function home (state = {title: '默认首页'}, action) {
  switch (action.type) {
    case 'home_title':
      return Object.assign({}, state, {title: action.data})
    default:
      return state
  }
}