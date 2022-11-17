// export const emailRegExp =
//   /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

// export const passwordRegExp =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,16}$/;
// export const phoneNumExp = /^\d{3}-\d{3,4}-\d{4}$/;

export const emailRegExp = /.*/;
export const phoneNumExp = /.*/;
export const passwordRegExp = /.*/;

// 숫자 3개씩마다 쉼표 넣어주는 함수

export function AddComma(num) {
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ',');
}
