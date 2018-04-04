/**
 * Created by zhouyunkui on 2017/6/23.
 */
const fnc = function( evt ) {
  if ( this.preventDocMove ) {
    evt.preventDefault();
    return false;
  }
}
export const preventDocMove = function () {
  //测试
  document.addEventListener( 'touchmove', fnc.bind( this ), {
    passive: false
  } );
}
export const offPreventDefault = function () {
  document.removeEventListener( 'touchmove', fnc );
}