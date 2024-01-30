import List from './page'
import Form from './view/page'

import { Route, Routes } from "react-router-dom";
import react from 'react';

const IngredientsRouter = () => (
    <Routes>
        {/* <Route path="/form/:id" element={<Form />} />
        <Route path="/form" element={<Form />} /> */}
        <Route path="/" element={<List />} />
    </Routes>
)

export default IngredientsRouter;