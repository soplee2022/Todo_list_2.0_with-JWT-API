// JWT 用箭頭函式，不能用 forEach，用 map()、filter() 處理
// 物件包函式 => vue react 常見用法

let sign_email = document.querySelector(".sign_email");
let sign_nickName = document.querySelector(".sign_nickName");
let sign_password = document.querySelector(".sign_password");
let sign_checkPassword = document.querySelector(".sign_checkPassword");
let sign_btn = document.querySelector(".sign_btn");


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
sign_btn.addEventListener("click",function(e){
  check_email(sign_email.value);
  check_password(sign_password.value);
  
  if (recheck_password(sign_checkPassword.value)) {
    return
  } else {
    signUp(sign_email.value,sign_nickName.value,sign_password.value);
    alert('成功')
  }
})

// 函式 => 註冊 API
const _url = "https://todoo.5xcamp.us";
let jwt = "";

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

// 函式 => 登入
const log_in = (email, password) => {
  axios.post(`${_url}/users/sign_in`,
    {
      "user": {
        email,
        password
      }
  })
  .then(res => {
    console.log(res.data);
    jwt = res.headers.authorization;
  })
}

// 函式 => 顯示 todo list
const getTodo = () => {
  axios.get(`${_url}/todos`,{
    headers: { 
      'Authorization': jwt,
    }
  })
  .then(res => {
    console.log(res.data);
  })
}

// 函式 => axios 推資料
// const add_todo = () => {
//   axios.post(`${_url}/todos`,obj,{headers: { 'Authorization': jwt}})

//   .then(res => {
//     console.log(res.data);
//   })
// }
