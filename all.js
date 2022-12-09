let add_text = document.querySelector(".add_text");
let add_event = document.querySelector(".add_event");
// let check = document.querySelector(".check");
// let delete_event = document.querySelector(".delete_event");
// let delete_all = document.querySelector(".delete_all");
let js_list = document.querySelector(".js_list");
let js_total = document.querySelector(".js_total");
let js_filter = document.querySelector(".js_filter");
let js_btn = document.querySelector(".js_btn");
let js_btn_true = document.querySelector(".js_btn_true");
let js_btn_false = document.querySelector(".js_btn_false");
let js_footer = document.querySelector(".js_footer");
let js_finish = document.querySelector(".js_finish");

let obj = {};
let data = [];
get_axios ();

// 監聽 => 新增待辦事項
add_event.addEventListener("click",function(e){
    // 排除無效新增
    if(add_text.value === ""){
      alert("請新增代辦事項");
      return
    }else{
      // 組成 obj -> push data -> 印在網頁上
      obj.content = add_text.value;
      obj.finish = false;
      data.push(obj);
      // obj 推上 json API
      post_todo(obj);
    }
    init();
  })

// 監聽 => 篩選待辦事項
js_filter.addEventListener("click",function(e){
  let str_all = "";
  data.forEach(function(item){
    str = `<li class="flex items-center space-x-4 py-4 mx-6 border-b border-b-light_gray">
    <input type="checkbox" ${item.finish && 'checked'} class="w-5 h-5 rounded-md border border-secondary" name="check" finish="${item.finish}" id="${item.id}">
    <p class="text-sm grow ${ item.finish && 'line-through text-third'}">${item.content}</p>
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
      if(item.finish === false){
        str_all += str;
      }
    }else if(e.target.value === "已完成"){
      // btn 樣式
      js_btn_true.setAttribute("class","py-4 border-b-2 border-b-black w-full text-center text-secondary text-sm font-bold")
      js_btn_false.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      js_btn.setAttribute("class","py-4 border-b-2 border-b-light_gray w-full text-center text-third text-sm font-bold")
      // dom data
      if(item.finish === true){
        str_all += str;
      }
    }
  })
  js_list.innerHTML = str_all;
})

// 監聽 => 完成打勾
js_list.addEventListener("click",function(e){
  if(e.target.type === "checkbox"){
    data.forEach(function(item){
      let judge = e.target.getAttribute("finish") === 'false' ? false : true;

      // 比對 dom & data 狀態
      if(judge === item.finish){
        // 用 id 指定修改哪一筆
        if(Number(e.target.getAttribute("id")) === item.id){
          item.finish = !item.finish;
          let id = item.id;
          updateData(id,item.finish);
        }
      }
    })
  }
})

// 監聽 => 刪除指定資料
js_list.addEventListener("click",function(e){
  data.forEach(function(item){
    if(e.target.type === "button"){
      if(Number(e.target.getAttribute("id")) === item.id){
        id = item.id;
        delete_todo(id)
      }
    }
  })
})

// 函式 => axios 修改 finish
function updateData (id,check){
  // 為什麼使用這個函式時，沒有寫到 check 函式也可以動
  axios
  .patch(`https://fathomless-brushlands-42339.herokuapp.com/todo1/${id}`, {
    finish: check,
  })
  .then(function(response) {
    get_axios();
  })
  .catch(function(error){
    console.log(error);
  })
}

// 函式 => axios 抓資料
function get_axios (){
  axios
  .get("https://fathomless-brushlands-42339.herokuapp.com/todo1")
  .then(function (response) {
    data = response.data;
    callData();
    init();
  });
}

// 函式 => axios 推資料
function post_todo(obj){
  axios
  .post("https://fathomless-brushlands-42339.herokuapp.com/todo1",obj)
  .then(function (response) {
    get_axios()
    callData();
  });
}

// 函式 => axios 刪除資料
function delete_todo(id){
  axios
  .delete(`https://fathomless-brushlands-42339.herokuapp.com/todo1/${id}`)
  .then(function(response){
    get_axios ();
    // callData();
  });
}

// 函式 => console axios 資料
function callData() {
  console.log(data);
}

// 函式 => DOM 待辦清單
function init(){
  let str_all = "";
  let todoNum = 0;
  // 列表
  data.forEach(function(item){
    str = `<li class="flex items-center space-x-4 py-4 mx-6 border-b border-b-light_gray">
      <input type="checkbox" ${item.finish && 'checked'} class="w-5 h-5 rounded-md border border-secondary" name="check" finish="${item.finish}" id="${item.id}">
      <p class="js_finish text-sm grow ${ item.finish && 'line-through text-third'}">${item.content}</p>
      <input type="button" class="w-7 h-6 bg-[url('../src/todoList_image/icon_delete_black.svg')] bg-no-repeat " value="" id="${item.id}">
      </li>`
    str_all += str;
    item.finish === false && todoNum++;
  })
  js_list.innerHTML = str_all;
  // 左下角 total

  js_total.textContent = `${todoNum} 個待完成項目`

}


// JWT 用箭頭函式，不能用 forEach，用 map()、filter() 處理
// 物件包函式 => vue react 常見用法

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