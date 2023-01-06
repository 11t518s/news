# 실행

$ yarn install<br/>
$ yarn start<br/>
이후 http://localhost:3000 에서 확인할 수 있습니다.

# 기술 스택과 선정 이유

### Typescript
타입 보장을 통해 안정적인 서비스 개발과 보다 좋은 개발 경험을 위해 선택했습니다.

### yarn berry
빠른 빌드속도를 유지하기 위해 yarn berry를 선택했습니다.

### Redux-toolkit Redux-Saga
간편하게 action과 reducer를 만들 수 있는 Redux-toolkit을 사용했습니다.<br/>
또한 비동기 데이터 처리에는 Redux-Saga를 사용했습니다.<br/>
비동기와 단순한 상태변경을 모두 할 수 있는 zustand와 관심사 분리에 대한 것의 차이를 배웠고,<br/> 
다른 상태간 정보를 주고받을 수 있는 Recoil과 달리 View에서 반드시 다른 상태의 정보를 전달해줘야하는 것이 아쉬웠습니다. (이 부분은 redux-toolkit에서 subscribe를 사용할 수 있을 것 같았는데 방법을 찾지 못했습니다.) 

### styled-component
스타일을 구성할 떄 css파일을 따로 분리하기 보단 동일한 파일 내부에서 선언하는 것을 선호하여 해당 라이브러리를 사용했습니다.

### react-datepicker
input type date을 썼을 때 디자인적으로 표현을 할 수 없는 것들이 있어서 해당 라이브러리를 사용했습니다. <br/>
해당 라이브러리는 년도를 한 번에 이동하지 못했다는 점이 있어서 연도를 오가면서 찾으면 좋은 서비스에서는 사용하지 않는 것이 좋겠다고 생각했습니다.

### jest react-testing-library
시간 문제로 테스트 코드는 작성하지 못했지만, 테스트 코드 작성할 목적으로 설치했습니다.


## web api

### Indexed DB
스크랩한 기사의 경우 웹을 껐다 켜도 데이터가 남아있어야 했습니다.<br/>
또한 방대한 array of object 구조를 담아야 했기 때문에 storage를 사용하는 것 보단 Indexed DB를 사용하는 것이 좋다고 생각했습니다.

### IntersectionObserver
무한 스크롤을 구현하는 방식으로 Observer방식을 선택했습니다.<br/>
observer방식은 observe하고 있는 dom element가 나타나면 interest를 true로, 사라지면 interest를 false로 하는 로직으로 구현됩니다.<br/>
그리고 이를 활용해 interest가 false에서 true로 변하면 새로운 요청을 보내는 방식으로 무한 스크롤 기능을 구현했습니다.<br/> 
그런데 observer방식으로 무한 스크롤 기능을 구현하면서 필터에 따라 article의 개수가 적어서 dom element의 interest가 false로 변하지 않고 계속 true로 유지되는 현상이 있었습니다.<br/>
이 문제를 해결하지 못해서 초기에는 react-intersection-observer를 사용해서 구현했고, 후에는 dom element에 대한 interest 상태를 intersectionObserver 훅 외부에서 관리하는 방식으로 해결했습니다. <br/>
다만 그렇게 하면서 기능에 대한 추상화가 잘 이뤄지지 않았다고 생각했습니다. 그래서 후에는 해당 기능을 보안할 수 있도록 코드를 더 향상시키거나, react-intersection-observer를 사용하겠다는 생각을 했습니다.
