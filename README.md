is projcet Blog here user cratea  Bloag  ;

projcet Name: Blog Projcet
Live Url Main : https://blog-project-psi-six.vercel.app/
Deployment: Vercel

Technology used :
Backend Development
Node.js
Express.js
Mongoose
TypeScript,
cors,
MongoDB,
Zod validation,

features: Admin
Will be created manually in the database with predefined credentials.
Can delete any blog.
Can block any user by updating a property isBlocked.

User:
Can register and log in.
Can create blogs (only when logged in).
Can update and delete their own blogs.

API Endpoints : Authentication>

Method Endpoint Description
POST   /api/auth/register    user register
post   /api/auth/login   Login

API Endpoints : Blog Managemen>
Post     /api/blogs       Create Blog Authorization: Bearer <token>
PATCH    /api/blogs/:id    Update Blog
DELETE   /api/blogs/:id    Delete Blog
GET       /api/blogs     Query Parameters

API Endpoints : Admin Actions >
PATCH   /api/admin/users/:userId/block     Block User Authorization: Bearer <admin_token>
DELETE   /api/admin/blogs/:id              Delete Blog Authorization: Bearer <admin_token>

 Error Handling

Zod Validation Error (ZOD_ERROR) Not Found Error (NOT_FOUND_ERROR) Validation Error (VALIDATION_ERROR): General validation errors Authentication Error (AUTH_ERROR): Issues related to failed authentication Authorization Error (AUTHORIZATION_ERROR): When the user lacks the necessary permissions to access a resource. Internal Server Error (INTERNAL_SERVER_ERROR) Unhandled errors or unexpected server issues.