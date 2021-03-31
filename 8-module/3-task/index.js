export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let cartItems = this.cartItems.find(item => item.product.id === product.id);
    if (!cartItems) {
      cartItems = {
        product,
        count: 1,
      };

      this.cartItems.push(cartItems);
    }
    else {
      cartItems.count++;
    }

    this.onProductUpdate(cartItems);
  }

  updateProductCount(productId, amount) {
    let cartItems = this.cartItems.find(item => item.product.id === productId);
    amount < 1 ? cartItems.count-- : cartItems.count++;
    if (!cartItems) {return;}
    if (cartItems.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItems), 1);
    }

    this.onProductUpdate(cartItems);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.product.price * item.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

