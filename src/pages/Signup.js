import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

import * as s from "../styles/SignStyle" 
import * as i from "../styles/InputStyle" 
import * as b from "../styles/ButtonStyle" 

const Signup = () => {

  const navigate = useNavigate(); // Link 태그 대신 사용할 변수
  //  회원가입 에러 발생 시 추가할 className
  const erroremail = "error-email";
  const errorpw = "error-pw";

  // 회원 가입 에러 발생 시 className 추가할 ClassName 위치
  const errorEmail = document.querySelector(".email");
  const errorPw = document.querySelector(".password");

  // 회원가입 시 받을 정보
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [validPw, setValidPw] = useState("");

  const [errorMessage, setErrorMessage] = useState(""); // Error 발생 시, Input 하단에 띠울 문구 

  const isSame = Password === validPw;  // 비밀번호 일치 여부

  const register = async () => {  // async를 통해 비동기 처리 해줌
    try {   // 예외가 발생할 수 있는 코드
      // setErrorMessage("  ");  // Error 발생 시 들어갈 문구 초기화
      const user = await createUserWithEmailAndPassword(
          auth,
          Email,
          Password
      );
      console.log(user);
      alert('회원가입이 완료되었습니다');
      navigate('/login');   // 회원가입 성공 시 로그인 화면으로 이동

    } catch (error) { // Error 발생 시 대응 코드
      console.log(error.message);
      switch (error.code, isSame) {
        // 이메일 및 비밀번호 오류 발생 시에만 나타날 문구 작업을 위해 classList 이용
        case isSame == true, 'auth/weak-password' :
          setErrorMessage('비밀번호 6자 이상 입력해주세요')
          errorPw.classList.add(errorpw);
          errorEmail.classList.remove(erroremail);
          break;
        case isSame == true, 'auth/invalid-email' : 
          setErrorMessage('이메일 형식이 올바르지 않습니다');
          errorEmail.classList.add(erroremail);
          errorPw.classList.remove(errorpw);
          break;
        case isSame == true, 'auth/email-already-in-use' :
          alert('이미 가입되어 있는 계정입니다');
          break;
        case isSame == false :
          alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.')
        default : 
          break;  
      }
    }
  };

  return (
    <s.BoxContainer className="signUpContainer">
      <h1>회원 가입</h1>
      <i.SignUpInput className="inputContainer">
        <p>이름</p>
        <input type="text"/>
      </i.SignUpInput>
      <i.SignUpInput className="inputContainer">
        <p>이메일</p>
        <input 
          type="email" 
          onChange={(e) => {
            setEmail(e.target.value);
        }}/>
        <p className="email error">{errorMessage}</p>
      </i.SignUpInput>
      <i.SignUpInput className="inputContainer">
        <p>비밀번호</p>
        <input 
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
        }}/>
        <p className="password error">{errorMessage}</p>
      </i.SignUpInput>
      <i.SignUpInput className="inputContainer">
        <p>비밀번호 확인</p>
        <input type="password" onChange={(e) => {
            setValidPw(e.target.value);
        }}/>
        {validPw !== '' && !isSame && (
        <p className="error error-pwInvalid">비밀번호가 일치하지 않습니다.</p>
        )}
      </i.SignUpInput>
      <b.SignUpBtn type="button" onClick={register}>가입하기</b.SignUpBtn>
      
    </s.BoxContainer>
  )

}

export default Signup;