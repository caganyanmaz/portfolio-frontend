# Strapi API Integration

This directory contains the API integration for connecting to your Strapi backend.

## Environment Variables

Make sure you have the following environment variables set in your `.env` file:

```env
STRAPI_HOST_ADDRESS=http://localhost:1337
STRAPI_TOKEN=your_strapi_api_token_here
```

## Files Overview

### `api.ts`

Base API configuration and utility functions for making requests to Strapi.

### `portfolio-api.ts`

Portfolio-specific API functions for fetching data from your content types.

### `strapi-utils.ts`

Utility functions for processing and transforming Strapi data.

### `hooks/useStrapiData.ts`

React hooks for fetching data with loading states and error handling.

### `types/strapi.ts`

TypeScript type definitions for your Strapi content types.

## Content Types

The integration supports the following Strapi content types:

### Project

- `title` (Text)
- `description` (Rich text)
- `thumbnail` (Media)
- `sourceLink` (Text)
- `demoLink` (Text)
- `tags` (Relation - manyToMany with Tag)

### Tag

- `name` (Text)
- `projects` (Relation - manyToMany with Project)

### HomePage (Single Type)

- `introduction` (Text)
- `highlightedProjects` (Component - HighlightedProjects)
- `projects` (Relation - manyWay with Project)
- `techStacks` (Repeatable Component - TechStack)

### Components

#### HighlightedProjects

- `projects` (Relation - manyWay with Project)

#### TechStack

- `name` (Text)
- `tags` (Relation - manyWay with Tag)

## Usage Examples

### Using the API directly

```typescript
import { portfolioApi } from '@/lib/portfolio-api';

// Fetch all projects
const projects = await portfolioApi.getAllProjects();

// Fetch home page data
const homePage = await portfolioApi.getHomePage();

// Fetch projects by tag
const projectsByTag = await portfolioApi.getProjectsByTag(tagId);

// Fetch all tags
const tags = await portfolioApi.getAllTags();
```

### Using React hooks

```typescript
import { useHomePage, useProjects, useTags } from '@/lib/hooks/useStrapiData';

function MyComponent() {
  const { data: homePage, loading, error } = useHomePage();
  const { data: projects } = useProjects();
  const { data: tags } = useTags();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{homePage?.introduction}</h1>
      {/* Render your data */}
    </div>
  );
}
```

### Using utility functions

```typescript
import { processProjects, getImageUrl, filterProjectsByTag } from '@/lib/strapi-utils';

// Process raw Strapi data
const processedProjects = processProjects(rawProjectsData);

// Get image URL from Strapi media object
const imageUrl = getImageUrl(project.thumbnail, 'medium');

// Filter projects by tag name
const pythonProjects = filterProjectsByTag(projects, 'Python');
```

## API Functions

### Portfolio API Functions

- `getHomePage()` - Fetch home page data (single type)
- `getAllProjects()` - Fetch all projects with populated relations
- `getProjectById(id)` - Fetch a specific project by ID
- `getProjectsByTag(tagId)` - Fetch projects filtered by tag
- `getAllTags()` - Fetch all tags with populated relations
- `getTagById(id)` - Fetch a specific tag by ID
- `getHighlightedProjects()` - Fetch highlighted projects component
- `getAllTechStacks()` - Fetch all tech stacks
- `getTechStackById(id)` - Fetch a specific tech stack by ID

### Utility Functions

- `getProjectsWithTags()` - Fetch projects with tags and thumbnails
- `getTagsWithProjects()` - Fetch tags with related projects
- `getTechStacksWithTags()` - Fetch tech stacks with related tags

## Data Processing

The integration includes automatic data processing for:

- **Media URLs**: Automatically constructs full URLs for images
- **Relations**: Processes Strapi's relation format into usable objects
- **Nested Data**: Handles complex nested structures from Strapi

## Error Handling

All API functions include error handling and will return:

- `null` for single item requests that fail
- `[]` for array requests that fail
- Console errors for debugging

## Populate Parameters

The API automatically includes `populate=*` for most requests to ensure related data is fetched. For specific populate needs, you can use the utility functions that specify exact populate parameters.

## TypeScript Support

Full TypeScript support is included with proper type definitions for all content types and API responses.
