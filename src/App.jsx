import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import {useState} from "react";
import {useEffect} from "react";
import PageNotFound from "./pages/PageNotFound.jsx";


const BASE_URL = "http://localhost:8000";

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert("There was an error loading data...");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage/>}/> {/*index or path="/" same thing */}
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="app" element={<AppLayout/>}>
                    <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="countries" element={<p>Countries</p>}/>
                    <Route path="form" element={<p>Form</p>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

//11
