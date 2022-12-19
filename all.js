let add_text = document.querySelector(".add_text");
let add_event = document.querySelector(".add_event");
let js_list = document.querySelector(".js_list");
let js_total = document.querySelector(".js_total");
let js_filter = document.querySelector(".js_filter");
let js_btn = document.querySelector(".js_btn");
let js_btn_true = document.querySelector(".js_btn_true");
let js_btn_false = document.querySelector(".js_btn_false");
let js_footer = document.querySelector(".js_footer");
let js_finish = document.querySelector(".js_finish");
let js_userName = document.querySelector(".js_userName");

let obj = {};
// get_axios ();

// （待修改）監聽 => 篩選待辦事項
js_filter.addEventListener("click",(e) => {
  let str_all = "";
  axios_data.map(function(item){
    str = `<li class="flex items-center space-x-4 py-4 mx-6 border-b border-b-light_gray">
    <input type="checkbox" ${item.completed_at !== null && 'checked'} class="w-5 h-5 rounded-md border border-secondary" name="check" finish="${item.completed_at}" id="${item.id}">
    <p class="text-sm grow ${item.completed_at !== null && 'line-through text-third'}">${item.content}</p>
    <input type="button" class="w-7 h-6 bg-[url('../src/todoList_image/icon_delete_black.svg')] bg-no-repeat " value="" id="${item.id}">
    </li>`;

    if(e.target.value === "全部"){
      
      // btn 樣式
      js_btn.setAttribute("class","py-4 border-b-2 border-b-black w-full text-center text-secondary text-sm font-bold")
      js_btn_false.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      js_btn_true.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      // dom data
      str_all += str;
    }else if(e.target.value === "待完成"){
      // btn 樣式
      js_btn_false.setAttribute("class","py-4 border-b-2 border-b-black w-full text-center text-secondary text-sm font-bold")
      js_btn.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      js_btn_true.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      // dom data
      if(item.completed_at === null){
        str_all += str;
      }
    }else if(e.target.value === "已完成"){
      // btn 樣式
      js_btn_true.setAttribute("class","py-4 border-b-2 border-b-black w-full text-center text-secondary text-sm font-bold")
      js_btn_false.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      js_btn.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      // dom data
      if(item.completed_at !== null){
        str_all += str;
      }
    }
  })
  js_list.innerHTML = str_all;
})

// 監聽 => 完成打勾
js_list.addEventListener("click",(e) => {
  e.preventDefault();
  let num = e.target.dataset.num;
  let id = axios_data_todos[num].id;
  if(e.target.type === "checkbox"){
    switch_todo(id)
  }
})

// 監聽 => 刪除指定資料
js_list.addEventListener("click",(e)=>{
  e.preventDefault();
  let num = e.target.dataset.num;
  let id = axios_data_todos[num].id;

  if(e.target.type === "button"){
    delete_todo(id)
  }
})

// 函式 => axios 刪除資料
// function delete_todo(id){
//   axios
//   .delete(`https://fathomless-brushlands-42339.herokuapp.com/todo1/${id}`)
//   .then(function(response){
//     get_axios ();
//     // callData();
//   });
// }

// 函式 => DOM 待辦清單
function init(){
  let str_all = "";
  let todoNum = 0;
  // 列表
  axios_data_todos.map(function(item,index){
    str = `<li class="flex items-center space-x-4 py-4 mx-6 border-b border-b-light_gray">
      <input type="checkbox" ${item.completed_at !== null && 'checked'} class="w-5 h-5 rounded-md border border-secondary" name="check" finish="${item.completed_at}" data-num="${index}">
      <p class="js_finish text-sm grow ${ item.completed_at !== null && 'line-through text-third'}">${item.content}</p>
      <input type="button" class="w-7 h-6 bg-[url('../src/todoList_image/icon_delete_black.svg')] bg-no-repeat " value="" data-num="${index}">
      </li>`
    str_all += str;
    item.completed_at === null && todoNum++;
  })
  js_list.innerHTML = str_all;
  // 左下角 total

  js_total.textContent = `${todoNum} 個待完成項目`
  js_userName.textContent = `${nickname} 的待辦清單`
}


// JWT 變數
let js_logOut = document.querySelector(".js_logOut");
let authorization = localStorage.getItem('authorization');
let nickname = localStorage.getItem('nickname');
const _url = "https://todoo.5xcamp.us";
let axios_data =[];
let axios_data_todos =[];
const user_obj = { user: {} };
let config = {headers:{'Authorization': authorization}};

// 監聽 => 點擊後登出
js_logOut.addEventListener("click",(e)=>{
  e.preventDefault();
  log_out();
})
// 監聽 => 新增待辦事項
add_event.addEventListener("click",(e) => {
  let user_obj = { todo: {content: add_text.value} };
  // 排除無效新增
  add_text.value === "" ? alert("請新增代辦事項") : add_todo(user_obj);
  init();
  })

// 函式 => axios 登出
const log_out = () => {
  axios
  .delete(`${_url}/users/sign_out`, config)
  .then(res =>{
    console.log(res.data);
    localStorage.removeItem('authorization');
    localStorage.removeItem('nickname');
    alert("已登出")
    location.href = 'signup_and_login.html';
  })
  .catch((err) => {
    console.log(err);
    alert("登出失敗");
  });
}
// 函式 => axios 顯示列表
const getTodo = () => {
  axios.get(`${_url}/todos`, config)
  .then(res => {
    console.log(res.data);
    axios_data = res.data;
    axios_data_todos = res.data.todos;
    init();
  })
}
// 函式 => axios 推資料
const add_todo = (user_obj) => {
  axios
  .post(`${_url}/todos`,user_obj,config)
  .then(res => {
    console.log(res.data);
    getTodo();
  })
}

// 函式 => axios 完成／已完成狀態切換
const switch_todo = (id) => {
  axios
  .patch(`${_url}/todos/${id}/toggle`,{}, config)
  .then(res => {
    console.log(res.data);
    getTodo();
  })
}
// 401(不知道怎麼除錯QQ) ---> 加一個空的參數，但不知道為什麼

// 函式 => axios 刪除待辦
const delete_todo = (id) =>{
  axios
  .delete(`${_url}/todos/${id}`, config)
  .then(res =>{
    alert(res.data.message);
    getTodo();
  })
}

// {user:
//   {todos:[{1},{2},{3}]}
// }


getTodo();
