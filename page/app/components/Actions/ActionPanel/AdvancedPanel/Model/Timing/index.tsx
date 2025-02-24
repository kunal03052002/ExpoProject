import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import i18n from "@/i18n/config"
import { getCachedActionAdvancedConfig } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getCurrentAppPageNames } from "@/redux/currentApp/components/componentsSelector"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ACTION_RUN_TIME, IAdvancedConfig } from "@/redux/config/configReducer"
import { AdvancedPanelHeader } from "../../Components/Header"
import { AdvancedPanelControl } from "../../Components/Control"
import Select from "@mui/material/Select"
import { MenuItem, Switch } from "@mui/material"

const RUN_TIME_OPTIONS = [
  {
    label: i18n.t("editor.action.panel.label.option.advanced.on_app_loading"),
    value: "appLoaded",
  },
  {
    label: i18n.t("editor.action.panel.label.option.advanced.on_page_loading"),
    value: "pageLoading",
  },
  {
    label: i18n.t("editor.action.panel.label.option.advanced.none"),
    value: "none",
  },
]

export const TimingSetting: FC = () => {
  const cachedActionAdvancedConfig = useSelector(getCachedActionAdvancedConfig)
  const pageDisplayNames = useSelector(getCurrentAppPageNames)
  const { runtime, pages, delayWhenLoaded, displayLoadingPage } =
    cachedActionAdvancedConfig

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleUpdateAdvancedConfig = useCallback(
    (key: keyof IAdvancedConfig) => {
      return (value: unknown) => {
        const updateSlice: Partial<IAdvancedConfig> = {
          [key]: value,
        }
        if (key === "runtime") {
          switch (value) {
            case ACTION_RUN_TIME.APP_LOADED: {
              updateSlice.pages = []
              updateSlice.displayLoadingPage = false
              break
            }
            case ACTION_RUN_TIME.NONE: {
              updateSlice.pages = []
              updateSlice.delayWhenLoaded = ""
              updateSlice.displayLoadingPage = false
              break
            }
            case ACTION_RUN_TIME.PAGE_LOADING: {
              break
            }
          }
        }
        dispatch(
          configActions.updateCachedActionAdvancedConfigReducer(updateSlice),
        )
      }
    },
    [dispatch],
  )

  return (
    <div style={{marginBottom:"20px"}}>
      <AdvancedPanelHeader title="TIMING" />
      <AdvancedPanelControl
        title={t("editor.action.panel.label.advanced.page_trigger")}
      >
        <Select
        size="small"
          value={runtime}
          onChange={(e)=>handleUpdateAdvancedConfig("runtime")(e.target.value)}
        >
          {RUN_TIME_OPTIONS.map((e)=>{
            return(<MenuItem key={e.value}
               value={e.value}
               onClick={()=>handleUpdateAdvancedConfig("runtime")}
               >{e.label}</MenuItem>)
          })}
        </Select>
      </AdvancedPanelControl>
      <AdvancedPanelControl
        title={t("editor.action.panel.label.advanced.page_load_delay")}
        disabled={runtime === "none"}
      >
        <CodeEditor
          value={delayWhenLoaded}
          onChange={handleUpdateAdvancedConfig("delayWhenLoaded")}
          expectValueType={VALIDATION_TYPES.NUMBER}
        />
      </AdvancedPanelControl>
      <AdvancedPanelControl
        title={t("editor.action.panel.label.advanced.pages")}
        disabled={runtime !== "pageLoading"}
      >
          <Select
          value={pages}
          sx={{fontSize:"12px",width:"170px"}}
           size="small"
          multiple
          onChange={(e)=>handleUpdateAdvancedConfig("pages")(e.target.value)}
        >
          {pageDisplayNames.map((e)=>{
            return(<MenuItem key={e} value={e}>{e}</MenuItem>)
          })}
        </Select>
      </AdvancedPanelControl>
      <AdvancedPanelControl
        title={t("editor.action.panel.label.advanced.loading_page")}
        disabled={runtime !== "pageLoading"}
        subtitle={t(
          "editor.action.panel.label.option.advanced.show_a_loading_page_",
        )}
      >
        <Switch
          checked={runtime}
          onChange={handleUpdateAdvancedConfig("runtime")}
        />
      </AdvancedPanelControl>
    </div>
  )
}
