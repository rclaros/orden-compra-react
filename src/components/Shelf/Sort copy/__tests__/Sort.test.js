import Sort from '../';
import Root from '../../../../Root';

const initialState = {
  sort2: {
    type: 'dni'
  }
};

it('mounts without crashing', () => {
  const wrapped = mount(
    <Root initialState={initialState}>
      <Sort2 />
    </Root>
  );
  wrapped.unmount();
});
