import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import { PAGES } from "./lib/pages";
import ScrollToTop from "./lib/scrollToTop";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    {PAGES.map((page, index) => (
                        <Route
                            key={index}
                            path={page.path}
                            element={<page.component />}
                        />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
