// 주문 관련 API 호출 함수 정의
import axios from "axios";
import { OrderListDTO, OrderReadDTO, CompleteOrderRequest } from "../types/ordertype";

// API 기본 URL 설정
const USER_BASE_URL = "http://localhost:8081/api/user/order"; // 유저 백엔드 URL
const STORE_BASE_URL = "http://localhost:8082/api/storeowner/order"; // 점주 백엔드 URL

// 유저의 주문 목록 가져오기
export const fetchOrderList = async (email: string, page: number, size: number) => {
    const response = await axios.get<{ content: OrderListDTO[]; totalElements: number }>(
        `${USER_BASE_URL}/list`,
        { params: { email, page, size } }
    );
    return response.data;
};

// 특정 주문의 상세 정보 가져오기
export const fetchOrderDetails = async (ono: number, email: string) => {
    const response = await axios.get<OrderReadDTO>(`${USER_BASE_URL}/details/${ono}`, {
        params: { email },
    });
    return response.data;
};

// 주문 취소 요청
export const cancelOrder = async (ono: number, email: string) => {
    const response = await axios.put(`${USER_BASE_URL}/cancel/${ono}`, null, {
        params: { email },
    });
    return response.data;
};

// 주문 완료 요청 (유저 → 점주에게 알림)
export const completeOrder = async (data: CompleteOrderRequest) => {
    const response = await axios.post(`${STORE_BASE_URL}/complete`, data);
    return response.data;
};
