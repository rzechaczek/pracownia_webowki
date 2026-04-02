const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.get('/posts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { category: true }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                category: true,
                comments: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/comments', async (req, res) => {
    const { content, postId } = req.body;
    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                postId: parseInt(postId)
            }
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log('http://localhost:3000'));