import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    cartTotalAmount: number;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalAmount, setCartTotalAmount] =useState(0);

    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
    useEffect(() => {

        const cartItems: any =localStorage.getItem("myItems");
        const cartProducts: CartProductType[] | null =JSON.parse(cartItems);
        const myShopPaymentIntent:any = localStorage.getItem('MyShopPaymentIntent');
        const paymentIntent: string | null = JSON.parse(myShopPaymentIntent);

        setCartProducts(cartProducts);
        setPaymentIntent(paymentIntent);
    }, []);

    useEffect(() => {
        const getTotals= () => {
            if(cartProducts){
                const {total, qty} = cartProducts?.reduce((acc, item)=>{
                    const itemTotal= item.price*item.quantity;
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
                    return acc;
                }, {
                    total: 0,
                    qty: 0,
                })
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        }
        getTotals();
    }, [cartProducts]);
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product];
            }
            else {
                updatedCart = [product];
            }
            toast.success('Product Added To Cart');
            localStorage.setItem('myItems', JSON.stringify(updatedCart));
            return updatedCart;
        })
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if(cartProducts){
            const filteredProducts= cartProducts.filter((item) => {
                return item.id !== product.id;
            });
            setCartProducts(filteredProducts);
            toast.success('Product Removed');
            localStorage.setItem('myItems', JSON.stringify(filteredProducts));
        }
    }, [cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 999){
            return toast.error("Ooop! Maximum Reached");
        }
        if(cartProducts){
            updatedCart=[...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
            if(existingIndex > -1){
                updatedCart[existingIndex].quantity= updatedCart[existingIndex].quantity+1;
            }
            setCartProducts(updatedCart);
            localStorage.setItem('myItems' ,JSON.stringify(updatedCart));
        }
    }, [cartProducts]);
    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 1){
            return toast.error("Ooop! Minimum Reached");
        }
        if(cartProducts){
            updatedCart=[...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);
            if(existingIndex > -1){
                updatedCart[existingIndex].quantity= updatedCart[existingIndex].quantity-1;
            }
            setCartProducts(updatedCart);
            localStorage.setItem('myItems' ,JSON.stringify(updatedCart));
        }
    }, [cartProducts]);
    const handleClearCart = useCallback(()=>{
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem('myItems', JSON.stringify(null));
    }, [cartProducts]);
    
    const handleSetPaymentIntent = useCallback((val:string|null)=>{
        setPaymentIntent(val);
        localStorage.setItem('MyShopPaymentIntent',JSON.stringify(val));
    }, [paymentIntent]);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        cartTotalAmount,
        paymentIntent,
        handleSetPaymentIntent,
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error('useCart must be used within a CartContextProvider');
    }
    return context;
}