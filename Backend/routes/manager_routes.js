import express from "express";
import {
  createManager,
  getAllManagers,
  updateManager,
  deleteManager,
  searchManager,
  paginationManager,
  multipleDelete
} from "../controllers/manager_controller.js";
import { verifyAdminToken } from "../middleware/verify_admin_token.js";

const router = express.Router();

router.use(verifyAdminToken);

router.post("/create", createManager);
router.get("/all", getAllManagers);
router.put("/update/:id", updateManager);
router.delete("/delete/:id", deleteManager);
router.get("/search", searchManager);
router.get("/pagination", paginationManager);
router.delete("/multiple-delete", multipleDelete);

export default router;