import test from 'node:test';
import assert from 'node:assert/strict';
import { processRelations, processProjects } from './strapi-utils';

test('processRelations flattens array relations', () => {
  const input = {
    data: [
      { id: 1, attributes: { Name: 'Tag1' } },
      { id: 2, attributes: { Name: 'Tag2' } }
    ]
  };

  const output = processRelations(input);
  assert.deepEqual(output, [
    { id: 1, Name: 'Tag1' },
    { id: 2, Name: 'Tag2' }
  ]);
});

test('processRelations flattens single object relations', () => {
  const input = {
    data: { id: 1, attributes: { Name: 'Tag1' } }
  };

  const output = processRelations(input);
  assert.deepEqual(output, { id: 1, Name: 'Tag1' });
});

test('processProjects maps tag relations correctly', () => {
  const projects = [
    {
      id: 1,
      Title: 'Project1',
      Description: 'Desc',
      tags: {
        data: [
          { id: 10, attributes: { Name: 'Tag1' } },
          { id: 11, attributes: { Name: 'Tag2' } }
        ]
      },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z'
    }
  ];

  const output = processProjects(projects);
  assert.deepEqual(output[0].tags, [
    { id: 10, name: 'Tag1' },
    { id: 11, name: 'Tag2' }
  ]);
});
