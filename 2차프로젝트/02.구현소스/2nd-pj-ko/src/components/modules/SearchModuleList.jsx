import React from "react";
import { Link } from "react-router-dom";

function SearchModuleList({ data }) {
    const total = data.length;
    console.log("데이터수가 왜이래", total);
    return (
        <>
            {total > 0 && (
                <div className="product-list">
                    {data.map((v, i) => (
                        <div key={i} className="product-item">
                            {/* 링크를 왜 보내야하지?:  */}
                            {/* <Link to="/product" state={{ name: v.name }}></Link> */}
                            <img
                                src={v.isrc}
                                alt={v.name}
                                className="product-image"
                            />
                            <div className="txt-box">
                                <p>{v.name}</p>
                                <p>{v.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {total == 0 && (
                <h1 style={{ textAlign: "center", lineHeight:"20vh" }}>
                    해당되는 상품을 찾을 수 없습니다.
                </h1>
            )}
        </>
    );
}

export default SearchModuleList;
