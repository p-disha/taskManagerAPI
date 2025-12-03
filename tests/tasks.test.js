const request = require('supertest');
const app = require('../index');

describe('Task Manager API', () => {
  let taskId;

  test('POST /tasks - create task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Test', description: 'desc' });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    taskId = res.body.id;
  });

  test('GET /tasks/:id - retrieve task', async () => {
    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  test('PUT /tasks/:id - update task', async () => {
    const res = await request(app).put(`/tasks/${taskId}`).send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  test('GET /tasks - list tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('DELETE /tasks/:id - delete task', async () => {
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });
});
