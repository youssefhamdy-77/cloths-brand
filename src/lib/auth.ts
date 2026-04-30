import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'amber-secret-key-change-in-production');

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('amber_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

// Role permission map
const ROLE_PERMISSIONS: Record<string, string[]> = {
  'Owner': ['*'],
  'Admin': ['products', 'orders', 'customers', 'inventory', 'payments', 'settings'],
  'Accountant': ['orders:read', 'payments:read', 'accounting', 'expenses', 'reports'],
  'Inventory Manager': ['products:read', 'inventory'],
  'Order Manager': ['orders', 'customers:read', 'payments:read'],
  'Viewer': ['dashboard:read']
};

export function hasPermission(role: string, resource: string): boolean {
  const perms = ROLE_PERMISSIONS[role];
  if (!perms) return false;
  if (perms.includes('*')) return true;
  return perms.some(p => p === resource || p === resource.split(':')[0] || p.startsWith(resource.split(':')[0]));
}
