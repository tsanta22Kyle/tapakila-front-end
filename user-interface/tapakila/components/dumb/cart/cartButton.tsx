import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './cart.module.css'
import { useRouter } from 'next/navigation'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../../../globalStores/globalStores';
import { CartStore } from '@/lib/types';
function CartButton(){

    const cartItems = useStore((state:CartStore)=> state.cartItems)
    const router = useRouter();
    function changePage(): void {
       router.push('/cart')
    }

    return(
        <div onClick={changePage} className={`${ cartItems.length==0 ?style.none:style.cartButton} `}>
            <button >
                <FontAwesomeIcon icon={faCartShopping} className={`fa-xl`}></FontAwesomeIcon>
            </button> 
            <p>{cartItems.length}</p>
        </div>
    )
}
export default CartButton;