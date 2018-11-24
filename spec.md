1. 해당 앱의 모든 컴포넌트에서는 state를 사용하지 않고 props만을 사용한다.
  smart에서 propTypes 정의
    name: propTypes.string.isRequired
    phone: propTypes.number.isRequired

2. dumb 컨테이너(컴포넌트)와 smart 컨테이너(컴포넌트)를 나누어서 작업한다.

  dumb : 사용자 입력을 표시만 하는 역할 -> props로 받아서 표시한다.
  smart : props를 보관하며 child(dumb)에게 알려주는 역할

3. 이름과 전화번호를 입력하기 위해서 formik 이라는 라이브러리를 사용한다. ok

4. 이름은 영문만 입력 가능하며 최대 8자를 넘지 않는다. ok

5. 전화번호는 숫자만 입력 가능하며 11자여야 한다. ok

6. 입력 버튼을 누르고 나면 이름과 전화번호 입력란은 빈 공란이 되어야 한다. ok

7. es6의 문법을 사용한다. var 대신 const와 let을 사용하고 require 대신 import 키워드를 사용한다. ok

** redux install
npm i redux react-redux
import { Provider} 후에는 store 정의 필요함

error 메시지는 STORE로 관리하지 않음 -> error 존재할 때 submit 자체를 안 하기 때문이다.
thunk (미들웨어)는 불필요 -> AJAX 같은 비동기 처리를 하지 않기 때문이다.

WORK FLOW
1. Design
  Stateful & Stateless component 필요함. 각각 (FormIk.js, Dumb.js) 명명.
  Formik 라이브러리 도입 방안 :
  HOC를 작성해서 props와 form handler - FormikBag을 컴퍼넌트에 전달하자.
  validate, handleSubmit, mapPropsToValue 옵션을 사용 가능함
   1. validate
      values 객체를 통해서 사용자 입력값을 검증할 수 있다.
   2. handSubmit
      values, FormikBag(props 객체와 메소드의 집합체) parameter로 전달 받는 메소드, FormikBag.props.submitUser를 통해서 action을 호출한다. values를 인자로 넘겨서 STORE에 사용자 입력을 저장한다.
   3. mapPropsToValue
   mapPropsToValues 옵션으로는 values 객체의 초기화 및 values를 props.values 형태로 접근 가능하도록 한다.
  mapPropsToValues가 정의되지 않는다면, Formik은 함수가 아닌 모든 props를 내부 컴퍼넌트의 props.values에 매핑한다.

2. Component -> Action file -> Reducer

