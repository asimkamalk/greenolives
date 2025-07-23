import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "https://greenolives.onrender.com"
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const currency = "Rs";
    const deliveryCharge = 5;
    const [restaurantHours, setRestaurantHours] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
              if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }  
            } catch (error) {
                
            }
            
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    const setCartItemQuantity = (itemId, quantity) => {
        setCartItems((prev) => ({ ...prev, [itemId]: quantity }));
    }

    const fetchUserData = async () => {
        if (token) {
            try {
                console.log("Making API call to fetch user data with token:", token.substring(0, 20) + "...");
                const response = await axios.get(url + "/api/user/data", { headers: { token } });
                console.log("API response:", response.data);
                return response.data.data;
            } catch (error) {
                console.error("Error fetching user data:", error);
                return null;
            }
        }
        console.log("No token available");
        return null;
    }

    const fetchRestaurantHours = async () => {
        try {
            const response = await axios.get(url + "/api/settings");
            if (response.data.success) {
                setRestaurantHours(response.data.data);
                return response.data.data;
            }
        } catch (error) {
            console.error("Error fetching restaurant hours:", error);
        }
        return null;
    };

    const fetchFavorites = async () => {
        if (!token) return;
        try {
            const response = await axios.get(url + "/api/user/favorites", { headers: { token } });
            if (response.data.success) {
                setFavorites(response.data.favorites);
            }
        } catch (error) {
            console.error("Error fetching favorites:", error);
        }
    };

    const addFavorite = async (foodId) => {
        if (!token) return;
        try {
            const response = await axios.post(url + "/api/user/favorites/add", { foodId }, { headers: { token } });
            if (response.data.success) {
                setFavorites(response.data.favorites);
            }
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
    };

    const removeFavorite = async (foodId) => {
        if (!token) return;
        try {
            const response = await axios.post(url + "/api/user/favorites/remove", { foodId }, { headers: { token } });
            if (response.data.success) {
                setFavorites(response.data.favorites);
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    const reorder = (orderItems) => {
        const newCart = {};
        orderItems.forEach(item => {
            newCart[item._id] = item.quantity;
        });
        setCartItems(newCart);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchRestaurantHours();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
                await fetchFavorites();
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (token) {
            fetchFavorites();
        } else {
            setFavorites([]);
        }
    }, [token]);

    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        setCartItemQuantity,
        currency,
        deliveryCharge,
        fetchUserData,
        fetchRestaurantHours,
        restaurantHours,
        favorites,
        addFavorite,
        removeFavorite,
        reorder
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;