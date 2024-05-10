import Container from './views/Container';
import WithLayout from "./layouts/WithLayout";

function App(props) {
  return <Container {...props} />;
}

export default WithLayout(App);
