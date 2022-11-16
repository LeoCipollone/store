import React from "react";
import { Stack, Button, Text, Image, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons'

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
  let productImages = product.image.split(",")
  const [current, setCurrent] = React.useState(0);
  const length = productImages.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };


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
      >
        <Stack direction="column" padding={2} spacing={4} width="100%">
          <Image
            backgroundColor="white"
            borderRadius="10"
            height={{ md: "56", sm: "48", base: "48" }}
            loading="lazy"
            minWidth={{ md: "40", sm: "32" }}
            objectFit="cover"
            src={product.image}
            width="100%"
            onClick={() => setProductOpen(true)}
            className={styles.cursor}
          />
          <Stack justifyContent="space-between" spacing={1} width="100%">
            <Stack spacing={1} onClick={() => setProductOpen(true)} className={styles.cursor}>
              <Text fontWeight="700" onClick={() => setProductOpen(true)}>
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
                size="sm"
                onClick={() => (product.options ? toggleModal(true) : onAdd(cartItem))}
              >
                Agregar
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {productOpen && !isModalOpen && (
        <>
          <div onClick={() => setProductOpen(false)} className={styles.darkBG}></div>
          <div className={styles.centered}>
            <div className={styles.modal}>
            
              <IconButton
                  colorScheme='red'
                  aria-label='Search database'
                  className={styles.closeButton} 
                  onClick={() => setProductOpen(false)}
                  icon={<CloseIcon />}
                  p={0}
                />
              <div className={styles.modalHeader}>
                <h4 className={styles.productTitle}>{product.title}</h4>
              </div>
              <div className={styles.modalContent}>
                <IconButton
                  colorScheme='blue'
                  aria-label='Search database'
                  className={styles.leftArrow}
                  onClick={prevSlide}
                  icon={<ArrowBackIcon />}
                />
               
                {productImages.map((el, index) => (
                  <div key={index} className={styles.carrouselItem}>
                    {index === current && (
                      <Image
                        key={index}
                        backgroundColor="white"
                        borderRadius="10"
                        loading="lazy"
                        src={el}
                        className={styles.productImages}

                      />
                    )}
                  </div>
                ))}
                 <IconButton
                  colorScheme='blue'
                  aria-label='Search database'
                  className={styles.rightArrow}
                  onClick={nextSlide}
                  icon={<ArrowForwardIcon />}
                />
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
                  size="sm"
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
