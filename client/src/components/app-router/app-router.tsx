import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "../../pages/layout/layout";
import routes from "../../routes";

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Navigate to="/tasks" replace />} />
                {routes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Route>
        </Routes>
    );
};

export default AppRouter;
