import {extendTheme, theme} from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: theme.colors[process.env.NEXT_PUBLIC_COLOR || "teal"],
    bg: "#0070f3",
    color: "#ffffff",
    hover_bg: "#ffffff",
    hover_color: "#0070f3",
    social_bg: "#ef6179",
    social_color: "#ffffff",
    hover_social_bg: "#dc3545",
    hover_social_color: "#ffffff",
    button_decrement_bg: "#dc3545",
    button_decrement_color: "#ffffff",
    hover_button_decrement_bg: "#ffffff",
    hover_button_decrement_color: "#dc3545",
    button_increment_bg: "#198754 ",
    button_increment_color: "#ffffff",
    hover_button_increment_bg: "#ffffff",
    hover_button_increment_color: "#198754 ",
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
