import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        // Se añaden propiedades adicionales
        const newPost = {
            title: postData.title,
            content: postData.content,
            hashtags: postData.hashtags || [],
            imageUrl: postData.imageUrl || null,
            createdAt: Date.now(),
            user: user._id
        };

        return await postRepository.create(newPost);
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPostsByUser(userId) {
        return await postRepository.findByUser(userId);
    }

    async updatePost(postId, postData) {
        const updatedPost = {
            title: postData.title,
            content: postData.content,
            hashtags: postData.hashtags,
            imageUrl: postData.imageUrl,
            updatedAt: Date.now()
        };

        return await postRepository.update(postId, updatedPost);
    }
    async deletePost(postId) {
    return await postRepository.delete(postId);
}

}

export default new PostService();
