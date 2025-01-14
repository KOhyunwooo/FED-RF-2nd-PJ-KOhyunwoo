import React, { useContext } from "react";
import { dCon } from "../func/dCon";
import { useState } from "react";
import "../../css/my_page.scss";
import MyPageModify from "../modules/MyPageModify";
import MyCart from "../modules/MyCart";
import Favorite from "../modules/Favorites";
import { useLocation } from 'react-router-dom';

import { IoIosArrowForward } from "react-icons/io";

function MyPage(props) {
    const [force, setForce] = useState(true);//강제 리렌더링을 위한 상태변수
    const chgNum = () => setForce(!force);//강제 리렌더링 함수

    const myCon = useContext(dCon);
    ////////////////////////////////////////////////////////////////////
    const myPageButtons = [
        "구매내역",
        "바스켓백",
        "마음에 드는 제품",
        "프로필",
        "로그아웃",
    ];


    const loc =useLocation();
    const isprofileTxt=loc.state?.profile||"구매내역";//AddAddressPg.jsx에서 가져온값||"기본값";, loc.state가null이거나 undefined면 "구매내역"을 isprofileTxt에 할당

    const [selButton, setSelButton] = useState(isprofileTxt);
    const selectedButton = (v) => {
        if (v === "로그아웃") {
            myCon.logoutFn();
        }
        setSelButton(v);
    };
    //////////////////////////////////////////////////////////////////

    //장바구니 데이터 불러오기
    const localsDataMyCart =
        JSON.parse(localStorage.getItem("mycart-data")) || [];
    //위시리스트 데이터 불러오기
    const localsDataFavorite =
        JSON.parse(localStorage.getItem("favorite-data")) || [];
    //로그인된 데이터 불러오기
    const sesstionsDataI = JSON.parse(sessionStorage.getItem("minfo")) || [];

    // 비밀번호를 별표시로 바꾸는 함수
    const maskPassword = (password) => {
        return password ? "*".repeat(password.length) : "";
    };

    // 모드 상태 프롭스다운해주기 위한 상태변수
    const [profileMode, setProfileMode] = useState("");
    // 프로필모드 모달(MyPageModify.jsx) 보이기(true),안보이기(false)상태변수
    const [showProfileMode, setShowProfileMode] = useState(false);

    const profileClick = (mode) => {
        setProfileMode(mode); //모드 상태 업데이트용( "addr", "eml", "phone", "pass")
        setShowProfileMode(true);
    };


 

    return (
        <>
            {/* ////////////////////상단 메뉴 부분///////////////////////// */}
            <div style={{ paddingTop: "10vh" }}></div>
            <div className="pdbutton-box mypage-pdbutton-box">
                {myPageButtons.map((v, i) => (
                    <button
                        key={i}
                        className={`pdbutton ${selButton === v ? "on" : ""}`}
                        onClick={() => selectedButton(v)}
                    >
                        {v}
                    </button>
                ))}
            </div>
            {/* ////////////////////상단 메뉴 부분///////////////////////// */}

            {/* ********************구매내역 부분************************** */}
            {selButton === "구매내역" && 
            <div className="history-box">
            <h2 style={{textAlign:"center", margin:"50px"}}>구매내역이 없습니다.</h2>

            </div>
            }

            {/* ********************구매내역 부분************************** */}
            {selButton === "바스켓백" && <MyCart chgNum={chgNum} />}
            {selButton === "마음에 드는 제품" && <Favorite />}
            {selButton === "프로필" && (
                <div className="profile-box-wrap">
                    <p>{sesstionsDataI.unm}</p>
                    <div className="profile-box">
                        <button onClick={() => profileClick("addr")}>
                            <p>주소</p>
                            <IoIosArrowForward />
                        </button>
                        <button onClick={() => profileClick("eml")}>
                            <div>
                                <p>이메일</p>
                                <p>{sesstionsDataI.eml || sesstionsDataI.uid}</p>
                            </div>
                            <IoIosArrowForward />
                        </button>
                        <button onClick={(e) => profileClick("phone")}>
                            <div>
                                <p>전화번호</p>
                                <p>{sesstionsDataI.phone}</p>
                            </div>
                            <IoIosArrowForward />
                        </button>
                        <button onClick={() => profileClick("pass")}>
                            <div>
                                <p>비밀번호 변경</p>
                                <p>{maskPassword(sesstionsDataI.pwd)}</p>
                            </div>
                            <IoIosArrowForward />
                        </button>
                    </div>
                    {showProfileMode && (
                        <MyPageModify
                            mode={profileMode}
                            setShowProfileMode={setShowProfileMode}
                        />
                    )}
                    {/* showProfileMode true 일때 뒤에것 실행 */}
                </div>
            )}
        </>
    );
}

export default MyPage;
