import DataObjectIcon from "@mui/icons-material/DataObject";
import ImpaktApps from "@assets/ImpaktIcon.png";
import { ReactComponent as GlobalData } from "@assets/globaldata.svg";
import { ReactComponent as Transformer } from "@assets/transformer.svg";
import { ReactComponent as Other } from "@assets/other.svg";
export const getIconFromResourceType = (
  resourceType: string,
  height?: string | number
) => {
  switch (resourceType) {
    case "restapi":
      return <DataObjectIcon />;
    case "globalData":
      return <GlobalData />;
    case "transformer":
      return <Transformer />;
    case "other":
      return <Other />;
    case "impaktapps":
      return (
        <div>
          <img
            src={ImpaktApps}
            alt="impaktapps"
            width={height || 34}
            height={height || 40}
            style={{ paddingTop: "6px" }}
          />
        </div>
      );
  }
};
