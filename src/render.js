const RENDER_EVENT = "render-todos";
const HOST = "http://localhost:3000";

const isEdit = document.getElementById("title");
const titleDom = document.getElementById("title");
const memoDom = document.getElementById("memo");
const memoContainerDom = document.getElementById("memo-container");
const manageContainerDom = document.getElementById("manage-container");
const submitBtnDom = document.getElementById("submit-btn");
const keyword = document.getElementById("keyword");



let todos = [];


async function  initialize(){
  const response = await fetch(`${HOST}/todos`)
  const data = await response.json()
  
  if(!data?.length) return
  data.forEach(item => {
    if(!item?.deleted_at) todos.push(item)
  });
  
  document.dispatchEvent(new Event(RENDER_EVENT));
}

async function select(keyword){
  todos = []
  
  const params = new URLSearchParams({keyword})
  const response = await fetch(keyword ? `${HOST}/todos?${params.toString()}` : `${HOST}/todos`)
  const data = await response.json()


  if(!response.ok) console.error('Error when select data')
  
  if(!data?.length) return
  data.forEach(item => {
    if(!item?.deleted_at) todos.push(item)
  });


  document.dispatchEvent(new Event(RENDER_EVENT));

}

async function insert(payload){
  const response = await fetch(`${HOST}/todos`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })


  titleDom.value = null
  memoDom.value = null


}

async function update(id, payload){
  const response = await fetch(`${HOST}/todos/${id}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })

  if(!response.ok) console.error('Error when update data')


}

async function remove(id){
  const response = await fetch(`${HOST}/todos/${id}`, {
    method: "DELETE",
  })

  if(!response.ok) console.error('Error when update data')
}


select()


document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("form");
  submitButton.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
  });

  keyword.addEventListener('keyup', (event) => {
    select(event.target.value)
  })
 
});

function addTodo() {
  const payload = { title:titleDom?.value, memo:memo?.value }
  insert(payload)
  select()

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function passingTodo(memmoId, title, memo) {
  titleDom.value = title
  memoDom.value = memo
  id = memmoId

  submitBtnDom.classList.add('hidden')
  manageContainerDom.classList.remove('hidden')


}

function cancelEdit() {
  titleDom.value = null
  memoDom.value = null
  id = null

  submitBtnDom.classList.remove('hidden')
  manageContainerDom.classList.add('hidden')

}


function updateTodo() {
  const payload = { title:titleDom?.value, memo:memo?.value }
  update(id, payload)
  select()

  submitBtnDom.classList.remove('hidden')
  manageContainerDom.classList.add('hidden')

  titleDom.value = null
  memoDom.value = null

  document.dispatchEvent(new Event(RENDER_EVENT));
}


function removeTodo(id) {

  titleDom.value = null
  memoDom.value = null
  remove(id)
  select()

  document.dispatchEvent(new Event(RENDER_EVENT));
}


function generateTodoObject(title, memo) {
  return {
    title,
    memo,
  };
}

document.addEventListener(RENDER_EVENT, () => {
  memoContainerDom.innerHTML = null
  todos.forEach((element)=>{
    memoContainerDom.innerHTML += ` <div
  class="flex flex-col align-middle w-auto border-collapse m-4 flex-grow h-fit"
>
  <div
    class="container align-middle w-auto border-collapse bg-slate-200 p-4 flex-grow h-fit shadow-lg"
  >
    <div class="flex justify-between items-center mb-3">
      <div class="text-base">${element?.title}</div>
      <div class="flex space-x-3">
        <button
        onclick="passingTodo(${element?.id}, '${element?.title}', '${element?.memo}')"
          class="p-1 rounded-md border border-purple-500 text-white cursor-pointer hover:bg-purple-700 hover:text-white"
        >
          <img class="w-4 h-4" src="../assets/edit.svg" alt="" />
        </button>
        <button
        onclick="removeTodo(${element?.id})"
          class="p-1 rounded-md border border-purple-500 text-white cursor-pointer hover:bg-purple-700 hover:text-white"
        >
          <img class="w-4 h-4" src="../assets/trash.svg" alt="" />
        </button>
      </div>
    </div>

    <div class="text-sm mb-2">
     ${element?.memo}
    </div>
    
    <div class="text-slate-500 text-xs">${ element?.created_at === element?.updated_at ? 'Dibuat tanggal ' + element?.created_at  : 'Diubah tanggal ' + element?.created_at} WIB</div>

  </div>
</div>
`
  })
});
