import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "./Route";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((config, i) => (
          <Route key={i} {...config} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
