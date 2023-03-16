export const addTodo = (todo) => {
	return {
		type: "ADD",
		payload: todo,
	};
};

export const deleteTodo = (id) => {
	return {
		type: "DELETE",
		payload: id,
	};
};
