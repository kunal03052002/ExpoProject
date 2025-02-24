import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputRecordEditorProps } from "./interface";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  applyRecordEditorContainerStyle,
  recordEditorLabelStyle,
  recordEditorStyle,
  recordStyle,
} from "./style";
import { Button, IconButton, Input } from "@mui/material";
import { globalColor } from "@/utils/colorBuilder";

export const InputRecordEditor: FC<InputRecordEditorProps> = (props) => {
  const {
    records,
    label,
    onDelete,
    onAdd,
    onChangeKey,
    onChangeValue,
    customRender,
  } = props;

  const { t } = useTranslation();

  const recordList = useMemo(() => {
    return (
      <>
        {records?.map((record, index) => {
          if (customRender) {
            return (
              <div css={recordStyle} key={index}>
                {customRender(record, index)}
                <Button
                  variant="outlined"
                  onClick={() => {
                    onDelete(index, record);
                  }}
                  // leftIcon={<DeleteIcon />}
                />
                Delete
              </div>
            );
          }
          return (
            <div css={recordStyle} key={index}>
              <Input
                value={record.key}
                placeholder="key"
                onChange={(e) => {
                  onChangeKey(index, e.target.value, record.value);
                }}
              />
              <Input
                placeholder="value"
                value={record.value}
                onChange={(e) => {
                  onChangeValue(index, record.key, e.target.value);
                }}
              />
              <IconButton
                onClick={() => {
                  onDelete(index, record);
                }}
                aria-label="delete"
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </>
    );
  }, [customRender, onChangeKey, onChangeValue, onDelete, records]);

  return (
    <div css={applyRecordEditorContainerStyle(label)}>
      {label != "" && <span css={recordEditorLabelStyle}>{label}</span>}
      <div css={recordEditorStyle}>
        {recordList}
        <span>
          <Button
            startIcon={<AddCircleOutlineIcon sx={{color:globalColor(`techPurple-08`)}} />}
            size="medium"
            variant="text"
            onClick={onAdd}
          >
            {t("editor.action.panel.btn.new")}
          </Button>
        </span>
      </div>
    </div>
  );
};

InputRecordEditor.displayName = "InputRecordEditor";
