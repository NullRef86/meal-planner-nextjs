import List from './list'
import Form from './form'

import { Route, Routes } from "react-router-dom";
import react from 'react';

const IngredientsRouter = () => (
    <Routes>
        <Route path="/form/:id" element={<Form />} />
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<List />} />
    </Routes>
)

export default IngredientsRouter;