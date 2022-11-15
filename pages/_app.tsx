import * as React from "react";
import Head from "next/head";
import {
  ChakraProvider,
  Heading,
  Text,
  Image,
  Container,
  Stack,
  Divider,
  Link,
  Box,
  Flex,
} from "@chakra-ui/react";
import {AppProps} from "next/app";

import {INFORMATION} from "../app/constants";
import theme from "../theme";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <Head>
        <title>Mi tienda online - Helen Tejidos</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <ChakraProvider theme={theme}>
        <Container backgroundColor="white" borderRadius="sm" maxWidth="container.xl" padding={4}>
          <Stack spacing={8}>
            <Stack marginBottom={4} spacing={4}>
              <Image
                borderRadius="lg"
                height="100%"
                maxHeight={64}
                objectFit="cover"
                src={INFORMATION.banner}
              />
              <Stack
                alignItems="center"
                direction={{base: "column", sm: "row"}}
                spacing={{base: 3, sm: 6}}
              >
                <Box
                  backgroundColor="white"
                  borderRadius={9999}
                  marginTop={{base: -12, sm: -16}}
                  minWidth={{base: 24, sm: 32}}
                  padding={1}
                >
                  <Image
                    borderRadius={9999}
                    height={{base: 24, sm: 32}}
                    src={INFORMATION.avatar}
                    width={{base: 24, sm: 32}}
                  />
                </Box>
                <Stack
                  alignItems={{base: "center", sm: "flex-start"}}
                  spacing={3}
                  textAlign={{base: "center", sm: "left"}}
                >
                  <Stack spacing={0}>
                    <Heading>{INFORMATION.title}</Heading>
                    <Text color="gray.500" fontWeight="500">
                      {INFORMATION.description}
                    </Text>
                  </Stack>
                  <Stack direction="row">
                    {INFORMATION.social.map((social) => (
                      <Link key={social.name} isExternal href={social.url}>
                        <Flex
                          _hover={{
                            backgroundColor: "hover_social_bg",
                            color: "hover_social_color",
                          }}
                          alignItems="center"
                          backgroundColor="social_bg"
                          borderRadius={9999}
                          color="social_color"
                          height={10}
                          justifyContent="center"
                          width={10}
                        >
                          <Image
                            src={`https://icongr.am/fontawesome/${social.name}.svg?size=24&color=ffffff`}
                          />
                        </Flex>
                      </Link>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Component {...pageProps} />
          </Stack>
          <Divider marginY={4} />
          <Text textAlign="center">
            Copyright © {new Date().getFullYear()}. Hecho con ♥ por{" "}
            <Link isExternal href="https://leocipollone.dev.ar">
              Leo Cipollone
            </Link>
            .
          </Text>
        </Container>
      </ChakraProvider>
    </>
  );
};

export default App;
