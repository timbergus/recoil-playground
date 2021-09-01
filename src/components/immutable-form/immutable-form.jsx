import produce from 'immer';
import { atom, useRecoilState } from 'recoil';

export const fullNameAtom = atom({
  key: 'fullNameAtom',
  default: {
    name: '',
    surname: '',
  },
});

function ImmutableForm() {
  const [fullName, setFullName] = useRecoilState(fullNameAtom);

  // To use Immer with Recoil, we need to use the `produce` function.
  // We transform the state using `produce` and then set the new values
  // in the draft.

  const handleChangeName = (event) => {
    setFullName((state) =>
      produce(state, (draft) => {
        draft.name = event.target.value;
      })
    );
  };

  const handleChangeSurname = (event) => {
    setFullName((state) =>
      produce(state, (draft) => {
        draft.surname = event.target.value;
      })
    );
  };

  return (
    <form>
      <input
        data-testid="name_input"
        type="text"
        value={fullName.name}
        onChange={handleChangeName}
      />
      <input
        data-testid="surname_input"
        type="text"
        value={fullName.surname}
        onChange={handleChangeSurname}
      />
    </form>
  );
}

export default ImmutableForm;
