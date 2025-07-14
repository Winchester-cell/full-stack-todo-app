import api from '../mainInstance/main';

const logout = async () => {
    try {
        const res = await api.post('/auth/logout');

        if (res.status === 200) {
            console.log('✅ Logged out successfully');
            return { isOk: true, result: 'Logout successful' }
        }
    } catch (err) {
        console.error('❌ Logout failed:', err);
        return { isOk: false, result: 'Logout failed' }
    }
};

export default logout;
