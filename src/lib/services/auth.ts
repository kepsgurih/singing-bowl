import db from '$lib/config/surrealdb';

export async function login({
    email,
    password
}: {
    email: string,
    password: string
}) {
    try {
        const result = await db.signin({
            namespace: 'app',
            database: 'main',

            access: 'user',

            variables: {
                email: email.toLowerCase(),
                password
            }
        })
        return result

    } catch (e) {
        return false
    }
}

export async function logout() {
    try {

    } catch (e) {
        return false
    }
}

export async function register({
    fullName,
    email,
    password,
    address
}: {
    email: string,
    password: string,
    fullName: string,
    address: string
}) {
    try {
        // Cek apakah email sudah terdaftar
        const exists: any[][] = await db.query(
            'SELECT * FROM user WHERE email = $email',
            { email }
        );

        const users: any[] = exists[0];

        console.log(users, 'users')

        if (users.length > 0) {
            return {
                success: false,
                message: 'Email sudah terdaftar'
            };
        }

        // // Kalau belum ada, lanjut signup
        const result = await db.signup({
            namespace: 'app',
            database: 'main',
            access: 'user',
            variables: {
                fullName,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`,
                email: email.toLowerCase(),
                password,
                address
            }
        });
        console.log('berhasil')

        return {
            success: true,
            data: result
        };

    } catch (e: any) {
        return {
            success: false,
            message: e.message ?? 'Terjadi kesalahan saat register'
        };
    }
}


