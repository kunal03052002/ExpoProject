
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ControlledElement } from "../../../ControlledElement"
import { RestApiAuthPanelProps } from "../interface"
import { validateNotEmpty } from "../../../../utils"
import { RestAPIBearerAuth } from "@/page/app/components/PublicTypes/resource/restapi"

export const BearerAuthPanel: FC<RestApiAuthPanelProps> = (props) => {
const { control } = props
  const auth = props.auth as RestAPIBearerAuth
  const { t } = useTranslation()

  return (
    <ControlledElement
      title={t("editor.action.resource.restapi.label.bearerToken")}
      defaultValue={auth?.token ?? ""}
      name="token"
      controlledType="input"
      control={control}
      isRequired
      rules={[
        {
          validate: validateNotEmpty,
        },
      ]}
    />
  )
}

BearerAuthPanel.displayName = "BearerAuthPanel"
