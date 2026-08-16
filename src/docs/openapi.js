/** OpenAPI 3.0 specification for DriveSafely API */
export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'DriveSafely API',
    version: '1.0.0',
    description:
      'Backend API for DriveSafely — road safety learning platform (auth, news, user profile).',
    contact: {
      name: 'DriveSafely',
      url: 'https://github.com/Mariana331/drive-safely-node.js',
    },
  },
  servers: [
    {
      url: 'http://localhost:3002/api',
    },
    {
      url: 'https://drive-safely-node-js-1.onrender.com',
    },
  ],
  tags: [
    { name: 'Health', description: 'Service health checks' },
    { name: 'Auth', description: 'Registration, login, session' },
    { name: 'News', description: 'Published traffic & safety news' },
    { name: 'Profile', description: 'Authenticated user profile' },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
        description:
          'HTTP-only JWT cookie set by `/auth/login` or `/auth/register`. Use “Authorize” after logging in via Swagger, or call login first in the same browser session.',
      },
    },
    schemas: {
      ApiMessage: {
        type: 'object',
        properties: {
          status: { type: 'integer', example: 200 },
          message: { type: 'string', example: 'Success' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: { type: 'integer', example: 400 },
          message: { type: 'string', example: 'Valid email is required' },
        },
      },
      Skill: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Traffic Signs' },
          percent: { type: 'number', example: 72 },
        },
      },
      Achievement: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'first-analysis' },
          title: { type: 'string', example: 'First Analysis' },
          unlocked: { type: 'boolean', example: false },
        },
      },
      Activity: {
        type: 'object',
        properties: {
          type: { type: 'string', example: 'welcome' },
          text: {
            type: 'string',
            example: 'Welcome to DriveSafely! Start your journey today.',
          },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      UserStats: {
        type: 'object',
        properties: {
          videosAnalyzed: { type: 'integer', example: 0 },
          videosAnalyzedMonthly: { type: 'integer', example: 0 },
          rulesLearned: { type: 'integer', example: 0 },
          rulesLearnedMonthly: { type: 'integer', example: 0 },
          testsCompleted: { type: 'integer', example: 0 },
          testsCompletedMonthly: { type: 'integer', example: 0 },
          aiQuestions: { type: 'integer', example: 0 },
          aiQuestionsMonthly: { type: 'integer', example: 0 },
          achievementsCount: { type: 'integer', example: 0 },
          achievementsNew: { type: 'integer', example: 0 },
        },
      },
      Streak: {
        type: 'object',
        properties: {
          current: { type: 'integer', example: 1 },
          lastActiveDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
        },
      },
      PublicUser: {
        type: 'object',
        description: 'User object without passwordHash',
        properties: {
          _id: { type: 'string', example: '665f1a2b3c4d5e6f7a8b9c0d' },
          fullName: { type: 'string', example: 'Olivia Johnson' },
          email: {
            type: 'string',
            format: 'email',
            example: 'olivia@mail.com',
          },
          dateOfBirth: { type: 'string', format: 'date-time' },
          country: { type: 'string', example: 'Ukraine' },
          driverLicense: { type: 'string', example: '' },
          experienceLevel: {
            type: 'string',
            enum: ['new', 'experienced', 'professional'],
          },
          avatarUrl: { type: 'string' },
          location: { type: 'string' },
          bio: { type: 'string' },
          safetyScore: { type: 'number', example: 50 },
          xp: { type: 'integer', example: 0 },
          level: { type: 'string', example: 'Beginner' },
          stats: { $ref: '#/components/schemas/UserStats' },
          skills: {
            type: 'array',
            items: { $ref: '#/components/schemas/Skill' },
          },
          achievements: {
            type: 'array',
            items: { $ref: '#/components/schemas/Achievement' },
          },
          streak: { $ref: '#/components/schemas/Streak' },
          activity: {
            type: 'array',
            items: { $ref: '#/components/schemas/Activity' },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      NewsCategory: {
        type: 'string',
        enum: [
          'Traffic News',
          'Road Safety',
          'Traffic Laws',
          'AI & Automotive',
          'New Law',
          'Update',
          'Reminder',
        ],
      },
      NewsArticle: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          slug: { type: 'string', example: 'official-traffic-rules-ukraine' },
          excerpt: { type: 'string' },
          category: { $ref: '#/components/schemas/NewsCategory' },
          imageUrl: { type: 'string', format: 'uri' },
          readTimeMinutes: { type: 'integer', example: 3 },
          country: { type: 'string', example: 'Ukraine' },
          publishedAt: { type: 'string', format: 'date-time' },
          isPublished: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: [
          'fullName',
          'email',
          'password',
          'confirmPassword',
          'dateOfBirth',
          'country',
          'experienceLevel',
          'agreeToTerms',
        ],
        properties: {
          fullName: { type: 'string', minLength: 2, example: 'Olivia Johnson' },
          email: {
            type: 'string',
            format: 'email',
            example: 'olivia@mail.com',
          },
          password: { type: 'string', minLength: 6, example: 'secret12' },
          confirmPassword: {
            type: 'string',
            minLength: 6,
            example: 'secret12',
          },
          dateOfBirth: {
            type: 'string',
            format: 'date',
            example: '1998-05-12',
          },
          country: { type: 'string', example: 'Ukraine' },
          driverLicense: { type: 'string', example: '' },
          experienceLevel: {
            type: 'string',
            enum: ['new', 'experienced', 'professional'],
            example: 'new',
          },
          agreeToTerms: { type: 'boolean', example: true },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'olivia@mail.com',
          },
          password: { type: 'string', minLength: 6, example: 'secret12' },
        },
      },
      AuthSuccess: {
        allOf: [
          { $ref: '#/components/schemas/ApiMessage' },
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  user: { $ref: '#/components/schemas/PublicUser' },
                },
              },
            },
          },
        ],
      },
      ProfileData: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/PublicUser' },
          stats: { $ref: '#/components/schemas/UserStats' },
          skills: {
            type: 'array',
            items: { $ref: '#/components/schemas/Skill' },
          },
          achievements: {
            type: 'array',
            items: { $ref: '#/components/schemas/Achievement' },
          },
          streak: { $ref: '#/components/schemas/Streak' },
          activity: {
            type: 'array',
            items: { $ref: '#/components/schemas/Activity' },
          },
          safetyScore: { type: 'number' },
          xp: { type: 'integer' },
          level: { type: 'string' },
          totalAchievements: { type: 'integer', example: 30 },
          unlockedAchievements: { type: 'integer', example: 0 },
          xpToNextLevel: { type: 'integer', example: 2000 },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
      Unauthorized: {
        description: 'Missing or invalid auth cookie',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
      Conflict: {
        description: 'Conflict (e.g. email already registered)',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
          },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Returns API status and MongoDB connection state.',
        operationId: 'getHealth',
        responses: {
          200: {
            description: 'Service is up',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'Success' },
                    data: {
                      type: 'object',
                      properties: {
                        status: { type: 'string', example: 'ok' },
                        db: {
                          type: 'string',
                          enum: ['connected', 'disconnected'],
                          example: 'connected',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        description:
          'Creates an account and sets an HTTP-only `token` cookie (JWT).',
        operationId: 'register',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Account created; auth cookie set',
            headers: {
              'Set-Cookie': {
                schema: { type: 'string' },
                description: 'HttpOnly JWT cookie named `token`',
              },
            },
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthSuccess' },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
          409: { $ref: '#/components/responses/Conflict' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Log in',
        description:
          'Validates credentials and sets an HTTP-only `token` cookie.',
        operationId: 'login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Logged in; auth cookie set',
            headers: {
              'Set-Cookie': {
                schema: { type: 'string' },
                description: 'HttpOnly JWT cookie named `token`',
              },
            },
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthSuccess' },
              },
            },
          },
          400: { $ref: '#/components/responses/BadRequest' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Log out',
        description: 'Clears the `token` auth cookie.',
        operationId: 'logout',
        responses: {
          200: {
            description: 'Logged out',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiMessage' },
              },
            },
          },
        },
      },
    },
    '/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Current user',
        description: 'Returns the authenticated user from the JWT cookie.',
        operationId: 'getMe',
        security: [{ cookieAuth: [] }],
        responses: {
          200: {
            description: 'Current user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'Success' },
                    data: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/PublicUser' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/news': {
      get: {
        tags: ['News'],
        summary: 'List news articles',
        description:
          'Paginated list of published articles with optional filters.',
        operationId: 'getNews',
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', minimum: 1, default: 1 },
          },
          {
            name: 'limit',
            in: 'query',
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 50,
              default: 6,
            },
          },
          {
            name: 'category',
            in: 'query',
            description: 'Category filter, or `all`',
            schema: {
              oneOf: [
                { $ref: '#/components/schemas/NewsCategory' },
                { type: 'string', enum: ['all'] },
              ],
            },
          },
          {
            name: 'country',
            in: 'query',
            description: 'Country filter, or `All Countries`',
            schema: { type: 'string', example: 'Ukraine' },
          },
          {
            name: 'search',
            in: 'query',
            description: 'Search in title and excerpt',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'Paginated news list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'Success' },
                    data: {
                      type: 'object',
                      properties: {
                        articles: {
                          type: 'array',
                          items: { $ref: '#/components/schemas/NewsArticle' },
                        },
                        total: { type: 'integer', example: 24 },
                        page: { type: 'integer', example: 1 },
                        limit: { type: 'integer', example: 6 },
                        totalPages: { type: 'integer', example: 4 },
                        categoryCounts: {
                          type: 'object',
                          additionalProperties: { type: 'integer' },
                          example: { 'Traffic Laws': 5, 'Road Safety': 8 },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/news/{slug}': {
      get: {
        tags: ['News'],
        summary: 'Get article by slug',
        operationId: 'getNewsBySlug',
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            example: 'official-traffic-rules-ukraine',
          },
        ],
        responses: {
          200: {
            description: 'Article found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'Success' },
                    data: {
                      type: 'object',
                      properties: {
                        article: { $ref: '#/components/schemas/NewsArticle' },
                      },
                    },
                  },
                },
              },
            },
          },
          404: { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/users/me/profile': {
      get: {
        tags: ['Profile'],
        summary: 'Get my profile dashboard data',
        description:
          'Returns profile payload used by the dashboard (stats, skills, achievements, activity).',
        operationId: 'getProfile',
        security: [{ cookieAuth: [] }],
        responses: {
          200: {
            description: 'Profile data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'integer', example: 200 },
                    message: { type: 'string', example: 'Success' },
                    data: {
                      type: 'object',
                      properties: {
                        profile: { $ref: '#/components/schemas/ProfileData' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
  },
};
