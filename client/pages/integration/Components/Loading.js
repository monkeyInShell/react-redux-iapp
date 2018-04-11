/**
 * Created by ink on 2018/4/11.
 */
import React from 'react'
function Loading(props) {
  let content = ''
  if (props.error) {
    content = props.error
  } else if (props.timedOut) {
    content = '加载超时'
  } else if (props.pastDelay) {
    content = '加载中...'
  } else {
    content = '加载中...'
  }
  return <div>{content}</div>
}
export default Loading
