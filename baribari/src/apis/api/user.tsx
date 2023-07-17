import { axiosInstance } from '..';
import { removeAccessToken, setAccessToken } from '../cookie';

export async function loginUser(email: string, password: string) {
    try {
        // 로그인 API 호출
        const response = await axiosInstance.post('/v1/auth/login', {
            email,
            password,
        });

        const { accessToken, refreshToken } = response.data.data;

        // 토큰을 쿠키에 저장
        setAccessToken(accessToken);

        return response.data; // 필요한 데이터 반환
    } catch (error) {
        // 에러 처리
        console.log('Error:', error);
        removeAccessToken();
        throw error;
    }
}

export async function registerUser(nickname: string, email: string, password: string, phone: string) {
    try {
        // 회원가입 API 호출
        const response = await axiosInstance.post('/v1/auth/signup', {
            nickname,
            email,
            password,
            phone,
        });

        return response.data; // 필요한 데이터 반환
    } catch (error) {
        // 에러 처리
        console.log('Error:', error);
        throw error;
    }
}
