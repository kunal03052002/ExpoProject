import { RestAPIAction, RestAPIBodyContent } from "@/page/app/components/PublicTypes/action/restApi";
import { ActionItem } from "@/redux/currentApp/action/interface";


export interface BodyEditorProps {
  actionItem: ActionItem<RestAPIAction<RestAPIBodyContent>>
}
