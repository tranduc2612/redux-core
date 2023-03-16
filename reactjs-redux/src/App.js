import { useState } from "react";
import Todo from "./pages/Todo";

const listTodo = ["Lau nha", "Quet nha", "Hoc bai"];

function App() {
	const [toggle, setToggle] = useState(false);

	const clickStart = (e) => {
		setToggle(!toggle);
	};

	return (
		<div>
			{toggle && toggle ? <Todo /> : ""}
			<button onClick={clickStart}>Click to start</button>
		</div>
	);
}

export default App;
