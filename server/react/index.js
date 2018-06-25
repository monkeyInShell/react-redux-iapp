'use strict';
import {renderToString, renderToNodeStream} from 'react-dom/server'

export const toString = (reactElement) => renderToString(reactElement)
export const toSream = (reactElement) => renderToNodeStream(reactElement)
export const setResHeaders = (res) => res.set({
  'Content-Type': 'text/html',
  'Cache-Control': 'no-cache,no-store',
  'Expires': -1
})
