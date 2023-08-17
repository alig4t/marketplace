import React, { useContext, useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { HiOutlineArrowRight } from 'react-icons/hi'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import { Link, useNavigate } from 'react-router-dom';

import catList from "../../JsonFiles/catlist.json"
import { CityContext } from '../../Context/CityContext';
import { CategoryContext } from '../../Context/CategoryContext';
import { URLMaker } from '../../Utils/Utils';


const Categories = ({ devicePhone, closeModal }) => {

    const currentCity = useContext(CityContext)
    // const currentCity = currentCityContext.citiesList[0].slug
    const currentCat = useContext(CategoryContext)

    const navigate = useNavigate();



    // console.log(currentCat);
    // console.log(currentCity);


    const [catShow, setCatShow] = useState({
        depth: 0,
        sub: [{ id: 0, title: "", parent: 0 }],
        parent: [{ id: 0, title: "", parent: 0 }],
        currentCat: { id: 0 }
    })

    useEffect(() => {
        // console.log("Categories Render..");
        // console.log(catShow);
    })


    useEffect(() => {
        // console.log(catShow);
        // console.log(devicePhone);
    })
    // useEffect(()=>{
    //     console.log(catShow);
    // },[catShow])


    useEffect(() => {

        let depth = 0;
        let parentList = [];

        // console.log(currentCat);
        if (currentCat && currentCat.id > 0) {
            let parentId = currentCat.parent;
            depth++;
            let originalCats = catList.filter((item) => item.parent == currentCat.id)


            if (currentCat.hasChildren) {
                parentList.push({
                    id: currentCat.id,
                    title: currentCat.title,
                    icon: currentCat.icon,
                    slug: currentCat.slug
                });
            }

            while (parentId !== 0) {
                depth++;
                let parentIndex = catList.findIndex((cat) => cat.id == parentId);
                // console.log("pIndex=>" + parentIndex);
                // console.log("pId=>" + catList[parentIndex].parent);

                parentList.push({
                    id: catList[parentIndex].id,
                    title: catList[parentIndex].title,
                    icon: catList[parentIndex].icon,
                    slug: catList[parentIndex].slug
                });


                parentId = catList[parentIndex].parent;
            }




            if (depth == 3) {
                originalCats = catList.filter((item) => item.parent == currentCat.parent)
            }

            // console.log({
            //     depth,
            //     sub: originalCats,
            //     parent: parentList
            // });

            setCatShow({
                depth,
                sub: originalCats,
                parent: parentList.reverse(),
                currentCat
            })

        } else {

            let originalCats = catList.filter((item) => item.parent == 0)
            setCatShow({
                depth: 0,
                sub: originalCats,
                parent: [],
                currentCat: { id: 0 }
            })

        }







        // while(parentId !== undefined && parentId !== 0){
        //     depth++;
        //     let parentIndex = catList.findIndex((cat)=>cat.id == parentId);
        //     console.log("pIndex=>"+parentIndex);
        //     console.log("pId=>"+catList[parentIndex].parent);

        //     parentList.push({
        //         id: catList[parentIndex].id,
        //         title: catList[parentIndex].title,
        //         icon: catList[parentIndex].icon
        //     });
        //     parentId = catList[parentIndex].parent;
        // }
        // console.log("depth => " + depth);





    }, [currentCat])


    function getParentCats() {
        let originalCats = catList.filter((item) => item.parent == 0)
        setCatShow({
            depth: 0,
            sub: originalCats,
            parent: []
        })
    }

    useEffect(() => {
        if (devicePhone === true) {
            getParentCats()
        }
    }, [])

    const navigateCategory = (slug) => {
        // let path = currentCity.citiesList.length > 1 ? `/s/iran/${slug}?cities=${currentCity.idsArray.join('-')}` : `/s/${currentCity.citiesList[0].slug}/${slug}`;
        closeModal();
        navigate(URLMaker(currentCity.citiesList,slug));
        // setTimeout(()=>{
        // },100)
    }

    function showSubCats(id, slug) {

        let subCats = catList.filter((item) => item.parent === id)
        let parentList = [];

        if (subCats.length == 0) {
            console.log(slug);
            navigateCategory(slug)
            return;
        }
        console.log('tttttttttttttt');
        let catIndex = catList.findIndex((cat) => cat.id === id);
        let depth = 1
        while (catList[catIndex].parent !== 0) {
            parentList.push({
                id: catList[catIndex].id,
                title: catList[catIndex].title,
                icon: catList[catIndex].icon,
                slug: catList[catIndex].slug
            });
            catIndex = catList.findIndex((cat) => cat.id === catList[catIndex].parent);
            depth += 1;
        }
        parentList.push({
            id: catList[catIndex].id,
            title: catList[catIndex].title,
            icon: catList[catIndex].icon,
            slug: catList[catIndex].slug,
        });

        // console.log(parentList);
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
                                <ListGroup.Item className='dv-catlist border-0'>
                                    {/* <Link to={currentCity.citiesList.length > 1 ? `/s/iran?cities=${currentCity.idsArray.join('-')}` : `/s/${currentCity.citiesList[0].slug}`}> */}
                                    <Link to={URLMaker(currentCity.citiesList,'')}>
                                        <span style={{ verticalAlign: "-2px" }}><HiOutlineArrowRight /></span>
                                        همه آگهی ها
                                    </Link>

                                </ListGroup.Item>
                                {
                                    catShow.parent.map((parent, key) => {
                                        // console.log(parent);
                                        return (

                                            // <Link key={key} to={currentCity.citiesList.length > 1 ? `/s/iran/${parent.slug}?cities=${currentCity.idsArray.join('-')}` : `/s/${currentCity.citiesList[0].slug}/${parent.slug}`}>
                                            <Link key={key} to={URLMaker(currentCity.citiesList,parent.slug)}>
                                                <ListGroup.Item className={`dv-catlist border-0 fw-bold dv-cat-parent ${key != 0 ? "ps-5" : ""}`}
                                                >
                                                    {key === 0 ? <span className='fw-bold'><img width="22px" src={process.env.PUBLIC_URL + '/assets/icons/' + parent.icon} /></span> : null}


                                                    {parent.title}


                                                </ListGroup.Item>
                                            </Link>

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

                                    >
                                        {/* <Link to={currentCity.citiesList.length > 1 ? `/s/iran/${cat.slug}?cities=${currentCity.idsArray.join('-')}` : `/s/${currentCity.citiesList[0].slug}/${cat.slug}`} className={cat.id == catShow.currentCat.id ? 'active' : ''}> */}
                                        <Link to={URLMaker(currentCity.citiesList,cat.slug)} className={cat.id == catShow.currentCat.id ? 'active' : ''}>
                                            {
                                                catShow.depth > 0 ? null : <span><img width="18px" src={process.env.PUBLIC_URL + '/assets/icons/' + cat.icon} /></span>
                                            }
                                            {cat.title}
                                        </Link>

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
                                    <span style={{ verticalAlign: "-1px", marginLeft: "5px" }}><HiOutlineArrowRight /></span>

                                    {catShow.depth === 2 ? " بازگشت به " + catShow.parent[0].title : "بازگشت به همه آگهی ها "}

                                </ListGroup.Item>
                            </>
                        ) : null
                    }
                    {
                        catShow.sub.map((cat) => {
                            return (
                                <ListGroup.Item key={cat.id} className='dvm-catlist' onClick={() => showSubCats(cat.id, cat.slug)}>
                                    {/* {catShow.depth > 0 ? null : <span className='dvm-icon-cat'><img width="24px" src={process.env.PUBLIC_URL + '/assets/icons/' + cat.icon} /></span>} */}
                                    {cat.icon !== "" ? <span className='dvm-icon-cat'><img width="24px" src={process.env.PUBLIC_URL + '/assets/icons/' + cat.icon} /></span> : null}
                                    {cat.title}
                                    <span className='dvm-icon-arrow my-auto'>
                                        {cat.hasChildren ? <MdKeyboardArrowLeft /> : ""}
                                    </span>

                                </ListGroup.Item>
                            )
                        })
                    }
                    {
                        (catShow.depth > 0 && catShow.parent.length>0) ? (
                            // <ListGroup.Item className='dvm-catlist' onClick={() => navigateCategory(catShow.parent[catShow.parent.length - 1].slug)}>
                            <ListGroup.Item className='dvm-catlist' onClick={() => navigateCategory(catShow.parent[catShow.parent.length - 1].slug)}>
                               
 
                                {catShow.parent[catShow.parent.length - 1].icon !== "" ? (
                                    <span className='dvm-icon-cat'><img width="24px" src={process.env.PUBLIC_URL + '/assets/icons/' + catShow.parent[catShow.parent.length - 1].icon} /></span>
                                ) : null}
                                 {"همه آگهی های" + " " + catShow.parent[catShow.parent.length - 1].title}

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