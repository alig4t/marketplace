import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsHouseDoor } from 'react-icons/bs'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdOutlineDirectionsCarFilled } from 'react-icons/md'

import catList from "./catlist.json"

const Categories = ({ devicePhone }) => {

    const [catShow, setCatShow] = useState({
        depth: 0,
        sub: [{ id: 0, title: "", parent: 0 }],
        parent: [{ id: 0, title: "", parent: 0 }]
    })

    useEffect(() => {
        // console.log(catShow);
        // console.log(devicePhone);
    })


    function getParentCats() {
        let originalCats = catList.filter((item) => item.parent == 0)
        setCatShow({
            depth: 0,
            sub: originalCats,
            parent: []
        })
    }
    useEffect(() => {
        getParentCats()
    }, [])

    function showSubCats(id) {

        let subCats = catList.filter((item) => item.parent === id)
        let parentList = [];

        if (subCats.length == 0) {
            return;
        }
        let catIndex = catList.findIndex((cat) => cat.id === id);
        let depth = 1
        while (catList[catIndex].parent !== 0) {
            parentList.push({
                id: catList[catIndex].id,
                title: catList[catIndex].title,
                icon: catList[catIndex].icon
            });
            catIndex = catList.findIndex((cat) => cat.id === catList[catIndex].parent);
            depth += 1;
        }
        parentList.push({
            id: catList[catIndex].id,
            title: catList[catIndex].title,
            icon: catList[catIndex].icon
        });

        console.log(parentList);
        setCatShow({
            depth,
            sub: subCats,
            parent: parentList.reverse()
        })
    }

    return (
        <>
            {devicePhone === false ? (

                
                    <div className='dv-sidebox'>
                        <h6>دسته ها</h6>
                        <ListGroup>
                            {catShow.depth > 0 ? (
                                <>
                                    <ListGroup.Item onClick={getParentCats} className='dv-catlist border-0'>
                                        <span style={{ verticalAlign: "-2px" }}><HiOutlineArrowRight /></span>
                                        همه آگهی ها
                                    </ListGroup.Item>
                                    {
                                        catShow.parent.map((parent, key) => {
                                            console.log(parent);
                                            return (
                                                <ListGroup.Item className={`dv-catlist border-0 fw-bold dv-cat-parent ${key != 0 ? "ps-5" : ""}`}
                                                    onClick={() => showSubCats(parent.id)}>
                                                    {key === 0 ? <span className='fw-bold'><img width="18px" src={process.env.PUBLIC_URL + '/assets/icons/' + parent.icon} /></span> : null}
                                                    {parent.title}

                                                </ListGroup.Item>
                                            )
                                        })
                                    }
                                </>
                            ) : null
                            }
                            <div className={catShow.depth > 0 ? "ps-5 pb-4" : ""}>
                                {catShow.sub.map((cat) => {

                                    return (
                                        <ListGroup.Item key={cat.id} className={`dv-catlist border-0 ${catShow.depth > 1 ? "cat-depth3" : ""} `}
                                            onClick={() => showSubCats(cat.id)}
                                        >
                                            {catShow.depth > 0 ? null : <span><img width="18px" src={process.env.PUBLIC_URL + '/assets/icons/' + cat.icon} /></span>}
                                            {cat.title}

                                        </ListGroup.Item>
                                    )
                                })}
                            </div>
                        </ListGroup>
                    </div>
                

            ) : (
                <ListGroup>
                    {
                        catShow.depth > 0 ? (
                            <>
                                <ListGroup.Item onClick={catShow.depth === 2 ? () => showSubCats(catShow.parent[0].id) : getParentCats} className='dvm-catlist border-0'>
                                    <span style={{ verticalAlign: "-1px",marginLeft:"5px" }}><HiOutlineArrowRight /></span>

                                    {catShow.depth === 2 ? " بازگشت به " + catShow.parent[0].title : "بازگشت به همه آگهی ها "}

                                </ListGroup.Item>
                            </>
                        ) : null
                    }
                    {
                        catShow.sub.map((cat) => {
                            return (
                                <ListGroup.Item key={cat.id} className='dvm-catlist' onClick={() => showSubCats(cat.id)}>
                                    {catShow.depth > 0 ? null : <span className='dvm-icon-cat'><img width="24px" src={process.env.PUBLIC_URL + '/assets/icons/' + cat.icon} /></span>}
                                    {cat.title}
                                    <span className='dvm-icon-arrow my-auto'>
                                        {cat.hasChildren ? <MdKeyboardArrowLeft />: ""}
                                    </span>

                                </ListGroup.Item>
                            )
                        })
                    }
                    {
                        catShow.depth > 0 ? (
                            <ListGroup.Item className='dvm-catlist'>
                                
                                 {catShow.parent[catShow.depth - 1].icon !== "" ? <span className='dvm-icon-cat'><img width="24px" src={process.env.PUBLIC_URL + '/assets/icons/' + catShow.parent[catShow.depth - 1].icon} /></span> : null}
                                
                                {"همه آگهی های" + " " + catShow.parent[catShow.depth - 1].title}
                            </ListGroup.Item>
                        ) : null
                    }
                </ListGroup>
            )


            }
        </>

    );
}

export default Categories;