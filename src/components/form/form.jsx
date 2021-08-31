import { atom, useRecoilState } from 'recoil';

export const nameAtom = atom({
  key: 'nameAtom',
  default: '',
});

function Form() {
  const [name, setName] = useRecoilState(nameAtom);
  return (
    <form>
      <input
        data-testid="name_input"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </form>
  );
}

export default Form;
