import "./App.css";
import CreateUser from "./views/CreateUser/CreateUser";
import UserListing from "./views/UserListing/UserListing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserListing />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route
            path="/edit-user/:userId"
            element={<CreateUser isEditMode={true} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
