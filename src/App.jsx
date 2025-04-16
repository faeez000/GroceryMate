// src/App.jsx
import Header from "./pages/Header";
import Home from "./pages/Home";
import "sonner";
import { Toaster } from "./components/ui/sonner"; // ✅ Make sure the path is correct

function App() {
  return (
    <>
      <Header />
      <Home />
      <Toaster /> {/* ✅ Add this to enable toasts globally */}
    </>
  );
}

export default App;
