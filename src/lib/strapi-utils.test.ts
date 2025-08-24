import { getImageUrl, processRelations, processProjects } from './strapi-utils';

describe('getImageUrl', () => {
  const host = 'https://strapi.test';
  beforeAll(() => {
    process.env.STRAPI_HOST_ADDRESS = host;
  });

  it('returns absolute url unchanged', () => {
    expect(getImageUrl('https://example.com/img.jpg')).toBe('https://example.com/img.jpg');
  });

  it('prefixes relative url', () => {
    const media = { url: '/uploads/img.jpg' } as any;
    expect(getImageUrl(media)).toBe(`${host}/uploads/img.jpg`);
  });

  it('handles strapi media object with formats', () => {
    const media = {
      data: {
        attributes: {
          url: '/uploads/original.jpg',
          formats: {
            small: { url: '/uploads/small.jpg' },
          },
        },
      },
    } as any;
    expect(getImageUrl(media, 'small')).toBe(`${host}/uploads/small.jpg`);
  });

  it('returns empty string for missing media', () => {
    expect(getImageUrl(null as any)).toBe('');
  });
});

describe('processRelations', () => {
  it('converts data array to array of flattened objects', () => {
    const input = {
      data: [
        { id: 1, attributes: { Name: 'Tag1' } },
        { id: 2, attributes: { Name: 'Tag2' } },
      ],
    };
    expect(processRelations(input)).toEqual([
      { id: 1, Name: 'Tag1' },
      { id: 2, Name: 'Tag2' },
    ]);
  });

  it('converts single data object to flattened object', () => {
    const input = {
      data: { id: 3, attributes: { Name: 'Tag3' } },
    };
    expect(processRelations(input)).toEqual({ id: 3, Name: 'Tag3' });
  });

  it('returns original value when data missing', () => {
    expect(processRelations(null as any)).toBeNull();
  });
});

describe('processProjects', () => {
  const host = 'https://strapi.test';
  beforeAll(() => {
    process.env.STRAPI_HOST_ADDRESS = host;
  });

  it('normalizes project structure', () => {
    const projects = [
      {
        id: 1,
        Title: 'Proj',
        Description: [
          { type: 'paragraph', children: [{ text: 'Desc' }] },
        ],
        Thumbnail: { url: '/uploads/thumb.png', alternativeText: 'thumb' },
        SourceLink: 'src',
        DemoLink: 'demo',
        tags: {
          data: [{ id: 1, attributes: { Name: 'Tag1' } }],
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
    ];
    const result = processProjects(projects);
    expect(result).toEqual([
      {
        id: 1,
        title: 'Proj',
        description: 'Desc',
        thumbnail: {
          url: `${host}/uploads/thumb.png`,
          alternativeText: 'thumb',
        },
        sourceLink: 'src',
        demoLink: 'demo',
        tags: [{ id: 1, name: 'Tag1' }],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
    ]);
  });

  it('handles projects with missing fields', () => {
    const result = processProjects([{} as any]);
    expect(result[0]).toMatchObject({
      id: 0,
      title: '',
      description: '',
      thumbnail: undefined,
      sourceLink: '',
      demoLink: '',
      tags: [],
    });
  });

  it('returns empty array for invalid input', () => {
    expect(processProjects(null as any)).toEqual([]);
    expect(processProjects({} as any)).toEqual([]);
  });
});
