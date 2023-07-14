import { styled } from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Header from '../component/Header';
import { useNavigate } from 'react-router';

interface JoinData {
    name: string;
    password: string;
    phone: string;
    email: string;
}

const validationSchema = yup.object({
    name: yup.string().required('성명을 입력해주세요!'),
    password: yup
        .string()
        .required('비밀번호를 입력해주세요!')
        .min(6, '비밀번호는 6글자 이상이여야 합니다.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, '비밀번호는 영어 대소문자와 숫자를 포함해야 합니다.'),
    phone: yup.string().required('전화번호를 입력해주세요!'),
    email: yup.string().required('이메일을 입력해주세요!').email('@를 포함한 유효한 이메일 주소를 작성해주세요.'),
});

export default function Join() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
    } = useForm<JoinData>({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<JoinData> = (data) => {
        if (isValid) {
            //굳이 isValid 체크를 안해줘도 될 것 같긴 한데..?
            console.log(data);
            navigate('/signUp3');
        } else {
            alert('유효한 정보를 입력했는지 다시 확인해주세요!');
        }
    };

    return (
        <div style={{ padding: '110px 16px 0px 16px', width: '100vw' }}>
            <Header showPageName={true} pageTitle="회원가입" showSearchBar={false} />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                    <Label>이메일</Label>
                    <Input
                        type="text"
                        placeholder="이메일 주소를 입력해주세요"
                        aria-invalid={!!errors.email}
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''} ${
                            !errors.email && getValues('email') ? 'is-valid' : ''
                        }`}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    <Label>비밀번호</Label>
                    <Input
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        aria-invalid={!!errors.password}
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''} ${
                            !errors.password && getValues('password') ? 'is-valid' : ''
                        }`}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    <Label>이름</Label>
                    <Input
                        type="text"
                        placeholder="성명을 입력해주세요"
                        aria-invalid={!!errors.name}
                        {...register('name')}
                        className={`form-control ${errors.name ? 'is-invalid' : ''} ${
                            !errors.name && getValues('name') ? 'is-valid' : ''
                        }`}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    <Label>휴대폰 번호</Label>
                    <Input
                        type="text"
                        placeholder="'-'구분없이 입력해주세요"
                        aria-invalid={!!errors.phone}
                        {...register('phone')}
                        className={`form-control ${errors.phone ? 'is-invalid' : ''} ${
                            !errors.phone && getValues('phone') ? 'is-valid' : ''
                        }`}
                    />
                    {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                </InputWrapper>
                <SubmitButton type="submit">다음</SubmitButton>
            </Form>
        </div>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    height: 28px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 0.75px solid #aaa;
    background: #fff;
    color: #504e5f;
    font-size: 16px;
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    outline: none;
    &::placeholder {
        color: #aaa;
    }
    &.is-invalid {
        border-color: red;
        box-shadow: 0 0 5px 2px rgba(255, 0, 0, 0.3);
        transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
    &.is-valid {
        border-color: blue;
        box-shadow: 0 0 5px 2px rgba(0, 0, 255, 0.3);
        transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
`;

const Label = styled.label`
    color: #767676;
    font-size: 12px;
    font-family: Pretendard-Regular;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;
const ErrorMessage = styled.span`
    color: red;
    font-size: 14px;
`;

const SubmitButton = styled.button`
    display: flex;
    height: 64px;
    width: calc(100% - 32px);
    max-width: 564px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 24px;
    font-family: Pretendard;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;

    position: fixed;
    margin: 0 16px;
    bottom: 16px;
    z-index: 10000;
`;