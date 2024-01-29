import Form from './form'
import List from './list'

import { Route, Routes } from "react-router-dom";
import react from 'react';

const MealsRouter = () => (
    <Routes>
        <Route path="/form/:id" element={<Form />} />
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<List />} />
    </Routes>
)

export default MealsRouter;