import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsHouseDoor } from 'react-icons/bs'
import { HiOutlineArrowRight } from 'react-icons/hi'

import { MdOutlineDirectionsCarFilled } from 'react-icons/md'
import catList from "./catlist.json"

const Sidebar = () => {

    const [catShow, setCatShow] = useState({
        depth: 0,
        sub: [{ id: 0, title: "", parent: 0 }],
        parent: [{ id: 0, title: "", parent: 0 }]
    })



    function getParentCats() {
        let originalCats = catList.filter((item) => item.parent == 0)
        setCatShow({
            depth: 0,
            sub: originalCats,
            parent:[]
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
                title: catList[catIndex].title
            });
            catIndex = catList.findIndex((cat) => cat.id === catList[catIndex].parent);
            depth += 1;
        }
        parentList.push({
            id: catList[catIndex].id,
            title: catList[catIndex].title
        });

        console.log(parentList);
        setCatShow({
            depth,
            sub: subCats,
            parent: parentList.reverse()
        })
    }

    return (
        <div className="dv-sidebar py-2">
            <div className='dv-sidebox'>

                <h6>دسته ها</h6>

                {/* <h4>{catShow.parentTitle}</h4> */}
                <ListGroup>
                    {catShow.depth > 0 ? (
                        <>
                            <ListGroup.Item onClick={getParentCats} className='dv-catlist border-0'>
                                <span style={{ verticalAlign: "-2px" }}><HiOutlineArrowRight /></span>
                                همه آگهی ها
                            </ListGroup.Item>
                            {
                                catShow.parent.map((parent, key) => {
                                    return (
                                        <ListGroup.Item className={`dv-catlist border-0 fw-bold dv-cat-parent ${key != 0 ? "ps-5" : ""}`}
                                            onClick={() => showSubCats(parent.id)}>
                                            {key === 0 ? <span className='fw-bold'><BsHouseDoor /></span> : null}
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
                                    {catShow.depth > 0 ? null : <span><img width="18px" src={process.env.PUBLIC_URL + '/assets/icons/' +cat.icon} /></span>}
                                    {cat.title}
                                </ListGroup.Item>
                            )
                        })}
                    </div>
                    {/* <ListGroup.Item className='dv-catlist border-0'>
                        <span><BsHouseDoor /></span>
                        املاک
                    </ListGroup.Item>

                    <ListGroup.Item className='dv-catlist border-0'>
                        <span><MdOutlineDirectionsCarFilled /></span>
                        وسایل نقلیه
                    </ListGroup.Item> */}

                </ListGroup>
            </div>
            
                    <div className='d-block' style={{height:"600px"}}></div>


        </div>
    );
}

export default Sidebar;