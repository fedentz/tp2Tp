import { Router } from "express";
import StockController from "../controllers/stockController.js";
import { validateLogin } from "../midlewares/validateLogin.js";
import { isAdmin } from "../midlewares/isAdmin.js";

const stockRoutes = Router();

stockRoutes.get("/", validateLogin, isAdmin, StockController.getAllStocks); // Todos los registros
stockRoutes.get("/product/:productId", validateLogin, isAdmin, StockController.getAllStocksByProduct); // Por producto específico
stockRoutes.delete("/:id/delete", validateLogin, isAdmin, StockController.deleteStock);

export default stockRoutes;