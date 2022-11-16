import * as React from "react";
import { Button, Flex, Grid, Stack, Text, Input, Select } from "@chakra-ui/react";

import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../../cart/components/CartDrawer/CartDrawer";
import { useCart } from "../../cart/context";
import { Field } from "../../cart/types";

interface Props {
  products: Product[];
  fields: Field[];
}

const StoreScreen: React.FC<Props> = ({ products, fields }) => {
  const [{ total, quantity }, { addItem }] = useCart();
  const [isCartOpen, toggleCart] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("");

  return (
    <>
      <Stack spacing={6}>
        <Flex gap='4' flexDirection={{sm: "column", md: "row",}}>
            <Input 
            py={3}
            flex={{
              sm: "1",
              md: "2",
              lg: "4"
            }}
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Buscar artículo" />
            <Select 
              flex={{
                sm: "1",
                md: "1",
                lg: "1"
              }}
              onChange={(e) => setActiveFilter(e.target.value)}
              placeholder='Todos los productos'>
                <option value="peluches">Peluches</option>
                <option value="sonajeros">Sonajeros</option>
                <option value="llaveros">Llaveros</option>
                <option value="gorros">Gorros</option>
                <option value="bufandas">Bufandas</option>
                <option value="mascotas">Mascotas</option>
            </Select>
        </Flex>
        {products.length ? (
          <>
            <Grid
              gridGap={8}
              templateColumns={{
                sm: "repeat(auto-fill, minmax(240px, 1fr))",
                md: "repeat(auto-fill, minmax(240px, 1fr))",
                lg: "repeat(auto-fill, minmax(240px, 1fr))"
              }}>
              {products
                ?.filter((product) =>
                  product.description.toLowerCase().includes(inputValue.toLowerCase()) ||
                  product.title.toLowerCase().includes(inputValue.toLowerCase())
                )
                .filter((product) => product.category.toLowerCase().includes(activeFilter))
                .map((el) => {
                  return (
                    <ProductCard
                      key={el.id}
                      product={el}
                      onAdd={(product: Product) => addItem(Symbol(), { ...product, quantity: 1 })}
                    />
                  )
                })
              }
            </Grid>
          </>
        ) : (
          <Text color="gray.500" fontSize="lg" margin="auto">
            No hay productos
          </Text>
        )}
        {Boolean(quantity) && (
          <Flex alignItems="center" bottom={4} justifyContent="center" position="sticky">
            <Button
              _hover={{
                backgroundColor: "hover_bg",
                color: "hover_color",
                border: "1px",
                borderColor: "bg",
              }}
              bg="#0070f3"
              borderRadius={10}
              boxShadow="dark-lg"
              color="color"
              data-testid="show-cart"
              size="lg"
              width={{ base: "100%", sm: "fit-content" }}
              onClick={() => toggleCart(true)}
            >
              <Stack alignItems="center" direction="row" spacing={6}>
                <Stack alignItems="center" direction="row" spacing={3}>
                  <Text fontSize="md" lineHeight={6}>
                    Ver pedido
                  </Text>
                  <Text
                    backgroundColor="rgba(0,0,0,0.25)"
                    borderRadius="sm"
                    color="gray.100"
                    fontSize="xs"
                    fontWeight="500"
                    paddingX={2}
                    paddingY={1}
                  >
                    {quantity} {quantity <= 1 ? "producto" : "productos"}
                  </Text>
                </Stack>
                <Text fontSize="md" lineHeight={6}>
                  {total}
                </Text>
              </Stack>
            </Button>
          </Flex>
        )}
      </Stack>
      <CartDrawer fields={fields} isOpen={isCartOpen} onClose={() => toggleCart(false)} />
    </>
  );
};

export default StoreScreen;
