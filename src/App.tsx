import "./App.css";
import { FullScreenLayout } from "./components/FullScreenLayout/FullScreenLayout";
import { SignUpForm } from "./components/SignUpForm/SignUpForm";

function App() {
  return (
    <FullScreenLayout>
      <SignUpForm />
    </FullScreenLayout>
  );
}

export default App;
