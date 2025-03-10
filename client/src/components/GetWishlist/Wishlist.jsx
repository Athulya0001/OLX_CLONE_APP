import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import GetWishlist from './GetWishlist';

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchWishlist = async () => {
            try {
              const response = await axios.get(
                "http://localhost:3000/api/auth/wishlist",
                {body: {wishlist,userId}}
              );
              console.log(response,"res")
              setLoading(true);
              setWishlist(response.data.wishlist);
            } catch (error) {
              console.error("Error fetching wishlist:", error);
            }
          };

          fetchWishlist()
    },[])
  return (
    <div>
      {wishlist.length===0?(
        <p>NO items Added to wishlist. Add items <Link to={"/home"}><span>Click here</span></Link></p>
      ):(
        <div>
            {wishlist.map((items)=>{
                <GetWishlist product={items}/>
            })}
        </div>
      )}
    </div>
  )
}

export default Wishlist
