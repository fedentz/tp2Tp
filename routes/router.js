import {Router} from "express"  
import userRoutes from "./userRoutes.js";
import rolesRoutes from "./rolesRouter.js"
import petRoutes from "./petRoutes.js";
import productRoutes from "./productRouters.js";
import stockRoutes from "./stockRoutes.js";
import cartRoutes from "./cartRoutes.js"
import shippingRoutes from "./shippingZoneRoutes.js";
import notFound from "../midlewares/notFound.js"

const router = Router()


router.use("/user",userRoutes)
router.use("/roles",rolesRoutes)
router.use("/pets",petRoutes)
router.use("/product",productRoutes)
router.use("/stock",stockRoutes)
router.use("/cart",cartRoutes)
router.use("/shipping",shippingRoutes)

router.use(notFound)

export default router;

