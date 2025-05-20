// 전체 document 메모리에 모두 로드가 되었을 떄 onLoad() 함수 call
function onLoad() {
    // id 패턴 검색을 진행할 이벤트 정의
    let idPattern = /^[\w]{3,12}$/;
    let pwPattern = /^[\w]{6,8}$/;
    let namePattern = /^[가-힣]{1,4}|[a-zA-Z]{1}[a-zA-Z\x20]{1,10}$/;
    let nicknamePattern = /^(?:[가-힣]{2,}|[a-zA-Z0-9]{4,})$/;
    let telPattern = /^\d{2,3}-\d{3,4}-\d{4}$/;
    let phoneNumPattern = /^\d{3}-\d{3,4}-\d{4}$/;
    let birthDayPattern = /^\d{4}-\d{2}-\d{2}$/;
    let checkHumanPattern = /^RCAPC6$/i;

    let id = document.querySelector("#id");
    let pw = document.querySelector("#pw");
    let pwCheck = document.querySelector("#pwCheck");
    let submit = document.querySelector("#submit");
    let name = document.querySelector("#name");
    let nickname = document.querySelector("#nickname");
    let tel = document.querySelector("#tel");
    let phoneNum = document.querySelector("#phoneNum");
    let birthDay = document.querySelector("#birthDay");
    let addrSearch = document.querySelector("#addrSearch");
    let zipcode = document.querySelector("#zipcode");
    let addr1 = document.querySelector("#addr1");
    let checkHuman = document.querySelector("#checkHuman");
    let checkHumanMsg = document.querySelector("#checkHumanMsg");
    let pathRadios = document.querySelectorAll("input[name='path']");
    let selectedPath = document.querySelector("#selectedPath");


    id.addEventListener("blur", () => {
        validate(id, idPattern, "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요.");
    });

    pw.addEventListener("blur", () => {
        validate(pw, pwPattern, "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자이하 입력하세요.");
    });

    pwCheck.addEventListener("blur", () => {
        if(pw.value === pwCheck.value) {
            //let span = document.querySelector("#pwCheck + span");
            pwCheck.nextSibling.innerHTML = "패스워드 일치 성공";
            pwCheck.nextSibling.style.color = "blue";
        }else {
            //let span = document.querySelector("#pwCheck + span");
            pwCheck.nextSibling.innerHTML = "패스워드 불일치";
            pwCheck.nextSibling.color = "tomato";
            pwCheck.value = "";
            pwCheck.focus();
        }
    });

    name.addEventListener("blur", () => {
        validate(name, namePattern, "한글, 영문만 입력 가능(1자 이상)")
    });
    nickname.addEventListener("blur", () => {
        validate(nickname, nicknamePattern, "공백없이 한글,영문,숫자만 입력 가능 (한글2자, 영문4자 이상)")
    });
    pathRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            let label = document.querySelector(`label[for='${radio.id}']`);
            selectedPath.textContent = `선택한 경로: ${label.textContent}`;
            selectedPath.style.color = "blue";
        });
    });
    tel.addEventListener("blur", () => {
        validate(tel, telPattern, "하이픈(-)을 포함하여 작성해주세요")
    });
    phoneNum.addEventListener("blur", () => {
        validate(phoneNum, phoneNumPattern, "하이픈(-)을 포함하여 11자리로 작성해주세요")
    });
    birthDay.addEventListener("blur", () => {
        validate(birthDay, birthDayPattern, "하이픈(-)을 포함하여 8자리로 작성해주세요")
    });

    // 우편번호 이벤트처리
    addrSearch.addEventListener("click", () => {
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
                if (data !== null && data !== undefined) {
                    console.log('zipcode', data.zonecode);
                    console.log('data.roadAddress', data.roadAddress);
                    zipcode.value = data.zonecode;
                    addr1.value = data.roadAddress;
                }else{
                    addrSearch.nextSibling.innerHTML = "daum api 오류발생으로 직접 입력바람";
                    zipcode.focus();
                }
            }
        }).open();
    });
    // 회원가입 전송 기능 점검
    submit.addEventListener("click", function() {
        // 아이디
        let idPattern = validate(id, idPattern, "값을 정확하게 입력 요청");
        if(idReturn === false) return;
        let pwPattern = validate(pw, pwPattern, "값을 정확하게 입력 요청");
        if(pwReturn === false) return;
        let namePattern = validate(name, namePattern, "값을 정확하게 입력 요청");
        if(nameReturn === false) return;
        // 패스워드
        alert('서버에 전송');
        let form = document.querySelector("form");
        form.submit();
    });

    checkHuman.addEventListener("blur", () => {
        if (checkHuman.value.match(checkHumanPattern)) {
            checkHumanMsg.innerHTML = "자동등록방지 통과";
            checkHumanMsg.style.color = "blue";
        } else {
            checkHumanMsg.innerHTML = "다시 입력해주세요";
            checkHumanMsg.style.color = "tomato";
            checkHuman.value = "";
            checkHuman.focus();
        }
    });
    

    // 공동으로 사용되는 함수
    function validate(inputObj, pattern, message) {
        if(inputObj.value.match(pattern)) {
            //let span = document.querySelector("#pw + span");
            inputObj.nextSibling.innerHTML = "성공";
            inputObj.nextSibling.style.color = "blue";
            return true;
        }else {
            //let span = document.querySelector("#pw + span");
            inputObj.nextSibling.innerHTML = message;
            inputObj.nextSibling.color = "tomato";
            inputObj.value = "";
            inputObj.focus();
            return false;
        }
    }
}