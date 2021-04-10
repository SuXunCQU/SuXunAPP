import { pxToDp } from "./styleKits";

export const Color = {
  background: {
    start: "#50eaa2",
    loginHeader: "#7ee7a8",
    content: "#00E0C7",
  },
  icon: {
    active: "#17e6a1",
  },
  button: {
    active: "#50eaa2",
    inActive: "#eafff2",
  },
  font: {
    header: "#121212",
    emphasize: "#008AE3",
    alleviate: "#9A9999",
  },
  border: "#C2C2C2",
};

export const Size = {
  header: {
    width: "100%",
    height: 50,
  },
  icon: {
    width: pxToDp(40),
    height: pxToDp(40),
  },
  button: {
    width: pxToDp(80),
    height: pxToDp(30),
  },
  borderWidth: pxToDp(1),
  font: {
    header: pxToDp(18),
    normal: pxToDp(14),
  },
};

export const Layout = {
  flex: {
    // View内元素水平垂直居中
    horizonVerticalCenter: {
      justifyContent: "center",
      alignItems: "center",
    },
  },
};
