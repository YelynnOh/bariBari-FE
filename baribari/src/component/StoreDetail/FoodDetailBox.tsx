import styled from 'styled-components';
import { ReactComponent as Heart } from '../../assets/heart.svg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { searchById } from '../../apis/api/search';
import { ReactComponent as SmallStar } from '../../assets/star.svg';
import { useEffect, useState } from 'react';
import { cancelStoreLike, clickStoreLike } from '../../apis/api/store';

export default function FoodDetailBox({ isSelected, dosirakData }: { isSelected: boolean; dosirakData: any }) {
    console.log('dosirak여기요' + dosirakData.data.rating);
    const [isFilled, setIsFilled] = useState(dosirakData.data.likedStore);
    const fillColor = isFilled ? '#FF7455' : 'none';
    useEffect(() => {
        const fillColor = isFilled ? '#FF7455' : 'none';
    }, [isFilled]);
    const queryClient = useQueryClient();

    const likeMutation = useMutation(() => clickStoreLike(dosirakData?.data.storeId), {
        onSuccess: () => {
            setIsFilled(true);
            queryClient.invalidateQueries('onFav');
        },
    });

    const dislikeMutation = useMutation(() => cancelStoreLike(dosirakData?.data.storeId), {
        onSuccess: () => {
            setIsFilled(false);
            queryClient.invalidateQueries('outFav');
        },
    });

    const handleClick = () => {
        if (!isFilled) {
            likeMutation.mutate();
        } else {
            dislikeMutation.mutate();
        }
    };
    return (
        <Container isSelected={isSelected}>
            <MainBox>
                <TitleBox>
                    <div style={{ marginRight: 'auto', fontSize: '24px', fontWeight: '700', lineHeight: '28px' }}>
                        {dosirakData?.data.name}
                    </div>
                    <div style={{ marginRight: '0', fontSize: '24px', fontWeight: '700', lineHeight: '28px' }}>
                        {dosirakData?.data.price}원
                    </div>
                </TitleBox>
                <StoreBox>
                    <StoreImageBox src={dosirakData?.data.mainImageUrl} />
                    <StoreNameBox>
                        <div style={{ marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
                            {dosirakData?.data.storeName}
                        </div>

                        <div
                            style={{
                                fontSize: '18px',
                                fontWeight: '700',
                                height: '21px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            4.4
                            <SmallStar style={{ display: 'flex', width: '89.4px', marginLeft: '12px' }} />
                        </div>
                    </StoreNameBox>
                    <div style={{ padding: '3px', marginRight: '0' }} onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <path
                                d="M8.99999 3.24742C8.99999 3.24742 7.99999 0.75 4.50024 0.75C1.5 0.75 0 3.23794 0 5.73536C0 11.565 8.99999 16.6731 8.99999 16.6731C8.99999 16.6731 18 11.565 18 5.73536C18 3.23794 16.5 0.75 13.4997 0.75C9.99999 0.75 8.99999 3.24742 8.99999 3.24742Z"
                                fill={fillColor}
                                stroke="#FF7455"
                            />
                        </svg>
                    </div>
                </StoreBox>
            </MainBox>
            <SubBox style={{ flexDirection: 'column' }}>
                {dosirakData?.data.banchanList?.map((banchan: any) => (
                    <RawFoodBox key={banchan.banchanName}>
                        <div
                            style={{
                                marginRight: 'auto',
                                fontSize: '16px',
                                fontWeight: '600',
                                padding: '7.354px 14.709px',
                                borderRadius: '14.709px',
                                backgroundColor: '#F9F9F9',
                            }}
                        >
                            {banchan.banchanName}
                        </div>
                        <div style={{ marginRight: '0', fontSize: '14px', fontWeight: '500' }}>{banchan.gram}g</div>
                    </RawFoodBox>
                ))}
            </SubBox>
        </Container>
    );
}

const Container = styled.div<{ isSelected: boolean }>`
    width: 100%;
    height: 100%;
    display: ${(props) => (props.isSelected === true ? 'flex' : 'none')};
    flex-direction: column;
`;
const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0 20px 0;
    background-color: white;
    width: 100%;
    height: 120px;
`;
const TitleBox = styled.div`
    display: flex;
    line-height: 32px;
    flex-direction: row;
    margin: 0 12px 0 12px;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 700;
`;
const StoreBox = styled.div`
    display: flex;
    height: 52px;
    margin: 24px 12px 0 12px;
    padding: 8px 12px 8px 8px;
    background-color: #f9f9f9;
    border-radius: 8px;
    align-items: center;
`;

const StoreImageBox = styled.img`
    width: 52px;
    height: 52px;
    margin-right: 16px;
    background-color: grey;
    border-radius: 8px;
`;

const StoreNameBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-right: auto;
`;

const FoodTag = styled.div`
    margin-right: auto;
    font-size: 16px;
    font-weight: 600;
    line-height: 130%;
    padding: 7.354px 14.709px;
    border-radius: 14.709px;
    background-color: #f9f9f9;
`;
const SubBox = styled.div`
    display: flex;
    background-color: white;
    margin-top: 14px;
    padding: 20px 0;
`;
const InfoBox = styled.div`
    width: 100%;
    font-size: 16px;
    width: calc(100% - 32px);
    margin: auto;
`;

const RawFoodBox = styled.div`
    display: flex;

    height: 33.7px;
    padding: 12px 16px;
    align-items: center;
    border-bottom: solid 1px #efefef;
    color: #504e5f;
`;
