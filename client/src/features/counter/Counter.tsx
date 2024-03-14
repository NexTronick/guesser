import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { decrement, increment } from "./counterSlice";
import ButtonVarient from "../../components/parts/ButtonVarient";

export default function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center text-center my-2 mt-4">
      <div className="flex justify-evenly w-1/3">
        {/* <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-md blur opacity-80 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <button
            className="relative bg-black rounded-md py-2.5 px-7 text-gray-200 group-hover:text-white transition duration-200"
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
        </div> */}
        {/* <ButtonVarient
          theme="light"
          color="primary"
          ariaLabel="Increment count"
          value="Increment"
          onclick={() => dispatch(increment())}
        /> */}
        <span>{count}</span>
        <div className="relative">
          <div className="absolute inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-md blur opacity-80"></div>
          <button
            className="relative bg-black rounded-md p-1 px-3 text-white"
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}
