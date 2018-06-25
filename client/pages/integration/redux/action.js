/**
 * Created by ink on 2018/4/8.
 */
import {push} from 'react-router-redux'
export function home (data = '') {
  return {
    type: 'home_title',
    data
  }
}
export function center(data = '') {
  return {
    type: 'center_title',
    data
  }
}
export function jump(path = '') {
  return push(path)
}
