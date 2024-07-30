import {
    useContext,
    useEffect,
    useRef,
    useState,
    fetchCategoryWiseProduct,
    displayINRCurrency,
    FaAngleLeft,
    FaAngleRight,
    Link,
    addToCart,
    Context,
    Button
} from "../utils/imports";


const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    }

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-semibold py-4">{heading}</h2>
            <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all" ref={scrollElement}>
                <button
                    className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
                    onClick={() => scrollElement.current.scrollLeft -= 300}>
                    <FaAngleLeft />
                </button>
                <button
                    className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
                    onClick={() => scrollElement.current.scrollLeft += 300}>
                    <FaAngleRight />
                </button>
                {
                    loading ? (
                        loadingList.map((product, index) => (
                            <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow">
                                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                                <div className="p-4 grid gap-3">
                                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                                    <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                                    <div className="flex gap-3">
                                        <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                                        <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                                    </div>
                                    <button className="text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse"></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map(product => (
                            <Link to={"product/" + product?._id} key={product?._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow">
                                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                                    <img
                                        src={product.productImage[0]}
                                        alt={product?.productName || `Product image ${product?._id}`}
                                        className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                                    />
                                </div>
                                <div className="p-4 grid gap-3">
                                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                                    <p className="capitalize text-slate-500">{product?.category}</p>
                                    <div className="flex gap-3">
                                        <p className="text-red-600 font-medium">{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className="text-slate-500 line-through">{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <Button
                                        shape="rounded"
                                        variant="danger"
                                        size="sm"
                                        onClick={e => handleAddToCart(e, product?._id)}
                                        danger>Add To Cart</Button>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    );
};


export default VerticalCardProduct;
