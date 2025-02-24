import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CreateButtonProps } from "./interface";
// import { Button } from "@mui/material";
export const CreateButton: FC<CreateButtonProps> = (props) => {
  const { formState } = useFormContext();
  const { t } = useTranslation();
  const { text = t("editor.action.form.btn.save_changes") } = props;

  return (
    <button
      disabled={!formState.isValid}
      style={{
        borderRadius: "10px",
        padding: "8px 16px",
        background: "#0ec704",
        color: "white",
        boxShadow:"1px 1px 2px #65c704"
      }}
      type="submit"
    >
      {formState.isSubmitting ? "Loading.." : text}
    </button>
  );
};
