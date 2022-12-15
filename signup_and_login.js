// JWT 用箭頭函式，不能用 forEach，用 map()、filter() 處理
// 物件包函式 => vue react 常見用法

// sign in
let sign_email = document.querySelector(".sign_email");
let sign_nickName = document.querySelector(".sign_nickName");
let sign_password = document.querySelector(".sign_password");
let sign_checkPassword = document.querySelector(".sign_checkPassword");
let sign_btn = document.querySelector(".sign_btn");
let login_btn = document.querySelector(".login_btn");


// log in
let logIn_email = document.querySelector(".logIn_email");
let logIn_password = document.querySelector(".logIn_password");
let logIn_btn = document.querySelector(".logIn_btn");
let signUp_btn = document.querySelector(".signUp_btn");
let authorization = localStorage.getItem('authorization');
let nickname = localStorage.getItem('nickname');

let to_signUp = document.querySelector(".to_signUp");
let to_logIn = document.querySelector(".to_logIn");

// 監聽 => 註冊、登入介面切換
login_btn.addEventListener("click",(e) => {
  to_signUp.classList.add("hidden");
  to_logIn.classList.remove("hidden");
})

// 監聽 => 註冊、登入介面切換
signUp_btn.addEventListener("click",(e) => {
  to_logIn.classList.add("hidden");
  to_signUp.classList.remove("hidden");
})

// 函式 => 檢查 email
const check_email = (email) =>{
  const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  !emailRule.test(email) && alert("請檢查 E-mail 格式");
}
// 函式 => 檢查密碼（大於六字元）
const check_password = (password) =>{
  password.length <6 && alert("密碼需大於 6 個字元");
}
// 函式 => 檢查密碼（兩次輸入一致）
const recheck_password = (password) =>{
  // password !== sign_password.value && alert("密碼有誤，請確認是否輸入正確");
  if (password !== sign_password.value) {
    alert("密碼有誤，請確認是否輸入正確");
    return true
  } else {
    return false
  }
}

// 監聽 => 點擊，註冊帳號
sign_btn.addEventListener("click",(e) => {
  check_email(sign_email.value);
  check_password(sign_password.value);

  if (recheck_password(sign_checkPassword.value)) {
    return
  } else {
    signUp(sign_email.value,sign_nickName.value,sign_password.value);
    alert('成功')
  }
})

// 函式 => axios 註冊
const _url = "https://todoo.5xcamp.us";
let jwt = "";
let axios_data =[];
const user_obj = { user: {} };
let config = {headers: { 'Authorization': authorization}};

const signUp = (email, nickname, password) => {
  axios.post(`${_url}/users`,{
    "user": {
      email,
      nickname,
      password
    }
  })
    .then(res =>{
      console.log(res.data);
      jwt = res.headers.authorization;
    })
}

// 函式 => 跳轉到 todo list
const init = () =>{
  if(authorization!==null|| nickname !==null){
    location.href='index.html';
  }else{return}
}
// init();

// 監聽 => 點擊，登入帳號
logIn_btn.addEventListener("click",(e) => {
  user_obj.user.email = logIn_email.value;
  user_obj.user.password = logIn_password.value;

  if(check_logIn(logIn_email.value,logIn_password.value)){
    return
  }else{
    log_in(logIn_email.value,logIn_password.value);
  }
});

// 函式 => 確認登入信箱、密碼
const check_logIn = (email,password) =>{
  check_email(logIn_email.value);
  check_length(logIn_password.value);
}

// 函式 => 確認密碼長度
const check_length = (password) =>{
  password.length <6 && alert("請確認密碼是否正確");
}

// 函式 => axios 登入
const log_in = (email, password) => {
  axios
  .post(`${_url}/users/sign_in`,
    {
      "user": {
        email,
        password
      }
  })
  .then(res => {
    console.log(res.data);

    jwt = res.headers.authorization;
    let nickname = res.data.nickname;

    localStorage.setItem('authorization', jwt);
    localStorage.setItem('nickname', nickname);
    alert(res.data.message);
    location.href = 'index.html';
  })
}