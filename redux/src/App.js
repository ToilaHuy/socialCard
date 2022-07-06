import CardsList from './features/Card/CardsList';
import Header from './components/Header';
import SingleCardPage from './features/Card/SingleCardPage';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Revert from './features/Card/Revert';
import { FilterList } from './features/filter/FilterList';

function App() {
    return (
        <main className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<CardsList />} />
                </Route>
                <Route path="/single/:id" element={<SingleCardPage />} />
                <Route path="revert" element={<Revert />} />
            </Routes>
            {/* <Header />
            <CardsList /> */}
        </main>
    );
}

export default App;
