const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const app = express();
app.use(express.json());
console.log(process.env.DATABASE_URL);





app.post('/posts', async (req, res) => {
    const { title, content, categoryId } = req.body;

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                categoryId,
            },
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/posts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                category: true,
                comments: true,
            },
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true,
                comments: true,
            },
        });
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, categoryId } = req.body;

    try {
        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                categoryId,
            },
        });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/categories', async (req, res) => {
    const { name } = req.body;

    try {
        const category = await prisma.category.create({
            data: {
                name,
            },
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/categories/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
        });
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                name,
            },
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.category.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/comments', async (req, res) => {
    const { content, postId } = req.body;

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
            },
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/comments', async (req, res) => {
    try {
        const comments = await prisma.comment.findMany();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/comments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(id) },
        });
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const comment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: {
                content,
            },
        });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.comment.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
