import postService from "../services/postService.js";

class PostController {
    async create(req, res) {
        try {
            const { userId } = req.params;
            const post = await postService.createPost(userId, req.body);
            res.redirect("/posts"); // redirige al listado
        } catch (error) {
            res.status(400).render("error", { error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts/index", { posts });
        } catch (error) {
            res.status(500).render("error", { error: error.message });
        }
    }

    async renderNewForm(req, res) {
        const { userId } = req.params;
        res.render("posts/new", { userId });
    }

    async renderEditForm(req, res) {
        try {
            const { postId } = req.params;
            const posts = await postService.getPosts();
            const post = posts.find(p => p._id.toString() === postId);
            if (!post) return res.status(404).render("error", { error: "Post no encontrado" });
            res.render("posts/edit", { post });
        } catch (error) {
            res.status(400).render("error", { error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { postId } = req.params;
            await postService.updatePost(postId, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).render("error", { error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { postId } = req.params;
            await postService.deletePost(postId);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).render("error", { error: error.message });
        }
    }
}

export default new PostController();
