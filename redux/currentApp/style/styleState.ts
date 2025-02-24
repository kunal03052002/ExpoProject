export type UpdateStylePayload = React.CSSProperties;
export type ClassValues = UpdateStylePayload;
export type ThemeValues = Record<string, unknown>;
export type ThemeState = Record<string, ThemeValues>;
export type ClassState = Record<string, ClassValues>
export type StyleState = {
    classes: ClassState,
    themes: ThemeState,
    cachedClass: ClassValues,
    cacheTheme: ThemeValues,
    appliedTheme: string
}
const Default_Theme = {
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Primary color (Blue)
            light: '#63a4ff', // Light variant of primary
            dark: '#004ba0', // Dark variant of primary
            contrastText: '#ffffff', // Text color on primary
        },
        secondary: {
            main: '#9c27b0', // Secondary color (Purple)
            light: '#d05ce3', // Light variant of secondary
            dark: '#6a0080', // Dark variant of secondary
            contrastText: '#ffffff', // Text color on secondary
        },
        background: {
            default: '#f9f9f9', // Main background color
            paper: '#ffffff', // Background for cards, dialogs, etc.
        },
        text: {
            primary: '#212121', // Main text color
            secondary: '#757575', // Secondary text color
            disabled: '#9e9e9e', // Disabled text color
        },
        error: {
            main: '#d32f2f', // Error color
        },
        calcWidth100px: {

        },
        warning: {
            main: '#f57c00', // Warning color
        },
        info: {
            main: '#0288d1', // Info color
        },
        success: {
            main: '#388e3c', // Success color
        },
        divider: '#e0e0e0', // Divider color
    },



    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Default font
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#212121',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#212121',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            color: '#212121',
        },
        body1: {
            fontSize: '1rem',
            color: '#424242',
        },
        body2: {
            fontSize: '0.875rem',
            color: '#616161',
        },
        button: {
            textTransform: 'none', // Prevent all caps on buttons
        },
    }
};
const classes = {
    // Heights
    heightFixed16: { height: "16px" },
    heightFixed20: { height: "20px" },
    heightFixed24: { height: "24px" },
    heightFixed40: { height: "40px" },
    heightFixed45: { height: "45px" },
    heightFixed50: { height: "50px" },
    heightFixed60: { height: "60px" },
    heightFixed70: { height: "70px" },
    heightFixed80: { height: "80px" },
    heightFixed100px: { height: "100px" },
    heightFixed130px: { height: "130px" },
    heightFixed140px: { height: "140px" },
    heightFixed120px: { height: "120px" },
    heightFixed125px: { height: "125px" },
    heightFixed110px: { height: "110px" },
    heightCalc100vhMinus100px: { height: "calc(100vh - 100px)" },
    heightCalc100vhMinus110px: { height: "calc(100vh - 110px)" },
    heightCalc100vhMinus120px: { height: "calc(100vh - 120px)" },
    heightCalc100vhMinus125px: { height: "calc(100vh - 125px)" },
    heightCalc100vhMinus130px: { height: "calc(100vh - 130px)" },
    heightCalc100vhMinus40px: { height: "calc(100vh - 40px)" },
    heightCalc100vhMinus45px: { height: "calc(100vh - 45px)" },
    heightCalc100vhMinus50px: { height: "calc(100vh - 50px)" },
    heightCalc100vhMinus60px: { height: "calc(100vh - 60px)" },
    heightCalc100vhMinus70px: { height: "calc(100vh - 70px)" },
    heightCalc100vhMinus80px: { height: "calc(100vh - 80px)" },
    heightCalc100vhMinus140px: { height: "calc(100vh - 140px)" },
    heightCalc100vhMinus150px: { height: "calc(100vh - 150px)" },
    heightCalc100vhMinus24px: { height: "calc(100vh - 24px)" },
    heightCalc100vhMinus20px: { height: "calc(100vh - 20px)" },
    heightCalc100vhMinus16px: { height: "calc(100vh - 16px)" },
    heightCalc100vhMinus200px: { height: "calc(100vh - 200px)" },
    heightCalc100vhMinus180px: { height: "calc(100vh - 180px)" },
    heightFixed200: { height: "200px" },
    heightFixed180: { height: "180px" },
    heightFixed150: { height: "150px" },
    // heightFixed60: { height: "60px" },
    heightFull: { height: "100%" },
    heightViewport: { height: "100vh" },
    height90Viewport: { height: "90vh" },

    positionAbsoluteFooter: {
        position: "absolute", bottom: 50,
    },
    positionRelative: { position: "relative" },
    positionAbsolute: { position: "absolute" },
    left0: {
        left: 0
    },
    top0: {
        top: 0
    },
    bottom0: {
        bottom: 0
    },
    // Widths
    widthFull: { width: "100%" },
    width90Percentage: { width: "90%" },
    width80Percentage: { width: "80%" },
    width70Percentage: { width: "70%" },
    width60Percentage: { width: "60%" },
    widthHalf: { width: "50%" },
    width40: { width: "40%" },
    widthViewport: { width: "100vw" },
    widthCalc100vwMinus120px: { width: "calc(100vw - 120px)" },

    // Backgrounds
    colorWhite: { color: "white" },
    borderRadiusNone: { borderRadius: "none" },
    backgroundGray: { background: "#d7d9d9" },
    backgroundPrimary: { background: Default_Theme.palette.primary.main },
    backgroundPrimaryLight: { background: Default_Theme.palette.primary.light },
    backgroundPrimarydark: { background: Default_Theme.palette.primary.dark },
    backgroundSecondary: { background: Default_Theme.palette.secondary.main },
    backgroundSecondaryLight: { background: Default_Theme.palette.secondary.light },
    backgroundSecondaryDark: { background: "black" },
    // Borders
    borderDefault: { border: "1px solid black" },
    borderBottom: { borderBottom: "1px solid black" },
    borderLeft: { borderLeft: "1px solid black" },
    borderRight: { borderRight: "1px solid black" },
    borderTop: { borderTop: "1px solid black" },
    borderRadiusSmall: { borderRadius: "4px" },
    borderRadiusMedium: { borderRadius: "8px" },
    borderRadiusLarge: { borderRadius: "16px" },
    // Spacing Utilities
    marginExtraSmall: { margin: "4px" },
    marginSmall: { margin: "8px" },
    marginMedium: { margin: "16px" },
    marginLarge: { margin: "24px" },
    marginExtraLarge: { margin: "32px" },
    paddingExtraSmall: { padding: "4px" },
    paddingSmall: { padding: "8px" },
    paddingMedium: { padding: "16px" },
    paddingLarge: { padding: "24px" },
    paddingExtraLarge: { padding: "32px" },
    marginTopExtraSmall: { marginTop: "4px" },
    marginTopSmall: { marginTop: "8px" },
    marginTopMedium: { marginTop: "16px" },
    marginTopLarge: { marginTop: "24px" },
    marginTopExtraLarge: { marginTop: "32px" },
    marginBottomExtraSmall: { marginBottom: "4px" },
    marginBottomSmall: { marginBottom: "8px" },
    marginBottomMedium: { marginBottom: "16px" },
    marginBottomLarge: { marginBottom: "24px" },
    marginBottomExtraLarge: { marginBottom: "32px" },
    marginRightExtraSmall: { marginRight: "4px" },
    marginRightSmall: { marginRight: "8px" },
    marginRightMedium: { marginRight: "16px" },
    marginRightLarge: { marginRight: "24px" },
    marginRightExtraLarge: { marginRight: "32px" },
    marginLeftExtraSmall: { marginLeft: "4px" },
    marginLeftSmall: { marginLeft: "8px" },
    marginLeftMedium: { marginLeft: "16px" },
    marginLeftLarge: { marginLeft: "24px" },
    marginLeftExtraLarge: { marginLeft: "32px" },

    marginAuto: { margin: "auto auto" },
    bottomMinus100Vh: { bottom: "-100vh" },

    paddingTopExtraSmall: { paddingTop: "4px" },
    paddingTopSmall: { paddingTop: "8px" },
    paddingTopMedium: { paddingTop: "16px" },
    paddingTopLarge: { paddingTop: "24px" },
    paddingTopExtraLarge: { paddingTop: "32px" },

    paddingBottomExtraSmall: { paddingBottom: "4px" },
    paddingBottomSmall: { paddingBottom: "8px" },
    paddingBottomMedium: { paddingBottom: "16px" },
    paddingBottomLarge: { paddingBottom: "24px" },
    paddingBottomExtraLarge: { paddingBottom: "32px" },
    paddingRightExtraSmall: { paddingRight: "4px" },
    paddingRightSmall: { paddingRight: "8px" },
    paddingRightMedium: { paddingRight: "16px" },
    paddingRightLarge: { paddingRight: "24px" },
    paddingRightExtraLarge: { paddingRight: "32px" },
    paddingLeftExtraSmall: { paddingLeft: "4px" },
    paddingLeftSmall: { paddingLeft: "8px" },
    paddingLeftMedium: { paddingLeft: "16px" },
    paddingLeftLarge: { paddingLeft: "24px" },
    paddingLeftExtraLarge: { paddingLeft: "32px" },
    // Display
    displayFlex: { display: "flex" },
    displayGrid: { display: "grid" },
    displayBlock: { display: "block" },
    displayInlineBlock: { display: "inline-block" },
    displayNone: { display: "none" },

    // Flexbox
    flexRow: { display: "flex", flexDirection: "row" },
    flexColumn: { display: "flex", flexDirection: "column" },
    flexCenter: { display: "flex", justifyContent: "center", alignItems: "center" },
    flexSpaceBetween: { display: "flex", justifyContent: "space-between" },
    flexSpaceAround: { display: "flex", justifyContent: "space-around" },

    // Typography
    textPrimary: { color: "#212121", fontSize: "16px", fontWeight: "400" },
    textSecondary: { color: "#757575", fontSize: "14px", fontWeight: "400" },
    textError: { color: "#d32f2f", fontSize: "14px", fontWeight: "400" },
    heading1: { fontSize: "2.5rem", fontWeight: "700", color: "#212121" },
    heading2: { fontSize: "2rem", fontWeight: "600", color: "#212121" },
    heading3: { fontSize: "1.75rem", fontWeight: "500", color: "#212121" },
    heading4: { fontSize: "1.5rem", fontWeight: "500", color: "#212121" },
    fontBold500: { fontWeight: 500 },
    fontBold550: { fontWeight: 550 },
    fontBold600: { fontWeight: 600 },
    colorpink: { color: "#EA0963" },
    backgroundRed: {

        backgroundColor: "#EA0A3E",
        color: "white",
        padding: "10px 20px",
        border: "none",
        transition: "background 0.3s",
        "&:hover": {
            backgroundColor: "#F44366",
            background:"#F44366", // Slightly lighter shade
        },
"&:active": {
      backgroundColor: "#D00B36",
      background:"#D00B36", // Darker shade when clicked
      boxShadow: "0 0 4px #D00B36"// Optional shadow effect
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#F44366",
      background:"#D00B36", 
      // Focus state color
    },
    },
    colorRed: { color: "#EA0A3E" },
    fontBold700: { fontWeight: 700 },
    fontBold800: { fontWeight: 800 },
    fontBold450: { fontWeight: 450 },
    fontBold400: { fontWeight: 400 },
    fontBold300: { fontWeight: 300 },
    colorGray: { color: "#AFAFAF" },
    colorLightBlack: { color: "#232422" },
    // Buttons
    buttonPrimary: { backgroundColor: "#1976d2", color: "#ffffff", borderRadius: "8px", padding: "8px 16px" },
    buttonPrimaryHover: { backgroundColor: "#1565c0" },
    buttonOutlined: { border: "1px solid black", color: "#1976d2", borderRadius: "8px", padding: "8px 16px" },
    buttonOutlinedHover: { backgroundColor: "rgba(25, 118, 210, 0.1)" },
    backgroundInherit: { background: "inherit", backgroundColor: "inherit" },
    // Inputs
    inputBase: { backgroundColor: "#fff", borderRadius: "4px", border: "1px solid #ccc", padding: "8px" },
    inputHover: { borderColor: "#1976d2" },
    inputFocus: { borderColor: "#1976d2", boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)" },

    // Cards
    cardBase: { borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", padding: "16px", backgroundColor: "#fff" },

    // Layout Components
    header: {
        position: "absolute", top: "0", left: "0", width: "100%", height: "50px",
        backgroundColor: "#e6ebf2", color: "#fff", display: "flex", alignItems: "center", zIndex: 1000,
    },
    sidebar: {
        position: "absolute", top: "60px", left: "0", width: "5%", height: "calc(100vh - 60px)",
        backgroundColor: "#f4f4f4", borderRight: "1px solid #ddd", overflowY: "auto", zIndex: 999,
    },
    contentBody: {
        position: "absolute", top: "60px", left: "5%", width: "95%", bottom: "40px",
        overflowY: "auto", backgroundColor: "#fff", padding: "16px",
    },
    footer: {
        position: "absolute", bottom: "0", left: "5%", width: "90%", height: "40px",
        backgroundColor: "#e6ebf2", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    },
    layoutFullHeight: { height: "100vh", display: "block", position: "relative" },
    bgBlack: { backgroundColor: "black" },
    // Utility
    gapSmall: { gap: "8px" },
    gapMedium: { gap: "16px" },
    gapLarge: { gap: "24px" },
    gapExtraLarge: { gap: "32px" },

    //
    fontsizeXS: { fontSize: "8px" },
    fontsizeSM: { fontSize: "12px" },
    fontsizeMD: { fontSize: "16px" },
    fontsieLarge: { fontSize: "20px" },
    fontsizeXL: { fontSize: "24px" },

    alignCenter: { align: "center" },
    alignLeft: { align: "left" },
    alignright: { align: "right" },

    justifyCenter: {
        justifyContent: "center"
    }


};

export const StyleInitialState: StyleState = {
    classes: classes,
    themes: { Default_Theme: Default_Theme },
    cachedClass: {},
    cacheTheme: {},
    appliedTheme: "Default_Theme"
}
