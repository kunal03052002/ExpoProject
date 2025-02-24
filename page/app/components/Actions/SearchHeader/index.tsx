import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchHeaderProps } from "./interface";
import {
  actionListHeaderContainerStyle,
  actionTitleStyle,
  searchHeaderStyle,
  searchInputContainerStyle,
  searchInputStyle,
} from "./style";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Input } from "@mui/material";

interface SearchInputProps {
  onSearch: (value: string) => void;
  setInSearchState: Dispatch<SetStateAction<boolean>>;
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { t } = useTranslation();
  const { onSearch, setInSearchState } = props;

  return (
    <div css={css(searchHeaderStyle, searchInputContainerStyle)}>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Input
          placeholder={t("editor.action.action_list.placeholder.search")}
          onChange={(e) => {
            return onSearch(e.target.value);
          }}
          css={searchInputStyle}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={() => {
            setInSearchState(false);
            onSearch("");
          }}
          variant="text"
          size="small"
        >
          {t("editor.action.action_list.btn.close")}
        </Button>
      </motion.div>
    </div>
  );
};

export const SearchHeader: FC<SearchHeaderProps> = (props) => {
  const { onSearch, title } = props;
  const [inSearchState, setInSearchState] = useState(false);

  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {inSearchState ? (
        <SearchInput setInSearchState={setInSearchState} onSearch={onSearch} />
      ) : (
        <div css={actionListHeaderContainerStyle}>
          <h3 css={actionTitleStyle}>
            {title || t("editor.action.action_list.title")}
          </h3>
          <SearchIcon onClick={() => setInSearchState(true)} />
        </div>
      )}
    </AnimatePresence>
  );
};

SearchHeader.displayName = "SearchHeader";
