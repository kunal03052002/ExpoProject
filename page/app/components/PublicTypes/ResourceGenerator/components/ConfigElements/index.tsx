import { FC, lazy } from "react";
import { ConfigElementProps } from "./interface";
const RestApiConfigElement = lazy(() => import("./RestApiConfigElement"));

export const ConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceType } = props;

  switch (resourceType) {
    case "restapi":
      return <RestApiConfigElement {...props} />;
    case "impaktapps":
      return (
        <div>
        Multiple resource not allowed
        </div>
      );
    default:
      return null;
  }
};
