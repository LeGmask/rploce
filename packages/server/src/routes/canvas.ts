import { Response } from 'fets';
import { router } from '../lib/server.js';
import { Canvas } from '../lib/canvas.js';

const CANVAS_PATH = '/canvas';
const canvas = Canvas.getInstance();

router.route({
  path: CANVAS_PATH,
  method: 'GET',
  schemas: {
    responses: {
      200: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      } as const
    }
  },
  handler() {
    return Response.json(canvas.canvas);
  }
});

router.route({
  path: CANVAS_PATH,
  method: 'POST',
  schemas: {
    json: {
      type: 'object',
      properties: {
        x: { type: 'integer' },
        y: { type: 'integer' },
        color: { type: 'string' }
      },
      additionalProperties: false,
      required: ['x', 'y', 'color']
    },
  },
  handler: async request => {
    const { x, y, color } = await request.json();
    try {
      canvas.set_pixel(x, y, color);
    } catch (error: any) {
      return Response.json(
        { message: error.message },
        { status: 401 }
      );
    }

    return Response.json(canvas.canvas);
  }
});
