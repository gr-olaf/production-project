/* eslint-disable i18next/no-literal-string */
import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
   const counterValue = useCounterValue();
   const { increment, decrement } = useCounterActions();

   const handleInc = () => {
      increment();
   };
   const handleDec = () => {
      decrement();
   };

   return (
      <div>
         <h1 data-testid="value-title">{counterValue}</h1>
         <Button data-testid="increment-btn" onClick={handleInc}>
            increment
         </Button>
         <Button data-testid="decrement-btn" onClick={handleDec}>
            decrement
         </Button>
      </div>
   );
};
