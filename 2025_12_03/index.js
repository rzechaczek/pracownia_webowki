const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const mongoClient = new MongoClient(process.env.MONGO_URI);
let accessLogsCollection;
let errorLogsCollection;

async function connectMongo() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("logsDB");

        accessLogsCollection = db.collection("accessLogs");
        errorLogsCollection = db.collection("errorLogs");

        console.log("MongoDB connected (logsDB)");
    } catch (error) {
        console.error("Mongo connection error:", error);
    }
}
connectMongo();

app.use(async (req, res, next) => {
    const log = {
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date(),
        body: req.body,
        headers: req.headers
    };

    try {
        if (accessLogsCollection) {
            await accessLogsCollection.insertOne(log);
        }
    } catch (err) {
        console.error("Error saving access log:", err);
    }

    next();
});

app.post('/posts', async (req, res, next) => {
    const { title, content, categoryId } = req.body;

    try {
        const post = await prisma.post.create({
            data: { title, content, categoryId },
        });
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
});

app.get('/posts', async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            include: { category: true, comments: true },
        });
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

app.get('/posts/:id', async (req, res, next) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { category: true, comments: true },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        next(error);
    }
});

app.put('/posts/:id', async (req, res, next) => {
    const { title, content, categoryId } = req.body;

    try {
        const post = await prisma.post.update({
            where: { id: parseInt(req.params.id) },
            data: { title, content, categoryId },
        });

        res.json(post);
    } catch (error) {
        next(error);
    }
});

app.delete('/posts/:id', async (req, res, next) => {
    try {
        await prisma.post.delete({
            where: { id: parseInt(req.params.id) },
        });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

app.post('/categories', async (req, res, next) => {
    try {
        const category = await prisma.category.create({
            data: { name: req.body.name },
        });
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
});

app.get('/categories', async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

app.get('/categories/:id', async (req, res, next) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json(category);
    } catch (error) {
        next(error);
    }
});

app.put('/categories/:id', async (req, res, next) => {
    try {
        const category = await prisma.category.update({
            where: { id: parseInt(req.params.id) },
            data: { name: req.body.name },
        });

        res.json(category);
    } catch (error) {
        next(error);
    }
});

app.delete('/categories/:id', async (req, res, next) => {
    try {
        await prisma.category.delete({
            where: { id: parseInt(req.params.id) },
        });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

// ------- comments ---------

app.post('/comments', async (req, res, next) => {
    try {
        const comment = await prisma.comment.create({
            data: { content: req.body.content, postId: req.body.postId },
        });

        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

app.get('/comments', async (req, res, next) => {
    try {
        const comments = await prisma.comment.findMany();
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

app.get('/comments/:id', async (req, res, next) => {
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json(comment);
    } catch (error) {
        next(error);
    }
});

app.put('/comments/:id', async (req, res, next) => {
    try {
        const comment = await prisma.comment.update({
            where: { id: parseInt(req.params.id) },
            data: { content: req.body.content },
        });

        res.json(comment);
    } catch (error) {
        next(error);
    }
});

app.delete('/comments/:id', async (req, res, next) => {
    try {
        await prisma.comment.delete({
            where: { id: parseInt(req.params.id) },
        });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
});
app.use(async (err, req, res, next) => {
    console.error("Error caught:", err);

    const errorLog = {
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        timestamp: new Date()
    };

    try {
        if (errorLogsCollection) {
            await errorLogsCollection.insertOne(errorLog);
        }
    } catch (e) {
        console.error("Could not save error log:", e);
    }

    res.status(500).json({
        error: "Internal Server Error",
        details: err.message
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});