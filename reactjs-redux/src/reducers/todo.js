const initState = ["Lau nha", "Quet nha", "Hoc bai"];

const todo = (state = initState, action) => {
	switch (action.type) {
		case "ADD":
			return [...state, action.payload];
		default:
			return state;
	}
};

export default todo;
