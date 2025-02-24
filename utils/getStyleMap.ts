import { getStringSnippets, isDynamicStringSnippet } from "@/redux/utils";
import { isEmpty } from "lodash";
import { evaluateDynamicString } from "./evaluateDynamicString";

export const getStyleMap = (trueClassesArray, falseClassesArray, isClassTrue, context) => {
  let classesArray = []
  if (isClassTrue) {
    classesArray = trueClassesArray
  } else {
    classesArray = falseClassesArray
  }
  if (Array.isArray(classesArray) && !isEmpty(classesArray)) {
    return classesArray.map((name) => {
      const dynamicStrings = getStringSnippets(context?.classes?.[name?.value] as string);
      let resultStyle = dynamicStrings || {};
      dynamicStrings.forEach((dynamicString) => {
        if (isDynamicStringSnippet(dynamicString)) {
          try {
            const calcRes = evaluateDynamicString("", dynamicString, context);
            resultStyle = calcRes;
          } catch (e) { return {} }
        }
      });
      return resultStyle;
    });
  }
  return [
    {}
  ];
};