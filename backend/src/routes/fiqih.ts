import express, { Request, Response } from 'express';
import { pool as db } from '../config/initDB';
import { requireAuth, requireAdmin } from '../middleware/auth';

interface FiqihQA {
  id?: number;
  question: string;
  answer: string;
  category: string;
  tags?: string[];
  author: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
  views?: number;
}

const router = express.Router();

// Get all fiqih Q&A
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const { category, search, published } = req.query as Record<string, string>;
    let query = 'SELECT * FROM fiqih_qa';
    const params: any[] = [];
    const conditions: string[] = [];

    if (published !== 'false') {
      conditions.push('is_published = TRUE');
    }

    if (category && category !== 'all') {
      conditions.push('category = ?');
      params.push(category);
    }

    if (search) {
      conditions.push('(question LIKE ? OR answer LIKE ? OR tags LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    const [questions] = await db.execute(query, params) as [FiqihQA[], any];
    const questionsWithTags = questions.map(q => ({
      ...q,
      tags: q.tags ? JSON.parse(q.tags as unknown as string) : []
    }));

    res.json(questionsWithTags);
  } catch (error) {
    console.error('Get fiqih Q&A error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get fiqih Q&A by ID
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const [questions] = await db.execute('SELECT * FROM fiqih_qa WHERE id = ?', [req.params.id]) as [FiqihQA[], any];
    if (questions.length === 0) return res.status(404).json({ message: 'Fiqih Q&A not found' });

    const question = questions[0];
    question.tags = question.tags ? JSON.parse(question.tags as unknown as string) : [];
    res.json(question);
  } catch (error) {
    console.error('Get fiqih Q&A error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create fiqih Q&A (admin only)
router.post('/', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { question, answer, category, tags, author, is_published } = req.body as FiqihQA;

    if (!question || !answer || !category || !author) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const tagsJson = JSON.stringify(tags || []);
    const [result] = await db.execute(
      `INSERT INTO fiqih_qa (question, answer, category, tags, author, is_published)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [question, answer, category, tagsJson, author, is_published ?? true]
    ) as any;

    const [newQuestion] = await db.execute('SELECT * FROM fiqih_qa WHERE id = ?', [result.insertId]) as [FiqihQA[], any];
    const questionWithTags = { ...newQuestion[0], tags: newQuestion[0].tags ? JSON.parse(newQuestion[0].tags as unknown as string) : [] };
    res.status(201).json(questionWithTags);
  } catch (error) {
    console.error('Create fiqih Q&A error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update fiqih Q&A (admin only)
router.put('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { question, answer, category, tags, author, is_published } = req.body as FiqihQA;
    const tagsJson = JSON.stringify(tags || []);

    await db.execute(
      `UPDATE fiqih_qa SET question = ?, answer = ?, category = ?, tags = ?, 
       author = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [question, answer, category, tagsJson, author, is_published, req.params.id]
    );

    const [updatedQuestion] = await db.execute('SELECT * FROM fiqih_qa WHERE id = ?', [req.params.id]) as [FiqihQA[], any];
    if (updatedQuestion.length === 0) return res.status(404).json({ message: 'Fiqih Q&A not found' });

    const questionWithTags = { ...updatedQuestion[0], tags: updatedQuestion[0].tags ? JSON.parse(updatedQuestion[0].tags as unknown as string) : [] };
    res.json(questionWithTags);
  } catch (error) {
    console.error('Update fiqih Q&A error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete fiqih Q&A (admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  try {
    const [result] = await db.execute('DELETE FROM fiqih_qa WHERE id = ?', [req.params.id]) as any;
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Fiqih Q&A not found' });
    res.json({ message: 'Fiqih Q&A deleted successfully' });
  } catch (error) {
    console.error('Delete fiqih Q&A error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Increment views
router.post('/:id/view', requireAuth, async (req: Request, res: Response) => {
  try {
    await db.execute('UPDATE fiqih_qa SET views = views + 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Views incremented' });
  } catch (error) {
    console.error('Increment views error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get popular questions
router.get('/popular/top', requireAuth, async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const [questions] = await db.execute(
      'SELECT * FROM fiqih_qa WHERE is_published = TRUE ORDER BY views DESC LIMIT ?',
      [limit]
    ) as [FiqihQA[], any];

    const questionsWithTags = questions.map(q => ({
      ...q,
      tags: q.tags ? JSON.parse(q.tags as unknown as string) : []
    }));

    res.json(questionsWithTags);
  } catch (error) {
    console.error('Get popular questions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
