import ToastPlayground from "../ToastPlayground";
import ToastShelf from "../ToastShelf";
import Footer from "../Footer";
import ToastProvider from "../ToastProvider";

function App() {
  return (
    <ToastProvider>
      <ToastPlayground />
      <ToastShelf />
      <Footer />
    </ToastProvider>
  );
}

export default App;
