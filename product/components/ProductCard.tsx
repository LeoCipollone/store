import React from "react";
import { Stack, Button, Text, Image } from "@chakra-ui/react";
import { Carousel, LeftButton, Provider, RightButton } from "chakra-ui-carousel";
import { parseCurrency } from "../../utils/currency";
import { CartItem } from "../../cart/types";
import { Product } from "../types";
import CartItemDrawer from "../../cart/components/CartItemDrawer";
import styles from "../../styles/ProductCard.module.css"
interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd }) => {
  const [isModalOpen, toggleModal] = React.useState(false);
  const [productOpen, setProductOpen] = React.useState(false);
  const cartItem = React.useMemo<CartItem>(() => ({ ...product, quantity: 1 }), [product]);
  var productImages = product.image.split(",")

  return (
    <>
      <Stack
        key={product.id}
        alignItems="center"
        borderColor="gray.100"
        borderRadius="10"
        borderWidth={1}
        boxShadow="md"
        data-testid="product"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        onClick={() => setProductOpen(true)}
        className={styles.cursor}
      >
        <Stack direction="row" padding={2} spacing={4} width="100%">
          <Image
            backgroundColor="white"
            borderRadius="10"
            height={{ base: 24, sm: 36 }}
            loading="lazy"
            minWidth={{ base: 24, sm: 36 }}
            objectFit="cover"
            src={product.image}
            width={{ base: 24, sm: 36 }}
            onClick={() => setProductOpen(true)}
          />
          <Stack justifyContent="space-between" spacing={1} width="100%">
            <Stack spacing={1}>
              <Text fontWeight="500" onClick={() => setProductOpen(true)}>
                {product.title}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {product.description}
              </Text>
            </Stack>
            <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
              <Text color="green.500" fontSize="sm" fontWeight="500">
                {parseCurrency(product.price)}
              </Text>
              <Button
                _hover={{
                  backgroundColor: "hover_bg",
                  color: "hover_color",
                  border: "1px",
                  borderColor: "bg",
                }}
                backgroundColor="bg"
                color="color"
                size="xs"
                onClick={() => (product.options ? toggleModal(true) : onAdd(cartItem))}
              >
                Agregar
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {productOpen && (
        <>
          <div onClick={() => setProductOpen(false)} className={styles.darkBG}></div>
          <div className={styles.centered}>
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={() => setProductOpen(false)}>X</button>
              <div className={styles.modalHeader}>
                <h4 className={styles.productTitle}>{product.title}</h4>
              </div>
              <div className={styles.modalContent}>
                {productImages.map((el, index) => (
                  <Image
                  key={index}
                  backgroundColor="white"
                  borderRadius="10"
                  loading="lazy"
                  maxWidth={{ base: 64, sm: 72 }}
                  maxHeight={{ base: 64, sm: 72 }}
                  src={el}
                  className={styles.producImages}
                  /> 
                ))}
              </div>
                  <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.modalActions}>
                <Button
                  _hover={{
                    backgroundColor: "hover_bg",
                    color: "hover_color",
                    border: "1px",
                    borderColor: "bg",
                  }}
                  backgroundColor="bg"
                  color="color"
                  size="xs"
                  onClick={() => (product.options ? toggleModal(true) : onAdd(cartItem))}
                >
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {isModalOpen && (
        <CartItemDrawer
          isOpen
          item={cartItem}
          onClose={() => toggleModal(false)}
          onSubmit={(item: CartItem) => {
            onAdd(item);
            toggleModal(false);
          }}
        />
      )}
    </>
  );
};

export default ProductCard;
