import { FC, useCallback, useState } from "react";
import { ComponentPanelProps, ComponentSessionProps } from "./interface";
import { buildComponentList } from "@/page/app/components/ComponentPanel/componentListBuilder";

import { ComponentSession } from "./ComponentSession";
import {
  ColumnSuggestComponent,
  RowSuggestComponent,
} from "./components/SuggestComponent";
import SearchIcon from "@mui/icons-material/Search";
import {
  componentContainerStyle,
  emptyContainerStyle,
  searchWrapperStyle,
  sessionListContainerStyle,
} from "./style";
import { useTranslation } from "react-i18next";
import { getMatchComponent } from "./utils";
import { InputAdornment, TextField } from "@mui/material";

const ComponentPanel: FC<ComponentPanelProps> = (props) => {
  const { t } = useTranslation();

  const defaultList: ComponentSessionProps[] = buildComponentList();
  const { className, componentList = defaultList } = props;
  const [searchInput, setSearchInput] = useState("");
  const [searchRes, setSearchRes] = useState<
    ComponentSessionProps[] | undefined
  >(componentList);

  const handleOnChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      const res = getMatchComponent(value, componentList);
      setSearchRes(res);
    },
    [componentList]
  );

  return (
    <div
      className={className}
      css={componentContainerStyle}
      // onClick={() => {
      //   FocusManager.switchFocus("widget_picker")
      // }}
    >
      <div css={searchWrapperStyle}>
        <TextField
          fullWidth
          value={searchInput}
          onChange={(e) => handleOnChange(e.target.value)}
          placeholder={t("editor.widget_picker.search_placeholder")}
          sx={{
            
            "& .MuiInputBase-root": {
              color: "black",
              fontWeight: 500,
              background: "#f7f8fa",
              fontFamily: "inherit",
            
              borderRadius: "5px",
            },
            "& .MuiInputBase-input": {
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 500,
              borderColor:"white",
              padding: "6px",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                border: `1px solid `,
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "14px" }} />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </div>
      <div css={sessionListContainerStyle}>
        {searchRes && searchRes.length ? (
          searchRes
            .map((session) => (
              <ComponentSession
                key={"session-" + session.sessionTitle}
                {...session}
              />
            ))
            .concat(<RowSuggestComponent key="suggest" />)
        ) : (
          <div css={emptyContainerStyle}>
            <ColumnSuggestComponent />
          </div>
        )}
      </div>
    </div>
  );
};

ComponentPanel.displayName = "ComponentPanel";
export default ComponentPanel;
