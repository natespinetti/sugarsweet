1. npm install
2. Run this project with 'npm run dev'
3. To view JSON, XML, HTML - 
  -- http://localhost:3000/products
  -- http://localhost:3000/search?searchTerm=grape or flavor/description
  -- http://localhost:3000/admin/orders/
  -- http://localhost:3000/admin/users/
4. Recommended path:
    1. /products -- Add to cart
    2. /cart -- update qty
    3. /products -- add different flavor
    4. /cart -- remove new item
    5. search bar -- add flavor
    6. /login -- continue as guest
    7. /checkout -- fill out form
    8. /confirmation -- view all orders
    9. /orders -- view, edit, or cancel orders
    10. /login/admin -- continue as default admin
    11. /admin -- admin dashboard
    12. Product -- add edit and remove
    13. User -- add edit remove and edit order from user
    14. Order -- start order edit or cancel order
5. Admin accessed through http://localhost:3000/admin
6. If testing product removal, you can easily add products back by running node init.js