// @flow
import React, { useRef } from "react";
import Item from "./Item";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../action/todo";

export default function Todo() {
	const listTodo = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const ref = useRef(null);
	return (
		<div>
			<div className="form-add">
				<input onChange={(e) => (ref.current = e.target.value)} />
				<button onClick={() => dispatch(addTodo(ref.current))}>Add</button>
			</div>
			<ul>
				{listTodo.map((e, index) => (
					<Item key={index} content={e} />
				))}
			</ul>
		</div>
	);
}
