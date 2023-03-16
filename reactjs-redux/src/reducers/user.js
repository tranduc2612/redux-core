const initState = ["3", "2", "1"];

const user = (state = initState, action) => {
	switch (action.type) {
		case "ADD":
			return [...state, action.payload];
		default:
			return state;
	}
};

export default user;
