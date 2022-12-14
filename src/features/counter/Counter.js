import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount } from './counterSlice';

const Counter = () => {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                    >
                    Increment
                    </button>
                    <span className="m-1">{count}</span>
                    <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                    >
                    Decrement
                    </button>

                    <br /><br />
                    
                    <input
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                    />
                    <button
                    aria-label="Increment by amount"
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                    >
                    Add Amount
                    </button>

                    <button
                    aria-label="Increment async by amount"
                    onClick={() => dispatch(incrementAsync(incrementValue))}
                    >
                    Add Async
                    </button>

                    <button
                    aria-label="Increment if odd value"
                    onClick={() => dispatch(incrementIfOdd(incrementValue))}
                    >
                    Add If Odd
                    </button>
                </div>
            </div>
        </>
    )
}

export default Counter;
