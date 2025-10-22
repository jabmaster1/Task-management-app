import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWithNavigate from "./components/Auth0ProviderWithNavigate";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}

export default App;