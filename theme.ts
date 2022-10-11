import {extendTheme, theme} from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: theme.colors[process.env.NEXT_PUBLIC_COLOR || "teal"],
    bg: "#0070f3",
    color: "#ffffff",
    hover_bg: "#ffffff",
    hover_color: "#0070f3",
    social_bg: "teal",
    social_color: "#ffffff",
    hover_social_bg: "#285E61",
    hover_social_color: "#ffffff",
    button_decrement_bg: "#EB0000",
    button_decrement_color: "#ffffff",
    hover_button_decrement_bg: "#ffffff",
    hover_button_decrement_color: "#EB0000",
    button_increment_bg: "#00D006 ",
    button_increment_color: "#ffffff",
    hover_button_increment_bg: "#ffffff",
    hover_button_increment_color: "#00D006 ",
  },
  components: {
    Radio: {
      parts: ["label"],
      baseStyle: {
        label: {
          width: "100%",
        },
      },
    },
  },
});
