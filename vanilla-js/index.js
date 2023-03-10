const { createStore } = window.Redux;

//state
//reducer
//store
// Chúng ta sẽ tạo ra store đầu tiên

const initialState = [];

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD":
			// tại vì redux hoạt động theo cơ chế cấu trúc dữ liệu không thể thay đổi trực tiếp (immutable data structure)
			// điều này giúp redux tối ưu hiệu năng , dễ so sánh được dữ liệu cũ và mới và tiện cho việc fix bug hơn
			return [...state, action.payload];
		case "DELETE":
			const arr = [...state];
			arr.splice(action.payload, 1);
			return arr;
		case "UPDATE":
			const arrUpdate = [...state];
			arrUpdate[action.payload.index] = action.payload.value;
			return arrUpdate;
		default:
			return state;
	}
};

// Thằng này trong reactjs sẽ được import ra để cho những component dùng
const store = createStore(reducer);

//-----------------------------------------

// Chỗ này sẽ đại diện cho View

const renderList = (listTodo) => {
	// if (!Array.isArray(listTodo) || listTodo.length === 0) {
	// 	return;
	// }
	const listElem = document.querySelector(".list");
	if (!listElem) return;

	listElem.innerHTML = "";
	for (const toDo of listTodo) {
		const itemElem = document.createElement("li");
		itemElem.textContent = toDo;
		const btnUpdate = document.createElement("button");
		const btnDelete = document.createElement("button");
		btnUpdate.innerText = "Update";
		btnUpdate.classList.add("btn-update");
		btnDelete.innerText = "Delete";
		btnDelete.classList.add("btn-delete");
		listElem.appendChild(itemElem);
		itemElem.appendChild(btnUpdate);
		itemElem.appendChild(btnDelete);
	}
};
//-----------------------------------
// render list khi nhận state từ store

// Lấy store đc import ra từ đây
const listTodo = store.getState();
renderList(listTodo);

// xử lí dự liệu ở đây qua thằng dispatch
const input = document.querySelector("#name");
const btnAdd = document.querySelector(".btn-add");

btnAdd.addEventListener("click", (e) => {
	e.preventDefault();
	const valueInput = input.value;
	const action = {
		type: "ADD",
		payload: valueInput,
	};
	store.dispatch(action);
	input.value = "";
});

function deleteItem() {
	const btnDelete = document.querySelectorAll(".btn-delete");
	btnDelete.forEach((btn, index) => {
		btn.addEventListener("click", (e) => {
			const action = {
				type: "DELETE",
				payload: index,
			};
			store.dispatch(action);
		});
	});
}

function updateItem() {
	const btnUpdate = document.querySelectorAll(".btn-update");
	btnUpdate.forEach((btn, index) => {
		btn.addEventListener("click", (e) => {
			const value = input.value;
			const action = {
				type: "UPDATE",
				payload: {
					value,
					index,
				},
			};
			store.dispatch(action);
		});
	});
}

// sau khi dispatch thì dữ liệu mới sẽ được trả vào đây
// hàm này sẽ lắng nghe sự thay đổi của state và trả về state mới
store.subscribe(() => {
	renderList(store.getState());
	// console.log(store.getState());
	deleteItem();
	updateItem();
});
