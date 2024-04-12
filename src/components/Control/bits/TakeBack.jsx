import { useAppContext } from "../../../contexts/Context";
import { takeBack } from "../../../reducer/actions/move";

export default function TakeBack() {
  const { dispatch } = useAppContext();

  return (
    <div>
      <button onClick={() => dispatch(takeBack())}>Take Back</button>
    </div>
  );
}
