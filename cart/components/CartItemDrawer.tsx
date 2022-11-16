import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  CloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Divider,
  Button,
  DrawerFooter,
  DrawerProps,
  Text,
  Image,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import React from "react";

import {parseCurrency} from "../../utils/currency";
import {Option} from "../../product/types";
import {CartItem} from "../types";
import {getCartItemPrice} from "../utils";

interface Props extends Omit<DrawerProps, "children"> {
  item: CartItem;
  onClose: VoidFunction;
  onSubmit: (item: CartItem) => void;
}

const CartItemDrawer: React.FC<Props> = ({item, onClose, onSubmit, ...props}) => {
  const [formData, setFormData] = React.useState<CartItem>(() => ({...item, options: {}}));
  const total = React.useMemo(() => parseCurrency(getCartItemPrice(formData)), [formData]);
  const options = React.useMemo(
    () => Object.entries(item.options).map(([title, options]) => ({title, options})),
    [item],
  );
  const isValid = React.useMemo(() => options.length === Object.keys(formData.options).length, [
    formData,
    options,
  ]);

  function handleSelectOption(option: Option) {
    setFormData((formData) => ({
      ...formData,
      options: {...formData.options, [option.category]: [option]},
    }));
  }

  return (
    <Drawer placement="right" size="sm" onClose={onClose} {...props}>
      <DrawerOverlay>
        <DrawerContent paddingTop={4}>
          <DrawerHeader paddingX={4}>
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <Text color="#0070f3" fontSize={{base: "2xl", sm: "3xl"}} fontWeight="700">
                {item.title}
              </Text>
              <CloseButton onClick={onClose} />
            </Stack>
          </DrawerHeader>

          <DrawerBody data-testid="cart-item-drawer" paddingX={4}>
            <Stack divider={<Divider />} spacing={6}>
              <Stack>
                <Image
                  alt={item.title}
                  borderRadius={10}
                  height={240}
                  objectFit="cover"
                  src={item.image}
                  width="100%"
                />
                <Text color="gray.500">{item.description}</Text>
              </Stack>
              {options.length ? (
                <Stack divider={<Divider />} spacing={4}>
                  {options.map((category) => (
                    <Stack key={category.title} width="100%">
                      <Text fontSize="xl" fontWeight="700">
                        {category.title}
                      </Text>
                      <RadioGroup
                        colorScheme="primary"
                        value={formData.options?.[category.title]?.[0]?.title}
                      >
                        <Stack>
                          {category.options.map((option) => (
                            <Radio
                              key={option.title}
                              value={option.title}
                              onChange={() => handleSelectOption(option)}
                            >
                              <Stack direction="row" justifyContent="space-between" width="100%">
                                <Text>{option.title}</Text>
                                {Boolean(option.price) && (
                                  <Text color="green.500" fontWeight="700">+ {parseCurrency(option.price)}</Text>
                                )}
                              </Stack>
                            </Radio>
                          ))}
                        </Stack>
                      </RadioGroup>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Text color="gray.400">No hay elementos en tu carrito</Text>
              )}
            </Stack>
          </DrawerBody>

          <DrawerFooter paddingX={4}>
            <Stack spacing={4} width="100%">
              <Divider />
              <Stack
                alignItems="center"
                direction="row"
                fontSize="lg"
                fontWeight="500"
                justifyContent="space-between"
              >
                <Text fontWeight="700">Total</Text>
                <Text fontWeight="700" color="green.500">{total}</Text>
              </Stack>
              <Button
                _hover={{
                  backgroundColor: "hover_bg",
                  color: "hover_color",
                  border: "1px",
                  borderColor: "bg",
                }}
                backgroundColor="bg"
                borderRadius={10}
                color="color"
                isDisabled={!isValid}
                size="lg"
                width="100%"
                onClick={() => onSubmit(formData)}
              >
                Agregar al pedido
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CartItemDrawer;
