import React from 'react';
import { FaRegComment } from 'react-icons/fa'


const CardShow2 = (props) => {
    return (
        <div className='d-flex flex-wrap'>
            {
                props.cardsList.map((item,index) => {
                    return (
                        <div className='dv-card' key={index}>
                            <div className='dv-card-border'>
                                <div className='dv-post'>
                                    <div className='dvpost-info'>
                                        <div className='dv-info-title flex-fill'>
                                            <h2>{item.title}</h2>
                                        </div>
                                        <div className='dv-info-lists'>
                                            {/* <p>در حد نو</p> */}
                                            {/* <p>۳۵٬۰۰۰٬۰۰۰ تومان</p>
                            <p>۳۵٬۰۰۰٬۰۰۰ تومان</p> */}
                                            {item.features.map((feature,subIndex) => {
                                                return (
                                                    <p key={subIndex}>
                                                        {feature.title + " : " + feature.value + " تومان "}
                                                    </p>
                                                )
                                            })}
                                        </div>
                                        <div className='dv-info-bottom'>
                                            <span className='text-muted'>نیم ساعت پیش در تهران، جنت آباد جنوبی</span>
                                        </div>

                                    </div>
                                    <div className='dvpost-feature align-self-end pb-1 pe-1'>
                                        <FaRegComment />
                                    </div>
                                    <div className='dvpost-thumb'>
                                        <img src={process.env.PUBLIC_URL + "/assets/images/2023/05/13/" + item.imgThumb} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    );
}

export default CardShow2;