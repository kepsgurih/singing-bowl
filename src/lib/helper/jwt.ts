import jwt from 'jsonwebtoken';

const SECRET = import.meta.env.VITE_JWT_SECRET;

export function signToken(payload: object) {
	return {
		accessToken: jwt.sign(payload, SECRET, { expiresIn: '1m' }),
		refreshToken: jwt.sign(payload, SECRET, { expiresIn: '7d' }),
	}
}

export function verifyToken(token: string) {
	try {
		const payload = jwt.verify(token, SECRET);
        if (!payload) throw new Error('Invalid token');
        return payload;
	} catch (err) {
		return null;
	}
}
