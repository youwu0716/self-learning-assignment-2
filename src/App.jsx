import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Announcements from './pages/Announcements';
import Repairs from './pages/Repairs';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Announcements />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/repairs" element={<Repairs />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
