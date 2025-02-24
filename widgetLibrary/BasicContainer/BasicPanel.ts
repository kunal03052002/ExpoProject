// import i18n from "@/i18n/config"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/app/components/InspectPanel/interface"
import { ScreenPayload } from "@/redux/config/configState"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
export const BUILD_BASIC_CONTAINER_PANEL_CONFIG = (currentScreen: ScreenPayload) => {
  const baseWidgetName = "View"
  const BasicContainer_PANEL_CONFIG: PanelConfig[] = [
    {
      id: `${baseWidgetName}-viewList-extraSmallScreen`,
      labelName: "Row Span",
      labelDesc: "Row Span",
      attrName: `${currentScreen}.rowSpan`,
      defaultValue: "1",
      expectedType: VALIDATION_TYPES.STRING,
      setterType: "INPUT_SETTER",
    },
    {
      id: `${baseWidgetName}-viewList-SmallScreen`,
      labelName: `Column Span`,
      labelDesc: "SmallScrenLayout",
      attrName: `${currentScreen}.columnSpan`,
      defaultValue: "1",
      expectedType: VALIDATION_TYPES.STRING,
      setterType: "INPUT_SETTER",
    },
    {
      id: `${baseWidgetName}-validation-classesCondition`,
      labelName: "Style Class Condition",
      labelDesc: i18n.t("editor.inspect.setter_tooltip.form_data_key"),
      setterType: "INPUT_SETTER",
      expectedType: VALIDATION_TYPES.BOOLEAN,
      defaultValue: true,
      attrName: `isClassTrue`,
    },
    {
      id: `${currentScreen}-${baseWidgetName}-style-trueClasses`,
      labelName: "Select True CSS Classes  :",
      isSetterSingleRow: true,
      attrName: `${currentScreen}.trueClasses`,
      setterType: "BASE_MULTI_SELECT_SETTER",
      expectedType: VALIDATION_TYPES.ARRAY,
    }, 
    {
      id: `${baseWidgetName}-style-falseClasses`,
      labelName: "Select false CSS Classes  :",
      isSetterSingleRow: true,
      attrName: `${currentScreen}.falseClasses`,
      setterType: "BASE_MULTI_SELECT_SETTER",
      expectedType: VALIDATION_TYPES.ARRAY,
    },
  ]
  return BasicContainer_PANEL_CONFIG;
}
