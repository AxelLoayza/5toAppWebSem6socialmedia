import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

// Lista todos los posts
router.get("/", postController.getAll);


// Formulario para nuevo post
router.get("/new/:userId", postController.renderNewForm);

// Crear un nuevo post
router.post("/new/:userId", postController.create);


// Formulario para editar post
router.get("/:postId/edit", postController.renderEditForm);

// Actualizar un post
router.post("/:postId/edit", postController.update);

// Eliminar un post
router.post("/:postId/delete", postController.delete);

export default router;
