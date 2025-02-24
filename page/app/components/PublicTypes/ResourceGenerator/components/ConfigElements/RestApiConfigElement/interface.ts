import { Control } from "react-hook-form"
import { RestApiAuth } from "../../../../resource/restapi"

export interface RestApiAuthPanelProps {
  auth?: RestApiAuth
  control: Control
}
