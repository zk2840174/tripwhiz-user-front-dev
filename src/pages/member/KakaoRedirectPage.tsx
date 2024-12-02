import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAccessToken, getKakaoWithAccessToken} from "../../api/kakaoAPI.ts";
import LoadingPage from "../LoadingPage.tsx";
import useAuthStore from "../../store/AuthStore.ts";


function KakaoRedirectPage() {

    const [loading, setLoading] = useState(true); // JH
    const navigate = useNavigate(); // JH

    // URL의 쿼리 파라미터를 읽기 위한 React Router 훅
    const [searchParams] = useSearchParams()

    // URL의 "code" 파라미터 (카카오 인증 코드)를 가져옴
    const authCode:string|null = searchParams.get("code")

    const { setUser } = useAuthStore(state => state);

    // authCode가 변경될 때마다 액세스 토큰 요청 및 사용자 정보 요청을 실행
    useEffect(() => {

        if(authCode != null){

        // 인증 코드를 이용해 액세스 토큰을 요청
        getAccessToken(authCode).then(accessToken => {

            console.log(accessToken)
            // 액세스 토큰을 사용해 사용자 정보를 가져옴
            getKakaoWithAccessToken(accessToken, setUser).then(result => {
                console.log("======================2");
                console.log(result);
                setLoading(false); // JH
            })
        })
      }//end if

    },[authCode]) // authCode가 변경될 때마다 실행

    // JH
    useEffect(() => {
        if (!loading) {
            navigate("/product/list"); // Replace "/product-list" with the actual route for the product list page
        }
    }, [loading, navigate]);


    return (
        <div>
            {/*JH*/}
            {loading && <LoadingPage/>}
        </div>
    );
}

export default KakaoRedirectPage;