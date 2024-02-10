import { Hono } from 'hono'
import type { Bindings, Variables } from '../utils/injectDB'

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()
export default app
